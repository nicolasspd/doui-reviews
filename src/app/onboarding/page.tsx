"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { store } from "@/lib/store";
import { BusinessCategory } from "@/lib/types";
import {
  Sparkles,
  ArrowRight,
  Store,
  Link2,
  Gift,
  CheckCircle2,
  Clock,
  Wand2,
  Palette,
  ShieldCheck,
  QrCode,
  Smartphone,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Curated presets for instant setup
const PRESET_BACKGROUNDS = [
  {
    name: "Restaurante Gourmet",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-amber-950 via-slate-900 to-black",
  },
  {
    name: "Cafetería Boutique",
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-amber-900 via-stone-900 to-neutral-950",
  },
  {
    name: "Degradado Esmeralda Moderno",
    url: "",
    gradient: "from-emerald-900 via-teal-950 to-slate-950",
  },
  {
    name: "Atardecer Terraza",
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-rose-950 via-purple-950 to-slate-950",
  },
];

export default function OnboardingPage() {
  const router = useRouter();

  // Mode: "auto" (Magic setup with just Name + Link) vs "step" (Step by step in < 3 min)
  const [mode, setMode] = useState<"auto" | "step">("auto");
  const [step, setStep] = useState(1);

  // Core inputs
  const [name, setName] = useState("");
  const [websiteOrMapsUrl, setWebsiteOrMapsUrl] = useState("");
  const [category, setCategory] = useState<BusinessCategory>("restaurant");
  const [selectedBg, setSelectedBg] = useState(PRESET_BACKGROUNDS[0]);
  const [rewardTitle, setRewardTitle] = useState("Postre de cortesía de la casa o 15% OFF en tu próxima visita");

  // Magic auto-config state
  const [isAutoConfiguring, setIsAutoConfiguring] = useState(false);
  const [autoConfigDone, setAutoConfigDone] = useState(false);
  const [autoConfigProgress, setAutoConfigProgress] = useState(0);

  // Handle Automatic Magic Setup (Menos de 1 minuto)
  const handleAutoConfigure = () => {
    if (!name.trim()) return;

    setIsAutoConfiguring(true);
    setAutoConfigProgress(15);

    // Simulate intelligent detection pipeline
    setTimeout(() => setAutoConfigProgress(40), 400);
    setTimeout(() => setAutoConfigProgress(75), 900);
    setTimeout(() => {
      setAutoConfigProgress(100);
      setIsAutoConfiguring(false);
      setAutoConfigDone(true);
    }, 1400);
  };

  const handleFinishAndEnter = () => {
    const finalGoogleUrl = websiteOrMapsUrl.trim()
      ? websiteOrMapsUrl.includes("g.page") || websiteOrMapsUrl.includes("google.com/maps")
        ? websiteOrMapsUrl
        : `https://g.page/r/${name.replace(/\s+/g, "")}/review`
      : `https://g.page/r/${name.replace(/\s+/g, "") || "MiRestaurante"}/review`;

    store.updateBusiness({
      name: name || "Mi Restaurante",
      category,
      googleReviewUrl: finalGoogleUrl,
      welcomeMessage: `¿Cómo estuvo tu experiencia hoy en ${name || "nuestro local"}?`,
      thankYouMessage: "¡Muchas gracias por tu visita! Tu opinión nos ayuda a superarnos cada día.",
      minStarsForGoogle: 4,
      bgType: selectedBg.url ? "preset_image" : "gradient",
      bgPresetImage: selectedBg.url || undefined,
      bgGradient: selectedBg.gradient,
      bgOverlayOpacity: 0.45,
    });

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-lg mx-auto shadow-md shadow-emerald-500/20">
            RF
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Configura tu ReviewFlow en menos de 3 Minutos
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Prepara tu restaurante para capturar reseñas 5★ en Google Maps y fidelizar a cada cliente
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex p-1 bg-slate-200/80 rounded-2xl border border-slate-300">
          <button
            type="button"
            onClick={() => {
              setMode("auto");
              setAutoConfigDone(false);
            }}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2",
              mode === "auto"
                ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Wand2 className="w-4 h-4 text-emerald-600" />
            <span>⚡ Configurar por mí con solo Nombre y Link (&lt; 1 min)</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("step")}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2",
              mode === "step"
                ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Clock className="w-4 h-4 text-teal-600" />
            <span>⏱️ Paso a Paso Personalizado (&lt; 3 min)</span>
          </button>
        </div>

        {/* Main Card Content */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          {/* ======================================================== */}
          {/* MODE A: MAGIC AUTO-SETUP WITH NAME & LINK (< 1 MIN)      */}
          {/* ======================================================== */}
          {mode === "auto" && !autoConfigDone && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-emerald-950 text-sm mb-0.5">
                    Modo Ultra Rápido: Solo 2 datos necesarios
                  </p>
                  <p className="text-slate-700">
                    Ingresa el nombre de tu restaurante y el link de su página web, Instagram o Google Maps. Nosotros detectaremos tu identidad, diseñaremos el formulario con fondo de alta gastronomía y prepararemos los cupones automáticamente.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    1. Nombre de tu Restaurante o Negocio:
                  </label>
                  <div className="relative">
                    <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: Trattoria Da Matteo / Sushi Garden / Bistro Don Pedro"
                      className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    2. Link de la Página Web, Google Maps o Instagram:
                  </label>
                  <div className="relative">
                    <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="url"
                      value={websiteOrMapsUrl}
                      onChange={(e) => setWebsiteOrMapsUrl(e.target.value)}
                      placeholder="https://g.page/r/... o https://www.mirestaurante.cl"
                      className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1.5 font-medium">
                    Si no tienes el link exacto de Google Maps a mano, lo autogeneramos con tu nombre para que puedas comenzar ya.
                  </p>
                </div>
              </div>

              {/* Progress bar during auto config */}
              {isAutoConfiguring && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-emerald-600 animate-spin" />
                      <span>Autoconfigurando tu plataforma...</span>
                    </span>
                    <span>{autoConfigProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                      style={{ width: `${autoConfigProgress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Aplicando fondo gastronómico, calibrando filtro de 4★ y generando cupones QR...
                  </p>
                </div>
              )}

              {!isAutoConfiguring && (
                <button
                  type="button"
                  onClick={handleAutoConfigure}
                  disabled={!name.trim()}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>⚡ Dejar que lo configuren por mí (&lt; 1 minuto)</span>
                </button>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* MODE A RESULT: SUMMARY READY TO ENTER DASHBOARD          */}
          {/* ======================================================== */}
          {mode === "auto" && autoConfigDone && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    ¡Plataforma 100% Configurada para {name}!
                  </h3>
                  <p className="text-xs text-slate-700 font-medium">
                    Hemos dejado todo listo con estándares de alta hostelería.
                  </p>
                </div>
              </div>

              {/* Summary cards of what was configured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Filtro de Calificación Activo</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    4 y 5★ van directo a publicar en Google Maps. 1 a 3★ van a tu buzón privado de gerencia para recuperarlos.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Palette className="w-4 h-4 text-emerald-600" />
                    <span>Fondo y Diseño del Formulario</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Fondo temático de restaurante con overlay de contraste para garantizar que el cliente lea y conteste cómodo.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Gift className="w-4 h-4 text-emerald-600" />
                    <span>Cupón de Retorno Configurado</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {rewardTitle}. Código QR único con verificación anti-fraude en caja.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    <span>QR de Mesas Listo para Imprimir</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Atril y sticker para colocar en mesas, barra y cuentas con derivación instantánea.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAutoConfigDone(false)}
                  className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Modificar Datos</span>
                </button>
                <button
                  type="button"
                  onClick={handleFinishAndEnter}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Entrar al Dashboard de mi Restaurante</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODE B: GUIDED STEP-BY-STEP SETUP (< 3 MINUTES)          */}
          {/* ======================================================== */}
          {mode === "step" && (
            <div className="space-y-6 animate-fade-in">
              {/* Stepper Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center border border-emerald-300">
                    {step}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      {step === 1 && "Paso 1: Identidad del Local (Estimado: 45 seg)"}
                      {step === 2 && "Paso 2: Fondo y Diseño del Formulario (Estimado: 45 seg)"}
                      {step === 3 && "Paso 3: Cupón de Fidelización y Filtro (Estimado: 30 seg)"}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Paso {step} de 3 • Tiempo total: Menos de 2 minutos
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {step === 1 ? "33% Completado" : step === 2 ? "66% Completado" : "90% Completado"}
                </span>
              </div>

              {/* STEP 1: Basic Business Data */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Nombre de tu restaurante o local:
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: Trattoria Da Matteo"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Giro o Rubro:
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as BusinessCategory)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
                    >
                      <option value="restaurant">Restaurante / Bar / Gastronomía</option>
                      <option value="barbershop">Barbería / Peluquería / Estética</option>
                      <option value="clinic">Clínica / Dentista / Salud</option>
                      <option value="gym">Gimnasio / Fitness</option>
                      <option value="retail">Comercio / Tienda Local</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Link de la Web o Google Maps del negocio:
                    </label>
                    <input
                      type="url"
                      value={websiteOrMapsUrl}
                      onChange={(e) => setWebsiteOrMapsUrl(e.target.value)}
                      placeholder="https://g.page/r/... o https://mirestaurante.cl"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!name.trim()}
                    className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Siguiente: Elegir Fondo y Diseño</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* STEP 2: Background & Visual Design */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Elige el Fondo para el Formulario de tus Clientes (1-Click):
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {PRESET_BACKGROUNDS.map((bg, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedBg(bg)}
                          className={cn(
                            "p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-end h-24",
                            selectedBg.name === bg.name
                              ? "border-emerald-600 ring-2 ring-emerald-500/20 shadow-md"
                              : "border-slate-300 hover:border-slate-400"
                          )}
                          style={{
                            backgroundImage: bg.url ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${bg.url})` : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          {!bg.url && (
                            <div className={`absolute inset-0 bg-gradient-to-br ${bg.gradient}`} />
                          )}
                          <div className="relative z-10">
                            <span className="text-white text-xs font-extrabold block drop-shadow-sm">
                              {bg.name}
                            </span>
                            {selectedBg.name === bg.name && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300 font-bold mt-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                                Seleccionado
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
                    >
                      Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>Siguiente: Cupón de Fidelización</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Loyalty Coupon & Filter */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Beneficio o Cortesía que recibirá el cliente al contestar:
                    </label>
                    <input
                      type="text"
                      required
                      value={rewardTitle}
                      onChange={(e) => setRewardTitle(e.target.value)}
                      placeholder="Ej: Postre gratis o 15% de descuento en próxima visita"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-emerald-600"
                    />
                    <p className="text-[11px] text-slate-600 mt-1 font-medium">
                      Este beneficio se entrega en un cupón digital con QR para canjear en la caja de tu restaurante.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                    <p className="font-extrabold text-emerald-900">
                      Regla de Filtro Google Activada Automáticamente:
                    </p>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      Los clientes que califiquen con 4 y 5★ serán invitados a dejar su reseña en Google Maps con 1 clic. Si califican con 1, 2 o 3★, quedará en privado para que puedas comunicarte y retenerlos.
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
                    >
                      Atrás
                    </button>
                    <button
                      type="button"
                      onClick={handleFinishAndEnter}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Finalizar y Entrar al Dashboard</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
