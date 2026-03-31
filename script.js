document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            navLinks.classList.toggle('active');
            hamburger.textContent = isActive ? '\u2630' : '\u2715';
            hamburger.setAttribute('aria-expanded', String(!isActive));
        });
    }

    // Scroll Animation (Fade-up)
    const faders = document.querySelectorAll('.fade-up');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('appear');

            // Animate progress bars if present
            const progressFills = entry.target.querySelectorAll('.progress-fill');
            progressFills.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });

            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Mouse glow effect for cards
    const hoverCards = document.querySelectorAll('.card');
    hoverCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'flex';
                        item.classList.remove('appear');
                        void item.offsetWidth;
                        item.classList.add('appear');
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Form Validation (Contact Page)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const service = document.getElementById('service');
            const message = document.getElementById('message');

            document.querySelectorAll('.error-msg').forEach(msg => {
                msg.style.display = 'none';
            });

            if (name && name.value.trim() === '') {
                name.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email.value)) {
                email.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            if (service && service.value === '') {
                service.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            if (message && message.value.trim() === '') {
                message.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Sending...';

                setTimeout(() => {
                    alert('Message sent successfully! We will get back to you soon.');
                    contactForm.reset();
                    btn.textContent = originalText;
                }, 1000);
            }
        });
    }
});
