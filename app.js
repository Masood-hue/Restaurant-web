/* ============================================================
   SAVORA — Restaurant Website JavaScript
   Vanilla JS only. No frameworks, no dependencies.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1. MOBILE NAVIGATION
     ========================================================= */
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
  /* =========================================================
     2. STICKY NAVIGATION SHADOW
     ========================================================= */
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }
  });
/* =========================================================
     3. SMOOTH SCROLLING FOR INTERNAL LINKS
     ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})