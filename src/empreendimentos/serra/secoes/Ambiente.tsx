"use client";

import { useEffect, useRef } from "react";

type Modo = "creme-baixo" | "azul-alto";

// cor: neblina; tinta: silhueta das serras (quando o fundo é claro); alt: fração da altura
// ocupada a partir do pé; serra/nev/est: intensidade de cada camada (0 desliga).
const MODOS: Record<Modo, { cor: string; tinta?: string; alt: number; serra: number; nev: number; est: number; quente: number }> = {
  "creme-baixo": { cor: "247,230,212", alt: 0.26, serra: 0, nev: 0.22, est: 0.55, quente: 0.18 },
  "azul-alto": { cor: "134,181,202", tinta: "35,61,72", alt: 0.95, serra: 1, nev: 0.55, est: 0.4, quente: 0 },
};

type Fio = { y0: number; ph: number; ph2: number; amp: number; inc: number; segs: [number, number][]; d: number };
type Nuvem = { x: number; y: number; r: number; v: number; a: number; q: boolean; ox: number; oy: number };

/**
 * Ambiente do Serra em canvas (substitui o capim do Pampas), com três camadas tiradas do manual:
 * serras em planos (KV), fios dourados da rocha com um brilho correndo por eles (capa) e
 * neblina que deriva devagar e se abre com o ponteiro. Perto do ponteiro o fio se ergue um pouco.
 * Fora da tela não desenha; sem movimento, fica parado no quadro final.
 */
