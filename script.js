// script.js - Portfolio Interactivity

// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen fade out
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.style.opacity = '0';
        loading.style.visibility = 'hidden';
    }, 2000);

    // Typing animation
    typeWriter();

    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link, .btn[href^=\"#"]').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Navbar active highlight
    updateActiveNav();

    // Scroll reveal
    initReveal();

    // Scroll to top
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 1000) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Typing effect
function typeWriter() {
    const text = 'Digital Marketing Associate | Content Creator | Gen AI Enthusiast';
    const typedText = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    let i = 0;

    function type() {
        if (i < text.length) {
            typedText.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            cursor.style.display = 'none';
        }
    }
    setTimeout(type, 500);
}

// Smooth scroll function
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Navbar height
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        updateActiveNav(targetId);
    }
}

// Update active nav link
function updateActiveNav(target = null) {
    const sections = ['#hero', '#about', '#skills', '#projects', '#education', '#contact'];
    const navLinks = document.querySelectorAll('.nav-link');

    if (target) {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`a[href="${target}"]`).classList.add('active');
        return;
    }

    // Scroll-based active
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const el = document.querySelector(section);
        if (el.offsetTop <= scrollPosition && (el.offsetTop + el.offsetHeight > scrollPosition)) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === section) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Intersection Observer for reveal animations
function initReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// Navbar scroll listener for active state
window.addEventListener('scroll', updateActiveNav);

// Handle resize for mobile nav if needed
window.addEventListener('resize', updateActiveNav);

