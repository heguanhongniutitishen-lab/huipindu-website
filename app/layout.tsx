import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { readSiteConfig } from "@/lib/site-config-store";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await readSiteConfig();

  return {
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords.split(",").map((item) => item.trim()).filter(Boolean),
    openGraph: {
      title: config.seo.ogTitle,
      description: config.seo.ogDescription,
      type: "website",
      locale: "zh_CN"
    }
  };
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
