// Harmoni Pampas, Gravataí/RS. Sem copy do cliente para a LP: o conceito, o slogan e
// "Refúgio de gente feliz!" vêm do manual de marca (MANUAL - HARMONI PAMPAS.pptx);
// frases institucionais vêm do site novaharmonia.com.br (verbatim). O resto está
// marcado como proposta. Layout aprovado no protótipo em 2026-10-13.
import { itensModeloHarmoni, legendasPerspectivas as L, marcasGrupo, registroPendente } from "../comum";
import { estiloDeVida, provisoria } from "../renders";
import type { Imagem, LP } from "../tipos";

const nome = "Harmoni Pampas";
const cidade = "Gravataí/RS";
const M = "/img/pampas/manual";
const O = "/img/nova-harmonia/obras";

// Fotos do manual de marca. Licença a confirmar (docs/PENDENCIAS.md).
const manual = {
  campo: { src: `${M}/campo.webp`, largura: 620, altura: 1080, alt: "Campo dourado ao pôr do sol" },
  capim: { src: `${M}/capim.webp`, largura: 348, altura: 348, alt: "Capim-dos-pampas de perto" },
} satisfies Record<string, Imagem>;

// Fotos reais de obras da Nova Harmonia (site institucional).
const obras = {
  ciclovia: { src: `${O}/ciclovia.webp`, largura: 810, altura: 1080, alt: "Via entregue com ciclovia e iluminação em LED" },
  parqueHarmonia: { src: `${O}/parque-harmonia-viamao.webp`, largura: 806, altura: 1080, alt: "Motoniveladora preparando uma via no Parque Harmonia, em Viamão" },
  vistaAerea: { src: `${O}/vista-aerea.webp`, largura: 1600, altura: 900, alt: "Vista aérea do acesso a um bairro da Nova Harmonia" },
  villaImperial: { src: `${O}/villa-imperial.webp`, largura: 600, altura: 820, alt: "Portaria do Villa Imperial, em Teresina" },
  caruaru: { src: `${O}/caruaru-acesso.webp`, largura: 810, altura: 1080, alt: "Acesso da Reserva Harmonia Caruaru" },
} satisfies Record<string, Imagem>;

const categoria: Record<string, string> = {
  portaria: "Segurança", chave: "Segurança",
  quadra: "Lazer", academia: "Lazer", piscina: "Lazer", playground: "Lazer", salao: "Lazer", gourmet: "Lazer", petplace: "Lazer",
  mercado: "Serviços", carro: "Serviços",
  "rede-de-agua": "Infraestrutura", "rede-eletrica": "Infraestrutura", "iluminacao-led": "Infraestrutura",
};

const tempo = "[PREENCHER: min]";
const aqui = { rotulo: "Você está aqui", nome }; // proposta

