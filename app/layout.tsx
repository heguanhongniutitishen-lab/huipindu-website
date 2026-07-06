import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "慧拼读单词系统 - 英语培训机构智能单词课程解决方案",
  description:
    "慧拼读单词系统是一套面向英语培训机构的智能单词学习与教学系统，覆盖机构端、交付中心、学员端、家长端，帮助机构快速开课、提升续费率、降低运营成本。",
  keywords: [
    "英语单词学习系统",
    "培训机构英语系统",
    "英语机构招生方案",
    "小班课英语系统",
    "英语单词训练系统",
    "家长端学习报告",
    "培训机构课程系统"
  ],
  openGraph: {
    title: "慧拼读单词系统",
    description: "面向英语培训机构的智能单词学习与教学系统。",
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
