"use client";

import { useRef, type ReactNode } from "react";
import { TRACADO } from "@/components/lp/desenhosHarmoni";
import type { Destaque } from "@/empreendimentos/tipos";
import { useMovimentoReduzido } from "@/hooks/useMovimentoReduzido";
import { useReveal } from "@/hooks/useReveal";

/** Seção que marca com .ok os elementos .rv quando entram na tela (entrada suave e traço desenhando). */
export function SecaoP({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, useMovimentoReduzido());
  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}

/** Destaque em itálico laranja (a ênfase dos títulos do Pampas). */
export function Enfase({ t }: { t: Destaque }) {
  return (
    <>
      {t.antes}
      <em>{t.destaque}</em>
      {t.depois}
    </>
  );
}

/** Sobretítulo + título de seção; `centro` centraliza os dois. */
export function CabP({ sobretitulo, titulo, centro }: { sobretitulo: string; titulo: Destaque; centro?: boolean }) {
  return (
    <div className={`pp-cab ${centro ? "pp-centro" : ""}`}>
      <p className="pp-sobre rv">{sobretitulo}</p>
      <h2 className="pp-h2 rv rv2">
        <Enfase t={titulo} />
      </h2>
    </div>
  );
}

/**
 * Traço da casa Harmoni sem preenchimento. `anima`: desenha ao carregar (hero);
 * `aoVer`: desenha quando entra na tela (precisa estar dentro de uma SecaoP).
 */
export function Tracado({ className, anima, aoVer }: { className?: string; anima?: boolean; aoVer?: boolean }) {
  return (
    <svg className={`pp-tracado ${anima ? "anima" : ""} ${aoVer ? "rv" : ""} ${className ?? ""}`} viewBox="0 0 1350 783" aria-hidden="true">
      {TRACADO.map((d) => (
        <path key={d.slice(0, 16)} d={d} pathLength={1} />
      ))}
    </svg>
  );
}
