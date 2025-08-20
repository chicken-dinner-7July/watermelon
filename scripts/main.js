// Modal functionality
(function () {
  const ACTIVE_CLASS = 'is-open';
  let lastTrigger = null;

  function openModal(modal, trigger) {
    if (!modal) return;
    lastTrigger = trigger || null;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add(ACTIVE_CLASS);

    const closeBtn = modal.querySelector('[data-modal-close], .modal-close');
    if (closeBtn) closeBtn.focus();

    document.addEventListener('keydown', onEsc);
    modal.addEventListener('click', onBackdrop);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove(ACTIVE_CLASS);

    document.removeEventListener('keydown', onEsc);
    modal.removeEventListener('click', onBackdrop);

    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      try { lastTrigger.focus(); } catch (e) {}
    }
    lastTrigger = null;
  }

  function onEsc(e) {
    if (e.key === 'Escape') {
      const open = document.querySelector('.modal-overlay[aria-hidden="false"]');
      if (open) closeModal(open);
    }
  }

  function onBackdrop(e) {
    if (e.target.classList && e.target.classList.contains('modal-overlay')) {
      closeModal(e.target);
    }
  }

  document.addEventListener('click', function (e) {
    const openEl = e.target.closest('[data-modal-open]');
    if (openEl) {
      e.preventDefault();
      const selector = openEl.getAttribute('data-modal-open');
      const modal = document.querySelector(selector);
      openModal(modal, openEl);
      return;
    }

    const closeEl = e.target.closest('[data-modal-close]');
    if (closeEl) {
      e.preventDefault();
      const modal = e.target.closest('.modal-overlay');
      if (modal) closeModal(modal);
    }
  });
})();

// Scroll to top functionality
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

scrollTopBtn.onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark');
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}

// Initialize theme from localStorage
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeIcon = document.getElementById('theme-icon');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark');
    themeIcon.textContent = '☀️';
  } else {
    themeIcon.textContent = '🌙';
  }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initTheme);