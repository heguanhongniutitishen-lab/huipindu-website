import {
  FileQuestion,
  FileText,
  Globe2,
  LayoutDashboard,
  MessageSquareMore,
  PlaySquare,
  Settings,
  ShieldCheck,
  Trophy,
  Users
} from "lucide-react";

export const navItems = [
  { href: "/admin", label: "数据总览", icon: LayoutDashboard },
  { href: "/admin/demo-videos", label: "演示视频", icon: PlaySquare },
  { href: "/admin/cases", label: "成功案例", icon: Trophy },
  { href: "/admin/website", label: "官网编辑", icon: Globe2 },
  { href: "/admin/cms", label: "官网内容", icon: FileText },
  { href: "/admin/faqs", label: "FAQ管理", icon: FileQuestion },
  { href: "/admin/form-settings", label: "表单配置", icon: MessageSquareMore },
  { href: "/admin/admin-users", label: "管理员", icon: Users },
  { href: "/admin/settings", label: "系统设置", icon: Settings },
  { href: "/admin/permissions", label: "权限说明", icon: ShieldCheck }
];

export const dashboardMetrics = [
  { label: "今日邮件线索", value: "0", delta: "真实数据" },
  { label: "累计邮件线索", value: "0", delta: "真实数据" },
  { label: "预约演示邮件", value: "0", delta: "真实数据" },
  { label: "领取资料邮件", value: "0", delta: "真实数据" },
  { label: "已配置套餐", value: "0", delta: "真实数据" },
  { label: "演示视频", value: "0", delta: "真实数据" },
  { label: "成功案例", value: "0", delta: "真实数据" },
  { label: "FAQ数量", value: "0", delta: "真实数据" }
];

export const visitTrend = [
  { name: "周一", visits: 0, leads: 0 },
  { name: "周二", visits: 0, leads: 0 },
  { name: "周三", visits: 0, leads: 0 },
  { name: "周四", visits: 0, leads: 0 },
  { name: "周五", visits: 0, leads: 0 },
  { name: "周六", visits: 0, leads: 0 },
  { name: "周日", visits: 0, leads: 0 }
];

export const leadTrend = Array.from({ length: 30 }, (_, index) => ({
  day: `${index + 1}`,
  leads: 0
}));

export const sourcePie = [
  { name: "首页表单", value: 0 },
  { name: "套餐模块", value: 0 },
  { name: "视频演示", value: 0 },
  { name: "案例页", value: 0 }
];

export const planPie = [
  { name: "标准版", value: 0 },
  { name: "进阶版", value: 0 },
  { name: "旗舰版", value: 0 }
];

export const cityData = [
  { city: "郑州", value: 0 },
  { city: "成都", value: 0 },
  { city: "西安", value: 0 },
  { city: "杭州", value: 0 },
  { city: "武汉", value: 0 }
];

export const intentData = [
  { name: "高意向", value: 0 },
  { name: "中意向", value: 0 },
  { name: "低意向", value: 0 }
];

export const leads = [
  {
    id: "L-20260704001",
    name: "王校长",
    phone: "138****1028",
    city: "郑州",
    organization: "启航英语成长中心",
    studentCount: 260,
    interestedPlan: "进阶版",
    message: "想先了解小班课交付和家长端学习报告。",
    sourcePage: "首页 Hero",
    sourceChannel: "朋友圈广告",
    status: "未跟进",
    intentLevel: "高",
    owner: "刘敏",
    createdAt: "2026-07-04 09:42"
  },
  {
    id: "L-20260704002",
    name: "陈老师",
    phone: "136****8891",
    city: "成都",
    organization: "青藤托管校区",
    studentCount: 120,
    interestedPlan: "标准版",
    message: "托管晚辅想增加英语单词课。",
    sourcePage: "套餐区",
    sourceChannel: "自然搜索",
    status: "已联系",
    intentLevel: "中",
    owner: "张伟",
    createdAt: "2026-07-04 10:18"
  },
  {
    id: "L-20260703019",
    name: "李总",
    phone: "159****7720",
    city: "西安",
    organization: "区域教育平台招商",
    studentCount: 800,
    interestedPlan: "旗舰版",
    message: "关注区域代理和多校区复制。",
    sourcePage: "案例区",
    sourceChannel: "抖音信息流",
    status: "已预约演示",
    intentLevel: "高",
    owner: "刘敏",
    createdAt: "2026-07-03 16:26"
  }
];

