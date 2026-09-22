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
  iconColor = "text-emerald-600",
  highlight = false,
}: KpiCardProps) {
  return (
    <div
      className={cn(
        "glass-panel p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-slate-300",
        highlight && "border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-white"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
              {value}
            </span>
            {delta && (
              <span
                className={cn(
                  "inline-flex items-center text-xs font-bold px-1.5 py-0.5 rounded-md",
                  isPositive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
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
            <p className="mt-1.5 text-xs text-slate-500 font-medium">{subtitle}</p>
          )}
        </div>

        <div
          className={cn(
            "p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs",
            iconColor
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
