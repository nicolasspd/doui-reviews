import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  QrCode,
  ScanLine,
  Gift,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navbar */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black shadow-md shadow-emerald-500/20">
              RF
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-slate-900">ReviewFlow</span>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                by doui
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/r/demo-token"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              <span>Ver Encuesta Móvil</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            </Link>

            <Link
              href="/dashboard"
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Acceder al Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 sm:py-24 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>SaaS B2B de Feedback, Reputación y Retención para Negocios Locales</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Convierte cada atención en{" "}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
            reseñas de 5 estrellas en Google
          </span>{" "}
          y recompras inmediatas
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
          El bucle cerrado para restaurantes, clínicas, barberías y tiendas: captura feedback verificado, desvía quejas a recuperación privada antes de que dañen tu nota, y premia a los clientes con cupones QR canjeables en caja.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
          >
            <span>Explorar Panel Operacional</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/r/demo-token"
            target="_blank"
            className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm rounded-xl transition-colors shadow-2xs flex items-center gap-2"
          >
            <QrCode className="w-4 h-4 text-emerald-600" />
            <span>Probar Encuesta de Cliente (QR)</span>
          </Link>

          <Link
            href="/validate"
            className="px-5 py-3.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-semibold text-sm rounded-xl transition-colors flex items-center gap-2"
          >
            <ScanLine className="w-4 h-4 text-teal-600" />
            <span>Terminal Validador QR</span>
          </Link>
        </div>

        {/* 3 Value Pillars */}
        <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Filtro Inteligente de Reputación</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clientes con 4 o 5 estrellas son redirigidos directamente a Google Maps con su texto pre-copiado para publicar su reseña en 30 segundos.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Recuperación Privada de Quejas</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Si el cliente califica de 1 a 3 estrellas, el reclamo se gestiona en privado dentro del CRM, evitando malas notas públicas y activando una cortesía de compensación.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Motor de Cupones con QR en Caja</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Genera cupones únicos al finalizar la encuesta. Tu personal de caja escanea el QR en segundos desde el terminal web para asegurar la recompra sin duplicados.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 bg-white">
        <p>ReviewFlow by doui • Sistema Integral de Reputación y Fidelización para Negocios Locales</p>
      </footer>
    </div>
  );
}
