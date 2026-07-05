"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, Download, Plus, Search, Trash2, X } from "lucide-react";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  wide?: boolean;
  render?: (row: T) => React.ReactNode;
};

type RowBase = { id: string };
type SortState = { key: string; direction: "asc" | "desc" } | null;
type DialogState<T> =
  | { type: "view"; row: T }
  | { type: "edit"; row: T }
  | { type: "add" }
  | { type: "delete" }
  | null;

const filterFieldMap: Record<string, string> = {
  跟进状态: "status",
  意向等级: "intentLevel",
  来源渠道: "sourceChannel",
  负责人: "owner",
  预约状态: "status",
  演示方式: "method",
  城市: "city",
  显示状态: "visible",
  推荐套餐: "tag",
  视频分类: "category",
  上课模式: "classMode",
  套餐: "planName",
  首页推荐: "featured",
  模块类型: "moduleKey",
  分类: "category",
  必填状态: "required",
  跟进方式: "method",
  跟进结果: "result",
  今日待跟进: "nextFollowAt",
  角色: "role",
  账号状态: "disabled",
  分组: "group"
};

function valueOf<T>(row: T, key: keyof T | string) {
  return String((row as Record<string, unknown>)[key as string] ?? "");
}

function plainEntries<T>(row: T, columns: Column<T>[]) {
  return columns.map((column) => ({
    key: String(column.key),
    label: column.label,
    value: valueOf(row, column.key)
  }));
}

export function ManagementTable<T extends RowBase>({
  rows,
  columns,
  searchPlaceholder = "搜索",
  filters = [],
  exportHref,
  addLabel = "新增",
  batchActions = true,
  persistHref
}: {
  rows: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  filters?: string[];
  exportHref?: string;
  addLabel?: string;
  batchActions?: boolean;
  persistHref?: string;
}) {
  const [localRows, setLocalRows] = useState<T[]>(rows);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [dialog, setDialog] = useState<DialogState<T>>(null);
  const [notice, setNotice] = useState("可以搜索、筛选、勾选、排序、查看和编辑当前列表。");
  const pageSize = 8;

  useEffect(() => {
    setLocalRows(rows);
  }, [rows]);

  async function persistRows(nextRows: T[], successMessage: string) {
    setLocalRows(nextRows);

    if (!persistHref) {
      setNotice(successMessage);
      return;
    }

    try {
      const response = await fetch(persistHref, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: nextRows })
      });

      if (!response.ok) {
        throw new Error("persist failed");
      }

      setNotice(`${successMessage} 已同步保存到前台内容源。`);
    } catch {
      setNotice("当前修改未能保存到后端，请稍后重试。");
    }
  }

  const filterOptions = useMemo(() => {
    return Object.fromEntries(
      filters.map((filter) => {
        const fieldKey = filterFieldMap[filter] ?? columns.find((column) => column.label === filter)?.key ?? filter;
        const options = Array.from(
          new Set(
            localRows
              .map((row) => valueOf(row, fieldKey))
              .filter((value) => value.trim().length > 0)
          )
        );

        return [filter, [`全部${filter}`, ...options]];
      })
    ) as Record<string, string[]>;
  }, [columns, filters, localRows]);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const activeFilterEntries = Object.entries(activeFilters).filter(
      ([filter, value]) => value && value !== `全部${filter}`
    );

    const matched = localRows.filter((row) => {
      const rowText = Object.values(row as Record<string, unknown>).join(" ").toLowerCase();
      const keywordMatched = keyword ? rowText.includes(keyword) : true;
      const filtersMatched = activeFilterEntries.every(([filter, value]) => {
        const fieldKey = filterFieldMap[filter] ?? columns.find((column) => column.label === filter)?.key ?? filter;
        return valueOf(row, fieldKey) === value;
      });

      return keywordMatched && filtersMatched;
    });

    if (!sort) {
      return matched;
    }

    return [...matched].sort((a, b) => {
      const left = valueOf(a, sort.key);
      const right = valueOf(b, sort.key);
      const result = left.localeCompare(right, "zh-CN", { numeric: true });
      return sort.direction === "asc" ? result : -result;
    });
  }, [activeFilters, columns, localRows, query, sort]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const allCurrentSelected = paged.length > 0 && paged.every((row) => selected.includes(row.id));

  function toggleSort(key: string) {
    setSort((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }

      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }

      return null;
    });
  }

  function markSelectedContacted() {
    if (selected.length === 0) {
      setNotice("请先勾选需要批量处理的数据。");
      return;
    }

    const nextRows = localRows.map((row) => {
        if (!selected.includes(row.id)) {
          return row;
        }

        return { ...row, status: "已联系" } as T;
      });
    void persistRows(nextRows, `已将 ${selected.length} 条数据标记为已联系。`);
  }

  function deleteSelected() {
    if (selected.length === 0) {
      setNotice("请先勾选需要删除的数据。");
      return;
    }

    setDialog({ type: "delete" });
  }

  function confirmDelete() {
    const nextRows = localRows.filter((row) => !selected.includes(row.id));
    void persistRows(nextRows, `已删除 ${selected.length} 条数据。`);
    setSelected([]);
    setDialog(null);
  }

  function saveEdit(row: T) {
    const nextRows = localRows.map((item) => (item.id === row.id ? row : item));
    void persistRows(nextRows, "编辑内容已保存。");
    setDialog(null);
  }

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
            <label
              key={filter}
              className="relative inline-flex h-10 min-w-32 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
            >
              <select
                value={activeFilters[filter] ?? `全部${filter}`}
                onChange={(event) => {
                  setActiveFilters((current) => ({ ...current, [filter]: event.target.value }));
                  setPage(1);
                  setNotice(`${filter} 已切换为：${event.target.value}`);
                }}
                className="w-full appearance-none bg-transparent pr-6 outline-none"
              >
                {(filterOptions[filter] ?? ["全部"]).map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400" />
            </label>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {batchActions ? (
            <>
              <button
                type="button"
                onClick={markSelectedContacted}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
              >
                批量标记已联系
              </button>
              <button
                type="button"
                onClick={deleteSelected}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 text-sm font-bold text-red-600 hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
                批量删除
              </button>
            </>
          ) : null}
          {exportHref ? (
            <a
              href={exportHref}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-brand-100 bg-brand-50 px-3 text-sm font-bold text-brand-600 hover:bg-brand-100"
            >
              <Download className="h-4 w-4" />
              导出
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => setDialog({ type: "add" })}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-3 text-sm font-bold text-white hover:bg-brand-600"
          >
            <Plus className="h-4 w-4" />
            {addLabel}
          </button>
        </div>
      </div>

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500">
        {notice}
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
              {columns.map((column) => {
                const key = String(column.key);
                const sorted = sort?.key === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

                return (
                  <th key={key} className={`px-4 py-3 ${column.wide ? "min-w-[220px]" : ""}`}>
                    <button
                      type="button"
                      onClick={() => toggleSort(key)}
                      className="inline-flex items-center gap-1 text-left font-black hover:text-brand-600"
                    >
                      {column.label}
                      {sorted}
                    </button>
                  </th>
                );
              })}
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
                  <button type="button" onClick={() => setDialog({ type: "view", row })} className="font-bold text-brand-600">
                    查看
                  </button>
                  <span className="mx-2 text-slate-300">|</span>
                  <button type="button" onClick={() => setDialog({ type: "edit", row })} className="font-bold text-slate-700">
                    编辑
                  </button>
                </td>
              </tr>
            ))}
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-4 py-12 text-center text-sm font-semibold text-slate-400">
                  没有匹配的数据
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-500">
        <span>
          已选择 {selected.length} 条，共 {filtered.length} 条
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
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
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold disabled:opacity-40"
          >
            下一页
          </button>
        </div>
      </div>

      {dialog ? (
        <TableDialog
          dialog={dialog}
          columns={columns}
          addLabel={addLabel}
          onClose={() => setDialog(null)}
          onConfirmDelete={confirmDelete}
          onSave={saveEdit}
          selectedCount={selected.length}
        />
      ) : null}
    </section>
  );
}

