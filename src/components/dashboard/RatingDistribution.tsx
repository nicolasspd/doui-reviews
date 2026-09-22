import { Star } from "lucide-react";

interface RatingBreakdown {
  stars: number;
  count: number;
  percentage: number;
}

const distribution: RatingBreakdown[] = [
  { stars: 5, count: 142, percentage: 77 },
  { stars: 4, count: 28, percentage: 15 },
  { stars: 3, count: 9, percentage: 5 },
  { stars: 2, count: 4, percentage: 2 },
  { stars: 1, count: 1, percentage: 1 },
];

export function RatingDistribution() {
  return (
    <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-slate-900">Distribución de Estrellas</h3>
        <p className="text-xs text-slate-500 font-medium mb-5">
          Filtro: 4-5★ van a Google Reviews; 1-3★ van a recuperación interna.
        </p>

        <div className="space-y-3">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 w-12 text-slate-700 font-bold">
                <span>{item.stars}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              </div>

              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.stars >= 4
                      ? "bg-emerald-500"
                      : item.stars === 3
                      ? "bg-amber-400"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <span className="w-14 text-right text-slate-500 font-mono text-[11px] font-semibold">
                {item.percentage}% ({item.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-slate-700 font-semibold">Promotores Google</span>
        </div>
        <span className="font-extrabold text-emerald-700 text-sm bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          92%
        </span>
      </div>
    </div>
  );
}
