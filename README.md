# 慧拼读品牌官网

慧拼读官网第一版基于 Next.js、TypeScript、Tailwind CSS 构建，内容集中在本地配置文件中，方便后续维护和部署到 Vercel。

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- 本地内容配置
- 预留联系表单 API
- 支持 Vercel 部署

## 快速开始

```bash
npm install
npm run dev
```

访问：

```text
http://localhost:3000
```

## 常用命令

```bash
npm run dev
npm run build
npm run start
```

## 内容修改

官网文案集中在：

```text
content/site.ts
```

图片素材集中在：

```text
public/images/brand
```

## 项目文档

- 架构说明：[ARCHITECTURE.md](./ARCHITECTURE.md)
- 部署说明：[DEPLOYMENT.md](./DEPLOYMENT.md)
