(() => {
  const nav = document.querySelector('.services-navigation');
  if (!nav) return;
  const links = [...nav.querySelectorAll('a')];
  const sections = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
  let pending = false;
  const update = () => {
    pending = false;
    const threshold = nav.getBoundingClientRect().height + innerHeight * .26;
    let current = sections[0];
    for (const section of sections) if (section.getBoundingClientRect().top <= threshold) current = section;
    links.forEach(link => {
      if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
  update();
})();
