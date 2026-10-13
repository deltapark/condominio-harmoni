import { BarraCelular } from "@/components/lp/BarraCelular";
import { HeaderLP } from "@/components/lp/HeaderLP";
import { Ic } from "@/components/lp/Ic";
import { RodapeLP } from "@/components/lp/RodapeLP";
import { textosHeader } from "@/empreendimentos/comum";
import type { LP, Secao } from "@/empreendimentos/tipos";
import { BlocoArbore } from "@/empreendimentos/arbore/secoes";
import { BlocoEssenza } from "@/empreendimentos/essenza/secoes";
import { BlocoHortensias } from "@/empreendimentos/hortensias/secoes";
import { BlocoJardins } from "@/empreendimentos/jardins/secoes";
import { BlocoPampas } from "@/empreendimentos/pampas/secoes";
import { BlocoSerra } from "@/empreendimentos/serra/secoes";
import { BlocoVale } from "@/empreendimentos/vale/secoes";
import { PaginaNoAr } from "@/empreendimentos/vinhedos/secoes/PaginaNoAr";
import { Chamada } from "./Chamada";
import { Conceito } from "./Conceito";
import { Contato } from "./Contato";
import { Destaques } from "./Destaques";
import { Diferenciais } from "./Diferenciais";
import { Grupo } from "./Grupo";
import { Hero } from "./Hero";
import { Implantacao } from "./Implantacao";
import { Localizacao } from "./Localizacao";
import { Missao } from "./Missao";
import { Obra } from "./Obra";
import { Outros } from "./Outros";
import { Perspectivas } from "./Perspectivas";

function Bloco({ s, lp }: { s: Secao; lp: LP }) {
  switch (s.tipo) {
    case "hero":
      return <Hero s={s} lp={lp} />;
    case "destaques":
      return <Destaques s={s} />;
    case "conceito":
      return <Conceito s={s} />;
    case "perspectivas":
      return <Perspectivas s={s} />;
    case "diferenciais":
      return <Diferenciais s={s} />;
    case "chamada":
      return <Chamada s={s} />;
    case "localizacao":
      return <Localizacao s={s} lp={lp} />;
    case "implantacao":
      return <Implantacao s={s} />;
    case "obra":
      return <Obra s={s} />;
    case "grupo":
      return <Grupo s={s} />;
    case "missao":
      return <Missao />;
    case "contato":
      return <Contato s={s} lp={lp} />;
    case "no-ar":
      return <PaginaNoAr p={s.pagina} lp={lp} />;
    case "outros":
      return <Outros lp={lp} />;
    case "essenza":
      return <BlocoEssenza s={s} lp={lp} />;
    case "vale":
      return <BlocoVale s={s} lp={lp} />;
    case "jardins":
      return <BlocoJardins s={s} lp={lp} />;
    case "arbore":
      return <BlocoArbore s={s} lp={lp} />;
    case "hortensias":
      return <BlocoHortensias s={s} lp={lp} />;
    case "pampas":
      return <BlocoPampas s={s} lp={lp} />;
    case "serra":
      return <BlocoSerra s={s} lp={lp} />;
  }
}

/** A ordem e a variante de cada seção vêm do dados.ts do empreendimento. */
export function PaginaLP({ lp }: { lp: LP }) {
  return (
    <div className="lp" data-tema={lp.tema} data-barra={lp.barraCelular || undefined}>
      <HeaderLP lp={lp} />
      <main>
        {lp.secoes.map((s, i) => (
          <Bloco key={i} s={s} lp={lp} />
        ))}
      </main>
      <RodapeLP lp={lp} />
      {lp.barraCelular && <BarraCelular lp={lp} />}
      <a className="whats-flutuante" href={`https://wa.me/${lp.contato.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={textosHeader.whatsapp}>
        <Ic nome="whatsapp" tamanho={28} className="ic-claro" />
      </a>
    </div>
  );
}
