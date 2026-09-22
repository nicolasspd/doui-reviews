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
  ShieldCheck,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<BusinessCategory>("restaurant");
  const [googleUrl, setGoogleUrl] = useState("https://g.page/r/MiNegocio/review");
  const [rewardTitle, setRewardTitle] = useState("Copa de cortesía o 15% de descuento");

  const handleFinish = () => {
    store.updateBusiness({
      name: name || "Mi Negocio Local",
      category,
      googleReviewUrl: googleUrl,
      welcomeMessage: `¿Cómo estuvo tu experiencia hoy en ${name || "nuestro local"}?`,
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-black text-lg mx-auto shadow-lg shadow-emerald-950/50">
            RF
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Configura tu ReviewFlow en 2 Minutos
          </h1>
          <p className="text-xs text-slate-400">
            Paso {step} de 3 • Listo para capturar feedback y reseñas en Google
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                <Store className="w-4 h-4" />
                <span>Datos Básicos del Negocio</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nombre de tu local o empresa:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Barbería Don Bosco / Clínica Cordillera"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Categoría o Giro:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BusinessCategory)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:border-emerald-500"
                >
                  <option value="restaurant">Restaurante / Bar / Gastronomía</option>
                  <option value="barbershop">Barbería / Peluquería / Estética</option>
                  <option value="clinic">Clínica / Dentista / Salud</option>
                  <option value="gym">Gimnasio / Deporte</option>
                  <option value="automotive">Taller Automotriz / Concesionario</option>
                  <option value="retail">Comercio / Tienda Física</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!name.trim()}
                className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-emerald-950/50 flex items-center justify-center gap-1.5"
              >
                <span>Continuar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                <Link2 className="w-4 h-4" />
                <span>Enlace de Google Maps / Reseñas</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Enlace directo para calificar en Google:
                </label>
                <input
                  type="url"
                  required
                  value={googleUrl}
                  onChange={(e) => setGoogleUrl(e.target.value)}
                  placeholder="https://g.page/r/.../review"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  ReviewFlow redirigirá automáticamente a tus clientes felices (4 y 5★) a esta página.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-medium"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-emerald-950/50 flex items-center justify-center gap-1.5"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                <Gift className="w-4 h-4" />
                <span>Incentivo de Fidelización</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  ¿Qué cortesía o beneficio recibirá el cliente al contestar?
                </label>
                <input
                  type="text"
                  required
                  value={rewardTitle}
                  onChange={(e) => setRewardTitle(e.target.value)}
                  placeholder="Ej: 15% OFF en segunda visita o Postre gratis"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Se generará un cupón con código QR para canjear en la caja de tu local.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-medium"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-emerald-950/50 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Finalizar y Entrar al Dashboard</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
