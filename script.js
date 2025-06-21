/* ===== MENU SHOW/HIDE ===== */
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

/* Menu show */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Menu hidden */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/* ===== REMOVE MENU MOBILE ===== */
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/* ===== CHANGE BACKGROUND HEADER ===== */
function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/* ===== SHOW SCROLL UP ===== */
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/* ===== SCROLL SECTIONS ACTIVE LINK ===== */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/* ===== INITIALIZE AOS ANIMATION ===== */
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

/* ===== SMOOTH SCROLLING FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

/* ===== PRODUCT CARD INTERACTIONS ===== */
const productCards = document.querySelectorAll(".product__card");

productCards.forEach((card) => {
  const addToCartBtn = card.querySelector(".button--small");
  const heartBtn = card.querySelector(".product__btn:nth-child(2)");
  const eyeBtn = card.querySelector(".product__btn:nth-child(1)");

  // Add to cart functionality
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Add animation class
      this.style.transform = "scale(0.95)";
      this.innerHTML = '<i class="fas fa-check"></i> Added!';
      this.style.background = "#10b981";

      // Reset after 2 seconds
      setTimeout(() => {
        this.style.transform = "scale(1)";
        this.innerHTML = "Add to Cart";
        this.style.background = "";
      }, 2000);
    });
  }

  // Heart button (wishlist) functionality
  if (heartBtn) {
    heartBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const icon = this.querySelector("i");

      if (icon.classList.contains("fas")) {
        icon.classList.remove("fas");
        icon.classList.add("far");
        this.style.color = "#6b7280";
      } else {
        icon.classList.remove("far");
        icon.classList.add("fas");
        this.style.color = "#ef4444";
      }

      // Add bounce animation
      this.style.transform = "scale(1.2)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
    });
  }

  // Eye button (quick view) functionality
  if (eyeBtn) {
    eyeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Add pulse animation
      this.style.transform = "scale(1.1)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);

      // You can add modal functionality here
      alert("Quick view feature coming soon!");
    });
  }
});

/* ===== FLOATING ANIMATION FOR HOME SHOE ===== */
const homeShoe = document.querySelector(".home__shoe");
if (homeShoe) {
  // Add mousemove effect for interactive floating
  document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPercent = (clientX / innerWidth - 0.5) * 2;
    const yPercent = (clientY / innerHeight - 0.5) * 2;

    homeShoe.style.transform = `translate(${xPercent * 5}px, ${
      yPercent * 5
    }px) rotateY(${xPercent * 5}deg)`;
  });
}

/* ===== STATS COUNTER ANIMATION ===== */
const statsNumbers = document.querySelectorAll(".stat-number");

function animateCounter(element) {
  const target = parseInt(element.textContent.replace(/[^\d]/g, ""));
  const suffix = element.textContent.replace(/[\d]/g, "");
  let current = 0;
  const increment = target / 60; // 60 frames for 1 second at 60fps

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    if (suffix.includes("K")) {
      element.textContent = Math.floor(current) + "K+";
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 16); // ~60fps
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector(".stat-number");
      if (statNumber && !statNumber.classList.contains("animated")) {
        statNumber.classList.add("animated");
        animateCounter(statNumber);
      }
    }
  });
});

document.querySelectorAll(".stat-item").forEach((stat) => {
  statsObserver.observe(stat);
});

/* ===== TESTIMONIAL CARDS HOVER EFFECT ===== */
const testimonialCards = document.querySelectorAll(".testimonial__card");

testimonialCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

/* ===== FEATURE CARDS ANIMATION ===== */
const featureCards = document.querySelectorAll(".feature__card");

featureCards.forEach((card, index) => {
  card.addEventListener("mouseenter", function () {
    const icon = this.querySelector(".feature__icon");
    icon.style.transform = "scale(1.1) rotateY(180deg)";
  });

  card.addEventListener("mouseleave", function () {
    const icon = this.querySelector(".feature__icon");
    icon.style.transform = "scale(1) rotateY(0deg)";
  });
});

/* ===== SCROLL PROGRESS INDICATOR ===== */
function updateScrollProgress() {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  // Create progress bar if it doesn't exist
  let progressBar = document.querySelector(".scroll-progress");
  if (!progressBar) {
    progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${scrollPercent}%;
            height: 3px;
            background: linear-gradient(135deg, #6366f1, #ec4899);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
    document.body.appendChild(progressBar);
  } else {
    progressBar.style.width = scrollPercent + "%";
  }
}

window.addEventListener("scroll", updateScrollProgress);

/* ===== PARALLAX EFFECT FOR SECTIONS ===== */
function parallaxEffect() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  parallaxElements.forEach((element) => {
    const speed = element.dataset.parallax;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
}

window.addEventListener("scroll", parallaxEffect);

/* ===== LOADING ANIMATION ===== */
window.addEventListener("load", function () {
  // Add loaded class to body for any CSS animations
  document.body.classList.add("loaded");

  // Animate elements on load
  const homeTitle = document.querySelector(".home__title");
  if (homeTitle) {
    homeTitle.style.opacity = "0";
    homeTitle.style.transform = "translateY(30px)";

    setTimeout(() => {
      homeTitle.style.transition = "all 0.8s ease";
      homeTitle.style.opacity = "1";
      homeTitle.style.transform = "translateY(0)";
    }, 300);
  }
});

/* ===== BUTTON RIPPLE EFFECT ===== */
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        background-color: rgba(255, 255, 255, 0.6);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;

  // Add ripple CSS animation if not exists
  if (!document.querySelector("#ripple-style")) {
    const style = document.createElement("style");
    style.id = "ripple-style";
    style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple effect to all buttons
document.querySelectorAll(".button").forEach((button) => {
  button.style.position = "relative";
  button.style.overflow = "hidden";
  button.addEventListener("click", createRipple);
});

/* ===== INTERSECTION OBSERVER FOR ANIMATIONS ===== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

/* ===== MOBILE OPTIMIZATIONS ===== */
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // Disable hover effects on mobile
  document.body.classList.add("mobile-device");

  // Add mobile-specific styles
  const mobileStyle = document.createElement("style");
  mobileStyle.textContent = `
        .mobile-device .feature__card:hover,
        .mobile-device .product__card:hover,
        .mobile-device .testimonial__card:hover {
            transform: none !important;
        }
    `;
  document.head.appendChild(mobileStyle);
}

/* ===== PERFORMANCE OPTIMIZATIONS ===== */
// Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
window.removeEventListener("scroll", scrollHeader);
window.removeEventListener("scroll", scrollUp);
window.removeEventListener("scroll", scrollActive);
window.removeEventListener("scroll", updateScrollProgress);

window.addEventListener("scroll", throttle(scrollHeader, 16));
window.addEventListener("scroll", throttle(scrollUp, 16));
window.addEventListener("scroll", throttle(scrollActive, 16));
window.addEventListener("scroll", throttle(updateScrollProgress, 16));
