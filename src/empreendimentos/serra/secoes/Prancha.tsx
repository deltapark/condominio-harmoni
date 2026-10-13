"use client";

import { useState } from "react";
import { Luz } from "@/components/lp/Luz";
import { textosGerais } from "@/empreendimentos/comum";
import { curvas } from "../desenhos";
import type { SerraPrancha } from "../tipos";
import { CabP, SecaoS } from "./base";

const RELEVO = curvas(1240, 260, 16, 42, 1.4).aneis;

// Implantação: a planta apresentada como prancha de projeto (moldura, norte, carimbo e
// legenda numerada) sobre curvas de nível em marca d'água, o relevo da serra como fundo.
// Clicar na planta abre em tela cheia.
export function Prancha({ s }: { s: SerraPrancha }) {
  const [luz, setLuz] = useState<number | null>(null);
  const itemLuz = [{ nome: s.titulo.destaque, texto: s.sobretitulo, imagem: s.planta }];
  return (
    <SecaoS id="implantacao" className="pp-sec fundo-creme sr-prancha">
      <svg className="sr-relevo" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {RELEVO.map((d, k) => (
          <path key={k} d={d} />
        ))}
      </svg>
      <div className="casca">
        <CabP sobretitulo={s.sobretitulo} titulo={s.titulo} />
        <div className="sr-folha rv">
          <div className="sr-folha-in">
            <button type="button" className="sr-desenho" onClick={() => setLuz(0)} aria-label={s.planta.alt}>
              <img src={s.planta.src} width={s.planta.largura} height={s.planta.altura} alt={s.planta.alt} loading="lazy" decoding="async" />
              <svg className="sr-norte" viewBox="0 0 40 56" aria-hidden="true">
                <path d="M20 4 L30 40 L20 33 L10 40 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M20 4 L20 33 L10 40 Z" fill="currentColor" />
                <text x="20" y="54" textAnchor="middle" fontSize="11" fill="currentColor">
                  N
                </text>
              </svg>
              {s.planta.provisoria && <span className="selo">{textosGerais.imagemProvisoria}</span>}
            </button>
            <aside>
              <dl className="sr-carimbo">
                {s.carimbo.map((c) => (
                  <div key={c.rotulo}>
                    <dt>{c.rotulo}</dt>
                    <dd>{c.valor}</dd>
                  </div>
                ))}
              </dl>
              <ol>
                {s.legenda.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ol>
              <div className="sr-folha-cta">
                <a className="bt bt-acento" href={`#${s.cta.alvo}`}>
                  {s.cta.rotulo}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <Luz itens={itemLuz} indice={luz} onMudar={setLuz} />
    </SecaoS>
  );
}
