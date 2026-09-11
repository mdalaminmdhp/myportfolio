const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const navShell = document.querySelector('.nav-shell');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.site-header');
const scrollProgress = document.querySelector('.scroll-progress');
const backToTop = document.querySelector('.back-to-top');
const revealEls = document.querySelectorAll('.reveal');
const loader = document.querySelector('.page-loader');
const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');
const projectModal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalType = document.getElementById('modalType');
const modalLive = document.getElementById('modalLive');
const modalGithub = document.getElementById('modalGithub');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const testimonialItems = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const detailButtons = document.querySelectorAll('.project-detail-btn');

const projectData = {
  'business-site': {
    title: 'Business Website',
    category: 'Web Design',
    description: 'A modern business website focused on trust, service clarity and conversion. The layout gives the brand a clean and memorable online presence.',
    tech: ['HTML5', 'CSS3', 'UI/UX'],
    type: 'Business Website',
    image: 'assets/images/projects/project-01.svg',
    live: '#',
    github: 'https://github.com'
  },
  'ecommerce-site': {
    title: 'E-commerce Website',
    category: 'E-commerce',
    description: 'A conversion-focused online storefront with a clean browsing flow, strong visual hierarchy and mobile-friendly shopping experience.',
    tech: ['WooCommerce', 'Frontend', 'UX'],
    type: 'E-commerce Platform',
    image: 'assets/images/projects/project-02.svg',
    live: '#',
    github: 'https://github.com'
  },
  'wordpress-site': {
    title: 'WordPress Website',
    category: 'WordPress',
    description: 'A custom WordPress website built for effective content publishing, brand storytelling and flexible business updates.',
    tech: ['WordPress', 'PHP', 'Theme Design'],
    type: 'CMS Website',
    image: 'assets/images/projects/project-03.svg',
    live: '#',
    github: 'https://github.com'
  },
  'restaurant-site': {
    title: 'Restaurant Website',
    category: 'Web Design',
    description: 'A warm and premium restaurant branding website designed to present menu highlights, atmosphere and call-to-action sections clearly.',
    tech: ['Branding', 'CSS3', 'Design'],
    type: 'Restaurant Brand',
    image: 'assets/images/projects/project-04.svg',
    live: '#',
    github: 'https://github.com'
  },
  'corporate-site': {
    title: 'Corporate Website',
    category: 'Web Design',
    description: 'A corporate web presence designed for credibility, service explanation and quality-first first impressions.',
    tech: ['Business', 'Marketing', 'Design'],
    type: 'Corporate Brand',
    image: 'assets/images/projects/project-05.svg',
    live: '#',
    github: 'https://github.com'
  },
  'landing-page': {
    title: 'Creative Landing Page',
    category: 'Frontend',
    description: 'A high-performing landing page crafted for audience engagement, strong messaging and reduction of friction in conversion flows.',
    tech: ['HTML5', 'JavaScript', 'Design'],
    type: 'Landing Page',
    image: 'assets/images/projects/project-06.svg',
    live: '#',
    github: 'https://github.com'
  },
  'php-app': {
    title: 'PHP Web Application',
    category: 'PHP',
    description: 'A practical PHP-driven interface built to support internal tasks, custom processes and user-friendly web interactions.',
    tech: ['PHP', 'MySQL', 'Web App'],
    type: 'Application',
    image: 'assets/images/projects/project-07.svg',
    live: '#',
    github: 'https://github.com'
  },
  'pochonderhaat': {
    title: 'Pochonderhaat',
    category: 'E-commerce',
    description: 'A digital business showcase representing my own entrepreneurial side, combining e-commerce, branding and digital commerce strategy in one experience.',
    tech: ['WooCommerce', 'Branding', 'Business'],
    type: 'Business Project',
    image: 'assets/images/projects/project-08.svg',
    live: '#',
    github: 'https://github.com'
  }
};

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
}

if (themeToggle) {
  const syncThemeLabel = () => {
    const icon = themeToggle.querySelector('.theme-icon');
    if (!icon) return;
    icon.textContent = body.classList.contains('light-mode') ? '🌙' : '☀️';
  };

  syncThemeLabel();

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    localStorage.setItem('portfolio-theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    syncThemeLabel();
  });
}

