"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/store";
import { Feedback, Coupon } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";
import {
  ArrowLeft,
  Star,
  User,
  Mail,
  Phone,
  Gift,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Clock,
} from "lucide-react";

export default function FeedbackDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [offeredBenefit, setOfferedBenefit] = useState("Cena de cortesía / Postre gratis");
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    if (id) {
      const fb = store.getFeedbackById(id);
      if (fb) {
        setFeedback(fb);
        setIsResolved(fb.recoveryStatus === "resolved");
        if (fb.couponId) {
          const coup = store.getCouponByIdOrCode(fb.couponId);
          if (coup) setCoupon(coup);
        }
      }
    }
  }, [id]);

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback) return;

    store.resolveRecoveryCase(feedback.id, resolutionNotes, offeredBenefit);
    setIsResolved(true);
    setFeedback(store.getFeedbackById(feedback.id) || null);
  };

  if (!feedback) {
    return (
      <DashboardShell title="Detalle de Feedback">
        <div className="glass-panel p-8 rounded-2xl text-center">
          <p className="text-slate-400">Feedback no encontrado.</p>
          <Link href="/feedback" className="text-emerald-400 text-xs mt-3 inline-block font-semibold">
            Volver a la bandeja
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const isNegative = feedback.rating <= 3;

  return (
    <DashboardShell
      title={`Detalle de Feedback • ${feedback.customerName}`}
      subtitle={`Opinión capturada el ${formatDate(feedback.createdAt)} vía ${feedback.channel}`}
    >
      <div className="space-y-6">
        <Link
          href="/feedback"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a la bandeja</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Feedback Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex items-center gap-1 px-3 py-1 rounded-xl text-sm font-bold",
                      feedback.rating >= 4
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                        : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                    )}
                  >
                    <span>{feedback.rating}.0</span>
                    <Star className="w-4 h-4 fill-current" />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-white">
                      {feedback.customerName}
                    </h2>
                    <p className="text-xs text-slate-400">
                      Canal: {feedback.channel} {feedback.serviceOrStaff && `• ${feedback.serviceOrStaff}`}
                    </p>
                  </div>
                </div>

                {isNegative && (
                  <span
                    className={cn(
                      "text-xs px-3 py-1 rounded-full font-bold border",
                      isResolved
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    )}
                  >
                    {isResolved ? "Caso Resuelto ✓" : "Atención Requerida"}
                  </span>
                )}
              </div>

              {/* Comment Quote */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <p className="text-sm text-slate-200 leading-relaxed italic">
                  "{feedback.comment}"
                </p>
              </div>

              {/* Negative reasons or Positive Highlights */}
              {feedback.negativeReasons && feedback.negativeReasons.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">
                    Motivos de insatisfacción indicados por el cliente:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {feedback.negativeReasons.map((r) => (
                      <span
                        key={r}
                        className="text-xs px-3 py-1 rounded-lg bg-rose-950/40 text-rose-300 border border-rose-800/40 font-medium"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {feedback.positiveHighlights && feedback.positiveHighlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">
                    Aspectos más destacados por el cliente:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {feedback.positiveHighlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs px-3 py-1 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recovery Action Form (PRD Section 30) */}
            {isNegative && (
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Protocolo de Recuperación del Cliente (PRD Sec. 30)
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Registra el contacto directo realizado por el administrador y la compensación acordada para evitar la pérdida del cliente.
                </p>

                {isResolved ? (
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Caso Cerrado con Éxito</span>
                    </p>
                    <p className="text-slate-300">
                      <strong>Notas registradas:</strong> {feedback.resolutionNotes}
                    </p>
                    <p className="text-slate-400 font-mono text-[11px]">
                      Fecha de resolución: {formatDate(feedback.resolvedAt || "")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleResolve} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Compensación u Oferta Propuesta:
                      </label>
                      <input
                        type="text"
                        value={offeredBenefit}
                        onChange={(e) => setOfferedBenefit(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Notas de la llamada o conversación:
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={resolutionNotes}
                        onChange={(e) => setResolutionNotes(e.target.value)}
                        placeholder="Se llamó a Rodrigo, se explicó que hubo una falla puntual en cocina y se le invitó a una cena de compensación el próximo viernes..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-colors shadow-md shadow-emerald-950/40"
                    >
                      Guardar Resolución y Cerrar Caso
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Customer Info & Coupon Issued */}
          <div className="lg:col-span-4 space-y-6">
            {/* Customer Info Card */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
                Datos de Contacto
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-slate-500" />
                  <span className="text-white font-medium">{feedback.customerName}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300">{feedback.customerEmail}</span>
                </div>

                {feedback.customerPhone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-mono font-medium">
                      {feedback.customerPhone}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Coupon Card */}
            {coupon && (
              <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 space-y-3 bg-slate-900/60">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Gift className="w-4 h-4" />
                  <span>Cupón Asociado a esta Opinión</span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-white">{coupon.title}</h4>
                  <p className="text-xs text-slate-400">{coupon.description}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 font-bold text-center">
                  {coupon.code}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Estado:</span>
                  <span className="font-bold uppercase text-white">{coupon.status}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
