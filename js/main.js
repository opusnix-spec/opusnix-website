document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Navbar & Active Menu Link ---
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Nav background blur
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active state highlighting for index/home based layouts
    // If we're on a multi-page site, this might just highlight based on active url
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href').includes(current) && current !== null) {
        a.classList.add('active');
      }
    });
  });

  // Set active link simply based on file name if on subpages
  const currentPath = window.location.pathname.split('/').pop();
  if (currentPath) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  }


  // --- Mobile Hamburger Menu ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }


  // --- Scroll Reveal Animations (AOS Alternative) ---
  const reveals = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Only reveal once
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });


  // Contact form submission logic removed, using native FormSubmit natively now.


  // --- News Carousel Logic ---
  const newsSlides = document.getElementById('newsSlides');
  const nextBtn = document.getElementById('nextSlide');
  const prevBtn = document.getElementById('prevSlide');

  if (newsSlides && nextBtn && prevBtn) {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.news-slide');
    const totalSlides = slides.length;

    const updateCarousel = () => {
      newsSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });

    // Auto-slide every 8 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }, 8000);
  }
});
