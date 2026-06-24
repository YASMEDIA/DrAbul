let isAr = true;

function toggleLang() {
  isAr = !isAr;
  document.documentElement.lang = isAr ? 'ar' : 'en';
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  closeNav();
}

function toggleNav() {
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('navHamburger');
  const isOpen = nav.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', String(isOpen));
}

function closeNav() {
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('navHamburger');
  nav.classList.remove('open');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
}

document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', closeNav));

document.addEventListener('click', (e) => {
  const navEl = document.querySelector('nav');
  if (document.getElementById('navLinks').classList.contains('open') && !navEl.contains(e.target)) closeNav();
});

// Scroll reveal — fade + slide as elements enter the viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Nav background on scroll
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });
