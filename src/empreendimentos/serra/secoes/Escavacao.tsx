"use client";

import { useRef, useState } from "react";
import { useAoRolar } from "@/hooks/useAoRolar";
import { useMovimentoReduzido } from "@/hooks/useMovimentoReduzido";
import { useReveal } from "@/hooks/useReveal";
import { CORTE_Y, fioCorte, ondaCorte } from "../desenhos";
import type { SerraEscavacao } from "../tipos";
import { CabP } from "./base";

const dois = (n: number) => String(n).padStart(2, "0");

// Obra: a rua em corte, com o subsolo em camadas de rocha. A tela para (sticky) e a rolagem
// desce do poste até a drenagem: cada etapa acende no desenho e aparece ao lado, com a linha
// de profundidade acompanhando. Sem movimento, a seção fica curta e mostra todas acesas.
export function Escavacao({ s }: { s: SerraEscavacao }) {
  const sec = useRef<HTMLElement>(null);
  const barra = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const total = s.etapas.length;
  useReveal(sec, useMovimentoReduzido());

  useAoRolar(() => {
    const el = sec.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    const curso = b.height - window.innerHeight;
    const pr = curso > 0 ? Math.min(1, Math.max(0, -b.top / curso)) : 0;
    if (barra.current) barra.current.style.width = `${(pr * 100).toFixed(1)}%`;
    setI(Math.min(total - 1, Math.floor(pr * total)));
  });

  const lugar = (k: number) => s.lugares[k < 2 ? 0 : k < 4 ? 1 : 2];
  const on = (k: number) => (k === i ? "on" : "");
  const rot = (k: number, x: number, y: number, ancora: "start" | "end" = "start") => (
    <text className="sr-lbl" x={x} y={y} textAnchor={ancora}>
      {s.etapas[k].titulo}
    </text>
  );

  return (
    <section ref={sec} className="sr-escava">
      <div className="sr-escava-fixo">
        <div className="casca sr-escava-in">
          <div>
            <CabP sobretitulo={s.sobretitulo} titulo={s.titulo} />
            <p className="pp-txt sr-escava-sub">{s.texto}</p>
            <div className="sr-escava-atual" aria-live="polite">
              <small>
                {dois(i + 1)} / {dois(total)}
              </small>
              <b>{s.etapas[i].titulo}</b>
              <span>{lugar(i)}</span>
            </div>
            <div className="sr-escava-barra">
              <i ref={barra} />
            </div>
          </div>
          <svg className="sr-corte" viewBox="0 0 600 660" role="img" aria-label={s.aria}>
            <path d={ondaCorte(300, 0)} fill="#2e4d5a" />
            <path d={ondaCorte(392, 10)} fill="#284450" />
            <path d={ondaCorte(486, 12)} fill="#213b46" />
            <path d={ondaCorte(590, 10)} fill="#1b323c" />
            {[342, 430, 520, 618].map((y) => (
              <path key={y} d={fioCorte(y)} fill="none" stroke="#f18d5a" strokeWidth="1" opacity=".45" />
            ))}
            <rect x="0" y="282" width="100" height="18" fill="#3f6372" />
            <g className={on(0)}>
              <path d="M112 300 V70 H168" fill="none" stroke="#f7e6d4" strokeWidth="4" />
              <ellipse cx="176" cy="74" rx="16" ry="6" fill="#f18d5a" />
              <path d="M176 82 L120 292 L238 292Z" fill="rgba(241,141,90,.14)" />
              {rot(0, 200, 60)}
            </g>
            <g className={on(1)}>
              <path d="M30 126 Q 300 160 590 118" fill="none" stroke="#86b5ca" strokeWidth="2.5" />
              <path d="M40 122 L40 300" stroke="#f7e6d4" strokeWidth="3" />
              {rot(1, 330, 172)}
            </g>
            <g className={on(2)}>
              <rect x="150" y="282" width="450" height="18" fill="#4f5f66" />
              <path d="M200 291 H600" stroke="#f7e6d4" strokeWidth="2" strokeDasharray="22 18" />
              {rot(2, 380, 270)}
            </g>
            <g className={on(3)}>
              <path d="M100 270 H130 L150 296 V300 H100Z" fill="#cfd8db" />
              {rot(3, 10, 250)}
            </g>
            <g className={on(4)}>
              <circle cx="230" cy="372" r="14" fill="none" stroke="#86b5ca" strokeWidth="5" />
              {rot(4, 256, 377)}
            </g>
            <g className={on(5)}>
              <circle cx="360" cy="452" r="22" fill="none" stroke="#d9a283" strokeWidth="6" />
              {rot(5, 394, 457)}
            </g>
            <g className={on(6)}>
              <circle cx="470" cy="560" r="34" fill="none" stroke="#f18d5a" strokeWidth="7" />
              {rot(6, 424, 565, "end")}
            </g>
            <g className="sr-prof" style={{ transform: `translateY(${CORTE_Y[i]}px)` }}>
              <line x1="0" x2="600" y1="0" y2="0" stroke="#f18d5a" strokeWidth="1.5" strokeDasharray="5 7" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
