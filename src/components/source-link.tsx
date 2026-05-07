export function SourceLink({
  name,
  url,
  date,
}: {
  name: string;
  url: string;
  date?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
      <span>Source:</span>
      <a className="text-teal-800 underline-offset-4 hover:underline" href={url}>
        {name}
      </a>
      {date ? <span>Updated {date}</span> : null}
    </div>
  );
}
