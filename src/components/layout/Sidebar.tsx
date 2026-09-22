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
  Store,
  ChevronRight,
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
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
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
      name: "Configuración & Google",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-[#070b12] flex flex-col h-screen fixed left-0 top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-950/40">
            RF
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                ReviewFlow
              </span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                doui
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-[130px]">
              {businessName}
            </p>
          </div>
        </Link>
      </div>

      {/* Business Status Pill */}
      <div className="px-4 py-3 border-b border-slate-800/50">
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-300 font-medium">Filtro Google Activo</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400">≥ 4★</span>
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
                "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive
                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60",
                item.highlight && !isActive && "text-teal-300 hover:text-teal-200 bg-teal-950/20 border border-teal-800/30"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-transform group-hover:scale-110",
                    isActive
                      ? "text-emerald-400"
                      : item.highlight
                      ? "text-teal-400"
                      : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full border font-semibold",
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
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-slate-900 p-3">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulador de Cliente</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
            Prueba la landing pública móvil de calificación y emisión de cupones.
          </p>
          <Link
            href="/r/demo-token"
            target="_blank"
            className="w-full flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-1.5 rounded-lg transition-colors shadow-md shadow-emerald-950/40"
          >
            <span>Abrir Encuesta</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
