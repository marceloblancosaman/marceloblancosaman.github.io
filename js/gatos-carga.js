// Gatos del portafolio · parte 1: dibujos + pantalla de carga.
// Se carga justo después de <body> (sin defer) para que la carga aparezca antes que el contenido.
// Los dibujos vienen del Figma «06 · Exploración — Gatitos» / «07 · Prototipo — Gatos».
(() => {
  const W = '<path d="M48 104L6 97M48 108L8 115M92 104L134 97M92 108L132 115" stroke-width="1.4" stroke-linecap="round" stroke="';
  const G = window.GATOS = {
    pucho: `<path d="M18 72L24 16L64 44Z" fill="#9C9CA3"/><path d="M122 72L116 16L76 44Z" fill="#9C9CA3"/><path d="M30 56L32 30L52 44Z" fill="#CDB8B2"/><path d="M110 56L108 30L88 44Z" fill="#CDB8B2"/>
      <ellipse cx="70" cy="84" rx="55" ry="45" fill="#9C9CA3"/>
      <path d="M62 46C63.3 52.7 63.7 58.7 63 64M70 44V64M78 46C76.7 52.7 76.3 58.7 77 64" stroke-width="2.5" stroke-linecap="round" stroke="#86868D"/>
      <ellipse cx="70" cy="108" rx="23" ry="16" fill="#E7E6E3"/>
      <g class="eye"><ellipse cx="49.5" cy="81.5" rx="9.5" ry="9.5" fill="#D8DE8A"/><ellipse cx="49.5" cy="82" rx="5.5" ry="7" fill="#1A1A1C"/><circle cx="53" cy="79" r="2" fill="#fff"/></g>
      <g class="eye"><ellipse cx="89.5" cy="81.5" rx="9.5" ry="9.5" fill="#D8DE8A"/><ellipse cx="89.5" cy="82" rx="5.5" ry="7" fill="#1A1A1C"/><circle cx="93" cy="79" r="2" fill="#fff"/></g>
      <rect x="37" y="69" width="26" height="8" fill="#9C9CA3"/><path d="M39 77H61" stroke-width="2.2" stroke-linecap="round" stroke="#6E6E75"/>
      <rect x="77" y="69" width="26" height="8" fill="#9C9CA3"/><path d="M79 77H101" stroke-width="2.2" stroke-linecap="round" stroke="#6E6E75"/>
      <path d="M64 97H76L70 104Z" fill="#E2A193"/><path d="M70 104V108M63 110C67.7 108.7 72.3 108.7 77 110" stroke-width="1.8" stroke-linecap="round" stroke="#6E6E75" fill="none"/>
      ${W}#B9B9BF"/>`,
    neo: `<path d="M18 72L24 16L64 44Z" fill="#1F1E20"/><path d="M122 72L116 16L76 44Z" fill="#1F1E20"/><path d="M30 56L32 30L52 44Z" fill="#4A3B3D"/><path d="M110 56L108 30L88 44Z" fill="#4A3B3D"/>
      <ellipse cx="70" cy="84" rx="55" ry="45" fill="#1F1E20"/>
      <g class="eye"><ellipse cx="51" cy="84" rx="9" ry="8" fill="#C7D79C"/><ellipse cx="51" cy="83.5" rx="4" ry="6.5" fill="#141414"/><circle cx="53.6" cy="80.6" r="1.6" fill="#fff"/></g>
      <g class="eye"><ellipse cx="89" cy="84" rx="9" ry="8" fill="#C7D79C"/><ellipse cx="89" cy="83.5" rx="4" ry="6.5" fill="#141414"/><circle cx="91.6" cy="80.6" r="1.6" fill="#fff"/></g>
      <path d="M41 78C47 76.3 53 76.3 59 78V74H41Z" fill="#1F1E20"/><path d="M81 78C87 76.3 93 76.3 99 78V74H81Z" fill="#1F1E20"/>
      <path d="M65 97H75L70 103Z" fill="#4A3B3D"/><path d="M70 103V106M70 106C68 108.7 66 109 64 107M70 106C72 108.7 74 109 76 107" stroke-width="1.8" stroke-linecap="round" stroke="#555057" fill="none"/>
      ${W}#8E8A90"/>`,
    nana: (id) => `<clipPath id="${id}"><ellipse cx="70" cy="84" rx="55" ry="45"/></clipPath>
      <path d="M18 72L24 16L64 44Z" fill="#88765F"/><path d="M122 72L116 16L76 44Z" fill="#8E7B62"/><path d="M30 56L32 30L52 44Z" fill="#E9B9B0"/><path d="M110 56L108 30L88 44Z" fill="#E9B9B0"/><path d="M100 30L116 16L119 44Z" fill="#D08A4E"/>
      <ellipse cx="70" cy="84" rx="55" ry="45" fill="#F7F4EF"/>
      <g clip-path="url(#${id})"><path d="M10 30H66L64 58C56 62 48.7 68 42 76C34 84 23.3 90 10 94Z" fill="#88765F"/><path d="M130 30H74L76 58C84 62 91.3 68 98 76C106 84 116.7 90 130 94Z" fill="#AE8A5A"/><path d="M98 30H130V62C118 55.3 107.3 44.7 98 30Z" fill="#D08A4E"/>
        <path d="M30 52C34 56 35.3 60.7 34 66M44 46C46.7 51.3 47.3 56 46 60M110 52C106 56 104.7 60.7 106 66M96 46C93.3 51.3 92.7 56 94 60" stroke-width="2.5" stroke-linecap="round" stroke="#5E564C" fill="none"/></g>
      <g class="eye"><ellipse cx="50.5" cy="82" rx="9.5" ry="10" fill="#D6CF86"/><ellipse cx="50.5" cy="83" rx="6.5" ry="8" fill="#1A1714"/><circle cx="54.2" cy="79.2" r="2.2" fill="#fff"/></g>
      <g class="eye"><ellipse cx="89.5" cy="82" rx="9.5" ry="10" fill="#D6CF86"/><ellipse cx="89.5" cy="83" rx="6.5" ry="8" fill="#1A1714"/><circle cx="93.2" cy="79.2" r="2.2" fill="#fff"/></g>
      <ellipse opacity=".7" cx="34" cy="98" rx="7" ry="4" fill="#F1B7AE"/><ellipse opacity=".7" cx="106" cy="98" rx="7" ry="4" fill="#F1B7AE"/>
      <path d="M65 96H75L70 102Z" fill="#EBA39A"/><path d="M70 102V104M70 104C67.7 107.3 65.3 107.7 63 105M70 104C72.3 107.3 74.7 107.7 77 105" stroke-width="1.8" stroke-linecap="round" stroke="#B78F88" fill="none"/>
      ${W}#C9C3BA"/>`,
    paws: (fill, line, edge) => `<ellipse cx="28" cy="11" rx="20" ry="10" fill="${fill}"${edge ? ` stroke="${edge}" stroke-width="1.5"` : ''}/><ellipse cx="92" cy="11" rx="20" ry="10" fill="${fill}"${edge ? ` stroke="${edge}" stroke-width="1.5"` : ''}/><path d="M20 8v6M28 7v7M36 8v6M84 8v6M92 7v7M100 8v6" stroke="${line}" stroke-width="2" stroke-linecap="round"/>`,
    bow: `<path d="M22 12L3 2Q0 12 3 22Z" fill="#C10000"/><path d="M22 12L41 2Q44 12 41 22Z" fill="#C10000"/><path d="M8 7L18 12L8 17M36 7L26 12L36 17" stroke="#8E0000" stroke-width="1.5" fill="none" stroke-linecap="round"/><rect x="17" y="6" width="10" height="12" rx="4" fill="#A30000"/>`
  };

  /* ---------- Pantalla de carga: solo la primera visita de la sesión ---------- */
  const KEY = 'pucho-visto';
  let seen = false;
  try { seen = sessionStorage.getItem(KEY) === '1'; } catch {}
  if (seen) return;

  const root = document.documentElement;
  const EN = root.lang === 'en';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('cat-first');

  const el = document.createElement('div');
  el.className = 'gato-carga';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-label', EN ? 'Loading portfolio' : 'Cargando portafolio');
  el.innerHTML = `<div class="gc-in">
    <div class="gc-pucho gc-blink" aria-hidden="true">
      <svg class="gc-body" viewBox="0 0 400 344" fill="none">
        <path class="gc-tail" d="M280 316C336 336 384 320 376 272" stroke-width="22" stroke-linecap="round" stroke="#9C9CA3"/>
        <path d="M124 8C88 60 80 140 84 200C60 224 52 280 80 312C104 332 140 332 152 328H208C224 332 280 332 300 308C320 280 308 224 276 200C280 140 272 60 236 8Z" fill="#9C9CA3"/>
        <path d="M92 220C108 244 116 280 112 316M268 220C252 244 244 280 248 316M132 116C126 184 134 256 140 312M244 108C236 184 226 256 220 312M180 148C178 208 178 264 182 312" stroke-width="4" stroke-linecap="round" stroke="#86868D"/>
        <path d="M100 124C109.3 133.3 112 145.3 108 160M260 124C250.7 133.3 248 145.3 252 160" stroke-width="5.2" stroke-linecap="round" stroke="#86868D"/>
        <path d="M144 8C136 60 152 112 184 132C212 112 224 60 216 8Z" fill="#E7E6E3"/>
        <path opacity=".8" d="M146 224C155.3 228 164 228 172 224M190 224C198 228 206 227.3 214 222" stroke-width="4" stroke-linecap="round" stroke="#86868D"/>
        <path d="M136 308C124 336 188 336 182 312C168 304 148 304 136 308Z" fill="#9C9CA3" stroke-width="3.2" stroke="#86868D"/>
        <path d="M182 312C180 336 244 332 224 308C212 304 192 304 182 312Z" fill="#9C9CA3" stroke-width="3.2" stroke="#86868D"/>
        <path d="M154 318V328M168 318V328M196 318V328M210 318V328" stroke-width="3" stroke-linecap="round" stroke="#86868D"/>
        <svg x="174" y="221.3" width="60" height="56" viewBox="0 0 30 28">
          <clipPath id="gc-venda"><path d="M3 3C11 1 19.33 1 28 3L26 25C18 27 9.67 27 1 25Z"/></clipPath>
          <path d="M2.18 3.17C10.18 1.17 19.7 1.27 28.36 3.27L25.82 25.17C19.55 26.24 11.58 27.17 2.91 25.17Z" fill="#7E8A5E"/>
          <g clip-path="url(#gc-venda)">
            <path d="M2.18 5.45C8.18 1.45 12.09 8.4 17.09 5.4C21.09 3.4 23.09 8.4 19.09 11.4C14.09 14.4 9.55 10.73 2.55 12.73Z" fill="#4F5E3C"/>
            <path d="M17 14C21 11 27 13 31 10V20C26 22 22 19 18 20C15 21 14 16 17 14Z" fill="#BFAE84"/>
            <path d="M3.82 17.45C7.82 15.45 11.82 18.45 13.82 21.45C14.82 24.45 9.82 26.45 5.82 25.45C2.82 24.45 1.82 19.45 3.82 17.45Z" fill="#3E4834"/>
            <path d="M20 2C23 1 26 3 25 6C24 8 20 8 19 6C18 4 18 3 20 2Z" fill="#BFAE84"/>
            <path d="M14 20C17 19 20 22 19 25C17 28 13 27 12 25C11 23 12 21 14 20Z" fill="#5A6A44"/>
          </g>
          <path opacity=".7" d="M2.7 14C10.7 15.67 18.33 15.67 27 14" stroke-width="1.375" stroke="#5A6A44"/>
          <path d="M2.18 3C10.18 1 20.06 1 28.73 3M2.55 25.09C11.21 27.09 18 27 26 25" stroke-width="1.65" stroke="#4A5638"/>
        </svg>
      </svg>
      <svg class="gc-head" viewBox="0 0 140 130" fill="none">${G.pucho}</svg>
    </div>
    <div class="gc-bar"><span></span></div>
    <span class="gc-txt">${EN ? 'Loading…' : 'Cargando…'}</span>
  </div>
  <svg class="gc-slow gc-blink" viewBox="0 0 140 130" fill="none" aria-hidden="true"></svg>`;
  document.body.prepend(el);

  const bar = el.querySelector('.gc-bar span');
  const slow = el.querySelector('.gc-slow');
  const t0 = performance.now();
  const MIN = reduce ? 300 : 1200;   // lo justo para ver la cola y un parpadeo
  const MAX = 4000;                  // nunca hacer esperar más que esto
  let loaded = false, done = false;

  // Si la carga se demora, se asoma Neo o Ñaña desde abajo
  const slowT = setTimeout(() => {
    slow.innerHTML = Math.random() < .5 ? G.neo : G.nana('gc-nana');
    slow.classList.add('show');
  }, 2500);

  const finish = () => {
    if (done) return; done = true;
    clearTimeout(slowT);
    try { sessionStorage.setItem(KEY, '1'); } catch {}
    el.classList.add('hide');
    root.classList.add('cat-done');
    setTimeout(() => { el.remove(); root.classList.remove('cat-first', 'cat-done'); }, 400);
  };
  const tick = () => {
    const t = performance.now() - t0;
    const target = loaded ? Math.max(MIN, t) : Math.max(MIN, MAX);
    bar.style.width = Math.min(100, (t / target) * 100) + '%';
    if ((loaded && t >= MIN) || t >= MAX) finish();
    else requestAnimationFrame(tick);
  };
  addEventListener('load', () => { loaded = true; });
  requestAnimationFrame(tick);
})();
