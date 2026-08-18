document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if available
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initTheme();
  initRtl();
  initNavbar();
  initSliders();
  initForms();
  initAnimations();
  initSpotlightHover();
  initNumberCounters();
  initTypewriter();
  initBackToTop();
  initPasswordToggle();
  initAccordion();
});

/* Interactive Card Mouse Trail Spotlight */
function initSpotlightHover() {
  const cards = document.querySelectorAll('.premium-card, .showcase-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* Animated Number Counter Observer */
function initNumberCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-counter'), 10);
  const prefix = el.getAttribute('data-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = `${prefix}${Math.floor(current)}${suffix}`;
  }, stepTime);
}

/* Dynamic Hero Typewriter Switcher */
function initTypewriter() {
  const elements = document.querySelectorAll('[data-typewriter]');
  elements.forEach(el => {
    const phrases = JSON.parse(el.getAttribute('data-typewriter'));
    if (!phrases || phrases.length === 0) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        el.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000; // Pause at end of phrase
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }

    type();
  });
}

/* ==========================================================================
   THEME TOGGLE SYSTEM (Step 6)
   ========================================================================== */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve theme preference or fall back to system dark-mode preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  htmlElement.setAttribute('data-theme', currentTheme);
  updateThemeIcons(currentTheme);

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const activeTheme = htmlElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });
}

function updateThemeIcons(theme) {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(toggle => {
    if (theme === 'dark') {
      toggle.innerHTML = `<i class="fa-solid fa-sun" style="color: #FFD700;"></i>`;
    } else {
      toggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }
  });
  // Re-run lucide if using lucide icons instead of phosphor
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* ==========================================================================
   RTL ALIGNMENT SYSTEM (Step 5)
   ========================================================================== */
function initRtl() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const htmlElement = document.documentElement;

  // Retrieve preference or default to LTR
  const savedRtl = localStorage.getItem('rtl') === 'true';
  if (savedRtl) {
    htmlElement.setAttribute('dir', 'rtl');
  } else {
    htmlElement.setAttribute('dir', 'ltr');
  }

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isRtl = htmlElement.getAttribute('dir') === 'rtl';
      const newRtl = !isRtl;
      
      htmlElement.setAttribute('dir', newRtl ? 'rtl' : 'ltr');
      localStorage.setItem('rtl', newRtl.toString());
      
      // Update UI alignments dynamically if necessary
      window.dispatchEvent(new Event('resize'));
    });
  });
}

/* ==========================================================================
   NAVBAR & HAMBURGER SYSTEM (Step 4)
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const backdrop = document.querySelector('.drawer-backdrop');

  // Handle Scroll backdrop-blur & compacting styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  function openMenu() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable page scroll when open
  }

  function closeMenu() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // Close drawer if viewport goes past 1024px
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   SLIDERS & CAROUSELS SYSTEM
   ========================================================================== */
function initSliders() {
  // 1. Generic Showcase Slider / Generator Models
  const sliderTracks = document.querySelectorAll('.slider-container');
  
  sliderTracks.forEach(track => {
    const parent = track.closest('.showcase-slider');
    if (!parent) return;

    const dotsContainer = parent.querySelector('.slider-controls');
    const items = track.querySelectorAll('.slider-item');
    if (items.length === 0) return;

    const prevBtn = parent.querySelector('.slider-arrow-prev');
    const nextBtn = parent.querySelector('.slider-arrow-next');

    // Create indicator dots dynamically
    let itemsPerView = getItemsPerView();
    let totalSlides = Math.ceil(items.length / itemsPerView);
    let activeIndex = 0;

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          activeIndex = i;
          updateSliderPosition();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function getItemsPerView() {
      if (window.innerWidth <= 768) return 1;
      return 2; // Always display 2 cards per view on desktop for proper 2-card sliding layout
    }

    function updateSliderPosition() {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      let gap = 32; // match --space-8 (32px)
      if (window.innerWidth <= 768) gap = 16;
      
      const width = items[0].getBoundingClientRect().width + gap;
      const offset = activeIndex * itemsPerView * width;
      
      if (isRtl) {
        track.style.transform = `translateX(${offset}px)`;
      } else {
        track.style.transform = `translateX(-${offset}px)`;
      }

      // Update dots states
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === activeIndex);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + totalSlides) % totalSlides;
        updateSliderPosition();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % totalSlides;
        updateSliderPosition();
      });
    }

    buildDots();
    updateSliderPosition();

    // Re-adjust slider on viewport changes
    window.addEventListener('resize', () => {
      const currentItemsPerView = getItemsPerView();
      if (currentItemsPerView !== itemsPerView) {
        itemsPerView = currentItemsPerView;
        totalSlides = Math.ceil(items.length / itemsPerView);
        activeIndex = Math.min(activeIndex, totalSlides - 1);
        buildDots();
      }
      updateSliderPosition();
    });
  });

  // 2. Testimonial Single-Slide Carousel
  const testimonialTracks = document.querySelectorAll('.testimonial-track');
  
  testimonialTracks.forEach(track => {
    const parent = track.closest('.testimonials-section');
    if (!parent) return;

    const slides = track.querySelectorAll('.testimonial-slide');
    const dotsContainer = parent.querySelector('.slider-controls');
    if (slides.length === 0 || !dotsContainer) return;

    let activeIndex = 0;

    function buildTestimonialDots() {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          activeIndex = i;
          updateTestimonialPosition();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateTestimonialPosition() {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      const offset = activeIndex * 100;
      
      if (isRtl) {
        track.style.transform = `translateX(${offset}%)`;
      } else {
        track.style.transform = `translateX(-${offset}%)`;
      }

      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    }

    buildTestimonialDots();
    updateTestimonialPosition();

    // Auto rotate testimonials
    setInterval(() => {
      activeIndex = (activeIndex + 1) % slides.length;
      updateTestimonialPosition();
    }, 6000);

    window.addEventListener('resize', updateTestimonialPosition);
  });
}

