// Harmoni Serra, Gravataí/RS. Sem copy do cliente para a LP: o conceito e o slogan vêm do
// manual de marca (MANUAL - HARMONI SERRA.pptx); frases institucionais vêm do site
// novaharmonia.com.br (verbatim). O resto está marcado como proposta.
// Layout aprovado no protótipo em 2026-10-13: H7 · C15 · L9 · P10 · I9 · D9 · O9 · G4 · K3 (motivo C).
import { itensModeloHarmoni, legendaModeloImplantacao, legendasPerspectivas as L, marcasGrupo, obraModelo, registroPendente, textosInteracao } from "../comum";
import type { Imagem, Item, LP } from "../tipos";
import { provisoria } from "../renders";

const nome = "Harmoni Serra";
const cidade = "Gravataí/RS";
const M = "/img/serra/manual";
const O = "/img/nova-harmonia/obras";

// Fotos do manual de marca. Licença a confirmar (docs/PENDENCIAS.md).
const manual = {
  capaRocha: { src: `${M}/capa-rocha.webp`, largura: 900, altura: 1080, alt: "Formação de rocha em camadas com neblina subindo pela mata" },
} satisfies Record<string, Imagem>;

// Fotos reais de obras da Nova Harmonia (site institucional).
const obras = {
  parqueHarmonia: { src: `${O}/parque-harmonia-viamao.webp`, largura: 806, altura: 1080, alt: "Motoniveladora preparando uma via no Parque Harmonia, em Viamão" },
  villaImperial: { src: `${O}/villa-imperial.webp`, largura: 600, altura: 820, alt: "Portaria do Villa Imperial, em Teresina" },
  caruaru: { src: `${O}/caruaru-acesso.webp`, largura: 810, altura: 1080, alt: "Acesso da Reserva Harmonia Caruaru" },
} satisfies Record<string, Imagem>;

const categoria: Record<string, string> = {
  portaria: "Segurança", chave: "Segurança",
  quadra: "Lazer", academia: "Lazer", piscina: "Lazer", playground: "Lazer", salao: "Lazer", gourmet: "Lazer", petplace: "Lazer",
  mercado: "Serviços", carro: "Serviços",
  "rede-de-agua": "Infraestrutura", "rede-eletrica": "Infraestrutura", "iluminacao-led": "Infraestrutura",
};
const categorias = ["Segurança", "Lazer", "Serviços", "Infraestrutura"].map((c) => ({
  nome: c,
  // Lista modelo da linha Harmoni; confirmar a do Serra.
  itens: itensModeloHarmoni.filter((x) => categoria[x.icone] === c),
}));

// Etapas da obra na ordem do corte, do poste ao subsolo (mesmos itens das LPs no ar).
const ordemCorte: Item["icone"][] = ["iluminacao-led", "rede-eletrica", "pavimentacao", "meio-fio-com-sarjeta", "rede-de-agua", "rede-de-esgoto", "rede-de-drenagem"];
const etapas = ordemCorte.map((ic) => obraModelo.find((x) => x.icone === ic)!);

const tempo = "[PREENCHER: min]";

