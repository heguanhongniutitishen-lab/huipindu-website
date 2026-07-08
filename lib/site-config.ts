export type SiteConfig = {
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
  };
  brand: {
    logo: string;
    name: string;
    footerIntro: string;
    copyright: string;
  };
  nav: Array<{ label: string; target: string }>;
  hero: {
    badge: string;
    title: string;
    titleSuffix: string;
    slogan: string;
    description: string;
    primaryButton: string;
    primaryTarget: string;
    image: string;
    stats: Array<{ value: string; label: string }>;
    scenes: string[];
  };
  productSystem: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{ title: string; text: string; icon: string; points: string[] }>;
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{ title: string; text: string; icon: string }>;
  };
  teachingModes: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{ title: string; text: string; image: string; points: string[] }>;
  };
  video: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cover: string;
    url: string;
  };
  support: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: string[];
  };
  cases: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{ name: string; time: string; image: string; metrics: string[]; quote: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{ question: string; answer: string }>;
  };
  leadForm: {
    eyebrow: string;
    title: string;
    subtitle: string;
    submitText: string;
    successText: string;
    image: string;
    fields: Array<{ key: string; label: string; placeholder: string; type: string; required: boolean; visible: boolean }>;
  };
  contacts: Array<{ type: string; label: string; value: string; image?: string; visible: boolean }>;
};