export function Ambiente({ modo, className }: { modo: Modo; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const m = MODOS[modo];
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0, mx = -9999, my = -9999, forca = 0, visivel = true;
    let cristas: { pth: Path2D; al: number }[] = [];
    let fios: Fio[] = [];
    let nuvens: Nuvem[] = [];
    const t0 = performance.now();
    const sec = cv.parentElement;

    const mancha = (rgb: string) => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const g = c.getContext("2d")!;
      const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, `rgba(${rgb},1)`);
      gr.addColorStop(0.5, `rgba(${rgb},.42)`);
      gr.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = gr;
      g.fillRect(0, 0, 128, 128);
      return c;
    };
    const sprite = mancha(m.cor);
    const spriteQ = mancha("241,141,90");

    const mover = (e: PointerEvent) => {
      const b = cv.getBoundingClientRect();
      mx = e.clientX - b.left;
      my = e.clientY - b.top;
      forca = 1;
    };

    const cria = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth;
      H = cv.clientHeight;
      if (!W || !H) return;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Semente fixa: o mesmo desenho a cada carga e a cada redimensionamento.
      let seed = 17;
      const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      const topo = H * (1 - m.alt), faixa = H - topo;
      cristas = m.serra
        ? [0, 1, 2].map((c) => {
            const base = topo + faixa * (0.18 + c * 0.24), amp = faixa * (0.36 - c * 0.08), pth = new Path2D();
            pth.moveTo(0, H);
            for (let x = 0; x <= W + 18; x += 18) pth.lineTo(x, base - amp * (0.5 + 0.32 * Math.sin(x / 210 + c * 1.7) + 0.18 * Math.sin(x / 67 + c)) - rnd() * amp * 0.08);
            pth.lineTo(W, H);
            pth.closePath();
            return { pth, al: m.serra * [0.07, 0.11, 0.17][c] };
          })
        : [];
      fios = Array.from({ length: 7 }, (_, i) => {
        const segs: [number, number][] = [];
        let s = rnd() * 0.08;
        while (s < 1) {
          const e = Math.min(1, s + 0.18 + rnd() * 0.45);
          segs.push([s, e]);
          s = e + 0.02 + rnd() * 0.07;
        }
        return { y0: topo + faixa * ((i + 0.6) / 7.4), ph: rnd() * 6.28, ph2: rnd() * 6.28, amp: 4 + rnd() * 7, inc: (rnd() - 0.5) * 0.05, segs, d: i * 0.1 };
      });
      const esc = Math.min(1.4, Math.max(0.6, H / 700));
      nuvens = Array.from({ length: Math.max(8, Math.round(W / 38)) }, () => ({
        x: rnd() * (W + 800),
        y: topo + rnd() * faixa * 1.05,
        r: (70 + rnd() * 170) * esc,
        v: (0.006 + rnd() * 0.014) * (rnd() < 0.5 ? -1 : 1),
        a: 0.35 + rnd() * 0.65,
        q: rnd() < m.quente,
        ox: 0,
        oy: 0,
      }));
    };

    const yFio = (f: Fio, x: number) =>
      f.y0 + Math.sin(x / 300 + f.ph) * f.amp + Math.sin(x / 90 + f.ph2) * f.amp * 0.3 + (x - W / 2) * f.inc - forca * Math.exp(-(((x - mx) / 140) ** 2)) * (Math.abs(my - f.y0) < 160 ? 10 : 3);

    const desenha = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      forca *= 0.96;
      const p = reduz ? 1 : Math.min(1, (t - t0) / 2600);
      for (const c of cristas) {
        ctx.fillStyle = `rgba(${m.tinta ?? m.cor},${c.al})`;
        ctx.fill(c.pth);
      }
      for (const f of fios) {
        const pl = Math.max(0, Math.min(1, p * 1.5 - f.d));
        if (!pl) continue;
        const pth = new Path2D();
        for (const [s, e] of f.segs) {
          if (s > pl) break;
          const e2 = Math.min(e, pl);
          pth.moveTo(s * W, yFio(f, s * W));
          for (let x = s * W + 12; x < e2 * W; x += 12) pth.lineTo(x, yFio(f, x));
          pth.lineTo(e2 * W, yFio(f, e2 * W));
        }
        ctx.lineCap = "round";
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(241,141,90,${m.est * 0.55})`;
        ctx.stroke(pth);
        // brilho correndo pelo fio, como a luz rasante na rocha da capa do manual
        const gx = ((t / 11000 + f.ph / 6.28) % 1) * (W + 600) - 300;
        const gr = ctx.createLinearGradient(gx - 170, 0, gx + 170, 0);
        gr.addColorStop(0, "rgba(255,214,176,0)");
        gr.addColorStop(0.5, `rgba(255,214,176,${Math.min(0.95, m.est * 1.5)})`);
        gr.addColorStop(1, "rgba(255,214,176,0)");
        ctx.lineWidth = 1.7;
        ctx.strokeStyle = gr;
        ctx.stroke(pth);
      }
      const span = W + 800;
      for (const n of nuvens) {
        const x = (((n.x + n.v * t) % span) + span) % span - 400;
        const dx = x + n.ox - mx, dy = n.y + n.oy - my, dist = Math.sqrt(dx * dx + dy * dy) + 1;
        if (forca > 0.02 && dist < 220) {
          const k = forca * (1 - dist / 220);
          n.ox += (dx / dist) * k * 3.2;
          n.oy += (dy / dist) * k * 1.6;
        }
        n.ox *= 0.975;
        n.oy *= 0.975;
        ctx.globalAlpha = m.nev * n.a * (n.q ? 0.5 : 1) * Math.min(1, p * 1.6);
        ctx.drawImage(n.q ? spriteQ : sprite, x + n.ox - n.r, n.y + n.oy - n.r * 0.45, n.r * 2, n.r * 0.9);
      }
      ctx.globalAlpha = 1;
      if (!reduz && visivel) raf = requestAnimationFrame(desenha);
    };

    const io = new IntersectionObserver(([e]) => {
      const antes = visivel;
      visivel = e.isIntersecting;
      if (visivel && !antes && !reduz) raf = requestAnimationFrame(desenha);
    });
    const ro = new ResizeObserver(() => {
      cria();
      if (reduz) desenha(performance.now());
    });
    io.observe(cv);
    ro.observe(cv);
    sec?.addEventListener("pointermove", mover);
    cria();
    raf = requestAnimationFrame(desenha);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      sec?.removeEventListener("pointermove", mover);
    };
  }, [modo]);

  return <canvas ref={ref} className={`sr-amb ${className ?? ""}`} aria-hidden="true" />;
}
