"use client";

import { useRef, useState, type PointerEvent } from "react";
import type { PampasAntesDepois } from "../tipos";
import { CabP, SecaoP } from "./base";

// Obra: duas fotos reais sobrepostas. Arrastar (ou as setas do teclado) move o corte
// entre "em obra" e "entregue".
export function AntesDepois({ s }: { s: PampasAntesDepois }) {
  const caixa = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(50);
  const [arrastando, setArrastando] = useState(false);

  const mover = (e: PointerEvent<HTMLDivElement>) => {
    const r = caixa.current?.getBoundingClientRect();
    if (r) setX(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
  };

  return (
    <SecaoP className="pp-sec fundo-escuro pp-antes">
      <div className="casca pp-antes-in">
        <div>
          <CabP sobretitulo={s.sobretitulo} titulo={s.titulo} centro={s.centro} />
          <p className="pp-txt rv">{s.texto}</p>
          <p className="pp-dica rv">{s.nota}</p>
        </div>
        <div
          ref={caixa}
          className="pp-ad"
          style={{ ["--x" as string]: `${x}%` }}
          role="slider"
          tabIndex={0}
          aria-label={`${s.antes.rotulo} / ${s.depois.rotulo}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(x)}
          onPointerDown={(e) => {
            setArrastando(true);
            e.currentTarget.setPointerCapture(e.pointerId);
            mover(e);
          }}
          onPointerMove={(e) => arrastando && mover(e)}
          onPointerUp={() => setArrastando(false)}
          onPointerCancel={() => setArrastando(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setX((v) => Math.max(0, v - 5));
            if (e.key === "ArrowRight") setX((v) => Math.min(100, v + 5));
          }}
        >
          <img className="pp-ad-depois" src={s.depois.src} width={s.depois.largura} height={s.depois.altura} alt={s.depois.alt} draggable={false} loading="lazy" decoding="async" />
          <img className="pp-ad-antes" src={s.antes.src} width={s.antes.largura} height={s.antes.altura} alt={s.antes.alt} draggable={false} loading="lazy" decoding="async" />
          <span className="pp-ad-rot a">{s.antes.rotulo}</span>
          <span className="pp-ad-rot b">{s.depois.rotulo}</span>
          <span className="pp-ad-linha" aria-hidden="true" />
          <span className="pp-ad-pega" aria-hidden="true">
            ⇆
          </span>
        </div>
      </div>
    </SecaoP>
  );
}
