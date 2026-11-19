(() => {
  const stage = document.querySelector('[data-about-stage]');
  if (!stage) return;
  const camera = stage.querySelector('.about-film-camera');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pending = 0;
  let point;
  let visible = true;

  function resetCamera() {
    if (pending) cancelAnimationFrame(pending);
    pending = 0;
    camera.style.removeProperty('--about-camera-x');
    camera.style.removeProperty('--about-camera-y');
  }

  function updateStage() {
    stage.classList.toggle('about-stage-visible', visible && !reduced.matches && !document.hidden);
    if (reduced.matches || document.hidden) resetCamera();
  }

  stage.addEventListener('pointermove', event => {
    if (reduced.matches || event.pointerType === 'touch') return;
    point = event;
    if (pending) return;

    pending = requestAnimationFrame(() => {
      pending = 0;
      const bounds = stage.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const x = (point.clientX - bounds.left) / bounds.width - .5;
      const y = (point.clientY - bounds.top) / bounds.height - .5;
      camera.style.setProperty('--about-camera-x', `${9 - y * 16}deg`);
      camera.style.setProperty('--about-camera-y', `${-13 + x * 22}deg`);
    });
  }, { passive: true });
  stage.addEventListener('pointerleave', resetCamera);
  stage.addEventListener('pointercancel', resetCamera);
  reduced.addEventListener('change', updateStage);
  document.addEventListener('visibilitychange', updateStage);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === stage) {
          visible = entry.isIntersecting;
          updateStage();
        } else if (entry.isIntersecting) {
          entry.target.classList.add('about-revealed');
          observer.unobserve(entry.target);
        }
      }
    });
    observer.observe(stage);
    document.querySelectorAll('[data-about-reveal]').forEach(element => observer.observe(element));
  }
  updateStage();
})();
