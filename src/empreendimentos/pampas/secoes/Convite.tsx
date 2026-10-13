import { FormLead } from "@/components/lp/FormLead";
import type { LP } from "@/empreendimentos/tipos";
import type { PampasConvite } from "../tipos";
import { Enfase, SecaoP, Tracado } from "./base";

// Contato: chamada central, traço da casa desenhando ao fundo e o formulário padrão
// (mesmo envio e mesma regra de sucesso das outras LPs) arrumado em uma linha no desktop.
export function Convite({ s, lp }: { s: PampasConvite; lp: LP }) {
  return (
    <SecaoP id="contato" className="pp-sec fundo-creme pp-convite">
      <Tracado aoVer className="pp-convite-tr" />
      <div className="casca pp-convite-in">
        <p className="pp-sobre rv">{s.sobretitulo}</p>
        <h2 className="pp-h2 rv rv2">
          <Enfase t={s.titulo} />
        </h2>
        <p className="pp-txt rv">{s.texto}</p>
        <FormLead lp={lp} formulario={s.formulario} cartao tom="acento" className="pp-form-linha rv" />
        <a className="pp-link" href={`https://wa.me/${lp.contato.whatsapp}`} target="_blank" rel="noopener noreferrer">
          {s.whatsapp}
        </a>
      </div>
    </SecaoP>
  );
}
