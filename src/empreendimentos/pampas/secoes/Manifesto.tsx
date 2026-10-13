"use client";

import { useRef } from "react";
import { useAoRolar } from "@/hooks/useAoRolar";
import type { PampasManifesto } from "../tipos";
import { SecaoP, Tracado } from "./base";

// Conceito: o parágrafo do manual em letras grandes, apagado; as palavras acendem
// conforme a frase atravessa a tela. Com movimento reduzido, o CSS mostra tudo aceso.
export function Manifesto({ s }: { s: PampasManifesto }) {
  const frase = useRef<HTMLParagraphElement>(null);
  const palavras = s.frase.split(" ");

  useAoRolar(() => {
    const el = frase.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const h = window.innerHeight;
    const prog = Math.min(1, Math.max(0, (h - r.top - h * 0.25) / (r.height + h * 0.35)));
    const ws = el.querySelectorAll<HTMLElement>(".pp-p");
    const n = Math.round(prog * ws.length);
    ws.forEach((w, i) => w.classList.toggle("on", i < n));
  });

  return (
    <SecaoP className="pp-sec pp-manifesto">
      <Tracado aoVer className="pp-manifesto-tr" />
      <div className="casca">
        <p className="pp-sobre rv">{s.sobretitulo}</p>
        <p ref={frase} className="pp-frase">
          {palavras.map((p, i) => (
            <span key={i}>
              <span className={`pp-p ${s.destaques.includes(p) ? "cor" : ""}`}>{p}</span>{" "}
              {i === s.depoisDe && (
                <span className="pp-frase-circ">
                  <img src={s.circulo.src} width={s.circulo.largura} height={s.circulo.altura} alt={s.circulo.alt} loading="lazy" decoding="async" />
                </span>
              )}
            </span>
          ))}
        </p>
        <div className="pp-manifesto-pe">
          {s.paragrafos.map((t) => (
            <p key={t.slice(0, 20)} className="rv">
              {t}
            </p>
          ))}
          <p className="pp-slogan rv">{s.slogan}</p>
        </div>
      </div>
    </SecaoP>
  );
}
