"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import confetti from "canvas-confetti";
import {
  Star,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Gift,
  Store,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { store } from "@/lib/store";
import { Business, Coupon } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";

const NEGATIVE_REASONS = [
  "Tiempo de espera prolongado",
  "Atención del personal",
  "Temperatura o punto de los platos",
  "Relación precio / porción",
  "Ruido o ambiente incómodo",
  "Error en el pedido / cuenta",
];

const POSITIVE_HIGHLIGHTS = [
  "Comida y sabores deliciosos",
  "Atención rápida y amable",
  "Excelente ambiente y música",
  "Relación calidad / precio",
  "Detalles y cortesías especiales",
];

export default function PublicFeedbackPage() {
  const params = useParams();
  const token = params?.token as string;

  const [business, setBusiness] = useState<Business | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);
  const [wantsContact, setWantsContact] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [generatedCoupon, setGeneratedCoupon] = useState<Coupon | null>(null);
  const [copiedReview, setCopiedReview] = useState(false);

  useEffect(() => {
    setBusiness(store.getBusiness());
  }, []);

  const handleStarSelect = (stars: number) => {
    setRating(stars);
  };

  const toggleReason = (reason: string) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter((r) => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  const toggleHighlight = (highlight: string) => {
    if (selectedHighlights.includes(highlight)) {
      setSelectedHighlights(selectedHighlights.filter((h) => h !== highlight));
    } else {
      setSelectedHighlights([...selectedHighlights, highlight]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);

    const isPromoter = rating >= (business?.minStarsForGoogle || 4);

    const result = store.submitCustomerFeedback({
      name: name.trim() || "Cliente Anónimo",
      email: email.trim() || `anon-${Date.now()}@reviewflow.cl`,
      phone: phone.trim() || undefined,
      rating,
      comment: comment.trim() || (isPromoter ? "Muy buena atención." : "Hubo detalles por mejorar."),
      negativeReasons: !isPromoter ? selectedReasons : undefined,
      positiveHighlights: isPromoter ? selectedHighlights : undefined,
      wantsContact,
      channel: "QR en Mesa",
    });

    if (result.coupon) {
      setGeneratedCoupon(result.coupon);
    }

    if (isPromoter) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10B981", "#34D399", "#6EE7B7", "#F59E0B"],
        });
      } catch (e) {
        // ignore in non-browser or disabled canvas
      }
    }

    setIsSubmitting(false);
    setIsCompleted(true);
  };

  const copyToClipboard = () => {
    if (comment) {
      navigator.clipboard.writeText(comment);
      setCopiedReview(true);
      setTimeout(() => setCopiedReview(false), 3000);
    }
  };

  if (!business) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center p-4">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const isPromoter = rating >= business.minStarsForGoogle;

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col items-center justify-start p-4 sm:p-6 py-8">
      {/* Container - mobile first 460px max width */}
      <div className="w-full max-w-md mx-auto">
        {/* Business Branding Card */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-2xl shadow-xl shadow-emerald-950/60 border border-emerald-400/30">
            {business.logoUrl || "🍽️"}
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            {business.name}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            {business.welcomeMessage}
          </p>
        </div>

        {!isCompleted ? (
          <form
            onSubmit={handleSubmit}
            className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6"
          >
            {/* Star Rating Section */}
            <div className="text-center">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                ¿Qué calificación le das a tu visita?
              </label>

              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => handleStarSelect(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1.5 focus:outline-none transition-transform active:scale-125"
                  >
                    <Star
                      className={cn(
                        "w-9 h-9 transition-colors duration-150",
                        (hoverRating || rating) >= star
                          ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                          : "text-slate-700 hover:text-slate-600"
                      )}
                    />
                  </button>
                ))}
              </div>

              {/* Rating Mood Label */}
              <div className="h-6 mt-2 flex items-center justify-center">
                {rating === 5 && (
                  <span className="text-xs font-bold text-emerald-400 animate-fade-in">
                    🌟 ¡Excelente! Nos alegra mucho saberlo
                  </span>
                )}
                {rating === 4 && (
                  <span className="text-xs font-bold text-teal-400 animate-fade-in">
                    ✨ Muy bueno, gracias por tu preferencia
                  </span>
                )}
                {rating === 3 && (
                  <span className="text-xs font-bold text-amber-400 animate-fade-in">
                    🤔 Experiencia regular, cuéntanos qué podemos mejorar
                  </span>
                )}
                {rating === 2 && (
                  <span className="text-xs font-bold text-rose-400 animate-fade-in">
                    😔 Lamentamos la demora o inconveniente
                  </span>
                )}
                {rating === 1 && (
                  <span className="text-xs font-bold text-rose-500 animate-fade-in">
                    ⚠️ Muy insatisfecho, queremos resolverlo contigo
                  </span>
                )}
              </div>
            </div>

            {/* If rating selected, show dynamic conditional questions */}
            {rating > 0 && (
              <div className="space-y-5 pt-2 border-t border-slate-800/80 animate-fade-in">
                {/* 1 - 3 Stars: Negative / Recovery Path */}
                {!isPromoter ? (
                  <div className="space-y-3">
                    <label className="block text-xs font-medium text-slate-300">
                      ¿Qué aspecto no cumplió tus expectativas? (Opcional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {NEGATIVE_REASONS.map((reason) => {
                        const isSelected = selectedReasons.includes(reason);
                        return (
                          <button
                            type="button"
                            key={reason}
                            onClick={() => toggleReason(reason)}
                            className={cn(
                              "text-xs px-3 py-1.5 rounded-full border transition-all",
                              isSelected
                                ? "bg-rose-500/20 text-rose-200 border-rose-500/40 font-medium"
                                : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700"
                            )}
                          >
                            {reason}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* 4 - 5 Stars: Positive Highlights Path */
                  <div className="space-y-3">
                    <label className="block text-xs font-medium text-slate-300">
                      ¿Qué fue lo más destacado de tu visita?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {POSITIVE_HIGHLIGHTS.map((highlight) => {
                        const isSelected = selectedHighlights.includes(highlight);
                        return (
                          <button
                            type="button"
                            key={highlight}
                            onClick={() => toggleHighlight(highlight)}
                            className={cn(
                              "text-xs px-3 py-1.5 rounded-full border transition-all",
                              isSelected
                                ? "bg-emerald-500/20 text-emerald-200 border-emerald-500/40 font-medium"
                                : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700"
                            )}
                          >
                            {highlight}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Comment area */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {isPromoter
                      ? "Comparte tus comentarios o sugerencias:"
                      : "Cuéntanos en detalle qué ocurrió:"}
                  </label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={
                      isPromoter
                        ? "La comida estuvo riquísima y la atención fue muy rápida..."
                        : "Esperamos demasiado tiempo por los platos principales..."
                    }
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Customer Details */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Tu Nombre:
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: Sofía Gómez"
                      className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Tu Email:
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="para enviarte tu cupón"
                        className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Teléfono (Opcional):
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+56 9 1234 5678"
                        className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {!isPromoter && (
                    <label className="flex items-start gap-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wantsContact}
                        onChange={(e) => setWantsContact(e.target.checked)}
                        className="mt-0.5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-xs text-slate-300">
                        Deseo que la administración me contacte para escuchar mi caso y buscar una compensación.
                      </span>
                    </label>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm py-3 rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4" />
                  <span>Enviar y Obtener Cupón de Regalo</span>
                </button>
              </div>
            )}
          </form>
        ) : (
          /* SUCCESS SCREEN WITH GOOGLE REDIRECT & COUPON */
          <div className="space-y-5 animate-fade-in">
            {/* Header message */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h2 className="text-lg font-bold text-white mb-1">
                {isPromoter ? "¡Muchísimas gracias!" : "Mensaje Recibido Directamente"}
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {isPromoter
                  ? "Tu opinión nos ayuda enormemente a destacar entre los mejores de la zona."
                  : "Tu feedback ya fue entregado a la gerencia para tomar medidas operacionales inmediatas."}
              </p>

              {/* If Promoter: Google Reviews Call to Action */}
              {isPromoter && (
                <div className="mt-5 p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 text-left">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>¿Nos regalas 30 segundos en Google?</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-3">
                    Copia tu comentario y pégalo en nuestra ficha de Google Maps para apoyar al equipo:
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold py-2 px-3 rounded-lg border border-slate-700 transition-colors text-slate-200"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedReview ? "¡Copiado al portapapeles!" : "Copiar mi comentario"}</span>
                    </button>
                  </div>

                  <a
                    href={business.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-emerald-950/60"
                  >
                    <span>Publicar Reseña en Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Generated Coupon Card with QR code */}
            {generatedCoupon && (
              <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 via-slate-900/90 to-slate-950 relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Tu Cupón de Cortesía
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    Válido 30 días
                  </span>
                </div>

                <div className="text-center">
                  <h3 className="text-base font-bold text-white mb-1">
                    {generatedCoupon.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    {generatedCoupon.description}
                  </p>

                  {/* QR Code Container */}
                  <div className="inline-block p-4 bg-white rounded-2xl shadow-xl mb-3">
                    <QRCodeSVG
                      value={generatedCoupon.code}
                      size={140}
                      level="H"
                      includeMargin={false}
                    />
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 max-w-xs mx-auto mb-2">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                      Código de Validación en Caja:
                    </p>
                    <p className="font-mono font-bold text-emerald-400 tracking-wider text-sm mt-0.5">
                      {generatedCoupon.code}
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Muestra este código QR o compártelo al momento de solicitar tu cuenta.
                  </p>
                </div>
              </div>
            )}

            {/* Safe footer */}
            <div className="text-center pt-2">
              <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Powered by ReviewFlow • doui B2B Reputation</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
