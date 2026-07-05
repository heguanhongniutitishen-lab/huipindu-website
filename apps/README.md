# apps 目录规划

目标架构：

```text
apps
├── website
├── admin
└── api
```

当前版本为了保证官网和后台可以直接运行，仍使用单个 Next.js App Router 项目承载：

- `app/page.tsx`：官网首页
- `app/admin/**`：后台管理系统
- `app/api/**`：API 服务

当需要部署为独立服务时，再将三个目录拆成独立应用，并把 Prisma、Zod schema、业务类型沉淀到 `packages/*`。

本地运行：

```bash
npm install
npx prisma generate
npm run dev
```

后台演示账号：

- 账号：`admin@huipindu.com`
- 密码：`admin123`

数据库初始化：

```bash
copy .env.example .env
npx prisma migrate dev --name init
```
