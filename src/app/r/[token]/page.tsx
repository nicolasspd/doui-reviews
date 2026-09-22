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
  Sparkles,
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
        // ignore
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
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Dynamic Background resolver
  const getContainerBackground = () => {
    if (business.bgType === "gradient") {
      return { background: business.bgGradient || "linear-gradient(135deg, #064e3b 0%, #0f172a 100%)" };
    }
    if (business.bgType === "color") {
      return { backgroundColor: business.bgColor || "#f1f5f9" };
    }
    if (business.bgType === "preset_image") {
      return {
        backgroundImage: `url(${business.bgPresetImage || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      };
    }
    if (business.bgType === "custom_image") {
      return {
        backgroundImage: `url(${business.bgCustomImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      };
    }
    return { background: "linear-gradient(135deg, #064e3b 0%, #0f172a 100%)" };
  };

  const isPromoter = rating >= business.minStarsForGoogle;

  return (
    <div
      className="min-h-screen relative text-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 py-10 transition-all duration-300"
      style={getContainerBackground()}
    >
      {/* Background Overlay Layer */}
      <div
        className="absolute inset-0 bg-slate-950 transition-opacity"
        style={{ opacity: business.bgOverlayOpacity ?? 0.65 }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md mx-auto space-y-4">
        {/* Business Branding Card */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-3 rounded-2xl overflow-hidden bg-white shadow-xl border-4 border-white/80 flex items-center justify-center">
            {business.logoUrl ? (
              <img
                src={business.logoUrl}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Store className="w-10 h-10 text-emerald-600" />
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
            {business.name}
          </h1>
          <p className="text-xs text-slate-200 mt-1 max-w-xs mx-auto drop-shadow-sm font-medium">
            {business.welcomeMessage}
          </p>
        </div>

        {!isCompleted ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl shadow-2xl border border-white/80 space-y-6"
          >
            {/* Star Rating Section */}
            <div className="text-center">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
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
                    className="p-1 focus:outline-none transition-transform active:scale-125"
                  >
                    <Star
                      className={cn(
                        "w-9 h-9 transition-colors duration-150",
                        (hoverRating || rating) >= star
                          ? "fill-amber-400 text-amber-500 drop-shadow-sm"
                          : "text-slate-300 hover:text-slate-400"
                      )}
                    />
                  </button>
                ))}
              </div>

              {/* Rating Mood Label */}
              <div className="h-6 mt-2 flex items-center justify-center">
                {rating === 5 && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    🌟 ¡Excelente! Nos alegra mucho saberlo
                  </span>
                )}
                {rating === 4 && (
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    ✨ Muy bueno, gracias por preferirnos
                  </span>
                )}
                {rating === 3 && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    🤔 Experiencia regular, cuéntanos qué mejorar
                  </span>
                )}
                {rating === 2 && (
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                    😔 Lamentamos la demora o inconveniente
                  </span>
                )}
                {rating === 1 && (
                  <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-300">
                    ⚠️ Muy insatisfecho, queremos resolverlo contigo
                  </span>
                )}
              </div>
            </div>

            {/* If rating selected, show dynamic conditional questions */}
            {rating > 0 && (
              <div className="space-y-4 pt-2 border-t border-slate-100 animate-fade-in">
                {/* 1 - 3 Stars: Negative / Recovery Path */}
                {!isPromoter ? (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">
                      ¿Qué aspecto no cumplió tus expectativas? (Opcional)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {NEGATIVE_REASONS.map((reason) => {
                        const isSelected = selectedReasons.includes(reason);
                        return (
                          <button
                            type="button"
                            key={reason}
                            onClick={() => toggleReason(reason)}
                            className={cn(
                              "text-xs px-2.5 py-1 rounded-xl border transition-all",
                              isSelected
                                ? "bg-rose-50 text-rose-800 border-rose-300 font-semibold"
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
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
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">
                      ¿Qué fue lo más destacado de tu visita?
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {POSITIVE_HIGHLIGHTS.map((highlight) => {
                        const isSelected = selectedHighlights.includes(highlight);
                        return (
                          <button
                            type="button"
                            key={highlight}
                            onClick={() => toggleHighlight(highlight)}
                            className={cn(
                              "text-xs px-2.5 py-1 rounded-xl border transition-all",
                              isSelected
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold"
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
                  />
                </div>

                {/* Customer Details */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tu Nombre:
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: Sofía Gómez"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tu Email:
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="para enviarte tu cupón"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Teléfono (Opcional):
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+56 9 1234 5678"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  {!isPromoter && (
                    <label className="flex items-start gap-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wantsContact}
                        onChange={(e) => setWantsContact(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs text-slate-700 font-medium">
                        Deseo que la administración me contacte para escuchar mi caso y buscar una compensación.
                      </span>
                    </label>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-2xl transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4" />
                  <span>Enviar y Obtener Cupón de Regalo</span>
                </button>
              </div>
            )}
          </form>
        ) : (
          /* SUCCESS SCREEN WITH GOOGLE REDIRECT & COUPON */
          <div className="space-y-4 animate-fade-in">
            {/* Header message */}
            <div className="bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-white/80 text-center shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {isPromoter ? "¡Muchísimas gracias!" : "Mensaje Recibido Directamente"}
              </h2>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                {isPromoter
                  ? "Tu opinión nos ayuda enormemente a destacar entre los mejores de la zona."
                  : "Tu feedback ya fue entregado a la gerencia para tomar medidas operacionales inmediatas."}
              </p>

              {/* If Promoter: Google Reviews Call to Action */}
              {isPromoter && (
                <div className="mt-5 p-4 rounded-2xl bg-gradient-to-b from-emerald-50/70 to-white border border-emerald-200 text-left shadow-xs">
                  <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-1">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>¿Nos regalas 30 segundos en Google?</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">
                    Copia tu comentario y pégalo en nuestra ficha de Google Maps para apoyar al equipo:
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-200 transition-colors text-slate-800 shadow-2xs"
                    >
                      <Copy className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{copiedReview ? "¡Copiado al portapapeles!" : "Copiar mi comentario"}</span>
                    </button>
                  </div>

                  <a
                    href={business.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-emerald-700/20"
                  >
                    <span>Publicar Reseña en Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Generated Coupon Card with QR code */}
            {generatedCoupon && (
              <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-white/80 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Tu Cupón de Cortesía
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                    Válido 30 días
                  </span>
                </div>

                <div className="text-center">
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {generatedCoupon.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    {generatedCoupon.description}
                  </p>

                  {/* QR Code Container */}
                  <div className="inline-block p-4 bg-white rounded-2xl shadow-md border-2 border-slate-100 mb-3">
                    <QRCodeSVG
                      value={generatedCoupon.code}
                      size={140}
                      level="H"
                      includeMargin={false}
                    />
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 max-w-xs mx-auto mb-2">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      Código para Validar en Caja:
                    </p>
                    <p className="font-mono font-extrabold text-emerald-700 tracking-wider text-base mt-0.5">
                      {generatedCoupon.code}
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Presenta este código QR o indícalo a tu camarero o recepcionista.
                  </p>
                </div>
              </div>
            )}

            {/* Safe footer */}
            <div className="text-center pt-2">
              <p className="text-[11px] text-slate-200 flex items-center justify-center gap-1.5 drop-shadow-sm font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Powered by ReviewFlow • doui B2B Reputation</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
