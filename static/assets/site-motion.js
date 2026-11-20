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

    const navigation = header.querySelector('.nav-links');
    if (navigation) {
      const links = [...navigation.querySelectorAll(':scope > a, :scope > .product-menu > a')];
      const current = links.find(link => link.matches('.active, [aria-current="page"]'));
      const pill = document.createElement('span');
      pill.className = 'lw-menu-highlight';
      pill.setAttribute('aria-hidden', 'true');
      navigation.classList.add('lw-menu-highlight-ready');
      navigation.prepend(pill);

      let hovered;
      let focused;
      function highlight() {
        const link = hovered || focused || current;
        if (!link || !navigation.getClientRects().length) {
          pill.removeAttribute('data-shown');
          return;
        }
        const frame = navigation.getBoundingClientRect();
        const bounds = link.getBoundingClientRect();
        if (!pill.hasAttribute('data-shown')) {
          pill.setAttribute('data-positioning', '');
          requestAnimationFrame(() => pill.removeAttribute('data-positioning'));
        }
        pill.style.setProperty('--lw-menu-x', `${bounds.left - frame.left - 9}px`);
        pill.style.setProperty('--lw-menu-y', `${bounds.top - frame.top - 6}px`);
        pill.style.setProperty('--lw-menu-width', `${bounds.width + 18}px`);
        pill.style.setProperty('--lw-menu-height', `${bounds.height + 12}px`);
        pill.setAttribute('data-shown', '');
      }

      for (const link of links) {
        const target = link.closest('.product-menu') || link;
        target.addEventListener('pointerenter', event => {
          if (event.pointerType === 'touch') return;
          hovered = link;
          highlight();
        });
        target.addEventListener('pointerleave', () => {
          hovered = undefined;
          highlight();
        });
        target.addEventListener('focusin', () => {
          focused = link;
          highlight();
        });
        target.addEventListener('focusout', event => {
          if (target.contains(event.relatedTarget)) return;
          focused = undefined;
          highlight();
        });
      }
      window.addEventListener('resize', highlight, { passive: true });
      header.querySelector('.mobile-toggle')?.addEventListener('click', () => requestAnimationFrame(highlight));
      document.fonts?.ready.then(highlight);
      highlight();
    }
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

  const mediaFrames = document.querySelectorAll(
    'main :is(.lw-hero-frame, .lw-product-media, .lw-origin-image, .suite-card-visual, .product-detail-visual, .geo-visual, .geo-screen, .founder-photo)'
  );
  for (const surface of mediaFrames) {
    const image = surface.querySelector(':scope > img, :scope > a > img');
    if (!image) continue;

    surface.classList.add('lw-liquid-media');
    image.classList.add('lw-liquid-image');
    let frame = 0;
    let position;

    function moveGlass() {
      frame = 0;
      const bounds = surface.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const percentage = (offset, size) => `${Math.max(0, Math.min(100, offset / size * 100)).toFixed(1)}%`;
      surface.style.setProperty('--lw-glass-x', percentage(position.clientX - bounds.left, bounds.width));
      surface.style.setProperty('--lw-glass-y', percentage(position.clientY - bounds.top, bounds.height));
      surface.setAttribute('data-lw-glass-active', '');
    }

    function clearGlass() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      surface.removeAttribute('data-lw-glass-active');
    }

    surface.addEventListener('pointermove', event => {
      if (preferences.matches || event.pointerType === 'touch') return;
      position = event;
      if (!frame) frame = requestAnimationFrame(moveGlass);
    }, { passive: true });
    surface.addEventListener('pointerleave', clearGlass);
    surface.addEventListener('pointercancel', clearGlass);
    preferences.addEventListener('change', clearGlass);
  }

  const showcase = document.querySelector('[data-logo-showcase]');
  if (!showcase) return;
  for (const track of showcase.querySelectorAll('.lw-logo-track')) {
    const duplicate = track.querySelector('ul').cloneNode(true);
    duplicate.classList.add('lw-logo-clone');
    duplicate.setAttribute('aria-hidden', 'true');
    track.append(duplicate);
  }

  for (const rail of showcase.querySelectorAll('.lw-logo-rail')) {
    const logos = [...rail.querySelectorAll('li')];
    let frame = 0;
    let cursorX;
    function magnify() {
      frame = 0;
      const scales = logos.map(logo => {
        const box = logo.getBoundingClientRect();
        const distance = Math.abs(box.left + box.width / 2 - cursorX);
        return 1 + .52 * Math.pow(Math.max(0, 1 - distance / 145), 1.5);
      });
      logos.forEach((logo, index) => {
        logo.style.setProperty('--lw-logo-zoom', scales[index].toFixed(3));
        logo.toggleAttribute('data-near', scales[index] > 1.08);
      });
    }

    function clearMagnification() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      for (const logo of logos) {
        logo.style.removeProperty('--lw-logo-zoom');
        logo.removeAttribute('data-near');
      }
    }
    rail.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch' || preferences.matches || showcase.dataset.mode !== 'scroll') return;
      cursorX = event.clientX;
      if (!frame) frame = requestAnimationFrame(magnify);
    }, { passive: true });
    rail.addEventListener('pointerleave', clearMagnification);
    preferences.addEventListener('change', clearMagnification);
  }

  function updateShowcase() {
    showcase.dataset.mode = preferences.matches ? 'grid' : 'scroll';
  }
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
