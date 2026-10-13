import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import { metadados } from "@/dados/vitrine";
import "./globals.css";

// Fonte única do site (vitrine e LPs). O wordmark do logo é uma sans geométrica
// leve e o Jost segue o mesmo desenho; o 200 é só para os títulos grandes da vitrine.
const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  // Itálico de verdade para a ênfase dos títulos do Pampas (sem ele o navegador inclina a normal).
  style: ["normal", "italic"],
  variable: "--fonte-jost",
  display: "swap",
});

export const metadata: Metadata = {
  // Base das URLs absolutas (Open Graph, canonical) no domínio de produção.
  metadataBase: new URL("https://condominioharmoni.com.br"),
  title: metadados.titulo,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={jost.variable}>{children}</body>
    </html>
  );
}