export const defaultSiteConfig: SiteConfig = {
  seo: {
    title: "慧拼读单词训练系统 - 英语培训机构智能单词课程解决方案",
    description: "慧拼读单词训练系统面向英语培训机构，覆盖机构后台、交付中心、学员端、家长端，帮助机构快速开课、提升续费率。",
    keywords: "慧拼读,英语单词训练系统,培训机构英语系统,单词课程,家长端学习报告",
    ogTitle: "慧拼读单词训练系统",
    ogDescription: "面向英语培训机构的智能单词训练与教学交付系统。"
  },
  brand: {
    logo: "/images/logo.png",
    name: "慧拼读单词训练系统",
    footerIntro: "面向英语培训机构的智能单词学习与教学系统，帮助机构快速开课、提升续费率、降低运营成本。",
    copyright: "Copyright © 2026 慧拼读单词训练系统. All rights reserved."
  },
  nav: [
    { label: "首页", target: "hero" },
    { label: "产品", target: "system" },
    { label: "功能", target: "features" },
    { label: "演示", target: "video" },
    { label: "赋能", target: "support" },
    { label: "案例", target: "cases" },
    { label: "咨询", target: "lead" }
  ],
  hero: {
    badge: "面向培训机构的英语单词训练增长系统",
    title: "慧拼读",
    titleSuffix: "单词训练系统",
    slogan: "让孩子见词能读，听词能写",
    description: "以单词训练为核心，掌握单词规律，配合语法、阅读、口语训练，帮助孩子真正建立英语能力，帮助机构快速开课、提升续费率。",
    primaryButton: "查看系统演示",
    primaryTarget: "video",
    image: "/images/hero-device-showcase-transparent.png",
    stats: [
      { value: "200+", label: "合作机构" },
      { value: "5000+", label: "在用学员" }
    ],
    scenes: ["艺术培训机构", "英语培训机构", "托管机构", "社区培训机构"]
  },
  productSystem: {
    eyebrow: "四端产品体系",
    title: "四端产品体系，全方位赋能机构教学",
    subtitle: "机构后台、交付中心、学员端、家长端协同运转，让课程交付标准化、数据化、可复制。",
    items: [
      { title: "机构后台", text: "面向校长和校区管理者。", icon: "Building2", points: ["课程管理", "学员管理", "数据统计", "运营管理"] },
      { title: "交付中心 / 教练端", text: "面向老师和教学教练。", icon: "Presentation", points: ["学员小组", "课件设置", "学习检测", "报告生成"] },
      { title: "学员端", text: "面向学员日常学习训练。", icon: "GraduationCap", points: ["单词训练", "抗遗忘复习", "每日打卡", "词汇检测"] },
      { title: "家长端", text: "面向家长效果感知与续费沟通。", icon: "MonitorSmartphone", points: ["学习报告", "学习进度", "打卡情况", "效果反馈"] }
    ]
  },
  features: {
    eyebrow: "核心功能",
    title: "九大核心功能，覆盖英语学习全场景",
    subtitle: "围绕单词训练、抗遗忘复习、语法、口语、阅读、音标和检测持续闭环。",
    items: [
      { title: "单词训练", text: "按词库、课程和任务完成高频训练。", icon: "BookOpenCheck" },
      { title: "抗遗忘复习", text: "结合学习记录自动安排复习节奏。", icon: "Repeat2" },
      { title: "每日打卡", text: "帮助学员建立持续学习习惯。", icon: "ClipboardCheck" },
      { title: "短语训练", text: "从单词拓展到常用短语应用。", icon: "BookText" },
      { title: "语法学习", text: "配合单词课程补齐基础语法。", icon: "Brain" },
      { title: "口语练习", text: "支持发音跟读和口语强化训练。", icon: "Mic2" },
      { title: "阅读练习", text: "用阅读场景提升词汇迁移能力。", icon: "LineChart" },
      { title: "音标学习", text: "夯实拼读、发音和记忆基础。", icon: "Headphones" },
      { title: "词汇量检测", text: "课前课后量化评估学习结果。", icon: "BarChart3" }
    ]
  },
  teachingModes: {
    eyebrow: "教学模式",
    title: "两种教学模式，满足不同机构需求",
    subtitle: "既支持规模化小班课，也支持高客单价一对一强化服务。",
    items: [
      { title: "小班课一对多", text: "一个老师带多个学生学习，适合机构规模化开课。", image: "/images/classroom-realistic.png", points: ["互动氛围好", "性价比高", "续费率高", "适合批量招生"] },
      { title: "一对一", text: "一个老师带一个学生学习，专注度更高，针对性更强。", image: "/images/one-on-one-realistic.png", points: ["个性化更强", "效率更高", "定位更精准", "效果更明显"] }
    ]
  },
  video: {
    eyebrow: "系统演示",
    title: "3分钟看懂慧拼读如何上课",
    subtitle: "从机构管理、教练上课、学员训练到家长报告，一条完整学习闭环清晰展示。",
    cover: "/images/homepage-system-interface.png",
    url: ""
  },
  support: {
    eyebrow: "总部赋能",
    title: "不仅提供系统，更帮助机构赚钱",
    subtitle: "慧拼读为机构提供从系统培训、教研指导、招生方案、活动策划到运营陪跑的完整支持。",
    items: ["系统功能培训", "上课流程培训", "教研指导方案", "机构招生方案", "配套营销活动方案", "营销素材支持", "系统迭代免费升级", "售后问题处理", "运营陪跑指导"]
  },
  process: {
    eyebrow: "合作流程",
    title: "合作流程清晰，最快快速上线开课",
    subtitle: "从咨询到上线开课，每一步都有清晰交付和支持。",
    items: ["咨询沟通", "产品演示", "确认方案", "系统培训", "上线开课", "运营陪跑"]
  },
  cases: {
    eyebrow: "合作案例",
    title: "真实机构增长案例",
    subtitle: "用标准化课程、可视化学习报告和总部运营支持，帮助机构把单词训练做成可持续项目。",
    items: [
      { name: "星启点英语成长中心", time: "合作 6 个月", image: "/images/classroom-training-screen.png", metrics: ["招生增长 42%", "续费率 93%", "单词班营收 +18.6w"], quote: "慧拼读把单词课做成标准产品，新老师也能快速交付，家长看到报告后续费沟通顺畅很多。" },
      { name: "蓝鲸托管学习中心", time: "合作 4 个月", image: "/images/consulting-realistic.png", metrics: ["新增 3 个班", "满班率 86%", "回本 1.2 个班"], quote: "原来托管只是作业辅导，现在有了可售卖的英语训练项目，校区利润结构更健康。" }
    ]
  },
  faq: {
    eyebrow: "FAQ",
    title: "常见问题",
    subtitle: "合作前校长最关心的问题，先帮你说清楚。",
    items: [
      { question: "系统适合哪些机构？", answer: "适合英语培训机构、托管校区、综合素质教育机构，以及想新增英语单词课程项目的教育创业者。" },
      { question: "老师不会用怎么办？", answer: "总部提供系统功能培训、上课流程培训和教研指导，新老师也能按照标准流程快速上手。" },
      { question: "是否支持小班课？", answer: "支持。小班课一对多适合机构规模化开课，提高老师人效和班级收益。" },
      { question: "是否支持一对一？", answer: "支持。一对一适合高客单价服务和针对性强化学习。" }
    ]
  },
  leadForm: {
    eyebrow: "预约产品演示",
    title: "预约产品演示，获取专属合作方案",
    subtitle: "留下联系方式，我们将为你提供系统演示和机构专属落地方案。",
    submitText: "立即预约演示",
    successText: "提交成功，我们将尽快与您联系。",
    image: "/images/consulting-realistic.png",
    fields: [
      { key: "org", label: "机构名称", placeholder: "请输入机构名称", type: "text", required: true, visible: true },
      { key: "name", label: "联系人", placeholder: "请输入联系人", type: "text", required: true, visible: true },
      { key: "phone", label: "手机号", placeholder: "请输入手机号", type: "tel", required: true, visible: true },
      { key: "wechat", label: "微信号", placeholder: "请输入微信号", type: "text", required: false, visible: true },
      { key: "city", label: "所在城市", placeholder: "请输入城市", type: "text", required: false, visible: true },
      { key: "students", label: "当前学员数量", placeholder: "请输入学员数量", type: "text", required: false, visible: true },
      { key: "message", label: "备注", placeholder: "可填写校区情况或演示时间", type: "textarea", required: false, visible: true }
    ]
  },
  contacts: [
    { type: "phone", label: "咨询电话", value: "400-000-0000", visible: true },
    { type: "wechat", label: "微信咨询", value: "huipindu", image: "/images/logo.png", visible: true },
    { type: "email", label: "邮箱", value: "contact@huipindu.com", visible: true }
  ]
};
