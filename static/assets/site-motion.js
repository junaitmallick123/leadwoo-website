(() => {
  const preferences = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('body header');
  const footer = Array.from(document.querySelectorAll('body footer')).at(-1);

  if (header) {
    header.classList.add('lw-motion-header');
    const progress = document.createElement('span');
    progress.className = 'lw-header-progress';
    progress.setAttribute('aria-hidden', 'true');
    header.append(progress);

    let scheduled = false;
    function updateHeader() {
      const position = window.scrollY;
      header.toggleAttribute('data-scrolled', position > 12);
      if (!preferences.matches) {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.setProperty('--lw-page-progress', available > 0 ? Math.min(1, Math.max(0, position / available)) : 0);
      }
      scheduled = false;
    }
    function scheduleHeader() {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(updateHeader);
      }
    }
    window.addEventListener('scroll', scheduleHeader, { passive: true });
    window.addEventListener('resize', scheduleHeader, { passive: true });
    preferences.addEventListener('change', scheduleHeader);
    updateHeader();
  }

  if (footer) {
    footer.classList.add('lw-motion-footer');
    const accent = document.createElement('span');
    accent.className = 'lw-footer-accent';
    accent.setAttribute('aria-hidden', 'true');
    footer.prepend(accent);
    if (!preferences.matches && 'IntersectionObserver' in window) {
      const reveal = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !preferences.matches) {
          footer.classList.add('lw-in-view');
          reveal.disconnect();
        }
      }, { rootMargin: '0px 0px -28px' });
      reveal.observe(footer);
    }
  }

  const showcase = document.querySelector('[data-logo-showcase]');
  if (!showcase) return;
  const controls = showcase.querySelector('.lw-logo-actions');
  const pause = showcase.querySelector('[data-logo-pause]');
  const expand = showcase.querySelector('[data-logo-expand]');
  for (const track of showcase.querySelectorAll('.lw-logo-track')) {
    const duplicate = track.querySelector('ul').cloneNode(true);
    duplicate.classList.add('lw-logo-clone');
    duplicate.setAttribute('aria-hidden', 'true');
    track.append(duplicate);
  }

  let expanded = false;
  let paused = false;
  function updateShowcase() {
    const scrolling = !preferences.matches && !expanded;
    showcase.dataset.mode = scrolling ? 'scroll' : 'grid';
    showcase.toggleAttribute('data-paused', paused);
    controls.hidden = preferences.matches;
    pause.hidden = !scrolling;
    pause.textContent = paused ? 'Play logos' : 'Pause logos';
    expand.textContent = expanded ? 'Show scrolling logos' : 'Show all logos';
    expand.setAttribute('aria-expanded', String(!scrolling));
  }
  pause.addEventListener('click', () => { paused = !paused; updateShowcase(); });
  expand.addEventListener('click', () => { expanded = !expanded; updateShowcase(); });
  preferences.addEventListener('change', updateShowcase);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      showcase.toggleAttribute('data-visible', entry.isIntersecting);
    }).observe(showcase);
  } else {
    showcase.setAttribute('data-visible', '');
  }
  updateShowcase();
})();
