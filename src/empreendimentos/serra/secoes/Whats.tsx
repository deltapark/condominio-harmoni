import { FormLead } from "@/components/lp/FormLead";
import { IcTinta } from "@/components/lp/IcTinta";
import type { LP } from "@/empreendimentos/tipos";
import type { SerraWhats } from "../tipos";
import { Ambiente } from "./Ambiente";
import { CabP, SecaoS } from "./base";

// Contato: o WhatsApp como canal principal num cartão azul, o endereço do stand e o
// formulário padrão (mesmo envio e mesma regra de sucesso das outras LPs). No pé, uma
// faixa de serras azuladas com neblina e fios de rocha.
export function Whats({ s, lp }: { s: SerraWhats; lp: LP }) {
  return (
    <SecaoS id="contato" className="pp-sec sr-whats">
      <div className="casca sr-whats-in">
        <div>
          <CabP sobretitulo={s.sobretitulo} titulo={s.titulo} />
          <div className="sr-whats-cartao rv">
            <p className="sr-whats-linha">
              <IcTinta nome="whatsapp" className="sr-whats-ic" />
              <b>{s.whatsTitulo}</b>
            </p>
            <span>{s.whatsNumero}</span>
            <a className="bt bt-acento" href={`https://wa.me/${lp.contato.whatsapp}`} target="_blank" rel="noopener noreferrer">
              {s.whatsBotao}
            </a>
          </div>
          <p className="sr-whats-stand rv">
            <small>{s.stand.rotulo}</small>
            <span>{s.stand.texto}</span>
          </p>
        </div>
        <FormLead lp={lp} formulario={s.formulario} cartao tom="acento" className="rv" />
      </div>
      <div className="sr-whats-faixa">
        <Ambiente modo="azul-alto" />
      </div>
    </SecaoS>
  );
}
