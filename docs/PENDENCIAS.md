# Pendências

## Decisões do Thales

- Quais são as 14 LPs.
- Vitrine na raiz (`/`) e Vinhedos em `/vinhedos`: confirmado como plano, falta data.
- Menu da vitrine: manter o do HTML (Empreendimentos, Lazer, Onde estamos, Falar com consultor) ou usar o padrão das LPs.
- Linha de status + cidade no hero: manter ou cortar ("menos é mais").
- Jardins migra para `/jardins` neste repositório?

## Conteúdo

- Textos `[STATUS]`, `[CIDADE, UF]`, `[DESCRIÇÃO CURTA...]` e `[TELEFONE OFICIAL]` seguem como placeholder visível.
- Hortênsias, Reserva das Flores, Jardim dos Ipês 2 e 3 e Flor do Cerrado sem material.
- Jardins, Árbore, Vale e Essenza sem perspectivas, implantação e mapa.
- Conferir "Villa" vs "Vila" Imperial e as divergências de cidade (Essenza, Reserva do Parque). Detalhes em `docs/EMPREENDIMENTOS.md`.

## Técnico

- Salvar o HTML da vitrine em `referencia/vitrine-original.html` (fonte de verdade da fase 1).
- Endpoint de lead (CRM + RD Station) ainda não existe. O formulário não pode mostrar sucesso sem entrega.
- Otimizar imagens (AVIF/WebP) antes do deploy; ver `docs/IMAGENS.md`.
- Hostinger Cloud Enterprise: confirmar como será servida a pasta `out/` e os redirecionamentos.

## Vitrine migrada (2026-10-05)

- SEO: o hero tem 5 `<h1>` (um por slide), como no original. Definir qual vira o único h1 da página.
- Título da página vem do original; falta meta description (texto a aprovar) e imagem Open Graph.
- Rolagem com a roda: o site no WordPress usa um plugin de rolagem suave. No Next não foi portado; decidir se mantém.
- GTM do site atual (`GTM-K6S528DS`) e pixels ainda não foram colocados no projeto.
- Formulário: mostra "Recebemos seu contato" sem enviar nada. Ligar ao endpoint antes de publicar.
- Link "Site do empreendimento" da ficha e "Política de Privacidade" apontam para `#`.
- Hero e ficha repetem renders do Vinhedos nos outros Harmonis (provisório).

## Header e rodapé (2026-10-05)

- URLs das redes no rodapé (Facebook, Instagram, LinkedIn, WhatsApp). Hoje apontam para `#`.
- Telefone, WhatsApp, e-mail, endereço do stand e texto legal por empreendimento: o rodapé novo não mostra esses campos. Entram quando o cliente enviar.
- Os itens do menu "Empreendimentos" abrem a ficha. Quando as LPs existirem, viram links para `/<slug>`.
- Fotos de Árbore, Vale, Essenza e Hortênsias no menu são renders do Vinhedos (provisórios).
- Decidir se o Jost vale também para os títulos das seções (hoje só header e rodapé).

## LPs dos empreendimentos (2026-10-05)

### Bloqueia publicação
- Endpoint do lead (CRM + RD Station). Hoje o formulário de todas as LPs cai no aviso com WhatsApp.
- Registro jurídico de Jardins, Arbore, Vale e Essenza (matrícula, cartório, prefeitura). Hoje aparece `[PREENCHER]` no rodapé. O do Vinhedos é o oficial.
- Telefone e WhatsApp oficiais por empreendimento. Todas usam os números do Vinhedos ((51) 99719-6426 e (51) 9901-8575), os mesmos das LPs no ar.
- Política de Privacidade (link `#`) e URLs das redes sociais (`#`).

### Conteúdo
- Renders, implantação e mapa próprios de Jardins, Arbore, Vale e Essenza. Hoje são do Vinhedos, com o selo "Imagem provisória".
- Legenda da implantação dessas quatro: veio do modelo no ar (6 itens) e não bate com a planta provisória.
- Lista "item por item" (14 itens) das quatro: é a do modelo Jardins. Confirmar por empreendimento.
- Faixa "lotes a partir de 160m²" no Arbore e chamada "160m²" no Essenza: texto do modelo, confirmar a metragem de cada um.
- Localização do Vale: texto `[PREENCHER]`. Endereço e pontos de interesse de Jardins, Arbore e Vale: `[PREENCHER]`.
- Hortênsias: LP criada em 2026-10-07 (ver abaixo).

