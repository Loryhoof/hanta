import { getRiskLabel } from "@/lib/risk";
import type { RiskLevel } from "@/lib/content";

export function RiskBadge({ level }: { level: RiskLevel }) {
  const risk = getRiskLabel(level);

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${risk.className}`}>
      {risk.label}
    </span>
  );
}
