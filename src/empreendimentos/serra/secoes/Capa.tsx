import { Img } from "@/components/lp/Img";
import { fiosCapa } from "../desenhos";
import type { SerraCapa } from "../tipos";
import { Ambiente } from "./Ambiente";
import { Enfase } from "./base";

// Hero: a capa do manual. Fundo azul-noite, logo completo à esquerda, a rocha em camadas
// à direita; os fios dourados saem da rocha e descem pela tela, e a neblina passa no pé.
export function Capa({ s }: { s: SerraCapa }) {
  return (
    <section id="inicio" className="sr-capa">
      <figure className="sr-capa-foto">
        <Img imagem={s.imagem} prioridade sizes="(min-width: 900px) 62vw, 100vw" />
      </figure>
      <svg className="sr-capa-fios" viewBox="0 0 1600 1000" preserveAspectRatio="none" aria-hidden="true">
        {fiosCapa.map((d) => (
          <path key={d.slice(0, 14)} d={d} pathLength={1} />
        ))}
      </svg>
      <Ambiente modo="creme-baixo" />
      <div className="sr-capa-in">
        <img className="sr-capa-logo" src={s.logo.src} width={s.logo.largura} height={s.logo.altura} alt={s.logo.alt} fetchPriority="high" />
        <h1 className="pp-h1 sr-capa-h1">
          <Enfase t={s.titulo} />
        </h1>
        <p className="pp-txt sr-capa-txt">{s.texto}</p>
        <div className="pp-bts sr-capa-bts">
          <a className="bt bt-acento" href={`#${s.ctas[0].alvo}`}>
            {s.ctas[0].rotulo}
          </a>
          <a className="bt pp-bt-linha" href={`#${s.ctas[1].alvo}`}>
            {s.ctas[1].rotulo}
          </a>
        </div>
      </div>
    </section>
  );
}
