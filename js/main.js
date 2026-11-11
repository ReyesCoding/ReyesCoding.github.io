// Bryan Reyes — portfolio hub interactions
document.getElementById('year').textContent = new Date().getFullYear();

/* Custom cursor dot (desktop/pointer only — CSS hides it on touch) */
(function cursor() {
  const dot = document.getElementById('cursorDot');
  if (!dot) return;
  window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => { dot.style.width = '28px'; dot.style.height = '28px'; });
    el.addEventListener('mouseleave', () => { dot.style.width = '8px'; dot.style.height = '8px'; });
  });
})();

/* GSAP-driven animations, with a safe no-op fallback if the CDN fails to load */
(function animate() {
  if (typeof gsap === 'undefined') {
    document.querySelectorAll('.reveal-up, .reveal-line span').forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Hero intro — staggered reveal on load
  gsap.timeline({ delay: 0.15 })
    .fromTo('.hero__eyebrow span', { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
    .fromTo('.hero__title .word', { yPercent: 120 }, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.08 }, '-=0.4')
    .fromTo('.hero__role span', { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .fromTo('.hero__tagline span', { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .fromTo('.hero__actions span', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4');

  // Hero parallax on scroll
  gsap.to('.hero__grid', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero__glow', {
    yPercent: 35,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  // Generic reveal-up fade/slide for section headers, pills, etc.
  document.querySelectorAll('.reveal-up').forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  // About — line by line reveal
  gsap.utils.toArray('.about__line').forEach((line, i) => {
    gsap.fromTo(line, { yPercent: 110, opacity: 0 }, {
      yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
      delay: i * 0.05,
      scrollTrigger: { trigger: '.about__text', start: 'top 75%' },
    });
  });

  // Projects — horizontal scroll pinned section on wide viewports,
  // graceful vertical fallback on narrow/touch screens.
  const setupWorkPin = () => {
    const wrap = document.getElementById('workPinWrap');
    const track = document.getElementById('workTrack');
    if (!wrap || !track) return;

    ScrollTrigger.getAll().forEach((t) => { if (t.vars.id === 'workPin') t.kill(); });

    if (window.innerWidth < 900) {
      gsap.set(track, { x: 0 });
      track.style.overflowX = 'auto';
      track.style.scrollSnapType = 'x proximity';
      return;
    }

    track.style.overflowX = 'visible';
    const getScrollAmount = () => track.scrollWidth - window.innerWidth + 64;

    gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        id: 'workPin',
        trigger: wrap,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
  };
  setupWorkPin();
  window.addEventListener('resize', () => {
    clearTimeout(window.__wpTimer);
    window.__wpTimer = setTimeout(() => { setupWorkPin(); ScrollTrigger.refresh(); }, 200);
  });
})();

/* Smooth-scroll for in-page nav links */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
