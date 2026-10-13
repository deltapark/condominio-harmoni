"use client";

import type { ReactNode } from "react";
import { SecaoP } from "@/empreendimentos/pampas/secoes/base";
import { fiosDivisor } from "../desenhos";

// O Serra usa a mesma base visual do Pampas (sobretítulo, título com ênfase, entrada ao rolar);
// o que muda são os motivos. Reaproveita os componentes em vez de copiar.
export { CabP, Enfase } from "@/empreendimentos/pampas/secoes/base";

/** Três fios de rocha no topo da seção, desenhando quando entram na tela. */
export function FioRocha() {
  return (
    <svg className="sr-fio rv" viewBox="0 0 1200 28" preserveAspectRatio="none" aria-hidden="true">
      {fiosDivisor.map((d) => (
        <path key={d.slice(0, 12)} d={d} pathLength={1} />
      ))}
    </svg>
  );
}

/** Seção do Serra: entrada ao rolar e, por padrão, os fios de rocha marcando o início. */
export function SecaoS({ id, className, fio = true, children }: { id?: string; className?: string; fio?: boolean; children: ReactNode }) {
  return (
    <SecaoP id={id} className={className}>
      {fio && <FioRocha />}
      {children}
    </SecaoP>
  );
}
