# huipindu-two

慧拼读 AI 英语单词学习系统官网高转化版，包含官网前台、官网后台、内容配置接口和邮件留资接口。

## 技术栈

- Next.js
- TypeScript
- Tailwind CSS
- NextAuth
- Prisma
- Recharts

## 本地运行

```bash
npm install
npm run dev
```

访问：

- 官网：`http://localhost:3000`
- 后台：`http://localhost:3000/admin`

## 目录结构

- `app/`: Next.js App Router 页面和 API
- `components/landing-page.tsx`: 官网首页
- `components/admin/`: 官网后台组件
- `lib/admin/`: 本地数据读写、默认配置和导出逻辑
- `lib/email.ts`: 官网留资邮件发送逻辑
- `prisma/schema.prisma`: 数据库模型
- `public/images/`: 官网图片素材

## 环境变量

复制 `.env.example` 后按实际部署环境配置。不要把真实 `.env` 提交到 GitHub。
