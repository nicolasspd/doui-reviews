import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReviewFlow by doui • Reputación y Fidelización para Negocios Locales",
  description:
    "Transforma cada atención en reseñas de 5 estrellas en Google y recompras inmediatas con cupones QR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} min-h-screen bg-[#080c14] text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
