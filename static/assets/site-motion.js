(() => {
  const preferences = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('body header');
  const footer = Array.from(document.querySelectorAll('body footer')).at(-1);

  const mascotTargets = document.querySelectorAll(
    'header .nav-actions > a[href="https://app.tryleadwoo.com/"], a.btn-primary[href], button.contact-submit[type="submit"] > span'
  );
  for (const target of mascotTargets) {
    const mascot = document.createElement('img');
    mascot.className = 'lw-cta-mascot';
    mascot.width = 145;
    mascot.height = 148;
    mascot.alt = '';
    mascot.setAttribute('aria-hidden', 'true');
    mascot.decoding = 'async';
    mascot.src = '/leadwoo-website/assets/pricing-mascot.webp';
    target.prepend(mascot);
  }

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

    const channels = [
      ['linkedin', 'LinkedIn', '<rect width="24" height="24" rx="4" fill="#0a66c2"/><path fill="#fff" d="M5 9h3v10H5zm1.5-4.5a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM10 9h3v1.4a3.3 3.3 0 0 1 6 1.9V19h-3v-5.6c0-1-.4-1.6-1.3-1.6-1 0-1.7.7-1.7 1.8V19h-3z"/>'],
      ['gmail', 'Gmail', '<path fill="#4285f4" d="M1 7l4 3v10H2a1 1 0 0 1-1-1z"/><path fill="#34a853" d="M19 10l4-3v12a1 1 0 0 1-1 1h-3z"/><path fill="#ea4335" d="M5 5l7 5.3L19 5v5l-7 5.3L5 10z"/><path fill="#c5221f" d="M1 5.4a1.7 1.7 0 0 1 2.7-1.3L5 5v5L1 7z"/><path fill="#fbbc04" d="m19 5 1.3-.9A1.7 1.7 0 0 1 23 5.4V7l-4 3z"/>'],
      ['whatsapp', 'WhatsApp', '<path fill="#128650" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.4-.2-2.3.6.6-2.2-.2-.4A8 8 0 1 1 12 20Z"/><path fill="#128650" d="M9.6 7.3c-.2-.4-.4-.4-.6-.4h-.6c-.3 0-.7.4-.9.8-.8 1.3-.3 2.8.6 4.1 1.7 2.5 4 3.8 6.6 4.1 1 .1 2-.5 2.3-1.3.2-.6.1-1-.3-1.2l-2-1c-.3-.1-.5-.1-.7.2l-.7.9c-.1.2-.3.2-.5.1-1.4-.6-2.4-1.5-3.1-2.8-.1-.2-.1-.3 0-.5l.6-.7c.1-.2.2-.4.1-.6Z"/>'],
      ['geo', 'GEO', '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.75"/><ellipse cx="10.5" cy="10.5" rx="3" ry="6.75"/><path d="M4 10.5h13m-1.7 5.1 4.2 4.2M19 2.5v4m-2-2h4"/></g>'],
    ];
    const cursorStage = document.createElement('div');
    cursorStage.className = 'lw-footer-brand';
    cursorStage.setAttribute('aria-hidden', 'true');
    const pointer = '<svg class="lw-footer-pointer" viewBox="0 0 26 28"><path d="M3 2.8 23 14.9l-9.1 1.7-4.5 8.2z" fill="currentColor" stroke="#fff5" stroke-width="1.2" stroke-linejoin="round"/></svg>';
    cursorStage.innerHTML = channels.map(([channel, label, mark]) => `
      <span class="lw-footer-cursor lw-footer-cursor--${channel}">
        ${pointer}
        <span class="lw-footer-cursor-chip">
          <svg viewBox="0 0 24 24">${mark}</svg>
          ${label}
        </span>
      </span>`).join('');
    (footer.querySelector('.footer-shell') || footer).append(cursorStage);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        cursorStage.toggleAttribute('data-visible', entry.isIntersecting);
      }, { threshold: 0.15 }).observe(cursorStage);
    }

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
    'main :is(.lw-hero-frame, .lw-product-media, .lw-origin-image, .suite-card-visual, .product-detail-visual, .lw-product-shot, .geo-visual, .geo-screen, .founder-photo)'
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
