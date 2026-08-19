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
  const scrollPercent =
    scrollHeight > 0 ? Math.min((scrollTop / scrollHeight) * 100, 100) : 0;
  progress.style.setProperty("--scroll-progress", `${scrollPercent}%`);
  percentage.textContent = `${Math.round(scrollPercent)}%`;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

if (progress && percentage) {
  window.addEventListener("scroll", updateProgress);
  updateProgress();
}

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
  ".box-light-shadow, .box-dark-shadow",
);

// Load saved theme from localStorage
const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme ? savedTheme : "dark");

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

    if (hero) {
      hero.classList.add("hero-dark-bg");
      hero.classList.remove("hero-light-bg");
    }

    // Dark mode par light shadow
    boxElements.forEach((el) => {
      el.classList.add("box-light-shadow");
      el.classList.remove("box-dark-shadow");
    });
  } else {
    toggleBtn.innerHTML = `<i class="fa-solid fa-sun fs-5"></i>`;

    navbar.classList.add("nav-light-bg");
    navbar.classList.remove("nav-dark-bg");

    if (hero) {
      hero.classList.add("hero-light-bg");
      hero.classList.remove("hero-dark-bg");
    }

    // Light mode par dark shadow
    boxElements.forEach((el) => {
      el.classList.add("box-dark-shadow");
      el.classList.remove("box-light-shadow");
    });
  }

  localStorage.setItem("theme", theme);
}

// Nav links: current page ke hisaab se active-link lagao (multi-page site)
const navLinks = document.querySelectorAll(".nav-hover[data-page]");
const currentPage = document.body.getAttribute("data-page");

navLinks.forEach((link) => {
  if (link.getAttribute("data-page") === currentPage) {
    link.classList.add("active-link");
  }

  // Mobile par link click hone k baad menu band ho jaye
  link.addEventListener("click", function () {
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
    }
  });
});

// Contact / signup form section (Home page)
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");

  // Name live validation
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

  // Email live validation
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

  // Message live validation
  messageField.addEventListener("input", () => {
    if (messageField.value.trim() === "") {
      messageField.classList.add("is-invalid");
      messageField.classList.remove("is-valid");
    } else {
      messageField.classList.add("is-valid");
      messageField.classList.remove("is-invalid");
    }
  });

  // Final submit
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Agar user ne field ko touch hi nahi kiya to bhi check kar lo
    nameField.dispatchEvent(new Event("input"));
    emailField.dispatchEvent(new Event("input"));
    messageField.dispatchEvent(new Event("input"));

    if (
      nameField.classList.contains("is-valid") &&
      emailField.classList.contains("is-valid") &&
      messageField.classList.contains("is-valid")
    ) {
      alert("Form submitted successfully!");
      signupForm.reset();
      document
        .querySelectorAll(".is-valid, .is-invalid")
        .forEach((el) => el.classList.remove("is-valid", "is-invalid"));
    } else {
      alert("Please fix the errors before submitting.");
    }
  });
}

// Footer newsletter form - simple client side confirmation
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector("input[type='email']");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && emailRegex.test(emailInput.value.trim())) {
      alert("Subscribed successfully!");
      newsletterForm.reset();
    } else {
      alert("Please enter a valid email address.");
    }
  });
}

// Portfolio filter buttons (Portfolio page)
const filterButtons = document.querySelectorAll("[data-filter]");
const portfolioItems = document.querySelectorAll(".portfolio-item");

if (filterButtons.length && portfolioItems.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.closest(".portfolio-col").style.display = "";
        } else {
          item.closest(".portfolio-col").style.display = "none";
        }
      });
    });
  });
}
