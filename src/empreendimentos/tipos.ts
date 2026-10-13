// Contrato de dados de uma LP. Cada empreendimento preenche o seu dados.ts;
// os componentes de src/secoes/lp/ só leem daqui e não guardam texto.
import type { NomeIcone } from "./icones";
import type { SecaoArbore } from "./arbore/tipos";
import type { SecaoEssenza } from "./essenza/tipos";
import type { SecaoHortensias } from "./hortensias/tipos";
import type { SecaoJardins } from "./jardins/tipos";
import type { SecaoPampas } from "./pampas/tipos";
import type { SecaoSerra } from "./serra/tipos";
import type { SecaoVale } from "./vale/tipos";
import type { PaginaNoAr } from "./vinhedos/tipos";

export type Arquivo = { src: string; largura: number; altura: number };

export type Imagem = Arquivo & {
  alt: string;
  /** Render de outro empreendimento usado no lugar: aparece o selo "Imagem provisória". */
  provisoria?: boolean;
};

export type Link = { rotulo: string; alvo: string };

/** Texto com um trecho em destaque (peso maior, cor de acento no escuro). */
export type Destaque = { antes?: string; destaque: string; depois?: string };

export type Item = { titulo: string; icone: NomeIcone; texto?: string };

export type Fundo = "branco" | "creme" | "areia" | "escuro" | "noite";

export type Formulario = {
  titulo?: string;
  botao: string;
  /** Troca os placeholders padrão (a página do Vinhedos usa os da LP no ar). */
  placeholders?: { nome?: string; telefone?: string; email?: string };
};

// ---------- seções ----------

export type SecaoHero = {
  tipo: "hero";
  /** vinhedos: foto cheia + cartão · jardins: foto à esquerda + painel creme ·
   *  arbore: título central + panorâmica + cartão · vale: foto ao fundo + cartão ·
   *  essenza: foto cheia + painel branco */
  variante: "cinema" | "dividido" | "editorial" | "fundo" | "painel";
  titulo: Destaque;
  /** Palavras que se alternam no lugar do destaque (Vinhedos). */
  palavras?: string[];
  texto?: string;
  imagem: Imagem;
  formulario: Formulario;
  /** Título do cartão de cadastro que fica abaixo da foto (editorial e fundo). */
  tituloCartao?: Destaque;
};

export type SecaoDestaques = { tipo: "destaques"; itens: Item[] };

export type SecaoConceito = {
  tipo: "conceito";
  /** centro: frase grande centralizada · colunas: título central e texto em 2 colunas com fotos ·
   *  colagem: duas fotos sobrepostas + texto · manifesto: bloco central em fundo de cor ·
   *  lado: texto + foto lado a lado */
  variante: "centro" | "colunas" | "colagem" | "manifesto" | "lado";
  fundo?: Fundo;
  sobretitulo?: string;
  titulo: Destaque;
  paragrafos: string[];
  imagens?: Imagem[];
  icone?: NomeIcone;
  cta?: Link;
};

export type ItemPerspectiva = { nome: string; texto: string; imagem: Imagem };

export type SecaoPerspectivas = {
  tipo: "perspectivas";
  carrossel: "cinema" | "leque" | "pilha" | "centro" | "indice";
  fundo?: Fundo;
  sobretitulo: string;
  titulo: Destaque;
  itens: ItemPerspectiva[];
};

export type GrupoDiferenciais = { titulo: string; imagem: Imagem; itens: Item[] };

export type SecaoDiferenciais = {
  tipo: "diferenciais";
  /** abas: grupos com troca de foto · grade: 7 colunas numeradas · lista: duas colunas no escuro ·
   *  cartoes: cartões em 4 colunas + bloco de CTA · grade-escura: 7 colunas no escuro */
  variante: "abas" | "grade" | "lista" | "cartoes" | "grade-escura";
  sobretitulo: string;
  titulo: Destaque;
  grupos?: GrupoDiferenciais[];
  itens?: Item[];
  cta?: Link;
};

export type SecaoChamada = {
  tipo: "chamada";
  variante: "faixa" | "foto" | "linha";
  titulo: Destaque;
  texto?: string;
  cta: Link;
  imagem?: Imagem;
};

export type PontoMapa = Item & {
  /** Posição no mapa ilustrativo (% da largura e da altura). */
  x?: string;
  y?: string;
  /** Aba do mapa "abas". */
  grupo?: string;
};

