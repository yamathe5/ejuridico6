(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) {
        nav.classList.remove('is-open');
        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Abrir menú');
      }
    });
  }
  const current = document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === current) link.setAttribute('aria-current', 'page');
  });

  const slides = [
    { quote: 'Me explicaron cada alternativa con claridad y estuvieron presentes durante todo el proceso. Sentí que mi caso realmente les importaba.', name: 'Cliente referencial', location: 'Lima, Perú', initials: 'CR' },
    { quote: 'El equipo nos ayudó a ordenar un asunto complejo y a decidir con información. La comunicación siempre fue directa y oportuna.', name: 'Cliente referencial', location: 'Arequipa, Perú', initials: 'MV' },
    { quote: 'Agradezco la transparencia desde el inicio. Tuvimos claro el alcance del trabajo y qué esperar en cada etapa.', name: 'Cliente referencial', location: 'Lima, Perú', initials: 'AP' }
  ];
  let active = 0;
  const quote = document.querySelector('.quote-text');
  if (quote) {
    const render = () => {
      const slide = slides[active];
      quote.textContent = slide.quote;
      document.querySelector('.quote-name').textContent = slide.name;
      document.querySelector('.quote-location').textContent = slide.location;
      document.querySelector('.avatar').textContent = slide.initials;
      document.querySelector('.slide-count').textContent = `0${active + 1} / 0${slides.length}`;
    };
    document.querySelector('.slider-prev')?.addEventListener('click', () => { active = (active + slides.length - 1) % slides.length; render(); });
    document.querySelector('.slider-next')?.addEventListener('click', () => { active = (active + 1) % slides.length; render(); });
  }

  const form = document.querySelector('.contact-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    form.querySelector('.form-feedback').textContent = 'Gracias. Tu consulta quedó registrada solo en esta demostración; no se envió a ningún servidor.';
    form.reset();
  });
})();

  // Estadísticas ilustrativas: animación al entrar en pantalla, compatible con movimiento reducido.
  const counters = document.querySelectorAll('[data-counter]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const showFinal = el => { el.textContent = `${el.dataset.target}${el.dataset.suffix || ''}`; };
  if (counters.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) counters.forEach(showFinal);
    else {
      counters.forEach(el => { el.textContent = `0${el.dataset.suffix || ''}`; });
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target, target = Number(el.dataset.target), suffix = el.dataset.suffix || '', start = performance.now(), duration = 1450;
        const tick = now => {
          const progress = Math.min((now - start) / duration, 1);
          const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
          el.textContent = `${value}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }), { threshold: .45 });
      counters.forEach(el => observer.observe(el));
    }
  }

  // Enlace de WhatsApp con texto precargado; el usuario elige el destinatario y envía.
  if (!document.querySelector('.whatsapp-float')) {
    const whatsapp = document.createElement('a');
    whatsapp.className = 'whatsapp-float';
    whatsapp.href = 'https://api.whatsapp.com/send?text=Hola%2C%20quisiera%20conversar%20sobre%20mi%20caso.';
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener noreferrer';
    whatsapp.setAttribute('aria-label', 'Hablemos de tu caso por WhatsApp');
    whatsapp.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 .8A15.1 15.1 0 0 0 3.1 23.8L1.2 31l7.4-1.9A15.1 15.1 0 1 0 16 .8zm0 27.4a12.2 12.2 0 0 1-6.2-1.7l-.5-.3-4.4 1.2 1.2-4.3-.3-.5A12.3 12.3 0 1 1 16 28.2zm6.8-9.2c-.4-.2-2.1-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.4-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.5-.6-2.9-1.8-1.1-1-1.8-2.1-2-2.5-.2-.4 0-.6.2-.8l.6-.7.4-.7c.1-.2 0-.5 0-.7l-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.2 2.6 4 6.3 5.6.9.4 1.6.6 2.1.8.9.3 1.7.3 2.3.2.7-.1 2.1-.9 2.4-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z"/></svg><span>Hablemos de tu caso</span>';
    document.body.append(whatsapp);
  }
