/**
 * QUANTUM MINIMALIST - Interactive Scripting File
 * Focuses on clean vanilla JS code structures that are easy to edit.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. THEME SWITCHER LOGIC ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    // Load theme from localStorage or default to system dark mode preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        bodyElement.classList.remove('dark-theme');
        bodyElement.classList.add('light-theme');
    } else {
        bodyElement.classList.add('dark-theme');
        bodyElement.classList.remove('light-theme');
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        if (bodyElement.classList.contains('dark-theme')) {
            bodyElement.classList.remove('dark-theme');
            bodyElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            bodyElement.classList.remove('light-theme');
            bodyElement.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
        
        // Brief button click micro-animation
        themeToggleBtn.style.transform = 'scale(0.9) rotate(15deg)';
        setTimeout(() => {
            themeToggleBtn.style.transform = '';
        }, 150);
    });

    // --- 2. MOBILE MENU DRAWER ---
    const hamburgerBtn = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.querySelector('.navbar');

    hamburgerBtn.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('mobile-open');
        navbar.classList.toggle('mobile-menu-active');
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-open');
            navbar.classList.remove('mobile-menu-active');
            hamburgerBtn.setAttribute('aria-expanded', false);
        });
    });

    // --- 3. ACTIVE NAVIGATION LINK ON SCROLL ---
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Triggers when the section takes up the middle of viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${targetId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // --- 4. CONTACT FORM SIMULATION ---
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = contactForm.querySelector('.btn-submit');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent standard page reload

        // Visual feedback to user (Loading state)
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending Message...';

        // Gather form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Simulate network API submission
        setTimeout(() => {
            // Success state handling
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;

            // Reset form input values
            contactForm.reset();

            // Display success alert inside the feedback element
            formFeedback.classList.remove('hidden', 'error');
            formFeedback.classList.add('success');
            formFeedback.innerHTML = `✨ Thank you, ${formData.name}! Your message has been sent successfully.`;

            // Auto-hide feedback element after 5 seconds
            setTimeout(() => {
                formFeedback.classList.add('hidden');
            }, 5000);

        }, 1500); // 1.5 seconds mock latency
    });

    // --- 5. CURRENT YEAR FOOTER UPDATE ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});