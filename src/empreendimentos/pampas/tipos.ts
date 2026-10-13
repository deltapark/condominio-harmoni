// Seções exclusivas do Harmoni Pampas (protótipo aprovado em 2026-10-13).
// Motivos tirados do conceito do manual: o capim-dos-pampas (desenhado em canvas)
// e o traço da casa Harmoni sem preenchimento.
import type { Arquivo, Destaque, Formulario, Imagem, Item, ItemPerspectiva, Link } from "../tipos";

type Base = { tipo: "pampas"; centro?: boolean };

/** Hero: texto à esquerda, foto do campo à direita, traço da casa cruzando a emenda e capim no pé. */
export type PampasJanela = Base & {
  secao: "janela";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  imagem: Imagem;
  /** Texto vertical na borda da foto. */
  vertical: string;
  ctas: [Link, Link];
};

/** Conceito: o parágrafo do manual em letras grandes que acendem com a rolagem. */
export type PampasManifesto = Base & {
  secao: "manifesto";
  sobretitulo: string;
  frase: string;
  /** Palavras da frase que acendem em laranja. */
  destaques: string[];
  /** Foto redonda encaixada no meio da frase, depois da palavra de índice `depoisDe`. */
  circulo: Imagem;
  depoisDe: number;
  paragrafos: string[];
  slogan: string;
};

export type Placa = { nome: string; tipo: string; seta: "←" | "→" | "↑" | "↓"; lado: "esq" | "dir"; tempo: string };

/** Localização: placas de estrada num poste; o céu começa na cor da seção de cima. */
export type PampasPlacas = Base & {
  secao: "placas";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  endereco: string;
  aqui: { rotulo: string; nome: string };
  placas: Placa[];
  cta: Link;
};

/** Perspectivas: carrossel com as vizinhas giradas em 3D; a do centro abre em tela cheia. */
export type PampasCarrossel = Base & {
  secao: "carrossel";
  sobretitulo: string;
  titulo: Destaque;
  itens: ItemPerspectiva[];
};

/** Implantação: números grandes e a planta com lupa. */
export type PampasLupa = Base & {
  secao: "lupa";
  sobretitulo: string;
  titulo: Destaque;
  numeros: { valor: string; rotulo: string }[];
  planta: Imagem;
};

/** Diferenciais: grade com filtro por categoria e o traço da casa ao fundo. */
export type PampasGrade = Base & {
  secao: "grade";
  sobretitulo: string;
  titulo: Destaque;
  todos: string;
  itens: (Item & { categoria: string })[];
};

/** Obra: duas fotos reais sobrepostas; arrastar compara a via em obra e a via entregue. */
export type PampasAntesDepois = Base & {
  secao: "antes-depois";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  nota: string;
  antes: Imagem & { rotulo: string };
  depois: Imagem & { rotulo: string };
};

/** Grupo: empreendimentos da Nova Harmonia com nº de lotes, mapa das 5 regiões, valores e visão. */
export type PampasRegioes = Base & {
  secao: "regioes";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  empreendimentos: { nome: string; cidade: string; lotes: string; imagem: Imagem }[];
  rotuloLotes: string;
  mapa: { imagem: Imagem; numero: string; rotulo: string; titulo: string; texto: string };
  valores: string[];
  visao: { rotulo: string; texto: string };
  logo: Arquivo & { alt: string };
};

/** Revista Harmonia: três temas publicados, com link para o site da Nova Harmonia. */
export type PampasRevista = Base & {
  secao: "revista";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  itens: { titulo: string; imagem: Imagem }[];
  link: { rotulo: string; href: string };
};

/** Contato: chamada central, traço da casa ao fundo e formulário em uma linha. */
export type PampasConvite = Base & {
  secao: "convite";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  formulario: Formulario;
  whatsapp: string;
};

export type SecaoPampas =
  | PampasJanela
  | PampasManifesto
  | PampasPlacas
  | PampasCarrossel
  | PampasLupa
  | PampasGrade
  | PampasAntesDepois
  | PampasRegioes
  | PampasRevista
  | PampasConvite;