export const demoBookings = [
  {
    id: "D-001",
    name: "王校长",
    phone: "138****1028",
    organization: "启航英语成长中心",
    city: "郑州",
    bookingTime: "2026-07-04 15:00",
    interest: "学员端演示、小班课上课演示",
    method: "腾讯会议",
    status: "待确认",
    remark: "先发会议链接"
  },
  {
    id: "D-002",
    name: "李总",
    phone: "159****7720",
    organization: "区域教育平台招商",
    city: "西安",
    bookingTime: "2026-07-05 10:30",
    interest: "代理政策、旗舰版权益",
    method: "微信演示",
    status: "已确认",
    remark: "高意向"
  }
];

export const pricingPlans = [
  {
    id: "P-STD",
    name: "标准版",
    price: "6800 / 年",
    tag: "轻量启动",
    targetAudience: "托管校区、单校区英语启蒙机构",
    buttonText: "咨询标准版",
    sortOrder: 1,
    visible: "显示",
    accentColor: "蓝色",
    features: "机构自由定价、系统功能培训、售后问题处理"
  },
  {
    id: "P-PRO",
    name: "进阶版",
    price: "8800 / 年",
    tag: "推荐",
    targetAudience: "已有英语/托管学员，希望做标准化交付的机构",
    buttonText: "咨询进阶版",
    sortOrder: 2,
    visible: "显示",
    accentColor: "橙色",
    features: "教研指导方案、招生方案、营销素材、免费升级"
  },
  {
    id: "P-FLAG",
    name: "旗舰版",
    price: "49800 / 永久使用",
    tag: "区域增长",
    targetAudience: "多校区、区域代理、新店扩张团队",
    buttonText: "领取旗舰方案",
    sortOrder: 3,
    visible: "显示",
    accentColor: "深蓝",
    features: "上门教研、上门策划招生、活动策划、运营陪跑"
  }
];

export const demoVideos = [
  {
    id: "V-001",
    title: "学员端演示视频",
    category: "学员端演示",
    coverUrl: "/images/student-report-mobile.png",
    videoUrl: "https://example.com/student-demo.mp4",
    description: "展示学生每日训练、复习、学习报告。",
    sortOrder: 1,
    visible: "显示"
  },
  {
    id: "V-002",
    title: "小班课视频",
    category: "小班课上课演示",
    coverUrl: "/images/classroom-realistic.png",
    videoUrl: "https://example.com/class-demo.mp4",
    description: "展示机构标准化小班课交付。",
    sortOrder: 2,
    visible: "显示"
  },
  {
    id: "V-003",
    title: "一对一课视频",
    category: "一对一上课演示",
    coverUrl: "/images/one-on-one-realistic.png",
    videoUrl: "https://example.com/one-on-one-demo.mp4",
    description: "展示个性化单词训练流程。",
    sortOrder: 3,
    visible: "显示"
  }
];

