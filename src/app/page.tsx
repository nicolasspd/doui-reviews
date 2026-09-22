import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  QrCode,
  ScanLine,
  TrendingUp,
  Gift,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-[#080c14]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-950/50">
              RF
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white">ReviewFlow</span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                by doui
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/r/demo-token"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              <span>Ver Encuesta Móvil</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </Link>

            <Link
              href="/dashboard"
              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md shadow-emerald-950/50 flex items-center gap-1.5"
            >
              <span>Acceder al Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 sm:py-24 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SaaS B2B de Feedback, Reputación y Retención para Negocios Locales</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Convierte cada atención en{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
            reseñas de 5 estrellas en Google
          </span>{" "}
          y recompras inmediatas
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          El bucle cerrado para restaurantes, clínicas, barberías y tiendas: captura feedback verificado, desvía quejas a recuperación privada antes de que dañen tu nota, y premia a los clientes con cupones QR canjeables en caja.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-xl shadow-emerald-950/60 flex items-center gap-2"
          >
            <span>Explorar Panel Operacional</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/r/demo-token"
            target="_blank"
            className="px-5 py-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition-colors flex items-center gap-2"
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span>Probar Encuesta de Cliente (QR)</span>
          </Link>

          <Link
            href="/validate"
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-800/40 font-semibold text-sm rounded-xl transition-colors flex items-center gap-2"
          >
            <ScanLine className="w-4 h-4" />
            <span>Terminal Validador QR</span>
          </Link>
        </div>

        {/* 3 Value Pillars (PRD Section 98) */}
        <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Filtro Inteligente de Reputación</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clientes con 4 o 5 estrellas son redirigidos directamente a Google Maps con su texto pre-copiado para publicar su reseña en 30 segundos.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Recuperación Privada de Quejas</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Si el cliente califica de 1 a 3 estrellas, el reclamo se gestiona en privado dentro del CRM, evitando malas notas públicas y activando una cortesía de compensación.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Motor de Cupones con QR en Caja</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Genera cupones únicos al finalizar la encuesta. Tu personal de caja escanea el QR en segundos desde el terminal web para asegurar la recompra sin duplicados.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>ReviewFlow by doui • Sistema Integral de Reputación y Fidelización para Negocios Locales</p>
      </footer>
    </div>
  );
}
