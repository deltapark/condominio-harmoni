"use client";

import { useEffect, useRef } from "react";
import { useMovimentoReduzido } from "@/hooks/useMovimentoReduzido";
import { useReveal } from "@/hooks/useReveal";
import type { PampasPlacas } from "../tipos";
import { CabP } from "./base";

// Localização: os destinos como placas de estrada num poste. O céu começa na cor de
// fundo da seção de cima (lida no navegador), então a emenda some com qualquer ordem
// de seções no dados.ts.
export function Placas({ s }: { s: PampasPlacas }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, useMovimentoReduzido());

  useEffect(() => {
    const el = ref.current;
    const acima = el?.previousElementSibling as HTMLElement | null;
    if (!el || !acima) return;
    const cs = getComputedStyle(acima);
    const transparente = cs.backgroundColor === "rgba(0, 0, 0, 0)" || cs.backgroundColor === "transparent";
    // Fundo de foto termina escuro; sem fundo próprio, vale o fundo da página.
    const cor = !transparente ? cs.backgroundColor : cs.backgroundImage !== "none" ? "rgb(19, 37, 48)" : getComputedStyle(el.parentElement ?? el).backgroundColor;
    el.style.setProperty("--topo", cor);
  }, []);

  return (
    <section ref={ref} id="localizacao" className="pp-sec pp-placas">
      <div className="casca pp-placas-in">
        <div>
          <CabP sobretitulo={s.sobretitulo} titulo={s.titulo} centro={s.centro} />
          <p className="pp-txt rv">{s.texto}</p>
          <p className="pp-txt rv">{s.endereco}</p>
          <a className="bt bt-acento rv" href={`#${s.cta.alvo}`}>
            {s.cta.rotulo}
          </a>
        </div>
        <div className="pp-poste">
          <ul className="pp-placas-lista">
            <li className="pp-placa aqui rv">
              <span className="pp-seta" aria-hidden="true">
                ⌂
              </span>
              <span>
                <small>{s.aqui.rotulo}</small>
                <b>{s.aqui.nome}</b>
              </span>
            </li>
            {s.placas.map((p) => (
              <li key={p.nome} className={`pp-placa ${p.lado} rv`}>
                <span className="pp-seta" aria-hidden="true">
                  {p.seta}
                </span>
                <span>
                  <small>{p.tipo}</small>
                  <b>{p.nome}</b>
                </span>
                <span className="pp-tempo">{p.tempo}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
