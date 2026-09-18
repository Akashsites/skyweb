// Bhardwaj IT Solutions — interactions
document.addEventListener('DOMContentLoaded', () => {

  /* Navbar scroll state */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    const totop = document.querySelector('.totop');
    if (totop) {
      if (window.scrollY > 500) totop.classList.add('show');
      else totop.classList.remove('show');
    }
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const burger = document.querySelector('.burger');
  const navlinks = document.querySelector('.navlinks');
  if (burger && navlinks) {
    burger.addEventListener('click', () => navlinks.classList.toggle('open'));
    navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));
  }

  /* Back to top */
  const totop = document.querySelector('.totop');
  if (totop) totop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* Card 3D tilt on mouse move */
  const tiltEls = document.querySelectorAll('.tcard, .tilt-img');
  tiltEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateZ(0)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  /* Hero scene parallax */
  const stage = document.querySelector('.scene-stage');
  const hero = document.querySelector('.hero');
  if (stage && hero) {
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      stage.style.setProperty('--mx', x);
      stage.style.setProperty('--my', y);
      stage.style.transform = `rotateY(${(x * 14).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg)`;
    });
    hero.addEventListener('mouseleave', () => { stage.style.transform = ''; });
  }

  /* Counters */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.floor(target * eased);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cio.observe(c));
  }

  /* Testimonial simple auto-rotate (mobile: show one at a time via CSS handled by grid; keep as-is for desktop) */

  /* Contact / quote form -> demo submit handling (no backend attached) */
  const forms = document.querySelectorAll('form[data-demo-form]');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        window.location.href = 'thankyou.html';
      }, 900);
    });
  });

});
