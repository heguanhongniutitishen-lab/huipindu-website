"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Download, Plus, Search, Trash2 } from "lucide-react";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  wide?: boolean;
  render?: (row: T) => React.ReactNode;
};

type RowBase = { id: string };

function valueOf<T>(row: T, key: keyof T | string) {
  return String((row as Record<string, unknown>)[key as string] ?? "");
}

export function ManagementTable<T extends RowBase>({
  rows,
  columns,
  searchPlaceholder = "搜索",
  filters = [],
  exportHref,
  addLabel = "新增",
  batchActions = true
}: {
  rows: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  filters?: string[];
  exportHref?: string;
  addLabel?: string;
  batchActions?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return rows;

    return rows.filter((row) =>
      Object.values(row as Record<string, unknown>).some((value) => String(value).toLowerCase().includes(keyword))
    );
  }, [query, rows]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const allCurrentSelected = paged.length > 0 && paged.every((row) => selected.includes(row.id));

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder={searchPlaceholder}
            />
          </label>
          {filters.map((filter) => (
            <button
              key={filter}
              className="inline-flex h-10 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
            >
              {filter}
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {batchActions ? (
            <>
              <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700">
                批量标记已联系
              </button>
              <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 text-sm font-bold text-red-600">
                <Trash2 className="h-4 w-4" />
                批量删除
              </button>
            </>
          ) : null}
          {exportHref ? (
            <a
              href={exportHref}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-brand-100 bg-brand-50 px-3 text-sm font-bold text-brand-600"
            >
              <Download className="h-4 w-4" />
              导出
            </a>
          ) : null}
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-3 text-sm font-bold text-white">
            <Plus className="h-4 w-4" />
            {addLabel}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-black uppercase tracking-wide text-slate-500">
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allCurrentSelected}
                  onChange={(event) =>
                    setSelected((current) =>
                      event.target.checked
                        ? Array.from(new Set([...current, ...paged.map((row) => row.id)]))
                        : current.filter((id) => !paged.some((row) => row.id === id))
                    )
                  }
                />
              </th>
              {columns.map((column) => (
                <th key={String(column.key)} className={`px-4 py-3 ${column.wide ? "min-w-[220px]" : ""}`}>
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {paged.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(row.id)}
                    onChange={(event) =>
                      setSelected((current) =>
                        event.target.checked ? [...current, row.id] : current.filter((id) => id !== row.id)
                      )
                    }
                  />
                </td>
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-4 align-top text-slate-700">
                    {column.render ? column.render(row) : valueOf(row, column.key)}
                  </td>
                ))}
                <td className="whitespace-nowrap px-4 py-4 text-right">
                  <button className="font-bold text-brand-600">查看</button>
                  <span className="mx-2 text-slate-300">|</span>
                  <button className="font-bold text-slate-700">编辑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-500">
        <span>
          已选择 {selected.length} 条，共 {filtered.length} 条
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold disabled:opacity-40"
          >
            上一页
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold disabled:opacity-40"
          >
            下一页
          </button>
        </div>
      </div>
    </section>
  );
}

export function StatusBadge({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "green" | "orange" | "red" | "slate" }) {
  const styles = {
    blue: "bg-brand-50 text-brand-600",
    green: "bg-emerald-50 text-emerald-700",
    orange: "bg-orange-50 text-orange-700",
    red: "bg-red-50 text-red-700",
    slate: "bg-slate-100 text-slate-700"
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black ${styles[tone]}`}>{children}</span>;
}
