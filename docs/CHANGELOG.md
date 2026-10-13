# Changelog

## 2026-10-04

- Estrutura inicial do projeto: README, `docs/`, `.gitignore`.
- Plano de arquitetura e conteúdo-fonte lidos do site oficial.
- Imagens do material do cliente organizadas em `public/img/<slug>/...` (só Harmoni, logos Nova Harmonia e ícones).
- Inventário em `docs/IMAGENS.md` e lista dos empreendimentos em `docs/EMPREENDIMENTOS.md`.

## 2026-10-05

- Scaffold do projeto: Next 16 (App Router) + TypeScript + Tailwind v4 (sem preflight) com `output: 'export'`.
- Vitrine migrada do HTML original (`referencia/vitrine-original.html`, copiado do WordPress) para componentes em `src/secoes/vitrine/`, hooks em `src/hooks/` e CSS em `src/estilos/vitrine.css`.
- Dados separados dos componentes: `src/dados/empreendimentos.ts` (lista única dos Harmonis) e `src/dados/vitrine.ts` (textos e imagens da vitrine).
- Imagens do WordPress agora locais em `public/img/`. Adicionados `gourmet-13.webp` e `gourmet-14.webp` (originais do site) e `nova-harmonia/logo-vertical.svg` (logo do rodapé).
- Correções sem mudar o visual: removidos `100vw` do wrapper e `<base target="_blank">`; `width`/`height` em todas as imagens; ficha com estado próprio (pausa do slider, trava de rolagem e foco devolvido ao fechar).
- `line-height:1` nos campos do formulário: reproduz o reset de `label` do tema do WordPress, que definia a altura dos campos no site publicado.
- Limpeza: removidos `.gitkeep` de pastas que já têm arquivos e 3 imagens duplicadas (`gourmet.webp`, `nova-harmonia/logo.png` e `logo-2.png`). Os originais continuam na pasta Nova Harmonia.

## 2026-10-05 (header e rodapé)

- Header refeito: barra flutuante, vidro escuro no topo e creme sólido ao rolar (logo troca de creme para petróleo). Menu "Empreendimentos" com card do lançamento e lista com miniaturas; no celular o cartão continua a barra, cabe sem rolagem e esconde a barra de rolagem em telas muito baixas.
- Rodapé refeito em quatro colunas iguais, com filete no topo e na base, redes e "Voltar ao topo".
- Animações: entrada do header, cruzamento dos logos, menu em sequência, botão do menu mobile que vira X, filete e colunas do rodapé entrando ao rolar, brilho que flutua. Só transform/opacity, respeitam `prefers-reduced-motion`.
- Fonte Jost nos títulos do header e do rodapé (Lato segue no texto).
- Âncoras agora param 88px abaixo do topo (altura da barra).
- Removido o CSS antigo do header e do rodapé; novo CSS em `src/estilos/header.css` e `src/estilos/rodape.css`.
- Metadados embutidos removidos dos SVGs `harmoni-logo-creme`, `-petroleo` e `-editavel`; o desenho não muda.

## 2026-10-05 (LPs dos empreendimentos)

- Rota `/[slug]` com export estático: `/vinhedos`, `/jardins`, `/arbore`, `/vale`, `/essenza`.
- Contrato de dados em `src/empreendimentos/tipos.ts`. Cada LP declara no seu `dados.ts` as seções, a ordem e a variante de cada uma. Conteúdo da Nova Harmonia comum a todas (menu, formulário, grupo SFA, memorial) em `src/empreendimentos/comum.ts`; renders em `src/empreendimentos/renders.ts`.
- Seções em `src/secoes/lp/` com variantes: Hero (rotativo, dividido, editorial, moldura, essência), Conceito (pilares, colagem, manifesto), Perspectivas (acordeão, trilho, mosaico, palco, galeria), Diferenciais (grade numerada, lista, marquee, grupos), Implantação (lateral, abaixo), Grupo (editorial, escuro, missão), Localização (mapa, Google Maps), Chamada, Obra, Contato.
- Header no padrão do header-2: barra transparente no topo que vira pílula de vidro ao rolar; no celular, menu de tela cheia com trava de rolagem, Esc fecha.
- Rodapé no padrão do footer-section: quatro colunas (chamada para o consultor, navegação, telefones, redes com dica) e barra de base. Sem newsletter e sem modo escuro. Memorial jurídico completo fecha a página.
- Formulário de lead: só mostra sucesso com resposta 2xx do endpoint. Sem endpoint, avisa e oferece o WhatsApp com mensagem pronta.
- Header e rodapé portados sem as dependências do shadcn (Radix, cva, lucide): o comportamento é o mesmo e o projeto não ganhou pacotes.
- Paleta única da linha Harmoni (logos + manual do Jardins); cada tema só redistribui fundo, escuro e acento. Poppins nos títulos das LPs.
- Logos dos Harmonis com o respiro recortado (`logo-0N-recorte.svg`) para caber no header.
- `allowedDevOrigins` no `next.config.ts` para abrir o `next dev` por 127.0.0.1.
- `metadataBase` no layout: imagens de compartilhamento com URL absoluta em `condominioharmoni.com.br`.

