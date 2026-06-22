const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scheduleEditions = {
  'week-1': {
    title: 'I edycja tygodniowa',
    subtitle: 'czwartek-piątek · stacjonarnie · Łódź',
    color: '#4f91f7',
    range: '15.10.2026-06.11.2026',
    recruitment: '14.10.2026',
    note: 'Wszystkie zjazdy odbywają się stacjonarnie w Łodzi, w siedzibie Textilimpex przy ul. Traugutta 25.',
    sessions: [
      { no: 1, date: '15-16.10.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-10-15', '2026-10-16'] },
      { no: 2, date: '22-23.10.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-10-22', '2026-10-23'] },
      { no: 3, date: '29-30.10.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-10-29', '2026-10-30'] },
      { no: 4, date: '05-06.11.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-11-05', '2026-11-06'] }
    ]
  },
  'weekend-1': {
    title: 'I edycja weekendowa',
    subtitle: 'sobota-niedziela · stacjonarnie · Łódź',
    color: '#6ebf36',
    range: '17.10.2026-22.11.2026',
    recruitment: '16.10.2026',
    note: 'Edycja dla osób, które wolą realizować 70 godzin szkolenia w cyklu weekendowym.',
    sessions: [
      { no: 1, date: '17-18.10.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-10-17', '2026-10-18'] },
      { no: 2, date: '24-25.10.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-10-24', '2026-10-25'] },
      { no: 3, date: '07-08.11.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-11-07', '2026-11-08'] },
      { no: 4, date: '21-22.11.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-11-21', '2026-11-22'] }
    ]
  },
  'weekend-2': {
    title: 'II edycja weekendowa',
    subtitle: 'sobota-niedziela · hybrydowa',
    color: '#ff8a2a',
    range: '14.11.2026-13.12.2026',
    recruitment: '13.11.2026',
    note: 'W trybie hybrydowym 1 i 4 zjazd odbywają się stacjonarnie, a 2 i 3 online.',
    sessions: [
      { no: 1, date: '14-15.11.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-11-14', '2026-11-15'] },
      { no: 2, date: '28-29.11.2026', hours: '09:00-17:00', type: 'online', days: ['2026-11-28', '2026-11-29'] },
      { no: 3, date: '05-06.12.2026', hours: '09:00-17:00', type: 'online', days: ['2026-12-05', '2026-12-06'] },
      { no: 4, date: '12-13.12.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-12-12', '2026-12-13'] }
    ]
  },
  'week-2': {
    title: 'II edycja tygodniowa',
    subtitle: 'czwartek-piątek · hybrydowa',
    color: '#28bdb5',
    range: '19.11.2026-11.12.2026',
    recruitment: '18.11.2026',
    note: 'W trybie hybrydowym 1 i 4 zjazd odbywają się stacjonarnie, a 2 i 3 online.',
    sessions: [
      { no: 1, date: '19-20.11.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-11-19', '2026-11-20'] },
      { no: 2, date: '26-27.11.2026', hours: '09:00-17:00', type: 'online', days: ['2026-11-26', '2026-11-27'] },
      { no: 3, date: '03-04.12.2026', hours: '09:00-17:00', type: 'online', days: ['2026-12-03', '2026-12-04'] },
      { no: 4, date: '10-11.12.2026', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2026-12-10', '2026-12-11'] }
    ]
  },
  'weekend-3': {
    title: 'III edycja weekendowa',
    subtitle: 'sobota-niedziela · hybrydowa',
    color: '#8f63d9',
    range: '09.01.2027-31.01.2027',
    recruitment: '08.01.2027',
    note: 'Styczniowa edycja weekendowa: pierwszy i ostatni zjazd stacjonarnie, środkowe zjazdy online.',
    sessions: [
      { no: 1, date: '09-10.01.2027', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2027-01-09', '2027-01-10'] },
      { no: 2, date: '16-17.01.2027', hours: '09:00-17:00', type: 'online', days: ['2027-01-16', '2027-01-17'] },
      { no: 3, date: '23-24.01.2027', hours: '09:00-17:00', type: 'online', days: ['2027-01-23', '2027-01-24'] },
      { no: 4, date: '30-31.01.2027', hours: '09:00-17:00', type: 'stacjonarnie', days: ['2027-01-30', '2027-01-31'] }
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
  const filterButtons = document.querySelectorAll('[data-schedule-filter]');
  const tiles = document.querySelectorAll('[data-schedule-categories]');
  const tilesGrid = document.querySelector('.edition-tiles');
  let lastTrigger = null;
  let filterTimer = null;

  const applyFilter = filter => {
    filterButtons.forEach(btn => {
      const isActive = btn.dataset.scheduleFilter === filter;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    tiles.forEach(tile => {
      const categories = (tile.dataset.scheduleCategories || '').split(/\s+/);
      tile.hidden = !(filter === 'all' || categories.includes(filter));
    });
  };

  const setFilter = filter => {
    if (!tilesGrid || prefersReducedMotion) {
      applyFilter(filter);
      return;
    }

    clearTimeout(filterTimer);
    tilesGrid.classList.add('is-filtering');
    filterTimer = setTimeout(() => {
      applyFilter(filter);
      tilesGrid.classList.remove('is-filtering');
    }, 120);
  };

  document.querySelectorAll('[data-edition]').forEach(btn => {
    btn.addEventListener('click', () => {
      const edition = scheduleEditions[btn.dataset.edition];
      if (!edition || !dialog) return;

      lastTrigger = btn;
      renderScheduleDialog(dialog, edition);
      dialog.showModal();
    });
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.scheduleFilter));
  });

  if (!dialog) return;

  dialog.querySelectorAll('[data-close-schedule]').forEach(btn => {
    btn.addEventListener('click', () => dialog.close());
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
    '.quote-block, .trainer-wrap, .schedule-filter, .edition-tile, ' +
    '.info-card, .contact-card, .register-box'
  );
  const staggered = '.fw-card, .benefit-card, .acc-item, .price-card, .schedule-filter, .edition-tile, .info-card, .contact-card';

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

// Płynne przewijanie po kliknięciu linków w menu — własna animacja, aby móc
// kontrolować prędkość (o 20% wolniej niż domyślny scroll przeglądarki).
const initMenuScroll = () => {
  const links = document.querySelectorAll('nav a[href^="#"]');
  if (!links.length) return;

  const offset = 84; // odpowiada scroll-padding-top
  const slowdown = 1.2; // 20% wolniej

  links.forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      const target = hash === '#' ? document.body : document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      history.pushState(null, '', hash);

      const destY = hash === '#'
        ? 0
        : Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);

      if (prefersReducedMotion) {
        window.scrollTo({ top: destY, behavior: 'auto' });
        return;
      }

      const startY = window.scrollY;
      const distance = destY - startY;
      if (distance === 0) return;

      // Bazowa długość zbliżona do natywnego płynnego scrolla, wydłużona o 20%.
      const baseDuration = Math.min(Math.max(Math.abs(distance) * 0.28, 240), 520);
      const duration = baseDuration * slowdown;
      let start;

      const tick = now => {
        if (start === undefined) start = now;
        const t = Math.min((now - start) / duration, 1);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo({ top: startY + distance * eased, behavior: 'auto' });
        if (t < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    });
  });
};

initAccordion();
initSchedule();
initReveal();
initCounters();
initScrollUi();
initMenuScroll();
