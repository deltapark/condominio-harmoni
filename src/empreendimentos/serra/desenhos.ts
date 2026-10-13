// Desenhos do Harmoni Serra gerados em código (sem imagem): serras em planos, curvas de nível
// e o corte da rua. Tudo determinístico, para o HTML do servidor bater com o do navegador.

type Pico = [x: number, altura: number, largura: number];

/** Linha de serra: soma de "montanhas" gaussianas mais uma ondulação fina. */
function crista(picos: Pico[], base: number, ruido: number, fase: number) {
  const y = (x: number) =>
    base - picos.reduce((s, [px, h, w]) => s + h * Math.exp(-(((x - px) / w) ** 2)), 0) - ruido * (Math.sin(x / 37 + fase) * 0.6 + Math.sin(x / 13 + fase * 2) * 0.4);
  let d = `M-20 600 L-20 ${y(-20).toFixed(1)}`;
  for (let x = 0; x <= 1620; x += 12) d += ` L${x} ${y(x).toFixed(1)}`;
  return { d: `${d} L1620 600Z`, y };
}

/** Serra dos mirantes (viewBox 1600 de largura): três planos e os três cumes da frente. */
export function serraMirantes() {
  const frente = crista([[300, 250, 190], [800, 330, 230], [1300, 220, 190]], 540, 4, 1);
  const meio = crista([[80, 120, 240], [560, 170, 240], [1060, 170, 240], [1560, 130, 220]], 545, 6, 2);
  const tras = crista([[0, 140, 300], [430, 200, 300], [940, 230, 320], [1420, 190, 280]], 530, 7, 3);
  const picos = [300, 800, 1300].map((x): [number, number] => [x, +(frente.y(x) - 4).toFixed(1)]);
  return { frente: frente.d, meio: meio.d, tras: tras.d, picos };
}

/**
 * Curvas de nível em volta de um centro: anéis deformados por senos (relevo ilustrativo,
 * sem altitude real). `sx` alonga na horizontal.
 */
export function curvas(cx: number, cy: number, n: number, passo: number, sx: number) {
  const raio = (k: number, a: number) =>
    passo * (k + 0.8) * (1 + 0.16 * Math.sin(3 * a + 0.7 + k * 0.22) + 0.09 * Math.sin(5 * a + 2.1 - k * 0.15) + 0.04 * Math.sin(8 * a + k));
  const ponto = (k: number, a: number): [number, number] => [cx + Math.cos(a) * raio(k, a) * sx, cy + Math.sin(a) * raio(k, a)];
  const aneis = Array.from(
    { length: n },
    (_, k) => `M${Array.from({ length: 90 }, (_, i) => ponto(k, (i / 90) * Math.PI * 2).map((v) => v.toFixed(1)).join(" ")).join(" L")}Z`,
  );
  return { aneis, ponto };
}

/** Anel de cada distância (1 perto, 3 longe) nas curvas da Localização. */
export const anelDoDestino = (anel: 1 | 2 | 3) => anel * 3;

/** Altura da linha de profundidade em cada etapa do corte (viewBox 600 x 660). */
export const CORTE_Y = [72, 124, 292, 280, 372, 452, 560];

/** Faixas do subsolo do corte, com o topo ondulado. */
export const ondaCorte = (y: number, a: number) => `M0 ${y} C 120 ${y - a}, 240 ${y + a}, 360 ${y} S 520 ${y - a}, 600 ${y + a * 0.5} V700 H0Z`;

/** Fio de estrato entre as faixas do subsolo. */
export const fioCorte = (y: number) => `M0 ${y} C 140 ${y - 6}, 300 ${y + 8}, 420 ${y} S 560 ${y - 6}, 600 ${y + 3}`;

/** Fios de rocha que descem da direita no hero (viewBox 1600 x 1000). */
export const fiosCapa = [0, 1, 2, 3, 4].map(
  (i) => `M1600 ${250 + i * 46} C 1420 ${280 + i * 48}, 1250 ${420 + i * 52}, 1080 ${600 + i * 48} S 820 ${940 + i * 20}, 640 ${1020 + i * 10}`,
);

/** Três fios de rocha que marcam a passagem de uma seção para a outra (viewBox 1200 x 28). */
export const fiosDivisor = [
  "M0 12 C 160 4, 330 20, 520 11 S 860 3, 1020 13 S 1150 18, 1200 9",
  "M0 18 C 200 12, 380 25, 560 18 S 900 10, 1200 17",
  "M60 24 C 260 20, 420 27, 640 23 S 980 19, 1140 25",
];
