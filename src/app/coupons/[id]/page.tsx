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
  User,
  ShieldCheck,
  ScanLine,
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
        <div className="glass-panel p-8 rounded-2xl text-center">
          <p className="text-slate-400">Cupón no encontrado.</p>
          <Link href="/coupons" className="text-emerald-400 text-xs mt-3 inline-block font-semibold">
            Volver al catálogo
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const isRedeemed = coupon.status === "redeemed";

  return (
    <DashboardShell
      title={`Cupón Digital • ${coupon.code}`}
      subtitle={`Asignado a ${coupon.customerName}`}
    >
      <div className="space-y-6 max-w-2xl mx-auto">
        <Link
          href="/coupons"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al catálogo de cupones</span>
        </Link>

        {/* Big visual coupon card with QR */}
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Beneficio de Fidelización
              </span>
            </div>

            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase border",
                isRedeemed
                  ? "bg-slate-800 text-slate-400 border-slate-700"
                  : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
              )}
            >
              {isRedeemed ? "Canjeado en Caja" : "Activo para Canje"}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-1.5">{coupon.title}</h2>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">{coupon.description}</p>
          </div>

          {/* QR Code */}
          <div className="inline-block p-4 bg-white rounded-2xl shadow-xl border-4 border-slate-800">
            <QRCodeSVG value={coupon.code} size={160} level="H" includeMargin={false} />
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 max-w-xs mx-auto">
            <p className="text-[10px] text-slate-500 uppercase font-medium">Código Único:</p>
            <p className="font-mono text-base font-bold text-emerald-400 tracking-wider mt-0.5">
              {coupon.code}
            </p>
          </div>

          {/* Details list */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-left text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 block text-[11px]">Cliente Titular:</span>
              <span className="font-medium text-white">{coupon.customerName}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 block text-[11px]">Fecha de Emisión:</span>
              <span className="text-slate-300">{formatDate(coupon.createdAt)}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 block text-[11px]">Fecha de Expiración:</span>
              <span className="text-slate-300">{new Date(coupon.expiresAt).toLocaleDateString("es-CL")}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 block text-[11px]">Estado Actual:</span>
              <span className="font-bold text-emerald-400 uppercase">{coupon.status}</span>
            </div>
          </div>

          {isRedeemed && (
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Canjeado el {formatDate(coupon.redeemedAt || "")} por {coupon.redeemedByStaff}</span>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
