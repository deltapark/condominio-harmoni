"use client";

import { useState } from "react";
import { serraMirantes } from "../desenhos";
import type { SerraMirantes } from "../tipos";
import { SecaoS } from "./base";

const M = serraMirantes();
const dois = (n: number) => String(n).padStart(2, "0");
// Primeira frase do parágrafo em destaque; o resto vai menor embaixo (texto do manual, sem mudar).
const parte = (t: string) => {
  const f = t.split(/(?<=\.)\s/)[0];
  return [f, t.slice(f.length).trim()];
};

// Conceito: a linha da serra com três cumes no laranja do manual. Escolher um cume (aba,
// clique, toque ou foco) leva o sol até ele, liga o cume ao céu e troca o trecho do texto.
export function Mirantes({ s }: { s: SerraMirantes }) {
  const [i, setI] = useState(s.inicial);
  const [x, y] = M.picos[i];
  const [frase, resto] = parte(s.mirantes[i].texto);

  return (
    <SecaoS className="sr-mir" fio={false}>
      <div className="casca">
        <p className="pp-sobre rv">{s.sobretitulo}</p>
        <div className="sr-mir-abas" role="tablist" aria-label={s.sobretitulo}>
          {s.mirantes.map((m, k) => (
            <button key={m.rotulo} type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>
              <small>{dois(k + 1)}</small>
              {m.rotulo}
            </button>
          ))}
        </div>
        <div className="sr-mir-txt" role="tabpanel" aria-live="polite" key={i}>
          <p className="sr-mir-frase">{frase}</p>
          {resto && <p className="sr-mir-resto">{resto}</p>}
        </div>
      </div>
      <svg className="sr-mir-svg" viewBox="0 10 1600 550" preserveAspectRatio="xMidYMax slice" role="img" aria-label={s.mirantes.map((m) => m.rotulo).join(", ")}>
        <defs>
          <radialGradient id="sr-mir-brilho">
            <stop offset="0" stopColor="#fbf5ec" stopOpacity=".8" />
            <stop offset="1" stopColor="#fbf5ec" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="sr-mir-sol" style={{ transform: `translateX(${x}px)` }}>
          <circle cx="0" cy="172" r="150" fill="url(#sr-mir-brilho)" />
          <circle cx="0" cy="172" r="46" fill="#f7e6d4" />
        </g>
        <path d={M.tras} fill="#3f6372" />
        <path d={M.meio} fill="#2e4d5a" />
        <path d={M.frente} fill="#233d48" />
        <line className="sr-mir-fio" x1={x} y1="130" x2={x} y2={y - 16} />
        {M.picos.map(([px, py], k) => (
          <g key={px} className={`sr-mir-pin ${k === i ? "on" : ""}`} onClick={() => setI(k)} onMouseEnter={() => setI(k)} aria-hidden="true">
            <circle cx={px} cy={py} r="40" className="halo" />
            <circle cx={px} cy={py} r="10" className="no" />
            <text x={px} y={py + 50} textAnchor="middle">
              {dois(k + 1)}
            </text>
          </g>
        ))}
      </svg>
    </SecaoS>
  );
}
