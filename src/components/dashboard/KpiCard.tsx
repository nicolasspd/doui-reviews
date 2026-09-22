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
  iconColor = "text-emerald-700 bg-emerald-50 border-emerald-200",
  highlight = false,
}: KpiCardProps) {
  return (
    <div
      className={cn(
        "glass-panel p-5 rounded-2xl relative overflow-hidden transition-all duration-200 hover:shadow-md border border-slate-200",
        highlight && "border-emerald-300 bg-gradient-to-br from-emerald-50/60 via-white to-white shadow-xs"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-[11px] font-extrabold text-slate-700 tracking-wider uppercase truncate">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl lg:text-3xl font-black tracking-tight text-slate-900">
              {value}
            </span>
            {delta && (
              <span
                className={cn(
                  "inline-flex items-center text-xs font-black px-1.5 py-0.5 rounded-md border",
                  isPositive
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : "bg-rose-50 text-rose-800 border-rose-300"
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
            <p className="mt-1.5 text-xs text-slate-600 font-semibold">{subtitle}</p>
          )}
        </div>

        <div
          className={cn(
            "p-2.5 rounded-xl border shrink-0 shadow-2xs",
            iconColor.includes("bg-") ? iconColor : `bg-slate-50 border-slate-200 ${iconColor}`
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
