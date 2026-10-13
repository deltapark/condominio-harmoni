"use client";

import { useState } from "react";
import { Img } from "@/components/lp/Img";
import { Luz } from "@/components/lp/Luz";
import { textosGerais } from "@/empreendimentos/comum";
import type { PampasCarrossel } from "../tipos";
import { CabP, SecaoP } from "./base";

// Perspectivas: a foto do centro em destaque e as vizinhas giradas em 3D.
// Clicar numa vizinha traz ela ao centro; clicar na do centro abre em tela cheia.
export function Carrossel({ s }: { s: PampasCarrossel }) {
  const [i, setI] = useState(0);
  const [luz, setLuz] = useState<number | null>(null);
  const n = s.itens.length;
  const vai = (passo: number) => setI((x) => (x + passo + n) % n);

  return (
    <SecaoP id="perspectivas" className="pp-sec fundo-noite pp-carrossel">
      <div className="casca">
        <CabP sobretitulo={s.sobretitulo} titulo={s.titulo} centro={s.centro} />
        <div className="pp-3d">
          {s.itens.map((x, k) => {
            let o = k - i;
            if (o > n / 2) o -= n;
            if (o < -n / 2) o += n;
            const a = Math.abs(o);
            return (
              <button
                key={x.imagem.src}
                type="button"
                className="pp-3d-it"
                aria-label={x.nome}
                tabIndex={a > 1 ? -1 : 0}
                style={{
                  transform: `translateX(${o * 58}%) translateZ(${-a * 160}px) rotateY(${-o * 28}deg)`,
                  zIndex: 10 - a,
                  opacity: a > 2 ? 0 : 1,
                  filter: a ? "brightness(.55)" : "none",
                  pointerEvents: a > 2 ? "none" : "auto",
                }}
                onClick={() => (k === i ? setLuz(i) : setI(k))}
              >
                <figure>
                  <Img imagem={x.imagem} sizes="(min-width: 960px) 60vw, 80vw" />
                </figure>
              </button>
            );
          })}
        </div>
        <div className="pp-3d-base">
          <div aria-live="polite">
            <b>{s.itens[i].nome}</b>
            <span>{s.itens[i].texto}</span>
          </div>
          <div className="setas-r">
            <button type="button" className="seta-r" onClick={() => vai(-1)} aria-label={textosGerais.anterior}>
              ←
            </button>
            <button type="button" className="seta-r" onClick={() => vai(1)} aria-label={textosGerais.proxima}>
              →
            </button>
          </div>
        </div>
      </div>
      <Luz itens={s.itens} indice={luz} onMudar={setLuz} />
    </SecaoP>
  );
}
