# Seu Podcast BH — Site

Site institucional e landing pages do **Seu Podcast BH**, estúdio de gravação em Belo Horizonte (podcast, cursos, lives, conteúdo, anúncios e VSL).

## Estrutura

```
/                 → Home (index.html)
/podcast/         → Estúdio para Podcast
/cursos/          → Gravação de Cursos
/lives/           → Estúdio para Lives
/conteudo/        → Conteúdo, Anúncios e VSL
/localizacao/     → Localização (SEO local)
/contato/         → Contato e agendamento
/assets/          → Logo, favicon e fotos dos estúdios
style.css         → Estilos (mobile-first)
script.js         → Menu, animações e carrossel
robots.txt        → Regras de rastreamento (Google + IA)
sitemap.xml       → Mapa do site
```

## Tecnologia

Site 100% estático (HTML, CSS e JavaScript puro). Não requer build.

## Publicação

Hospedado na **Cloudflare Pages**, com deploy automático a cada `git push` na branch `main`.
Configuração de build na Cloudflare:
- Framework preset: **None**
- Build command: *(vazio)*
- Build output directory: **/** (raiz)

## Como editar

1. Faça as alterações nos arquivos.
2. `git add .`
3. `git commit -m "descrição da mudança"`
4. `git push`

O site atualiza sozinho em 1–2 minutos.
