// Cartões "Conheça os outros Harmonis" do fim das LPs. A chamada é a frase da vitrine
// (src/dados/empreendimentos.ts), exceto a do Vinhedos (a frase dele na vitrine é longa
// para o cartão, então fica o subtítulo da LP no ar) e a do Hortênsias.
import { harmonis } from "@/dados/empreendimentos";
import { estiloDeVida, provisoria, render } from "./renders";
import type { Imagem } from "./tipos";

const fotos: Record<string, Imagem> = {
  vinhedos: render("portico"),
  jardins: estiloDeVida.meninaCachorro,
  arbore: provisoria("portico"),
  vale: provisoria("salaoExterno"),
  essenza: provisoria("gourmet"),
  hortensias: estiloDeVida.familiaBrincando,
  pampas: { src: "/img/pampas/manual/familia-capim.webp", largura: 842, altura: 580, alt: "Família abraçada no capim ao entardecer" },
  serra: { src: "/img/serra/manual/kv.webp", largura: 860, altura: 869, alt: "Pai e filho brincando no gramado ao pôr do sol, com a serra ao fundo" },
};

// Harmonis que ainda não estão na vitrine: frase do manual de marca.
const chamadas: Record<string, string> = { pampas: "Qualidade é viver em harmonia.", serra: "Qualidade é viver em harmonia." };

const chamadaVinhedos = "Condomínio horizontal com lotes a partir de 160m².";
// O Hortênsias ainda não está na coleção da vitrine (só no bloco "Em breve"): vai o título da LP.
const chamadaHortensias = "Gravataí, em sua mais bela forma.";

export const cartaoOutro = (slug: string) => ({
  foto: fotos[slug] ?? provisoria("portico"),
  chamada:
    slug === "vinhedos" ? chamadaVinhedos : slug === "hortensias" ? chamadaHortensias : (harmonis.find((h) => h.slug === slug)?.frase ?? chamadas[slug] ?? ""),
});
