"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScanLine, ExternalLink, Store, ShieldCheck, ChevronDown, Check } from "lucide-react";
import { store } from "@/lib/store";
import { TenantBusiness, User } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Header({ title, subtitle }: { title?: string; subtitle?: string }) {
  const [businessName, setBusinessName] = useState("");
  const [user, setUser] = useState<User>(store.getCurrentUser());
  const [tenants, setTenants] = useState<TenantBusiness[]>(store.getTenants());
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);

  useEffect(() => {
    const update = () => {
      setBusinessName(store.getBusiness().name);
      setUser(store.getCurrentUser());
      setTenants(store.getTenants());
    };
    update();
    return store.subscribe(update);
  }, []);

  const isSuperAdmin = user.role === "super_admin";

  const toggleRole = () => {
    const nextRole = isSuperAdmin ? "client" : "super_admin";
    store.switchRole(nextRole);
  };

  const handleSelectTenant = (tenantId: string) => {
    store.switchTenant(tenantId);
    setShowTenantDropdown(false);
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div className="flex items-center gap-3">
        {title ? (
          <div>
            <h1 className="text-sm sm:text-base md:text-lg font-black text-slate-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-xs text-slate-700 font-semibold hidden sm:block">{subtitle}</p>}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800">
            <Store className="w-4 h-4 text-emerald-600" />
            <span className="font-extrabold text-slate-900">{businessName}</span>
            <span className="text-slate-400 font-bold">/</span>
            <span className="text-slate-700 font-bold">Panel Operacional</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        {/* Super Admin Tenant Selector */}
        {isSuperAdmin && (
          <div className="relative">
            <button
              onClick={() => setShowTenantDropdown(!showTenantDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors shadow-2xs"
            >
              <Store className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden md:inline text-slate-500 font-medium">Local:</span>
              <span className="max-w-[120px] sm:max-w-[180px] truncate">{businessName}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {showTenantDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-fade-in divide-y divide-slate-100">
                <div className="p-2">
                  <p className="text-[10px] font-black uppercase text-slate-600">Cambiar Local (Super Admin)</p>
                </div>
                <div className="py-1 space-y-1">
                  {tenants.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTenant(t.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors",
                        store.getBusiness().id === t.id
                          ? "bg-emerald-50 text-emerald-900 font-black"
                          : "text-slate-700 hover:bg-slate-50 font-bold"
                      )}
                    >
                      <div>
                        <p className="leading-snug">{t.name}</p>
                        <p className="text-[10px] text-slate-500 font-normal">{t.category} • Plan {t.plan}</p>
                      </div>
                      {store.getBusiness().id === t.id && (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="p-2 pt-2">
                  <Link
                    href="/admin"
                    onClick={() => setShowTenantDropdown(false)}
                    className="w-full block text-center py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] font-extrabold text-slate-800 transition-colors"
                  >
                    Ver Consola Super Admin Completa →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Role Switcher Pill */}
        <button
          onClick={toggleRole}
          title="Haz clic para alternar entre el rol de Super Admin y el rol de Cliente"
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black transition-all shadow-2xs",
            isSuperAdmin
              ? "bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100"
              : "bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100"
          )}
        >
          <span>{isSuperAdmin ? "👑 Super Admin" : "🏪 Cliente (Local)"}</span>
          <span className="text-[10px] font-medium text-slate-500 hidden lg:inline">• Cambiar</span>
        </button>

        {/* Public review form link */}
        <Link
          href="/r/demo-token"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors shadow-2xs"
        >
          <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
          <span>Ver Encuesta</span>
        </Link>

        {/* Quick QR Validator Terminal */}
        <Link
          href="/validate"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all shadow-sm"
        >
          <ScanLine className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Escanear Cupón</span>
        </Link>
      </div>
    </header>
  );
}