export type SecaoLocalizacao = {
  tipo: "localizacao";
  /** Como o título e o texto ficam acima do mapa. */
  cabecalho: "esquerda" | "lado" | "centro";
  fundo?: Fundo;
  sobretitulo: string;
  titulo: Destaque;
  texto?: string;
  mapa: {
    /** foto: mapa real com zoom · ilustrado · radar · abas · rota */
    variante: "foto" | "ilustrado" | "radar" | "abas" | "rota";
    endereco: string;
    pontos: PontoMapa[];
    foto?: Imagem;
  };
};

export type SecaoImplantacao = {
  tipo: "implantacao";
  /** largura: planta inteira + legenda em 5 colunas · centro: legenda em blocos com ícone ·
   *  lateral: planta + legenda ao lado · linha: legenda em linha com filete */
  variante: "largura" | "centro" | "lateral" | "linha";
  sobretitulo: string;
  titulo: Destaque;
  planta: Imagem;
  legenda: Item[];
  cta?: Link;
  /** Legenda à esquerda da planta (lateral). */
  invertido?: boolean;
};

export type SecaoObra = {
  tipo: "obra";
  /** escura: corte + lista no petróleo · lado: texto e lista ao lado do corte ·
   *  centro: título central + corte + blocos · faixa: título e lista em cima, corte embaixo */
  variante: "escura" | "lado" | "centro" | "faixa";
  invertido?: boolean;
  fundo?: Fundo;
  sobretitulo: string;
  titulo: Destaque;
  texto?: string;
  imagem: Imagem;
  itens: Item[];
};

export type SecaoGrupo = {
  tipo: "grupo";
  /** centro: logos e texto centralizados + fotos · escuro: texto e mosaico no petróleo ·
   *  escuro-centro: tudo centralizado no petróleo */
  variante: "centro" | "escuro" | "escuro-centro";
  fundo?: Fundo;
};

export type SecaoMissao = { tipo: "missao" };

/** Cartões dos outros Harmonis no fim da página (para a LP não terminar sem saída). */
export type SecaoOutros = { tipo: "outros" };

/** Página inteira própria entre o header e o rodapé do projeto (Vinhedos: cópia da LP no ar). */
export type SecaoNoAr = { tipo: "no-ar"; pagina: PaginaNoAr };

export type SecaoContato = {
  tipo: "contato";
  /** foto: foto escurecida + cartão · centro: logo e cartão centralizados ·
   *  escuro: texto + cartão no petróleo · creme: logo, texto e cartão no creme */
  variante: "foto" | "centro" | "escuro" | "creme";
  fundo?: Fundo;
  sobretitulo?: string;
  titulo: Destaque;
  imagem?: Imagem;
  formulario: Formulario;
};

export type Secao =
  | SecaoHero
  | SecaoDestaques
  | SecaoConceito
  | SecaoPerspectivas
  | SecaoDiferenciais
  | SecaoChamada
  | SecaoLocalizacao
  | SecaoImplantacao
  | SecaoObra
  | SecaoGrupo
  | SecaoMissao
  | SecaoContato
  | SecaoNoAr
  | SecaoOutros
  // Seções exclusivas (pasta secoes/ de cada empreendimento).
  | SecaoEssenza
  | SecaoVale
  | SecaoJardins
  | SecaoArbore
  | SecaoHortensias
  | SecaoPampas
  | SecaoSerra;

// ---------- página ----------

export type LP = {
  slug: string;
  nome: string;
  cidade: string;
  /** Liga a paleta e as animações em src/estilos/lp.css. */
  tema: "vinhedos" | "jardins" | "arbore" | "vale" | "essenza" | "hortensias" | "pampas" | "serra";
  seo: { titulo: string; descricao: string; imagem: string };
  logo: {
    /** Fundo claro. */
    claro: Arquivo;
    /** Fundo escuro. */
    escuro: Arquivo;
    /** Altura no header (px). O wordmark horizontal pede menos que o logo quadrado. */
    alturaHeader: number;
  };
  header: {
    sobre: "claro" | "escuro";
    cta: Link;
    /** Logo geral Harmoni (horizontal) no lugar do logo do empreendimento, com o nome ao lado.
     *  Para empreendimentos cujo logo é só vertical (Pampas, Serra). */
    marca?: { rotulo: string };
  };
  contato: {
    telefones: string[];
    /** Só dígitos, com DDI. */
    whatsapp: string;
    stand?: string;
    /** POST do lead. Vazio enquanto o endpoint não existir. */
    endpoint?: string;
  };
  /** Barra fixa no celular com WhatsApp e o CTA do header (Essenza e Vale). */
  barraCelular?: boolean;
  secoes: Secao[];
  legal: {
    /** Registro do empreendimento (matrícula, cartório, prefeitura). */
    registro: string;
  };
};
