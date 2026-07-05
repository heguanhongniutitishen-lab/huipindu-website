"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { demoVideos } from "@/lib/admin/mock-data";

type DemoVideo = (typeof demoVideos)[number];

export function DemoVideoManager() {
  const [videos, setVideos] = useState<DemoVideo[]>(demoVideos);
  const [selectedId, setSelectedId] = useState(demoVideos[0]?.id ?? "");

  useEffect(() => {
    fetch("/api/demo-videos")
      .then((response) => response.json())
      .then((result: { data: DemoVideo[] }) => {
        setVideos(result.data);
        setSelectedId(result.data[0]?.id ?? "");
      })
      .catch(() => {
        setVideos(demoVideos);
        setSelectedId(demoVideos[0]?.id ?? "");
      });
  }, []);

  const selected = useMemo(() => videos.find((video) => video.id === selectedId) ?? videos[0], [selectedId, videos]);

  function save(nextVideos: DemoVideo[]) {
    setVideos(nextVideos);
    void fetch("/api/demo-videos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: nextVideos })
    });
    window.dispatchEvent(new Event("hpd-demo-videos-updated"));
  }

  function updateSelected(key: keyof DemoVideo, value: string | number) {
    save(videos.map((video) => (video.id === selected.id ? { ...video, [key]: value } : video)));
  }

  function addVideo() {
    const nextVideo: DemoVideo = {
      id: `V-${Date.now()}`,
      title: "新演示视频",
      category: "学员端演示",
      coverUrl: "/images/student-report-mobile.png",
      videoUrl: "",
      description: "请输入视频简介",
      sortOrder: videos.length + 1,
      visible: "显示"
    };
    save([nextVideo, ...videos]);
    setSelectedId(nextVideo.id);
  }

  function deleteVideo(id: string) {
    const nextVideos = videos.filter((video) => video.id !== id);
    save(nextVideos);
    setSelectedId(nextVideos[0]?.id ?? "");
  }

  if (!selected) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <button onClick={addVideo} className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-black text-white">
          <Plus className="h-4 w-4" />
          新增视频
        </button>
      </section>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-slate-950">视频列表</h2>
          <button onClick={addVideo} className="inline-flex h-9 items-center gap-2 rounded-lg bg-brand-500 px-3 text-xs font-black text-white">
            <Plus className="h-4 w-4" />
            新增
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedId(video.id)}
              className={`w-full rounded-lg border p-3 text-left ${selected.id === video.id ? "border-brand-300 bg-brand-50" : "border-slate-100 hover:bg-slate-50"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-slate-950">{video.title}</strong>
                <span className="text-xs font-black text-slate-500">{video.visible}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{video.category}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-950">替换 / 编辑视频</h2>
          <button onClick={() => deleteVideo(selected.id)} className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 text-sm font-black text-red-600">
            <Trash2 className="h-4 w-4" />
            删除
          </button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="视频标题" value={selected.title} onChange={(value) => updateSelected("title", value)} />
          <Field label="视频分类" value={selected.category} onChange={(value) => updateSelected("category", value)} />
          <Field label="封面图片 URL" value={selected.coverUrl} onChange={(value) => updateSelected("coverUrl", value)} />
          <Field label="视频地址 URL" value={selected.videoUrl} onChange={(value) => updateSelected("videoUrl", value)} />
          <Field label="排序" value={String(selected.sortOrder)} onChange={(value) => updateSelected("sortOrder", Number(value) || 0)} />
          <label className="text-sm font-bold text-slate-700">
            是否显示
            <select value={selected.visible} onChange={(event) => updateSelected("visible", event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 outline-none">
              <option>显示</option>
              <option>隐藏</option>
            </select>
          </label>
          <label className="md:col-span-2 text-sm font-bold text-slate-700">
            视频简介
            <textarea value={selected.description} onChange={(event) => updateSelected("description", event.target.value)} rows={4} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none" />
          </label>
        </div>
        <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
          保存后官网产品演示模块会读取同一份视频配置并同步更新。
        </p>
      </section>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string | number; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-brand-500" />
    </label>
  );
}
