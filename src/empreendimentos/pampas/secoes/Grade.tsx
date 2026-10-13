"use client";

import { useState } from "react";
import { icone } from "@/empreendimentos/icones";
import type { PampasGrade } from "../tipos";
import { CabP, SecaoP, Tracado } from "./base";

// Diferenciais: grade com filtro por categoria. Os itens de fora apagam em vez de sumir,
// para a grade não pular de tamanho. O traço da casa desenha ao fundo quando a seção aparece.
export function Grade({ s }: { s: PampasGrade }) {
  const categorias = [s.todos, ...Array.from(new Set(s.itens.map((x) => x.categoria)))];
  const [filtro, setFiltro] = useState(s.todos);

  return (
    <SecaoP id="diferenciais" className="pp-sec pp-grade">
      <Tracado aoVer className="pp-grade-tr" />
      <div className="casca">
        <CabP sobretitulo={s.sobretitulo} titulo={s.titulo} centro={s.centro} />
        <div className={`pp-filtros ${s.centro ? "pp-centro" : ""}`} role="group" aria-label={s.sobretitulo}>
          {categorias.map((c) => (
            <button key={c} type="button" aria-pressed={filtro === c} onClick={() => setFiltro(c)}>
              {c}
            </button>
          ))}
        </div>
        <ul className="pp-grade-lista">
          {s.itens.map((x) => (
            <li key={x.titulo} data-fora={filtro !== s.todos && x.categoria !== filtro}>
              <img className="ic" src={icone(x.icone)} width={34} height={34} alt="" loading="lazy" />
              <span>{x.titulo}</span>
              <small>{x.categoria}</small>
            </li>
          ))}
        </ul>
      </div>
    </SecaoP>
  );
}
