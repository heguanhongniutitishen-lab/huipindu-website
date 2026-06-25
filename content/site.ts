export const companyInfo = {
  name: "重庆市校艺科技有限公司",
  brand: "慧拼读",
  description:
    "慧拼读是一家专注于英语自然拼读系统的品牌，致力于为孩子打造科学、高效、充满趣味的英语学习系统。我们以自然拼读为核心，结合英语学习规律研发出系统化、循序渐进的单词学习系统，帮助孩子建立\"见词能读、听音能写\"的英语学习能力。"
} as const;

export const navItems = [
  { label: "首页", href: "/" },
  { label: "品牌介绍", href: "/about" },
  { label: "课程体系", href: "/curriculum" },
  { label: "合作加盟", href: "/cooperation" },
  { label: "联系我们", href: "/contact" }
] as const;

export const pageCopy = {
  about: {
    title: "品牌介绍",
    description: companyInfo.description
  },
  curriculum: {
    title: "课程体系",
    description:
      "慧拼读课程以自然拼读和单词学习为核心，从拼读规律、单词训练、科学记忆到阅读与复习巩固逐步进阶，帮助孩子真正掌握英语学习方法。"
  },
  advantages: {
    title: "产品优势",
    description:
      "慧拼读通过系统化课程、智能训练、学习报告和机构运营后台，帮助孩子高效学习，也帮助教育机构提升教学交付与管理效率。"
  },
  cooperation: {
    title: "合作加盟",
    description:
      "慧拼读面向少儿英语机构、托管校区、社区教育中心和区域合作伙伴，提供英语自然拼读系统、教学支持与运营协同方案。"
  },
  contact: {
    title: "联系我们",
    description:
      "欢迎家长了解学习方案，也欢迎学校、机构与代理伙伴咨询合作模式。我们会根据你的使用场景提供更匹配的课程与系统方案。"
  }
} as const;

export const homeCopy = {
  hero: {
    eyebrow: companyInfo.name,
    title: "让孩子真正掌握英语拼读规律",
    description:
      "慧拼读系统专注英语自然拼读学习，帮助孩子从“看词不会读”到“见词能拼、听音能写”。",
    primaryCta: "了解课程体系",
    secondaryCta: "咨询合作",
    stats: [
      { value: "3000+", label: "学员正在使用" },
      { value: "500+", label: "已合作代理商" },
      { value: "三大端", label: "学习运营监督联动" }
    ]
  },
  what: {
    title: "慧拼读是什么",
    description: companyInfo.description,
    points: ["专注英语自然拼读系统", "系统化、循序渐进的单词学习", "建立见词能读、听音能写的能力"]
  },
  audience: {
    title: "适合谁使用",
    items: [
      { title: "孩子", desc: "适合需要打牢单词拼读、听音辨词和阅读基础的中小学生。" },
      { title: "家长", desc: "通过家长端查看学习报告、复习打卡和成长反馈。" },
      { title: "老师", desc: "用训练系统组织课堂练习，及时纠错，提升教学效率。" },
      { title: "机构", desc: "通过后台管理学员、订单、课时和经营数据。" }
    ]
  },
  curriculum: {
    title: "课程体系",
    description:
      "以单词拼读训练为核心，逐步延展到音标、词汇、句型、阅读与抗遗忘复习，让孩子在反复听、拼、读、写中建立英语学习底层能力。",
    levels: ["自然拼读规则", "单词专项训练", "科学记忆方法", "阅读与语法提升", "阶段测评反馈", "复习打卡巩固"]
  },
  advantages: {
    title: "核心优势",
    items: [
      "科学体系：知识结构完整，学习路径清晰",
      "双模式教学：线上一对一，线下一对多",
      "智能管理：数据驱动教学，效果精准掌握",
      "高效提分：学得快、记得牢、进步看得见",
      "稳定可靠：系统运行流畅，教学交付更安心",
      "盈利可持续：降低运营成本，提升校区利润"
    ]
  },
  institutions: {
    title: "适合机构",
    description:
      "慧拼读适合少儿英语机构、托管校区、素质教育中心、社区教育空间和区域代理伙伴引入，用标准化系统提升课程交付与运营效率。",
    items: ["少儿英语培训机构", "托管与课后服务校区", "社区教育中心", "区域合作代理"]
  },
  contact: {
    title: "联系我们",
    description:
      "欢迎家长了解学习方案，也欢迎学校、机构与代理伙伴咨询合作模式。我们会根据你的使用场景提供更匹配的课程与系统方案。",
    cta: "咨询合作"
  }
} as const;
