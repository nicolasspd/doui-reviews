"use client";

import { useState, useEffect } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/store";
import { Coupon } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  ScanLine,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  TicketPercent,
  Search,
  Sparkles,
  ShieldCheck,
  History,
  QrCode,
} from "lucide-react";

export default function ValidateCouponPage() {
  const [query, setQuery] = useState("");
  const [staffName, setStaffName] = useState("Caja 1 - Laura");
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    message: string;
    coupon?: Coupon;
  } | null>(null);

  const [activeCoupons, setActiveCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const update = () => {
      setActiveCoupons(store.getCoupons().filter((c) => c.status === "active"));
    };
    update();
    return store.subscribe(update);
  }, []);

  const handleValidate = (codeToTest?: string) => {
    const targetCode = (codeToTest || query).trim();
    if (!targetCode) return;

    const res = store.validateAndRedeemCoupon(targetCode, staffName);
    setValidationResult(res);

    if (res.success) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#10B981", "#34D399", "#F59E0B"],
        });
      } catch (e) {
        // ignore
      }
      setQuery("");
    }
  };

  return (
    <DashboardShell
      title="Terminal de Validación y Canje de Cupones"
      subtitle="Escanea el código QR del cliente o ingresa el código alfanumérico para aplicar el beneficio en caja"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scanner Terminal */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ScanLine className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Lector de Cupones en Punto de Venta</h2>
                  <p className="text-xs text-slate-400">Verificación contra base de datos en tiempo real</p>
                </div>
              </div>

              {/* Staff badge */}
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>{staffName}</span>
              </div>
            </div>

            {/* Input form */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Código del Cupón o Token QR:
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && handleValidate()}
                    placeholder="Ej: GUEST-MATTEO-7749"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors uppercase"
                  />
                </div>
                <button
                  onClick={() => handleValidate()}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center gap-1.5"
                >
                  <ScanLine className="w-4 h-4" />
                  <span>Validar</span>
                </button>
              </div>
            </div>

            {/* Result Display Card */}
            {validationResult && (
              <div
                className={cn(
                  "p-5 rounded-2xl border transition-all animate-fade-in",
                  validationResult.success
                    ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                    : "bg-rose-950/30 border-rose-500/40 text-rose-200"
                )}
              >
                <div className="flex items-start gap-3">
                  {validationResult.success ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                  )}

                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-bold text-sm text-white">
                      {validationResult.success ? "¡Canje Exitoso!" : "Validación Fallida"}
                    </h3>
                    <p className="text-xs leading-relaxed">
                      {validationResult.message}
                    </p>

                    {validationResult.coupon && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[11px]">Cliente:</span>
                          <span className="font-medium text-white">{validationResult.coupon.customerName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Beneficio:</span>
                          <span className="font-medium text-emerald-400">{validationResult.coupon.title}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Código:</span>
                          <span className="font-mono text-slate-300">{validationResult.coupon.code}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Estado:</span>
                          <span className="font-bold text-white uppercase">{validationResult.coupon.status}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Camera / Mock Scan Helper */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>Prueba Rápida en Pantalla (Click para simular escaneo):</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                Selecciona cualquier cupón activo actualmente en el restaurante para probar el canje al instante:
              </p>

              <div className="flex flex-wrap gap-2">
                {activeCoupons.slice(0, 3).map((coup) => (
                  <button
                    key={coup.id}
                    onClick={() => handleValidate(coup.code)}
                    className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors font-mono flex items-center gap-1.5"
                  >
                    <span>{coup.code}</span>
                    <span className="text-emerald-400 text-[10px]">({coup.customerName.split(" ")[0]})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Active coupons list & Anti-fraud rules */}
        <div className="lg:col-span-5 space-y-6">
          {/* Instructions and Rules */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Protocolo Anti-Fraude (PRD Sec. 21 y 53)</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                <span><strong>Un Solo Uso:</strong> Una vez validado, el cupón pasa inmediatamente a estado "redeemed" y no puede ser usado de nuevo.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                <span><strong>Fecha de Caducidad:</strong> Los cupones emitidos vencen automáticamente a los 30 días de su creación.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                <span><strong>Auditoría:</strong> Queda registrado el nombre del personal, la fecha y la hora exacta del canje.</span>
              </li>
            </ul>
          </div>

          {/* Quick Stats */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3">Cupones Pendientes por Canjear</h3>
            <div className="space-y-2.5">
              {activeCoupons.length === 0 ? (
                <p className="text-xs text-slate-500 py-3 text-center">No hay cupones activos pendientes.</p>
              ) : (
                activeCoupons.slice(0, 4).map((c) => (
                  <div
                    key={c.id}
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-medium text-white">{c.title}</p>
                      <p className="text-[11px] text-slate-400">{c.customerName} • {c.code}</p>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      Activo
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
