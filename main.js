document.querySelectorAll('.acc-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.acc-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.acc-trigger').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

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

const scheduleDialog = document.getElementById('schedule-dialog');
const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
let lastScheduleTrigger = null;

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

const renderScheduleDialog = edition => {
  scheduleDialog.style.setProperty('--modal-edition', edition.color);
  document.getElementById('schedule-dialog-title').textContent = edition.title;
  document.getElementById('schedule-dialog-sub').textContent = edition.subtitle;
  document.getElementById('schedule-dialog-range').textContent = edition.range;
  document.getElementById('schedule-dialog-recruitment').textContent = edition.recruitment;
  document.getElementById('schedule-dialog-note').textContent = edition.note;
  document.getElementById('schedule-dialog-rows').innerHTML = edition.sessions.map(session => `
    <tr>
      <td>${session.no}</td>
      <td>${session.date}<small>${session.type}</small></td>
      <td>${session.hours}</td>
    </tr>
  `).join('');

  const monthKeys = [...new Set(edition.sessions.flatMap(session => session.days.map(day => day.slice(0, 7))))];
  document.getElementById('schedule-dialog-calendar').innerHTML = monthKeys.map(key => {
    const [year, month] = key.split('-').map(Number);
    return renderMonth(edition, year, month - 1);
  }).join('');
};

document.querySelectorAll('[data-edition]').forEach(btn => {
  btn.addEventListener('click', () => {
    const edition = scheduleEditions[btn.dataset.edition];
    if (!edition || !scheduleDialog) return;
    lastScheduleTrigger = btn;
    renderScheduleDialog(edition);
    scheduleDialog.showModal();
  });
});

document.querySelectorAll('[data-close-schedule]').forEach(btn => {
  btn.addEventListener('click', () => scheduleDialog.close());
});

if (scheduleDialog) {
  scheduleDialog.addEventListener('click', event => {
    if (event.target === scheduleDialog) scheduleDialog.close();
  });
  scheduleDialog.addEventListener('close', () => {
    if (lastScheduleTrigger) lastScheduleTrigger.focus();
  });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Odsłanianie sekcji przy scrollowaniu
if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll(
    '.section-label, .section-title, .divider, .section-desc, .program-tag, ' +
    '.fw-card, .benefit-card, .acc-item, .price-card, .subsidy-info, ' +
    '.quote-block, .trainer-wrap, .edition-tile, ' +
    '.info-card, .contact-card, .register-box'
  );
  const staggered = '.fw-card, .benefit-card, .acc-item, .price-card, .edition-tile, .info-card, .contact-card';
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      const delay = (parseFloat(el.style.getPropertyValue('--d')) || 0) * 1000;
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
      el.style.setProperty('--d', (idx * 0.07) + 's');
    }
    el.classList.add('reveal');
    io.observe(el);
  });
}

// Animowane liczniki statystyk w hero
if (!reduceMotion) {
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
}

// Nav po scrollu, pasek postępu, przycisk „do góry"
const navEl = document.querySelector('nav');
const progressEl = document.querySelector('.scroll-progress');
const toTopEl = document.querySelector('.to-top');
const onScroll = () => {
  const y = window.scrollY;
  navEl.classList.toggle('scrolled', y > 24);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressEl.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
  toTopEl.classList.toggle('show', y > 600);
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTopEl.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
