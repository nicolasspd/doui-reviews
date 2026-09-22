"use client";

import Link from "next/link";
import { ScanLine, ExternalLink, Store } from "lucide-react";
import { store } from "@/lib/store";
import { useEffect, useState } from "react";

export function Header({ title, subtitle }: { title?: string; subtitle?: string }) {
  const [businessName, setBusinessName] = useState("");

  useEffect(() => {
    setBusinessName(store.getBusiness().name);
  }, []);

  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/95 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div>
        {title ? (
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Store className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-900">{businessName}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 font-medium">Panel Operacional</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Test Public Customer Form */}
        <Link
          href="/r/demo-token"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
        >
          <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">Ver Encuesta Cliente</span>
        </Link>

        {/* Quick QR Validator Terminal */}
        <Link
          href="/validate"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          <ScanLine className="w-3.5 h-3.5" />
          <span>Escanear Cupón QR</span>
        </Link>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-slate-500 hidden md:inline">En Línea</span>
        </div>
      </div>
    </header>
  );
}
