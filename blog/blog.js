/* COPIMAX MAGAZINE — script condiviso (barra di lettura + indice attivo) */
(function () {
  var bar = document.querySelector('.mg-progress');
  var links = Array.prototype.slice.call(document.querySelectorAll('.mg-toc a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    if (bar && max > 0) bar.style.width = (h.scrollTop / max) * 100 + '%';

    var current = null;
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top < 140) current = s.id;
    });
    links.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // GA4: traccia i click su WhatsApp dal blog
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
    if (a && typeof gtag === 'function') {
      gtag('event', 'whatsapp_click', {
        page_path: location.pathname,
        cta_position: a.getAttribute('data-cta') || 'other'
      });
    }
  });
})();
