
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('header nav');
    const navLinks = nav.querySelectorAll('a'); // Get all links in the nav

    if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', () => {
            toggleNav();
        });

        // Add event listeners to nav links to close menu on click (mobile only)
        navLinks.forEach(link => {
             // Add a check if the menu is open, only close if it is
             // Add a check if the link is an internal anchor link
             const href = link.getAttribute('href');
             if (href && href.startsWith('#')) { // Only apply to section links
                  link.addEventListener('click', () => {
                       if (nav.classList.contains('active')) {
                            // Use setTimeout to allow the browser to process the link click/scroll first
                            // before closing the menu, resulting in a smoother experience.
                            // Adjust the delay (e.g., 200ms) if needed.
                            setTimeout(toggleNav, 200);
                        }
                   });
              }
        });
    }

     // Function to handle the nav toggling logic
    function toggleNav() {
        const isExpanded = nav.classList.toggle('active');
        const icon = mobileNavToggle.querySelector('i');

        // Toggle ARIA expanded attribute
        mobileNavToggle.setAttribute('aria-expanded', isExpanded);

        // Toggle icon
        if (isExpanded) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
         // Optional: Add/remove aria-hidden on the nav itself if you strictly want to hide it from screen readers
         // when closed. This isn't always necessary depending on your CSS hide method (display: none vs visibility: hidden/opacity)
    }


    // --- Scroll Animation ---

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is visible
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Select all elements with the 'animate-on-scroll' class
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // Observe each element
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

});
