document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dynamic Text Animation ---
    const dynamicText = document.getElementById('dynamic-text');
    const words = ["まち", "ひと", "企業", "想い", "活動"];
    let wordIndex = 0;
    
    // Simple fade transition logic could be complex, sticking to simple replacement for robustness
    setInterval(() => {
        // Fade out
        dynamicText.style.opacity = '0';
        dynamicText.style.transition = 'opacity 0.5s';
        
        setTimeout(() => {
            wordIndex = (wordIndex + 1) % words.length;
            dynamicText.textContent = words[wordIndex];
            // Fade in
            dynamicText.style.opacity = '1';
        }, 500);
    }, 3000); // Change every 3 seconds

    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-menu a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // --- Intersection Observer for Fade-in ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-q');
        question.addEventListener('click', () => {
            // Close others (optional, maybe user wants multi-open)
            // Let's keep others open for ease of reading, just toggle current
            const answer = item.querySelector('.faq-a');
            const isOpen = answer.classList.contains('open');
            
            if (isOpen) {
                answer.classList.remove('open');
                item.classList.remove('active');
            } else {
                answer.classList.add('open');
                item.classList.add('active');
            }
        });
    });

    // --- Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const fullSrc = item.getAttribute('data-full');
            if (fullSrc) {
                lightboxImg.src = fullSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        setTimeout(() => {
            lightboxImg.src = ''; // Clear src
        }, 300);
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // --- Scroll Top Button ---
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
