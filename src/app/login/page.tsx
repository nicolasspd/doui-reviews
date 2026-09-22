"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail, Store } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@damatteo.cl");
  const [password, setPassword] = useState("••••••••");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-black text-lg mx-auto shadow-lg shadow-emerald-950/50">
            RF
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Iniciar Sesión en ReviewFlow
          </h1>
          <p className="text-xs text-slate-400">
            Plataforma B2B para Trattoria Da Matteo
          </p>
        </div>

        <form onSubmit={handleLogin} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Correo Electrónico:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Contraseña:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-emerald-950/50 flex items-center justify-center gap-1.5"
          >
            <span>Entrar al Panel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="pt-2 text-center">
            <Link href="/onboarding" className="text-xs text-emerald-400 hover:underline">
              ¿Nuevo negocio? Configurar aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
