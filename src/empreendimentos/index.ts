// Registro das LPs. Para publicar uma nova: criar a pasta com o dados.ts e incluir aqui.
import { arbore } from "./arbore/dados";
import { essenza } from "./essenza/dados";
import { hortensias } from "./hortensias/dados";
import { jardins } from "./jardins/dados";
import { pampas } from "./pampas/dados";
import type { LP } from "./tipos";
import { vale } from "./vale/dados";
import { vinhedos } from "./vinhedos/dados";

export const lps: LP[] = [vinhedos, jardins, arbore, vale, essenza, hortensias, pampas];

export const lpPorSlug = (slug: string) => lps.find((lp) => lp.slug === slug);
