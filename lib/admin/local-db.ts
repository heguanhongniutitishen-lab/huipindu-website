import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import {
  adminUsers,
  cases,
  cmsSections,
  demoVideos,
  faqs,
  formFields,
  pricingPlans,
  settings
} from "@/lib/admin/mock-data";

const dbDir = path.join(process.cwd(), ".data");
const dbPath = path.join(dbDir, "local-db.json");
const outboxPath = path.join(dbDir, "email-outbox.json");
const analyticsPath = path.join(dbDir, "analytics.json");

export type LocalPricingPlan = (typeof pricingPlans)[number];
export type LocalCase = (typeof cases)[number];
export type LocalCmsSection = (typeof cmsSections)[number];
export type LocalFaq = (typeof faqs)[number];
export type LocalFormField = (typeof formFields)[number];
export type LocalSetting = (typeof settings)[number];
export type LocalDemoVideo = (typeof demoVideos)[number];
export type LocalAdminUser = (typeof adminUsers)[number];

type LocalDb = {
  pricingPlans: LocalPricingPlan[];
  cases: LocalCase[];
  cmsSections: LocalCmsSection[];
  faqs: LocalFaq[];
  formFields: LocalFormField[];
  settings: LocalSetting[];
  demoVideos: LocalDemoVideo[];
  adminUsers: LocalAdminUser[];
};

const initialDb: LocalDb = {
  pricingPlans,
  cases,
  cmsSections,
  faqs,
  formFields,
  settings,
  demoVideos,
  adminUsers
};

async function ensureDb() {
  await mkdir(dbDir, { recursive: true });

  try {
    await readFile(dbPath, "utf8");
  } catch {
    await writeFile(dbPath, JSON.stringify(initialDb, null, 2), "utf8");
  }
}

export async function readLocalDb(): Promise<LocalDb> {
  await ensureDb();
  const raw = await readFile(dbPath, "utf8");
  const saved = JSON.parse(raw) as Partial<LocalDb>;
  const merged = { ...initialDb, ...saved };
  merged.settings = mergeRows(initialDb.settings, saved.settings);
  merged.cmsSections = mergeRows(initialDb.cmsSections, saved.cmsSections);
  return merged;
}

function mergeRows<T extends { id: string }>(defaults: T[], saved?: T[]) {
  if (!saved) return defaults;
  const savedIds = new Set(saved.map((item) => item.id));
  return [...saved, ...defaults.filter((item) => !savedIds.has(item.id))];
}

async function writeLocalDb(db: LocalDb) {
  await mkdir(dbDir, { recursive: true });
  await writeFile(dbPath, JSON.stringify(db, null, 2), "utf8");
}

async function replaceLocalKey<K extends keyof LocalDb>(key: K, value: LocalDb[K]) {
  const db = await readLocalDb();
  db[key] = value;
  await writeLocalDb(db);
  return db[key];
}

export async function listLocalPricingPlans() {
  return (await readLocalDb()).pricingPlans;
}

export async function replaceLocalPricingPlans(value: LocalPricingPlan[]) {
  return replaceLocalKey("pricingPlans", value);
}

export async function listLocalCases() {
  return (await readLocalDb()).cases;
}

export async function replaceLocalCases(value: LocalCase[]) {
  return replaceLocalKey("cases", value);
}

export async function listLocalCmsSections() {
  return (await readLocalDb()).cmsSections;
}

export async function replaceLocalCmsSections(value: LocalCmsSection[]) {
  return replaceLocalKey("cmsSections", value);
}

export async function listLocalFaqs() {
  return (await readLocalDb()).faqs;
}

export async function replaceLocalFaqs(value: LocalFaq[]) {
  return replaceLocalKey("faqs", value);
}

export async function listLocalFormFields() {
  return (await readLocalDb()).formFields;
}

export async function replaceLocalFormFields(value: LocalFormField[]) {
  return replaceLocalKey("formFields", value);
}

export async function listLocalSettings() {
  return (await readLocalDb()).settings;
}

export async function replaceLocalSettings(value: LocalSetting[]) {
  return replaceLocalKey("settings", value);
}

export async function listLocalDemoVideos() {
  return (await readLocalDb()).demoVideos;
}

export async function replaceLocalDemoVideos(value: LocalDemoVideo[]) {
  return replaceLocalKey("demoVideos", value);
}

export async function listLocalAdminUsers() {
  return (await readLocalDb()).adminUsers;
}

export async function replaceLocalAdminUsers(value: LocalAdminUser[]) {
  return replaceLocalKey("adminUsers", value);
}

export async function listEmailOutbox() {
  try {
    return JSON.parse(await readFile(outboxPath, "utf8")) as Array<{ id: string; createdAt: string; payload: unknown }>;
  } catch {
    return [];
  }
}

export type LocalAnalytics = {
  visitors: string[];
  videoViews: string[];
};

export async function readLocalAnalytics(): Promise<LocalAnalytics> {
  await mkdir(dbDir, { recursive: true });

  try {
    return JSON.parse(await readFile(analyticsPath, "utf8")) as LocalAnalytics;
  } catch {
    return { visitors: [], videoViews: [] };
  }
}

export async function trackLocalAnalytics(type: "visit" | "video") {
  const analytics = await readLocalAnalytics();
  const now = new Date().toISOString();

  if (type === "visit") {
    analytics.visitors.push(now);
  } else {
    analytics.videoViews.push(now);
  }

  await writeFile(analyticsPath, JSON.stringify(analytics, null, 2), "utf8");
  return analytics;
}
