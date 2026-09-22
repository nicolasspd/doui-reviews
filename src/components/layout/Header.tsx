"use client";

import Link from "next/link";
import { ScanLine, ExternalLink, Bell, Store, CheckCircle2 } from "lucide-react";
import { store } from "@/lib/store";
import { useEffect, useState } from "react";

export function Header({ title, subtitle }: { title?: string; subtitle?: string }) {
  const [businessName, setBusinessName] = useState("");

  useEffect(() => {
    setBusinessName(store.getBusiness().name);
  }, []);

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#080c14]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      <div>
        {title ? (
          <div>
            <h1 className="text-lg font-semibold text-white tracking-tight">{title}</h1>
            {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Store className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">{businessName}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Panel Operacional</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Test Public Customer Form */}
        <Link
          href="/r/demo-token"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-xs font-medium text-slate-200 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Ver Encuesta Cliente</span>
        </Link>

        {/* Quick QR Validator Terminal */}
        <Link
          href="/validate"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors shadow-md shadow-emerald-950/50"
        >
          <ScanLine className="w-3.5 h-3.5" />
          <span>Escanear Cupón QR</span>
        </Link>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-slate-400 hidden md:inline">En Línea</span>
        </div>
      </div>
    </header>
  );
}