### Copy do cliente sinalizada
- Vale: "Escolha agora onde será seu larr". Corrigido para "lar" na tela; confirmar com o cliente.
- Vinhedos/Arbore: "Infraestrutura a altura do padrão..." está sem crase ("à altura"). Mantido como veio.
- Vinhedos: "Saúde para viver mais longe!" mantido como veio (talvez "viver mais").
- Essenza: o docx tem "CONEСТА" com letras cirílicas; usado "conecta".
- Arbore: o paragrafo da araucária tem travessão. Mantido como veio.
- Nome: logo e copy escrevem "Arbore"; a vitrine escreve "Árbore". Definir a grafia oficial.
- Hero do Vinhedos: a LP no ar digita "VIVA COM E... EM HARMONIA". Aqui as quatro palavras do conceito (segurança, exclusividade, comodidade, lazer) se alternam. Confirmar a intenção.

### Técnico
- Vitrine: o botão "site" da ficha já leva à LP. Os itens do menu "Empreendimentos" ainda abrem a ficha; decidir se viram link direto.
- Mapas das LPs são ilustrados, fora de escala. Trocar ou complementar com o Google Maps quando cada endereço for confirmado.
- Vinhedos: endereço do stand "Av. Senador Salgado Filho, 7700, Viamão/RS" veio da LP no ar. Confirmar.
- Pontos dos mapas (Aeroporto Salgado Filho, Av. Flores da Cunha, Freeway BR-290, RS-118, ULBRA, Park Shopping Canoas) vieram da copy de cada LP. Confirmar distâncias e ordem da rota do Essenza.
- Endereço do empreendimento: `[PREENCHER]` em Jardins, Arbore, Vale e Essenza.

## Vinhedos igual à LP no ar (2026-10-05)

- O hero repete a LP no ar: "VIVA COM E / EM HARMONIA" (texto cortado no original). Confirmar a frase.
- Os 9 ícones de infraestrutura vieram como SVG com PNG embutido (até 140 KB cada, 748 KB no total). Pedir os vetores ou converter para WebP antes do deploy.
- O mapa do stand é um iframe do Google Maps, como no ar. Ele carrega cookies do Google: avaliar junto com o banner de cookies e a política de privacidade.
- A LP no ar tem um banner de cookies e o popup do RD Station; nenhum dos dois foi portado.
- Decidir se as seções que ficaram sem uso (Destaques e as variantes do Vinhedos) saem do código.

## Essenza e Vale no layout aprovado (2026-10-05)

- Formulário: segue sem endpoint (CRM + RD Station). Hoje termina no WhatsApp com a mensagem pronta.
- Renders, planta e fotos ainda são do Vinhedos ("Imagem provisória"); as fotos de família se repetem entre LPs.
- Essenza: confirmar se a infraestrutura pode sair da lista de diferenciais (está no corte da rua). Desenho e ordem do trajeto são ilustrativos.
- Vale: categorias dos 14 itens e a foto de cada um são proposta (quadra e playground usam a da piscina). Posições do mapa ilustrativas; texto e endereço da localização `[PREENCHER]`.
- Vale: Grupo e Missão viraram uma seção só; a chamada "Escolha agora onde será seu lar" virou o título da implantação. Confirmar com o cliente.
- Jardins e Arbore refeitos em 2026-10-06 (ver abaixo).
- `package-lock.json` aparece alterado (campos `libc` removidos por outra versão do npm). Não foi commitado.

## Jardins e Arbore no layout aprovado (2026-10-06)

- Formulário: segue sem endpoint (CRM + RD Station), como nas outras LPs.
- Renders, planta e mapa ainda são do Vinhedos ("Imagem provisória"). As fotos de família são do banco da Nova Harmonia e se repetem entre LPs; a do conceito do Jardins é a da LP no ar do Vinhedos.
- Jardins: mapa ilustrativo, fora de escala, com a posição do condomínio provisória até o endereço. Título dos diferenciais ("Segurança, lazer e serviços, item por item") e da seção de perspectivas são proposta.
- Jardins: portaria de serviço, quadra e playground não têm foto própria, então não mostram a semente nos diferenciais. Pet place usa a foto da menina com o cachorro.
- Arbore: a ordem dos destinos na localização (centro, vias, Porto Alegre) é ilustrativa. A foto da família no lote é de outro bairro Nova Harmonia; trocar por foto do Arbore quando houver.
- Arbore: títulos "Um lar completo, item por item" e "Lazer completo, do pórtico à academia" são proposta.
- Arbore: o cartão do Arbore na vitrine "Conheça os outros Harmonis" (`outros.ts`) continua com o pórtico, o mesmo do Vinhedos. Dá para trocar pela piscina do hero novo; mantido para não mexer nas LPs aprovadas.
- Confirmar se a infraestrutura pode sair da lista de diferenciais nas duas (está no corte da rua).

