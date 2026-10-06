/* ===========================
   MENU HAMBURGER
=========================== */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Fermer le menu au clic sur un lien
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Fermer au clic en dehors
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ===========================
     ANIMATIONS AU SCROLL
  =========================== */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback : afficher directement
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ===========================
     FORMULAIRE DE CONTACT
  =========================== */
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      // Réinitialiser le feedback
      feedback.className = 'form-feedback';
      feedback.textContent = '';

      // Validation simple
      if (!name || !email || !subject || !message) {
        feedback.classList.add('error');
        feedback.textContent = 'Veuillez remplir tous les champs.';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        feedback.classList.add('error');
        feedback.textContent = 'Veuillez entrer une adresse email valide.';
        return;
      }

      // Simulation d'envoi
      feedback.classList.add('success');
      feedback.textContent = 'Merci ! Votre message a bien été envoyé. Nous vous répondrons rapidement.';
      form.reset();
    });
  }

  /* ===========================
     HEADER SCROLL SHADOW
  =========================== */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 20px rgba(15,23,42,.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }
});