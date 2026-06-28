"use client";

import { FormEvent, useState } from "react";

const roles = ["个人老师咨询", "学校机构合作咨询", "代理和区域合作"] as const;

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      role: String(formData.get("role") || roles[0]).trim(),
      city: String(formData.get("city") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      website: String(formData.get("website") || "").trim()
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "提交失败，请稍后再试。");
      }

      form.reset();
      setState("success");
      setMessage(result.message || "提交成功，我们会尽快联系你。");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "提交失败，请稍后再试。");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-[#dcecff] bg-[#f7fbff] p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-black text-ink">姓名</span>
          <input
            name="name"
            required
            maxLength={30}
            className="mt-2 w-full rounded-lg border border-[#dcecff] bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-[#095daf]"
            placeholder="请输入姓名"
          />
        </label>
        <label className="block">
          <span className="text-sm font-black text-ink">联系电话 / 微信</span>
          <input
            name="phone"
            required
            maxLength={40}
            className="mt-2 w-full rounded-lg border border-[#dcecff] bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-[#095daf]"
            placeholder="请输入电话或微信"
          />
        </label>
        <label className="block">
          <span className="text-sm font-black text-ink">咨询类型</span>
          <select
            name="role"
            className="mt-2 w-full rounded-lg border border-[#dcecff] bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-[#095daf]"
            defaultValue={roles[0]}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-black text-ink">所在城市</span>
          <input
            name="city"
            maxLength={40}
            className="mt-2 w-full rounded-lg border border-[#dcecff] bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-[#095daf]"
            placeholder="例如：重庆"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-black text-ink">咨询内容</span>
        <textarea
          name="message"
          rows={4}
          maxLength={500}
          className="mt-2 w-full resize-none rounded-lg border border-[#dcecff] bg-white px-4 py-3 text-sm leading-7 text-ink outline-none transition focus:border-[#095daf]"
          placeholder="请简单说明你的合作需求"
        />
      </label>

      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-5 w-full rounded-full bg-[#095daf] px-6 py-3 text-base font-black text-white transition hover:bg-[#074b8d] disabled:cursor-not-allowed disabled:bg-[#94a3b8]"
      >
        {state === "submitting" ? "提交中..." : "提交咨询"}
      </button>

      {message ? (
        <p className={`mt-3 text-sm font-bold ${state === "success" ? "text-leaf-700" : "text-red-600"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