/* ==========================================================================
   FORM VALIDATION SYSTEM (Step 12)
   ========================================================================== */
function initForms() {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      
      let isFormValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

      inputs.forEach(input => {
        if (!validateField(input)) {
          isFormValid = false;
        }
      });

      // Special check for password match inside register form
      const password = form.querySelector('input[type="password"]');
      const confirmPassword = form.querySelector('input[name="confirm-password"]');
      if (password && confirmPassword) {
        if (password.value !== confirmPassword.value) {
          showError(confirmPassword, 'Passwords do not match');
          isFormValid = false;
        } else if (confirmPassword.value.length >= 8) {
          showSuccess(confirmPassword);
        }
      }

      // Check for Terms and Conditions checkbox
      const termsCheckbox = form.querySelector('input[type="checkbox"][name="terms"]');
      if (termsCheckbox) {
        if (!termsCheckbox.checked) {
          const group = termsCheckbox.closest('.checkbox-group') || termsCheckbox.parentElement;
          group.classList.add('error');
          isFormValid = false;
        } else {
          const group = termsCheckbox.closest('.checkbox-group') || termsCheckbox.parentElement;
          group.classList.remove('error');
        }
      }

      if (isFormValid) {
        handleFormSubmitSuccess(form);
      }
    });

    // Real-time input check validation on blur
    const fieldInputs = form.querySelectorAll('input, textarea, select');
    fieldInputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });
      input.addEventListener('input', () => {
        // Clear errors as user types
        const group = input.closest('.form-group') || input.parentElement;
        group.classList.remove('error');
      });
    });
  });
}

function validateField(input) {
  const value = input.value.trim();
  const group = input.closest('.form-group') || input.parentElement;
  
  if (input.hasAttribute('required') && !value) {
    showError(input, 'This field is required');
    return false;
  }

  // Email format validation
  if (input.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showError(input, 'Please enter a valid email address');
      return false;
    }
  }

  // Password length validation
  if (input.type === 'password' && input.name === 'password' && value) {
    if (value.length < 8) {
      showError(input, 'Password must be at least 8 characters long');
      return false;
    }
  }

  showSuccess(input);
  return true;
}

function showError(input, message) {
  const group = input.closest('.form-group');
  if (!group) return;

  group.classList.add('error');
  group.classList.remove('success');
  
  let errorMsg = group.querySelector('.form-error-msg');
  if (!errorMsg) {
    errorMsg = document.createElement('span');
    errorMsg.classList.add('form-error-msg');
    group.appendChild(errorMsg);
  }
  errorMsg.textContent = message;
}

function showSuccess(input) {
  const group = input.closest('.form-group');
  if (!group) return;

  group.classList.remove('error');
  group.classList.add('success');
}

function handleFormSubmitSuccess(form) {
  // Clear any existing alert status
  const existingAlert = form.querySelector('.form-alert');
  if (existingAlert) existingAlert.remove();

  // Create alert box
  const alert = document.createElement('div');
  alert.classList.add('form-alert', 'form-alert-success');
  
  // Custom message based on form purpose
  const formId = form.id;
  if (formId === 'contact-form' || formId === 'booking-form') {
    alert.textContent = 'Service request received successfully! An engineer will contact you shortly.';
  } else if (formId === 'login-form') {
    alert.textContent = 'Login successful! Redirecting you...';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  } else if (formId === 'register-form') {
    alert.textContent = 'Account created successfully! Redirecting to login...';
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  } else if (formId === 'newsletter-form') {
    alert.textContent = 'Subscribed successfully! Thank you.';
  } else {
    alert.textContent = 'Form submitted successfully!';
  }

  form.insertBefore(alert, form.firstChild);
  
  // Reset fields except for OAuth actions
  if (formId !== 'login-form' && formId !== 'register-form') {
    form.reset();
    const successes = form.querySelectorAll('.form-group.success');
    successes.forEach(s => s.classList.remove('success'));
  }
}

/* ==========================================================================
   SCROLL REVEAL & STAGGERED ENTRANCES (Step 11)
   ========================================================================== */
function initAnimations() {
  const animatedElements = document.querySelectorAll('.reveal-text');
  
  // Simple IntersectionObserver for revealing items on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/* ==========================================================================
   FLOATING BACK TO TOP SYSTEM
   ========================================================================== */
function initBackToTop() {
  let backBtn = document.getElementById('backToTop');
  if (!backBtn) {
    backBtn = document.createElement('button');
    backBtn.id = 'backToTop';
    backBtn.className = 'back-to-top-btn';
    backBtn.setAttribute('aria-label', 'Back to top');
    backBtn.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
    document.body.appendChild(backBtn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   PASSWORD VISIBILITY EYE TOGGLE
   ========================================================================== */
function initPasswordToggle() {
  const toggleBtns = document.querySelectorAll('.password-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const container = btn.closest('.password-input-wrapper');
      if (!container) return;
      const input = container.querySelector('input');
      const icon = btn.querySelector('i');
      if (!input || !icon) return;

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        btn.setAttribute('aria-label', 'Hide Password');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        btn.setAttribute('aria-label', 'Show Password');
      }
    });
  });
}

/* ==========================================================================
   FAQ ACCORDION TOGGLE
   ========================================================================== */
function initAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other accordion items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.faq-question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
