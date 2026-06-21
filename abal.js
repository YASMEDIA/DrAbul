let isDark = false;
let isAr = true;

const moonSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
const sunSVG  = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

function toggleTheme() {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : '');
  document.getElementById('themeIcon').innerHTML = isDark ? sunSVG : moonSVG;
  document.getElementById('themeLabel').textContent = isDark ? 'الوضع النهاري' : 'الوضع الليلي';
  document.getElementById('themeLabelEn').textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

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

// Hero 3D tilt
const frame = document.getElementById('heroFrame');
if (frame) {
  frame.addEventListener('mousemove', (e) => {
    const r = frame.getBoundingClientRect();
    const tx = ((e.clientY - r.top) / r.height - 0.5) * 7;
    const ty = ((e.clientX - r.left) / r.width - 0.5) * -7;
    frame.style.transform = `perspective(900px) rotateX(${tx}deg) rotateY(${ty}deg)`;
  });
  frame.addEventListener('mouseleave', () => { frame.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'; });
}

// Scroll fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Form submit
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  fetch('https://formsubmit.co/ajax/info@drabal.com', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(form)
  })
  .then(r => r.json())
  .then(r => {
    if (r.success === 'true' || r.success === true) {
      form.style.display = 'none';
      success.style.display = 'block';
    } else { btn.disabled = false; }
  })
  .catch(() => { form.removeEventListener('submit', handleFormSubmit); form.submit(); });
}

// Nav glass effect on scroll
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });
