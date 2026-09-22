"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { SatisfactionChart } from "@/components/dashboard/SatisfactionChart";
import { RatingDistribution } from "@/components/dashboard/RatingDistribution";
import { RecentFeedbackList } from "@/components/dashboard/RecentFeedbackList";
import { store } from "@/lib/store";
import { DashboardMetrics, Business } from "@/lib/types";
import Link from "next/link";
import {
  MessageSquareCheck,
  Star,
  Zap,
  AlertTriangle,
  Gift,
  TicketCheck,
  ExternalLink,
  QrCode,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>(store.getMetrics());
  const [business, setBusiness] = useState<Business>(store.getBusiness());

  useEffect(() => {
    const update = () => {
      setMetrics(store.getMetrics());
      setBusiness(store.getBusiness());
    };
    update();
    return store.subscribe(update);
  }, []);

  return (
    <DashboardShell
      title={`Dashboard General • ${business.name}`}
      subtitle="Monitoreo en tiempo real de satisfacción post-atención, derivación a Google y retorno de clientes"
    >
      <div className="space-y-6">
        {/* Top Highlight Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-300 bg-gradient-to-r from-emerald-50 via-white to-teal-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shadow-2xs">
              <Sparkles className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight">
                Filtro Inteligente de Reputación Activo
              </h2>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold mt-0.5">
                {metrics.googleReviewsRedirected} clientes con 4 y 5★ han sido invitados a publicar su reseña en Google Maps con 1 clic.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <Link
              href="/campaigns"
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-xs font-extrabold text-slate-800 border border-slate-300 transition-colors shadow-2xs flex items-center justify-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ver QR de Mesas</span>
            </Link>
            <Link
              href="/r/demo-token"
              target="_blank"
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Abrir Encuesta</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 6 Core KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KpiCard
            title="Feedback Total"
            value={metrics.totalFeedbacks}
            delta="+14%"
            isPositive={true}
            subtitle="Opiniones capturadas"
            icon={MessageSquareCheck}
            iconColor="text-emerald-700 bg-emerald-50 border-emerald-200"
          />

          <KpiCard
            title="Rating Promedio"
            value={`${metrics.averageRating}★`}
            delta={`+${metrics.ratingDelta}`}
            isPositive={true}
            subtitle="Escala de 1 a 5 estrellas"
            icon={Star}
            iconColor="text-amber-600 bg-amber-50 border-amber-200"
            highlight={true}
          />

          <KpiCard
            title="Tasa Respuesta"
            value={`${metrics.responseRatePercentage}%`}
            delta="+5.2%"
            isPositive={true}
            subtitle="QR y emails abiertos"
            icon={Zap}
            iconColor="text-teal-700 bg-teal-50 border-teal-200"
          />

          <KpiCard
            title="En Recuperación"
            value={metrics.activeRecoveryCases}
            isPositive={false}
            subtitle={metrics.activeRecoveryCases > 0 ? "Clientes por contactar" : "Sin quejas pendientes"}
            icon={AlertTriangle}
            iconColor={metrics.activeRecoveryCases > 0 ? "text-rose-700 bg-rose-50 border-rose-200" : "text-emerald-700 bg-emerald-50 border-emerald-200"}
          />

          <KpiCard
            title="Cupones Emitidos"
            value={metrics.totalCouponsIssued}
            subtitle="Fidelización otorgada"
            icon={Gift}
            iconColor="text-blue-700 bg-blue-50 border-blue-200"
          />

          <KpiCard
            title="Cupones Canjeados"
            value={`${metrics.totalCouponsRedeemed}`}
            delta={`${metrics.redemptionRatePercentage}%`}
            isPositive={true}
            subtitle="Recompra efectiva en caja"
            icon={TicketCheck}
            iconColor="text-emerald-700 bg-emerald-50 border-emerald-200"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SatisfactionChart />
          </div>
          <div className="lg:col-span-1">
            <RatingDistribution />
          </div>
        </div>

        {/* Recent Feedback Feed */}
        <RecentFeedbackList />
      </div>
    </DashboardShell>
  );
}
