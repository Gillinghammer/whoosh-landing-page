document.addEventListener('DOMContentLoaded', function() {
    // Badge visibility control
    handleBadgeVisibility();
});

function handleBadgeVisibility() {
    // Check if page is in an iframe
    const inIframe = window !== window.parent;
    if (inIframe) {
        document.body.classList.add('in-iframe');
    }
    
    // Check if rendered by puppeteer (for screenshots)
    const isPuppeteer = /HeadlessChrome/.test(navigator.userAgent);
    if (isPuppeteer) {
        document.body.classList.add('puppeteer');
    }
    
    // Close button for badge
    const closeButton = document.querySelector('.lovable-badge .close-button');
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const badge = document.querySelector('.lovable-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        });
    }
}
