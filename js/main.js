/* ============================================
   MAIN.JS — Lightbox, Lazy Loading, Utilities
   ============================================ */

(function () {
  'use strict';

  /* ---------- Gallery Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('.lightbox__img') : null;
  var lightboxClose = lightbox ? lightbox.querySelector('.lightbox__close') : null;
  var lightboxPrev = lightbox ? lightbox.querySelector('.lightbox__prev') : null;
  var lightboxNext = lightbox ? lightbox.querySelector('.lightbox__next') : null;
  var lightboxCounter = lightbox ? lightbox.querySelector('.lightbox__counter') : null;
  var galleryItems = document.querySelectorAll('.gallery__item');
  var currentIndex = 0;
  var images = [];

  galleryItems.forEach(function (item) {
    var img = item.querySelector('.gallery__img');
    if (img) {
      images.push({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt')
      });
    }

    item.addEventListener('click', function () {
      var idx = parseInt(item.getAttribute('data-index'), 10);
      openLightbox(idx);
    });

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var idx = parseInt(item.getAttribute('data-index'), 10);
        openLightbox(idx);
      }
    });

    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
  });

  function openLightbox(index) {
    if (!lightbox || images.length === 0) return;
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  function updateLightboxImage() {
    if (!lightboxImg || !lightboxCounter) return;
    var image = images[currentIndex];
    if (!image) return;
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', nextImage);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevImage);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
    }
  });

  /* ---------- Lazy Loading (native + fallback) ---------- */
  if ('loading' in HTMLImageElement.prototype) {
    var lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(function (img) {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    var lazyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          lazyObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
      lazyObserver.observe(img);
    });
  }

  /* ---------- Smooth scroll offset fix ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = document.getElementById('nav').offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- Timeline Lightbox ---------- */
  var tlLightbox = document.getElementById('timelineLightbox');
  var tlLbImg = tlLightbox ? tlLightbox.querySelector('.timeline-lightbox__img') : null;
  var tlLbClose = tlLightbox ? tlLightbox.querySelector('.timeline-lightbox__close') : null;
  var tlLbPrev = tlLightbox ? tlLightbox.querySelector('.timeline-lightbox__prev') : null;
  var tlLbNext = tlLightbox ? tlLightbox.querySelector('.timeline-lightbox__next') : null;
  var tlLbYear = tlLightbox ? tlLightbox.querySelector('.timeline-lightbox__year') : null;
  var tlLbTitle = tlLightbox ? tlLightbox.querySelector('.timeline-lightbox__title') : null;
  var tlLbDesc = tlLightbox ? tlLightbox.querySelector('.timeline-lightbox__desc') : null;
  var tlImages = [];
  var tlIndex = 0;

  document.querySelectorAll('.timeline__image').forEach(function (img) {
    var item = img.closest('.timeline__item');
    var year = item ? item.querySelector('.timeline__year') : null;
    var title = item ? item.querySelector('.timeline__title') : null;
    var text = item ? item.querySelector('.timeline__text') : null;

    tlImages.push({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
      year: year ? year.textContent : '',
      title: title ? title.textContent : '',
      desc: text ? text.textContent : ''
    });

    function openTlLb(idx) {
      tlIndex = idx;
      updateTlLb();
      tlLightbox.classList.add('active');
      tlLightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
      tlLbClose.focus();
    }

    img.addEventListener('click', function () {
      openTlLb(parseInt(img.getAttribute('data-tl-index'), 10));
    });

    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openTlLb(parseInt(img.getAttribute('data-tl-index'), 10));
      }
    });
  });

  function updateTlLb() {
    var data = tlImages[tlIndex];
    if (!data) return;
    tlLbImg.src = data.src;
    tlLbImg.alt = data.alt;
    tlLbYear.textContent = data.year;
    tlLbTitle.textContent = data.title;
    tlLbDesc.textContent = data.desc;
  }

  function closeTlLb() {
    if (!tlLightbox) return;
    tlLightbox.classList.remove('active');
    tlLightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  function nextTlImage() {
    tlIndex = (tlIndex + 1) % tlImages.length;
    updateTlLb();
  }

  function prevTlImage() {
    tlIndex = (tlIndex - 1 + tlImages.length) % tlImages.length;
    updateTlLb();
  }

  if (tlLbClose) tlLbClose.addEventListener('click', closeTlLb);
  if (tlLbNext) tlLbNext.addEventListener('click', nextTlImage);
  if (tlLbPrev) tlLbPrev.addEventListener('click', prevTlImage);

  if (tlLightbox) {
    tlLightbox.addEventListener('click', function (e) {
      if (e.target === tlLightbox) closeTlLb();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!tlLightbox || !tlLightbox.classList.contains('active')) return;
    switch (e.key) {
      case 'Escape': closeTlLb(); break;
      case 'ArrowRight': nextTlImage(); break;
      case 'ArrowLeft': prevTlImage(); break;
    }
  });

})();
