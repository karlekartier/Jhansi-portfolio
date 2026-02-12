/**
 * Polishetty Jhansi Portfolio Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scrolling & Active Link Highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80; // height of sticky navbar
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = target.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.getElementById('navMenu');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // 4. Scroll Spy functionality
    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            if (!contactForm.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                e.preventDefault();
                // Placeholder for form submission logic
                alert('Thank you! Your message has been sent (placeholder).');
                contactForm.reset();
                contactForm.classList.remove('was-validated');
            }
            contactForm.classList.add('was-validated');
        }, false);
    }

    // 6. Portfolio Modal Data Injection
    // This allows reusing the same modal for different projects
    const portfolioModal = document.getElementById('portfolioModal');
    if (portfolioModal) {
        portfolioModal.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget;
            const title = button.getAttribute('data-bs-title');
            const description = button.getAttribute('data-bs-description');
            const tech = button.getAttribute('data-bs-tech');
            const img = button.getAttribute('data-bs-img');

            const modalTitle = portfolioModal.querySelector('.modal-title');
            const modalBodyText = portfolioModal.querySelector('#modalDescription');
            const modalTech = portfolioModal.querySelector('#modalTech');
            const modalImg = portfolioModal.querySelector('#modalImg');

            modalTitle.textContent = title;
            modalBodyText.textContent = description;
            modalTech.textContent = tech;
            modalImg.src = img;
        });
    }
});
