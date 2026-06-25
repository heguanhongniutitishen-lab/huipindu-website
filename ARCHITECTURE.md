# 慧拼读官网第一版架构

## 技术选型

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS
- Content: 本地 TypeScript 配置文件
- Assets: `public/images/brand`
- Backend: 第一版不做复杂后台，仅预留联系表单 API
- Deploy: Vercel

## 架构原则

- 官网内容先集中写在 `content/site.ts`，后续改文案、导航、模块标题、联系人信息时优先改配置。
- 页面组件只负责展示，尽量不把大段文案散落在 JSX 中。
- 首版不引入 CMS、数据库、登录系统或复杂后台。
- 联系我们先保留二维码直连咨询，同时预留 `/api/contact` 作为后续表单、CRM 或第三方表单服务入口。
- 图片统一放在 `public/images/brand`，代码里使用稳定语义化文件名。

## 完整项目结构

```text
.
├─ app/
│  ├─ api/
│  │  └─ contact/
│  │     └─ route.ts
│  ├─ about/page.tsx
│  ├─ advantages/page.tsx
│  ├─ contact/page.tsx
│  ├─ cooperation/page.tsx
│  ├─ curriculum/page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ BrandMark.tsx
│  ├─ Footer.tsx
│  ├─ Header.tsx
│  ├─ HomePage.tsx
│  └─ SectionHeading.tsx
├─ content/
│  └─ site.ts
├─ public/
│  └─ images/
│     └─ brand/
├─ .env.example
├─ next.config.mjs
├─ package.json
├─ postcss.config.mjs
├─ tailwind.config.ts
└─ tsconfig.json
```

## 内容配置

主要内容集中在 `content/site.ts`：

- `companyInfo`: 公司全称、品牌名、公司简介
- `navItems`: 顶部与页脚导航
- `pageCopy`: 子页面标题与说明
- `homeCopy`: 首页首屏、模块、优势、联系人等内容

后续运营人员或开发人员修改文案时，优先改这个文件。

## 页面规划

- 首页 `/`: 品牌主张、慧拼读是什么、适合谁使用、课程体系、核心优势、适合机构、联系我们
- 品牌介绍 `/about`: 公司与品牌介绍
- 课程体系 `/curriculum`: 课程路径与训练体系
- 产品优势 `/advantages`: 系统能力与机构价值
- 合作加盟 `/cooperation`: 面向机构和代理伙伴
- 联系我们 `/contact`: 咨询入口、联系人、二维码、后续表单入口

## 联系我们方案

第一版推荐两种方式并行：

- 直接咨询：页面展示王老师、蒋老师二维码和电话。
- 预留 API：`POST /api/contact` 接收表单数据。

预留接口字段建议：

```json
{
  "name": "联系人姓名",
  "phone": "联系电话",
  "role": "家长/老师/机构/代理",
  "message": "咨询内容"
}
```

后续可接入 Formspree、飞书、企业微信、钉钉、Notion、Airtable、自建 CRM 或数据库。

