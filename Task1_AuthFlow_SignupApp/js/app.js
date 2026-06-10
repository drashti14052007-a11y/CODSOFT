/* ============================================================
   AUTHFLOW — App JavaScript
   Vanilla JS · No dependencies
   ============================================================ */

/* ─────────────────────────────────────────────
   1. PAGE NAVIGATION — Smooth Transitions
   ───────────────────────────────────────────── */

/**
 * Navigates to a new page with a smooth fade transition overlay.
 * @param {string} url - The target page URL.
 */
function navigateTo(url) {
  const overlay = document.getElementById('pageTransition');
  if (!overlay) {
    window.location.href = url;
    return;
  }
  overlay.classList.add('active');
  setTimeout(() => {
    window.location.href = url;
  }, 280);
}

/* ─────────────────────────────────────────────
   2. UTILITY HELPERS
   ───────────────────────────────────────────── */

/**
 * Validates an email address format.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Calculates password strength.
 * @param {string} pwd
 * @returns {'weak'|'fair'|'good'|'strong'}
 */
function getPasswordStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return 'weak';
  if (score === 2) return 'fair';
  if (score === 3) return 'good';
  return 'strong';
}

/**
 * Sets the validation state on an input group.
 * @param {string} groupId - The input-group element ID.
 * @param {'error'|'success'|'none'} state
 * @param {string} [errorId] - The input-error element ID.
 */
function setFieldState(groupId, state, errorId) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.classList.remove('error', 'success');
  if (state === 'error') group.classList.add('error');
  if (state === 'success') group.classList.add('success');

  if (errorId) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      if (state === 'error') {
        errorEl.classList.add('visible');
      } else {
        errorEl.classList.remove('visible');
      }
    }
  }
}

/**
 * Toggles the loading state on a primary button.
 * @param {string} btnId
 * @param {boolean} isLoading
 */
function setButtonLoading(btnId, isLoading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  if (isLoading) {
    btn.classList.add('loading');
  } else {
    btn.classList.remove('loading');
  }
}

/**
 * Creates and shows a toast notification.
 * @param {string} message
 * @param {'success'|'error'|'warning'|'info'} type
 */
