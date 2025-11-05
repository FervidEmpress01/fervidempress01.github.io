// Theme toggle with prefers-color-scheme + localStorage
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const preferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const saved = localStorage.getItem('theme') || preferred;
  root.setAttribute('data-theme', saved);
  if(btn){
    btn.setAttribute('aria-pressed', saved === 'dark' ? 'true' : 'false');
    btn.textContent = saved === 'dark' ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }
})();

// Page transitions: fade-out on internal navigation and fade-in on load
(function(){
  // Fade-in when page loads
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-fade-in');
  });

  // Intercept internal links for fade-out before navigation
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if(!anchor) return;
    const href = anchor.getAttribute('href');
    const target = anchor.getAttribute('target');
    if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || target === '_blank') return;
    // Resolve URL and ensure same-origin navigation
    let url;
    try{ url = new URL(href, location.href); }catch{ return; }
    if(url.origin !== location.origin) return;
    // If navigating to the same page + hash, let default smooth scroll handle it
    if(url.pathname === location.pathname && url.hash) return;

    e.preventDefault();
    // Avoid double trigger
    if(document.body.classList.contains('page-fade-out')){ location.href = url.href; return; }
    document.body.classList.remove('page-fade-in');
    document.body.classList.add('page-fade-out');
    const go = () => { location.href = url.href; };
    // Navigate after animation or fallback
    document.body.addEventListener('animationend', go, { once: true });
    setTimeout(go, 350);
  });
})();

// Active nav highlight using IntersectionObserver
(function(){
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const map = new Map(sections.map(s => [s.id, document.querySelector(`.nav-link[href="#${s.id}"]`)]));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.id;
        navLinks.forEach(a => a.classList.remove('active'));
        const link = map.get(id);
        link?.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });
  sections.forEach(sec => observer.observe(sec));

  // Fallback for multi-page navigation: highlight based on current file path
  if(sections.length === 0){
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    navLinks.forEach(a => {
      a.classList.remove('active');
      try{
        const href = new URL(a.getAttribute('href'), location.href);
        const file = (href.pathname.split('/').pop() || '').toLowerCase();
        if(file && file === current){
          a.classList.add('active');
        }
      }catch(_){}
    });
  }
})();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form handler: Formspree if configured; mailto fallback
(function(){
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending...';
    const data = new FormData(form);
    const formspree = form.dataset.formspree?.trim();

    // If you set data-formspree="https://formspree.io/f/XXXXX" it will POST there.
    if(formspree){
      try{
        const res = await fetch(formspree, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });
        if(res.ok){
          form.reset();
          status.textContent = 'Thanks! Your message was sent.';
        }else{
          status.textContent = 'There was a problem sending. Try again or use email.';
        }
      }catch(err){
        status.textContent = 'Network error. Try again or use email.';
      }
      return;
    }

    // Mailto fallback
    const name = encodeURIComponent(data.get('name') || '');
    const email = encodeURIComponent(data.get('email') || '');
    const message = encodeURIComponent(data.get('message') || '');
    const subject = `Portfolio contact - ${name}`;
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    window.location.href = `mailto:mauricioalejo2011@hotmail.com?subject=${subject}&body=${body}`;
    status.textContent = 'Opening your email client...';
  });
})();

// Render Lucide icons if available
try{
  if(window.lucide){
    window.lucide.createIcons();
  }else{
    window.addEventListener('load', () => window.lucide?.createIcons());
  }
}catch(_){}

// Reveal-on-scroll for elements with .reveal
(function(){
  const items = [...document.querySelectorAll('.reveal')];
  if(!items.length) return;
  items.forEach(el => el.classList.add('will-reveal'));
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
  items.forEach(el => io.observe(el));
})();
