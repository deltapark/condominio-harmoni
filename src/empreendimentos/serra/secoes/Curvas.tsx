"use client";

import { useEffect, useRef, useState, type PointerEvent as PE } from "react";
import { CASA } from "@/components/lp/desenhosHarmoni";
import { anelDoDestino, curvas } from "../desenhos";
import type { SerraCurvas } from "../tipos";
import { CabP, SecaoS } from "./base";

// Mapa largo (viewBox 1600 x 800). O centro fica à esquerda do meio para o painel caber à direita.
const VW = 1600, VH = 800, CX = 640, CY = 400, SX = 1.9;
const C = curvas(CX, CY, 14, 30, SX);
const posicao = (angulo: number, anel: 1 | 2 | 3) => C.ponto(anelDoDestino(anel), (angulo * Math.PI) / 180);

// Localização: o entorno como curvas de nível, com a casa Harmoni no centro. Escolher um destino
// (lista, ponto ou filtro) desenha a rota da casa até ele com um ponto percorrendo o caminho e
// acende a curva do destino. Zoom (+, −, duplo clique) e arraste; as curvas perto do cursor
// clareiam e cada anel se desloca um pouco com o mouse, como relevo. Ilustrativo, sem escala.
export function Curvas({ s }: { s: SerraCurvas }) {
  const [i, setI] = useState(s.inicial);
  const [filtro, setFiltro] = useState(s.filtros[0]);
  const [vista, setVista] = useState({ s: 1, x: 0, y: 0 });
  const [arrastando, setArrastando] = useState(false);
  const svg = useRef<SVGSVGElement>(null);
  const rota = useRef<SVGPathElement>(null);
  const viajante = useRef<SVGCircleElement>(null);
  const aneis = useRef<(SVGPathElement | null)[]>([]);
  const arr = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);

  const d = s.destinos[i];
  const [px, py] = posicao(d.angulo, d.anel);
  // rota em curva, levemente desviada para não cortar o centro em linha reta
  const qx = (CX + px) / 2 + (py - CY) * 0.28, qy = (CY + py) / 2 - (px - CX) * 0.12;
  const caminho = `M${CX} ${CY} Q ${qx.toFixed(1)} ${qy.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)}`;

  // ponto percorrendo a rota a cada destino novo
  useEffect(() => {
    const r = rota.current, v = viajante.current;
    if (!r || !v) return;
    const L = r.getTotalLength(), t0 = performance.now();
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const passo = (t: number) => {
      const k = reduz ? 1 : Math.min(1, (t - t0) / 1600), e = 1 - Math.pow(1 - k, 3), q = r.getPointAtLength(L * e);
      v.setAttribute("cx", q.x.toFixed(1));
      v.setAttribute("cy", q.y.toFixed(1));
      if (k < 1) raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [i]);

  const limita = (v: { s: number; x: number; y: number }) => ({ s: v.s, x: Math.min(0, Math.max(VW - VW * v.s, v.x)), y: Math.min(0, Math.max(VH - VH * v.s, v.y)) });
  const zoom = (ns: number, fx = VW / 2, fy = VH / 2) =>
    setVista((v) => {
      const s2 = Math.min(3, Math.max(1, ns));
      return limita({ s: s2, x: fx - ((fx - v.x) * s2) / v.s, y: fy - ((fy - v.y) * s2) / v.s });
    });
  // ponteiro -> unidades do viewBox
  const vb = (e: { clientX: number; clientY: number }) => {
    const b = svg.current!.getBoundingClientRect();
    return [((e.clientX - b.left) / b.width) * VW, ((e.clientY - b.top) / b.height) * VH];
  };

  const escolher = (k: number) => setI(k);
  const filtrar = (g: string) => {
    setFiltro(g);
    const prim = s.destinos.findIndex((x) => g === s.filtros[0] || x.grupo === g);
    if (prim >= 0) setI(prim);
  };
  const fora = (k: number) => filtro !== s.filtros[0] && s.destinos[k].grupo !== filtro;

  const mover = (e: PE<HTMLDivElement>) => {
    const [x, y] = vb(e);
    if (arr.current) {
      const a = arr.current;
      setVista((v) => limita({ s: v.s, x: a.vx + (x - a.x), y: a.vy + (y - a.y) }));
    }
    // curvas perto do cursor acendem; cada anel desloca um pouco conforme o mouse
    const wx = (x - vista.x) / vista.s, wy = (y - vista.y) / vista.s;
    const ang = Math.atan2(wy - CY, (wx - CX) / SX), dc = Math.hypot((wx - CX) / SX, wy - CY);
    const fx = x / VW - 0.5, fy = y / VH - 0.5;
    aneis.current.forEach((p, k) => {
      if (!p) return;
      const [ax, ay] = C.ponto(k, ang);
      p.classList.toggle("perto", Math.abs(Math.hypot((ax - CX) / SX, ay - CY) - dc) < 14);
      p.style.transform = `translate(${(-fx * k * 1.8).toFixed(1)}px, ${(-fy * k * 1.3).toFixed(1)}px)`;
    });
  };
  const sair = () => aneis.current.forEach((p) => p && (p.classList.remove("perto"), (p.style.transform = "")));

  return (
    <SecaoS id="localizacao" className="pp-sec fundo-noite sr-curvas">
      <div className="casca">
        <div className="sr-curvas-topo">
          <CabP sobretitulo={s.sobretitulo} titulo={s.titulo} />
          <p className="pp-txt rv">{s.texto}</p>
        </div>
        <div
          className={`sr-mapa rv ${arrastando ? "arrasta" : ""}`}
          onPointerDown={(e) => {
            if ((e.target as Element).closest("button, .sr-pt, .sr-painel")) return;
            const [x, y] = vb(e);
            arr.current = { x, y, vx: vista.x, vy: vista.y };
            e.currentTarget.setPointerCapture(e.pointerId);
            setArrastando(true);
          }}
          onPointerUp={() => ((arr.current = null), setArrastando(false))}
          onPointerCancel={() => ((arr.current = null), setArrastando(false))}
          onPointerMove={mover}
          onPointerLeave={sair}
        >
          <svg
            ref={svg}
            viewBox={`0 0 ${VW} ${VH}`}
            role="img"
            aria-label={s.textos.aria}
            onDoubleClick={(e) => {
              const [x, y] = vb(e);
              zoom(vista.s * 1.6, x, y);
            }}
          >
            <g transform={`translate(${vista.x.toFixed(1)} ${vista.y.toFixed(1)}) scale(${vista.s.toFixed(3)})`}>
              <g>
                {C.aneis.map((a, k) => (
                  <path
                    key={k}
                    ref={(el) => {
                      aneis.current[k] = el;
                    }}
                    className={`sr-cn ${k % 3 === 0 ? "mestra" : ""} ${k === anelDoDestino(d.anel) ? "on" : ""}`}
                    pathLength={1}
                    d={a}
                  />
                ))}
              </g>
              <path ref={rota} key={caminho} className="sr-rota" pathLength={1} d={caminho} />
              <circle ref={viajante} className="sr-viajante" r="7" cx={CX} cy={CY} />
              <g className="sr-casa" transform={`translate(${CX - 23} ${CY - 17}) scale(.1)`} fill="currentColor">
                {CASA.map((p) => (
                  <path key={p.slice(0, 16)} d={p} />
                ))}
              </g>
              {s.destinos.map((x, k) => {
                const [ox, oy] = posicao(x.angulo, x.anel);
                // nome à direita do ponto na metade esquerda, para não sair pela borda
                const esq = ox < 420;
                return (
                  <g key={x.nome} className={`sr-pt ${k === i ? "on" : ""} ${fora(k) ? "fora" : ""}`} onClick={() => escolher(k)} onMouseEnter={() => escolher(k)} aria-hidden="true">
                    <circle className="halo" cx={ox} cy={oy} r="28" />
                    <circle className="no" cx={ox} cy={oy} r="9" />
                    <text x={ox + (esq ? 18 : -18)} y={oy - 16} textAnchor={esq ? "start" : "end"}>
                      {x.nome}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
          <div className="sr-mapa-ctl">
            <button type="button" onClick={() => zoom(vista.s * 1.4)} aria-label={s.textos.aproximar}>
              +
            </button>
            <button type="button" onClick={() => zoom(vista.s / 1.4)} aria-label={s.textos.afastar}>
              −
            </button>
            <button type="button" onClick={() => setVista({ s: 1, x: 0, y: 0 })} aria-label={s.textos.centralizar} title={s.textos.centralizar}>
              ◎
            </button>
          </div>
          <div className="sr-mapa-filtros" role="group" aria-label={s.sobretitulo}>
            {s.filtros.map((g) => (
              <button key={g} type="button" aria-pressed={filtro === g} onClick={() => filtrar(g)}>
                {g}
              </button>
            ))}
          </div>
          <aside className="sr-painel">
            <div className="sr-painel-det" aria-live="polite">
              <small>{d.grupo}</small>
              <b>{d.nome}</b>
              <span>
                {d.tipo} · {s.textos.tempoCarro}
              </span>
            </div>
            <ul>
              {s.destinos.map((x, k) => (
                <li key={x.nome} className={fora(k) ? "fora" : ""}>
                  <button type="button" aria-pressed={k === i} onClick={() => escolher(k)} onMouseEnter={() => escolher(k)}>
                    <span>{x.nome}</span>
                    <span className="sr-tempo">{x.tempo}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <p className="sr-mapa-nota">{s.textos.nota}</p>
        </div>
      </div>
    </SecaoS>
  );
}
