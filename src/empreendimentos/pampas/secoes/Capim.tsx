"use client";

import { useEffect, useRef } from "react";

type Modo = "creme" | "creme-baixo" | "azul";

// Cores e alturas por fundo. al = opacidade das 3 camadas (fundo, meio, frente);
// vao = deixa o capim mais baixo no meio, onde costuma ficar o texto.
const MODOS: Record<Modo, { cor: string; acc: string; alt: number; al: [number, number, number]; dens: number; vao?: number }> = {
  creme: { cor: "247,230,212", acc: "241,141,90", alt: 0.34, al: [0.14, 0.3, 0.6], dens: 1, vao: 0.26 },
  "creme-baixo": { cor: "247,230,212", acc: "241,141,90", alt: 0.17, al: [0.14, 0.3, 0.62], dens: 1 },
  azul: { cor: "35,61,72", acc: "241,141,90", alt: 0.26, al: [0.08, 0.16, 0.34], dens: 0.9, vao: 0.3 },
};

type Haste = { ang: number; h: number; f: number; pl: boolean; acc: boolean };
type Tufo = { x: number; hastes: Haste[]; folhas: { ang: number; l: number; f: number }[]; f: number };
type Camada = { k: number; tufos: Tufo[]; al: number; lw: number };

/**
 * Capim-dos-pampas desenhado em canvas: touceiras em 3 camadas, cada uma com folhas finas
 * na base e hastes com pluma de fios caídos. O vento é um seno lento com rajadas e o
 * ponteiro empurra as hastes perto dele. Fora da tela não desenha; sem movimento, fica parado.
 * Cada camada vira poucos traços (Path2D) para aguentar o celular.
 */
export function Capim({ modo, className }: { modo: Modo; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const base = MODOS[modo];
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0, mx = -9999, forca = 0, visivel = true;
    let camadas: Camada[] = [];
    const sec = cv.parentElement;

    const mover = (e: PointerEvent) => {
      mx = e.clientX - cv.getBoundingClientRect().left;
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
      let seed = 11;
      const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      camadas = [0.45, 0.7, 1].map((k, c) => {
        const n = Math.max(6, Math.round((W / (c === 2 ? 70 : c === 1 ? 46 : 30)) * base.dens));
        const tufos = Array.from({ length: n }, (_, i): Tufo => {
          const x = (i + rnd() * 0.9) * (W / n);
          const dc = Math.abs(x / W - 0.5);
          const vao = base.vao ? Math.min(1, Math.max(0.28, (dc - base.vao * 0.35) / (base.vao * 0.65))) : 1;
          const altT = H * base.alt * k * (0.75 + rnd() * 0.5) * (base.vao ? 0.55 + vao * 0.75 : 1);
          const hastes = Array.from({ length: 2 + Math.floor(rnd() * 4) }, () => ({ ang: (rnd() - 0.5) * 0.5, h: altT * (0.7 + rnd() * 0.35), f: rnd() * 6.28, pl: rnd() < 0.85, acc: rnd() < 0.12 }));
          const folhas = Array.from({ length: 4 + Math.floor(rnd() * 5) }, () => ({ ang: (rnd() - 0.5) * 1.6, l: altT * (0.25 + rnd() * 0.35), f: rnd() * 6.28 }));
          return { x, hastes, folhas, f: rnd() * 6.28 };
        });
        return { k, tufos, al: base.al[c], lw: c === 2 ? 1.25 : c === 1 ? 1 : 0.8 };
      });
    };

    const desenha = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      forca *= 0.96;
      const raj = Math.sin(t / 3100) * 0.5 + Math.sin(t / 1700 + 1) * 0.25;
      for (const cam of camadas) {
        const linhas = new Path2D(), plumas = new Path2D(), acc = new Path2D();
        for (const tf of cam.tufos) {
          const d = (tf.x - mx) / (W * 0.12);
          const empurra = forca * Math.exp(-d * d) * Math.sign(d || 1) * 0.55;
          const vento = (Math.sin(t / 1400 + tf.f + tf.x / 260) * 0.12 + raj * 0.12) * (0.6 + cam.k * 0.5) + empurra;
          for (const fo of tf.folhas) {
            const a = fo.ang + vento * 0.5 + Math.sin(t / 900 + fo.f) * 0.03;
            const dir = Math.sign(a || 1);
            linhas.moveTo(tf.x, H);
            linhas.quadraticCurveTo(tf.x + dir * fo.l * 0.08, H - fo.l * 0.9, tf.x + Math.sin(a) * fo.l * 1.1, H - Math.cos(a) * fo.l * 0.9 + fo.l * 0.15);
          }
          for (const hs of tf.hastes) {
            const a = hs.ang + vento + Math.sin(t / 1150 + hs.f) * 0.025;
            const tx = tf.x + Math.sin(a) * hs.h, ty = H - Math.cos(a) * hs.h;
            const alvo = hs.acc ? acc : linhas;
            alvo.moveTo(tf.x, H);
            alvo.quadraticCurveTo(tf.x + Math.sin(a * 0.35) * hs.h * 0.5, H - hs.h * 0.55, tx, ty);
            if (!hs.pl) continue;
            // Pluma: fios saindo do terço final da haste, caindo para os lados e com o vento.
            const len = hs.h * 0.34, N = cam.k > 0.8 ? 46 : 26, plw = hs.h * 0.06 * (0.8 + cam.k * 0.4);
            const alvoP = hs.acc ? acc : plumas;
            for (let j = 0; j < N; j++) {
              const s = j / N, px = tx - Math.sin(a) * len * (1 - s), py = ty + Math.cos(a) * len * (1 - s);
              const hsh = Math.abs(Math.sin((j + 1) * 12.9898 + hs.f * 78.233)) % 1, lado = hsh > 0.5 ? 1 : -1;
              const comp = plw * (0.25 + Math.sin(Math.min(1, s * 1.15) * Math.PI * 0.95) * 0.85) * (0.55 + hsh * 0.7);
              alvoP.moveTo(px, py);
              alvoP.quadraticCurveTo(px + lado * comp * 0.5 + vento * comp * 0.9, py - comp * (0.25 + hsh * 0.2), px + lado * comp * (0.75 + hsh * 0.4) + vento * comp * 2, py + comp * (0.15 + hsh * 0.5));
            }
            alvoP.moveTo(tx, ty);
            alvoP.lineTo(tx + Math.sin(a) * plw * 0.7, ty - Math.cos(a) * plw * 0.7);
          }
        }
        ctx.lineCap = "round";
        ctx.lineWidth = cam.lw;
        ctx.strokeStyle = `rgba(${base.cor},${cam.al * 0.8})`;
        ctx.stroke(linhas);
        ctx.lineWidth = cam.lw * 0.55;
        ctx.strokeStyle = `rgba(${base.cor},${cam.al * 0.85})`;
        ctx.stroke(plumas);
        ctx.lineWidth = cam.lw * 0.8;
        ctx.strokeStyle = `rgba(${base.acc},${Math.min(1, cam.al * 1.1)})`;
        ctx.stroke(acc);
      }
      if (!reduz && visivel) raf = requestAnimationFrame(desenha);
    };

    const io = new IntersectionObserver(([e]) => {
      const antes = visivel;
      visivel = e.isIntersecting;
      if (visivel && !antes && !reduz) raf = requestAnimationFrame(desenha);
    });
    const ro = new ResizeObserver(() => {
      cria();
      if (reduz) desenha(0);
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

  return <canvas ref={ref} className={`pp-capim ${className ?? ""}`} aria-hidden="true" />;
}
