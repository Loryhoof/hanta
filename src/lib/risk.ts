import type { RiskLevel } from "@/lib/content";

export const riskCopy: Record<
  RiskLevel,
  { label: string; className: string; description: string; score: number }
> = {
  low: {
    label: "Low",
    className: "border-emerald-200 bg-emerald-50 text-emerald-900",
    description: "No active official outbreak signal in this page context.",
    score: 1,
  },
  watch: {
    label: "Watch",
    className: "border-sky-200 bg-sky-50 text-sky-950",
    description: "Official or ecological signals warrant monitoring, not alarm.",
    score: 2,
  },
  elevated: {
    label: "Elevated",
    className: "border-amber-200 bg-amber-50 text-amber-950",
    description: "Recent official data suggests higher-than-baseline attention.",
    score: 3,
  },
  active: {
    label: "Active",
    className: "border-rose-200 bg-rose-50 text-rose-950",
    description: "An official outbreak or cluster is being actively tracked.",
    score: 4,
  },
};

export function getRiskLabel(level: RiskLevel) {
  return riskCopy[level];
}

export function getMortalityRate(deaths: number, infections: number) {
  if (infections <= 0) return 0;
  return Number(((deaths / infections) * 100).toFixed(1));
}

export function getSourceFreshness(sourceDate: string, now = new Date()) {
  const published = new Date(`${sourceDate}T00:00:00Z`);
  const diffDays = Math.floor((now.getTime() - published.getTime()) / 86_400_000);

  if (Number.isNaN(diffDays)) {
    return { status: "unknown" as const, label: "Unknown source date" };
  }

  if (diffDays <= 14) {
    return { status: "fresh" as const, label: "Updated in the last 14 days" };
  }

  if (diffDays <= 180) {
    return { status: "aging" as const, label: "Source is more than two weeks old" };
  }

  return { status: "stale" as const, label: "Source is older than six months" };
}
