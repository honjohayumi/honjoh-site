/* ========================================
   HONJOH AYUMI — Homepage Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Loader ---
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 800);
    });
    // Safety: hide after 3s regardless
    setTimeout(() => loader.classList.add('hidden'), 3000);
  }

  // --- Nav toggle (mobile) ---
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  // --- Nav scroll state ---
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Scroll animations ---
  const animEls = document.querySelectorAll('[data-animate]');
  if (animEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animEls.forEach(el => observer.observe(el));
  }

  // --- Gallery drag-to-scroll ---
  const galleryFull = document.querySelector('.gallery-full');
  if (galleryFull) {
    let isDown = false;
    let startX;
    let scrollLeft;

    galleryFull.addEventListener('mousedown', (e) => {
      isDown = true;
      galleryFull.style.cursor = 'grabbing';
      startX = e.pageX - galleryFull.offsetLeft;
      scrollLeft = galleryFull.scrollLeft;
    });

    galleryFull.addEventListener('mouseleave', () => {
      isDown = false;
      galleryFull.style.cursor = 'grab';
    });

    galleryFull.addEventListener('mouseup', () => {
      isDown = false;
      galleryFull.style.cursor = 'grab';
    });

    galleryFull.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - galleryFull.offsetLeft;
      const walk = (x - startX) * 1.5;
      galleryFull.scrollLeft = scrollLeft - walk;
    });
  }

  // --- Smooth anchor scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
