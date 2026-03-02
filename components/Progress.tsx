interface ProgressProps {
  current: number;
  total: number;
}

export default function Progress({ current, total }: ProgressProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="card">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
        <span>Progress</span>
        <span>{current}/{total} ({pct}%)</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
