# Landing pages A/B — Seu Podcast BH

Cinco versões da home para teste A/B, todas mobile-first, cada uma num padrão de app que as pessoas já usam todo dia, com o mesmo conteúdo factual:

| Página | URL | Padrão familiar |
|---|---|---|
| Cinema | `/lp/cinema/` | App de streaming: capa grande, fileiras de cenários, ficha ao tocar |
| Produto | `/lp/produto/` | Página de produto premium: título gigante, "conheça a linha", comparativo |
| Perfil | `/lp/perfil/` | Perfil de rede social: stories dos estúdios, grade de posts, caixinha de perguntas |
| Pedido | `/lp/pedido/` | App de delivery: busca, categorias, banners, sacola com horas e total |
| Conversa | `/lp/conversa/` | App de mensagens: conversa guiada que recomenda o estúdio e abre o WhatsApp |

Só os padrões de interface foram usados: nenhum logo, nome ou cor de outra marca.

## Página reativa à busca (`/lp/intent.js`)

Lê, nesta ordem: `?i=` (forçado), `?keyword=`, `?utm_term=`, `?q=`, `?kw=`, `?termo=` e, por fim, o cookie `spt_lt` que o `track.js` já grava.
Classifica em: home, podcast, videocast, aluguel, preco, curso, live, anuncio, chroma, local, geral.
Troca H1, primeira frase (resposta de 40–60 palavras), foto, ordem dos estúdios, pergunta aberta e texto do CTA.

- Sem parâmetro (orgânico e Googlebot) a página mostra o texto padrão do HTML. Não há cloaking.
- Google Ads: no modelo de rastreamento já existe `keyword={keyword}`; o `track.js` lê esse parâmetro.
- Teste manual: `/lp/a/?i=curso`, `/lp/b/?keyword=quanto+custa+estudio+podcast`.

## Tracking

- GTM (head e noscript) e `/track.js` idênticos ao site.
- Links de WhatsApp com a URL do CRM (`/l?s=seupodcastbh.com.br`), classe `js-wa` e `data-loc` fixo por botão (o texto do botão muda, o rótulo do evento não).
- O `intent.js` só define `data-dest` (podcast, cursos, lives, conteudo, localizacao) antes do `track.js` rodar e envia os eventos extras `lp_intencao` e `lp_escolha` ao dataLayer.
- Para separar as versões no CRM, use `utm_content=lp-a` … `lp-d` na URL final de cada braço do experimento.

## SEO

As 4 páginas têm `canonical` para a home. Quando uma vencer, ela vira a nova `/` e as outras saem.
