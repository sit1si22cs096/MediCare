document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Testimonial slider auto-scroll
    const testimonialSlider = document.querySelector('.testimonial-slider');
    let scrollAmount = 0;
    let scrollMax;
    let autoScroll;
    
    if (testimonialSlider) {
        scrollMax = testimonialSlider.scrollWidth - testimonialSlider.clientWidth;
        
        const startAutoScroll = () => {
            autoScroll = setInterval(() => {
                testimonialSlider.scrollLeft = scrollAmount;
                scrollAmount += 1;
                if (scrollAmount >= scrollMax) {
                    scrollAmount = 0;
                }
            }, 30);
        };
        
        const stopAutoScroll = () => {
            clearInterval(autoScroll);
        };
        
        // Start auto-scroll after page load
        setTimeout(startAutoScroll, 1500);
        
        // Pause auto-scroll when user interacts with the slider
        testimonialSlider.addEventListener('mouseenter', stopAutoScroll);
        testimonialSlider.addEventListener('touchstart', stopAutoScroll);
        
        // Resume auto-scroll when user stops interacting
        testimonialSlider.addEventListener('mouseleave', startAutoScroll);
        testimonialSlider.addEventListener('touchend', startAutoScroll);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav items based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else if (currentPage === 'index.html' && linkPage === 'index.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
