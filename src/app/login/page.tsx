"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail, ShieldCheck, Store, Sparkles } from "lucide-react";
import { store } from "@/lib/store";
import { UserRole } from "@/lib/types";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("super_admin");
  const [email, setEmail] = useState("admin@doui.cl");
  const [password, setPassword] = useState("••••••••");

  const handleSelectRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === "super_admin") {
      setEmail("admin@doui.cl");
    } else {
      setEmail("contacto@damatteo.cl");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    store.switchRole(role);
    if (role === "super_admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  const handleQuickLogin = (targetRole: UserRole) => {
    store.switchRole(targetRole);
    if (targetRole === "super_admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-lg mx-auto shadow-md shadow-emerald-500/20">
            RF
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Iniciar Sesión en ReviewFlow
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            Selecciona tu tipo de cuenta para ingresar
          </p>
        </div>

        {/* 1-Click Role Switcher Demo Cards */}
        <div className="space-y-2.5">
          <p className="text-[11px] font-black uppercase tracking-wider text-slate-500 text-center">
            Accesos directos de prueba inmediata:
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleQuickLogin("super_admin")}
              className="p-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-emerald-500 text-left transition-all shadow-sm hover:shadow-md group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">👑</span>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  doui team
                </span>
              </div>
              <p className="font-black text-xs text-slate-900 group-hover:text-emerald-700 transition-colors">
                Super Admin
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-tight">
                Control de todos los restaurantes y métricas globales
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("client")}
              className="p-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-blue-400 text-left transition-all shadow-sm hover:shadow-md group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">🏪</span>
                <span className="text-[10px] font-black text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  Local
                </span>
              </div>
              <p className="font-black text-xs text-slate-900 group-hover:text-blue-700 transition-colors">
                Cliente (Dueño)
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-tight">
                Dashboard privado de Trattoria Da Matteo
              </p>
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="glass-panel p-6 sm:p-7 rounded-3xl space-y-4 shadow-sm border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Correo Electrónico:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Contraseña:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>Iniciar Sesión como {role === "super_admin" ? "Super Admin" : "Cliente"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="pt-2 text-center">
            <Link href="/onboarding" className="text-xs text-emerald-800 font-bold hover:underline">
              ¿Quieres registrar un nuevo restaurante? Onboarding en 3 min →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
