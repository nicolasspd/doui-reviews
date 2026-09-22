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
    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
      <div>
        <h3 className="text-base font-semibold text-white">Distribución de Estrellas</h3>
        <p className="text-xs text-slate-400 mb-5">
          Filtro automático: 4-5★ van a Google Reviews; 1-3★ van a recuperación interna.
        </p>

        <div className="space-y-3">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 w-12 text-slate-300 font-medium">
                <span>{item.stars}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>

              <div className="flex-1 h-2 bg-slate-800/80 rounded-full overflow-hidden">
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

              <span className="w-12 text-right text-slate-400 font-mono">
                {item.percentage}% ({item.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-slate-300 font-medium">Promotores Google</span>
        </div>
        <span className="font-bold text-emerald-400 text-sm">92%</span>
      </div>
    </div>
  );
}
