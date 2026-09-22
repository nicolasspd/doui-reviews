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
  AlertTriangle,
  ChevronRight,
  MessageSquareHeart,
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
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar por cliente, comentario o sucursal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-600"
              />
            </div>

            <button
              onClick={() => setRecoveryOnly(!recoveryOnly)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 shrink-0",
                recoveryOnly
                  ? "bg-amber-100 text-amber-900 border-amber-300 font-bold"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              )}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
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
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0",
                  filterRating === val
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                )}
              >
                {val === "all" ? "Todas" : `${val}★`}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback List Table */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200">
          <div className="divide-y divide-slate-100">
            {filteredFeedbacks.length === 0 ? (
              <div className="p-12 text-center">
                <MessageSquareHeart className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-900">No se encontraron opiniones</h3>
                <p className="text-xs text-slate-500 mt-1">Prueba cambiando los filtros de búsqueda o estrellas.</p>
              </div>
            ) : (
              filteredFeedbacks.map((fb) => {
                const isNegative = fb.rating <= 3;
                return (
                  <div
                    key={fb.id}
                    className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm">
                          {fb.customerName}
                        </span>

                        <div
                          className={cn(
                            "flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold",
                            fb.rating >= 4
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          )}
                        >
                          <span>{fb.rating}.0</span>
                          <Star className="w-3 h-3 fill-current" />
                        </div>

                        <span className="text-xs text-slate-500 font-medium">
                          vía {fb.channel}
                        </span>

                        {isNegative && (
                          <span
                            className={cn(
                              "text-[10px] px-2.5 py-0.5 rounded-full font-bold border",
                              fb.recoveryStatus === "resolved"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-100 text-amber-800 border-amber-300"
                            )}
                          >
                            {fb.recoveryStatus === "resolved"
                              ? "Recuperación Resuelta ✓"
                              : "Atención Requerida"}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed italic">
                        "{fb.comment}"
                      </p>

                      {fb.negativeReasons && fb.negativeReasons.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          {fb.negativeReasons.map((reason) => (
                            <span
                              key={reason}
                              className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200 font-medium"
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
                              className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-medium"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center md:flex-col md:items-end justify-between gap-3 shrink-0">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {formatDate(fb.createdAt)}
                      </span>

                      <Link
                        href={`/feedback/${fb.id}`}
                        className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 border border-slate-200 rounded-xl transition-colors shadow-2xs flex items-center gap-1"
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
