/* Seu Podcast BH — motor de intenção das landing pages A/B (/lp/a … /lp/d)
   Lê o termo que trouxe a pessoa (Google Ads {keyword}, utm_term, ?q=, ?i=)
   e ajusta H1, primeira frase, foto, ordem dos estúdios, perguntas e CTA.
   Sem parâmetro (busca orgânica, Googlebot) a página fica no texto padrão
   do HTML: o conteúdo indexado é sempre o mesmo, sem cloaking.

   NÃO mexe no tracking: GTM e /track.js continuam iguais. Este arquivo só
   define data-dest nos links do WhatsApp ANTES do track.js reescrevê-los
   (o track.js já lê data-dest) e envia um evento extra "lp_intencao". */
(function () {
  'use strict';

  var PRECO_MIN = 'R$ 350'; // [CONFIRMAR] preço mínimo oficial (site: 290/350 · anúncios: 250)

  var I = {
    home: {
      chip: 'Estúdio', dest: '',
      title: 'Estúdio de Podcast e Gravação em BH | Seu Podcast BH',
      h1: 'Estúdio de podcast e gravação em BH',
      lead: 'O Seu Podcast BH é um estúdio para gravar podcast, videocast, cursos e lives na Pampulha, em Belo Horizonte. São 6 cenários com 3 câmeras, microfones Shure SM7B e operador acompanhando a gravação. A hora começa em ' + PRECO_MIN + ' e você agenda pelo WhatsApp.',
      cta: 'Ver horários no WhatsApp', hero: 'six', order: ['six', 'eclipse', 'design', 'one', 'colors', 'music'], faq: 'preco'
    },
    podcast: {
      chip: 'Podcast', dest: 'podcast',
      title: 'Estúdio de Podcast em BH | Seu Podcast BH',
      h1: 'Estúdio de podcast em BH',
      lead: 'Grave seu podcast na Pampulha, em Belo Horizonte, com 3 câmeras, 4 microfones Shure SM7B e um operador cuidando da técnica. São 6 cenários, do intimista ao talk show com cadeiras presidente. A hora começa em ' + PRECO_MIN + ' e o episódio pode sair editado.',
      cta: 'Reservar meu podcast', hero: 'six', order: ['six', 'eclipse', 'design', 'music', 'one', 'colors'], faq: 'preco'
    },
    videocast: {
      chip: 'Videocast', dest: 'podcast',
      title: 'Estúdio de Videocast em BH | Seu Podcast BH',
      h1: 'Estúdio de videocast em BH',
      lead: 'Videocast é o podcast gravado em vídeo, com troca de câmera como num programa de TV. Aqui você grava com 3 câmeras (Sony A7 III, ZV-E10 e Blackmagic 4K), áudio em Shure SM7B e operador no set, na Pampulha, em BH. A partir de ' + PRECO_MIN + ' a hora.',
      cta: 'Reservar meu videocast', hero: 'music', order: ['music', 'eclipse', 'six', 'design', 'one', 'colors'], faq: 'videocast'
    },
    aluguel: {
      chip: 'Aluguel por hora', dest: 'podcast',
      title: 'Sala de Podcast para Alugar em BH | Seu Podcast BH',
      h1: 'Sala de podcast para alugar em BH',
      lead: 'Você aluga por hora um estúdio pronto: cenário montado, câmeras, microfones, luz e operador cuidando da técnica. São 6 cenários na Pampulha, em Belo Horizonte, de ' + PRECO_MIN + ' a R$ 1.500 por hora, com preço menor em pacotes de mais horas.',
      cta: 'Ver horários livres', hero: 'design', order: ['six', 'eclipse', 'design', 'one', 'colors', 'music'], faq: 'incluso'
    },
    preco: {
      chip: 'Preços', dest: 'podcast',
      title: 'Quanto Custa Alugar Estúdio de Podcast em BH | Seu Podcast BH',
      h1: 'Quanto custa alugar estúdio de podcast em BH',
      lead: 'No Seu Podcast BH a hora de estúdio vai de ' + PRECO_MIN + ' (Estúdio Six) a R$ 1.500 (Estúdio Music). Todos os cenários têm 3 câmeras, microfones Shure SM7B, iluminação e operador. Pacotes com mais horas baixam o valor por hora.',
      cta: 'Pedir orçamento no WhatsApp', hero: 'design', order: ['six', 'eclipse', 'design', 'one', 'colors', 'music'], faq: 'preco'
    },
    curso: {
      chip: 'Curso online', dest: 'cursos',
      title: 'Estúdio para Gravar Curso Online em BH | Seu Podcast BH',
      h1: 'Estúdio para gravar curso online em BH',
      lead: 'Para gravar aulas, o Seu Podcast BH tem teleprompter, chroma key e iluminação profissional em 6 cenários na Pampulha, em Belo Horizonte. Já são mais de 1.000 horas de curso gravadas aqui. A hora começa em ' + PRECO_MIN + ' e pacotes por módulo saem mais baratos.',
      cta: 'Montar pacote do meu curso', hero: 'one', order: ['one', 'colors', 'design', 'music', 'six', 'eclipse'], faq: 'teleprompter'
    },
    live: {
      chip: 'Live', dest: 'lives',
      title: 'Estúdio para Live em BH | Seu Podcast BH',
      h1: 'Estúdio para live em BH',
      lead: 'Faça sua transmissão ao vivo com áudio de estúdio, troca de câmeras e um operador cuidando do streaming. Dá para transmitir no YouTube e no Instagram ao mesmo tempo, com até 5 pessoas no set, na Pampulha, em Belo Horizonte. A partir de ' + PRECO_MIN + ' a hora.',
      cta: 'Reservar minha live', hero: 'music', order: ['music', 'eclipse', 'design', 'six', 'one', 'colors'], faq: 'live'
    },
    anuncio: {
      chip: 'Anúncios e VSL', dest: 'conteudo',
      title: 'Estúdio para Gravar Anúncios e VSL em BH | Seu Podcast BH',
      h1: 'Estúdio para gravar anúncios e VSL em BH',
      lead: 'Grave vários criativos numa sessão: anúncios, VSL e vídeos verticais para Reels e Shorts, com teleprompter e chroma key. Os vídeos gravados aqui já geraram mais de R$ 8 milhões em anúncios para clientes. Fica na Pampulha, em BH, a partir de ' + PRECO_MIN + ' a hora.',
      cta: 'Agendar gravação dos criativos', hero: 'colors', order: ['colors', 'design', 'one', 'six', 'music', 'eclipse'], faq: 'cortes'
    },
    chroma: {
      chip: 'Chroma key', dest: 'conteudo',
      title: 'Estúdio com Chroma Key em BH | Seu Podcast BH',
      h1: 'Estúdio com chroma key em BH',
      lead: 'O Estúdio Colors tem fundo verde para chroma key e fundos coloridos, com iluminação profissional e teleprompter. É o cenário para cursos, anúncios e VSL que pedem um fundo personalizado. Fica na Pampulha, em Belo Horizonte, e custa R$ 990 a hora.',
      cta: 'Reservar o Estúdio Colors', hero: 'colors', order: ['colors', 'one', 'design', 'music', 'six', 'eclipse'], faq: 'teleprompter'
    },
    local: {
      chip: 'Na Pampulha', dest: 'localizacao',
      title: 'Estúdio de Gravação na Pampulha, BH | Seu Podcast BH',
      h1: 'Estúdio de gravação na Pampulha, em BH',
      lead: 'O Seu Podcast BH fica na Rua Rovigo, 800, região da Pampulha, em Belo Horizonte. Funciona de segunda a sábado, das 8h às 20h, com 6 cenários para podcast, curso, live e anúncios. Agende pelo WhatsApp (31) 99726-1483 e receba as orientações de acesso.',
      cta: 'Agendar visita ao estúdio', hero: 'design', order: ['six', 'eclipse', 'design', 'one', 'colors', 'music'], faq: 'onde'
    },
    geral: {
      chip: 'Gravação de vídeo', dest: '',
      title: 'Estúdio de Gravação de Vídeo em BH | Seu Podcast BH',
      h1: 'Estúdio de gravação de vídeo em BH',
      lead: 'Grave podcast, videocast, aulas, lives e anúncios em 6 cenários prontos na Pampulha, em Belo Horizonte. Cada estúdio tem 3 câmeras, microfones Shure SM7B, iluminação profissional e operador cuidando da técnica. A hora começa em ' + PRECO_MIN + ' e você agenda pelo WhatsApp.',
      cta: 'Ver horários no WhatsApp', hero: 'design', order: ['design', 'six', 'eclipse', 'one', 'colors', 'music'], faq: 'incluso'
    }
  };

  /* Regras: a primeira que casar vence (do mais específico ao mais geral) */
  var R = [
    ['local', /(perto|proxim|pampulha|endereco|rovigo|onde fica|localiza|como chegar)/],
    ['preco', /(preco|valor|quanto|custa|barat|orcamento|tabela)/],
    ['chroma', /(chroma|croma|fundo verde|fundo infinito|fundo colorido)/],
    ['anuncio', /(anuncio|vsl|criativo|ugc|reels|tiktok|shorts|comercial|publicidade|propaganda|video de venda|conteudo)/],
    ['live', /(\blive|ao vivo|transmiss|stream)/],
    ['curso', /(curso|aula|ead\b|treinamento|infoproduto|mentoria)/],
    ['videocast', /(videocast|video ?cast|video ?podcast)/],
    ['aluguel', /(alug|locacao|\bloca|sala|espaco)/],
    ['podcast', /(pod ?cast|entrevista|talk ?show|mesacast)/],
    ['geral', /(estudio|studio|gravacao|gravar|filmagem|video)/]
  ];

  function norm(s) {
    try { s = decodeURIComponent(String(s || '').replace(/\+/g, ' ')); } catch (e) { s = String(s || ''); }
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function cookieTerm() {
    try {
      var m = document.cookie.match('(?:^|; )spt_lt=([^;]*)');
      var o = m ? JSON.parse(decodeURIComponent(m[1])) : {};
      return o.keyword || o.utm_term || '';
    } catch (e) { return ''; }
  }
  function detect() {
    var q = new URLSearchParams(location.search || '');
    /* também aceita #i=curso ou #keyword=... (prévias e links internos) */
    var h = new URLSearchParams((location.hash || '').replace(/^#/, ''));
    h.forEach(function (v, k) { if (!q.get(k)) q.set(k, v); });
    var forced = norm(q.get('i'));
    if (forced && I[forced]) return { key: forced, term: forced, src: 'i' };
    var term = q.get('keyword') || q.get('utm_term') || q.get('q') || q.get('kw') || q.get('termo') || '';
    var src = term ? 'url' : '';
    if (!term) { term = cookieTerm(); src = term ? 'cookie' : ''; }
    var t = norm(term);
    if (t) for (var i = 0; i < R.length; i++) if (R[i][1].test(t)) return { key: R[i][0], term: t, src: src };
    return { key: 'home', term: t, src: src || 'padrao' };
  }

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function setDest(dest, afterTrack) {
    $$('a.js-wa').forEach(function (a) {
      if (dest) a.setAttribute('data-dest', dest); else a.removeAttribute('data-dest');
      if (!afterTrack) return;
      /* depois do track.js: troca só o parâmetro d do link já reescrito */
      try {
        var u = new URL(a.href);
        if (dest) u.searchParams.set('d', dest); else u.searchParams.delete('d');
        a.setAttribute('href', u.toString());
      } catch (e) {}
    });
  }

  function apply(key, opts) {
    opts = opts || {};
    var d = I[key] || I.home;
    $$('[data-i="h1"]').forEach(function (el) { el.textContent = d.h1; });
    $$('[data-i="lead"]').forEach(function (el) { el.textContent = d.lead; });
    $$('[data-i="cta"]').forEach(function (el) { el.textContent = d.cta; });
    $$('[data-i="chip"]').forEach(function (el) { el.textContent = d.chip; });
    if (key !== 'home') document.title = d.title;

    var img = $('img[data-i="hero"]');
    if (img && img.getAttribute('data-k') !== d.hero) {
      var s = $('[data-studio="' + d.hero + '"] img');
      if (s) {
        img.src = s.getAttribute('data-full') || s.currentSrc || s.src;
        img.removeAttribute('srcset');
        img.alt = s.alt;
        img.setAttribute('data-k', d.hero);
      }
    }

    var list = $('[data-i="studios"]');
    if (list) {
      d.order.forEach(function (k) { var el = $('[data-studio="' + k + '"]', list); if (el) list.appendChild(el); });
      $$('[data-studio]', list).forEach(function (el, n) { el.toggleAttribute('data-rec', n === 0); });
    }

    var faq = $('[data-i="faq"]');
    if (faq) {
      var first = $('[data-q="' + d.faq + '"]', faq);
      if (first) {
        faq.insertBefore(first, faq.firstElementChild);
        if (opts.openFaq !== false && first.tagName === 'DETAILS') first.open = true;
      }
    }

    $$('[data-pick]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-pick') === key ? 'true' : 'false'); });
    setDest(d.dest, !!opts.afterTrack);
    document.documentElement.setAttribute('data-intent', key);
    return d;
  }

  var hit = detect();
  apply(hit.key);
  document.documentElement.classList.remove('i-wait');

  try {
    (window.dataLayer = window.dataLayer || []).push({
      event: 'lp_intencao', lp_versao: document.documentElement.getAttribute('data-lp') || '',
      intencao: hit.key, termo_busca: hit.term, origem_termo: hit.src
    });
  } catch (e) {}

  /* Versão C (e qualquer botão com data-pick): troca de intenção por toque */
  document.addEventListener('click', function (ev) {
    var b = ev.target && ev.target.closest ? ev.target.closest('[data-pick]') : null;
    if (!b) return;
    var k = b.getAttribute('data-pick');
    apply(k, { afterTrack: true, openFaq: false });
    try { (window.dataLayer = window.dataLayer || []).push({ event: 'lp_escolha', lp_versao: document.documentElement.getAttribute('data-lp') || '', intencao: k }); } catch (e) {}
  });

  window.SPB = { apply: apply, detect: detect, intents: I };
})();