export const pampas: LP = {
  slug: "pampas",
  nome,
  cidade,
  tema: "pampas",
  seo: {
    titulo: "Harmoni Pampas em Gravataí | Lançamento Nova Harmonia",
    // proposta
    descricao: "Harmoni Pampas: condomínio horizontal em Gravataí/RS, inspirado nos campos do Sul. Cadastre-se e receba as condições de lançamento.",
    imagem: manual.campo.src,
  },
  logo: {
    claro: { src: "/img/pampas/logo/logo-03-recorte.svg", largura: 730, altura: 486 },
    escuro: { src: "/img/pampas/logo/logo-02-recorte.svg", largura: 730, altura: 486 },
    alturaHeader: 56,
  },
  // O logo do Pampas é vertical; no header vai o logo geral Harmoni com o nome ao lado.
  header: { sobre: "escuro", cta: { rotulo: "Garantir meu lote", alvo: "contato" }, marca: { rotulo: "Pampas" } },
  contato: {
    telefones: ["[PREENCHER: telefone]"],
    whatsapp: "",
  },
  barraCelular: true,
  secoes: [
    {
      tipo: "pampas",
      secao: "janela",
      sobretitulo: `Condomínio horizontal · ${cidade}`,
      // proposta
      titulo: { antes: "Sua casa no ", destaque: "ritmo do campo" },
      // proposta
      texto: "Condomínio horizontal em Gravataí/RS. Cadastre-se e receba as condições de lançamento antes de todo mundo.",
      imagem: manual.campo,
      vertical: "Gravataí · Rio Grande do Sul",
      ctas: [
        { rotulo: "Garantir meu lote", alvo: "contato" },
        { rotulo: "Ver o projeto", alvo: "perspectivas" }, // proposta
      ],
    },
    {
      tipo: "pampas",
      secao: "manifesto",
      sobretitulo: "O conceito",
      // Manual, slide 16 (verbatim).
      frase:
        "Pampas é uma homenagem às vastas paisagens do Sul do Brasil, onde os campos se encontram com o horizonte e a natureza se expressa em sua forma mais livre e autêntica. Inspirado pelo movimento suave do capim-dos-pampas, o conceito carrega a leveza e a beleza características da região.",
      destaques: ["horizonte", "capim-dos-pampas,"],
      circulo: manual.capim,
      depoisDe: 12,
      paragrafos: [
        "No Harmoni Pampas, a tradição sulista encontra uma nova forma de viver. Um lugar que valoriza a conexão com a natureza, o conforto e a tranquilidade, criando um ambiente pensado para proporcionar bem-estar em todos os momentos.",
        "Aqui, cada detalhe convida a viver com mais leveza e harmonia. Um espaço onde as raízes da tradição se encontram com a qualidade de vida, criando um lugar especial para construir histórias e aproveitar o que realmente importa.",
      ],
      slogan: "Qualidade é viver em harmonia.",
    },
    {
      tipo: "pampas",
      secao: "placas",
      sobretitulo: "Localização",
      // proposta
      titulo: { antes: "Seu lugar ", destaque: "em Gravataí" },
      texto: "[PREENCHER: texto de localização do Harmoni Pampas]",
      endereco: `[PREENCHER: endereço] · ${cidade}`,
      aqui,
      // Setas aproximadas a partir de Gravataí; confirmar com o endereço (docs/PENDENCIAS.md).
      placas: [
        { nome: "Centro de Gravataí", tipo: "Comércio e serviços", seta: "→", lado: "dir", tempo },
        { nome: "RS-118", tipo: "Rodovia de acesso", seta: "↑", lado: "esq", tempo },
        { nome: "Freeway (BR-290)", tipo: "Rodovia de acesso", seta: "↓", lado: "dir", tempo },
        { nome: "Porto Alegre", tipo: "Capital", seta: "←", lado: "esq", tempo },
        { nome: "Aeroporto Salgado Filho", tipo: "Porto Alegre", seta: "←", lado: "dir", tempo },
      ],
      cta: { rotulo: "Garantir meu lote", alvo: "contato" },
    },
    {
      tipo: "pampas",
      secao: "carrossel",
      centro: true,
      sobretitulo: "Perspectivas",
      // proposta
      titulo: { antes: "Ambientes para viver ", destaque: "o dia inteiro" },
      itens: [
        { ...L.salao, imagem: provisoria("salaoExterno") },
        { ...L.gourmet, imagem: provisoria("gourmet2") },
        { ...L.piscina, imagem: provisoria("piscina") },
        { ...L.academia, imagem: provisoria("academia") },
        { ...L.salao, imagem: provisoria("salao") },
        { ...L.brinquedoteca, imagem: provisoria("brinquedoteca") },
        { ...L.minimercado, imagem: provisoria("minimercado") },
      ],
    },
    {
      tipo: "pampas",
      secao: "lupa",
      centro: true,
      sobretitulo: "Implantação",
      // novaharmonia.com.br (verbatim)
      titulo: { antes: "Encontre onde você quer ", destaque: "começar seu sonho!" },
      numeros: [
        // nº de lotes, metragem mínima e área de lazer (docs/PENDENCIAS.md)
        { valor: "[PREENCHER]", rotulo: "lotes" },
        { valor: "[PREENCHER]", rotulo: "m² a partir de" },
        { valor: "[PREENCHER]", rotulo: "m² de lazer" },
      ],
      planta: provisoria("masterplan"),
    },
    {
      tipo: "pampas",
      secao: "grade",
      centro: true,
      sobretitulo: "Diferenciais",
      // proposta (mesma do Vale)
      titulo: { antes: "Infraestrutura e lazer, ", destaque: "item por item" },
      todos: "Todos",
      // Lista modelo da linha Harmoni; confirmar a do Pampas.
      itens: itensModeloHarmoni.map((x) => ({ ...x, categoria: categoria[x.icone] ?? "Lazer" })),
    },
    {
      tipo: "pampas",
      secao: "antes-depois",
      sobretitulo: "Como construímos",
      // novaharmonia.com.br (verbatim)
      titulo: { antes: "Infraestrutura de ", destaque: "alto padrão", depois: " para construir a vida que você sempre sonhou." },
      texto: "A Nova Harmonia entrega excelência em cada etapa do desenvolvimento urbano: desde o pavimento, até o rigor técnico na preparação de cada via e iluminação.",
      nota: "Arraste para comparar. Fotos de empreendimentos diferentes da Nova Harmonia; a da esquerda é do Parque Harmonia, Viamão/RS.",
      antes: { ...obras.parqueHarmonia, rotulo: "Em obra" },
      depois: { ...obras.ciclovia, rotulo: "Entregue" },
    },
    {
      tipo: "pampas",
      secao: "regioes",
      // novaharmonia.com.br (verbatim)
      sobretitulo: "Presente nas 5 regiões do Brasil",
      titulo: { antes: "Conheça alguns de nossos ", destaque: "empreendimentos" },
      texto: "Uma empresa com história para contar e um Brasil a desenvolver. Entendemos de Brasil, estamos de Norte a Sul e compreendemos cada país que existe dentro do Brasil.",
      empreendimentos: [
        { nome: "Parque Harmonia", cidade: "Viamão/RS", lotes: "1.369", imagem: obras.parqueHarmonia },
        { nome: "Villa Imperial", cidade: "Teresina/PI", lotes: "1.895", imagem: obras.villaImperial },
        { nome: "Reserva Harmonia Caruaru", cidade: "Caruaru/PE", lotes: "1.181", imagem: obras.caruaru },
      ],
      rotuloLotes: "lotes",
      mapa: {
        imagem: { src: "/img/nova-harmonia/obra/mapa-brasil.webp", largura: 1150, altura: 1080, alt: "Mapa do Brasil com os estados onde a Nova Harmonia atua" },
        numero: "5",
        rotulo: "regiões",
        titulo: "Presente nas 5 regiões do Brasil",
        texto: "Urbanizar com harmonia.",
      },
      valores: ["Harmonia", "Ética", "Respeito", "Transparência", "Parceria", "Inovação", "Excelência", "Foco em resultado"],
      visao: { rotulo: "Visão", texto: "Urbanizar com harmonia." },
      logo: marcasGrupo.novaHarmonia,
    },
    {
      tipo: "pampas",
      secao: "revista",
      centro: true,
      sobretitulo: "Revista Harmonia",
      // proposta
      titulo: { antes: "Antes de escolher, ", destaque: "leia com calma" },
      // novaharmonia.com.br (verbatim)
      texto: "Como escolher seu lote, o que considerar na hora de construir, acompanhamento das obras nos empreendimentos e histórias de quem já vive nos nossos bairros.",
      itens: [
        { titulo: "Como escolher seu lote", imagem: estiloDeVida.familiaJardim },
        { titulo: "O que considerar na hora de construir", imagem: obras.parqueHarmonia },
        { titulo: "Acompanhamento das obras nos empreendimentos", imagem: obras.vistaAerea },
      ],
      link: { rotulo: "Ler na Revista Harmonia ↗", href: "https://novaharmonia.com.br/" },
    },
    {
      tipo: "pampas",
      secao: "convite",
      sobretitulo: "Contato",
      // proposta
      titulo: { antes: "Seja o primeiro a conhecer o ", destaque: "Harmoni Pampas" },
      // novaharmonia.com.br (verbatim)
      texto: "Cadastre-se e receba informações sobre nossos produtos e lançamentos",
      formulario: { botao: "Quero condição de lançamento" },
      // proposta
      whatsapp: "Prefere conversar agora? Chame no WhatsApp.",
    },
  ],
  legal: { registro: registroPendente(nome, cidade) },
};

