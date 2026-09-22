"use client";

import { useState, useEffect } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/store";
import { Business, BusinessCategory } from "@/lib/types";
import {
  Settings,
  Store,
  MapPin,
  Phone,
  Link2,
  Star,
  CheckCircle2,
  Save,
  Palette,
  Image as ImageIcon,
  Sparkles,
  Smartphone,
  Upload,
} from "lucide-react";

// Curated Gradients
const GRADIENT_PRESETS = [
  {
    name: "Esmeralda & Bosque",
    gradient: "linear-gradient(135deg, #064e3b 0%, #0f172a 100%)",
  },
  {
    name: "Sunset Cálido",
    gradient: "linear-gradient(135deg, #f97316 0%, #7c2d12 100%)",
  },
  {
    name: "Lavanda Nórdico",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #1e1b4b 100%)",
  },
  {
    name: "Elegancia Slate & Navy",
    gradient: "linear-gradient(135deg, #334155 0%, #0f172a 100%)",
  },
  {
    name: "Golden Hour / Ámbar",
    gradient: "linear-gradient(135deg, #d97706 0%, #451a03 100%)",
  },
  {
    name: "Borgoña & Vino",
    gradient: "linear-gradient(135deg, #9f1239 0%, #4c0519 100%)",
  },
];

// Curated Unsplash Hospitality Photos
const PHOTO_PRESETS = [
  {
    name: "Restaurante Gourmet & Luces",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
  },
  {
    name: "Cafetería Boutique & Madera",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop&q=80",
  },
  {
    name: "Cava de Vinos & Bar",
    url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&auto=format&fit=crop&q=80",
  },
  {
    name: "Barbería Clásica & Sillón",
    url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&auto=format&fit=crop&q=80",
  },
  {
    name: "Clínica & Espacio Zen",
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&auto=format&fit=crop&q=80",
  },
  {
    name: "Terraza Nocturna & Velas",
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80",
  },
];

