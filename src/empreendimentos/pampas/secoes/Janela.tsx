import { Img } from "@/components/lp/Img";
import type { PampasJanela } from "../tipos";
import { Enfase, Tracado } from "./base";
import { Capim } from "./Capim";

// Hero: texto no azul à esquerda, campo do manual à direita, o traço da casa Harmoni
// cruzando a emenda (desenha ao carregar) e o capim no pé, de ponta a ponta.
export function Janela({ s }: { s: PampasJanela }) {
  return (
    <section id="inicio" className="pp-janela">
      <div className="pp-janela-txt">
        <p className="pp-sobre pp-entra">{s.sobretitulo}</p>
        <h1 className="pp-h1 pp-entra">
          <Enfase t={s.titulo} />
        </h1>
        <p className="pp-txt pp-entra">{s.texto}</p>
        <div className="pp-bts pp-entra">
          <a className="bt bt-acento" href={`#${s.ctas[0].alvo}`}>
            {s.ctas[0].rotulo}
          </a>
          <a className="bt pp-bt-linha" href={`#${s.ctas[1].alvo}`}>
            {s.ctas[1].rotulo}
          </a>
        </div>
      </div>
      <figure className="pp-janela-foto">
        <Img imagem={s.imagem} prioridade sizes="(min-width: 960px) 55vw, 100vw" />
        <span className="pp-vertical">{s.vertical}</span>
      </figure>
      <Tracado anima className="pp-janela-tr" />
      <Capim modo="creme-baixo" />
    </section>
  );
}
