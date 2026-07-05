import { z } from "zod";

export const loginSchema = z.object({
  account: z.string().min(1, "请输入手机号或邮箱"),
  password: z.string().min(6, "密码至少 6 位"),
  captcha: z.string().optional()
});

export const leadSchema = z.object({
  name: z.string().min(1, "请输入客户姓名"),
  phone: z.string().min(6, "请输入联系电话"),
  city: z.string().optional(),
  organization: z.string().optional(),
  studentCount: z.coerce.number().int().nonnegative().optional(),
  interestedPlan: z.string().optional(),
  message: z.string().optional(),
  sourcePage: z.string().optional(),
  sourceChannel: z.string().optional(),
  status: z.string().default("NEW"),
  intentLevel: z.string().default("MEDIUM"),
  owner: z.string().optional(),
  remark: z.string().optional()
});

export const demoBookingSchema = z.object({
  name: z.string().min(1, "请输入客户姓名"),
  phone: z.string().min(6, "请输入手机号"),
  organization: z.string().optional(),
  city: z.string().optional(),
  bookingTime: z.coerce.date(),
  interest: z.string().optional(),
  method: z.string(),
  status: z.string().default("PENDING"),
  remark: z.string().optional()
});

export const pricingPlanSchema = z.object({
  name: z.string().min(1, "请输入套餐名称"),
  price: z.coerce.number().int().nonnegative(),
  billingCycle: z.string().min(1, "请输入计费周期"),
  tag: z.string().optional(),
  targetAudience: z.string().min(1, "请输入适合对象"),
  buttonText: z.string().min(1, "请输入按钮文案"),
  sortOrder: z.coerce.number().int().default(0),
  visible: z.coerce.boolean().default(true),
  recommended: z.coerce.boolean().default(false),
  accentColor: z.string().default("#165DFF")
});

export const demoVideoSchema = z.object({
  title: z.string().min(1, "请输入视频标题"),
  category: z.string().min(1, "请选择视频分类"),
  coverUrl: z.string().optional(),
  videoUrl: z.string().min(1, "请输入视频地址"),
  description: z.string().optional(),
  sortOrder: z.coerce.number().int().default(0),
  visible: z.coerce.boolean().default(true)
});

export const caseStudySchema = z.object({
  organization: z.string().min(1, "请输入机构名称"),
  city: z.string().min(1, "请输入城市"),
  planName: z.string().min(1, "请输入套餐"),
  classMode: z.string().min(1, "请输入上课模式"),
  enrollmentCount: z.coerce.number().int().optional(),
  renewalRate: z.string().optional(),
  studentGrowth: z.string().optional(),
  parentFeedback: z.string().optional(),
  principalQuote: z.string().optional(),
  detail: z.string().optional(),
  featured: z.coerce.boolean().default(false),
  visible: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0)
});

export const faqSchema = z.object({
  question: z.string().min(1, "请输入问题"),
  answer: z.string().min(1, "请输入答案"),
  category: z.string().optional(),
  sortOrder: z.coerce.number().int().default(0),
  visible: z.coerce.boolean().default(true)
});

export const followUpSchema = z.object({
  leadId: z.string().min(1, "请选择线索"),
  followerName: z.string().min(1, "请输入跟进人"),
  method: z.string().min(1, "请选择跟进方式"),
  content: z.string().min(1, "请输入跟进内容"),
  nextFollowAt: z.coerce.date().optional(),
  result: z.string().min(1, "请选择跟进结果")
});

export const adminUserSchema = z.object({
  name: z.string().min(1, "请输入姓名"),
  email: z.string().email("邮箱格式不正确").optional(),
  phone: z.string().optional(),
  role: z.string().min(1, "请选择角色"),
  disabled: z.coerce.boolean().default(false)
});

export const siteSettingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
  group: z.string().default("basic")
});

export const formConfigSchema = z.object({
  fieldKey: z.string().min(1),
  label: z.string().min(1),
  fieldType: z.string().min(1),
  required: z.coerce.boolean().default(false),
  visible: z.coerce.boolean().default(true),
  placeholder: z.string().optional(),
  sortOrder: z.coerce.number().int().default(0)
});
