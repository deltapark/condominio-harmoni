import { Img } from "@/components/lp/Img";
import type { PampasRegioes } from "../tipos";
import { CabP, SecaoP } from "./base";

// Grupo: empreendimentos da Nova Harmonia com o nº de lotes publicado no site, um cartão
// com o mapa das 5 regiões, a faixa de valores correndo e a visão.
export function Regioes({ s }: { s: PampasRegioes }) {
  const valores = [...s.valores, ...s.valores];
  return (
    <SecaoP className="pp-sec pp-regioes">
      <div className="casca">
        <div className="pp-regioes-topo">
          <CabP sobretitulo={s.sobretitulo} titulo={s.titulo} centro={s.centro} />
          <p className="pp-txt rv">{s.texto}</p>
        </div>
        <ul className="pp-regioes-grade">
          {s.empreendimentos.map((e) => (
            <li key={e.nome} className="rv">
              <figure>
                <Img imagem={e.imagem} sizes="(min-width: 1100px) 24vw, (min-width: 700px) 48vw, 100vw" />
              </figure>
              <div className="pp-regioes-in">
                <p className="pp-lotes">
                  {e.lotes}
                  <small>{s.rotuloLotes}</small>
                </p>
                <h3>{e.nome}</h3>
                <p>{e.cidade}</p>
              </div>
            </li>
          ))}
          <li className="pp-regioes-mapa rv">
            <img src={s.mapa.imagem.src} width={s.mapa.imagem.largura} height={s.mapa.imagem.altura} alt={s.mapa.imagem.alt} loading="lazy" decoding="async" />
            <div className="pp-regioes-in">
              <p className="pp-lotes">
                {s.mapa.numero}
                <small>{s.mapa.rotulo}</small>
              </p>
              <h3>{s.mapa.titulo}</h3>
              <p>{s.mapa.texto}</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="pp-valores" aria-label={s.valores.join(", ")}>
        <div className="pp-marquee" aria-hidden="true">
          {valores.map((v, i) => (
            <span key={i}>{v}</span>
          ))}
        </div>
      </div>
      <div className="casca pp-regioes-pe">
        <p className="pp-dica">
          {s.visao.rotulo}: <b>{s.visao.texto}</b>
        </p>
        <img src={s.logo.src} width={s.logo.largura} height={s.logo.altura} alt={s.logo.alt} loading="lazy" />
      </div>
    </SecaoP>
  );
}