function showToast(message, type = 'info') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const iconMap = {
    success: 'ri-checkbox-circle-line',
    error: 'ri-error-warning-line',
    warning: 'ri-alert-line',
    info: 'ri-information-line',
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="${iconMap[type] || iconMap.info}"></i> ${message}`;
  document.body.appendChild(toast);

  // Trigger show
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto hide
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

/**
 * Toggles password visibility for a given input + toggle button pair.
 * @param {string} inputId
 * @param {string} toggleId
 */
function setupPasswordToggle(inputId, toggleId) {
  const toggle = document.getElementById(toggleId);
  const input = document.getElementById(inputId);
  if (!toggle || !input) return;

  toggle.addEventListener('click', () => {
    const isVisible = input.type === 'text';
    input.type = isVisible ? 'password' : 'text';
    const icon = toggle.querySelector('i');
    icon.className = isVisible ? 'ri-eye-off-line' : 'ri-eye-line';
    toggle.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
  });
}

/* ─────────────────────────────────────────────
   3. SIGN UP FORM
   ───────────────────────────────────────────── */

function initSignupForm() {
  const form = document.getElementById('signupForm');
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirmPassword');
  const submitBtn = document.getElementById('btnSignup');
  const strengthWrap = document.getElementById('passwordStrength');
  const strengthFill = document.getElementById('strengthFill');
  const strengthLabel = document.getElementById('strengthLabel');

  if (!form) return;

  // Setup toggles
  setupPasswordToggle('password', 'togglePassword');
  setupPasswordToggle('confirmPassword', 'toggleConfirmPassword');

  /* ── Real-Time Validation ── */

  // Debounce helper
  let validateTimer;
  function debouncedValidate() {
    clearTimeout(validateTimer);
    validateTimer = setTimeout(validateAll, 200);
  }

  nameInput.addEventListener('input', debouncedValidate);
  emailInput.addEventListener('input', debouncedValidate);
  passwordInput.addEventListener('input', () => {
    updateStrength();
    debouncedValidate();
  });
  confirmInput.addEventListener('input', debouncedValidate);

  // Blur validation for immediate feedback
  nameInput.addEventListener('blur', () => validateField('name'));
  emailInput.addEventListener('blur', () => validateField('email'));
  passwordInput.addEventListener('blur', () => validateField('password'));
  confirmInput.addEventListener('blur', () => validateField('confirm'));

  function validateField(field) {
    switch (field) {
      case 'name':
        if (nameInput.value.trim().length > 0) {
          setFieldState('nameGroup', nameInput.value.trim().length >= 2 ? 'success' : 'error', 'nameError');
        }
        break;
      case 'email':
        if (emailInput.value.trim().length > 0) {
          setFieldState('emailGroup', isValidEmail(emailInput.value) ? 'success' : 'error', 'emailError');
        }
        break;
      case 'password':
        if (passwordInput.value.length > 0) {
          setFieldState('passwordGroup', passwordInput.value.length >= 8 ? 'success' : 'error', 'passwordError');
        }
        break;
      case 'confirm':
        if (confirmInput.value.length > 0) {
          const match = confirmInput.value === passwordInput.value && confirmInput.value.length >= 8;
          setFieldState('confirmGroup', match ? 'success' : 'error', 'confirmError');
        }
        break;
    }
  }

  function updateStrength() {
    const pwd = passwordInput.value;
    if (pwd.length === 0) {
      strengthWrap.style.display = 'none';
      return;
    }
    strengthWrap.style.display = 'block';
    const level = getPasswordStrength(pwd);
    strengthFill.className = 'strength-bar-fill ' + level;
    strengthLabel.className = 'strength-label ' + level;

    const labels = { weak: 'Weak', fair: 'Fair', good: 'Good', strong: 'Strong' };
    strengthLabel.textContent = labels[level];
  }

  function validateAll() {
    const nameOk = nameInput.value.trim().length >= 2;
    const emailOk = isValidEmail(emailInput.value);
    const pwOk = passwordInput.value.length >= 8;
    const confirmOk = confirmInput.value === passwordInput.value && confirmInput.value.length >= 8;

    const allValid = nameOk && emailOk && pwOk && confirmOk;
    submitBtn.disabled = !allValid;
    submitBtn.classList.toggle('disabled', !allValid);

    return allValid;
  }

  /* ── Submission ── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Force validate all fields visually
    validateField('name');
    validateField('email');
    validateField('password');
    validateField('confirm');

    if (!validateAll()) {
      showToast('Please fix the errors above', 'error');
      return;
    }

    // Simulate loading
    setButtonLoading('btnSignup', true);

    setTimeout(() => {
      setButtonLoading('btnSignup', false);
      showToast('Account created successfully!', 'success');

      // Store name for success screen
      try { localStorage.setItem('ag_name', nameInput.value.trim().split(' ')[0]); } catch (_) {}

      setTimeout(() => navigateTo('otp.html'), 800);
    }, 1800);
  });

  // Social button animations
  document.getElementById('btnGoogle')?.addEventListener('click', () => {
    showToast('Connecting to Google…', 'info');
    setTimeout(() => {
      showToast('Google sign-in successful!', 'success');
      setTimeout(() => navigateTo('interests.html'), 800);
    }, 1500);
  });

  document.getElementById('btnApple')?.addEventListener('click', () => {
    showToast('Connecting to Apple…', 'info');
    setTimeout(() => {
      showToast('Apple sign-in successful!', 'success');
      setTimeout(() => navigateTo('interests.html'), 800);
    }, 1500);
  });
}

/* ─────────────────────────────────────────────
   4. LOGIN FORM
   ───────────────────────────────────────────── */

function initLoginForm() {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const submitBtn = document.getElementById('btnLogin');

  if (!form) return;

  setupPasswordToggle('loginPassword', 'toggleLoginPassword');

  let timer;
  function debounceValidate() {
    clearTimeout(timer);
    timer = setTimeout(validateLogin, 200);
  }

  emailInput.addEventListener('input', debounceValidate);
  passwordInput.addEventListener('input', debounceValidate);

  emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim().length > 0) {
      setFieldState('loginEmailGroup', isValidEmail(emailInput.value) ? 'success' : 'error', 'loginEmailError');
    }
  });

  passwordInput.addEventListener('blur', () => {
    if (passwordInput.value.length > 0) {
      setFieldState('loginPasswordGroup', passwordInput.value.length >= 1 ? 'success' : 'error', 'loginPasswordError');
    }
  });

  function validateLogin() {
    const emailOk = isValidEmail(emailInput.value);
    const pwOk = passwordInput.value.length >= 1;
    const allValid = emailOk && pwOk;
    submitBtn.disabled = !allValid;
    submitBtn.classList.toggle('disabled', !allValid);
    return allValid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateLogin()) {
      showToast('Please enter valid credentials', 'error');
      return;
    }

    setButtonLoading('btnLogin', true);

    setTimeout(() => {
      setButtonLoading('btnLogin', false);
      showToast('Welcome back!', 'success');

      try { localStorage.setItem('ag_name', emailInput.value.split('@')[0]); } catch (_) {}

      setTimeout(() => navigateTo('success.html'), 800);
    }, 1600);
  });

  // Social buttons
  document.getElementById('btnGoogleLogin')?.addEventListener('click', () => {
    showToast('Connecting to Google…', 'info');
    setTimeout(() => {
      showToast('Login successful!', 'success');
      setTimeout(() => navigateTo('success.html'), 800);
    }, 1500);
  });

  document.getElementById('btnAppleLogin')?.addEventListener('click', () => {
    showToast('Connecting to Apple…', 'info');
    setTimeout(() => {
      showToast('Login successful!', 'success');
      setTimeout(() => navigateTo('success.html'), 800);
    }, 1500);
  });
}

/* ─────────────────────────────────────────────
   5. FORGOT PASSWORD FORM
   ───────────────────────────────────────────── */

function initForgotForm() {
  const form = document.getElementById('forgotForm');
  const emailInput = document.getElementById('forgotEmail');
  const submitBtn = document.getElementById('btnReset');
  const successView = document.getElementById('forgotSuccess');
  const sentEmailEl = document.getElementById('sentEmail');

  if (!form) return;

  let timer;
  emailInput.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const valid = isValidEmail(emailInput.value);
      submitBtn.disabled = !valid;
      submitBtn.classList.toggle('disabled', !valid);
    }, 200);
  });

  emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim().length > 0) {
      setFieldState('forgotEmailGroup', isValidEmail(emailInput.value) ? 'success' : 'error', 'forgotEmailError');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isValidEmail(emailInput.value)) {
      setFieldState('forgotEmailGroup', 'error', 'forgotEmailError');
      return;
    }

    setButtonLoading('btnReset', true);

    setTimeout(() => {
      setButtonLoading('btnReset', false);
      // Show success view
      sentEmailEl.textContent = emailInput.value.trim();
      form.classList.add('hidden');
      successView.classList.remove('hidden');
      successView.style.animation = 'fade-in-up 0.5s var(--ease-smooth) both';
      showToast('Reset link sent!', 'success');
    }, 1800);
  });
}

/* ─────────────────────────────────────────────
   6. OTP VERIFICATION
   ───────────────────────────────────────────── */

let otpTimerInterval = null;

function initOtpScreen() {
  const inputs = document.querySelectorAll('.otp-input');
  const verifyBtn = document.getElementById('btnVerify');
  const resendBtn = document.getElementById('btnResend');

  if (!inputs.length) return;

  // Auto focus first input
  inputs[0].focus();

  inputs.forEach((input, idx) => {
    // Only allow digits
    input.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = val;

      if (val.length === 1) {
        input.classList.add('filled');
        // Move to next
        if (idx < inputs.length - 1) {
          inputs[idx + 1].focus();
        }
      } else {
        input.classList.remove('filled');
      }
      checkOtpComplete();
    });

    // Handle backspace
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        if (input.value === '' && idx > 0) {
          inputs[idx - 1].focus();
          inputs[idx - 1].value = '';
          inputs[idx - 1].classList.remove('filled');
        } else {
          input.classList.remove('filled');
        }
        setTimeout(checkOtpComplete, 10);
      }
    });

    // Handle paste
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '');
      for (let i = 0; i < Math.min(pasted.length, inputs.length); i++) {
        inputs[i].value = pasted[i];
        inputs[i].classList.add('filled');
      }
      const nextIdx = Math.min(pasted.length, inputs.length - 1);
      inputs[nextIdx].focus();
      checkOtpComplete();
    });
  });

  function checkOtpComplete() {
    let allFilled = true;
    inputs.forEach((inp) => {
      if (inp.value.length !== 1) allFilled = false;
    });
    verifyBtn.disabled = !allFilled;
    verifyBtn.classList.toggle('disabled', !allFilled);
  }

  // Timer
  startOtpTimer(90, resendBtn);

  // Resend
  resendBtn.addEventListener('click', () => {
    if (resendBtn.disabled) return;
    // Clear inputs
    inputs.forEach((inp) => {
      inp.value = '';
      inp.classList.remove('filled', 'error', 'success');
    });
    inputs[0].focus();
    verifyBtn.disabled = true;
    verifyBtn.classList.add('disabled');
    showToast('New code sent!', 'success');
    startOtpTimer(90, resendBtn);
  });
}

function startOtpTimer(seconds, resendBtn) {
  const timerDisplay = document.getElementById('timerDisplay');
  const timerWrap = document.getElementById('otpTimer');
  if (otpTimerInterval) clearInterval(otpTimerInterval);

  let remaining = seconds;
  resendBtn.disabled = true;
  timerWrap.style.display = 'block';

  function tick() {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (remaining <= 0) {
      clearInterval(otpTimerInterval);
      timerWrap.style.display = 'none';
      resendBtn.disabled = false;
    }
    remaining--;
  }

  tick();
  otpTimerInterval = setInterval(tick, 1000);
}

/**
 * Handles OTP verify button click.
 */
function verifyOtp() {
  const inputs = document.querySelectorAll('.otp-input');
  const btn = document.getElementById('btnVerify');

  setButtonLoading('btnVerify', true);

  // Simulate verification
  setTimeout(() => {
    // Always succeed for demo
    inputs.forEach((inp) => {
      inp.classList.add('success');
    });

    setButtonLoading('btnVerify', false);
    showToast('Verified successfully!', 'success');

    setTimeout(() => navigateTo('interests.html'), 800);
  }, 1800);
}

/* ─────────────────────────────────────────────
   7. INTERESTS SCREEN
   ───────────────────────────────────────────── */

function initInterestsScreen() {
  const chips = document.querySelectorAll('.interest-chip');
  const counter = document.getElementById('interestsCounter');
  const continueBtn = document.getElementById('btnContinueInterests');
  const selected = new Set();

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const interest = chip.dataset.interest;

      if (selected.has(interest)) {
        selected.delete(interest);
        chip.classList.remove('selected');
      } else {
        selected.add(interest);
        chip.classList.add('selected');
      }

      // Update counter
      counter.innerHTML = `<strong>${selected.size}</strong> of 3+ selected`;

      // Enable/disable continue
      const canContinue = selected.size >= 3;
      continueBtn.disabled = !canContinue;
      continueBtn.classList.toggle('disabled', !canContinue);
    });
  });
}

/* ─────────────────────────────────────────────
   8. CONFETTI ANIMATION (Success Screen)
   ───────────────────────────────────────────── */

function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#5B8DEF', '#AFA5FF', '#7FE7DC', '#4ADE80', '#F59E0B', '#FF6B6B'];
  const confettiCount = 120;
  const confetti = [];

  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 8 + 4,
      h: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      opacity: 1,
    });
  }

  let frame = 0;
  const maxFrames = 200;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();

      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.vy += 0.04; // gravity

      // Fade out near end
      if (frame > maxFrames * 0.7) {
        p.opacity -= 0.015;
        if (p.opacity < 0) p.opacity = 0;
      }
    });

    frame++;
    if (frame < maxFrames) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.remove();
    }
  }

  // Delay confetti slightly so it feels celebratory after the checkmark
  setTimeout(() => {
    requestAnimationFrame(draw);
  }, 600);

  // Handle resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/* ─────────────────────────────────────────────
   9. GLOBAL INITIALIZATIONS
   ───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Animate elements on page load with stagger observer
  const animatedElements = document.querySelectorAll(
    '.animate-fade-in-up, .animate-fade-in, .animate-scale-in, .animate-slide-in'
  );

  // Use IntersectionObserver for elements that should animate when visible
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.visibility = 'visible';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  // Populate success screen greeting with stored name
  const greeting = document.querySelector('.success-greeting');
  if (greeting) {
    try {
      const name = localStorage.getItem('ag_name');
      if (name) {
        greeting.textContent = `Welcome, ${name}! 🎉`;
      }
    } catch (_) {}
  }
});
