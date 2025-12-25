AOS.init({
  duration: 2000, // sab animations slow & smooth
  once: true, // ek hi dafa chale
});

// Scroll Progress

const progress = document.querySelector(".progress-circle");
const percentage = document.querySelector(".percentage");

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = Math.min((scrollTop / scrollHeight) * 100, 100);
  progress.style.setProperty("--scroll-progress", `${scrollPercent}%`);
  percentage.textContent = `${Math.round(scrollPercent)}%`;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.addEventListener("scroll", updateProgress);
updateProgress();

// Navbar scroll effect with dark/light mode
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const theme = document.documentElement.getAttribute("data-bs-theme");

  // Har waqt theme ka bg lagao
  if (theme === "dark") {
    navbar.classList.add("nav-dark-bg");
    navbar.classList.remove("nav-light-bg");
  } else {
    navbar.classList.add("nav-light-bg");
    navbar.classList.remove("nav-dark-bg");
  }
});

// Dark/Light Mode Toggle
const toggleBtn = document.getElementById("themeToggle");
const html = document.documentElement;
const navbar = document.querySelector(".navbar");
const hero = document.querySelector(".hero");
const boxElements = document.querySelectorAll(
  ".box-light-shadow, .box-dark-shadow"
);

// Load saved theme from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme("dark"); // default
}

toggleBtn.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
});

function setTheme(theme) {
  html.setAttribute("data-bs-theme", theme);

  if (theme === "dark") {
    toggleBtn.innerHTML = `<i class="fa-solid fa-moon fs-5"></i>`;

    navbar.classList.add("nav-dark-bg");
    navbar.classList.remove("nav-light-bg");

    hero.classList.add("hero-dark-bg");
    hero.classList.remove("hero-light-bg");

    // ✅ Dark mode par light shadow
    boxElements.forEach((el) => {
      el.classList.add("box-light-shadow");
      el.classList.remove("box-dark-shadow");
    });
  } else {
    toggleBtn.innerHTML = `<i class="fa-solid fa-sun fs-5"></i>`;

    navbar.classList.add("nav-light-bg");
    navbar.classList.remove("nav-dark-bg");

    hero.classList.add("hero-light-bg");
    hero.classList.remove("hero-dark-bg");

    // ✅ Light mode par dark shadow
    boxElements.forEach((el) => {
      el.classList.add("box-dark-shadow");
      el.classList.remove("box-light-shadow");
    });
  }

  localStorage.setItem("theme", theme);
}

// Select all nav links
const navLinks = document.querySelectorAll(".nav-hover");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Remove active-link from all
    navLinks.forEach((l) => l.classList.remove("active-link"));
    // Add to clicked one
    this.classList.add("active-link");
  });
});

// form section
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const messageField = document.getElementById("message");

// ✅ Name live validation
nameField.addEventListener("input", () => {
  const nameRegex = /^[A-Za-z ]+$/;
  if (!nameRegex.test(nameField.value.trim())) {
    nameField.classList.add("is-invalid");
    nameField.classList.remove("is-valid");
  } else {
    nameField.classList.add("is-valid");
    nameField.classList.remove("is-invalid");
  }
});

// ✅ Email live validation
emailField.addEventListener("input", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailField.value.trim())) {
    emailField.classList.add("is-invalid");
    emailField.classList.remove("is-valid");
  } else {
    emailField.classList.add("is-valid");
    emailField.classList.remove("is-invalid");
  }
});

// ✅ Message live validation
messageField.addEventListener("input", () => {
  if (messageField.value.trim() === "") {
    messageField.classList.add("is-invalid");
    messageField.classList.remove("is-valid");
  } else {
    messageField.classList.add("is-valid");
    messageField.classList.remove("is-invalid");
  }
});

// ✅ Final submit
document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    nameField.classList.contains("is-valid") &&
    emailField.classList.contains("is-valid") &&
    messageField.classList.contains("is-valid")
  ) {
    alert("Form submitted successfully!");
    e.target.reset();
    document
      .querySelectorAll(".is-valid, .is-invalid")
      .forEach((el) => el.classList.remove("is-valid", "is-invalid"));
  } else {
    alert("Please fix the errors before submitting.");
  }
});
