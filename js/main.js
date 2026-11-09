// Portafolio · Marcelo Blanco
// Menú móvil, filtros, efectos de scroll, cursor, barra de lectura, copiar correo y mini demos.
(() => {
  const root = document.documentElement;
  const EN = root.lang === 'en';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) root.classList.add('motion');

  /* ---------- menú móvil ---------- */
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  const main = document.getElementById('main');
  const setMenu = (open) => {
    if (!btn || !menu) return;
    btn.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    btn.textContent = open ? (EN ? 'Close' : 'Cerrar') : (EN ? 'Menu' : 'Menú');
    [main, document.querySelector('footer')].forEach((el) => el && (el.inert = open));
    if (open) menu.querySelector('a')?.focus();
  };
  btn?.addEventListener('click', () => setMenu(menu.hidden));
  menu?.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu && !menu.hidden) { setMenu(false); btn.focus(); }
  });
  matchMedia('(min-width: 768px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- barra superior + barra de lectura ---------- */
  const bar = document.querySelector('.progress span');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      nav?.classList.toggle('scrolled', scrollY > 8);
      if (bar) {
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      }
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- aparición al hacer scroll (títulos e imágenes) ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    const first = document.querySelector('main > section');
    const items = [...document.querySelectorAll('main h2.tx, main .ph:not([data-vt]), .demo')]
      .filter((el) => !first || !first.contains(el) || el.closest('#proyectos'));
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('vis'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => { el.classList.add('rv'); io.observe(el); });
  }

  /* ---------- filtros: píldora que se desliza + reacomodo animado ---------- */
  const chipsBox = document.querySelector('.chips');
  const chips = [...document.querySelectorAll('.chip[data-filter]')];
  const cards = [...document.querySelectorAll('.card[data-type]')];
  if (chipsBox && chips.length) {
    const pill = document.createElement('span');
    pill.className = 'chip-pill'; pill.setAttribute('aria-hidden', 'true');
    chipsBox.prepend(pill);
    const movePill = (chip) => {
      pill.style.width = chip.offsetWidth + 'px';
      pill.style.transform = `translateX(${chip.offsetLeft}px)`;
    };
    const active = () => chips.find((c) => c.getAttribute('aria-pressed') === 'true') || chips[0];
    requestAnimationFrame(() => { movePill(active()); chipsBox.classList.add('ready'); });
    addEventListener('resize', () => movePill(active()));
    document.fonts?.ready.then(() => movePill(active()));

    chips.forEach((chip) => chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      const before = new Map(cards.filter((c) => !c.hidden).map((c) => [c, c.getBoundingClientRect()]));
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      movePill(chip);
      cards.forEach((card, i) => {
        card.hidden = !(f === 'all' || card.dataset.type === f);
        card.classList.toggle('feat', f === 'all' && i === 0);
      });
      if (reduce) return;
      cards.filter((c) => !c.hidden).forEach((card) => {
        const a = before.get(card), b = card.getBoundingClientRect();
        if (a) {
          const dx = a.left - b.left, dy = a.top - b.top, sx = a.width / b.width;
          if (dx || dy || sx !== 1) card.animate(
            [{ transform: `translate(${dx}px, ${dy}px) scale(${sx})`, transformOrigin: 'top left' }, { transform: 'none', transformOrigin: 'top left' }],
            { duration: 450, easing: 'cubic-bezier(.2,.7,.2,1)' });
        } else {
          card.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }],
            { duration: 380, easing: 'cubic-bezier(.2,.7,.2,1)' });
        }
      });
    }));
  }

  /* ---------- cursor «Ver caso» (solo mouse) ---------- */
  if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const targets = document.querySelectorAll('.card-link, .next-link');
    if (targets.length) {
      const cur = document.createElement('div');
      cur.className = 'cursor'; cur.setAttribute('aria-hidden', 'true');
      cur.innerHTML = `<span>${EN ? 'View case' : 'Ver caso'}</span>`;
      document.body.append(cur);
      let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
      const loop = () => {
        cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
        cur.style.transform = `translate(${cx}px, ${cy}px)`;
        raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
      };
      addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; if (!raf) raf = requestAnimationFrame(loop); }, { passive: true });
      targets.forEach((t) => {
        t.addEventListener('pointerenter', (e) => { cx = x = e.clientX; cy = y = e.clientY; cur.classList.add('on'); t.classList.add('has-cursor'); });
        t.addEventListener('pointerleave', () => { cur.classList.remove('on'); t.classList.remove('has-cursor'); });
      });
    }
  }

  /* ---------- copiar correo ---------- */
  document.querySelectorAll('.copy[data-copy]').forEach((b) => {
    const label = b.textContent;
    b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.copy); }
      catch {
        const ta = Object.assign(document.createElement('textarea'), { value: b.dataset.copy });
        document.body.append(ta); ta.select();
        try { document.execCommand('copy'); } catch {}
        ta.remove();
      }
      b.textContent = b.dataset.done; b.classList.add('done');
      b.nextElementSibling && (b.nextElementSibling.textContent = b.dataset.done);
      setTimeout(() => { b.textContent = label; b.classList.remove('done'); }, 2200);
    });
  });

  /* ---------- mini demos ---------- */
  const fmt = (s, o) => s.replace(/\{(\w)\}/g, (_, k) => o[k]);

  // CD: tarjeta de sellos
  document.querySelectorAll('[data-demo="cd"]').forEach((d) => {
    const t = JSON.parse(d.dataset.i18n);
    const st = [...d.querySelectorAll('.cdc-st:not(.prize)')], prize = d.querySelector('.prize');
    const status = d.querySelector('.cdc-status'), b = d.querySelector('.cdc-btn'), conf = d.querySelector('.confetti');
    const colors = ['#ff6b35', '#2ec4a0', '#4d9de0', '#ffc83d', '#f25c8a'];
    let n = 0, phase = 'add';
    const burst = () => {
      if (reduce) return;
      conf.innerHTML = '';
      for (let i = 0; i < 28; i++) {
        const p = document.createElement('i');
        p.style.cssText = `--x:${(Math.random() * 2 - 1) * 160}px;--y:${-60 - Math.random() * 160}px;--r:${Math.random() * 540}deg;background:${colors[i % 5]};animation-delay:${Math.random() * 80}ms`;
        conf.append(p);
      }
      setTimeout(() => (conf.innerHTML = ''), 1400);
    };
    b.addEventListener('click', () => {
      if (phase === 'add') {
        st[n].classList.add('on'); st[n].style.setProperty('--c', colors[n]); n++;
        status.textContent = fmt(t.left, { n, r: 3 - n });
        if (n === 3) { prize.classList.add('on'); status.textContent = t.ready; b.textContent = t.redeem; phase = 'redeem'; burst(); }
      } else if (phase === 'redeem') {
        status.textContent = t.done; b.textContent = t.again; phase = 'reset'; d.classList.add('redeemed');
      } else {
        n = 0; phase = 'add'; d.classList.remove('redeemed');
        st.forEach((s) => s.classList.remove('on')); prize.classList.remove('on');
        status.textContent = t.start; b.textContent = t.add;
      }
    });
  });

  // PULSO: registro de series
  document.querySelectorAll('[data-demo="pulso"]').forEach((d) => {
    const t = JSON.parse(d.dataset.i18n);
    const rows = [...d.querySelectorAll('.pl-row')], status = d.querySelector('.pl-status'), again = d.querySelector('.pl-reset');
    const reset = () => {
      rows.forEach((r, i) => { r.classList.toggle('on', i === 0); r.classList.remove('done'); r.querySelector('.pl-ok').disabled = i !== 0; });
      status.textContent = t.start; again.hidden = true;
    };
    rows.forEach((r, i) => r.querySelector('.pl-ok').addEventListener('click', (e) => {
      r.classList.remove('on'); r.classList.add('done'); e.currentTarget.disabled = true;
      const next = rows[i + 1];
      if (next) {
        next.classList.add('on'); const nb = next.querySelector('.pl-ok'); nb.disabled = false; nb.focus();
        status.textContent = fmt(t.next, { n: i + 1, m: i + 2 });
      } else { status.textContent = t.all; again.hidden = false; again.focus(); }
    }));
    again.addEventListener('click', () => { reset(); rows[0].querySelector('.pl-ok').focus(); });
  });

  // Mi Salud: código temporal
  document.querySelectorAll('[data-demo="ms"]').forEach((d) => {
    const t = JSON.parse(d.dataset.i18n);
    const chipEls = [...d.querySelectorAll('.ms-chip')], gen = d.querySelector('.ms-gen'), box = d.querySelector('.ms-code');
    const codeEl = d.querySelector('.ms-codev'), timer = d.querySelector('.ms-timer'), cancel = d.querySelector('.ms-cancel');
    const status = d.querySelector('.ms-status');
    let left = 0, iv = 0;
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const code = () => Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('').replace(/^(...)/, '$1-');
    const sel = () => chipEls.filter((c) => c.getAttribute('aria-pressed') === 'true').map((c) => c.textContent);
    const tick = () => {
      const m = Math.floor(left / 60), s = String(left % 60).padStart(2, '0');
      timer.textContent = fmt(t.exp, { t: `${m}:${s}` });
      if (left-- <= 0) end(t.expired);
    };
    const end = (msg) => {
      clearInterval(iv); d.classList.add('ended'); cancel.hidden = true;
      status.textContent = msg; gen.hidden = false; gen.textContent = t.again;
      chipEls.forEach((c) => (c.disabled = false));
    };
    chipEls.forEach((c) => c.addEventListener('click', () => c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true'))));
    gen.addEventListener('click', () => {
      const l = sel();
      if (!l.length) { status.textContent = t.none; return; }
      d.classList.remove('ended'); box.hidden = false; cancel.hidden = false; gen.hidden = true;
      chipEls.forEach((c) => (c.disabled = true));
      codeEl.textContent = code(); status.textContent = fmt(t.shared, { l: l.join(', ') });
      left = 600; tick(); clearInterval(iv); iv = setInterval(tick, 1000);
      cancel.focus();
    });
    cancel.addEventListener('click', () => { end(t.canceled); gen.focus(); });
  });
})();
