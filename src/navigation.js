/**
 * Navigation module – navbar scroll behaviour and mobile menu toggle.
 */

const SCROLL_THRESHOLD = 60;

function shouldAddScrolledClass(scrollY) {
  return scrollY > SCROLL_THRESHOLD;
}

function applyNavbarScroll(navElement, scrollY) {
  if (!navElement) return;
  navElement.classList.toggle('scrolled', shouldAddScrolledClass(scrollY));
}

function toggleMobileMenu(menuElement) {
  if (!menuElement) return;
  menuElement.classList.toggle('open');
}

function initScrollReveal(elements, observer) {
  if (!elements || !observer) return;
  elements.forEach(function (el) { observer.observe(el); });
}

function handleRevealEntry(entry, observer) {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SCROLL_THRESHOLD,
    shouldAddScrolledClass,
    applyNavbarScroll,
    toggleMobileMenu,
    initScrollReveal,
    handleRevealEntry,
  };
}
