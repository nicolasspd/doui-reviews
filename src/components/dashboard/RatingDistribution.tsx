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
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-base font-black text-slate-900">Distribución de Calificaciones</h3>
        <p className="text-xs text-slate-700 font-semibold mb-5">
          Filtro inteligente: 4-5★ van a Google Reviews; 1-3★ van a recuperación interna.
        </p>

        <div className="space-y-3.5">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 w-12 text-slate-900 font-black">
                <span>{item.stars}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              </div>

              <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.stars >= 4
                      ? "bg-emerald-600"
                      : item.stars === 3
                      ? "bg-amber-500"
                      : "bg-rose-600"
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <span className="w-16 text-right text-slate-800 font-mono text-xs font-bold">
                {item.percentage}% ({item.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          <span className="text-slate-900 font-bold">Tasa de Promotores a Google</span>
        </div>
        <span className="font-black text-emerald-800 text-sm bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300">
          92%
        </span>
      </div>
    </div>
  );
}
