document.addEventListener('DOMContentLoaded', () => {
    const loaderWrapper = document.getElementById('loader-wrapper');
    const loaderPercentage = document.getElementById('loader-percentage');
    let progress = 0;

    const updateLoader = () => {
        progress += 1;
        loaderPercentage.textContent = `${progress}%`;
        if (progress < 100) {
            setTimeout(updateLoader, 8);
        } else {
            setTimeout(() => {
                loaderWrapper.style.display = 'none';
            }, 500);
        }
    };
    updateLoader();

    const smoothScroll = (target, duration) => {
        const targetElement = document.querySelector(target);
        if (!targetElement) return; // Exit if target element doesn't exist
        const targetPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        requestAnimationFrame(animation);
    };

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            if (target.startsWith('#')) {
                e.preventDefault();
                smoothScroll(target, 1000);
            }
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});