if (navToggle && navShell) {
  navToggle.addEventListener('click', () => {
    const isOpen = navShell.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navShell.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const setActiveLink = () => {
  const sections = [...document.querySelectorAll('main section[id], footer[id]')];
  const scrollY = window.scrollY + 140;

  let activeId = 'home';
  for (const section of sections) {
    if (section.offsetTop <= scrollY) {
      activeId = section.getAttribute('id');
    }
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const isActive = href === `#${activeId}`;
    link.classList.toggle('active', isActive);
  });
};

const updateScrollProgress = () => {
  const scrollTop = window.scrollY;
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;

  const shouldShow = window.scrollY > 420;
  backToTop.classList.toggle('visible', shouldShow);
  header.classList.toggle('scrolled', window.scrollY > 20);
};

window.addEventListener('scroll', () => {
  updateScrollProgress();
  setActiveLink();
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((element) => revealObserver.observe(element));

window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hidden'), 450);
});

const animateCounter = (element) => {
  const finalValue = Number(element.dataset.count || 0);
  const suffix = finalValue >= 100 ? '%' : '+';
  let current = 0;
  const step = finalValue / 60;

  const update = () => {
    current += step;
    if (current >= finalValue) {
      element.textContent = `${finalValue}${suffix}`;
      return;
    }
    element.textContent = `${Math.floor(current)}${suffix}`;
    requestAnimationFrame(update);
  };

  update();
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const counters = document.querySelectorAll('[data-count]');
counters.forEach((counter) => counterObserver.observe(counter));

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const show = selected === 'all' || category === selected;
      card.classList.toggle('hidden', !show);
      card.style.opacity = show ? '1' : '0';
      card.style.filter = show ? 'none' : 'blur(2px)';
    });
  });
});

const openModal = (projectKey) => {
  const item = projectData[projectKey];
  if (!item) return;

  modalTitle.textContent = item.title;
  modalCategory.textContent = item.category;
  modalDescription.textContent = item.description;
  modalType.textContent = `${item.type}`;
  modalImage.src = item.image;
  modalImage.alt = `${item.title} preview`;
  modalLive.href = item.live;
  modalGithub.href = item.github;

  modalTech.innerHTML = item.tech.map((tech) => `<li>${tech}</li>`).join('');
  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden', 'false');
  body.style.overflow = 'hidden';
};

const closeModal = () => {
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
  body.style.overflow = '';
};

detailButtons.forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.project));
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && projectModal.classList.contains('open')) {
    closeModal();
  }
});

let activeSlide = 0;

const showSlide = (index) => {
  testimonialItems.forEach((item, itemIndex) => {
    item.classList.toggle('active', itemIndex === index);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
};

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    activeSlide = (activeSlide - 1 + testimonialItems.length) % testimonialItems.length;
    showSlide(activeSlide);
  });

  nextBtn.addEventListener('click', () => {
    activeSlide = (activeSlide + 1) % testimonialItems.length;
    showSlide(activeSlide);
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    activeSlide = index;
    showSlide(activeSlide);
  });
});

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    const emailValue = email.value.trim();
    const nameValue = name.value.trim();
    const subjectValue = subject.value.trim();
    const messageValue = message.value.trim();

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    if (!nameValue || !subjectValue || !messageValue || !validEmail) {
      formStatus.textContent = 'Please complete the required fields with a valid email.';
      formStatus.className = 'form-status error';
      return;
    }

    formStatus.textContent = 'Your message has been drafted successfully. Connect this form to a backend or email service when ready.';
    formStatus.className = 'form-status success';
    contactForm.reset();
  });
}

function setupCursor() {
  if (window.innerWidth < 990) return;

  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');

  if (!dot || !outline) return;

  body.classList.add('cursor-enabled');

  window.addEventListener('pointermove', (event) => {
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
    outline.style.left = `${event.clientX}px`;
    outline.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll('a, button, .project-card, .skill-card, .service-card, .contact-card, .feature-card, .tech-item').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      outline.style.width = '42px';
      outline.style.height = '42px';
      outline.style.borderColor = 'rgba(108,99,255,0.7)';
      outline.style.background = 'rgba(108,99,255,0.08)';
    });

    item.addEventListener('mouseleave', () => {
      outline.style.width = '32px';
      outline.style.height = '32px';
      outline.style.borderColor = 'rgba(108,99,255,0.45)';
      outline.style.background = 'rgba(108,99,255,0.05)';
    });
  });
}

setupCursor();
setActiveLink();
updateScrollProgress();
showSlide(activeSlide);
