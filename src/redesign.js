(() => {
  const arrivalHero = document.querySelector('.arrival-hero');
  if (arrivalHero && new URLSearchParams(location.search).has('tipos')) {
    arrivalHero.classList.add('arrival-type-sample');
    arrivalHero.id = 'syne';
    let previous = arrivalHero;
    for (const font of ['anybody', 'unbounded', 'familjen']) {
      const sample = arrivalHero.cloneNode(true);
      sample.id = font;
      const originalTitle = sample.querySelector('h1');
      const title = document.createElement('h2');
      title.id = `titulo-${font}`;
      title.append(...originalTitle.childNodes);
      originalTitle.replaceWith(title);
      sample.setAttribute('aria-labelledby', title.id);
      const image = sample.querySelector('img');
      image.loading = 'lazy';
      image.removeAttribute('fetchpriority');
      previous.after(sample);
      previous = sample;
    }
  }

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  if (root.classList.contains('arrival-loading') && arrivalHero) {
    const loader = document.querySelector('.arrival-loader');
    const controller = new AbortController();
    const reveal = () => {
      controller.abort();
      root.classList.remove('arrival-loading');
    };
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    const photo = arrivalHero.querySelector('.arrival-backdrop img');
    Promise.race([
      Promise.all([wait(520), photo.decode().catch(() => {})]),
      wait(1050)
    ]).then(reveal);
    document.addEventListener('keydown', reveal, { once: true, signal: controller.signal });
    loader.addEventListener('click', reveal, { once: true, signal: controller.signal });
    window.addEventListener('pageshow', event => {
      if (event.persisted) reveal();
    }, { signal: controller.signal });
    reducedMotion.addEventListener('change', event => {
      if (event.matches) reveal();
    }, { signal: controller.signal });
  }
  const running = new Set();
  let keyboard = false;

  const canAnimate = () => !reducedMotion.matches && !keyboard && typeof Element.prototype.animate === 'function';

  function play(element, frames, options, cleanup = () => {}) {
    const animation = element.animate(frames, options);
    running.add(animation);
    const finish = () => {
      running.delete(animation);
      cleanup();
    };
    animation.finished.then(finish, finish);
    return animation;
  }

  function stopAnimations() {
    for (const animation of running) animation.cancel();
    for (const element of document.querySelectorAll('.is-entering')) {
      element.classList.remove('is-entering');
    }
  }

  document.addEventListener('keydown', () => {
    keyboard = true;
    stopAnimations();
  }, true);
  const usePointer = () => { keyboard = false; };
  document.addEventListener('pointerdown', usePointer, true);
  document.addEventListener('wheel', usePointer, { passive: true });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) stopAnimations();
  });

  const menu = document.querySelector('.mobile-nav');
  menu?.addEventListener('click', event => {
    if (event.target.closest('a[href]')) menu.open = false;
  });
  menu?.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });

  const serviceTabs = document.querySelector('.service-tabs');
  if (serviceTabs) {
    const verticalTabs = matchMedia('(min-width: 1000px)');
    const updateTabOrientation = () => serviceTabs.setAttribute('aria-orientation', verticalTabs.matches ? 'vertical' : 'horizontal');
    updateTabOrientation();
    verticalTabs.addEventListener('change', updateTabOrientation);
    const tabs = [...serviceTabs.querySelectorAll('[role="tab"]')];
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
    function selectService(active, animate) {
      tabs.forEach((tab, index) => {
        const selected = index === active;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[index].hidden = !selected;
      });
      if (animate && canAnimate()) play(panels[active], [{ opacity: .72 }, { opacity: 1 }], { duration: 200, easing: 'ease-out' });
    }
    tabs.forEach((tab, index) => {
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', tab.id);
      tab.addEventListener('click', () => selectService(index, true));
      tab.addEventListener('keydown', event => {
        const next = {
          [verticalTabs.matches ? 'ArrowUp' : 'ArrowLeft']: (index + tabs.length - 1) % tabs.length,
          [verticalTabs.matches ? 'ArrowDown' : 'ArrowRight']: (index + 1) % tabs.length,
          Home: 0,
          End: tabs.length - 1
        }[event.key];
        if (next === undefined) return;
        event.preventDefault();
        selectService(next, false);
        tabs[next].focus();
      });
    });
    const linkedService = () => panels.findIndex(panel => `#${panel.id}` === location.hash);
    selectService(Math.max(0, linkedService()), false);
    serviceTabs.hidden = false;
    addEventListener('hashchange', () => {
      const index = linkedService();
      if (index < 0) return;
      selectService(index, false);
      serviceTabs.scrollIntoView({ block: 'start' });
    });
  }

  const voicesTitleAccent = document.querySelector('.voices-title-accent');
  const voicesRating = document.querySelector('.voices-rating');
  if (voicesTitleAccent && voicesRating && 'ResizeObserver' in window) {
    const syncRatingWidth = () => {
      voicesRating.style.setProperty('--voices-rating-width', `${voicesTitleAccent.getBoundingClientRect().width}px`);
    };
    new ResizeObserver(syncRatingWidth).observe(voicesTitleAccent);
    syncRatingWidth();
  }

  const voices = document.querySelector('.voices-gallery');
  if (voices) {
    for (const group of voices.querySelectorAll('.voices-group')) {
      const desktopCount = group.querySelectorAll('.voices-card:not(.voices-mobile)').length;
      group.parentElement.style.setProperty('--voices-duration', `${desktopCount * 12}s`);
      const duplicate = group.cloneNode(true);
      duplicate.classList.add('voices-duplicate');
      duplicate.setAttribute('aria-hidden', 'true');
      group.after(duplicate);
    }
    function updateVoicesMotion() {
      voices.classList.toggle('voices-moving', !reducedMotion.matches);
    }
    reducedMotion.addEventListener('change', updateVoicesMotion);
    updateVoicesMotion();
  }

  const easing = 'cubic-bezier(.23, 1, .32, 1)';
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      let revealed = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (!canAnimate() || revealed >= 5) continue;
        entry.target.style.setProperty('--enter-delay', `${revealed * 55}ms`);
        entry.target.classList.add('is-entering');
        entry.target.addEventListener('animationend', () => {
          entry.target.classList.remove('is-entering');
        }, { once: true });
        revealed++;
      }
    }, { threshold: .12, rootMargin: '0px 0px -24px' });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
  }

  const hero = document.querySelector('.masthead-photo img');
  if (hero) {
    const settle = () => {
      const rect = hero.getBoundingClientRect();
      if (canAnimate() && rect.bottom > 0 && rect.top < innerHeight) {
        play(hero, [{ transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 760, easing });
      }
    };
    if (hero.complete && hero.naturalWidth) settle();
    else hero.addEventListener('load', settle, { once: true });
  }
})();
