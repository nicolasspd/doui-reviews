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
    : "https://doui-reviews.vercel.app/r/demo-token";

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
            <h2 className="text-base font-bold text-slate-900">Canales de Captura Activos</h2>
            <p className="text-xs text-slate-500 font-medium">QR en sala, boletas y automatizaciones de seguimiento</p>
          </div>

          <Link
            href="/campaigns/new"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Nueva Campaña</span>
          </Link>
        </div>

        {/* Highlight: In-Store QR Stand Showcase */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-white grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-xs">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>QR Dinámico Oficial del Local (Listo para Imprimir)</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Atril de Mesa o Adhesivo para Mostrador
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              Imprime este QR para colocarlo en mesas, barras o recepción. Al escanearlo con la cámara de su celular, el cliente ingresa directo a la encuesta con el logo de tu empresa, se filtra su experiencia hacia Google Reviews y recibe un cupón digital instantáneo.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={copyUrl}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 border border-slate-200 transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-600" />
                <span>{copiedUrl ? "¡Enlace Copiado!" : "Copiar Enlace Directo"}</span>
              </button>

              <Link
                href="/r/demo-token"
                target="_blank"
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 border border-slate-200 transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                <span>Probar como Cliente</span>
              </Link>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Atril</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 bg-white rounded-2xl shadow-lg border-2 border-slate-200 text-center">
            <QRCodeSVG
              value={publicFeedbackUrl}
              size={150}
              level="H"
              includeMargin={true}
            />
            <p className="text-xs font-bold text-slate-900 mt-2 uppercase tracking-wide">
              {business.name}
            </p>
            <p className="text-[10px] text-slate-500 font-medium">
              Escanea con tu cámara • Califica y gana
            </p>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="glass-panel p-6 rounded-3xl space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-emerald-600">
                    {camp.channel === "qr_table" ? (
                      <QrCode className="w-5 h-5" />
                    ) : camp.channel === "post_service_email" ? (
                      <Mail className="w-5 h-5" />
                    ) : (
                      <MessageSquare className="w-5 h-5" />
                    )}
                  </div>

                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold uppercase border ${
                      camp.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}
                  >
                    {camp.status === "active" ? "Activa" : "Pausada"}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900">{camp.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Premio al cliente: <strong className="text-emerald-700">{camp.rewardCouponTitle}</strong>
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{camp.sentCount}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Impactos</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-700 block">{camp.responseRate}%</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Respuesta</span>
                </div>
                <div>
                  <span className="font-bold text-amber-600 block">{camp.averageRating}★</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Rating</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
