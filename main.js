const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const initEmbeddedVersionRefresh = () => {
  if (window.self === window.top) return;

  const currentVersion = document.querySelector('meta[name="app-version"]')?.content;
  if (!currentVersion || currentVersion === 'development') return;

  let isChecking = false;
  const checkForNewVersion = async () => {
    if (isChecking) return;
    isChecking = true;

    try {
      const versionUrl = new URL('version.json', document.baseURI);
      versionUrl.searchParams.set('cache-bust', Date.now().toString());

      const response = await fetch(versionUrl, { cache: 'no-store' });
      if (!response.ok) return;

      const { version: deployedVersion } = await response.json();
      if (!deployedVersion || deployedVersion === currentVersion) return;

      const freshUrl = new URL(window.location.href);
      if (freshUrl.searchParams.get('site-version') === deployedVersion) return;

      freshUrl.searchParams.set('site-version', deployedVersion);
      window.location.replace(freshUrl);
    } catch {
      // Brak sieci lub chwilowo niedostępny plik wersji nie blokuje strony.
    } finally {
      isChecking = false;
    }
  };

  checkForNewVersion();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') checkForNewVersion();
  });
};

const scheduleEditions = {
  'weekend-1': {
    title: 'I edycja weekendowa',
    subtitle: 'sobota-niedziela · stacjonarnie · Łódź',
    color: '#6ebf36',
    range: '24.10.2026-22.11.2026',
    recruitment: '24.09.2026',
    note: 'Edycja dla osób, które wolą realizować 64 godziny szkolenia w cyklu weekendowym.',
    sessions: [
      { no: 1, date: '24-25.10.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-10-24', '2026-10-25'] },
      { no: 2, date: '07-08.11.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-11-07', '2026-11-08'] },
      { no: 3, date: '14-15.11.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-11-14', '2026-11-15'] },
      { no: 4, date: '21-22.11.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-11-21', '2026-11-22'] }
    ]
  }
};

const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

const setAccordionItem = (item, shouldOpen) => {
  const trigger = item.querySelector('.acc-trigger');
  const body = item.querySelector('.acc-body');
  if (!trigger || !body) return;

  trigger.setAttribute('aria-expanded', String(shouldOpen));

  if (shouldOpen) {
    item.classList.add('open');
    body.style.height = '0px';
    requestAnimationFrame(() => {
      body.style.height = `${body.scrollHeight}px`;
    });
    return;
  }

  body.style.height = `${body.scrollHeight}px`;
  requestAnimationFrame(() => {
    item.classList.remove('open');
    body.style.height = '0px';
  });
};

const initAccordion = () => {
  const accordion = document.getElementById('accordion');
  if (!accordion) return;

  accordion.querySelectorAll('.acc-item').forEach(item => {
    const body = item.querySelector('.acc-body');
    if (!body) return;

    body.style.height = item.classList.contains('open') ? 'auto' : '0px';
    body.addEventListener('transitionend', event => {
      if (event.propertyName === 'height' && item.classList.contains('open')) {
        body.style.height = 'auto';
      }
    });
  });

  accordion.addEventListener('click', event => {
    const trigger = event.target.closest('.acc-trigger');
    if (!trigger || !accordion.contains(trigger)) return;

    const item = trigger.closest('.acc-item');
    const isOpen = item.classList.contains('open');

    accordion.querySelectorAll('.acc-item.open').forEach(openItem => {
      setAccordionItem(openItem, false);
    });

    if (!isOpen) setAccordionItem(item, true);
  });
};

const eventForDay = (edition, isoDay) => {
  for (const session of edition.sessions) {
    if (session.days.includes(isoDay)) return session;
  }
  return null;
};

const renderMonth = (edition, year, monthIndex) => {
  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const leadingEmpty = (firstDay.getDay() + 6) % 7;
  let days = '';

  for (let i = 0; i < leadingEmpty; i++) {
    days += '<div class="month-day muted"></div>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isoDay = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const session = eventForDay(edition, isoDay);
    const event = session ? `<span class="day-event ${session.type === 'online' ? 'online' : ''}" title="Zjazd ${session.no}, ${session.type}">${day}</span>` : day;
    days += `<div class="month-day">${event}</div>`;
  }

  return `
    <div class="month-card">
      <div class="month-title">${monthNames[monthIndex]} ${year}</div>
      <div class="month-weekdays" aria-hidden="true"><span>Pn</span><span>Wt</span><span>Śr</span><span>Cz</span><span>Pt</span><span>So</span><span>Nd</span></div>
      <div class="month-days">${days}</div>
    </div>
  `;
};

const renderScheduleDialog = (dialog, edition) => {
  dialog.style.setProperty('--modal-edition', edition.color);
  dialog.querySelector('#schedule-dialog-title').textContent = edition.title;
  dialog.querySelector('#schedule-dialog-sub').textContent = edition.subtitle;
  dialog.querySelector('#schedule-dialog-range').textContent = edition.range;
  dialog.querySelector('#schedule-dialog-recruitment').textContent = edition.recruitment;
  dialog.querySelector('#schedule-dialog-note').textContent = edition.note;
  dialog.querySelector('#schedule-dialog-rows').innerHTML = edition.sessions.map(session => `
    <tr>
      <td>${session.no}</td>
      <td>${session.date}<small>${session.type}</small></td>
      <td>${session.hours}</td>
    </tr>
  `).join('');

  const monthKeys = [...new Set(edition.sessions.flatMap(session => session.days.map(day => day.slice(0, 7))))];
  dialog.querySelector('#schedule-dialog-calendar').innerHTML = monthKeys.map(key => {
    const [year, month] = key.split('-').map(Number);
    return renderMonth(edition, year, month - 1);
  }).join('');
};

