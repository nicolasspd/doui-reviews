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
  ShieldCheck,
} from "lucide-react";

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

  return (
    <DashboardShell
      title="Configuración del Negocio y Enlaces de Google"
      subtitle="Personaliza la identidad de tu local, tus reglas de derivación de reviews y tus mensajes de bienvenida"
    >
      <div className="max-w-3xl space-y-6">
        <form onSubmit={handleSave} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          {/* Section 1: Business Identity */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-2">
              <Store className="w-4 h-4" />
              <span>1. Identidad del Negocio</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nombre Comercial:
                </label>
                <input
                  type="text"
                  required
                  value={business.name}
                  onChange={(e) => setBusiness({ ...business, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Categoría del Negocio:
                </label>
                <select
                  value={business.category}
                  onChange={(e) => setBusiness({ ...business, category: e.target.value as BusinessCategory })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500"
                >
                  <option value="restaurant">Restaurante / Cafetería / Bar</option>
                  <option value="barbershop">Barbería / Peluquería / Salón</option>
                  <option value="clinic">Clínica / Centro Médico / Dentista</option>
                  <option value="gym">Gimnasio / Box / Fitness</option>
                  <option value="spa">Spa / Centro Estético</option>
                  <option value="automotive">Taller Mecánico / Concesionario</option>
                  <option value="retail">Retail / Tienda Física</option>
                  <option value="professional_services">Servicios Profesionales</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Teléfono de Contacto (con +56):
                </label>
                <input
                  type="text"
                  value={business.phone}
                  onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Dirección Física:
                </label>
                <input
                  type="text"
                  value={business.address}
                  onChange={(e) => setBusiness({ ...business, address: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Google Review Integration (PRD Section 60) */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              <span>2. Integración con Google Business & Maps (PRD Sec. 60)</span>
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                URL Directa para Dejar Reseña en Google:
              </label>
              <input
                type="url"
                required
                value={business.googleReviewUrl}
                onChange={(e) => setBusiness({ ...business, googleReviewUrl: e.target.value })}
                placeholder="https://g.page/r/.../review"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Esta es la dirección a la que se envía automáticamente a los clientes que califican con 4 o 5 estrellas.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Filtro Mínimo de Estrellas para Redirigir a Google:
              </label>
              <div className="flex items-center gap-3">
                {[4, 5].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setBusiness({ ...business, minStarsForGoogle: val })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      business.minStarsForGoogle === val
                        ? "bg-emerald-500 text-slate-950 border-emerald-400"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Mínimo {val} Estrellas ({val === 4 ? "Recomendado" : "Solo Perfectas"})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Messages */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold uppercase text-emerald-400 tracking-wider">
              3. Mensajes en la Encuesta del Cliente
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Pregunta de Bienvenida:
              </label>
              <input
                type="text"
                value={business.welcomeMessage}
                onChange={(e) => setBusiness({ ...business, welcomeMessage: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Mensaje de Agradecimiento:
              </label>
              <input
                type="text"
                value={business.thankYouMessage}
                onChange={(e) => setBusiness({ ...business, thankYouMessage: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2 flex items-center justify-between">
            {savedSuccess ? (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Cambios guardados con éxito!</span>
              </span>
            ) : (
              <span />
            )}

            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-950/40 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Configuración</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
