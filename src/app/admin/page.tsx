"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/store";
import { TenantBusiness, User } from "@/lib/types";
import {
  ShieldCheck,
  Building2,
  Users,
  Star,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Search,
  CheckCircle2,
  DollarSign,
  QrCode,
  Store,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SuperAdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User>(store.getCurrentUser());
  const [tenants, setTenants] = useState<TenantBusiness[]>(store.getTenants());
  const [search, setSearch] = useState("");

  useEffect(() => {
    const update = () => {
      setUser(store.getCurrentUser());
      setTenants(store.getTenants());
    };
    update();
    return store.subscribe(update);
  }, []);

  const isSuperAdmin = user.role === "super_admin";

  const handleImpersonate = (tenantId: string) => {
    store.switchTenant(tenantId);
    router.push("/dashboard");
  };

  const handleRoleToggle = (newRole: "super_admin" | "client") => {
    store.switchRole(newRole);
    if (newRole === "client") {
      router.push("/dashboard");
    }
  };

  const filteredTenants = tenants.filter((t) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.ownerName.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  });

  if (!isSuperAdmin) {
    return (
      <DashboardShell
        title="Acceso Restringido • Consola Super Admin"
        subtitle="Esta sección está reservada exclusivamente para el equipo administrativo de doui"
      >
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200 text-center max-w-lg mx-auto space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-300 text-amber-700 flex items-center justify-center mx-auto text-2xl font-black">
            🔒
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Estás en Modo Cliente (Dueño de Local)</h2>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
              Actualmente tu sesión tiene permisos de comercio para <strong>{user.businessName}</strong>. Para acceder a la administración global de todos los locales de la plataforma, activa el modo Super Admin.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => handleRoleToggle("super_admin")}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Cambiar a Super Admin doui</span>
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-colors"
            >
              Volver a mi Local
            </Link>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title="Consola Super Admin • doui Core Platform"
      subtitle="Supervisión global de clientes multitenant, volumen de reseñas capturadas y cambio rápido de local"
    >
      <div className="space-y-6">
        {/* Super Admin Status Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-300 bg-gradient-to-r from-emerald-50 via-white to-teal-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-emerald-600/20">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900 tracking-tight">
                  Panel Maestro de la Plataforma
                </h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Super Admin Activo
                </span>
              </div>
              <p className="text-xs text-slate-700 font-semibold mt-0.5">
                Sesión actual: <strong>{user.name}</strong> ({user.email}). Administrando <strong>{tenants.length} clientes activos</strong> en Santiago.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRoleToggle("client")}
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs rounded-xl border border-slate-300 transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <Store className="w-4 h-4 text-emerald-700" />
              <span>Ver como Cliente (Dueño Local)</span>
            </button>
          </div>
        </div>

        {/* Global Platform KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Locales / Clientes</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{tenants.length} Negocios</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">100% operativos</p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/40 via-white to-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Reseñas Google Totales</p>
                <p className="text-2xl font-black text-emerald-700 mt-1">1,420+</p>
                <p className="text-xs text-emerald-800 mt-1 font-medium">Calificaciones 4 y 5★ enviadas</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Star className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Facturación SaaS (MRR)</p>
                <p className="text-2xl font-black text-slate-900 mt-1">$356.000</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">CLP recurrente mensual</p>
              </div>
              <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Retención de Clientes</p>
                <p className="text-2xl font-black text-slate-900 mt-1">94.2%</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">Tasa de fidelización local</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Multitenant Directory Table */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200 shadow-xs space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900">Directorio de Negocios y Restaurantes Clientes</h3>
              <p className="text-xs text-slate-600 font-medium">
                Selecciona cualquier local para entrar a su dashboard operacional o gestionar sus campañas
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar por negocio o dueño..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 uppercase tracking-wider text-[11px] font-extrabold">
                <tr>
                  <th className="px-5 py-3.5">Local / Restaurante</th>
                  <th className="px-5 py-3.5">Titular / Contacto</th>
                  <th className="px-5 py-3.5">Plan SaaS</th>
                  <th className="px-5 py-3.5">Actividad Mensual</th>
                  <th className="px-5 py-3.5">Estado</th>
                  <th className="px-5 py-3.5 text-right">Acción Super Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTenants.map((t) => {
                  const isCurrent = store.getBusiness().id === t.id;

                  return (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-white shadow-2xs">
                            {t.logoUrl ? (
                              <img src={t.logoUrl} alt={t.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-100 font-bold text-slate-600">
                                {t.name.substring(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-900 block text-xs sm:text-sm">
                              {t.name}
                            </span>
                            <span className="text-[11px] text-slate-600 font-medium block">
                              {t.address}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-slate-900 block">{t.ownerName}</span>
                        <span className="text-[11px] text-slate-600 font-mono font-medium">{t.ownerEmail}</span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-lg text-xs font-black border",
                            t.plan === "Enterprise"
                              ? "bg-purple-50 text-purple-900 border-purple-300"
                              : t.plan === "Pro"
                              ? "bg-blue-50 text-blue-900 border-blue-300"
                              : "bg-slate-100 text-slate-800 border-slate-300"
                          )}
                        >
                          Plan {t.plan}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
                          <span className="font-bold text-emerald-800 block text-xs">
                            +{t.monthlyReviews} reseñas/mes
                          </span>
                          <span className="text-[11px] text-slate-600 font-medium">
                            {t.totalQRs} atriles QR activos
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{t.status === "active" ? "Operativo" : t.status}</span>
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleImpersonate(t.id)}
                          className={cn(
                            "px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shadow-2xs inline-flex items-center gap-1.5",
                            isCurrent
                              ? "bg-emerald-600 text-white shadow-sm cursor-default"
                              : "bg-white hover:bg-slate-100 text-slate-800 border border-slate-300"
                          )}
                        >
                          <LogIn className="w-3.5 h-3.5 text-current" />
                          <span>{isCurrent ? "Viendo Ahora" : "Entrar a Local"}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
