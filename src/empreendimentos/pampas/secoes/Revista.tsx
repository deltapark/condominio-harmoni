import { Img } from "@/components/lp/Img";
import type { PampasRevista } from "../tipos";
import { CabP, SecaoP } from "./base";

// Revista Harmonia: três temas publicados no site da Nova Harmonia, levando para lá.
export function Revista({ s }: { s: PampasRevista }) {
  return (
    <SecaoP className="pp-sec fundo-creme pp-revista">
      <div className="casca">
        <div className={`pp-revista-topo ${s.centro ? "pp-centro" : ""}`}>
          <CabP sobretitulo={s.sobretitulo} titulo={s.titulo} centro={s.centro} />
          <p className="pp-txt rv">{s.texto}</p>
        </div>
        <ul className="pp-revista-grade">
          {s.itens.map((x, i) => (
            <li key={x.titulo} className="rv">
              <a href={s.link.href} target="_blank" rel="noopener noreferrer">
                <figure>
                  <Img imagem={x.imagem} sizes="(min-width: 800px) 30vw, 100vw" />
                </figure>
                <small>{String(i + 1).padStart(2, "0")}</small>
                <h3>{x.titulo}</h3>
                <span className="pp-ler">{s.link.rotulo}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SecaoP>
  );
}
