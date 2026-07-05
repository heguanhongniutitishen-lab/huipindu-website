import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "慧拼读AI英语单词学习系统 - 培训机构英语课程解决方案",
  description:
    "慧拼读是一套面向培训机构的AI英语单词学习系统，覆盖机构端、交付中心、教练端、学员端、家长端，支持小班课一对多和一对一教学，提供单词训练、抗遗忘复习、每日打卡、学习报告、家长端同步和总部运营支持。",
  keywords: [
    "英语单词学习系统",
    "培训机构英语系统",
    "AI英语学习系统",
    "小班课英语系统",
    "英语机构招生方案",
    "英语单词训练系统",
    "家长端学习报告",
    "培训机构课程系统"
  ],
  openGraph: {
    title: "慧拼读AI英语单词学习系统",
    description: "面向培训机构的英语单词学习与课程交付系统。",
    type: "website",
    locale: "zh_CN"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
