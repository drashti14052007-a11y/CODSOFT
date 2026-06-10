# 🔐 AuthFlow — Mobile Signup App
### CodSoft Internship | Task 1 — Mobile App UI Design

---

## 📱 Project Overview

**AuthFlow** is a premium, mobile-first authentication UI built with pure HTML, CSS, and JavaScript. It replicates a polished, production-grade signup and login flow — complete with animations, form validation, OTP verification, and onboarding — all within a mobile app shell.

---

## ✨ Features

| Screen | Description |
|---|---|
| 🚀 **Splash Screen** | Animated brand intro with loader |
| 🏠 **Welcome / Landing** | Sign Up & Login CTA with social auth options |
| 📝 **Sign Up** | Full Name, Email, Password with strength meter, Confirm Password |
| 🔑 **Login** | Email + Password with Remember Me & Forgot Password |
| 🔁 **Forgot Password** | Email-based reset link flow with success state |
| 📲 **OTP Verification** | 6-digit code input with auto-focus, countdown timer & resend |
| 🎯 **Interests** | Personalization chip selector (choose 3+) |
| 🎉 **Success** | Animated checkmark + confetti celebration screen |

---

## 🗂️ Project Structure

```
Task1_AuthFlow_SignupApp/
│
├── index.html            # Welcome / Landing screen
├── signup.html           # Sign Up form
├── login.html            # Login form
├── forgot-password.html  # Forgot Password screen
├── otp.html              # OTP Verification screen
├── interests.html        # Interests / Personalization screen
├── success.html          # Account created success screen
│
├── css/
│   └── style.css         # All styles — design tokens, animations, components
│
├── js/
│   └── app.js            # Form logic, validation, OTP, confetti, transitions
│
└── README.md
```

---

## 🛠️ Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties (design tokens), animations, mobile-first layout
- **Vanilla JavaScript** — No frameworks, no dependencies
- **Remix Icons** — Icon library via CDN

---

## 🎨 Design Highlights

- 📐 Mobile-first layout with `app-shell` + `screen` architecture
- 🎨 Design token system using CSS custom properties (`--gradient-primary`, `--text-secondary`, etc.)
- ✨ Smooth page transitions with fade/slide animations
- 💪 Password strength meter with visual feedback
- ⏱️ OTP countdown timer with resend functionality
- 🎊 Confetti animation on success screen
- ♿ Accessible — proper `aria-label`, `autocomplete`, and semantic HTML

---

## 🔄 User Flow

```
Splash Screen
     ↓
Welcome (index.html)
     ↓              ↓
  Sign Up          Log In
     ↓                ↓
OTP Verify      Forgot Password
     ↓
  Interests
     ↓
  Success 🎉
```

---

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/codsoft.git
   ```
2. Navigate to the task folder:
   ```bash
   cd codsoft/Task1_AuthFlow_SignupApp
   ```
3. Open `index.html` in any browser — no build step needed!

---

## 📸 Screenshots

> *(Add screenshots of your app screens here)*

---

## 👨‍💻 Author

**Your Name**
CodSoft Web Development Internship
🔗 [GitHub](https://github.com/your-username) | [LinkedIn](https://linkedin.com/in/your-profile)

---

*Built with ❤️ as part of the CodSoft Internship Program*
