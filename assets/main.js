// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const saved = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(saved);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}

// Mobile sidebar
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  });
}

if (overlay) {
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });
}

// Scroll progress
const progressBar = document.getElementById('progress-bar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
  });
}

// TOC active tracking
const tocLinks = document.querySelectorAll('.toc-link');
const headings = [];

tocLinks.forEach(link => {
  const id = link.getAttribute('href')?.slice(1);
  if (id) {
    const el = document.getElementById(id);
    if (el) headings.push({ el, link });
  }
});

if (headings.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const h = headings.find(h => h.el === entry.target);
      if (h) {
        tocLinks.forEach(l => l.classList.remove('active'));
        h.link.classList.add('active');
      }
    });
  }, { rootMargin: '-80px 0px -70% 0px' });

  headings.forEach(h => observer.observe(h.el));
}

// Scroll animation
const animItems = document.querySelectorAll('.animate-in');
if (animItems.length) {
  const animObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        animObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  animItems.forEach(el => {
    el.style.animationPlayState = 'paused';
    animObserver.observe(el);
  });
}

// Simple search (client-side)
const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.card[data-search]');
    cards.forEach(card => {
      const text = card.getAttribute('data-search').toLowerCase();
      card.style.display = !q || text.includes(q) ? '' : 'none';
    });
  });
}