const initSchedule = () => {
  const dialog = document.getElementById('schedule-dialog');
  let lastTrigger = null;

  document.querySelectorAll('[data-edition]').forEach(btn => {
    btn.addEventListener('click', () => {
      const edition = scheduleEditions[btn.dataset.edition];
      if (!edition || !dialog) return;

      lastTrigger = btn;
      renderScheduleDialog(dialog, edition);
      dialog.showModal();
    });
  });

  if (!dialog) return;

  dialog.querySelectorAll('[data-close-schedule]').forEach(btn => {
    btn.addEventListener('click', () => dialog.close());
  });

  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    dialog.close();
  });

  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    if (lastTrigger) lastTrigger.focus();
  });
};

const initReveal = () => {
  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

  const revealTargets = document.querySelectorAll(
    '.section-label, .section-title, .divider, .section-desc, .program-tag, ' +
    '.fw-card, .benefit-card, .acc-item, .price-card, .subsidy-info, ' +
    '.trainer-wrap, .edition-tile, ' +
    '.info-card, .contact-card, .faq-contacts, .faq-person, .faq-item, .register-box'
  );
  const staggered = '.fw-card, .benefit-card, .acc-item, .price-card, .edition-tile, .info-card, .contact-card, .faq-person, .faq-item';

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const delay = (parseFloat(el.style.getPropertyValue('--d')) || 0) * 1000;
      observer.unobserve(el);
      el.classList.add('visible');

      setTimeout(() => {
        el.classList.remove('reveal', 'visible');
        el.style.removeProperty('--d');
      }, 700 + delay);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => {
    if (el.matches(staggered)) {
      const idx = Array.from(el.parentElement.children).indexOf(el);
      el.style.setProperty('--d', `${idx * 0.07}s`);
    }
    el.classList.add('reveal');
    observer.observe(el);
  });
};

const initCounters = () => {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.hero-stat-num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    let start;

    const tick = now => {
      if (start === undefined) start = now;
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };

    setTimeout(() => requestAnimationFrame(tick), 300);
  });
};

const initScrollUi = () => {
  const nav = document.querySelector('nav');
  const progress = document.querySelector('.scroll-progress');
  const toTop = document.querySelector('.to-top');
  if (!nav || !progress || !toTop) return;

  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    nav.classList.toggle('scrolled', y > 24);
    progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    toTop.classList.toggle('show', y > 600);
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  document.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
};

// Płynne przewijanie po kliknięciu lokalnych linków — własna animacja, aby
// wszystkie CTA działały tak samo i dało się kontrolować ich prędkość.
const initAnchorScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');
  if (!links.length) return;

  const offset = 84; // odpowiada scroll-padding-top
  const slowdown = 1.2; // 20% wolniej
  const root = document.documentElement;
  let animationFrame = 0;
  let previousInlineScrollBehavior = '';

  const beginAnimation = () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    else previousInlineScrollBehavior = root.style.scrollBehavior;

    // Kolejne kroki animacji muszą być natychmiastowe. W przeciwnym razie
    // globalne scroll-behavior: smooth animuje każdy z nich ponownie.
    root.style.scrollBehavior = 'auto';
    document.body.classList.add('is-anchor-scrolling');
  };

  const endAnimation = () => {
    animationFrame = 0;
    root.style.scrollBehavior = previousInlineScrollBehavior;
    document.body.classList.remove('is-anchor-scrolling');
  };

  links.forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      const target = hash === '#' ? document.body : document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      history.pushState(null, '', hash);
      beginAnimation();

      const destY = hash === '#'
        ? 0
        : Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);

      if (prefersReducedMotion) {
        window.scrollTo({ top: destY, behavior: 'auto' });
        endAnimation();
        return;
      }

      const startY = window.scrollY;
      const distance = destY - startY;
      if (distance === 0) {
        endAnimation();
        return;
      }

      // Bazowa długość zbliżona do natywnego płynnego scrolla, wydłużona o 20%.
      const baseDuration = Math.min(Math.max(Math.abs(distance) * 0.28, 240), 520);
      const duration = baseDuration * slowdown;
      let start;

      const tick = now => {
        if (start === undefined) start = now;
        const t = Math.min((now - start) / duration, 1);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo({ top: startY + distance * eased, behavior: 'auto' });
        if (t < 1) {
          animationFrame = requestAnimationFrame(tick);
          return;
        }
        endAnimation();
      };

      animationFrame = requestAnimationFrame(tick);
    });
  });
};

initAccordion();
initSchedule();
initEmbeddedVersionRefresh();
initReveal();
initCounters();
initScrollUi();
initAnchorScroll();
