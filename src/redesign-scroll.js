(() => {
  const section = document.querySelector('.home-scroll');
  const stage = section?.querySelector('.home-scroll-stage');
  const copy = section?.querySelector('.home-scroll-copy');
  const track = section?.querySelector('.home-scroll-media');
  if (!section || !stage || !copy || !track) return;
  const last = track.lastElementChild;

  const motion = matchMedia('(min-width: 691px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)');
  const clamp = value => Math.max(0, Math.min(1, value));
  const phase = (progress, start, end) => clamp((progress - start) / (end - start));
  const smooth = value => value * value * (3 - 2 * value);
  let frame = 0;
  let bounds;

  function easedTravel(progress) {
    const ramp = .11;
    if (progress < ramp) return progress * progress / (2 * ramp * (1 - ramp));
    if (progress > 1 - ramp) return 1 - (1 - progress) ** 2 / (2 * ramp * (1 - ramp));
    return (progress - ramp / 2) / (1 - ramp);
  }

  function render() {
    frame = 0;
    if (!motion.matches || !bounds) return;

    const { top, travel, width, entryDepth, lastCenter, fullScale } = bounds;
    const progress = clamp((scrollY - top) / travel);
    const firstWeight = smooth(phase(progress, .012, .145));
    const lastWeight = smooth(phase(progress, .048, .177));
    const rising = smooth(phase(progress, .19, .30));
    const moving = easedTravel(phase(progress, .30, .81));
    const growing = smooth(phase(progress, .82, .98));
    const entryX = width * (.49 + .03 * rising);
    const x = entryX + (lastCenter - entryX) * moving;
    const y = entryDepth * (1 - rising);
    const copyExit = smooth(phase(progress, .19, .243));

    copy.style.setProperty('--gallery-weight-first', String(Math.round(440 + 250 * firstWeight)));
    copy.style.setProperty('--gallery-weight-last', String(Math.round(440 + 250 * lastWeight)));
    copy.style.opacity = String(1 - copyExit);
    copy.style.transform = `translate3d(0, ${-12 * copyExit}px, 0)`;
    track.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    last.style.transform = `scale(${1 + (fullScale - 1) * growing})`;
  }

  function schedule() {
    if (motion.matches && !frame) frame = requestAnimationFrame(render);
  }

  function measure() {
    if (!motion.matches) return;
    const { width, height } = stage.getBoundingClientRect();
    const lastWidth = last.offsetWidth;
    bounds = {
      top: section.getBoundingClientRect().top + scrollY,
      travel: Math.max(1, section.offsetHeight - height),
      width,
      entryDepth: (height + last.offsetHeight) / 2 + 2,
      lastCenter: (width - lastWidth) / 2 - last.offsetLeft,
      fullScale: Math.max(width / lastWidth, height / last.offsetHeight)
    };
    schedule();
  }

  function configure() {
    section.classList.toggle('is-scroll-live', motion.matches);
    track.tabIndex = motion.matches ? -1 : 0;
    if (motion.matches) {
      measure();
      return;
    }
    cancelAnimationFrame(frame);
    frame = 0;
    copy.style.removeProperty('--gallery-weight-first');
    copy.style.removeProperty('--gallery-weight-last');
    copy.style.removeProperty('opacity');
    copy.style.removeProperty('transform');
    track.style.removeProperty('transform');
    last.style.removeProperty('transform');
  }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', measure, { passive: true });
  addEventListener('load', measure, { once: true });
  motion.addEventListener('change', configure);
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.querySelector('main'));
  if ('IntersectionObserver' in window) {
    const prepare = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      track.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
      prepare.disconnect();
    }, { rootMargin: '600px 0px' });
    prepare.observe(section);
  }
  configure();
})();
