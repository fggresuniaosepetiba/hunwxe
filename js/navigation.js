/* ============================================
   NAVIGATION.JS — Menu, Scroll Spy, Smooth Scroll
   ============================================ */

(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');
  const links = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  /* ---------- Mobile Toggle ---------- */
  function toggleMenu() {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
    navToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  }

  navToggle.addEventListener('click', toggleMenu);

  /* Close menu on link click */
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navLinks.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      toggleMenu();
      navToggle.focus();
    }
  });

  /* ---------- Scroll: nav background ---------- */
  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll Spy ---------- */
  function updateActiveLink() {
    var scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        links.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

})();
