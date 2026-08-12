// Main navigation selection
function seleccionar(link) {
  const links = document.querySelectorAll('#links a');
  links.forEach((item) => item.classList.remove('seleccionado'));
  link.classList.add('seleccionado');

  const nav = document.getElementById('nav');
  const menuButton = document.getElementById('icono-nav');

  if (nav) nav.classList.remove('responsive');
  if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

// Mobile navigation
function responsiveMenu() {
  const nav = document.getElementById('nav');
  const menuButton = document.getElementById('icono-nav');

  if (!nav || !menuButton) return;

  const isOpen = nav.classList.toggle('responsive');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
}

// Close mobile navigation when clicking outside the header menu
function activateOutsideMenuClose() {
  document.addEventListener('click', (event) => {
    const nav = document.getElementById('nav');
    const menuButton = document.getElementById('icono-nav');

    if (!nav || !menuButton || !nav.classList.contains('responsive')) return;

    const clickedInsideNav = event.target.closest('#nav');
    const clickedMenuButton = event.target.closest('#icono-nav');

    if (!clickedInsideNav && !clickedMenuButton) {
      nav.classList.remove('responsive');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });
}

// Keep the active navigation item synchronized with the section in view
function activateSectionObserver() {
  const links = Array.from(document.querySelectorAll('#links a'));
  const sectionMap = new Map();

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const section = document.querySelector(href);
    if (section) sectionMap.set(section, link);
  });

  if (!sectionMap.size || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visible.length) return;

      const currentLink = sectionMap.get(visible[0].target);
      if (!currentLink) return;

      links.forEach((link) => link.classList.remove('seleccionado'));
      currentLink.classList.add('seleccionado');
    },
    {
      root: null,
      rootMargin: '-28% 0px -58% 0px',
      threshold: [0.01, 0.15, 0.3]
    }
  );

  sectionMap.forEach((_, section) => observer.observe(section));
}

// Relationship between service cards and relevant projects
function activateServiceProjectRelationship() {
  const services = document.querySelectorAll('#servicios .servicio[data-category]');
  const projects = document.querySelectorAll('#portfolio .proyecto[data-service]');

  if (!services.length || !projects.length) return;

  const reset = () => {
    projects.forEach((project) => {
      project.style.opacity = '';
      project.style.transform = '';
      project.style.boxShadow = '';
      project.style.borderColor = '';
    });
  };

  const highlight = (category) => {
    const matches = Array.from(projects).filter((project) => {
      const categories = (project.dataset.service || '').split(/\s+/).filter(Boolean);
      return categories.includes(category);
    });

    if (!matches.length) {
      reset();
      return [];
    }

    projects.forEach((project) => {
      const categories = (project.dataset.service || '').split(/\s+/).filter(Boolean);
      const isMatch = categories.includes(category);

      project.style.opacity = isMatch ? '1' : '0.35';
      project.style.transform = isMatch ? 'translateY(-6px)' : 'scale(0.985)';
      project.style.boxShadow = isMatch ? '0 22px 48px rgba(20, 26, 70, 0.16)' : '';
      project.style.borderColor = isMatch ? '#ff5080' : '';
    });

    return matches;
  };

  services.forEach((service) => {
    const category = service.dataset.category;

    service.addEventListener('mouseenter', () => highlight(category));
    service.addEventListener('mouseleave', reset);
    service.addEventListener('focus', () => highlight(category));
    service.addEventListener('blur', reset);

    service.addEventListener('click', () => {
      const matches = highlight(category);
      if (window.innerWidth <= 800 && matches.length) {
        setTimeout(() => {
          matches[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 120);
      }
    });

    service.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        service.click();
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('#servicios .servicio[data-category]')) reset();
  });
}

// Progressive reveal animation
function activateRevealAnimation() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  elements.forEach((element) => observer.observe(element));
}

// Ensure external links follow safe browser behaviour
function reinforceExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute('rel', 'noopener noreferrer');
  });
}

// Netlify Forms submission without leaving the portfolio page
function activateContactForm() {
  const form = document.querySelector('form[name="contact"]');
  const status = document.getElementById('form-status');

  if (!form || !status) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton ? submitButton.textContent : '';

    status.className = 'form-status';
    status.textContent = 'Sending message...';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const formData = new FormData(form);
      const body = new URLSearchParams();

      formData.forEach((value, key) => body.append(key, value));

      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
      });

      if (!response.ok) throw new Error('Form submission failed');

      form.reset();
      status.classList.add('success');
      status.textContent = 'Message sent successfully. Thank you for getting in touch.';
    } catch (error) {
      status.classList.add('error');
      status.textContent = 'The form could not be submitted. Please contact me directly at leonel.silima0@gmail.com.';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  });
}

// Improve menu accessibility with keyboard controls
function activateMenuAccessibility() {
  const menuButton = document.getElementById('icono-nav');
  const nav = document.getElementById('nav');

  if (!menuButton || !nav) return;

  menuButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      responsiveMenu();
    }

    if (event.key === 'Escape') {
      nav.classList.remove('responsive');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    nav.classList.remove('responsive');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
}

// Close the responsive menu if the viewport returns to desktop size
function activateResizeHandling() {
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
      const nav = document.getElementById('nav');
      const menuButton = document.getElementById('icono-nav');

      if (nav) nav.classList.remove('responsive');
      if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  activateOutsideMenuClose();
  activateSectionObserver();
  activateServiceProjectRelationship();
  activateRevealAnimation();
  reinforceExternalLinks();
  activateContactForm();
  activateMenuAccessibility();
  activateResizeHandling();
});