## 2026-10-05 (LPs refeitas no layout aprovado)

- As cinco LPs refeitas seção por seção a partir do layout aprovado. Cada uma tem hero, carrossel, mapa e animação próprios; header, rodapé e formulário são iguais em todas.
- Fonte única: Jost Light nos títulos e no texto, peso 500 só no destaque. Poppins saiu do projeto.
- Ícones de linha em `public/img/icones/lp/` (42), com nome tipado em `src/empreendimentos/icones.ts`. Todos reagem ao hover com a cor de acento de cada tema.
- Hero: cinema (Vinhedos, palavras alternando), dividido (Jardins, foto abaixo do header), editorial com cartão (Arbore), foto de fundo (Vale) e painel (Essenza).
- Carrosséis: cinema com miniaturas (Vinhedos), leque (Jardins), pilha (Arbore), centro (Vale) e índice (Essenza). Funcionam no toque.
- Mapas ilustrados com endereço e pontos próximos: foto com zoom (Vinhedos), ilustrado (Jardins), radar (Arbore), abas por grupo (Vale) e rota (Essenza, vira lista vertical no celular).
- Formulário único: nome em linha cheia, telefone e e-mail lado a lado, aceite e botão em largura total.
- Raio de borda reduzido (4 a 8px) em cartões, campos e botões.
- Novas seções: Destaques (Vinhedos) e Missão (Vale). Removidos `Ampliavel`, `Icone`, `Revelar` e `Faixa`.
- Classes de variante das seções viraram `obra-v-*` e `imp-v-*` para não colidir com os blocos internos.
- Fichas da vitrine agora levam para `/jardins/`, `/arbore/`, `/vale/` e `/essenza/`.
- Favicon com o símbolo da Nova Harmonia (`src/app/icon.svg`).

## 2026-10-05 (Vinhedos igual à LP no ar)

- `/vinhedos` agora reproduz a LP do WordPress (condominioharmoni.com.br) seção por seção: mesmos textos, fotos, ícones, cores, fontes (Lato, Roboto nos botões, Poppins no título do stand) e ordem. Só o header e o rodapé são os do projeto.
- Nova seção `no-ar` no contrato (`tipos.ts`): página inteira própria entre header e rodapé. Componentes em `src/empreendimentos/vinhedos/secoes/` (`PaginaNoAr`, `CarrosselNoAr`), tipos em `vinhedos/tipos.ts`, CSS em `src/estilos/vinhedos-no-ar.css`.
- Carrossel com o comportamento do Elementor: 1 slide (2 no tablet), autoplay de 5 s, pausa no hover, para quando a pessoa mexe, setas e bolinhas.
- `FormLead` aceita `placeholders` (a página do Vinhedos usa os da LP no ar). O envio continua sem mostrar sucesso sem endpoint.
- Imagens novas, baixadas da LP no ar: `vinhedos/hero/fundo.webp`, `vinhedos/conceito/familia-desktop.webp` e `familia-celular.webp`, `vinhedos/chamada/experiencia.webp`, `vinhedos/perspectivas/lava-jato-interno.webp`, `vinhedos/logo-nova-harmonia.png` e os 20 ícones em `vinhedos/icones/`.
- A seção `Destaques` e as variantes que só o Vinhedos usava (hero cinema, carrossel cinema, diferenciais em abas, mapa com zoom) ficaram sem uso.

## 2026-10-05 (Essenza e Vale no layout aprovado)

