document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimation();
  initBackToTop();
  initCounters();
  initRetreatFilters();
  initCourseFilters();
  initBookingPrefill();
  initBookingForm();
  initFAQAutoClose();
  initSmoothAnchorScroll();
});

function initRevealAnimation() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.12 });
  revealElements.forEach(el => observer.observe(el));
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(counter => {
    const target = Number(counter.dataset.counter || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 80));
    const tick = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        return;
      }
      counter.textContent = current;
      requestAnimationFrame(tick);
    };
    tick();
  });
}

function initRetreatFilters() {
  const grid = document.getElementById('retreatGrid');
  if (!grid) return;

  const search = document.getElementById('retreatSearch');
  const duration = document.getElementById('durationFilter');
  const theme = document.getElementById('themeFilter');

  const apply = () => {
    const s = (search?.value || '').toLowerCase();
    const d = duration?.value || '';
    const t = theme?.value || '';

    grid.querySelectorAll('.retreat-item').forEach(card => {
      const text = card.textContent.toLowerCase();
      const cardDuration = card.dataset.duration;
      const cardTheme = card.dataset.theme;
      const visible = text.includes(s) && (!d || d === cardDuration) && (!t || cardTheme.includes(t));
      card.style.display = visible ? '' : 'none';
    });
  };

  [search, duration, theme].forEach(el => el?.addEventListener('input', apply));
  [duration, theme].forEach(el => el?.addEventListener('change', apply));
}

function initCourseFilters() {
  const grid = document.getElementById('courseGrid');
  if (!grid) return;

  const search = document.getElementById('courseSearch');
  const level = document.getElementById('levelFilter');
  const category = document.getElementById('categoryFilter');

  const apply = () => {
    const s = (search?.value || '').toLowerCase();
    const l = level?.value || '';
    const c = category?.value || '';

    grid.querySelectorAll('.course-item').forEach(card => {
      const text = card.textContent.toLowerCase();
      const cardLevel = card.dataset.level;
      const cardCategory = card.dataset.category;
      const visible = text.includes(s) && (!l || l === cardLevel) && (!c || cardCategory.includes(c));
      card.style.display = visible ? '' : 'none';
    });
  };

  [search, level, category].forEach(el => el?.addEventListener('input', apply));
  [level, category].forEach(el => el?.addEventListener('change', apply));
}

function initBookingPrefill() {
  const selected = document.getElementById('selectedItem');
  if (!selected) return;
  const params = new URLSearchParams(window.location.search);
  const item = params.get('item');
  if (!item) return;

  const cleanItem = decodeURIComponent(item);
  selected.value = cleanItem;

  const summary = document.getElementById('bookingSummaryItem');
  if (summary) summary.textContent = cleanItem;
}

function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const success = document.getElementById('bookingSuccess');
    success?.classList.remove('d-none');
    form.classList.remove('was-validated');
    form.reset();
  });
}

function initFAQAutoClose() {
  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(acc => {
    acc.querySelectorAll('.accordion-button').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  });
}

function initSmoothAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
