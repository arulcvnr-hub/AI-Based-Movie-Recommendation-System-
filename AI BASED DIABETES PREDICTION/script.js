(function () {
  'use strict';

  // ---------- DOM refs ----------
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const predictionForm = document.getElementById('prediction-form');
  const resetBtn = document.getElementById('reset-btn');
  const resultPanel = document.getElementById('result-panel');
  const inputSummary = document.getElementById('input-summary');
  const summaryGrid = document.getElementById('summary-grid');
  const analyzeAgainBtn = document.getElementById('analyze-again');
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  const yearEl = document.getElementById('year');

  // Field config for validation & summary labels
  const FIELD_CONFIG = {
    pregnancies: { label: 'Pregnancies', min: 0, max: 20, required: false, step: 1 },
    glucose: { label: 'Glucose Level', min: 0, max: 300, required: true, step: 1 },
    bloodPressure: { label: 'Blood Pressure', min: 0, max: 200, required: true, step: 1 },
    skinThickness: { label: 'Skin Thickness', min: 0, max: 100, required: false, step: 1 },
    insulin: { label: 'Insulin Level', min: 0, max: 900, required: false, step: 1 },
    bmi: { label: 'BMI', min: 0, max: 80, required: true, step: 0.1 },
    dpf: { label: 'Diabetes Pedigree Function', min: 0, max: 3, required: false, step: 0.001 },
    age: { label: 'Age', min: 1, max: 120, required: true, step: 1 }
  };

  // ---------- Mobile navigation ----------
  function toggleNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  }

  function closeNav() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeNav();
    }
  });

  // ---------- Sticky header ----------
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNav();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Active nav link on scroll ----------
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector('.nav__link[href="#' + id + '"]');

      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Scroll reveal ----------
  function revealOnScroll() {
    const elements = document.querySelectorAll('[data-reveal]');
    const windowH = window.innerHeight;

    elements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowH - 60) {
        el.classList.add('revealed');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  window.addEventListener('load', revealOnScroll);

  // ---------- Animated counters ----------
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(function (counter) {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      let current = 0;
      const duration = 1200;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        current = Math.floor(progress * target);
        counter.textContent = current;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(update);
    });
  }

  // Trigger counters when stats section is visible
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(statsSection);
  }

  // ---------- Form validation ----------
  function clearErrors() {
    Object.keys(FIELD_CONFIG).forEach(function (key) {
      const input = document.getElementById(key);
      const errorEl = document.getElementById('error-' + key);
      if (input) input.classList.remove('error');
      if (errorEl) errorEl.textContent = '';
    });
  }

  function validateField(name, value) {
    const config = FIELD_CONFIG[name];
    if (!config) return '';

    if (config.required && (value === '' || value === null || value === undefined)) {
      return config.label + ' is required.';
    }

    if (value === '' || value === null) return '';

    const num = parseFloat(value);
    if (isNaN(num)) {
      return 'Please enter a valid number.';
    }
    if (num < config.min) {
      return 'Minimum value is ' + config.min + '.';
    }
    if (num > config.max) {
      return 'Maximum value is ' + config.max + '.';
    }
    return '';
  }

  function validateForm() {
    clearErrors();
    let isValid = true;

    Object.keys(FIELD_CONFIG).forEach(function (key) {
      const input = document.getElementById(key);
      if (!input) return;

      const error = validateField(key, input.value.trim());
      if (error) {
        isValid = false;
        input.classList.add('error');
        const errorEl = document.getElementById('error-' + key);
        if (errorEl) errorEl.textContent = error;
      }
    });

    return isValid;
  }

  // Live validation on blur
  Object.keys(FIELD_CONFIG).forEach(function (key) {
    const input = document.getElementById(key);
    if (!input) return;

    input.addEventListener('blur', function () {
      const error = validateField(key, input.value.trim());
      const errorEl = document.getElementById('error-' + key);
      if (error) {
        input.classList.add('error');
        if (errorEl) errorEl.textContent = error;
      } else {
        input.classList.remove('error');
        if (errorEl) errorEl.textContent = '';
      }
    });

    input.addEventListener('input', function () {
      if (input.classList.contains('error')) {
        const error = validateField(key, input.value.trim());
        if (!error) {
          input.classList.remove('error');
          const errorEl = document.getElementById('error-' + key);
          if (errorEl) errorEl.textContent = '';
        }
      }
    });
  });

  // ---------- Prediction algorithm (deterministic, educational) ----------
  /**
   * Weighted risk score based on common clinical ranges.
   * Returns { level, percentage, message, recommendation }
   */
  function calculateDiabetesRisk(data) {
    let score = 0;
    let maxScore = 0;

    // Glucose (0–300) — highest weight
    const glucose = data.glucose;
    maxScore += 30;
    if (glucose >= 200) score += 30;
    else if (glucose >= 140) score += 22;
    else if (glucose >= 100) score += 12;
    else if (glucose >= 70) score += 3;
    else score += 5; // very low can also indicate issues

    // BMI (0–80)
    const bmi = data.bmi;
    maxScore += 20;
    if (bmi >= 40) score += 20;
    else if (bmi >= 30) score += 15;
    else if (bmi >= 25) score += 8;
    else if (bmi >= 18.5) score += 2;
    else score += 4;

    // Age (1–120)
    const age = data.age;
    maxScore += 15;
    if (age >= 60) score += 15;
    else if (age >= 45) score += 11;
    else if (age >= 35) score += 6;
    else if (age >= 25) score += 2;

    // Blood pressure (0–200)
    const bp = data.bloodPressure;
    maxScore += 12;
    if (bp >= 90) score += 12;
    else if (bp >= 80) score += 7;
    else if (bp >= 60) score += 2;
    else if (bp > 0) score += 4;

    // Insulin (0–900)
    const insulin = data.insulin;
    if (insulin > 0) {
      maxScore += 10;
      if (insulin >= 200) score += 10;
      else if (insulin >= 150) score += 7;
      else if (insulin >= 100) score += 4;
      else score += 1;
    }

    // Diabetes Pedigree Function (0–3)
    const dpf = data.dpf;
    if (dpf > 0) {
      maxScore += 8;
      if (dpf >= 1.0) score += 8;
      else if (dpf >= 0.5) score += 5;
      else if (dpf >= 0.2) score += 2;
    }

    // Pregnancies (0–20)
    const preg = data.pregnancies;
    if (preg > 0) {
      maxScore += 5;
      if (preg >= 5) score += 5;
      else if (preg >= 3) score += 3;
      else score += 1;
    }

    // Skin thickness (0–100)
    const skin = data.skinThickness;
    if (skin > 0) {
      maxScore += 5;
      if (skin >= 40) score += 5;
      else if (skin >= 25) score += 3;
      else score += 1;
    }

    // Normalize to percentage
    let percentage = Math.round((score / maxScore) * 100);
    percentage = Math.max(5, Math.min(98, percentage));

    // Classify
    let level, message, recommendation, cssClass;

    if (percentage < 35) {
      level = 'Low Risk';
      cssClass = 'low';
      message = 'Your entered values indicate a lower estimated risk.';
      recommendation =
        'Your entered values indicate a lower estimated risk. Continue maintaining healthy lifestyle habits and regular health checkups.';
    } else if (percentage < 65) {
      level = 'Moderate Risk';
      cssClass = 'moderate';
      message = 'Your entered values indicate a moderate estimated risk.';
      recommendation =
        'Your entered values indicate a moderate estimated risk. Consider discussing your results and lifestyle with a healthcare professional.';
    } else {
      level = 'High Risk';
      cssClass = 'high';
      message = 'Your entered values indicate a higher estimated risk.';
      recommendation =
        'Your entered values indicate a higher estimated risk. Please consult a qualified healthcare professional for proper evaluation.';
    }

    return {
      level: level,
      percentage: percentage,
      message: message,
      recommendation: recommendation,
      cssClass: cssClass
    };
  }

  // ---------- Get form data ----------
  function getFormData() {
    return {
      pregnancies: parseFloat(document.getElementById('pregnancies').value) || 0,
      glucose: parseFloat(document.getElementById('glucose').value) || 0,
      bloodPressure: parseFloat(document.getElementById('bloodPressure').value) || 0,
      skinThickness: parseFloat(document.getElementById('skinThickness').value) || 0,
      insulin: parseFloat(document.getElementById('insulin').value) || 0,
      bmi: parseFloat(document.getElementById('bmi').value) || 0,
      dpf: parseFloat(document.getElementById('dpf').value) || 0,
      age: parseFloat(document.getElementById('age').value) || 0
    };
  }

  // ---------- Render result ----------
  function renderResult(result) {
    const riskLevelEl = document.getElementById('risk-level');
    const riskPercentageEl = document.getElementById('risk-percentage');
    const riskMessageEl = document.getElementById('risk-message');
    const riskRecommendationEl = document.getElementById('risk-recommendation');
    const progressBar = document.getElementById('progress-bar');

    riskLevelEl.textContent = result.level;
    riskLevelEl.className = 'level-value ' + result.cssClass;
    riskMessageEl.textContent = result.message;
    riskRecommendationEl.textContent = result.recommendation;

    // Animate circular progress
    const circumference = 2 * Math.PI * 52; // r = 52
    const offset = circumference - (result.percentage / 100) * circumference;

    // Set stroke color by risk
    if (result.cssClass === 'low') {
      progressBar.style.stroke = 'var(--risk-low)';
    } else if (result.cssClass === 'moderate') {
      progressBar.style.stroke = 'var(--risk-moderate)';
    } else {
      progressBar.style.stroke = 'var(--risk-high)';
    }

    // Reset then animate
    progressBar.style.strokeDasharray = circumference;
    progressBar.style.strokeDashoffset = circumference;

    // Animate number
    let current = 0;
    const target = result.percentage;
    const duration = 1200;
    const start = performance.now();

    function animateNumber(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * target);
      riskPercentageEl.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      } else {
        riskPercentageEl.textContent = target;
      }
    }

    requestAnimationFrame(function () {
      progressBar.style.strokeDashoffset = offset;
      requestAnimationFrame(animateNumber);
    });

    // Show panels
    resultPanel.hidden = false;
    document.querySelector('.prediction__layout').classList.add('has-result');
  }

  // ---------- Render input summary ----------
  function renderSummary(data) {
    const labels = {
      glucose: 'Glucose',
      bloodPressure: 'Blood Pressure',
      bmi: 'BMI',
      age: 'Age',
      insulin: 'Insulin',
      pregnancies: 'Pregnancies',
      skinThickness: 'Skin Thickness',
      dpf: 'Diabetes Pedigree Function'
    };

    const order = [
      'glucose',
      'bloodPressure',
      'bmi',
      'age',
      'insulin',
      'pregnancies',
      'skinThickness',
      'dpf'
    ];

    let html = '';
    order.forEach(function (key) {
      const val = data[key];
      const display = val === 0 && !FIELD_CONFIG[key].required ? '—' : val;
      html +=
        '<div class="summary-card">' +
        '<div class="summary-card__label">' +
        labels[key] +
        '</div>' +
        '<div class="summary-card__value">' +
        display +
        '</div>' +
        '</div>';
    });

    summaryGrid.innerHTML = html;
    inputSummary.hidden = false;
  }

  // ---------- Predict handler ----------
  function handlePredict(e) {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = predictionForm.querySelector('.error');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const data = getFormData();
    const result = calculateDiabetesRisk(data);

    renderResult(result);
    renderSummary(data);

    // Scroll to result
    setTimeout(function () {
      resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  // ---------- Reset ----------
  function handleReset() {
    predictionForm.reset();
    clearErrors();
    resultPanel.hidden = true;
    inputSummary.hidden = true;
    document.querySelector('.prediction__layout').classList.remove('has-result');

    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.style.strokeDashoffset = 326.73;
    }
    document.getElementById('risk-percentage').textContent = '0';
  }

  // ---------- Analyze again ----------
  function handleAnalyzeAgain() {
    resultPanel.hidden = true;
    inputSummary.hidden = true;
    document.querySelector('.prediction__layout').classList.remove('has-result');
    document.getElementById('prediction').scrollIntoView({ behavior: 'smooth' });
  }

  if (predictionForm) {
    predictionForm.addEventListener('submit', handlePredict);
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', handleReset);
  }
  if (analyzeAgainBtn) {
    analyzeAgainBtn.addEventListener('click', handleAnalyzeAgain);
  }

  // ---------- FAQ accordion ----------
  document.querySelectorAll('.faq-item__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('open');
        el.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---------- Contact form ----------
  function validateContact() {
    let valid = true;
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');

    // Clear
    [name, email, message].forEach(function (el) {
      el.classList.remove('error');
    });
    document.getElementById('error-contact-name').textContent = '';
    document.getElementById('error-contact-email').textContent = '';
    document.getElementById('error-contact-message').textContent = '';

    if (!name.value.trim()) {
      name.classList.add('error');
      document.getElementById('error-contact-name').textContent = 'Name is required.';
      valid = false;
    }

    const emailVal = email.value.trim();
    if (!emailVal) {
      email.classList.add('error');
      document.getElementById('error-contact-email').textContent = 'Email is required.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      email.classList.add('error');
      document.getElementById('error-contact-email').textContent = 'Please enter a valid email.';
      valid = false;
    }

    if (!message.value.trim()) {
      message.classList.add('error');
      document.getElementById('error-contact-message').textContent = 'Message is required.';
      valid = false;
    }

    return valid;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactSuccess.hidden = true;

      if (!validateContact()) return;

      // No backend — show success message only
      contactSuccess.hidden = false;
      contactForm.reset();

      setTimeout(function () {
        contactSuccess.hidden = true;
      }, 5000);
    });
  }

  // ---------- Year in footer ----------
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- Init ----------
  onScroll();
  revealOnScroll();
})();
The complete AI BASED DIABETES PREDICTION project is ready. Open diabetes-prediction/index.html in a browser to run it.
Project structure