- Essenza e Vale refeitos seção por seção conforme o protótipo aprovado na revisão das LPs. Header e rodapé continuam os do projeto; Vinhedos, Jardins e Arbore não mudam.
- Seções exclusivas em `src/empreendimentos/essenza/secoes/` e `src/empreendimentos/vale/secoes/`, tipos em `essenza/tipos.ts` e `vale/tipos.ts`. No contrato (`tipos.ts`) entram como `{ tipo: "essenza" | "vale", secao: ... }`, mais a seção comum `outros`.
- Essenza: hero mantido (painel branco); conceito em duas metades; trajeto desenhado pela rolagem; perspectivas em sanfona com tela cheia; foto que abre até a tela cheia; implantação em largura total; diferenciais por grupo com foto fixa; corte da rua com a lista na altura da imagem; grupo com faixa de setores; contato com o painel pela direita.
- Vale: hero com a janela em forma de casa (desenho do logo) e curvas de nível; frase com fotos dentro da linha; mapa noturno com ligações; galeria de arrastar com paralaxe; "Escolha agora onde será seu lar" virou o título da implantação; diferenciais em lista com foto que segue o mouse; corte com painel sobre o céu; grupo e missão numa seção só; contato com a janela-casa.
- Peças novas em `src/components/lp/`: `FormEtapas` (cadastro em duas etapas, mesma regra de só mostrar sucesso com 2xx), `CorteRua`, `PlantaZoom`, `Luz` (tela cheia), `Numeros`, `Fones`, `BarraCelular`, `IcTinta`, `SetaRedonda`, `Cabecalho`; seção `Outros` em `src/secoes/lp/`; hooks `useAoRolar` e `useEspera`.
- CSS novo em `src/estilos/lp-componentes.css`, `essenza.css` e `vale.css`, tudo com escopo `.ez`/`.vl`/tema: nenhum seletor novo casa com elementos de Vinhedos, Jardins ou Arbore (verificado no navegador).
- `LP.barraCelular`: barra fixa no celular com WhatsApp e o CTA do header (Essenza e Vale).
- Textos novos em `comum.ts` (`textosEtapas`, `textosInteracao`, `numerosGrupo`, `camadasCorte`, `textosOutros`, `missaoDestaque`); cartões dos outros Harmonis em `src/empreendimentos/outros.ts`.

## 2026-10-06 (Jardins e Arbore no layout aprovado)

- Jardins e Arbore refeitos seção por seção conforme o protótipo aprovado na revisão das LPs, no mesmo padrão do Essenza e do Vale. Rotas `/jardins/` e `/arbore/` (as fichas da vitrine e os cartões "Conheça os outros Harmonis" já apontam para elas). Vinhedos, Vale, Essenza e a vitrine não mudam: mesmo HTML e mesmo estilo computado em todos os elementos, no desktop e no celular (comparado com o build anterior).
- Seções exclusivas em `src/empreendimentos/jardins/secoes/` e `src/empreendimentos/arbore/secoes/`, tipos em `jardins/tipos.ts` e `arbore/tipos.ts`. No contrato entram como `{ tipo: "jardins" | "arbore", secao: ... }`.
- Jardins (sálvia, linho e verde-mata; motivos: a folha e a semente): foto do hero que nasce como semente e abre em folha, com selo girando; conceito sobre o linho com a foto vertical da família (a da LP no ar do Vinhedos); mapa ilustrado que se afasta com a rolagem até Porto Alegre; perspectivas com palco em folha e miniaturas redondas (a foto nova abre em círculo, o anel mostra o tempo); implantação com lupa (no toque, tela cheia); diferenciais em canteiros com a foto que abre da semente; corte da rua dividido entre superfície e subsolo; grupo com colunas de fotos em paralaxe; contato com a folha espelhada.
- Arbore (papel, nogueira e laranja; motivo: o ripado de madeira e o que cresce de baixo para cima): hero com a foto em ripas até a borda; conceito com a foto que abre como porta de correr; manifesto atrás de uma persiana que abre com a rolagem; tronco que cresce e abre um galho por destino; perspectivas em mosaico que troca de lugar (FLIP); implantação com a legenda na altura da planta; diferenciais em gavetas; corte anotado com linhas de chamada na altura de cada camada; grupo com os lotes em barras; contato com as ripas.
- Repetições fundidas: o parágrafo sobre Porto Alegre ficou só na Localização (nas duas LPs); "Condições exclusivas de lançamento!" (Jardins) virou o último canteiro dos diferenciais; "Fique por dentro de tudo do Harmoni Arbore" virou o título do contato. A infraestrutura saiu dos diferenciais das duas (está no corte da rua), como no Essenza.
- `barraCelular` ligada no Jardins e no Arbore.
- Fotos novas no código (os arquivos já existiam): `fotosNovaHarmonia` em `renders.ts` com a família no lote (`nova-harmonia/institucional/familia.webp`) e a foto vertical do conceito do Vinhedos (`vinhedos/conceito/familia-celular.webp`).
- Textos novos em `textosInteracao` (`comum.ts`). CSS em `src/estilos/jardins.css` e `arbore.css` com escopo `.jd`/`.ab`; as regras base das seções revisadas em `lp-componentes.css` passaram a valer também para `.jd` e `.ab`.
- Com isso, as variantes genéricas que só Jardins e Arbore usavam em `src/secoes/lp/` (hero dividido e editorial, leque, pilha, mapa ilustrado e radar, entre outras) ficaram sem uso. Não foram apagadas.

