'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const navLink = document.querySelector('.nav__link');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');

// Tabbed components
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

// Modal window start
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// Modal window ends

// Smooth scroll
btnScollTo.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// MENU / PAGE (event) DELEGATION! on the menu links for a smooth scroll
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching the current click strategy with delegation
  if (e.target.classList.contains('nav__link')) {
    const currentId = e.target.getAttribute('href');
    const bubbleId = document.querySelector(currentId);
    bubbleId.scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed components
// using event delegation
tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  //remove the active tab class b4adding the activ class to the active
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  // removing the active content first
  tabContent.forEach(content => {
    content.classList.remove('operations__content--active');
  });

  clicked.classList.add('operations__tab--active');
  //Activating content area!
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// MENU FADE ANIMATION
const hoverHandler = function (e) {
  const links = e.target.classList.contains('nav__link');

  if (links) {
    const clickedLink = e.target;
    const linkSiblings = clickedLink
      .closest('.nav')
      .querySelectorAll('.nav__link');
    const logo = clickedLink.closest('.nav').querySelector('img');

    linkSiblings.forEach(el => {
      if (el !== clickedLink) el.style.opacity = this;
    });
    // logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', hoverHandler.bind(0.5));
nav.addEventListener('mouseout', hoverHandler.bind(1));

///////////////////////////////////////////////////////////////////////
// -----------------------Intersection observer API--------------------
// STICKY NAVIGATION
// Obeserving the header being out of view
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries, _observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
///////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// Reveal sections

const sections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// LAZY LOADING IMAGES!
const imageTargets = document.querySelectorAll('img[data-src]');

const observedImages = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(observedImages, {
  root: null,
  threshold: 0,
  // rootMargin: '200px', // for the user not to realise the lay loading
});

imageTargets.forEach(img => imgObserver.observe(img));
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// IEEF
// Slider (Testimonial)
(function () {
  //
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSLide = slides.length;

  slides.forEach(
    (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
  );

  // Dots
  const createDots = function () {
    slides.forEach((_s, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateActiveDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  function gotoSlide(slide) {
    slides.forEach(
      (sl, i) => (sl.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  // Slider initialization function!
  (function () {
    createDots();
    activateActiveDot(currentSlide);
    gotoSlide(currentSlide);
  })();

  // Next slide
  const nextSlide = function () {
    if (currentSlide === maxSLide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    // 0%, 100%, 200%, 300%
    gotoSlide(currentSlide);
    activateActiveDot(currentSlide);
  };

  // Previous slide
  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSLide - 1;
    } else {
      currentSlide--;
    }

    gotoSlide(currentSlide);
  };

  // btn handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', previousSlide);

  // Slider dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activateActiveDot(slide);
    }
  });
})();
////////////////////////////////////////////////////////////////
