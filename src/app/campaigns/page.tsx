"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { store } from "@/lib/store";
import { Campaign, Business } from "@/lib/types";
import {
  QrCode,
  Plus,
  Mail,
  MessageSquare,
  Copy,
  ExternalLink,
  Printer,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [business, setBusiness] = useState<Business>(store.getBusiness());
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    const update = () => {
      setCampaigns(store.getCampaigns());
      setBusiness(store.getBusiness());
    };
    update();
    return store.subscribe(update);
  }, []);

  const publicFeedbackUrl = typeof window !== "undefined"
    ? `${window.location.origin}/r/demo-token`
    : "https://reviewflow.cl/r/demo-token";

  const copyUrl = () => {
    navigator.clipboard.writeText(publicFeedbackUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  return (
    <DashboardShell
      title="Campañas y Códigos QR de Captura"
      subtitle="Genera puntos de contacto físicos y digitales para invitar a tus clientes a calificar"
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white">Canales de Captura Activos</h2>
            <p className="text-xs text-slate-400">QR en sala, boletas y automatizaciones de seguimiento</p>
          </div>

          <Link
            href="/campaigns/new"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-950/40 flex items-center justify-center gap-1.5 self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Nueva Campaña</span>
          </Link>
        </div>

        {/* Highlight: In-Store QR Stand Showcase (PRD Section 50) */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900/90 to-slate-950 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>QR Dinámico Oficial del Local (Listo para Imprimir)</span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              Atril de Mesa o Adhesivo para Mostrador
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              Imprime este QR para colocarlo en mesas, barras o recepción. Al escanearlo con la cámara de su celular, el cliente ingresa directo a la encuesta, se filtra su experiencia hacia Google Reviews y recibe un cupón digital instantáneo.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={copyUrl}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>{copiedUrl ? "¡Enlace Copiado!" : "Copiar Enlace Directo"}</span>
              </button>

              <Link
                href="/r/demo-token"
                target="_blank"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <span>Probar como Cliente</span>
              </Link>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-xs font-bold text-emerald-300 border border-emerald-500/40 transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Atril</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 bg-white rounded-2xl shadow-2xl border-4 border-slate-800 text-center">
            <QRCodeSVG
              value={publicFeedbackUrl}
              size={150}
              level="H"
              includeMargin={true}
            />
            <p className="text-[11px] font-bold text-slate-900 mt-2 uppercase tracking-wide">
              {business.name}
            </p>
            <p className="text-[9px] text-slate-600">
              Escanea con tu cámara • Califica y gana
            </p>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-emerald-400">
                    {camp.channel === "qr_table" ? (
                      <QrCode className="w-5 h-5" />
                    ) : camp.channel === "post_service_email" ? (
                      <Mail className="w-5 h-5" />
                    ) : (
                      <MessageSquare className="w-5 h-5" />
                    )}
                  </div>

                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      camp.status === "active"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {camp.status === "active" ? "Activa" : "Pausada"}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-white">{camp.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Premio al cliente: <strong className="text-emerald-400">{camp.rewardCouponTitle}</strong>
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="font-bold text-white block">{camp.sentCount}</span>
                  <span className="text-[10px] text-slate-500 uppercase">Impactos</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-400 block">{camp.responseRate}%</span>
                  <span className="text-[10px] text-slate-500 uppercase">Respuesta</span>
                </div>
                <div>
                  <span className="font-bold text-amber-400 block">{camp.averageRating}★</span>
                  <span className="text-[10px] text-slate-500 uppercase">Rating</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