## 2026-10-06 (vitrine refeita)

- Vitrine (`/`) refeita a partir do protótipo aprovado: hero em faixas (uma por Harmoni, alarga no hover e cada faixa é o link da LP), faixa de números, manifesto com as palavras acendendo na rolagem, panorâmica, coleção em edições, mapa, infraestrutura, quem constrói, perguntas, contato e rodapé.
- Coleção em "edições": cada Harmoni ocupa a grade de 12 colunas de um jeito (tela cheia, sangra à esquerda, sangra à direita, contido no meio, vertical). Filtro por cidade compartilhado com o mapa.
- Larguras como sistema: texto 680, casca 1200, ampla 1560 e cheia (`.g` e `.g12` em `src/estilos/vitrine.css`).
- Vinhedos entrou na vitrine (antes não estava) e Hortênsias saiu da lista para o bloco "Em breve".
- Mapa esquemático de Porto Alegre com anéis de 10 em 10 km; distâncias em linha reta calculadas pelas coordenadas das cidades.
- "Quem constrói": lotes publicados no site da Nova Harmonia (Parque Harmonia, Villa Imperial, Reserva Harmonia Caruaru, The One) e galeria arrastável de fotos reais de obra.
- Formulário da vitrine com a mesma regra das LPs: só mostra sucesso com resposta 2xx; sem endpoint oferece o WhatsApp do Harmoni escolhido com a mensagem pronta.
- SEO: um único h1, title e description próprios, canonical, Open Graph e Twitter card, JSON-LD (Organization, WebSite, ItemList de GatedResidenceCommunity e FAQPage), `sitemap.xml` e `robots.txt` gerados no build. Links internos para as cinco LPs no hero, na coleção, no menu e no rodapé.
- Fonte única Jost em todo o site (peso 200 adicionado para os títulos grandes). Lato saiu do projeto.
- Ficha em modal removida: os Harmonis levam direto à LP.
- Removidos: `Faixa`, `FichaModal`, `Hero`, `Lazer`, `ListaEmpreendimentos`, `Localizacao`, `NovaHarmonia`, `useParallax`, `dados/icones.ts`, `estilos/header.css` e `estilos/rodape.css`. `overflow-x: clip` e `scrollbar-gutter` foram para o `globals.css` (as LPs dependiam deles).
- Novos hooks: `useRolagem` (parallax e palavras numa só volta de rAF), `useContadores` e `useReveal` com seletor.
- Rodapé da vitrine sem a marca d'água do logo no final: termina na linha legal.

## 2026-10-06 (junção da revisão das LPs com a vitrine)

- Branch `revisao-lps` (Vinhedos, Vale, Essenza, Jardins e Arbore no layout aprovado) junto ao `main`.
- Lato agora é carregado dentro da página do Vinhedos (`PaginaNoAr.tsx`), junto com Roboto e Poppins: o layout deixou de carregar o Lato quando a vitrine passou a usar só Jost.
- Cartões "Conheça os outros Harmonis" (`empreendimentos/outros.ts`) leem a frase da vitrine nova; o Vinhedos mantém o subtítulo da LP no ar.

## 2026-10-06 (hero do Vale)

- Hero do Vale sem a janela em forma de casa: os três ambientes viram fundo, quase apagados sob o azul da noite (16% de opacidade, só a luminosidade da foto), com as curvas de nível por cima. O contorno da casa continua na seção de contato.
- Vinhedos segue como réplica da LP no ar (decidido).

## 2026-10-07 (Hortênsias)

