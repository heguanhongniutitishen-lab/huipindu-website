import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "慧拼读 | 重庆市校艺科技有限公司",
  description:
    "慧拼读是一家专注于英语自然拼读系统的品牌，致力于为孩子打造科学、高效、充满趣味的英语学习系统。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
