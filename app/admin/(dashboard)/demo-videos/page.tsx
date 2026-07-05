"use client";

import { DemoVideoManager } from "@/components/admin/demo-video-manager";
import { PageScaffold } from "@/components/admin/page-scaffold";

export default function DemoVideosPage() {
  return (
    <PageScaffold
      title="演示视频管理"
      description="后台删除、替换或隐藏视频后，官网产品演示模块会同步读取最新配置。"
    >
      <DemoVideoManager />
    </PageScaffold>
  );
}

