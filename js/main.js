document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon from hamburger to close (optional visual feedback)
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileBtn.querySelector('i').classList.remove('fa-times');
                    mobileBtn.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
});

function navigateTo(app) {
    const isLocal = window.location.protocol === 'file:';
    let path = '';

    if (app === 'patient') {
        path = isLocal ? 'patient-app/dist/patient-portal/browser/index.html' : 'patient-app/index.html';
    } else if (app === 'emr') {
        path = isLocal ? 'go-emr/dist/index.html' : 'go-emr/index.html';
    }

    if (path) {
        // Calculate depth more reliably
        // On server: /about.html -> depth 0
        // On local: D:/DevoCare/about.html -> depth 0 (relative to project root)

        let depth = 0;
        const pathname = window.location.pathname;

        // If we are on about.html, abha.html, etc., depth is 0 relative to root
        // If we were in a subfolder like 'features/security.html', depth would be 1

        // Check if we are in the 'features' subfolder
        if (pathname.includes('/features/')) {
            depth = 1;
        }

        const prefix = depth > 0 ? '../'.repeat(depth) : '';
        const finalUrl = prefix + path;

        console.log('Navigating to:', finalUrl);
        window.location.href = finalUrl;
    }
}
