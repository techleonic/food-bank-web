
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    
    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    
    function toggleNavbarBackground() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    // Initialize on page load
    toggleNavbarBackground();
    
    // Listen for scroll events
    window.addEventListener('scroll', toggleNavbarBackground);
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse.classList.contains('show')) {
            document.querySelector('.navbar-toggler').click();
          }
        }
      });
    });
    
    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Normally you would send the form data to a server here
        // For demonstration, we'll just show an alert
        
        // Create a success message element
        const formSuccess = document.createElement('div');
        formSuccess.className = 'alert alert-success mt-3';
        formSuccess.innerHTML = `
          <strong>Thank you!</strong> Your message has been sent. We'll get back to you soon.
        `;
        
        // Replace form with success message
        contactForm.style.transition = 'all 0.5s ease';
        contactForm.style.opacity = '0';
        
        setTimeout(() => {
          contactForm.innerHTML = '';
          contactForm.appendChild(formSuccess);
          contactForm.style.opacity = '1';
        }, 500);
      });
    }
    
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
      });
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const backgroundBean = document.querySelector('.background-bean');
        const backgroundGrain = document.querySelector('.background-grain');
        
        if (backgroundBean && backgroundGrain) {
          backgroundBean.style.transform = `translateY(${scrollPosition * 0.2}px)`;
          backgroundGrain.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
      });
    }
  });
  