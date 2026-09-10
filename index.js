document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide CDN icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Dynamic Year in Footer
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile Hamburger Toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link, .btn-nav-resume");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const icon = navToggle.querySelector("i");
      if (icon) {
        const isOpen = navMenu.classList.contains("open");
        icon.setAttribute("data-lucide", isOpen ? "x" : "menu");
        window.lucide.createIcons();
      }
    });

    // Close menu when a navigation item is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        const icon = navToggle.querySelector("i");
        if (icon) {
          icon.setAttribute("data-lucide", "menu");
          window.lucide.createIcons();
        }
      });
    });
  }

  // Testimonials Carousel
  const slides = document.querySelectorAll(".carousel-item");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentSlide = 0;
  let carouselInterval;

  function updateSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    indicators.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    updateSlide(next);
  }

  function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide(prev);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetTimer();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetTimer();
    });
  }

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const slideIndex = parseInt(indicator.getAttribute("data-slide"), 10);
      updateSlide(slideIndex);
      resetTimer();
    });
  });

  function startTimer() {
    carouselInterval = setInterval(nextSlide, 6000);
  }

  function resetTimer() {
    clearInterval(carouselInterval);
    startTimer();
  }

  startTimer();
});
