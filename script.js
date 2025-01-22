document.addEventListener('DOMContentLoaded', () => {
    const phone = document.querySelector('.phone');

    const blobs = document.querySelectorAll('.gradient-blob');
    let scrollPos = 0;

    window.addEventListener('scroll', () => {
        const currentScrollPos = window.pageYOffset;
        const scrollDirection = currentScrollPos > scrollPos ? 1 : -1;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.05;
            const yOffset = currentScrollPos * speed * scrollDirection;
            blob.style.transform = `translateY(${yOffset}px)`;
        });

        scrollPos = currentScrollPos;
    });

    const curvedLine = document.querySelector('.curved-line path');
    const lightEffect = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    lightEffect.setAttribute('r', '4');
    lightEffect.setAttribute('fill', 'white');
    lightEffect.style.filter = 'blur(3px)';
    curvedLine.parentNode.appendChild(lightEffect);

    function animateLightAlongPath() {
        const pathLength = curvedLine.getTotalLength();
        let distance = pathLength;

        function moveLightEffect() {
            distance = (distance - 2) % pathLength;
            if (distance < 0) distance = pathLength;

            const point = curvedLine.getPointAtLength(distance);
            lightEffect.setAttribute('cx', point.x);
            lightEffect.setAttribute('cy', point.y);

            requestAnimationFrame(moveLightEffect);
        }

        moveLightEffect();
    }

    animateLightAlongPath();

    // 3D effect for phone
    let isMouseDown = false;
    let startX, startY;

    phone.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX - phone.offsetLeft;
        startY = e.pageY - phone.offsetTop;
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;

        const x = e.pageX - phone.offsetLeft;
        const y = e.pageY - phone.offsetTop;

        const rotateY = (x - startX) / 10;
        const rotateX = (startY - y) / 10;

        phone.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });

    // 3D effect for feature cards
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Add this to your existing JavaScript file
    document.addEventListener('DOMContentLoaded', () => {
        const profilenestCards = document.querySelectorAll('.profilenest-card');

        profilenestCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    });

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateOnScroll() {
        const steps = document.querySelectorAll('.step');
        const arrows = document.querySelectorAll('.arrow');

        steps.forEach((step, index) => {
            if (isElementInViewport(step)) {
                setTimeout(() => {
                    step.classList.add('animate');
                    if (arrows[index]) {
                        arrows[index].classList.add('animate');
                    }
                }, index * 200);
            }
        });
    }

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
});

document.addEventListener('DOMContentLoaded', () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let intervalId;

    function flipCard(index) {
        testimonialCards[index].classList.add('flip');
        setTimeout(() => {
            testimonialCards[index].classList.remove('flip');
        }, 4000); // Flip back after 4 seconds
    }

    function showNextTestimonial() {
        testimonialCards[currentIndex].classList.remove('flip');
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        flipCard(currentIndex);
    }

    function startAutoPlay() {
        intervalId = setInterval(showNextTestimonial, 5000); // Change testimonial every 5 seconds
    }

    // Initial flip
    flipCard(currentIndex);

    // Start auto-play
    startAutoPlay();
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');
    const contactInfoItems = document.querySelectorAll('.contact-info p');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        console.log('Form submitted:', { name, email, message });

        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    });

    function animateElements() {
        formGroups.forEach((group, index) => {
            setTimeout(() => {
                group.classList.add('animate');
            }, index * 200);
        });

        contactInfoItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
            }, (formGroups.length + index) * 200);
        });
    }

    // Intersection Observer to trigger animations when the section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElements();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(document.querySelector('.get-in-touch'));
});

// Get the current year for the copyright
document.getElementById('current-year').textContent = new Date().getFullYear();
