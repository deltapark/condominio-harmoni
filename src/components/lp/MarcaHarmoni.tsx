import { CASA, PALAVRA } from "./desenhosHarmoni";

/** Logo geral Harmoni (horizontal) pintado com currentColor; a casa pode ter cor própria via .mh-casa. */
export function MarcaHarmoni({ className }: { className?: string }) {
  return (
    <svg className={`mh ${className ?? ""}`} viewBox="0 0 1799 340" fill="currentColor" role="img" aria-label="Harmoni">
      <g className="mh-casa">
        {CASA.map((d) => (
          <path key={d.slice(0, 16)} d={d} />
        ))}
      </g>
      {PALAVRA.map((d) => (
        <path key={d.slice(0, 16)} d={d} />
      ))}
    </svg>
  );
}

/** Só a casa do logo Harmoni. */
export function CasaHarmoni({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 465 340" fill="currentColor" aria-hidden="true">
      {CASA.map((d) => (
        <path key={d.slice(0, 16)} d={d} />
      ))}
    </svg>
  );
}
