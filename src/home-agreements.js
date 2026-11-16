(() => {
  const carousel = document.querySelector('.home-agreements-carousel');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.home-agreements-slide')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hover = matchMedia('(hover: hover)');
  const easing = getComputedStyle(document.documentElement).getPropertyValue('--ease').trim() || 'ease-out';
  let current = 0, visible = false, mousePause = false, focusPause = false, ready = false, preloading = false, transitioning = false, timer;
  const rotate = () => {
    if (transitioning) return;
    transitioning = true;
    const previous = slides[current];
    current = (current + 1) % slides.length;
    const next = slides[current];
    previous.setAttribute('aria-hidden','true');
    previous.classList.remove('is-active');
    next.hidden = false;
    next.setAttribute('aria-hidden','false');
    next.classList.add('is-active');
    const outgoing = previous.animate([
      { opacity:1, transform:'translateY(0) scale(1)', filter:'blur(0px)' },
      { opacity:0, transform:'translateY(-8px) scale(.98)', filter:'blur(4px)' }
    ],{duration:520,easing,fill:'forwards'});
    const incoming = next.animate([
      { opacity:0, transform:'translateY(8px) scale(1.02)', filter:'blur(4px)' },
      { opacity:1, transform:'translateY(0) scale(1)', filter:'blur(0px)' }
    ],{duration:600,easing,fill:'forwards'});
    Promise.allSettled([outgoing.finished,incoming.finished]).then(() => {
      previous.hidden = true;
      outgoing.cancel();
      incoming.cancel();
      transitioning = false;
    });
  };
  const schedule = () => {
    clearTimeout(timer);
    if (ready && visible && !reduced.matches && !mousePause && !focusPause && !document.hidden) timer = setTimeout(() => { rotate(); schedule(); },2000);
  };
  const prepare = () => {
    if (ready || preloading) return;
    preloading = true;
    const images = [...carousel.querySelectorAll('img')];
    images.forEach(image => { image.loading = 'eager'; });
    Promise.allSettled(images.map(image => image.decode())).then(() => { ready = true; schedule(); });
  };
  carousel.addEventListener('pointerenter', () => { if (hover.matches) { mousePause = true; schedule(); } });
  carousel.addEventListener('pointerleave', () => { mousePause = false; schedule(); });
  carousel.addEventListener('focusin', () => { focusPause = true; schedule(); });
  carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) { focusPause = false; schedule(); } });
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => {
    if (reduced.matches) slides.forEach(slide => slide.getAnimations().forEach(animation => animation.finish()));
    schedule();
  });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) prepare(); schedule(); },{threshold:.25}).observe(carousel);
})();
