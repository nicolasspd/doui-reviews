"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Lun 15", rating: 4.6, feedbacks: 18, promoters: 15 },
  { day: "Mar 16", rating: 4.7, feedbacks: 24, promoters: 22 },
  { day: "Mié 17", rating: 4.5, feedbacks: 21, promoters: 18 },
  { day: "Jue 18", rating: 4.8, feedbacks: 32, promoters: 29 },
  { day: "Vie 19", rating: 4.9, feedbacks: 48, promoters: 45 },
  { day: "Sáb 20", rating: 4.7, feedbacks: 56, promoters: 49 },
  { day: "Dom 21", rating: 4.85, feedbacks: 39, promoters: 36 },
];

export function SatisfactionChart() {
  return (
    <div className="glass-panel p-6 rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base font-semibold text-white">
            Evolución de Satisfacción y Feedback
          </h3>
          <p className="text-xs text-slate-400">
            Promedio de calificación diaria y total de clientes completados
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Rating Promedio (1 - 5★)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-500/40" />
            <span className="text-slate-400">Feedbacks Recibidos</span>
          </div>
        </div>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorFeedbacks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[3.5, 5]}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickCount={4}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass-panel p-3 rounded-xl shadow-xl border border-slate-700 text-xs">
                      <p className="font-semibold text-white mb-1.5">{label}</p>
                      <div className="space-y-1">
                        <p className="text-emerald-400 flex items-center justify-between gap-4">
                          <span>Rating Promedio:</span>
                          <span className="font-bold">{payload[0]?.value}★</span>
                        </p>
                        <p className="text-slate-300 flex items-center justify-between gap-4">
                          <span>Feedbacks Recibidos:</span>
                          <span className="font-bold">{payload[1]?.value}</span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="rating"
              stroke="#10b981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRating)"
            />
            <Area
              type="monotone"
              dataKey="feedbacks"
              stroke="#0d9488"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#colorFeedbacks)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
