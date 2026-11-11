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
    document.querySelectorAll('.is-reveal-pending').forEach(element => element.classList.remove('is-reveal-pending'));
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

  const evaluationSteps = document.querySelector('.booking-steps');
  if (evaluationSteps) {
    function alignEvaluationMarkers() {
      const steps = [...evaluationSteps.children];
      const positions = steps.map(step => {
        const title = step.querySelector('h3').getBoundingClientRect();
        const box = step.getBoundingClientRect();
        return { center: title.left + title.width / 2, top: box.top, left: box.left };
      });
      steps.forEach((step, index) => {
        const position = positions[index];
        const next = positions[index + 1];
        const distance = next && Math.abs(next.top - position.top) < 1 ? next.center - position.center : 0;
        step.style.setProperty('--booking-marker-x', `${position.center - position.left}px`);
        step.style.setProperty('--booking-connector-width', `${distance}px`);
      });
    }
    alignEvaluationMarkers();
    new ResizeObserver(alignEvaluationMarkers).observe(evaluationSteps);
    document.fonts?.ready.then(alignEvaluationMarkers);
  }

  const faqList = document.querySelector('.question-list');
  if (faqList) {
    const compactFaq = matchMedia('(max-width: 690px)');
    function reserveFaqHeight() {
      if (compactFaq.matches) {
        faqList.style.minHeight = '';
        return;
      }
      const width = faqList.getBoundingClientRect().width;
      if (!width) return;
      const measure = faqList.cloneNode(true);
      measure.className = 'question-list';
      measure.removeAttribute('data-reveal');
      measure.inert = true;
      measure.setAttribute('aria-hidden', 'true');
      Object.assign(measure.style, { position: 'absolute', width: `${width}px`, minHeight: '0', visibility: 'hidden' });
      const questions = [...measure.querySelectorAll('details')];
      questions.forEach(question => {
        question.removeAttribute('name');
        question.open = false;
      });
      faqList.after(measure);
      let height = 0;
      for (const question of questions) {
        question.open = true;
        height = Math.max(height, measure.getBoundingClientRect().height);
        question.open = false;
      }
      measure.remove();
      faqList.style.minHeight = `${Math.ceil(height)}px`;
    }
    reserveFaqHeight();
    window.addEventListener('resize', reserveFaqHeight, { passive: true });
    document.fonts?.ready.then(reserveFaqHeight);
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
        entry.target.classList.remove('is-reveal-pending');
        if (!canAnimate() || revealed >= 5) continue;
        entry.target.style.setProperty('--enter-delay', `${revealed * 55}ms`);
        entry.target.classList.add('is-entering');
        const finishEntrance = event => {
          if (event.target !== entry.target) return;
          entry.target.classList.remove('is-entering');
          entry.target.removeEventListener('animationend', finishEntrance);
        };
        entry.target.addEventListener('animationend', finishEntrance);
        revealed++;
      }
    }, { threshold: .08, rootMargin: '0px 0px -30px' });
    const candidates = document.querySelectorAll('[data-reveal], .voices-intro, .voices-gallery, .visit-heading h2, .newsletter h2, .newsletter-signup, .footer-body > *');
    const targets = [...candidates].flatMap(element => getComputedStyle(element).display === 'contents' ? [...element.children] : [element]);
    targets.forEach(element => {
      if (element.closest('[hidden]')) return;
      if (element.getBoundingClientRect().top >= innerHeight) element.classList.add('is-reveal-pending');
      observer.observe(element);
    });
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