## Vitrine refeita (2026-10-06)

### Confirmar com o cliente
- Hero: "Uma linha de condomínios **horizontais** pensada para morar bem." A palavra "horizontais" foi acrescentada à frase da vitrine original por SEO.
- Status do Vinhedos como "Lançamento" (vem do título da LP no ar) e do Jardins como "Lançamento em breve" (vitrine original). Árbore, Vale e Essenza: `[STATUS]`.
- Lotes "a partir de" de Jardins, Árbore, Vale e Essenza: `[PREENCHER]`.
- Números de lotes de "Quem constrói" (1.369, 1.895, 1.181 e 341) foram lidos em novaharmonia.com.br em 04/10/2026. Confirmar se seguem atuais.
- Galeria de obras: empreendimento da foto da ciclovia e local do stand da foto do prédio.
- Licença das fotos de banco (família panorâmica e família no jardim), que vieram do material do Jardins.
- Hortênsias: cidade, logo e fotos (aparece só no bloco "Em breve").
- Jardins e Essenza têm o mesmo título no hero das LPs; na vitrine o Essenza usa a frase curta da vitrine original.

### Técnico
- A vitrine não tem WhatsApp, telefone, e-mail nem stand próprios (`[WHATSAPP OFICIAL]`, `[ENDEREÇO]` na tela). Sem Harmoni escolhido, o formulário oferece o WhatsApp do Vinhedos.
- Endpoint do lead da vitrine: `contato.endpoint` em `src/dados/vitrine.ts`, vazio.
- Redirecionamento 301 da raiz atual (LP do Vinhedos no WordPress) para `/vinhedos/` e atualização dos anúncios antes de publicar.
- `nova-harmonia/institucional/quem-somos.webp` (2,4 MB) e `background-home.webp` (1,6 MB) não são usados por nenhuma página. Ficaram por serem do cliente; apagar se não forem voltar.

## Hortênsias (2026-10-07)

### Bloqueia publicação
- Logo oficial. O do site é provisório, montado com as letras dos logos irmãos.
- Registro jurídico, telefone e WhatsApp oficiais (hoje os do Vinhedos) e endpoint do lead, como nas outras LPs.

### Confirmar com o cliente
- Cidade: a copy diz Gravataí; a vitrine ainda mostra `[PREENCHER]` no bloco "Em breve". Decidir se o Hortênsias entra na coleção da vitrine (status, lote "a partir de", foto e forma da edição).
- "Quero aproveitar" virou "O futuro lar da sua família está aqui" (sobretítulo do contato). Os botões ("Quero garantir meu espaço", "Quero escolher meu lote", "Quero saber mais!") são proposta; nenhum fala em "lançamento", porque a copy tirou essa palavra.
- Propostas da revisão: a etiqueta "Lotes em condomínio fechado · Gravataí/RS" e o texto do hero, os textos curtos das tiras, a seção "Quem chega primeiro escolhe melhor" inteira, "Não é promessa", "Item por item", "Do portão a tudo o que importa", "Um projeto para ter orgulho", as perguntas das dúvidas e a descrição de SEO. Confirmar que o produto é lote e que a lista do modelo (portaria 24h, piscina, academia, salão, gourmet, brinquedoteca, minimercado) vale para o Hortênsias.
- Cartão "Um lote no seu nome": depende do registro do loteamento e da escritura (`[CONFIRMAR]`).
- `ciclovia.webp` aparece em "Não é promessa" como obra real Nova Harmonia, mas o empreendimento dela não está identificado (docs/IMAGENS.md).
- O conceito da copy ("No Harmoni Hortênsias, trabalhamos um conceito de bem estar…") não está na página revisada; só o primeiro parágrafo entrou (texto das tiras). Decidir se volta.

