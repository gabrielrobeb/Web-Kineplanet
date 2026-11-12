(() => {
  const panels = [...document.querySelectorAll('.page-service')];
  if (!panels.length) return;
  const root = document.documentElement;
  let initialized = false;
  const goDirect = () => {
    let target;
    try { target = panels.find(panel => panel.id === decodeURIComponent(location.hash.slice(1))); }
    catch { target = null; }
    if (target) {
      scrollTo({ top: target.getBoundingClientRect().top + scrollY, behavior: 'instant' });
      target.querySelectorAll('.is-reveal-pending').forEach(item => item.classList.remove('is-reveal-pending'));
    }
    root.classList.remove('services-direct-pending');
  };
  addEventListener('hashchange', goDirect);
  addEventListener('pageshow', () => { if (initialized && location.hash) goDirect(); });
  document.fonts.ready.then(() => {
    initialized = true;
    if (location.hash) requestAnimationFrame(goDirect);
    else root.classList.remove('services-direct-pending');
  });
})();
