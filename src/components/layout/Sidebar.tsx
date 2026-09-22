"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquareHeart,
  Users,
  QrCode,
  TicketPercent,
  ScanLine,
  BarChart3,
  Settings,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { store } from "@/lib/store";
import { useEffect, useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [businessName, setBusinessName] = useState("Trattoria Da Matteo");
  const [recoveryCount, setRecoveryCount] = useState(1);

  useEffect(() => {
    const update = () => {
      setBusinessName(store.getBusiness().name);
      setRecoveryCount(store.getMetrics().activeRecoveryCases);
    };
    update();
    return store.subscribe(update);
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Bandeja de Feedback",
      href: "/feedback",
      icon: MessageSquareHeart,
      badge: recoveryCount > 0 ? `${recoveryCount} atención` : undefined,
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300 font-semibold",
    },
    {
      name: "Directorio Clientes",
      href: "/customers",
      icon: Users,
    },
    {
      name: "Campañas & QR",
      href: "/campaigns",
      icon: QrCode,
    },
    {
      name: "Cupones Emitidos",
      href: "/coupons",
      icon: TicketPercent,
    },
    {
      name: "Terminal Validador QR",
      href: "/validate",
      icon: ScanLine,
      highlight: true,
    },
    {
      name: "Analytics & Reportes",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Configuración & Diseño",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-screen fixed left-0 top-0 z-30 select-none shadow-sm">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black shadow-md shadow-emerald-500/20">
            RF
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                ReviewFlow
              </span>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                doui
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate max-w-[130px] font-medium">
              {businessName}
            </p>
          </div>
        </Link>
      </div>

      {/* Business Status Pill */}
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-700 font-medium">Filtro Google Activo</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">≥ 4★</span>
        </div>
      </div>

      {/* Navigation items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-semibold shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                item.highlight && !isActive && "text-teal-700 hover:text-teal-900 bg-teal-50/70 border border-teal-200/60"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-transform group-hover:scale-110",
                    isActive
                      ? "text-emerald-600"
                      : item.highlight
                      ? "text-teal-600"
                      : "text-slate-400 group-hover:text-slate-700"
                  )}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full border",
                    item.badgeColor
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Customer Testing Box */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50/60 to-white p-3 shadow-xs">
          <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simulador de Cliente</span>
          </div>
          <p className="text-[11px] text-slate-600 mb-2.5 leading-relaxed">
            Prueba la landing móvil de calificación, logo y cupones QR.
          </p>
          <Link
            href="/r/demo-token"
            target="_blank"
            className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 rounded-xl transition-colors shadow-sm"
          >
            <span>Abrir Encuesta</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
