import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🧠 Cambiamos título, descripción e íconos
export const metadata: Metadata = {
  title: {
    default: "MTWorld QBANK", // ← este es el nombre principal que aparece en la pestaña
    template: "%s | MTWorld QBANK", // ← las páginas hijas agregan su nombre antes
  },
  description: "Banco interactivo de preguntas médicas por materia.",
  icons: {
    icon: "/favicon.ico", // ← tu ícono principal (ver abajo)
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
