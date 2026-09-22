"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, AlertCircle, ChevronRight } from "lucide-react";
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
    <div className="glass-panel p-6 rounded-3xl border border-slate-200">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-black text-slate-900">Feedback Reciente en Tiempo Real</h3>
          <p className="text-xs text-slate-700 font-semibold">
            Opiniones capturadas por QR en mesa, boleta y correo post-visita
          </p>
        </div>
        <Link
          href="/feedback"
          className="text-xs font-extrabold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 transition-colors"
        >
          <span>Ver todas</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {feedbacks.map((item) => {
          const isNegative = item.rating <= 3;

          return (
            <div
              key={item.id}
              className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-extrabold text-slate-900 text-sm">
                    {item.customerName}
                  </span>

                  {/* Rating Badge */}
                  <div
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-black border",
                      item.rating >= 4
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : "bg-rose-50 text-rose-800 border-rose-300"
                    )}
                  >
                    <span>{item.rating}.0</span>
                    <Star className="w-3 h-3 fill-current" />
                  </div>

                  <span className="text-[11px] text-slate-600 font-bold">
                    • {item.channel}
                  </span>

                  {isNegative && (
                    <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-extrabold">
                      <AlertCircle className="w-3 h-3 text-amber-700" />
                      Requiere Recuperación
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-800 line-clamp-2 leading-relaxed italic font-medium">
                  "{item.comment}"
                </p>

                {item.negativeReasons && item.negativeReasons.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {item.negativeReasons.map((reason) => (
                      <span
                        key={reason}
                        className="text-[10px] bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-300 font-bold"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                <span className="text-[11px] text-slate-600 font-mono font-semibold">
                  {formatDate(item.createdAt)}
                </span>
                <Link
                  href={`/feedback/${item.id}`}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors shadow-2xs"
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
