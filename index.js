/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
  Scroll Animation Functionality
 ---------------------------------------- */

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      // Add the animation class based on the existing classes
      if (entry.target.classList.contains('animate-fade-in-up')) {
        entry.target.classList.add('animate-fade-in-up');
      }
      if (entry.target.classList.contains('animate-fade-in-left')) {
        entry.target.classList.add('animate-fade-in-left');
      }
      if (entry.target.classList.contains('animate-fade-in-right')) {
        entry.target.classList.add('animate-fade-in-right');
      }
      if (entry.target.classList.contains('animate-scale-in')) {
        entry.target.classList.add('animate-scale-in');
      }
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

/* -----------------------------------------
  Parallax Effect for Header
 ---------------------------------------- */

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const header = document.querySelector('.header');
  
  if (header) {
    const rate = scrolled * -0.5;
    header.style.transform = `translateY(${rate}px)`;
  }
});

/* -----------------------------------------
  Smooth Scroll for Navigation Links
 ---------------------------------------- */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* -----------------------------------------
  Enhanced Hover Effects
 ---------------------------------------- */

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Add typing effect to a header text
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.innerHTML = '';
  
  const timer = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
};