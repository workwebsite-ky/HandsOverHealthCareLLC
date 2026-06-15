/* ============================================================
   HANDS OVER HEALTH CARE LLC — shared interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Sticky nav state (transparent at top -> glass on scroll) ---------- */
  const nav = document.querySelector('.nav');
  const isHome = document.body.classList.contains('home');
  function onScroll() {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', y > 30);
      // only the home hero is dark behind the nav; interior pages use a dark page-head too
      nav.classList.toggle('at-top', y < 40);
    }
    // back-to-top button
    if (toTop) toTop.classList.toggle('show', y > 600);
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
      const open = document.body.classList.contains('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close menu when a link is tapped
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1500;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target % 1 === 0
            ? Math.round(target * eased)
            : (target * eased).toFixed(1);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => co.observe(el));
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq__item').forEach(item => {
    const q = item.querySelector('.faq__q');
    const a = item.querySelector('.faq__a');
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      // close siblings for a tidy single-open accordion
      item.closest('.faq').querySelectorAll('.faq__item.open').forEach(o => {
        if (o !== item) { o.classList.remove('open'); o.querySelector('.faq__a').style.maxHeight = null; }
      });
      item.classList.toggle('open', !open);
      a.style.maxHeight = open ? null : a.scrollHeight + 'px';
      q.setAttribute('aria-expanded', !open ? 'true' : 'false');
    });
  });

  /* ---------- Contact form (mailto fallback, no backend required) ---------- */
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const service = (data.get('service') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      const to = form.dataset.email || 'info@handsoverhealthcare.com';
      const subject = encodeURIComponent(`Care inquiry from ${name || 'website visitor'}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService needed: ${service}\n\n${message}`
      );
      // open the visitor's mail client pre-filled
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      const ok = form.querySelector('.form__ok');
      if (ok) { ok.classList.add('show'); ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      form.reset();
    });
  }

  /* ---------- Back to top ---------- */
  const toTop = document.querySelector('.to-top');
  if (toTop) toTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'reduce' in window ? 'auto' : 'smooth' }));

  /* ---------- Footer year ---------- */
  const yr = document.querySelector('#year');
  if (yr) yr.textContent = new Date().getFullYear();

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
