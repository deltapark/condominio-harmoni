import type { LP } from "../../tipos";
import type { SecaoPampas } from "../tipos";
import { AntesDepois } from "./AntesDepois";
import { Carrossel } from "./Carrossel";
import { Convite } from "./Convite";
import { Grade } from "./Grade";
import { Janela } from "./Janela";
import { Lupa } from "./Lupa";
import { Manifesto } from "./Manifesto";
import { Placas } from "./Placas";
import { Regioes } from "./Regioes";
import { Revista } from "./Revista";

/** Seções exclusivas do Pampas; a ordem vem do dados.ts. */
export function BlocoPampas({ s, lp }: { s: SecaoPampas; lp: LP }) {
  switch (s.secao) {
    case "janela":
      return <Janela s={s} />;
    case "manifesto":
      return <Manifesto s={s} />;
    case "placas":
      return <Placas s={s} />;
    case "carrossel":
      return <Carrossel s={s} />;
    case "lupa":
      return <Lupa s={s} />;
    case "grade":
      return <Grade s={s} />;
    case "antes-depois":
      return <AntesDepois s={s} />;
    case "regioes":
      return <Regioes s={s} />;
    case "revista":
      return <Revista s={s} />;
    case "convite":
      return <Convite s={s} lp={lp} />;
  }
}
