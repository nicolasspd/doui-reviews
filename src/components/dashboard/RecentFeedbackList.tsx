"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, AlertCircle, CheckCircle2, ChevronRight, MessageSquareQuote } from "lucide-react";
import { store } from "@/lib/store";
import { Feedback } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";

export function RecentFeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const update = () => {
      setFeedbacks(store.getFeedbacks().slice(0, 5));
    };
    update();
    return store.subscribe(update);
  }, []);

  return (
    <div className="glass-panel p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white">Feedback Reciente en Tiempo Real</h3>
          <p className="text-xs text-slate-400">
            Opiniones capturadas por QR en mesa, boleta y correo post-visita
          </p>
        </div>
        <Link
          href="/feedback"
          className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
        >
          <span>Ver todas</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-slate-800/80">
        {feedbacks.map((item) => {
          const isNegative = item.rating <= 3;

          return (
            <div
              key={item.id}
              className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-medium text-white text-sm">
                    {item.customerName}
                  </span>

                  {/* Rating Badge */}
                  <div
                    className={cn(
                      "flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold",
                      item.rating >= 4
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25"
                        : "bg-rose-500/15 text-rose-300 border border-rose-500/25"
                    )}
                  >
                    <span>{item.rating}.0</span>
                    <Star className="w-3 h-3 fill-current" />
                  </div>

                  <span className="text-[11px] text-slate-500">
                    • {item.channel}
                  </span>

                  {isNegative && (
                    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      Requiere Recuperación
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed italic">
                  "{item.comment}"
                </p>

                {item.negativeReasons && item.negativeReasons.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {item.negativeReasons.map((reason) => (
                      <span
                        key={reason}
                        className="text-[10px] bg-slate-800 text-rose-300 px-2 py-0.5 rounded border border-rose-900/40"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                <span className="text-[11px] text-slate-500 font-mono">
                  {formatDate(item.createdAt)}
                </span>
                <Link
                  href={`/feedback/${item.id}`}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
                >
                  Gestionar
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
