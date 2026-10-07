// Nordic Grind: mobile menu, live opening status, small header detail.

// Opening hours in Copenhagen time. Keys are JS weekdays (0 = Sunday).
const HOURS = {
  0: ['09:00', '16:00'],
  1: ['07:30', '17:00'],
  2: ['07:30', '17:00'],
  3: ['07:30', '17:00'],
  4: ['07:30', '17:00'],
  5: ['07:30', '17:00'],
  6: ['09:00', '16:00'],
};
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function copenhagenNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Copenhagen',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

const toMinutes = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

function openingStatus() {
  const { day, minutes } = copenhagenNow();
  const [open, close] = HOURS[day];

  if (minutes >= toMinutes(open) && minutes < toMinutes(close)) {
    return { day, short: `<strong>Open now</strong>, until&nbsp;${close}`, long: `<strong>Open now</strong>, until&nbsp;${close} today` };
  }
  if (minutes < toMinutes(open)) {
    return { day, short: `Closed, opens at&nbsp;${open}`, long: `Closed right now. We open at ${open} today.` };
  }
  const next = (day + 1) % 7;
  return { day, short: `Closed, opens ${HOURS[next][0]}&nbsp;tomorrow`, long: `Closed for today. We open at ${HOURS[next][0]} tomorrow, ${DAY_NAMES[next]}.` };
}

function renderStatus() {
  const status = openingStatus();
  // Only touch the DOM when the text changes, so assistive tech isn't re-read the same status every minute
  const set = (el, html) => { if (el.dataset.rendered !== html) { el.innerHTML = html; el.dataset.rendered = html; } };
  document.querySelectorAll('[data-open-status]').forEach((el) => set(el, status.short));
  document.querySelectorAll('[data-open-status-long]').forEach((el) => set(el, status.long));
  document.querySelectorAll('.hours [data-days]').forEach((row) => {
    const days = row.dataset.days.includes('-')
      ? [1, 2, 3, 4, 5]
      : row.dataset.days.split(',').map(Number);
    row.classList.toggle('is-today', days.includes(status.day));
  });
}

renderStatus();
setInterval(renderStatus, 60 * 1000);

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const panel = document.getElementById('mobile-menu');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('.menu-toggle__label').textContent = open ? 'Close' : 'Menu';
  panel.hidden = !open;
  document.body.classList.toggle('is-locked', open);
  // Keep keyboard focus inside the open menu
  document.querySelectorAll('main, .site-footer').forEach((el) => { el.inert = open; });
  if (open) panel.querySelector('a').focus();
}

toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
panel.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !panel.hidden) { setMenu(false); toggle.focus(); }
});
window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

// Hairline under the header once the page scrolls
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

// ---------- Scroll motion ----------
// Everything below is skipped for visitors who prefer reduced motion; the page is complete without it.
const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

if (motionOK) {
  document.documentElement.classList.add('motion');

  // Curtain-up reveal for photographs, and the week timeline lighting up
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

  const weekObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting));
  }, { rootMargin: '-38% 0px -38% 0px' });
  document.querySelectorAll('[data-week] li').forEach((li) => weekObserver.observe(li));

  // Parallax drift and the widening panorama, driven by one rAF per scroll frame
  const drifters = [...document.querySelectorAll('[data-parallax]')];
  const widen = document.querySelector('[data-widen]');
  let ticking = false;

  const update = () => {
    const vh = window.innerHeight;
    drifters.forEach((img) => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const progress = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1 around the centre
      img.style.setProperty('--shift', `${(-progress * r.height * 0.07).toFixed(1)}px`);
    });
    if (widen) {
      const r = widen.getBoundingClientRect();
      // 0 when the panorama's top enters the bottom of the screen, 1 when it reaches 25% from the top
      const t = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
      widen.style.setProperty('--widen', t.toFixed(3));
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();

  // Ambient hero loop: load after the page, skip on data saver, pause when off screen
  const video = document.querySelector('.hero__video');
  const saveData = navigator.connection && navigator.connection.saveData;
  if (video && !saveData) {
    window.addEventListener('load', () => {
      video.src = video.dataset.src;
      video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
      video.play().catch(() => {});
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {}); else video.pause();
      }).observe(video);
    });
  }
}
