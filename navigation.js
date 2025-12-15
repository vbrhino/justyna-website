// Mobile navigation scroll behavior
let lastScrollPosition = 0;
let scrollThreshold = 50; // Minimum scroll before triggering collapse
let scrollUpThreshold = 10; // Minimum scroll up before expanding nav
let isNavCollapsed = false;

function initScrollNavigation() {
    const header = document.querySelector('header');
    if (!header) return;

    // Check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Handle scroll events
    function handleScroll() {
        // Only apply on mobile
        if (!isMobile()) {
            header.classList.remove('collapsed');
            isNavCollapsed = false;
            return;
        }

        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // At the top of the page - expand
        if (currentScrollPosition < scrollThreshold) {
            header.classList.remove('collapsed');
            isNavCollapsed = false;
        }
        // Scrolling down - collapse
        else if (currentScrollPosition > lastScrollPosition && !isNavCollapsed) {
            header.classList.add('collapsed');
            isNavCollapsed = true;
        }
        // Scrolling up significantly - expand
        else if (currentScrollPosition < lastScrollPosition - scrollUpThreshold && isNavCollapsed) {
            header.classList.remove('collapsed');
            isNavCollapsed = false;
        }

        lastScrollPosition = currentScrollPosition;
    }

    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 16); // ~60fps
    }, { passive: true });

    // Handle resize to reset on desktop
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            if (!isMobile()) {
                header.classList.remove('collapsed');
                isNavCollapsed = false;
            }
        }, 100);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initScrollNavigation);
