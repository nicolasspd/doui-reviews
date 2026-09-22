"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/store";
import { Coupon } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";
import {
  Search,
  ScanLine,
  ChevronRight,
  Gift,
  TicketCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const update = () => {
      setCoupons(store.getCoupons());
    };
    update();
    return store.subscribe(update);
  }, []);

  const totalIssued = coupons.length;
  const totalTimesUsed = coupons.reduce((sum, c) => sum + (c.usageCount ?? (c.status === "redeemed" ? 1 : 0)), 0);
  const activeCount = coupons.filter((c) => c.status === "active").length;
  const redeemedCount = coupons.filter((c) => c.status === "redeemed" || (c.usageCount && c.usageCount > 0)).length;
  const redemptionRate = totalIssued > 0 ? ((redeemedCount / totalIssued) * 100).toFixed(1) : "0";

  const filtered = coupons.filter((c) => {
    if (filter === "active" && c.status !== "active") return false;
    if (filter === "redeemed" && c.status !== "redeemed" && (c.usageCount ?? 0) === 0) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.code.toLowerCase().includes(q) ||
        c.customerName.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <DashboardShell
      title="Catálogo de Cupones Emitidos"
      subtitle="Supervisión de recompensas entregadas a clientes, redenciones en caja y tasa de retorno"
    >
      <div className="space-y-6">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Total Emitidos</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{totalIssued}</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">Cupones para clientes</p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                <Gift className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/40 via-white to-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Total Veces Ocupados</p>
                <p className="text-2xl font-black text-emerald-700 mt-1">{totalTimesUsed} usos</p>
                <p className="text-xs text-emerald-800 mt-1 font-medium">Canjes validados en caja</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                <TicketCheck className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Pendientes de Canje</p>
                <p className="text-2xl font-black text-amber-700 mt-1">{activeCount}</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">Clientes con cupón activo</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Tasa de Redención</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{redemptionRate}%</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">Efectividad de retorno</p>
              </div>
              <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar por código, cliente o beneficio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-500 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {["all", "active", "redeemed"].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilter(st)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
                    filter === st
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {st === "all" ? "Todos" : st === "active" ? "Activos" : "Canjeados / Ocupados"}
                </button>
              ))}
            </div>

            <Link
              href="/validate"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <ScanLine className="w-4 h-4" />
              <span>Escanear en Caja</span>
            </Link>
          </div>
        </div>

        {/* Coupons Table */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 uppercase tracking-wider text-[11px] font-extrabold">
                <tr>
                  <th className="px-5 py-4">Código Único</th>
                  <th className="px-5 py-4">Cliente Titular</th>
                  <th className="px-5 py-4">Beneficio Otorgado</th>
                  <th className="px-5 py-4 text-center">Veces Ocupado</th>
                  <th className="px-5 py-4">Estado</th>
                  <th className="px-5 py-4">Emisión / Último Canje</th>
                  <th className="px-5 py-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => {
                  const usage = c.usageCount ?? (c.status === "redeemed" ? 1 : 0);
                  const max = c.maxUsages || 1;
                  const isFullyRedeemed = c.status === "redeemed" || usage >= max;
                  const usagePct = Math.min(100, Math.round((usage / max) * 100));

                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-emerald-700 text-xs">
                        {c.code}
                      </td>
                      <td className="px-5 py-4 text-slate-900 font-bold">
                        {c.customerName}
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-bold text-slate-900 block">{c.title}</span>
                        <span className="text-[11px] text-slate-600 font-medium">{c.description}</span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="inline-flex flex-col items-center gap-1">
                          <span
                            className={cn(
                              "px-2.5 py-1 rounded-lg text-xs font-black inline-flex items-center gap-1 border",
                              usage > 0
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : "bg-slate-50 text-slate-700 border-slate-200"
                            )}
                          >
                            {usage > 0 ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                            )}
                            <span>{usage} de {max} {max === 1 ? "uso" : "usos"}</span>
                          </span>

                          {/* Progress bar */}
                          <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300/60">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all",
                                usage > 0 ? "bg-emerald-600" : "bg-transparent"
                              )}
                              style={{ width: `${usagePct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border",
                            isFullyRedeemed
                              ? "bg-slate-100 text-slate-700 border-slate-300"
                              : c.status === "active"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : "bg-rose-50 text-rose-800 border-rose-200"
                          )}
                        >
                          {isFullyRedeemed
                            ? "Canjeado en Caja"
                            : c.status === "active"
                            ? "Activo para Uso"
                            : "Expirado"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-700 font-mono text-[11px]">
                        {c.redeemedAt ? (
                          <div>
                            <span className="text-emerald-800 block font-bold">Último canje:</span>
                            <span className="font-semibold">{formatDate(c.redeemedAt)}</span>
                            {c.redeemedByStaff && (
                              <span className="block text-[10px] text-slate-600 font-medium">por {c.redeemedByStaff}</span>
                            )}
                          </div>
                        ) : (
                          <div>
                            <span className="font-medium">Emitido: {formatDate(c.createdAt)}</span>
                            <span className="block text-[10px] text-slate-600 font-medium">
                              Vence: {new Date(c.expiresAt).toLocaleDateString("es-CL")}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/coupons/${c.id}`}
                          className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 hover:border-slate-400 transition-colors inline-flex items-center gap-1 shadow-2xs"
                        >
                          <span>Ver Detalle y QR</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