- Nova LP `/hortensias/` (Harmoni Hortênsias, Gravataí/RS), com a copy do cliente sobre a base do Jardins: "Gravataí, em sua mais bela forma.", "Cadastre-se em um novo estilo de vida.", o conceito "Um condomínio fechado para sua família viver no melhor!", "Garanta seu espaço neste projeto!" com o botão "O futuro lar da sua família está aqui" e "Conheça em detalhes o Harmoni Hortênsias" no contato. O rótulo do cadastro já era "Nome completo" (texto comum a todas as LPs).
- Layout próprio, no mesmo padrão das outras LPs revisadas: seções exclusivas em `src/empreendimentos/hortensias/secoes/`, tipos em `hortensias/tipos.ts`, CSS em `src/estilos/hortensias.css` com escopo `.hs`, tema `hortensias` no contrato.
- Névoa, anil e as três cores da hortênsia (azul, lilás e rosa); motivos: o florete de quatro pétalas e o cacho de círculos. Hero com a foto que floresce em círculos (máscara animada com `@property`, sem suporte aparece inteira); conceito com três fotos redondas que se abrem com a rolagem; localização numa flor-bússola (uma pétala por destino, na direção dele); perspectivas em coverflow 3D (arraste, setas, teclado, troca a cada 6 s); implantação que abre em íris com zoom e arraste; diferenciais num cacho de flores, uma cor por categoria, com a chamada ao lado; corte da rua com rolagem guiada (imagem fixa, cada camada acende quando o texto passa); grupo com anel de fotos que gira na rolagem; contato com a panorâmica no anil.
- Logo provisório em `public/img/hortensias/logo/` (ver `docs/IMAGENS.md`).
- O cartão do Hortênsias entrou em "Conheça os outros Harmonis" de todas as LPs, com o título da LP como chamada (o Hortênsias ainda não está na coleção da vitrine).
- `.hs` entrou nas regras base das seções revisadas (`lp-componentes.css`). Textos novos em `textosInteracao` (`comum.ts`); fotos `familiaBrincando` e `familiaPanorama` em `estiloDeVida` (`renders.ts`).
- Hortênsias refeito a partir do protótipo aprovado ("Versão 4", no canvas de protótipos), com o header e o rodapé padrão dos Harmonis:
  - Cores da linha Harmoni (petróleo, creme e laranja); saíram o anil e o lilás da primeira versão, o florete e o desenho de flor. Motivo novo: o lote. Fotos sem canto arredondado, sobretítulos sem o traço.
  - Hero `mosaico`: foto da família em largura total sob uma grade de 50 lotes; cada lote é um ambiente (renders provisórios) e, a cada 12 s, uma onda diagonal faz todos sumirem e mostra a família. O mouse abre o lote sob o cursor. Título da copy ("Gravataí, em sua mais bela forma.") e o cadastro num cartão.
  - `tiras` (segurança, lazer, infraestrutura, qualidade de vida), `cachos` (o coverflow aprovado, agora sobre a própria foto desfocada e com o título centralizado), `cartoes` ("Quem chega primeiro escolhe melhor", cartões que viram sozinhos), `provas` (fotos reais de obra Nova Harmonia em preto e branco que ganham cor), `itens` (a foto do espaço inunda a seção a partir do cursor), `lotes` (planta ilustrativa clicável; o lote escolhido aparece no contato e vai junto com o cadastro), `frase`, `rotas` (mapa de rotas no estilo de app: destinos, tempo, passos, rota traçada com um ponto andando, zoom), `stand`, `duvidas` e `contato`.
  - O que anda sozinho é CSS (funciona no celular e para com movimento reduzido); nenhum relógio redesenha a página.
  - `FormEtapas` ganhou `extra` (campos que vão junto com o cadastro; o lote também entra na mensagem do WhatsApp). Fotos institucionais novas em `fotosNovaHarmonia` (obra, ciclovia, stand, pôr do sol).

## 2026-10-13 (LP do Harmoni Pampas)

- Nova LP `/pampas` (Gravataí/RS), tradução do protótipo aprovado (combinação H5 · C3 · L8 · P6 · I3 · D1 · O6 · G4 · R1 · K4).
- Seções exclusivas em `src/empreendimentos/pampas/secoes/`: hero com foto do campo e capim animado em canvas, conceito do manual com palavras que acendem na rolagem, localização em placas de estrada (o céu começa na cor da seção de cima), carrossel 3D, números + lupa na implantação, grade de diferenciais com filtro, antes e depois com fotos reais de obra, empreendimentos da Nova Harmonia, Revista Harmonia e contato com o formulário padrão em uma linha.
- Tema em `src/estilos/pampas.css` (classes `pp-`), cores do SVG do logo e do manual.
- Núcleo: `header.marca` opcional no `LP` troca o logo do header pelo logo geral Harmoni com o nome ao lado (`MarcaHarmoni.tsx`, desenhos em `desenhosHarmoni.ts`). As outras LPs não usam e não mudam.
- Jost passa a carregar o itálico de verdade (ênfase dos títulos do Pampas).
- Cartões "outros Harmonis" incluem o Pampas, com a foto do manual e o slogan (ele ainda não está na vitrine).