function TableDialog<T extends RowBase>({
  dialog,
  columns,
  addLabel,
  onClose,
  onConfirmDelete,
  onSave,
  selectedCount
}: {
  dialog: Exclude<DialogState<T>, null>;
  columns: Column<T>[];
  addLabel: string;
  onClose: () => void;
  onConfirmDelete: () => void;
  onSave: (row: T) => void;
  selectedCount: number;
}) {
  const row = "row" in dialog ? dialog.row : null;
  const [draft, setDraft] = useState<Record<string, string>>(() =>
    row
      ? Object.fromEntries(plainEntries(row, columns).map((entry) => [entry.key, entry.value]))
      : Object.fromEntries(columns.map((column) => [String(column.key), ""]))
  );

  const title = dialog.type === "view" ? "查看详情" : dialog.type === "edit" ? "编辑信息" : dialog.type === "delete" ? "删除确认" : addLabel;

  function handleSave() {
    if (!row) {
      onClose();
      return;
    }

    onSave({ ...row, ...draft } as T);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h3 className="text-lg font-black text-slate-950">{title}</h3>
          <button type="button" onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        {dialog.type === "delete" ? (
          <div className="p-5">
            <p className="text-sm leading-6 text-slate-600">确认删除已选择的 {selectedCount} 条数据？删除操作需要二次确认。</p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={onClose} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-bold">
                取消
              </button>
              <button type="button" onClick={onConfirmDelete} className="h-10 rounded-lg bg-red-600 px-4 text-sm font-bold text-white">
                确认删除
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid max-h-[65vh] gap-4 overflow-y-auto p-5 md:grid-cols-2">
              {columns.map((column) => {
                const key = String(column.key);
                return (
                  <label key={key} className="block">
                    <span className="mb-1 block text-xs font-black text-slate-500">{column.label}</span>
                    {dialog.type === "view" ? (
                      <div className="min-h-10 rounded-lg bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700">
                        {draft[key] || "-"}
                      </div>
                    ) : (
                      <input
                        value={draft[key] ?? ""}
                        onChange={(event) => setDraft((current) => ({ ...current, [key]: event.target.value }))}
                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-brand-500"
                      />
                    )}
                  </label>
                );
              })}
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
              <button type="button" onClick={onClose} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-bold">
                取消
              </button>
              {dialog.type === "view" ? (
                <button type="button" onClick={onClose} className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white">
                  <CheckCircle2 className="h-4 w-4" />
                  知道了
                </button>
              ) : (
                <button type="button" onClick={handleSave} className="h-10 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white">
                  保存
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function StatusBadge({
  children,
  tone = "blue"
}: {
  children: React.ReactNode;
  tone?: "blue" | "green" | "orange" | "red" | "slate";
}) {
  const styles = {
    blue: "bg-brand-50 text-brand-600",
    green: "bg-emerald-50 text-emerald-700",
    orange: "bg-orange-50 text-orange-700",
    red: "bg-red-50 text-red-700",
    slate: "bg-slate-100 text-slate-700"
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black ${styles[tone]}`}>{children}</span>;
}
