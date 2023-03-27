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