export const serra: LP = {
  slug: "serra",
  nome,
  cidade,
  tema: "serra",
  seo: {
    titulo: "Harmoni Serra em Gravataí | Lançamento Nova Harmonia",
    // proposta
    descricao: "Harmoni Serra: condomínio horizontal em Gravataí/RS, inspirado na força das paisagens do Sul. Cadastre-se e receba as condições de lançamento.",
    imagem: manual.capaRocha.src,
  },
  logo: {
    claro: { src: "/img/serra/logo/logo-03-recorte.svg", largura: 740, altura: 496 },
    escuro: { src: "/img/serra/logo/logo-02-recorte.svg", largura: 740, altura: 496 },
    alturaHeader: 56,
  },
  // O logo do Serra é vertical; no header vai o logo geral Harmoni com o nome ao lado.
  header: { sobre: "escuro", cta: { rotulo: "Garantir meu lote", alvo: "contato" }, marca: { rotulo: "Serra" } },
  contato: {
    telefones: ["[PREENCHER: telefone]"],
    whatsapp: "",
  },
  barraCelular: true,
  secoes: [
    {
      tipo: "serra",
      secao: "capa",
      logo: { src: "/img/serra/logo/logo-02-recorte.svg", largura: 740, altura: 496, alt: `${nome}, condomínio horizontal, Gravataí RS` },
      // proposta (adaptada do texto do manual: "uma identidade construída ao longo do tempo")
      titulo: { antes: "Uma identidade construída ", destaque: "ao longo do tempo" },
      // proposta
      texto: "Condomínio horizontal em Gravataí/RS. Cadastre-se e receba as condições de lançamento antes de todo mundo.",
      imagem: manual.capaRocha,
      ctas: [
        { rotulo: "Garantir meu lote", alvo: "contato" },
        { rotulo: "Ver o projeto", alvo: "perspectivas" }, // proposta
      ],
    },
    {
      tipo: "serra",
      secao: "mirantes",
      sobretitulo: "O conceito",
      // Rótulos: proposta. Textos: manual, slide do conceito (verbatim; "Um ambient" corrigido
      // para "Um ambiente" e sinalizado em docs/PENDENCIAS.md).
      mirantes: [
        {
          rotulo: "Imponência",
          texto:
            "Serra remete à força e à imponência das paisagens do Sul do Brasil, onde a natureza revela cenários marcantes, tradições e uma identidade construída ao longo do tempo. Um conceito que traduz equilíbrio, autenticidade e conexão com o lugar.",
        },
        {
          rotulo: "Solidez",
          texto:
            "Inspirado nessa essência, o Harmoni Serra, em Gravataí, une a beleza e a solidez que fazem parte do imaginário sulista a um novo conceito de morar. Um ambiente pensado para oferecer conforto, exclusividade e bem-estar em cada detalhe.",
        },
        {
          rotulo: "Raízes",
          texto:
            "Aqui, a excelência de viver se encontra com a qualidade de vida. Um lugar para viver com mais tranquilidade, criar raízes e aproveitar uma rotina em perfeita harmonia com aquilo que realmente importa.",
        },
      ],
      inicial: 1,
    },
    {
      tipo: "serra",
      secao: "curvas",
      sobretitulo: "Localização",
      // proposta
      titulo: { antes: "Seu lugar ", destaque: "em Gravataí" },
      texto: `[PREENCHER: texto de localização do Harmoni Serra] · [PREENCHER: endereço] · ${cidade}`,
      filtros: ["Tudo", "Cidade", "Acesso", "Capital"],
      // Posições ilustrativas a partir de Gravataí; confirmar com o endereço (docs/PENDENCIAS.md).
      destinos: [
        { nome: "Centro de Gravataí", tipo: "Comércio e serviços", grupo: "Cidade", tempo, angulo: 330, anel: 1 },
        { nome: "RS-118", tipo: "Rodovia de acesso", grupo: "Acesso", tempo, angulo: 235, anel: 1 },
        { nome: "Freeway (BR-290)", tipo: "Rodovia de acesso", grupo: "Acesso", tempo, angulo: 105, anel: 2 },
        { nome: "Porto Alegre", tipo: "Capital", grupo: "Capital", tempo, angulo: 175, anel: 3 },
        { nome: "Aeroporto Salgado Filho", tipo: "Porto Alegre", grupo: "Capital", tempo, angulo: 200, anel: 2 },
      ],
      inicial: 3,
      textos: {
        aria: `Entorno ilustrativo do ${nome}`,
        // proposta
        nota: "Arraste para mover · duplo clique aproxima · curvas ilustrativas, sem escala nem altitude real",
        aproximar: "Aproximar",
        afastar: "Afastar",
        centralizar: "Centralizar",
        tempoCarro: "[PREENCHER: tempo de carro]",
      },
    },
    {
      tipo: "serra",
      secao: "galeria",
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
      faixas: [[0, 1], [2, 3, 5], [6, 4]],
    },
    {
      tipo: "serra",
      secao: "prancha",
      sobretitulo: "Implantação",
      // novaharmonia.com.br (verbatim)
      titulo: { antes: "Encontre onde você quer ", destaque: "começar seu sonho!" },
      planta: provisoria("masterplan"),
      carimbo: [
        { rotulo: "Empreendimento", valor: nome },
        { rotulo: "Local", valor: cidade },
        { rotulo: "Lotes", valor: "[PREENCHER]" },
        { rotulo: "Escala", valor: "Ilustrativa" },
      ],
      // Legenda do masterplan do Vinhedos (planta provisória); trocar pela do Serra.
      legenda: legendaModeloImplantacao.map((x) => x.titulo),
      cta: { rotulo: "Garantir meu lote", alvo: "contato" },
    },
    {
      tipo: "serra",
      secao: "estratos",
      sobretitulo: "Diferenciais",
      // proposta (mesma do Pampas)
      titulo: { antes: "Infraestrutura e lazer, ", destaque: "item por item" },
      categorias,
    },
    {
      tipo: "serra",
      secao: "escavacao",
      sobretitulo: "Como construímos",
      // Título já usado nas LPs (falta crase em "a altura"; sinalizado em docs/PENDENCIAS.md).
      titulo: { antes: "Infraestrutura a altura do padrão ", destaque: "Nova Harmonia", depois: " de qualidade" },
      // novaharmonia.com.br (verbatim)
      texto: "A Nova Harmonia entrega excelência em cada etapa do desenvolvimento urbano: desde o pavimento, até o rigor técnico na preparação de cada via e iluminação.",
      etapas,
      lugares: ["acima da rua", "na superfície", "abaixo da rua"],
      aria: "Corte da rua com as etapas de infraestrutura, do poste ao subsolo",
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
      tipo: "serra",
      secao: "whats",
      sobretitulo: "Contato",
      // proposta
      titulo: { antes: "Seja o primeiro a conhecer o ", destaque: "Harmoni Serra" },
      // proposta
      whatsTitulo: "Fale direto com um consultor",
      whatsNumero: "[PREENCHER: WhatsApp do Harmoni Serra]",
      whatsBotao: textosInteracao.chamarWhatsapp,
      stand: { rotulo: "Stand de vendas", texto: "[PREENCHER: endereço do stand]" },
      formulario: { botao: "Quero condição de lançamento" },
    },
  ],
  legal: { registro: registroPendente(nome, cidade) },
};

