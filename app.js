// AuthFlow — CodSoft Task 1
// Screen navigation

function goTo(screenId) {
  const current = document.querySelector('.screen.active');
  const next = document.getElementById(screenId);
  if (!next || current === next) return;

  current.classList.add('slide-out');
  setTimeout(() => {
    current.classList.remove('active', 'slide-out');
    next.classList.add('active');
  }, 200);
}

// Password show/hide toggle
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.style.opacity = '1';
  } else {
    input.type = 'password';
    btn.style.opacity = '0.5';
  }
}

// Input validation feedback
document.querySelectorAll('input[type="email"]').forEach(input => {
  input.addEventListener('blur', () => {
    if (input.value && !input.value.includes('@')) {
      input.style.borderColor = '#EF4444';
    } else {
      input.style.borderColor = 'transparent';
    }
  });
});

document.querySelectorAll('input[type="password"]').forEach(input => {
  input.addEventListener('input', () => {
    if (input.value.length > 0 && input.value.length < 6) {
      input.style.borderColor = '#EF4444';
    } else if (input.value.length >= 6) {
      input.style.borderColor = '#22C55E';
    } else {
      input.style.borderColor = 'transparent';
    }
  });
});
