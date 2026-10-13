// Seções exclusivas do Harmoni Serra (protótipo aprovado em 2026-10-13).
// Motivos tirados do manual: a rocha em camadas com fios dourados (estratos), a neblina
// subindo pela mata e as serras em planos do KV.
import type { Destaque, Formulario, Imagem, Item, ItemPerspectiva, Link } from "../tipos";

type Base = { tipo: "serra" };

/** Hero: capa do manual. Logo completo à esquerda, rocha à direita, fios dourados descendo e neblina no pé. */
export type SerraCapa = Base & {
  secao: "capa";
  logo: Imagem;
  titulo: Destaque;
  texto: string;
  imagem: Imagem;
  ctas: [Link, Link];
};

/** Conceito: a serra com três cumes (mirantes) no laranja; cada cume abre um trecho do texto do manual. */
export type SerraMirantes = Base & {
  secao: "mirantes";
  sobretitulo: string;
  /** Um por cume, na ordem da esquerda para a direita. */
  mirantes: { rotulo: string; texto: string }[];
  /** Cume aberto ao carregar. */
  inicial: number;
};

export type DestinoSerra = {
  nome: string;
  tipo: string;
  /** Filtro do mapa. */
  grupo: string;
  tempo: string;
  /** Posição ilustrativa: ângulo (graus, 0 = leste, sentido horário) e anel (1 perto, 3 longe). */
  angulo: number;
  anel: 1 | 2 | 3;
};

/** Localização: curvas de nível em volta da casa Harmoni, com zoom, arraste, filtros e rota até o destino. */
export type SerraCurvas = Base & {
  secao: "curvas";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  filtros: string[];
  destinos: DestinoSerra[];
  inicial: number;
  textos: { aria: string; nota: string; aproximar: string; afastar: string; centralizar: string; tempoCarro: string };
};

/** Perspectivas: fotos em faixas com borda ondulada de rocha; a escolhida alarga e o clique amplia. */
export type SerraGaleria = Base & {
  secao: "galeria";
  sobretitulo: string;
  titulo: Destaque;
  itens: ItemPerspectiva[];
  /** Índices de `itens` em cada faixa. */
  faixas: number[][];
};

/** Implantação: prancha técnica (planta, norte, carimbo e legenda) sobre curvas de nível. */
export type SerraPrancha = Base & {
  secao: "prancha";
  sobretitulo: string;
  titulo: Destaque;
  planta: Imagem;
  carimbo: { rotulo: string; valor: string }[];
  legenda: string[];
  cta: Link;
};

/** Diferenciais: categorias empilhadas como camadas de rocha, contagem grande e ícones em linha. */
export type SerraEstratos = Base & {
  secao: "estratos";
  sobretitulo: string;
  titulo: Destaque;
  categorias: { nome: string; itens: Item[] }[];
};

/** Obra: a rua em corte; a tela para e a rolagem desce do poste até a drenagem. */
export type SerraEscavacao = Base & {
  secao: "escavacao";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  /** Na ordem do corte, de cima para baixo (sete etapas). */
  etapas: Item[];
  /** Rótulo de onde fica cada etapa (acima da rua, na superfície, abaixo da rua). */
  lugares: string[];
  aria: string;
};

/** Contato: WhatsApp em destaque, formulário curto e faixa de serras com neblina no pé. */
export type SerraWhats = Base & {
  secao: "whats";
  sobretitulo: string;
  titulo: Destaque;
  whatsTitulo: string;
  whatsNumero: string;
  whatsBotao: string;
  stand: { rotulo: string; texto: string };
  formulario: Formulario;
};

export type SecaoSerra = SerraCapa | SerraMirantes | SerraCurvas | SerraGaleria | SerraPrancha | SerraEstratos | SerraEscavacao | SerraWhats;
