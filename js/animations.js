/* ============================================
   ANIMATIONS.JS — GSAP ScrollTrigger Animations
   ============================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  /* ---------- General Scroll Reveal ---------- */
  var revealElements = document.querySelectorAll('.reveal');

  revealElements.forEach(function (el, index) {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        },
        onComplete: function () {
          el.classList.add('in-view');
        }
      }
    );
  });

  /* ---------- Hero Content Animation ---------- */
  var heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    var heroTl = gsap.timeline({ delay: 0.3 });

    heroTl
      .fromTo('.hero__logo', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' })
      .fromTo('.hero__title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .fromTo('.hero__subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero__text', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo('.hero__actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .fromTo('.hero__scroll', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.1');
  }

  /* ---------- Timeline Progress ---------- */
  var timelineProgress = document.getElementById('timelineProgress');
  var timeline = document.querySelector('.timeline');

  if (timelineProgress && timeline) {
    gsap.to(timelineProgress, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1
      }
    });
  }

  /* ---------- Timeline Items ---------- */
  var timelineItems = document.querySelectorAll('.timeline__item');
  timelineItems.forEach(function (item) {
    gsap.fromTo(item,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          once: true,
          onEnter: function () {
            item.classList.add('in-view');
          }
        }
      }
    );
  });

  /* ---------- Quote Animation ---------- */
  var quote = document.querySelector('.quote');
  if (quote) {
    var quoteTl = gsap.timeline({
      scrollTrigger: {
        trigger: quote,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          quote.classList.add('in-view');
        }
      }
    });

    quoteTl
      .fromTo('.quote__mark', { opacity: 0, scale: 0.5 }, { opacity: 0.3, scale: 1, duration: 0.8, ease: 'power3.out' })
      .fromTo('.quote__text', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .fromTo('.quote__author', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .fromTo('.quote__line', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3');
  }

  /* ---------- Gallery Items ---------- */
  var galleryItems = document.querySelectorAll('.gallery__item');
  galleryItems.forEach(function (item, index) {
    gsap.fromTo(item,
      { opacity: 0, y: 30, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        delay: index * 0.08,
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          once: true
        }
      }
    );
  });

  /* ---------- Section Headers ---------- */
  var sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach(function (header) {
    var label = header.querySelector('.section-label');
    var title = header.querySelector('.section-title');

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        once: true
      }
    });

    if (label) {
      tl.fromTo(label, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    }
    if (title) {
      tl.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
    }
  });

  /* ---------- Leaders Cards ---------- */
  var leaderCards = document.querySelectorAll('.dir-leader');
  leaderCards.forEach(function (card) {
    gsap.fromTo(card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true
        }
      }
    );
  });

})();