export const cases = [
  {
    id: "C-001",
    organization: "启航英语成长中心",
    city: "郑州",
    planName: "进阶版",
    classMode: "小班课一对多",
    enrollmentCount: 96,
    renewalRate: "83%",
    studentGrowth: "+41%",
    parentFeedback: "家长能看到每日学习进度，续费沟通更顺。",
    principalQuote: "课程标准化后，老师备课压力明显下降。",
    featured: "首页推荐",
    sortOrder: 1
  },
  {
    id: "C-002",
    organization: "青藤托管校区",
    city: "成都",
    planName: "标准版",
    classMode: "混合模式",
    enrollmentCount: 54,
    renewalRate: "76%",
    studentGrowth: "+28%",
    parentFeedback: "孩子每天有单词打卡，家长更有感知。",
    principalQuote: "托管晚辅增加了一个可收费的英语项目。",
    featured: "首页推荐",
    sortOrder: 2
  }
];

export const cmsSections = [
  {
    id: "CMS-HERO",
    moduleKey: "home.hero",
    title: "一套系统，解决机构英语单词教学全流程",
    subtitle: "覆盖机构端、交付中心、教练端、学员端、家长端，帮助机构提升交付效率和续费率。",
    visible: "显示",
    sortOrder: 1
  },
  {
    id: "CMS-PORTS",
    moduleKey: "home.ports",
    title: "五端协同",
    subtitle: "机构、教练、学员、家长和总部协作清晰。",
    visible: "显示",
    sortOrder: 2
  },
  {
    id: "CMS-SUPPORT",
    moduleKey: "home.support",
    title: "总部运营支持",
    subtitle: "教研、招生、素材、售后和运营陪跑。",
    visible: "显示",
    sortOrder: 3
  },
  {
    id: "CMS-MODES",
    moduleKey: "home.modes",
    title: "双教学模式，满足不同机构与学员需求",
    subtitle: "小班课适合规模化交付，一对一适合个性化提分。",
    visible: "显示",
    sortOrder: 4
  },
  {
    id: "CMS-FUNCTIONS",
    moduleKey: "home.functions",
    title: "丰富学习功能，全方位提升词汇能力",
    subtitle: "把单词训练、复习、检测、报告和家长反馈放进同一套系统。",
    visible: "显示",
    sortOrder: 5
  },
  {
    id: "CMS-DEMO",
    moduleKey: "home.demo",
    title: "产品演示，一眼看懂系统如何交付",
    subtitle: "后台上传、替换或隐藏视频后，官网产品演示模块同步更新。",
    visible: "显示",
    sortOrder: 6
  },
  {
    id: "CMS-GROWTH",
    moduleKey: "home.growth",
    title: "不只是学习系统，更是机构新的增长项目",
    subtitle: "帮助校区把英语单词课做成可展示、可交付、可续费的标准产品。",
    visible: "显示",
    sortOrder: 7
  },
  {
    id: "CMS-PRICING",
    moduleKey: "home.pricing",
    title: "三档套餐，满足不同阶段机构需求",
    subtitle: "套餐名称、价格、权益和展示状态都可在后台维护。",
    visible: "显示",
    sortOrder: 8
  },
  {
    id: "CMS-ROI",
    moduleKey: "home.roi",
    title: "校长最关心的账，帮你算清楚",
    subtitle: "用客单价、招生人数和续费预估项目回报，辅助合作决策。",
    visible: "显示",
    sortOrder: 9
  },
  {
    id: "CMS-CASES",
    moduleKey: "home.cases",
    title: "成功案例，让结果说话",
    subtitle: "展示机构真实交付场景、招生结果和校长反馈。",
    visible: "显示",
    sortOrder: 10
  },
  {
    id: "CMS-LEAD-DEMO",
    moduleKey: "home.lead.demo",
    title: "预约产品演示",
    subtitle: "留下联系方式，顾问会根据机构情况安排演示。",
    visible: "显示",
    sortOrder: 11
  },
  {
    id: "CMS-LEAD-MATERIALS",
    moduleKey: "home.lead.materials",
    title: "领取产品资料",
    subtitle: "获取合作方案、产品介绍和套餐资料。",
    visible: "显示",
    sortOrder: 12
  },
  {
    id: "CMS-FAQ",
    moduleKey: "home.faq",
    title: "FAQ 常见问题",
    subtitle: "把校长合作前最关心的问题提前讲清楚。",
    visible: "显示",
    sortOrder: 13
  },
  {
    id: "CMS-FINAL-CTA",
    moduleKey: "home.finalCta",
    title: "想把英语单词课做成校区新增收项目？",
    subtitle: "预约演示后，我们会根据你的校区规模、班型和客单价，给出更具体的合作建议。",
    visible: "显示",
    sortOrder: 14
  }
];

