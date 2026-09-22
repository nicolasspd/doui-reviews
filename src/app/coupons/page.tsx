"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/store";
import { Coupon } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";
import {
  TicketPercent,
  Search,
  ScanLine,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Gift,
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

  const filtered = coupons.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
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
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {["all", "active", "redeemed"].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilter(st)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    filter === st
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {st === "all" ? "Todos" : st === "active" ? "Activos" : "Canjeados"}
                </button>
              ))}
            </div>

            <Link
              href="/validate"
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-950/40 flex items-center gap-1.5"
            >
              <ScanLine className="w-4 h-4" />
              <span>Escanear en Caja</span>
            </Link>
          </div>
        </div>

        {/* Coupons Table */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-3.5">Código Único</th>
                  <th className="px-5 py-3.5">Cliente</th>
                  <th className="px-5 py-3.5">Beneficio Otorgado</th>
                  <th className="px-5 py-3.5">Estado</th>
                  <th className="px-5 py-3.5">Emisión / Canje</th>
                  <th className="px-5 py-3.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-emerald-400">
                      {c.code}
                    </td>
                    <td className="px-5 py-4 text-white font-medium">
                      {c.customerName}
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-200 block">{c.title}</span>
                      <span className="text-[11px] text-slate-400">{c.description}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border",
                          c.status === "active"
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            : c.status === "redeemed"
                            ? "bg-slate-800 text-slate-400 border-slate-700"
                            : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                        )}
                      >
                        {c.status === "active"
                          ? "Activo"
                          : c.status === "redeemed"
                          ? "Canjeado en Caja"
                          : "Expirado"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 font-mono text-[11px]">
                      {c.status === "redeemed" && c.redeemedAt ? (
                        <div>
                          <span className="text-emerald-400 block font-semibold">Canjeado:</span>
                          <span>{formatDate(c.redeemedAt)}</span>
                          {c.redeemedByStaff && (
                            <span className="block text-[10px] text-slate-500">por {c.redeemedByStaff}</span>
                          )}
                        </div>
                      ) : (
                        <div>
                          <span>Emitido: {formatDate(c.createdAt)}</span>
                          <span className="block text-[10px] text-slate-500">
                            Vence: {new Date(c.expiresAt).toLocaleDateString("es-CL")}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/coupons/${c.id}`}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition-colors inline-flex items-center gap-1"
                      >
                        <span>Ver QR</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
