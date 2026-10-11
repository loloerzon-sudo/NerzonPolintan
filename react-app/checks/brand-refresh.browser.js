// Run in the browser console after the page and its transitions finish.
(() => {
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  check(document.documentElement.scrollWidth <= innerWidth, 'Page overflows horizontally');
  check(document.querySelector('footer a[href="/personality"]'), 'Missing Architect footer link');
  if (location.pathname === '/') {
    const action = document.querySelector('.gateway-cta');
    check(action?.getAttribute('href') === '/console', 'Missing primary console action');
    check(action.getBoundingClientRect().bottom <= innerHeight, 'Console action below the first screen');
    check(!document.querySelector('main img[src*="john-nerzon"]'), 'Landing still loads a persona');
    for (const href of ['https://t.me/nerzon022', 'https://wa.me/639165271923', 'https://www.facebook.com/nerzon.online/']) {
      check(document.querySelector(`main a[href="${href}"]`), `Missing contact ${href}`);
    }
  } else if (['/console', '/portfolio'].includes(location.pathname)) {
    check(!document.querySelector('.cognitive-card'), 'Architect block remains');
    check(getComputedStyle(document.querySelector('.portrait-img')).objectFit === 'contain', 'Portrait is cropped');
    check(document.querySelectorAll('.portrait-controls button').length === 3, 'Missing persona controls');
    const selected = document.querySelector('.project-filters [aria-pressed="true"]').textContent.trim();
    const cards = [...document.querySelectorAll('.project-card')];
    const expected = selected.startsWith('ALL') ? 8 : selected.startsWith('ACTIVE') ? 5 : 3;
    check(cards.length === expected, `Project filter expected ${expected} cards, got ${cards.length}`);
    if (!selected.startsWith('ALL')) {
      const status = selected.startsWith('ACTIVE') ? 'IN PROGRESS' : 'SHIPPED';
      check(cards.every(card => card.querySelector('.project-status').textContent === status), 'Filter includes the wrong status');
    }
  }
  return 'Brand refresh checks passed';
})();
