import { mkdir, readFile, writeFile } from "fs/promises";
import net from "net";
import path from "path";
import tls from "tls";

export type LeadEmailPayload = {
  intent: "demo" | "materials";
  name: string;
  phone: string;
  city?: string;
  organization?: string;
  studentCount?: number;
  interestedPlan?: string;
  message?: string;
  sourcePage?: string;
  sourceChannel?: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
  secure: boolean;
};

const outboxPath = path.join(process.cwd(), ".data", "email-outbox.json");

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEAD_NOTIFY_EMAIL;

  if (!host || !user || !pass || !to) {
    return null;
  }

  return {
    host,
    port: Number(process.env.SMTP_PORT || 465),
    user,
    pass,
    from: process.env.SMTP_FROM || user,
    to,
    secure: process.env.SMTP_SECURE !== "false"
  };
}

function escapeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function encodeSubject(value: string) {
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function buildEmail(payload: LeadEmailPayload) {
  const intentText = payload.intent === "demo" ? "预约演示" : "领取资料";
  const subject = `慧拼读官网${intentText}：${payload.name} ${payload.phone}`;
  const lines = [
    `客户类型：${intentText}`,
    `姓名：${payload.name}`,
    `电话：${payload.phone}`,
    `城市：${payload.city || "-"}`,
    `机构：${payload.organization || "-"}`,
    `当前学员人数：${payload.studentCount ?? "-"}`,
    `感兴趣套餐：${payload.interestedPlan || "-"}`,
    `来源页面：${payload.sourcePage || "官网"}`,
    `来源渠道：${payload.sourceChannel || intentText}`,
    `提交时间：${new Date().toLocaleString("zh-CN", { hour12: false })}`,
    "",
    "留言需求：",
    payload.message || "-"
  ];

  return {
    subject,
    text: lines.join("\n")
  };
}

async function writeOutbox(payload: LeadEmailPayload) {
  await mkdir(path.dirname(outboxPath), { recursive: true });
  let current: unknown[] = [];

  try {
    current = JSON.parse(await readFile(outboxPath, "utf8")) as unknown[];
  } catch {
    current = [];
  }

  const record = {
    id: `MAIL-${Date.now()}`,
    createdAt: new Date().toISOString(),
    payload
  };
  current.unshift(record);
  await writeFile(outboxPath, JSON.stringify(current, null, 2), "utf8");
  return record;
}

function createSocket(config: SmtpConfig) {
  return config.secure
    ? tls.connect({ host: config.host, port: config.port, servername: config.host })
    : net.connect({ host: config.host, port: config.port });
}

async function sendCommand(socket: net.Socket | tls.TLSSocket, command: string, expected: number[]) {
  const response = await new Promise<string>((resolve, reject) => {
    let buffer = "";
    const onData = (chunk: Buffer) => {
      buffer += chunk.toString("utf8");
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const last = lines.at(-1);
      if (last && /^\d{3}\s/.test(last)) {
        cleanup();
        resolve(buffer);
      }
    };
    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };
    const cleanup = () => {
      socket.off("data", onData);
      socket.off("error", onError);
    };

    socket.on("data", onData);
    socket.on("error", onError);
    if (command) {
      socket.write(`${command}\r\n`);
    }
  });
  const code = Number(response.slice(0, 3));
  if (!expected.includes(code)) {
    throw new Error(`SMTP command failed: ${command || "connect"} -> ${response}`);
  }
  return response;
}

async function sendSmtpMail(config: SmtpConfig, payload: LeadEmailPayload) {
  const { subject, text } = buildEmail(payload);
  const socket = createSocket(config);

  await new Promise<void>((resolve, reject) => {
    socket.once(config.secure ? "secureConnect" : "connect", resolve);
    socket.once("error", reject);
  });

  try {
    await sendCommand(socket, "", [220]);
    await sendCommand(socket, `EHLO ${config.host}`, [250]);
    await sendCommand(socket, "AUTH LOGIN", [334]);
    await sendCommand(socket, Buffer.from(config.user).toString("base64"), [334]);
    await sendCommand(socket, Buffer.from(config.pass).toString("base64"), [235]);
    await sendCommand(socket, `MAIL FROM:<${config.from}>`, [250]);
    await sendCommand(socket, `RCPT TO:<${config.to}>`, [250, 251]);
    await sendCommand(socket, "DATA", [354]);

    const message = [
      `From: ${escapeHeader(config.from)} <${config.from}>`,
      `To: ${config.to}`,
      `Subject: ${encodeSubject(subject)}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      text
    ].join("\r\n");

    await sendCommand(socket, `${message}\r\n.`, [250]);
    await sendCommand(socket, "QUIT", [221]);
  } finally {
    socket.end();
  }
}

export async function sendLeadEmail(payload: LeadEmailPayload) {
  const config = getSmtpConfig();

  if (!config) {
    const record = await writeOutbox(payload);
    return { sent: false, devOutbox: true, record };
  }

  await sendSmtpMail(config, payload);
  return { sent: true, devOutbox: false };
}
