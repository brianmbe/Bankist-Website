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
  tabContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  clicked.classList.add('operations__tab--active');
  //Activating content area!
  document
    .querySelector(`operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
///////////////////////////////////////////////////////////////////////

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
*/
