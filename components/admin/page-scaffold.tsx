export function PageScaffold({
  title,
  description,
  actions,
  children
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black text-brand-600">慧拼读官网后台</p>
          <h1 className="mt-1 text-2xl font-black text-slate-950 lg:text-3xl">{title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{description}</p>
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}
