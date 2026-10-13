"use client";

import { useRef, useState } from "react";
import { Luz } from "@/components/lp/Luz";
import { textosGerais, textosInteracao } from "@/empreendimentos/comum";
import type { PampasLupa } from "../tipos";
import { CabP, SecaoP } from "./base";

const ZOOM = 2.6;

// Implantação: números grandes e a planta com lupa no mouse. No toque não há lupa;
// tocar na planta abre em tela cheia.
export function Lupa({ s }: { s: PampasLupa }) {
  const caixa = useRef<HTMLDivElement>(null);
  const lente = useRef<HTMLSpanElement>(null);
  const [mira, setMira] = useState(false);
  const [luz, setLuz] = useState<number | null>(null);
  const fino = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const itemLuz = [{ nome: s.titulo.destaque, texto: s.sobretitulo, imagem: s.planta }];

  return (
    <SecaoP id="implantacao" className="pp-sec fundo-creme pp-lupa">
      <div className="casca">
        <CabP sobretitulo={s.sobretitulo} titulo={s.titulo} centro={s.centro} />
        <dl className="pp-numeros rv">
          {s.numeros.map((x) => (
            <div key={x.rotulo}>
              <dt>{x.rotulo}</dt>
              <dd>{x.valor}</dd>
            </div>
          ))}
        </dl>
        <div
          ref={caixa}
          className={`pp-planta ${mira ? "mira" : ""}`}
          onPointerMove={(e) => {
            const el = caixa.current;
            const l = lente.current;
            if (!el || !l || !fino()) return setMira(false);
            const r = el.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            const meio = l.clientWidth / 2;
            l.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
            l.style.backgroundSize = `${(r.width * ZOOM).toFixed(0)}px ${(r.height * ZOOM).toFixed(0)}px`;
            l.style.backgroundPosition = `${(meio - x * ZOOM).toFixed(1)}px ${(meio - y * ZOOM).toFixed(1)}px`;
            setMira(true);
          }}
          onPointerLeave={() => setMira(false)}
          onClick={() => !fino() && setLuz(0)}
        >
          {s.planta.provisoria && <span className="selo">{textosGerais.imagemProvisoria}</span>}
          <img src={s.planta.src} width={s.planta.largura} height={s.planta.altura} alt={s.planta.alt} draggable={false} loading="lazy" decoding="async" />
          <span ref={lente} className="pp-lente" aria-hidden="true" style={{ backgroundImage: `url("${s.planta.src}")` }} />
        </div>
        <p className="pp-dica">{textosInteracao.dicaLupa}</p>
      </div>
      <Luz itens={itemLuz} indice={luz} onMudar={setLuz} />
    </SecaoP>
  );
}
