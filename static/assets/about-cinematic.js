(() => {
  const stage = document.querySelector('[data-about-stage]');
  if (!stage) return;
  const camera = stage.querySelector('.about-film-camera');
  const hero = stage.closest('.about-film-hero');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pending = 0;
  let point;
  let visible = true;
  let scrollFrame = 0;
  const compact = window.matchMedia('(max-width: 820px)');
  const effects = [
    ['--about-story-yaw', 0, 62, 'deg'],
    ['--about-sculpture-scale', 1, .65, ''],
    ['--about-ring-scale', 1, 1.13, ''],
    ['--about-ring-opacity', 1, .72, ''],
    ['--about-path-scale', .25, 1, ''],
    ['--about-path-opacity', 0, .84, ''],
    ['--about-channel-glow', 0, 17, 'px'],
  ];

  function renderStory() {
    scrollFrame = 0;
    const bounds = (compact.matches ? stage : hero).getBoundingClientRect();
    const start = compact.matches ? window.innerHeight * .72 : 15;
    const distance = compact.matches ? 105 : Math.min(205, window.innerHeight * .27);
    const travel = Math.max(0, Math.min(1, (start - bounds.top) / distance));
    const eased = travel * travel * (3 - 2 * travel);

    for (const [property, from, to, unit] of effects) {
      stage.style.setProperty(property, `${(from + (to - from) * eased).toFixed(3)}${unit}`);
    }
    stage.setAttribute('data-about-led', '');
  }

  function scheduleStory() {
    if (!scrollFrame && visible && !document.hidden && !reduced.matches) {
      scrollFrame = requestAnimationFrame(renderStory);
    }
  }

  function resetCamera() {
    if (pending) cancelAnimationFrame(pending);
    pending = 0;
    camera.style.removeProperty('--about-camera-x');
    camera.style.removeProperty('--about-camera-y');
  }

  function updateStage() {
    stage.classList.toggle('about-stage-visible', visible && !reduced.matches && !document.hidden);
    if (reduced.matches || document.hidden || !visible) {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      scrollFrame = 0;
    }
    if (reduced.matches) {
      stage.removeAttribute('data-about-led');
      for (const [property] of effects) stage.style.removeProperty(property);
    }
    if (reduced.matches || document.hidden) resetCamera();
    scheduleStory();
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
  window.addEventListener('scroll', scheduleStory, { passive: true });
  window.addEventListener('resize', scheduleStory, { passive: true });

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
