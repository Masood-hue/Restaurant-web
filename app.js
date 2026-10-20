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