// Preset Logos
const LOGO_PRESETS = [
  { name: "Gastronomía", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&auto=format&fit=crop&q=80" },
  { name: "Café & Bakery", url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&auto=format&fit=crop&q=80" },
  { name: "Barbería & Estilo", url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&auto=format&fit=crop&q=80" },
  { name: "Salud & Dental", url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=200&auto=format&fit=crop&q=80" },
];

export default function SettingsPage() {
  const [business, setBusiness] = useState<Business>(store.getBusiness());
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setBusiness(store.getBusiness());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateBusiness(business);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Preview background style
  const getPreviewBackground = () => {
    if (business.bgType === "gradient") {
      return { background: business.bgGradient || GRADIENT_PRESETS[0].gradient };
    }
    if (business.bgType === "color") {
      return { backgroundColor: business.bgColor || "#f8fafc" };
    }
    if (business.bgType === "preset_image") {
      return {
        backgroundImage: `url(${business.bgPresetImage || PHOTO_PRESETS[0].url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    if (business.bgType === "custom_image") {
      return {
        backgroundImage: `url(${business.bgCustomImage || PHOTO_PRESETS[0].url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return { background: GRADIENT_PRESETS[0].gradient };
  };

  return (
    <DashboardShell
      title="Personalización Visual y Configuración de Google"
      subtitle="Diseña el fondo de tu formulario móvil, carga el logo de tu empresa y calibra las reglas de reseñas"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Settings Form */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          {/* Logo Section */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold uppercase text-emerald-700 tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>1. Logo de la Empresa</span>
            </h3>

            <p className="text-xs text-slate-500">
              Aparecerá en la parte superior del formulario que ven tus clientes al escanear el QR.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl border-2 border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                {business.logoUrl ? (
                  <img
                    src={business.logoUrl}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Store className="w-8 h-8 text-slate-400" />
                )}
              </div>

              <div className="flex-1 space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  URL o Enlace de tu Logo:
                </label>
                <input
                  type="url"
                  value={business.logoUrl || ""}
                  onChange={(e) => setBusiness({ ...business, logoUrl: e.target.value })}
                  placeholder="https://tudominio.cl/logo.png"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Quick logo presets */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                O elige un logo predeterminado para probar:
              </span>
              <div className="flex flex-wrap gap-2">
                {LOGO_PRESETS.map((lp) => (
                  <button
                    key={lp.name}
                    type="button"
                    onClick={() => setBusiness({ ...business, logoUrl: lp.url })}
                    className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium text-slate-700 transition-colors"
                  >
                    {lp.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Background Customization Section */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl space-y-5">
            <h3 className="text-sm font-bold uppercase text-emerald-700 tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-600" />
              <span>2. Diseño de Fondo del Formulario Móvil</span>
            </h3>

            {/* Background Type Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setBusiness({ ...business, bgType: "gradient" })}
                className={`py-2 rounded-xl transition-all ${
                  business.bgType === "gradient"
                    ? "bg-white text-emerald-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Degradados
              </button>

              <button
                type="button"
                onClick={() => setBusiness({ ...business, bgType: "preset_image" })}
                className={`py-2 rounded-xl transition-all ${
                  business.bgType === "preset_image"
                    ? "bg-white text-emerald-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Fotos de Galería
              </button>

              <button
                type="button"
                onClick={() => setBusiness({ ...business, bgType: "color" })}
                className={`py-2 rounded-xl transition-all ${
                  business.bgType === "color"
                    ? "bg-white text-emerald-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Color Sólido
              </button>

              <button
                type="button"
                onClick={() => setBusiness({ ...business, bgType: "custom_image" })}
                className={`py-2 rounded-xl transition-all ${
                  business.bgType === "custom_image"
                    ? "bg-white text-emerald-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Foto Propia
              </button>
            </div>

            {/* Sub-panels based on bgType */}
            {business.bgType === "gradient" && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-slate-700 block">
                  Selecciona un Degradado Elegante:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {GRADIENT_PRESETS.map((gp) => (
                    <button
                      key={gp.name}
                      type="button"
                      onClick={() => setBusiness({ ...business, bgGradient: gp.gradient })}
                      className={`h-16 rounded-xl border-2 p-2 text-left flex flex-col justify-end transition-all text-white text-[11px] font-bold shadow-xs ${
                        business.bgGradient === gp.gradient ? "border-emerald-600 ring-2 ring-emerald-500/30" : "border-transparent"
                      }`}
                      style={{ background: gp.gradient }}
                    >
                      <span className="drop-shadow-sm">{gp.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {business.bgType === "preset_image" && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-slate-700 block">
                  Selecciona una Foto de Fondo de Alta Calidad:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PHOTO_PRESETS.map((pp) => (
                    <button
                      key={pp.name}
                      type="button"
                      onClick={() => setBusiness({ ...business, bgPresetImage: pp.url })}
                      className={`h-20 rounded-xl border-2 overflow-hidden relative text-left p-2 flex flex-col justify-end transition-all shadow-xs ${
                        business.bgPresetImage === pp.url ? "border-emerald-600 ring-2 ring-emerald-500/30" : "border-transparent"
                      }`}
                      style={{
                        backgroundImage: `url(${pp.url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/40" />
                      <span className="relative z-10 text-white font-bold text-[10px] leading-tight drop-shadow-sm">
                        {pp.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {business.bgType === "color" && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-slate-700 block">
                  Elige el Color de Fondo:
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={business.bgColor || "#f8fafc"}
                    onChange={(e) => setBusiness({ ...business, bgColor: e.target.value })}
                    className="w-12 h-10 rounded-xl cursor-pointer border border-slate-300"
                  />
                  <input
                    type="text"
                    value={business.bgColor || "#f8fafc"}
                    onChange={(e) => setBusiness({ ...business, bgColor: e.target.value })}
                    className="w-32 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                  />
                </div>
              </div>
            )}

            {business.bgType === "custom_image" && (
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Enlace directo de tu foto de fondo:
                </label>
                <input
                  type="url"
                  value={business.bgCustomImage || ""}
                  onChange={(e) => setBusiness({ ...business, bgCustomImage: e.target.value })}
                  placeholder="https://tudominio.cl/foto-local.jpg"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-emerald-600"
                />
                <p className="text-[11px] text-slate-500">
                  Recomendamos fotos de buena iluminación de tu sala de ventas, terraza o mostrador.
                </p>
              </div>
            )}

            {/* Overlay Opacity Slider */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Atenuación del Fondo (Contraste):</span>
                <span className="font-mono text-slate-500 font-bold">
                  {Math.round((business.bgOverlayOpacity ?? 0.65) * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={business.bgOverlayOpacity ?? 0.65}
                onChange={(e) => setBusiness({ ...business, bgOverlayOpacity: parseFloat(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Section 3: Google Reviews URL & Basic Info */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold uppercase text-emerald-700 tracking-wider flex items-center gap-2">
              <Link2 className="w-4 h-4 text-emerald-600" />
              <span>3. Enlace de Google Business & Regla de Estrellas</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                URL para Publicar Reseña en Google Maps:
              </label>
              <input
                type="url"
                required
                value={business.googleReviewUrl}
                onChange={(e) => setBusiness({ ...business, googleReviewUrl: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Filtro Mínimo para Redirigir a Google:
              </label>
              <div className="flex items-center gap-2">
                {[4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setBusiness({ ...business, minStarsForGoogle: val })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      business.minStarsForGoogle === val
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Mínimo {val} Estrellas ({val === 4 ? "Recomendado" : "Solo 5 Estrellas"})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre del Negocio:
                </label>
                <input
                  type="text"
                  required
                  value={business.name}
                  onChange={(e) => setBusiness({ ...business, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Categoría:
                </label>
                <select
                  value={business.category}
                  onChange={(e) => setBusiness({ ...business, category: e.target.value as BusinessCategory })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                >
                  <option value="restaurant">Restaurante / Bar / Gastronomía</option>
                  <option value="barbershop">Barbería / Peluquería / Estética</option>
                  <option value="clinic">Clínica / Dentista / Salud</option>
                  <option value="gym">Gimnasio / Deporte</option>
                  <option value="retail">Comercio / Tienda Física</option>
                  <option value="automotive">Taller / Concesionario</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>¡Diseño y configuración guardados con éxito!</span>
              </span>
            ) : (
              <span />
            )}

            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Todo</span>
            </button>
          </div>
        </form>

        {/* Right 5 cols: Live Smartphone Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-24 space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold uppercase text-slate-600 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Vista Previa en Vivo (Cliente)</span>
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                iPhone / Android
              </span>
            </div>

            {/* Mobile frame */}
            <div className="w-full max-w-[340px] mx-auto rounded-[38px] border-8 border-slate-800 bg-slate-900 shadow-2xl overflow-hidden relative">
              {/* Camera notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full z-30" />

              {/* Simulated screen */}
              <div
                className="relative min-h-[520px] p-4 flex flex-col items-center justify-center transition-all duration-300"
                style={getPreviewBackground()}
              >
                {/* Overlay layer */}
                <div
                  className="absolute inset-0 bg-black transition-opacity"
                  style={{ opacity: business.bgOverlayOpacity ?? 0.65 }}
                />

                {/* Simulated Customer Card */}
                <div className="relative z-10 w-full bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/60 text-center space-y-3">
                  {/* Logo preview */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 mx-auto shadow-md border-2 border-white">
                    {business.logoUrl ? (
                      <img src={business.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">🍽️</div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{business.name}</h4>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{business.welcomeMessage}</p>
                  </div>

                  <div className="flex items-center justify-center gap-1 pt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-500" />
                    ))}
                  </div>

                  <div className="bg-emerald-50 text-emerald-800 text-[10px] font-bold py-1.5 px-2.5 rounded-lg border border-emerald-200">
                    🌟 ¡Excelente! Apóyanos en Google
                  </div>

                  <div className="w-full bg-emerald-600 text-white font-bold text-[11px] py-2 rounded-xl shadow-xs">
                    Obtener Cupón de Regalo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
