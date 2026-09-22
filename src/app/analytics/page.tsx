"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/store";
import { DashboardMetrics } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Award,
  Zap,
  DollarSign,
} from "lucide-react";

const channelData = [
  { name: "QR en Mesa", feedbacks: 124, avgRating: 4.8 },
  { name: "QR en Boleta", feedbacks: 36, avgRating: 4.5 },
  { name: "Email Post-Servicio", feedbacks: 18, avgRating: 4.7 },
  { name: "WhatsApp Automático", feedbacks: 6, avgRating: 4.9 },
];

const categorySatisfaction = [
  { aspect: "Calidad Comida", score: 96, fill: "#059669" },
  { aspect: "Atención y Servicio", score: 92, fill: "#10b981" },
  { aspect: "Ambiente y Terraza", score: 94, fill: "#14b8a6" },
  { aspect: "Tiempo de Espera", score: 81, fill: "#f59e0b" },
  { aspect: "Relación Precio/Calidad", score: 89, fill: "#0d9488" },
];

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>(store.getMetrics());

  useEffect(() => {
    const update = () => setMetrics(store.getMetrics());
    update();
    return store.subscribe(update);
  }, []);

  return (
    <DashboardShell
      title="Analytics y Métricas de Reputación"
      subtitle="Diagnóstico de calidad post-atención, retorno sobre la inversión y efectividad por canal"
    >
      <div className="space-y-6">
        {/* Top 3 Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-200 space-y-2 bg-gradient-to-b from-emerald-50/50 to-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-emerald-800">
                Retorno Estimado de Recompra
              </span>
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-slate-900">
              {formatCurrency(metrics.estimatedRecoveredRevenue)}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Ventas generadas por canje de cupones y clientes recuperados
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-teal-800">
                Tasa de Conversión a Google
              </span>
              <Award className="w-5 h-5 text-teal-600" />
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-slate-900">
              {metrics.googleReviewsRedirected} clientes
            </div>
            <p className="text-xs text-slate-500 font-medium">
              77% de los promotores hicieron click para publicar en Google Maps
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-blue-800">
                Efectividad de Cupones
              </span>
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-slate-900">
              {metrics.redemptionRatePercentage}%
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {metrics.totalCouponsRedeemed} de {metrics.totalCouponsIssued} cupones fueron canjeados en caja
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Feedbacks by Channel */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Volumen y Calidad por Canal de Captura</h3>
              <p className="text-xs text-slate-500 font-medium">Comparativa entre QR físico en mesa y recordatorios digitales</p>
            </div>

            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-200 text-xs">
                            <p className="font-bold text-slate-900 mb-1">{label}</p>
                            <p className="text-emerald-700 font-semibold">Opiniones: {payload[0]?.value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="feedbacks" fill="#059669" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Aspect Satisfaction % */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Índice de Aprobación por Aspecto</h3>
              <p className="text-xs text-slate-500 font-medium">Porcentaje de clientes que califican positivo cada área</p>
            </div>

            <div className="space-y-3.5 pt-2">
              {categorySatisfaction.map((item) => (
                <div key={item.aspect} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-semibold">{item.aspect}</span>
                    <span className="font-bold text-slate-900 font-mono">{item.score}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.score}%`, backgroundColor: item.fill }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
