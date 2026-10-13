"use client";

import { useEffect, useState } from "react";
import { menuPadrao, textosHeader } from "@/empreendimentos/comum";
import type { LP } from "@/empreendimentos/tipos";
import { useRolou } from "@/hooks/useRolou";
import { Ic } from "./Ic";
import { IconeMenu } from "./IconeMenu";
import { MarcaHarmoni } from "./MarcaHarmoni";

// header-2: no topo é transparente e ocupa a largura toda; ao rolar encolhe para
// uma pílula de vidro centralizada. No celular o menu cobre a tela e trava a rolagem.
// Igual nas 5 LPs: só mudam o logo e a cor do botão (acento do tema).
export function HeaderLP({ lp }: { lp: LP }) {
  const [aberto, setAberto] = useState(false);
  const rolou = useRolou(10);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    // Passou para o desktop com o menu aberto: fecha para não deixar a rolagem travada.
    const mq = window.matchMedia("(min-width: 1080px)");
    const aoMudar = () => mq.matches && setAberto(false);
    window.addEventListener("keydown", aoTeclar);
    mq.addEventListener("change", aoMudar);
    return () => {
      window.removeEventListener("keydown", aoTeclar);
      mq.removeEventListener("change", aoMudar);
    };
  }, [aberto]);

  const escuro = lp.header.sobre === "escuro" && !rolou && !aberto;
  const logo = escuro ? lp.logo.escuro : lp.logo.claro;
  const whatsapp = `https://wa.me/${lp.contato.whatsapp}`;

  return (
    <header className="lph" data-rolou={rolou} data-aberto={aberto} data-escuro={escuro} style={{ ["--logo-h" as string]: `${lp.logo.alturaHeader}px` }}>
      <nav className="lph-barra" aria-label={lp.nome}>
        <a className="lph-marca" href="#inicio" aria-label={`${lp.nome}, ${textosHeader.inicio}`} onClick={() => setAberto(false)}>
          {lp.header.marca ? (
            <>
              <MarcaHarmoni className="lph-mh" />
              <small className="lph-mh-rot">{lp.header.marca.rotulo}</small>
            </>
          ) : (
            <img src={logo.src} width={logo.largura} height={logo.altura} alt={lp.nome} />
          )}
        </a>

        <ul className="lph-links">
          {menuPadrao.map((l) => (
            <li key={l.alvo}>
              <a className="lph-link" href={`#${l.alvo}`}>
                {l.rotulo}
              </a>
            </li>
          ))}
        </ul>

        <div className="lph-acoes">
          <a className="lph-bt lph-bt-contorno" href={whatsapp} target="_blank" rel="noopener noreferrer">
            <Ic nome="whatsapp" tamanho={18} className={escuro ? "ic-claro" : undefined} />
            {textosHeader.whatsapp}
          </a>
          <a className="lph-bt lph-bt-cheio" href={`#${lp.header.cta.alvo}`}>
            {lp.header.cta.rotulo}
          </a>
        </div>

        <button
          type="button"
          className="lph-toggle"
          aria-expanded={aberto}
          aria-controls="lph-gaveta"
          aria-label={aberto ? textosHeader.fechar : textosHeader.abrir}
          onClick={() => setAberto((a) => !a)}
        >
          <IconeMenu aberto={aberto} />
        </button>
      </nav>

      <div id="lph-gaveta" className="lph-gaveta" hidden={!aberto}>
        <ul>
          {menuPadrao.map((l, i) => (
            <li key={l.alvo} style={{ ["--i" as string]: i }}>
              <a href={`#${l.alvo}`} onClick={() => setAberto(false)}>
                {l.rotulo}
                <Ic nome="seta" tamanho={20} />
              </a>
            </li>
          ))}
        </ul>
        <div className="lph-gaveta-acoes">
          <a className="lph-bt lph-bt-contorno" href={whatsapp} target="_blank" rel="noopener noreferrer">
            <Ic nome="whatsapp" tamanho={18} />
            {textosHeader.whatsapp}
          </a>
          <a className="lph-bt lph-bt-cheio" href={`#${lp.header.cta.alvo}`} onClick={() => setAberto(false)}>
            {lp.header.cta.rotulo}
          </a>
        </div>
      </div>
    </header>
  );
}
