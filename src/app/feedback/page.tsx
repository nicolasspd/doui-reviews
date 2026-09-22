"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/store";
import { Feedback } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";
import {
  Star,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  MessageSquareHeart,
  Phone,
  Mail,
  User,
} from "lucide-react";

export default function FeedbackInboxPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filterRating, setFilterRating] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [recoveryOnly, setRecoveryOnly] = useState(false);

  useEffect(() => {
    const update = () => {
      setFeedbacks(store.getFeedbacks());
    };
    update();
    return store.subscribe(update);
  }, []);

  const filteredFeedbacks = feedbacks.filter((fb) => {
    if (filterRating !== "all" && fb.rating !== Number(filterRating)) {
      return false;
    }
    if (recoveryOnly && fb.recoveryStatus !== "open" && fb.recoveryStatus !== "contacted") {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        fb.customerName.toLowerCase().includes(q) ||
        fb.comment.toLowerCase().includes(q) ||
        fb.channel.toLowerCase().includes(q) ||
        (fb.customerEmail && fb.customerEmail.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <DashboardShell
      title="Bandeja de Entrada de Feedback"
      subtitle="Auditoría de comentarios de clientes, detección de quejas privadas e historial de satisfacción"
    >
      <div className="space-y-6">
        {/* Filters and Search Bar */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar por cliente, comentario o sucursal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={() => setRecoveryOnly(!recoveryOnly)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 shrink-0",
                recoveryOnly
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
              )}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Solo Quejas Pendientes</span>
            </button>
          </div>

          {/* Star Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {["all", "5", "4", "3", "2", "1"].map((val) => (
              <button
                key={val}
                onClick={() => setFilterRating(val)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0",
                  filterRating === val
                    ? "bg-emerald-500 text-slate-950 font-bold"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                )}
              >
                {val === "all" ? "Todas" : `${val}★`}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback List Table */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800">
          <div className="divide-y divide-slate-800/80">
            {filteredFeedbacks.length === 0 ? (
              <div className="p-12 text-center">
                <MessageSquareHeart className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-white">No se encontraron opiniones</h3>
                <p className="text-xs text-slate-400 mt-1">Prueba cambiando los filtros de búsqueda o estrellas.</p>
              </div>
            ) : (
              filteredFeedbacks.map((fb) => {
                const isNegative = fb.rating <= 3;
                return (
                  <div
                    key={fb.id}
                    className="p-5 hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-semibold text-white text-sm">
                          {fb.customerName}
                        </span>

                        <div
                          className={cn(
                            "flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold",
                            fb.rating >= 4
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                              : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                          )}
                        >
                          <span>{fb.rating}.0</span>
                          <Star className="w-3 h-3 fill-current" />
                        </div>

                        <span className="text-xs text-slate-500">
                          vía {fb.channel}
                        </span>

                        {isNegative && (
                          <span
                            className={cn(
                              "text-[10px] px-2 py-0.5 rounded-full font-bold border",
                              fb.recoveryStatus === "resolved"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            )}
                          >
                            {fb.recoveryStatus === "resolved"
                              ? "Recuperación Resuelta ✓"
                              : "Atención Requerida"}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{fb.comment}"
                      </p>

                      {fb.negativeReasons && fb.negativeReasons.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          {fb.negativeReasons.map((reason) => (
                            <span
                              key={reason}
                              className="text-[10px] bg-slate-800 text-rose-300 px-2 py-0.5 rounded border border-rose-900/40"
                            >
                              {reason}
                            </span>
                          ))}
                        </div>
                      )}

                      {fb.positiveHighlights && fb.positiveHighlights.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          {fb.positiveHighlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="text-[10px] bg-slate-800 text-emerald-300 px-2 py-0.5 rounded border border-emerald-900/40"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center md:flex-col md:items-end justify-between gap-3 shrink-0">
                      <span className="text-[11px] text-slate-500 font-mono">
                        {formatDate(fb.createdAt)}
                      </span>

                      <Link
                        href={`/feedback/${fb.id}`}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 rounded-xl transition-colors flex items-center gap-1"
                      >
                        <span>Detalle & Acción</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
