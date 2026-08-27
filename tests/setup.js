import "@testing-library/jest-dom/vitest";

if (!window.scrollTo) {
  window.scrollTo = () => {};
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = class {
    observe() {}
    disconnect() {}
    unobserve() {}
  };
}
