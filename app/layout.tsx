import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CursorEffect } from "@/components/CursorEffect";
import { organizationJsonLd, seoConfig, siteUrl } from "@/content/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "慧拼读 | 英语单词拼读系统",
    template: "%s | 慧拼读"
  },
  description: seoConfig.defaultDescription,
  applicationName: seoConfig.siteName,
  keywords: [...seoConfig.keywords],
  authors: [{ name: seoConfig.companyName }],
  creator: seoConfig.companyName,
  publisher: seoConfig.companyName,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: "慧拼读 | 英语单词拼读系统",
    description: seoConfig.defaultDescription,
    url: siteUrl,
    siteName: seoConfig.siteName,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/images/brand/system-overview.png",
        width: 1200,
        height: 900,
        alt: "慧拼读英语单词拼读系统"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "慧拼读 | 英语单词拼读系统",
    description: seoConfig.defaultDescription,
    images: ["/images/brand/system-overview.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: "/images/brand/logo.png",
    apple: "/images/brand/logo.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <CursorEffect />
      </body>
    </html>
  );
}
