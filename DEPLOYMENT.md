# Vercel 部署说明

## 部署前检查

```bash
npm install
npm run build
```

## Vercel 控制台部署

1. 将项目提交到 GitHub / GitLab / Bitbucket。
2. 登录 Vercel。
3. 点击 `Add New...` -> `Project`。
4. 选择该仓库。
5. Framework Preset 选择 `Next.js`。
6. Build Command 使用默认值：

```bash
npm run build
```

7. Output Directory 保持默认。
8. 点击 Deploy。

## Vercel CLI 部署

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

## 环境变量

首版没有必须环境变量。

如果后续接入第三方表单，可在 Vercel 项目设置中添加：

```text
CONTACT_FORM_ENDPOINT=第三方表单或 webhook 地址
```

## 推荐设置

- Framework Preset: `Next.js`
- Install Command: `npm install`
- Build Command: `npm run build`
- Development Command: `npm run dev`
- Node.js Version: Vercel 默认 LTS 即可

## 部署后验证

- 首页是否正常加载 Logo 和图片
- 移动端是否无横向滚动
- `/about`、`/curriculum`、`/cooperation`、`/contact` 是否可访问
- 联系二维码是否清晰可扫码
- `POST /api/contact` 是否能返回 JSON

示例：

```bash
curl -X POST https://your-domain.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"测试\",\"phone\":\"17000000000\",\"message\":\"咨询合作\"}"
```

