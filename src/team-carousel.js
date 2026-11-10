export function initTeamCarousel({ reduceMotion }) {
  const team = document.querySelector('.team-about');
  if (!team) return;

  const rail = team.querySelector('.team-panels');
  const cards = [...rail.querySelectorAll('.team-panel')];
  const caption = team.querySelector('.team-selected');
  const controls = team.querySelector('.team-controls');
  const range = controls.querySelector('.team-range');
  const play = controls.querySelector('.team-play');
  const positions = ['center', 'right', 'left'];
  const offsets = [0, 1, -1];
  let active = 0;
  let playing = !reduceMotion.matches;
  let visible = false;
  let timer;
  let gesture;
  let suppressClick = false;

  const wrap = index => (index + cards.length) % cards.length;

  function select(index) {
    active = wrap(index);
    cards.forEach((card, cardIndex) => {
      card.dataset.position = positions[wrap(cardIndex - active)];
      card.setAttribute('aria-pressed', String(cardIndex === active));
    });
    const name = cards[active].getAttribute('aria-label');
    caption.textContent = name;
    range.value = String(active + 1);
    range.setAttribute('aria-valuetext', name);
  }

  function schedule() {
    clearTimeout(timer);
    if (!playing || !visible || document.hidden) return;
    timer = setTimeout(() => {
      select(active + 1);
      schedule();
    }, 3200);
  }

  function setPlaying(value) {
    playing = value;
    play.dataset.playing = String(playing);
    play.setAttribute('aria-label', playing ? 'Pausar avance automático' : 'Reanudar avance automático');
    caption.setAttribute('aria-live', playing ? 'off' : 'polite');
    schedule();
  }

  function navigate(index) {
    setPlaying(false);
    select(index);
  }

  cards.forEach((card, index) => card.addEventListener('click', () => navigate(index)));
  controls.querySelectorAll('[data-team-step]').forEach(button => {
    button.addEventListener('click', () => navigate(active + Number(button.dataset.teamStep)));
  });
  range.addEventListener('input', () => navigate(range.valueAsNumber - 1));
  play.addEventListener('click', () => setPlaying(!playing));
  rail.tabIndex = 0;
  rail.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      navigate(active + (event.key === 'ArrowRight' ? 1 : -1));
    } else if (event.target === rail && event.key === 'Enter') {
      event.preventDefault();
      setPlaying(!playing);
    }
  });
  team.addEventListener('focusin', event => {
    if (!team.contains(event.relatedTarget) && event.target.matches(':focus-visible')) setPlaying(false);
  });

  rail.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
  });
  rail.addEventListener('pointermove', event => {
    if (event.pointerId !== gesture?.id) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.moved) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        gesture = undefined;
        return;
      }
      if (Math.abs(dx) <= 8) return;
      gesture.moved = true;
      rail.setPointerCapture(event.pointerId);
      rail.classList.add('is-dragging');
      setPlaying(false);
    }
    if (reduceMotion.matches) return;
    const stepWidth = cards[active].offsetWidth * .69;
    const shift = Math.max(-1, Math.min(1, dx / stepWidth));
    cards.forEach((card, index) => {
      const offset = offsets[wrap(index - active)] + shift;
      const distance = Math.min(1.6, Math.abs(offset));
      card.style.transform = `translate(${offset * 69}%, ${distance * 8}%) rotate(${offset * 9}deg) scale(${1 - distance * .12})`;
      card.style.zIndex = String(20 - Math.round(distance * 10));
    });
  });

  function finishGesture(event) {
    if (event.pointerId !== gesture?.id) return;
    const { moved, x } = gesture;
    gesture = undefined;
    if (!moved) return;
    suppressClick = true;
    setTimeout(() => { suppressClick = false; }, 0);
    rail.classList.remove('is-dragging');
    // Restore transitions before dropping the pointer-driven transforms.
    rail.getBoundingClientRect();
    const dx = event.clientX - x;
    const threshold = Math.min(85, cards[active].offsetWidth * .24);
    if (event.type === 'pointerup' && Math.abs(dx) >= threshold) {
      select(active + (dx < 0 ? 1 : -1));
    }
    cards.forEach(card => {
      card.style.removeProperty('transform');
      card.style.removeProperty('z-index');
    });
  }

  rail.addEventListener('pointerup', finishGesture);
  rail.addEventListener('pointercancel', finishGesture);
  rail.addEventListener('lostpointercapture', event => {
    if (event.target === rail) finishGesture(event);
  });
  rail.addEventListener('pointerleave', () => {
    if (!gesture?.moved) gesture = undefined;
  });
  rail.addEventListener('click', event => {
    if (!suppressClick || event.detail === 0) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  new IntersectionObserver(([entry]) => {
    visible = entry.intersectionRatio >= .5;
    schedule();
  }, { threshold: .5 }).observe(rail);
  document.addEventListener('visibilitychange', schedule);
  reduceMotion.addEventListener('change', event => {
    if (event.matches) setPlaying(false);
  });
  setPlaying(playing);
  controls.hidden = false;
}
