import type { LP } from "../../tipos";
import type { SecaoSerra } from "../tipos";
import { Capa } from "./Capa";
import { Curvas } from "./Curvas";
import { Escavacao } from "./Escavacao";
import { Estratos } from "./Estratos";
import { Galeria } from "./Galeria";
import { Mirantes } from "./Mirantes";
import { Prancha } from "./Prancha";
import { Whats } from "./Whats";

/** Seções exclusivas do Serra; a ordem vem do dados.ts. */
export function BlocoSerra({ s, lp }: { s: SecaoSerra; lp: LP }) {
  switch (s.secao) {
    case "capa":
      return <Capa s={s} />;
    case "mirantes":
      return <Mirantes s={s} />;
    case "curvas":
      return <Curvas s={s} />;
    case "galeria":
      return <Galeria s={s} />;
    case "prancha":
      return <Prancha s={s} />;
    case "estratos":
      return <Estratos s={s} />;
    case "escavacao":
      return <Escavacao s={s} />;
    case "whats":
      return <Whats s={s} lp={lp} />;
  }
}
