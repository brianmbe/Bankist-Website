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
  section.classList.add('section--hidden');
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
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
/**

const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', () => {
//   alert('Mouse is on!');
// });

const alertH1 = function (e) {
  alert('An adeventListener');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
const randomInt = (min, max) =>
Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

navLink.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget);
  
  // Stopping the event propagation
  e.stopImmediatePropagation();
});

navLinks.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget);
});

nav.addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log(e.target, e.currentTarget);
  },
  true
  );
  
  */

// DOM traversing

/* 
//going downwards while
const h1 = document.querySelector('h1');
// child elements downwards!
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.children);
document.querySelector('h1').firstElementChild.style.color = '#FFF';
document.querySelector('h1').lastElementChild.style.color = 'orangered';

// going upwards
console.log(document.querySelector('h1').parentNode);
console.log(document.querySelector('h1').parentElement);

h1.closest('.header').style.backgroundColor = 'var(--color-secondary)';
h1.closest('h1').style.backgroundColor = 'var(--color-tertiary)';

// Going sideways
console.log(h1.previousElementSibling);
h1.nextElementSibling.style.backgroundColor = 'var(--color-primary)';
h1.nextElementSibling.style.padding = '2rem';
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
    el.style.padding = '0';
  }
});

//////////////////////////////////////////////////////////////////
// STICKY NAVIGATION
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function (e) {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

or 

const obsCallback = function (entries, _observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null,
  treshold: [0, 0.2, 0.5],
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

*/
