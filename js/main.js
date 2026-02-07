// Accessibility Features
(function () {
    // Load saved preferences
    function loadPreferences() {
        const textSize = localStorage.getItem('devocare-text-size') || '1';
        const nightVision = localStorage.getItem('devocare-night-vision') === 'true';
        const language = localStorage.getItem('devocare-language') || 'en';

        // Apply text size
        document.documentElement.style.setProperty('--text-size-multiplier', textSize);
        document.querySelectorAll('.text-size-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.size === textSize);
        });

        // Apply night vision
        if (nightVision) {
            document.body.classList.add('night-vision');
            updateVisionToggle(true);
        }

        // Apply language
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.value = language;
        }
    }

    // Text Size Control
    function initTextSizeControl() {
        const textSizeBtns = document.querySelectorAll('.text-size-btn');

        textSizeBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const size = this.dataset.size;

                // Update active state
                textSizeBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Apply size
                document.documentElement.style.setProperty('--text-size-multiplier', size);

                // Save preference
                localStorage.setItem('devocare-text-size', size);
            });
        });
    }

    // Night Vision Toggle
    function updateVisionToggle(isNightMode) {
        const visionToggle = document.getElementById('visionToggle');
        if (!visionToggle) return;

        const icon = visionToggle.querySelector('i');
        const text = visionToggle.querySelector('span');

        if (isNightMode) {
            // When night mode is active, show moon icon and "Night Vision" text
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            text.textContent = 'Night Vision';
        } else {
            // When day mode is active (default), show sun icon and "Day Vision" text
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            text.textContent = 'Day Vision';
        }
    }

    function initNightVision() {
        const visionToggle = document.getElementById('visionToggle');
        if (!visionToggle) return;

        visionToggle.addEventListener('click', function () {
            const isNightMode = document.body.classList.toggle('night-vision');
            updateVisionToggle(isNightMode);

            // Save preference
            localStorage.setItem('devocare-night-vision', isNightMode);
        });
    }

    // Language Selector
    function initLanguageSelector() {
        const languageSelector = document.getElementById('languageSelector');

        languageSelector.addEventListener('change', function () {
            const selectedLanguage = this.value;

            // Save preference
            localStorage.setItem('devocare-language', selectedLanguage);

            // In a real implementation, this would trigger translation
            console.log('Language changed to:', selectedLanguage);

            // For now, just show a notification (optional)
            // You can implement actual translation in the future
        });
    }

    // Initialize all accessibility features when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            loadPreferences();
            initTextSizeControl();
            initNightVision();
            initLanguageSelector();
        });
    } else {
        loadPreferences();
        initTextSizeControl();
        initNightVision();
        initLanguageSelector();
    }
})();

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
