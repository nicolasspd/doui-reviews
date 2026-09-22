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
          <p className="text-slate-500">Cupón no encontrado.</p>
          <Link href="/coupons" className="text-emerald-700 text-xs mt-3 inline-block font-bold">
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
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al catálogo de cupones</span>
        </Link>

        {/* Big visual coupon card with QR */}
        <div className="glass-panel p-8 rounded-3xl border border-emerald-200 bg-gradient-to-b from-white via-white to-emerald-50/30 text-center space-y-6 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Beneficio de Fidelización
              </span>
            </div>

            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase border",
                isRedeemed
                  ? "bg-slate-100 text-slate-600 border-slate-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              )}
            >
              {isRedeemed ? "Canjeado en Caja" : "Activo para Canje"}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1.5">{coupon.title}</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">{coupon.description}</p>
          </div>

          {/* QR Code */}
          <div className="inline-block p-4 bg-white rounded-2xl shadow-md border-2 border-slate-100">
            <QRCodeSVG value={coupon.code} size={160} level="H" includeMargin={false} />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 max-w-xs mx-auto">
            <p className="text-[10px] text-slate-500 uppercase font-semibold">Código Único:</p>
            <p className="font-mono text-base font-extrabold text-emerald-700 tracking-wider mt-0.5">
              {coupon.code}
            </p>
          </div>

          {/* Details list */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-left text-xs">
            <div className="space-y-0.5">
              <span className="text-slate-400 block text-[11px] font-medium">Cliente Titular:</span>
              <span className="font-bold text-slate-900">{coupon.customerName}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 block text-[11px] font-medium">Fecha de Emisión:</span>
              <span className="text-slate-600">{formatDate(coupon.createdAt)}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 block text-[11px] font-medium">Fecha de Expiración:</span>
              <span className="text-slate-600">{new Date(coupon.expiresAt).toLocaleDateString("es-CL")}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 block text-[11px] font-medium">Estado Actual:</span>
              <span className="font-bold text-emerald-700 uppercase">{coupon.status}</span>
            </div>
          </div>

          {isRedeemed && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Canjeado el {formatDate(coupon.redeemedAt || "")} por {coupon.redeemedByStaff}</span>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
