"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/store";
import { Coupon } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";
import {
  ArrowLeft,
  Gift,
  CheckCircle2,
  Clock,
  ScanLine,
  History,
  ShieldCheck,
  User,
} from "lucide-react";

export default function CouponDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [coupon, setCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    if (id) {
      const c = store.getCouponByIdOrCode(id);
      if (c) setCoupon(c);
    }
  }, [id]);

  if (!coupon) {
    return (
      <DashboardShell title="Detalle del Cupón">
        <div className="glass-panel p-8 rounded-2xl text-center border border-slate-200">
          <p className="text-slate-700 font-semibold">Cupón no encontrado en el sistema.</p>
          <Link href="/coupons" className="text-emerald-700 text-xs mt-3 inline-block font-bold hover:underline">
            Volver al catálogo de cupones
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const usage = coupon.usageCount ?? (coupon.status === "redeemed" ? 1 : 0);
  const max = coupon.maxUsages || 1;
  const isFullyRedeemed = coupon.status === "redeemed" || usage >= max;

  return (
    <DashboardShell
      title={`Cupón Digital • ${coupon.code}`}
      subtitle={`Asignado a ${coupon.customerName} • Monitoreo de usos y redenciones`}
    >
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <Link
            href="/coupons"
            className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al catálogo de cupones</span>
          </Link>

          {!isFullyRedeemed && (
            <Link
              href="/validate"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              <ScanLine className="w-3.5 h-3.5" />
              <span>Validar en Caja POS</span>
            </Link>
          )}
        </div>

        {/* Big visual coupon card with QR */}
        <div className="glass-panel p-8 rounded-3xl border border-emerald-200 bg-gradient-to-b from-white via-white to-emerald-50/40 text-center space-y-6 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                Beneficio de Fidelización y Retorno
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-black uppercase border",
                  isFullyRedeemed
                    ? "bg-slate-100 text-slate-700 border-slate-300"
                    : "bg-emerald-50 text-emerald-800 border-emerald-300"
                )}
              >
                {isFullyRedeemed ? "Canjeado / Agotado" : "Activo para Canje"}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">{coupon.title}</h2>
            <p className="text-sm text-slate-700 max-w-md mx-auto font-medium leading-relaxed">{coupon.description}</p>
          </div>

          {/* Usage counter spotlight */}
          <div className="inline-flex items-center gap-4 bg-slate-50 border border-slate-300 rounded-2xl px-6 py-3 shadow-xs">
            <div className="text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                Veces Ocupado / Canjeado
              </span>
              <span className="text-lg font-black text-slate-900">
                {usage} de {max} {max === 1 ? "uso permitido" : "usos permitidos"}
              </span>
            </div>
            <div className="pl-4 border-l border-slate-300">
              <span className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold border",
                usage > 0 ? "bg-emerald-50 text-emerald-800 border-emerald-300" : "bg-slate-100 text-slate-700 border-slate-200"
              )}>
                {usage > 0 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5 text-slate-500" />}
                <span>{usage > 0 ? `${Math.round((usage / max) * 100)}% Consumido` : "Sin uso previo"}</span>
              </span>
            </div>
          </div>

          {/* QR Code */}
          <div className="inline-block p-4 bg-white rounded-2xl shadow-md border-2 border-slate-200">
            <QRCodeSVG value={coupon.code} size={170} level="H" includeMargin={false} />
          </div>

          <div className="bg-slate-100 border border-slate-300 rounded-2xl p-3.5 max-w-xs mx-auto">
            <p className="text-[11px] text-slate-600 uppercase font-extrabold">Código Único de Caja:</p>
            <p className="font-mono text-lg font-black text-emerald-800 tracking-wider mt-0.5">
              {coupon.code}
            </p>
          </div>

          {/* Details list */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left text-xs">
            <div className="space-y-1">
              <span className="text-slate-600 block text-[11px] font-bold">Cliente Titular:</span>
              <span className="font-extrabold text-slate-900 block">{coupon.customerName}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-600 block text-[11px] font-bold">Fecha de Emisión:</span>
              <span className="text-slate-800 font-semibold block">{formatDate(coupon.createdAt)}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-600 block text-[11px] font-bold">Fecha de Expiración:</span>
              <span className="text-slate-800 font-semibold block">{new Date(coupon.expiresAt).toLocaleDateString("es-CL")}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-600 block text-[11px] font-bold">Estado en Sistema:</span>
              <span className="font-extrabold text-emerald-800 uppercase block">{coupon.status}</span>
            </div>
          </div>
        </div>

        {/* Redemptions History Table */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <History className="w-4 h-4 text-emerald-600" />
              <span>Historial Detallado de Usos y Canjes ({usage})</span>
            </div>
            <span className="text-xs text-slate-600 font-medium">Registro de auditoría en caja POS</span>
          </div>

          {coupon.redemptions && coupon.redemptions.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {coupon.redemptions.map((r, idx) => (
                <div key={r.id || idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Validado con éxito en caja</p>
                      <p className="text-[11px] text-slate-600 font-medium">
                        Atendido por {r.redeemedByStaff} {r.ticketAmount ? `• Boleta: $${r.ticketAmount.toLocaleString("es-CL")}` : ""}
                      </p>
                      {r.notes && <p className="text-[11px] text-slate-500 italic mt-0.5">{r.notes}</p>}
                    </div>
                  </div>
                  <span className="text-slate-600 font-mono text-[11px] font-semibold">{formatDate(r.redeemedAt)}</span>
                </div>
              ))}
            </div>
          ) : coupon.redeemedAt ? (
            <div className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                  #1
                </div>
                <div>
                  <p className="font-bold text-slate-900">Validado con éxito en caja</p>
                  <p className="text-[11px] text-slate-600 font-medium">Atendido por {coupon.redeemedByStaff || "Personal de Caja"}</p>
                </div>
              </div>
              <span className="text-slate-600 font-mono text-[11px] font-semibold">{formatDate(coupon.redeemedAt)}</span>
            </div>
          ) : (
            <div className="py-6 text-center text-slate-600 text-xs">
              <Clock className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <p className="font-bold text-slate-800">Este cupón aún no ha sido ocupado.</p>
              <p className="text-slate-500 mt-1">El cliente puede presentarlo en caja cuando vuelva al restaurante.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
