import { Metadata } from "next";
import { companyInfo, pageCopy } from "./site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://huipindu-website.vercel.app";

export const seoConfig = {
  siteName: "慧拼读官网",
  brandName: companyInfo.brand,
  companyName: companyInfo.name,
  url: siteUrl,
  keywords: [
    "慧拼读",
    "英语单词拼读",
    "单词学习系统",
    "英语培训机构",
    "教培机构合作",
    "单词拼读课程",
    "小学英语单词",
    "初中英语单词",
    "高中英语单词",
    "英语机构加盟",
    "区域代理合作"
  ],
  defaultDescription:
    "慧拼读专注英语单词拼读系统，为教培机构、学校、个人老师和区域代理伙伴提供课程系统、教学支持与运营协同方案。"
} as const;

type SeoPageKey = keyof typeof pageCopy;

const pageTitles: Record<SeoPageKey, string> = {
  about: "品牌介绍",
  curriculum: "课程体系",
  advantages: "产品优势",
  cooperation: "合作加盟",
  contact: "联系我们"
};

export function createPageMetadata(page: SeoPageKey, path: string): Metadata {
  const copy = pageCopy[page];
  const title = `${pageTitles[page]} | ${seoConfig.brandName}`;
  const url = `${siteUrl}${path}`;

  return {
    title,
    description: copy.description,
    keywords: [...seoConfig.keywords],
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description: copy.description,
      url,
      siteName: seoConfig.siteName,
      locale: "zh_CN",
      type: "website",
      images: [
        {
          url: copy.image,
          width: 1200,
          height: 900,
          alt: `${copy.title} - ${seoConfig.brandName}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.description,
      images: [copy.image]
    }
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: seoConfig.companyName,
  alternateName: seoConfig.brandName,
  url: siteUrl,
  logo: `${siteUrl}/images/brand/logo.png`,
  description: seoConfig.defaultDescription,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "合作咨询",
      telephone: "+86-17095752608",
      areaServed: "CN",
      availableLanguage: "Chinese"
    },
    {
      "@type": "ContactPoint",
      contactType: "代理合作",
      telephone: "+86-15715659761",
      areaServed: "CN",
      availableLanguage: "Chinese"
    }
  ]
};
