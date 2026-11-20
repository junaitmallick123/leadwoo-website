(() => {
  const hero = document.querySelector('.pricing-hero');
  const orbit = hero?.querySelector('.pricing-orbit');
  if (!orbit) return;
  const motion = matchMedia('(any-hover: hover) and (prefers-reduced-motion: no-preference)');
  function reset() {
    orbit.style.removeProperty('--pitch');
    orbit.style.removeProperty('--yaw');
  }
  hero.addEventListener('pointermove', event => {
    if (!motion.matches || event.pointerType === 'touch') return;
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    orbit.style.setProperty('--pitch', (47 - y * 32) + 'deg');
    orbit.style.setProperty('--yaw', (-12 + x * 44) + 'deg');
  });
  hero.addEventListener('pointerleave', reset);
  hero.addEventListener('pointercancel', reset);
  motion.addEventListener('change', reset);
})();
