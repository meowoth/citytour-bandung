const {
  SCROLL_THRESHOLD,
  shouldAddScrolledClass,
  applyNavbarScroll,
  toggleMobileMenu,
  initScrollReveal,
  handleRevealEntry,
} = require('../src/navigation');

describe('shouldAddScrolledClass', () => {
  test('returns false when scrollY is 0', () => {
    expect(shouldAddScrolledClass(0)).toBe(false);
  });

  test('returns false when scrollY equals the threshold', () => {
    expect(shouldAddScrolledClass(SCROLL_THRESHOLD)).toBe(false);
  });

  test('returns true when scrollY exceeds the threshold', () => {
    expect(shouldAddScrolledClass(SCROLL_THRESHOLD + 1)).toBe(true);
  });

  test('returns true for a large scrollY', () => {
    expect(shouldAddScrolledClass(5000)).toBe(true);
  });

  test('SCROLL_THRESHOLD is 60', () => {
    expect(SCROLL_THRESHOLD).toBe(60);
  });
});

describe('applyNavbarScroll', () => {
  let nav;

  beforeEach(() => {
    nav = document.createElement('nav');
  });

  test('adds scrolled class when scrollY > threshold', () => {
    applyNavbarScroll(nav, 100);
    expect(nav.classList.contains('scrolled')).toBe(true);
  });

  test('removes scrolled class when scrollY <= threshold', () => {
    nav.classList.add('scrolled');
    applyNavbarScroll(nav, 30);
    expect(nav.classList.contains('scrolled')).toBe(false);
  });

  test('does nothing when navElement is null', () => {
    expect(() => applyNavbarScroll(null, 100)).not.toThrow();
  });
});

describe('toggleMobileMenu', () => {
  let menu;

  beforeEach(() => {
    menu = document.createElement('div');
  });

  test('adds open class when menu is closed', () => {
    toggleMobileMenu(menu);
    expect(menu.classList.contains('open')).toBe(true);
  });

  test('removes open class when menu is already open', () => {
    menu.classList.add('open');
    toggleMobileMenu(menu);
    expect(menu.classList.contains('open')).toBe(false);
  });

  test('toggling twice returns to original state', () => {
    toggleMobileMenu(menu);
    toggleMobileMenu(menu);
    expect(menu.classList.contains('open')).toBe(false);
  });

  test('does nothing when menuElement is null', () => {
    expect(() => toggleMobileMenu(null)).not.toThrow();
  });
});

describe('initScrollReveal', () => {
  test('calls observe on each element', () => {
    const els = [document.createElement('div'), document.createElement('div')];
    const observer = { observe: jest.fn() };
    initScrollReveal(els, observer);
    expect(observer.observe).toHaveBeenCalledTimes(2);
    expect(observer.observe).toHaveBeenCalledWith(els[0]);
    expect(observer.observe).toHaveBeenCalledWith(els[1]);
  });

  test('handles empty element list', () => {
    const observer = { observe: jest.fn() };
    initScrollReveal([], observer);
    expect(observer.observe).not.toHaveBeenCalled();
  });

  test('does nothing when elements is null', () => {
    expect(() => initScrollReveal(null, {})).not.toThrow();
  });

  test('does nothing when observer is null', () => {
    const els = [document.createElement('div')];
    expect(() => initScrollReveal(els, null)).not.toThrow();
  });
});

describe('handleRevealEntry', () => {
  test('adds visible class and unobserves when intersecting', () => {
    const target = document.createElement('div');
    const observer = { unobserve: jest.fn() };
    const entry = { isIntersecting: true, target };

    handleRevealEntry(entry, observer);
    expect(target.classList.contains('visible')).toBe(true);
    expect(observer.unobserve).toHaveBeenCalledWith(target);
  });

  test('does nothing when not intersecting', () => {
    const target = document.createElement('div');
    const observer = { unobserve: jest.fn() };
    const entry = { isIntersecting: false, target };

    handleRevealEntry(entry, observer);
    expect(target.classList.contains('visible')).toBe(false);
    expect(observer.unobserve).not.toHaveBeenCalled();
  });
});
