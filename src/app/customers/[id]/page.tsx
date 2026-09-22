"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/store";
import { Customer, Feedback, Coupon } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";
import {
  ArrowLeft,
  User,
  Star,
  Mail,
  Phone,
  Calendar,
  Gift,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    if (id) {
      const c = store.getCustomerById(id);
      if (c) {
        setCustomer(c);
        setFeedbacks(store.getFeedbacks().filter((f) => f.customerId === c.id));
        setCoupons(store.getCoupons().filter((coup) => coup.customerId === c.id));
      }
    }
  }, [id]);

  if (!customer) {
    return (
      <DashboardShell title="Perfil del Cliente">
        <div className="glass-panel p-8 rounded-2xl text-center">
          <p className="text-slate-400">Cliente no encontrado.</p>
          <Link href="/customers" className="text-emerald-400 text-xs mt-3 inline-block font-semibold">
            Volver al directorio
          </Link>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title={`Historial del Cliente • ${customer.name}`}
      subtitle={`Registrado desde ${formatDate(customer.createdAt)}`}
    >
      <div className="space-y-6">
        <Link
          href="/customers"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al directorio de clientes</span>
        </Link>

        {/* Profile Card Header */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-950/50">
              {customer.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{customer.name}</h2>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {customer.email}
                </span>
                {customer.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    {customer.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
            <div className="text-center">
              <span className="text-2xl font-bold text-white">{customer.visitsCount}</span>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider">Visitas</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-emerald-400 flex items-center justify-center gap-0.5">
                {customer.averageRating.toFixed(1)} <Star className="w-4 h-4 fill-current" />
              </span>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider">Rating Medio</p>
            </div>
          </div>
        </div>

        {/* Two Columns: Feedbacks History & Coupons Issued */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Feedbacks */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Opiniones y Calificaciones Enviadas ({feedbacks.length})</span>
            </h3>

            <div className="space-y-3">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                      <span>{fb.rating}★</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px]">{formatDate(fb.createdAt)}</span>
                  </div>
                  <p className="text-slate-300 italic leading-relaxed">"{fb.comment}"</p>
                  <p className="text-[10px] text-slate-500">Canal: {fb.channel}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coupons */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>Cupones Asignados ({coupons.length})</span>
            </h3>

            <div className="space-y-3">
              {coupons.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white">{c.title}</h4>
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded uppercase",
                        c.status === "redeemed"
                          ? "bg-slate-800 text-slate-400"
                          : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      )}
                    >
                      {c.status === "redeemed" ? "Canjeado" : "Activo"}
                    </span>
                  </div>
                  <p className="text-slate-400">{c.description}</p>
                  <div className="p-2 rounded bg-slate-950 font-mono text-emerald-400 text-center font-bold">
                    {c.code}
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
