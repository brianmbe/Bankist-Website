// DOM MANIPULATION
// console.log(document.documentElement);
const buttons = document.getElementsByTagName('button');
console.log(buttons);

document.getElementsByClassName('btn');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent =
  'We used cookies for improved functionality of the website.';
message.innerHTML =
  'We use cookies for improved functionality <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
// // copying the created elements
// header.append(message.cloneNode(true));

// Inserting elements programatically
header.append(message);
// header.before(message);
// header.after(message);

// Deleting created elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

// STYLES

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.padding = '1.5rem';

console.log(message.style.backgroundColor);
console.log(message.style.color);
console.log(message.style.padding);
console.log(getComputedStyle(message).padding);

document.documentElement.style.setProperty('--color-primary', 'orangered');

// ATTRIBUTES
const logo = document.querySelector('.nav__logo');
const link = document.querySelector('.nav__link--btn');

console.log(logo.alt);
console.log(logo.className);
console.log(logo.src);
logo.setAttribute('designer', 'Brian');
console.log(logo.getAttribute('designer'));

console.log(link.href);
console.log(link.getAttribute('href'));

logo.classList.toggle;

// Scrollo
// Smooth scroll
/* */
btnScollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();
  const leftCoords = s1coords.left + window.scrollX;
  const topCoords = s1coords.top + window.scrollY;

  window.scrollTo({
    left: leftCoords,
    top: topCoords,
    behavior: 'smooth',
  });
});

const h1 = document.querySelector('h1');

h1.addEventListener('mouseenter', () => {
  alert('Mouse is on!');
});

// Bubbling and event delgations
// MENU / PAGE (event) DELEGATION!
/*

// 01. From within the individual element is the last bubble phase
document.querySelectorAll('.nav__link').forEach(el => {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const currentId = this.getAttribute('href');
    const bubbleId = document.querySelector(currentId);
    bubbleId.scrollIntoView({ behavior: 'smooth' });

    console.log('Smooth Scroll to', currentId, e.BUBBLING_PHASE);
  });
});
 */

// 02. from the parent elements
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching the current click strategy
  if (e.target.classList.contains('nav__link')) {
    const currentId = e.target.getAttribute('href');
    const bubbleId = document.querySelector(currentId);
    bubbleId.scrollIntoView({ behavior: 'smooth' });
  }
});

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

/*
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
*/
