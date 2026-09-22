"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/store";
import { CouponType } from "@/lib/types";
import {
  ArrowLeft,
  QrCode,
  Mail,
  MessageSquare,
  Gift,
  Sparkles,
} from "lucide-react";

export default function NewCampaignPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [channel, setChannel] = useState<"qr_table" | "post_service_email" | "whatsapp_auto">("qr_table");
  const [delayHours, setDelayHours] = useState(0);
  const [rewardTitle, setRewardTitle] = useState("Postre o Copa de Vino de Cortesía");
  const [rewardType, setRewardType] = useState<CouponType>("free_item");
  const [discountValue, setDiscountValue] = useState(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    store.createCampaign({
      businessId: store.getBusiness().id,
      name: name.trim(),
      channel,
      status: "active",
      delayHours,
      rewardCouponTitle: rewardTitle,
      rewardType,
      rewardDiscountValue: discountValue,
    });

    router.push("/campaigns");
  };

  return (
    <DashboardShell
      title="Configurar Nueva Campaña de Feedback"
      subtitle="Define el canal, el incentivo y el momento en que se solicita la opinión al cliente"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a campañas</span>
        </Link>

        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          {/* Step 1: Campaign Name */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              1. Nombre de la Campaña:
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: QR Encuesta Terraza de Verano"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Step 2: Channel Selection */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
              2. Canal de Captura:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setChannel("qr_table")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  channel === "qr_table"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <QrCode className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-xs">QR en Mesa / Caja</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Físico en atril o boleta</p>
              </button>

              <button
                type="button"
                onClick={() => setChannel("post_service_email")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  channel === "post_service_email"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <Mail className="w-5 h-5 text-teal-600 mb-2" />
                <h4 className="font-bold text-xs">Email Post-Servicio</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Envío 2h post-atención</p>
              </button>

              <button
                type="button"
                onClick={() => setChannel("whatsapp_auto")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  channel === "whatsapp_auto"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <MessageSquare className="w-5 h-5 text-green-600 mb-2" />
                <h4 className="font-bold text-xs">WhatsApp</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Mensaje directo al celular</p>
              </button>
            </div>
          </div>

          {/* Step 3: Reward / Loyalty Coupon */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-emerald-600" />
              <label className="block text-xs font-bold uppercase text-slate-700">
                3. Cupón de Incentivo para el Cliente:
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Título del Beneficio / Cortesía:
              </label>
              <input
                type="text"
                required
                value={rewardTitle}
                onChange={(e) => setRewardTitle(e.target.value)}
                placeholder="Ej: 15% OFF en tu próxima visita o Café gratis"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tipo de Beneficio:
                </label>
                <select
                  value={rewardType}
                  onChange={(e) => setRewardType(e.target.value as CouponType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-emerald-600"
                >
                  <option value="free_item">Cortesía de la casa (Postre / Bebida)</option>
                  <option value="percentage">Descuento Porcentual (%)</option>
                  <option value="fixed_amount">Monto Fijo ($ CLP)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Valor o Descuento:
                </label>
                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Activar Campaña y Generar Enlaces</span>
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}
