/* =========================================================
   Seu Podcast BH — script.js
   1) Menu hambúrguer responsivo
   2) Navbar que muda ao rolar (efeito de scroll)
   3) Animações fade-in up via IntersectionObserver
   4) Contador animado nas estatísticas
   5) Lazy-load de vídeos do YouTube (facade = performance)
   6) Carrossel automático (marquee) das fotos no hero
   ========================================================= */

(function () {
  'use strict';

  /* ---------- 1) MENU HAMBÚRGUER ---------- */
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  // cria backdrop dinâmico
  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);

  function openMenu() {
    menu.classList.add('open');
    toggle.classList.add('open');
    backdrop.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    backdrop.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.contains('open') ? closeMenu() : openMenu();
    });
    backdrop.addEventListener('click', closeMenu);
    // fecha ao clicar num link
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    // fecha com ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });
  }

  /* ---------- 2) NAVBAR AO ROLAR ---------- */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 3) FADE-IN UP (IntersectionObserver) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- 4) CONTADOR ANIMADO ---------- */
  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const useDot = el.getAttribute('data-format') === 'dot';
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      let val = Math.floor(eased * target);
      let text = useDot ? val.toLocaleString('pt-BR') : String(val);
      el.textContent = prefix + text + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = prefix + (useDot ? target.toLocaleString('pt-BR') : target) + suffix;
    }
    requestAnimationFrame(frame);
  }

  const counters = document.querySelectorAll('.stat-num[data-count]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------- 5) LAZY-LOAD VÍDEOS YOUTUBE (facade) ---------- */
  const videoCards = document.querySelectorAll('.video-card[data-yt]');
  videoCards.forEach(function (card) {
    const id = card.getAttribute('data-yt');
    // thumbnail do YouTube como background (carrega leve)
    card.style.backgroundImage = "url('https://i.ytimg.com/vi/" + id + "/hqdefault.jpg')";
    // triângulo de play
    const tri = document.createElement('span');
    tri.className = 'play-tri';
    card.appendChild(tri);

    function play() {
      if (card.classList.contains('playing')) return;
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = 'Video de exemplo - Seu Podcast BH';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      card.appendChild(iframe);
      card.classList.add('playing');
    }
    card.addEventListener('click', play);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); }
    });
  });

  /* ---------- 6) CARROSSEL AUTOMÁTICO DO HERO (rAF) ---------- */
  // Loop infinito controlado por JavaScript — roda sempre, em desktop e mobile,
  // independente das configurações de animação do sistema. As fotos são
  // duplicadas para que, ao percorrer a largura de um conjunto, o reinício
  // seja imperceptível.
  const heroTrack = document.querySelector('.hero-track');
  if (heroTrack) {
    // 1) duplica o conjunto original (2x) para o loop ser contínuo
    const originals = Array.prototype.slice.call(heroTrack.children);
    originals.forEach(function (node) {
      const clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('img').forEach(function (img) { img.setAttribute('loading', 'lazy'); });
      heroTrack.appendChild(clone);
    });

    // 2) calcula a largura de UM conjunto (itens originais + margens)
    function setWidth() {
      let w = 0;
      originals.forEach(function (node) {
        const cs = window.getComputedStyle(node);
        w += node.getBoundingClientRect().width + parseFloat(cs.marginRight || 0);
      });
      return w;
    }

    // 3) animação por requestAnimationFrame
    const SPEED = 40; // pixels por segundo
    let pos = 0;
    let oneSet = setWidth();
    let paused = false;
    let last = null;

    function step(now) {
      if (last === null) last = now;
      const dt = (now - last) / 1000;
      last = now;
      if (!paused && oneSet > 0) {
        pos -= SPEED * dt;
        if (pos <= -oneSet) pos += oneSet; // reinicia sem salto visível
        heroTrack.style.transform = 'translateX(' + pos + 'px)';
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // pausa ao interagir; recalcula largura ao redimensionar
    const gallery = heroTrack.parentElement;
    gallery.addEventListener('mouseenter', function () { paused = true; });
    gallery.addEventListener('mouseleave', function () { paused = false; });
    let rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { oneSet = setWidth(); }, 150);
    });
    // garante medição correta após o carregamento das imagens
    window.addEventListener('load', function () { oneSet = setWidth(); });
  }

  /* ---------- Ano dinâmico no footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
