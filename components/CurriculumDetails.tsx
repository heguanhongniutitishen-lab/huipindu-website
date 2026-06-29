"use client";

import { useEffect, useState } from "react";

type CurriculumDetailsProps = {
  levels: readonly string[];
};

const detailMap: Record<string, { title: string; summary: string; points: string[] }> = {
  自然拼读规则: {
    title: "自然拼读规则",
    summary: "从字母音、组合音到常见拼读规则，帮助孩子建立看词能读的基础能力。",
    points: ["掌握字母与发音对应关系", "学习元音、辅音、字母组合规律", "通过例词训练形成拼读反射"]
  },
  单词专项训练: {
    title: "单词专项训练",
    summary: "围绕高频词、课标词和阶段词汇进行专项训练，让孩子在练习中巩固记忆。",
    points: ["按难度和学段分层训练", "支持听音选词、看词拼读、词义匹配", "训练结果可用于学习反馈"]
  },
  科学记忆方法: {
    title: "科学记忆方法",
    summary: "结合拼读规律和抗遗忘复习节奏，减少死记硬背，提高单词长期记忆效果。",
    points: ["用规律辅助记忆", "重复复习重点易错词", "让孩子逐步形成自主记词方法"]
  },
  阅读与语法提升: {
    title: "阅读与语法提升",
    summary: "在单词基础上衔接短文阅读与语法理解，帮助孩子把词汇能力转化为阅读能力。",
    points: ["词汇、句子、短文逐步进阶", "训练语境理解与表达能力", "适合小初高英语学习衔接"]
  },
  阶段测评反馈: {
    title: "阶段测评反馈",
    summary: "通过阶段检测掌握学习情况，让老师和家长及时看到孩子的薄弱点和进步。",
    points: ["记录训练完成情况", "反馈错词与薄弱规则", "辅助老师调整教学安排"]
  },
  复习打卡巩固: {
    title: "复习打卡巩固",
    summary: "用每日复习和打卡机制保持学习节奏，让单词学习更持续、更稳定。",
    points: ["每日任务降低坚持难度", "复习旧词防止遗忘", "帮助孩子建立学习习惯"]
  }
};

function fallbackDetail(level: string) {
  return {
    title: level,
    summary: "围绕慧拼读系统课程目标设计，支持孩子循序渐进完成单词拼读、记忆、检测与复习。",
    points: ["系统化学习路径", "适合课堂与课后训练", "支持机构教学落地"]
  };
}

export function CurriculumDetails({ levels }: CurriculumDetailsProps) {
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const detail = activeLevel ? detailMap[activeLevel] || fallbackDetail(activeLevel) : null;

  useEffect(() => {
    if (!activeLevel) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveLevel(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeLevel]);

  return (
    <>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-8">
        {levels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setActiveLevel(level)}
          className="group flex min-h-16 items-center justify-between rounded-lg bg-[#f7fbff] px-5 py-4 text-left text-sm font-black leading-6 text-[#095daf] shadow-sm ring-1 ring-[#dcecff] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#095daf] sm:min-h-14 lg:px-6 lg:py-5"
          >
            <span>{level}</span>
            <span className="ml-4 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-base text-[#f5a400] shadow-sm transition group-hover:bg-[#fff2cc]">
              +
            </span>
          </button>
        ))}
      </div>

      {detail ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#061b3b]/58 px-3 py-4 backdrop-blur-sm sm:items-center sm:px-5">
          <button
            type="button"
            aria-label="关闭课程详情"
            className="absolute inset-0"
            onClick={() => setActiveLevel(null)}
          />
          <div className="relative w-full max-w-2xl rounded-xl bg-white p-5 shadow-[0_24px_80px_rgba(6,27,59,0.28)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f5a400]">Course Detail</p>
                <h3 className="mt-2 text-2xl font-black leading-tight text-[#061b3b] sm:text-3xl">{detail.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveLevel(null)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#eef7ff] text-xl font-black text-[#095daf] transition hover:bg-[#dcecff]"
                aria-label="关闭"
              >
                ×
              </button>
            </div>

            <p className="mt-5 text-base leading-8 text-[#475569]">{detail.summary}</p>
            <div className="mt-6 grid gap-3">
              {detail.points.map((point) => (
                <div key={point} className="rounded-lg border border-[#dcecff] bg-[#f7fbff] px-4 py-3 text-sm font-bold leading-6 text-[#12325f]">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
