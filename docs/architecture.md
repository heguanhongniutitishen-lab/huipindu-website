# 慧拼读官网后台架构

当前系统按 ToB 招商官网的线索转化链路拆分为三个应用：

```text
apps
├── website   官网，负责招商内容展示、留资表单、预约演示入口
├── admin     后台，负责线索、内容、套餐、案例、视频、FAQ、销售跟进
└── api       API 服务，负责 CMS / CRM / Admin 统一数据接口
```

请求链路：

```text
website
  │
  ▼
API Gateway
  │
  ├── CMS    官网内容、FAQ、套餐、案例、演示视频
  ├── CRM    线索、预约、跟进、导出
  └── Admin  管理员、权限、系统设置
        │
        ▼
      MySQL
        │
        ▼
     OSS / R2
```

实现约定：

- `website` 只负责前台转化体验，提交表单调用 `/api/leads`，预约演示调用 `/api/demo-bookings`。
- `admin` 只负责后台工作台，不直接写业务数据，统一走 API。
- `api` 通过 Prisma 访问 MySQL，通过统一上传服务对接 OSS / R2。
- 图片、视频、Logo、二维码等文件只在数据库保存 URL，二进制文件进入 OSS / R2。
- CMS、CRM、Admin 三类能力共享同一个 MySQL 数据库，但通过模块化 API 隔离权限。

当前仓库先保持单 Next.js 项目可运行形态：

- 官网：`app/page.tsx`、`components/landing-page.tsx`
- 后台：`app/admin/**`
- API：`app/api/**`
- 数据模型：`prisma/schema.prisma`

后续需要物理拆分时，可将上述目录迁移到 `apps/website`、`apps/admin`、`apps/api`，Prisma schema 和共享类型可抽到 `packages/database` 与 `packages/shared`。