### Conteúdo
- Planta de lotes ilustrativa: 48 lotes desenhados e reservados inventados (`reservados` no dados.ts). Trocar pela planta e pela tabela de vendas reais; a área do lote está `[000] m²`.
- Mapa de rotas ilustrativo: posições aproximadas, não seguem a geografia real. Faltam endereço, tempos, distâncias e nomes das vias (`[00] min`, `[PREENCHER: via de acesso]`); o botão do Google Maps busca só "Gravataí RS" até haver endereço. Destinos: centro de Gravataí, RS-118, Freeway, Aeroporto Salgado Filho e Porto Alegre.
- Cartões de "garantir agora": entrada e parcelas `[PREENCHER]`. Dúvidas: respostas `[PREENCHER]`.
- Renders, coverflow e "item por item" são os do modelo (Vinhedos), com o selo de imagem provisória.

## Harmoni Pampas (2026-10-13)

- Endereço, texto de localização, nº de lotes, metragem mínima, área de lazer, status e condição de lançamento: `[PREENCHER]` na tela.
- Telefone e WhatsApp do Pampas: `contato.whatsapp` está vazio, então o botão do WhatsApp abre sem número. O Vale usa (51) 99719-6426; confirmar se é o mesmo time.
- Tempos de deslocamento das placas e o sentido das setas (aproximados a partir de Gravataí; conferir com o endereço).
- Renders, implantação e lista de lazer do Pampas (hoje: renders e masterplan do Vinhedos com selo, lista modelo da linha Harmoni).
- Licença das fotos do manual de marca (campo, capim e família no capim).
- Registro: matrícula, cartório e aprovação da prefeitura de Gravataí.
- Header com o logo geral Harmoni + "Pampas" em texto: composição nova, validar com a marca. O logo do Pampas é só vertical.
- Pampas na vitrine (`src/dados/empreendimentos.ts`): ainda não entrou.
- Copy criada (proposta): "Sua casa no ritmo do campo", "Ver o projeto", "Seu lugar em Gravataí", "Ambientes para viver o dia inteiro", "Antes de escolher, leia com calma", "Seja o primeiro a conhecer o Harmoni Pampas", "Prefere conversar agora? Chame no WhatsApp.", "Você está aqui", texto do hero e descrição de SEO.
- Material original do cliente estava em `out/pampas` (apagado a cada build). Cópia em `_interno/material-cliente/pampas/`; logo e recortes do manual em `public/img/pampas/`.

## Harmoni Serra (2026-10-13)

- Endereço, texto de localização, nº de lotes, tempos de deslocamento, WhatsApp e endereço do stand: `[PREENCHER]` na tela.
- Telefone e WhatsApp do Serra: `contato.whatsapp` está vazio, então o botão do WhatsApp abre sem número.
- Posições dos destinos nas curvas de nível são ilustrativas (as mesmas do Pampas, ambos em Gravataí); conferir com o endereço.
- Renders, implantação, legenda da planta e lista de lazer do Serra (hoje: renders, masterplan e legenda do Vinhedos com selo, lista modelo da linha Harmoni).
- Licença das fotos do manual de marca (rocha da capa e KV).
- Rocha de dois cumes do manual usada como símbolo: confirmar se pode, já que não se sabe se é uma formação real perto de Gravataí.
- Manual do Serra, slide do conceito: "Um ambient pensado..." foi corrigido para "Um ambiente pensado..." na LP. Confirmar com o cliente.
- Título de "Como construímos" já usado nas LPs: "Infraestrutura a altura do padrão Nova Harmonia de qualidade" (falta a crase em "à altura"). Sinalizado, não corrigido.
- Registro: matrícula, cartório e aprovação da prefeitura de Gravataí.
- Header com o logo geral Harmoni + "Serra" em texto (mesma composição do Pampas): validar com a marca.
- Serra na vitrine (`src/dados/empreendimentos.ts`): ainda não entrou.
- Copy criada (proposta): "Uma identidade construída ao longo do tempo" (adaptada do texto do manual), "Ver o projeto", rótulos dos mirantes "Imponência", "Solidez" e "Raízes", "Seu lugar em Gravataí", "Ambientes para viver o dia inteiro", "Infraestrutura e lazer, item por item", "Seja o primeiro a conhecer o Harmoni Serra", "Fale direto com um consultor", a nota do mapa, texto do hero e descrição de SEO.
- Material original do cliente estava em `out/serra` (apagado a cada build). Cópia em `_interno/material-cliente/serra/`; logo e recortes do manual em `public/img/serra/`.
