/* =============================================
   LITTLE WINS — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('open'));
  });

  /* ── Nav shadow on scroll ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 2px 20px rgba(0,0,0,0.08)'
      : 'none';
  });

  /* ── Hamburger mobile menu ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger) hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* ── WhatsApp contact form ── */
  const waBtn = document.getElementById('wa-submit');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const name  = document.getElementById('f-name').value.trim();
      const email = document.getElementById('f-email').value.trim();
      const age   = document.getElementById('f-age').value;
      const msg   = document.getElementById('f-msg').value.trim();
      let text = 'Hello! I found you through your website and would like to enquire about your services.\n\n';
      if (name)  text += `*Name:* ${name}\n`;
      if (email) text += `*Email:* ${email}\n`;
      if (age)   text += `*Child's age:* ${age}\n`;
      if (msg)   text += `\n*Message:* ${msg}`;
      window.open('https://wa.me/919920215029?text=' + encodeURIComponent(text), '_blank');
    });
  }

  /* ── Scroll reveal ── */
  document.querySelectorAll('.stagger-children').forEach(grid => {
    Array.from(grid.children).forEach(child => {
      const hasReveal = ['reveal','reveal-left','reveal-right','reveal-pop']
        .some(cls => child.classList.contains(cls));
      if (!hasReveal) child.classList.add('reveal');
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-pop')
    .forEach(el => revealObserver.observe(el));

  /* ── Bouncy button press ── */
  document.querySelectorAll('.btn-primary, .btn-secondary, .form-submit').forEach(btn => {
    btn.addEventListener('mousedown',  () => { btn.style.transform = 'scale(0.96)'; });
    btn.addEventListener('mouseup',    () => { btn.style.transform = ''; });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ── Show more toggle (Individual & Group card) ── */
  document.querySelectorAll('.hwh-show-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const expand = btn.nextElementSibling;
      expand.classList.toggle('open');
      btn.textContent = expand.classList.contains('open') ? 'Show less ↑' : 'Show more ↓';
    });
  });

  /* ── Collaborator modal ── */
  const modal      = document.getElementById('collabModal');
  const modalClose = document.getElementById('collabClose');
  const modalImg   = document.getElementById('collabModalImg');
  const modalName  = document.getElementById('collabModalName');
  const modalTitle = document.getElementById('collabModalTitle');
  const modalBio   = document.getElementById('collabModalBio');

  document.querySelectorAll('.collab-learn-more:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      const card  = btn.closest('.collab-card');
      const img   = card.querySelector('.collab-photo img');
      modalImg.src       = img ? img.src : '';
      modalImg.alt       = card.dataset.name || '';
      modalName.textContent  = card.dataset.name  || '';
      modalTitle.innerHTML   = card.dataset.title || '';
      modalBio.textContent   = card.dataset.bio   || '';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

});
