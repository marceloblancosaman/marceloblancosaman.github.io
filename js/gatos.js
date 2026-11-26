// Gatos del portafolio · parte 2: un gato detrás de cada tarjeta de proyecto.
// Con mouse: se asoma al pasar el cursor. Sin mouse (celular/tablet): se asoma el de la tarjeta
// más centrada mientras haces scroll. Clic o toque: caricia (~0,6 s) y se abre el caso.
(() => {
  const G = window.GATOS;
  const links = [...document.querySelectorAll('#proyectos .card .card-link')];
  if (!G || !links.length) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = matchMedia('(hover: none)').matches;   // depende de si hay cursor, no del ancho
  const PET_MS = 600;

  // Se turnan en orden: Pucho, Neo, Ñaña (PULSO → Pucho, Mi Salud → Neo, Botija → Ñaña)
  const cats = [
    { head: () => G.pucho, paws: G.paws('#9C9CA3', '#86868D'), bow: false },
    { head: () => G.neo, paws: G.paws('#1F1E20', '#3A3639'), bow: true },
    { head: (i) => G.nana('gato-nana-' + i), paws: G.paws('#F7F4EF', '#D9D3CA', '#D9D3CA'), bow: true },
  ];

  const items = links.map((link, i) => {
    const c = cats[i % 3];
    const g = document.createElement('div');
    g.className = 'gato';
    g.setAttribute('aria-hidden', 'true');
    g.innerHTML =
      `<svg class="gato-peek" viewBox="0 0 140 130" fill="none">${c.head(i)}</svg>` +
      `<svg class="gato-paws" viewBox="0 0 120 22">${c.paws}</svg>` +
      (c.bow ? `<svg class="gato-bow" viewBox="0 0 44 24">${G.bow}</svg>` : '');
    link.prepend(g);
    return { link, g };
  });

  const setActive = (it, on) => { it.g.classList.toggle('active', on); it.link.classList.toggle('gato-on', on); };

  // Cuando la sección aparece, los gatos asoman las orejitas uno tras otro
  const arrive = () => items.forEach((it, i) => setTimeout(() => it.g.classList.add('arrived'), reduce ? 0 : i * 90));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((en, obs) => { if (en.some((e) => e.isIntersecting)) { arrive(); obs.disconnect(); } }, { threshold: 0.05 });
    io.observe(document.querySelector('#proyectos .grid'));
  } else arrive();

  if (reduce) {
    // Sin movimiento: ya están asomados y quietos; el clic abre el caso como siempre
    items.forEach((it) => { it.g.classList.add('arrived'); setActive(it, true); });
    return;
  }

  // Caricia y luego abrir el caso. Un segundo clic/toque durante la caricia entra directo.
  items.forEach((it) => {
    it.link.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // nueva pestaña: normal
      e.preventDefault();
      const go = () => { location.href = it.link.href; };
      if (it.g.classList.contains('petting')) { clearTimeout(it.t); go(); return; }
      items.forEach((o) => o !== it && !o.g.classList.contains('petting') && setActive(o, false));
      setActive(it, true);
      it.g.classList.add('petting');
      it.t = setTimeout(go, PET_MS);
    });

    if (!touch) {
      it.link.addEventListener('mouseenter', () => setActive(it, true));
      it.link.addEventListener('mouseleave', () => { if (!it.g.classList.contains('petting')) setActive(it, false); });
    }
    it.link.addEventListener('focus', () => setActive(it, true));
    it.link.addEventListener('blur', () => { if (!touch && !it.g.classList.contains('petting')) setActive(it, false); });
  });

  // Al volver con «atrás», la página puede salir de la caché con un gato a medio acariciar
  addEventListener('pageshow', () => items.forEach((it) => { clearTimeout(it.t); it.g.classList.remove('petting'); if (!touch) setActive(it, false); }));

  // Celular/tablet: solo se asoma el gato de la tarjeta visible más centrada (franja central, lejos del menú)
  if (touch && 'IntersectionObserver' in window) {
    const inBand = new Set();
    const pick = () => {
      let best = null, bestD = Infinity;
      inBand.forEach((it) => {
        if (it.link.closest('.card').hidden) return;
        const r = it.link.querySelector('.ph').getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - innerHeight / 2);
        if (d < bestD) { bestD = d; best = it; }
      });
      items.forEach((it) => { if (!it.g.classList.contains('petting')) setActive(it, it === best); });
    };
    const byFig = new Map(items.map((it) => [it.link.querySelector('.ph'), it]));
    const band = new IntersectionObserver((en) => {
      en.forEach((e) => { const it = byFig.get(e.target); e.isIntersecting ? inBand.add(it) : inBand.delete(it); });
      pick();
    }, { rootMargin: '-30% 0px -30% 0px' });
    byFig.forEach((_, fig) => band.observe(fig));
    let raf = 0;
    addEventListener('scroll', () => { if (inBand.size > 1 && !raf) raf = requestAnimationFrame(() => { raf = 0; pick(); }); }, { passive: true });
    document.querySelectorAll('.chip[data-filter]').forEach((c) => c.addEventListener('click', () => setTimeout(pick, 500)));
  }
})();
