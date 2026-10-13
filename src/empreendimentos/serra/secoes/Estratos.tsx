import { IcTinta } from "@/components/lp/IcTinta";
import type { SerraEstratos } from "../tipos";
import { CabP, SecaoS } from "./base";

const dois = (n: number) => String(n).padStart(2, "0");

// Diferenciais: as categorias empilhadas como camadas de rocha, da superfície para a base,
// cada uma com a contagem grande e os itens com ícone em linha. A borda ondulada de cada
// camada é a mesma das Perspectivas.
export function Estratos({ s }: { s: SerraEstratos }) {
  return (
    <SecaoS id="diferenciais" className="pp-sec sr-estratos">
      <div className="casca sr-estratos-cab">
        <CabP sobretitulo={s.sobretitulo} titulo={s.titulo} />
      </div>
      <div className="sr-camadas">
        {s.categorias.map((c, k) => (
          <div key={c.nome} className={`sr-camada sr-camada-${k + 1} rv`}>
            <div className="casca sr-camada-in">
              <p className="sr-camada-cab">
                <b>{dois(c.itens.length)}</b>
                <span>{c.nome}</span>
              </p>
              <ul>
                {c.itens.map((x) => (
                  <li key={x.titulo}>
                    <IcTinta nome={x.icone} className="sr-ic" />
                    {x.titulo}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </SecaoS>
  );
}
