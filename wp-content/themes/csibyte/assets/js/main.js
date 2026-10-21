/* CSIBYTE · interacciones del sitio */
(function () {
  var doc = document.documentElement;
  doc.classList.add('js');

  var header = document.getElementById('csi-header');
  var burger = document.getElementById('csi-burger');
  var nav = document.getElementById('csi-nav');

  function setNavTop() {
    if (!header) return;
    var r = header.getBoundingClientRect();
    doc.style.setProperty('--csi-nav-top', Math.max(0, r.bottom) + 'px');
  }

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('is-open');
    burger && burger.setAttribute('aria-expanded', 'false');
    burger && burger.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('csi-menu-open');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      setNavTop();
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.classList.toggle('csi-menu-open', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 960) closeMenu(); });
  }

  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Animación suave de entrada.
  var targets = document.querySelectorAll('.csi-head, .csi-linea, .csi-servicio, .csi-producto, .csi-plan, .csi-razon, .csi-razones__media, .csi-contacto__form');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (el, i) {
      el.classList.add('csi-reveal');
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  }
})();
