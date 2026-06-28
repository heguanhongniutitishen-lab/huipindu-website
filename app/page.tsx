import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { seoConfig, siteUrl } from "@/content/seo";

export const metadata: Metadata = {
  title: "慧拼读官网 | 英语单词拼读系统",
  description: seoConfig.defaultDescription,
  alternates: {
    canonical: siteUrl
  }
};

export default function Page() {
  return <HomePage />;
}
