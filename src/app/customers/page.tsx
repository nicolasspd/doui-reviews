"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/store";
import { Customer } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Users, Search, Star, ChevronRight, Phone, Mail, Clock } from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const update = () => {
      setCustomers(store.getCustomers());
    };
    update();
    return store.subscribe(update);
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <DashboardShell
      title="Directorio de Clientes"
      subtitle="Historial de recurrencia, opiniones acumuladas y fidelización de cada cliente"
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar por nombre, correo o teléfono..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {filtered.length} clientes registrados
          </span>
        </div>

        {/* Customer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cust) => (
            <Link
              key={cust.id}
              href={`/customers/${cust.id}`}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all hover:bg-slate-900/60 block space-y-4 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
                    {cust.name}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3 text-slate-500" />
                    <span>{cust.email}</span>
                  </p>
                  {cust.phone && (
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-500" />
                      <span>{cust.phone}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  <span>{cust.averageRating.toFixed(1)}</span>
                  <Star className="w-3 h-3 fill-current" />
                </div>
              </div>

              {/* Stats: visits and last visit */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>{cust.visitsCount} {cust.visitsCount === 1 ? "visita" : "visitas"}</span>
                <span className="font-mono text-[11px]">Última: {new Date(cust.lastVisitAt).toLocaleDateString("es-CL")}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cust.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
