"use client";

import { useState } from "react";
import { Img } from "@/components/lp/Img";
import { Luz } from "@/components/lp/Luz";
import type { SerraGaleria } from "../tipos";
import { CabP, SecaoS } from "./base";

const dois = (n: number) => String(n).padStart(2, "0");

// Perspectivas: as fotos em faixas com a borda de baixo ondulada, como camadas de rocha.
// A foto com o mouse (ou foco) alarga dentro da faixa; o clique abre em tela cheia.
export function Galeria({ s }: { s: SerraGaleria }) {
  const [luz, setLuz] = useState<number | null>(null);
  return (
    <SecaoS id="perspectivas" className="pp-sec sr-galeria">
      <div className="casca">
        <CabP sobretitulo={s.sobretitulo} titulo={s.titulo} />
        <div className="sr-faixas">
          {s.faixas.map((f) => (
            <div key={f.join("-")} className="sr-faixa rv">
              {f.map((k) => (
                <button key={k} type="button" onClick={() => setLuz(k)} aria-label={s.itens[k].nome}>
                  <figure>
                    <Img imagem={s.itens[k].imagem} sizes="(min-width: 960px) 50vw, 100vw" />
                  </figure>
                  <span className="sr-faixa-cap">
                    <small>{dois(k + 1)}</small>
                    {s.itens[k].nome}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Luz itens={s.itens} indice={luz} onMudar={setLuz} />
    </SecaoS>
  );
}
