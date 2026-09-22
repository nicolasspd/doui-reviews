import { ReactNode } from "react";
import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  delta?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconColor?: string;
  highlight?: boolean;
}

export function KpiCard({
  title,
  value,
  subtitle,
  delta,
  isPositive = true,
  icon: Icon,
  iconColor = "text-emerald-400",
  highlight = false,
}: KpiCardProps) {
  return (
    <div
      className={cn(
        "glass-panel p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-slate-700",
        highlight && "border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-900/60 to-slate-900/80"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              {value}
            </span>
            {delta && (
              <span
                className={cn(
                  "inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-md",
                  isPositive
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                    : "bg-rose-500/15 text-rose-400 border border-rose-500/20"
                )}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                )}
                {delta}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1.5 text-xs text-slate-400">{subtitle}</p>
          )}
        </div>

        <div
          className={cn(
            "p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60",
            iconColor
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