export const faqs = [
  { id: "F-001", question: "这个系统适合哪些机构？", answer: "适合英语培训机构、托管校区、素质教育机构和区域代理商。", category: "合作", visible: "显示", sortOrder: 1 },
  { id: "F-002", question: "机构可以自己定价吗？", answer: "可以，机构可结合本地客单价自由设置课程收费。", category: "套餐", visible: "显示", sortOrder: 2 },
  { id: "F-003", question: "小班课怎么上？", answer: "总部提供标准化上课流程和训练系统，老师按流程组织课堂。", category: "交付", visible: "显示", sortOrder: 3 },
  { id: "F-004", question: "总部提供哪些支持？", answer: "包含系统培训、教研指导、招生方案、营销素材、升级和售后支持。", category: "支持", visible: "显示", sortOrder: 4 }
];

export const formFields = [
  { id: "name", label: "姓名", fieldKey: "name", fieldType: "文本", required: "必填", visible: "显示", placeholder: "请输入姓名", sortOrder: 1 },
  { id: "phone", label: "联系电话", fieldKey: "phone", fieldType: "手机号", required: "必填", visible: "显示", placeholder: "请输入手机号", sortOrder: 2 },
  { id: "city", label: "所在城市", fieldKey: "city", fieldType: "文本", required: "选填", visible: "显示", placeholder: "请输入城市", sortOrder: 3 },
  { id: "plan", label: "感兴趣套餐", fieldKey: "interestedPlan", fieldType: "下拉", required: "选填", visible: "显示", placeholder: "请选择套餐", sortOrder: 4 }
];

export const followUps = [
  {
    id: "FU-001",
    lead: "王校长 / 启航英语成长中心",
    followerName: "刘敏",
    method: "电话",
    content: "已沟通小班课交付，客户关注家长端报告。",
    nextFollowAt: "2026-07-05 10:00",
    result: "已预约演示"
  },
  {
    id: "FU-002",
    lead: "陈老师 / 青藤托管校区",
    followerName: "张伟",
    method: "微信",
    content: "发送标准版资料，约明天确认预算。",
    nextFollowAt: "2026-07-05 14:30",
    result: "有兴趣"
  }
];

export const adminUsers = [
  { id: "U-001", name: "超级管理员", email: "已隐藏", phone: "已隐藏", role: "超级管理员", disabled: "启用" },
  { id: "U-002", name: "刘敏", email: "sales01@huipindu.com", phone: "139****2201", role: "销售管理员", disabled: "启用" },
  { id: "U-003", name: "内容运营", email: "content@huipindu.com", phone: "137****0912", role: "内容管理员", disabled: "启用" }
];

export const settings = [
  { id: "S-001", key: "网站名称", value: "慧拼读 AI英语单词学习系统", group: "基础信息" },
  { id: "S-002", key: "联系电话", value: "400-000-0000", group: "联系方式" },
  { id: "S-003", key: "公司名称", value: "慧拼读教育科技", group: "备案信息" },
  { id: "S-004", key: "SEO标题", value: "慧拼读AI英语单词学习系统", group: "SEO" },
  { id: "S-005", key: "首页电脑图", value: "/images/system-dashboard.png", group: "前台图片" },
  { id: "S-006", key: "首页手机图", value: "/images/student-report-mobile.png", group: "前台图片" },
  { id: "S-007", key: "案例默认图", value: "/images/classroom-training-screen.png", group: "前台图片" }
];
