  
  document.addEventListener('DOMContentLoaded', function() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const imageItems = document.querySelectorAll('.image-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    // Filter images
                    imageItems.forEach(item => {
                        if (filterValue === 'all') {
                            item.style.display = 'block';
                        } else {
                            if (item.getAttribute('data-category') === filterValue) {
                                item.style.display = 'block';
                            } else {
                                item.style.display = 'none';
                            }
                        }
                    });
                });
            });

            // Add animation when images come into view
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Apply initial styles for animation
            imageItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(item);
            });
        });


        // Back to Top functionality
        document.addEventListener('DOMContentLoaded', function() {
            const backToTopButton = document.getElementById('backToTop');
            
            // Show/hide back to top button based on scroll position
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('show');
                } else {
                    backToTopButton.classList.remove('show');
                }
            });
            
            // Scroll to top when button is clicked
            backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });


        /* Welcome pop-up functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create welcome pop-up
    const welcomePopup = document.createElement('div');
    welcomePopup.className = 'welcome-popup';
    
    const welcomeContent = document.createElement('div');
    welcomeContent.className = 'welcome-content';
    
    welcomeContent.innerHTML = `
        <h1>Welcome 2 Danema_Shortlet</h1>
        <h2>Your Luxury Getaway Awaits</h2>
    `;
    
    welcomePopup.appendChild(welcomeContent);
    
    // Add sparkle effects
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        welcomePopup.appendChild(sparkle);
    }
    
    document.body.appendChild(welcomePopup);
    
    // Remove pop-up after 3 seconds with fade-out effect
    setTimeout(() => {
        welcomePopup.classList.add('fade-out');
        
        // Remove from DOM after fade-out completes
        setTimeout(() => {
            if (welcomePopup.parentNode) {
                welcomePopup.parentNode.removeChild(welcomePopup);
            }
        }, 1000);
    }, 3000);
});*/



// Cookie Management
class CookieManager {
    constructor() {
        this.cookieConsent = document.getElementById('cookieConsent');
        this.cookieModal = null;
        this.cookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        
        this.init();
    }
    
    init() {
        // Check if user has already made a choice
        const cookieChoice = this.getCookie('cookie_consent');
        
        if (!cookieChoice) {
            // Show consent banner after 1 second delay
            setTimeout(() => {
                this.showConsentBanner();
            }, 1000);
        } else {
            // Apply saved preferences
            this.applyPreferences(JSON.parse(cookieChoice));
        }
        
        this.setupEventListeners();
    }
    
    showConsentBanner() {
        this.cookieConsent.style.display = 'block';
    }
    
    hideConsentBanner() {
        this.cookieConsent.style.display = 'none';
    }
    
    setupEventListeners() {
        // Accept All button
        document.getElementById('acceptCookies')?.addEventListener('click', () => {
            this.acceptAllCookies();
        });
        
        // Reject button
        document.getElementById('rejectCookies')?.addEventListener('click', () => {
            this.rejectAllCookies();
        });
        
        // Learn More button
        document.getElementById('learnMore')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showCookiePreferences();
        });
    }
    
    acceptAllCookies() {
        const preferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            accepted: true
        };
        
        this.setCookie('cookie_consent', JSON.stringify(preferences), 365);
        this.applyPreferences(preferences);
        this.hideConsentBanner();
        this.showThankYouMessage('Thank you for accepting our cookies!');
    }
    
    rejectAllCookies() {
        const preferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            accepted: false
        };
        
        this.setCookie('cookie_consent', JSON.stringify(preferences), 365);
        this.applyPreferences(preferences);
        this.hideConsentBanner();
        this.showThankYouMessage('Cookie preferences saved.');
    }
    
    applyPreferences(preferences) {
        this.cookiePreferences = preferences;
        
        // Apply analytics preferences
        if (preferences.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }
        
        // Apply marketing preferences
        if (preferences.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }
        
        // Necessary cookies are always enabled
        this.enableNecessary();
    }
    
    showCookiePreferences() {
        // Create modal if it doesn't exist
        if (!this.cookieModal) {
            this.createCookieModal();
        }
        
        this.cookieModal.style.display = 'flex';
    }
    
    createCookieModal() {
        // Create modal element
        this.cookieModal = document.createElement('div');
        this.cookieModal.className = 'cookie-modal';
        this.cookieModal.id = 'cookieModal';
        
        this.cookieModal.innerHTML = `
            <div class="cookie-modal-content">
                <h3>Cookie Preferences</h3>
                
                <div class="cookie-option">
                    <h4>Necessary Cookies</h4>
                    <p>These cookies are essential for the website to function properly. They cannot be disabled.</p>
                    <div class="cookie-toggle">
                        <span>Enabled</span>
                        <label class="toggle-switch">
                            <input type="checkbox" id="necessaryCookies" checked disabled>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
                
                <div class="cookie-option">
                    <h4>Analytics Cookies</h4>
                    <p>These cookies help us understand how visitors interact with our website.</p>
                    <div class="cookie-toggle">
                        <span>Enable Analytics</span>
                        <label class="toggle-switch">
                            <input type="checkbox" id="analyticsCookies" ${this.cookiePreferences.analytics ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
                
                <div class="cookie-option">
                    <h4>Marketing Cookies</h4>
                    <p>These cookies are used to deliver relevant advertisements and track campaigns.</p>
                    <div class="cookie-toggle">
                        <span>Enable Marketing</span>
                        <label class="toggle-switch">
                            <input type="checkbox" id="marketingCookies" ${this.cookiePreferences.marketing ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
                
                <div class="modal-buttons">
                    <button class="modal-btn cancel" id="closeModal">Cancel</button>
                    <button class="modal-btn save" id="savePreferences">Save Preferences</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.cookieModal);
        
        // Add modal event listeners
        document.getElementById('closeModal')?.addEventListener('click', () => {
            this.cookieModal.style.display = 'none';
        });
        
        document.getElementById('savePreferences')?.addEventListener('click', () => {
            this.saveCookiePreferences();
        });
        
        // Close modal when clicking outside
        this.cookieModal.addEventListener('click', (e) => {
            if (e.target === this.cookieModal) {
                this.cookieModal.style.display = 'none';
            }
        });
    }
    
    saveCookiePreferences() {
        const preferences = {
            necessary: true,
            analytics: document.getElementById('analyticsCookies').checked,
            marketing: document.getElementById('marketingCookies').checked,
            accepted: true
        };
        
        this.setCookie('cookie_consent', JSON.stringify(preferences), 365);
        this.applyPreferences(preferences);
        this.cookieModal.style.display = 'none';
        this.hideConsentBanner();
        this.showThankYouMessage('Cookie preferences updated!');
    }
    
    enableAnalytics() {
        // Here you would initialize Google Analytics or other analytics tools
        console.log('Analytics cookies enabled');
        // Example: window.dataLayer = window.dataLayer || [];
        // Example: function gtag(){dataLayer.push(arguments);}
    }
    
    disableAnalytics() {
        // Here you would disable analytics tracking
        console.log('Analytics cookies disabled');
    }
    
    enableMarketing() {
        // Here you would initialize marketing pixels
        console.log('Marketing cookies enabled');
    }
    
    disableMarketing() {
        // Here you would disable marketing tracking
        console.log('Marketing cookies disabled');
    }
    
    enableNecessary() {
        // Necessary functionality that always runs
        console.log('Necessary cookies enabled');
    }
    
    setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    }
    
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999; path=/';
    }
    
    showThankYouMessage(message) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = 'cookie-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
            </div>
        `;
        
        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 10001;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
        
        // Add animation keyframes
        if (!document.getElementById('cookie-animations')) {
            const style = document.createElement('style');
            style.id = 'cookie-animations';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Additional utility function to track page views (if analytics enabled)
    trackPageView(page) {
        if (this.cookiePreferences.analytics) {
            // Example analytics tracking
            console.log(`Page viewed: ${page}`);
            // You would add your analytics code here
        }
    }
}

// Initialize cookie manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cookieManager = new CookieManager();
    
    // Make cookie manager available globally if needed
    window.cookieManager = cookieManager;
});



// Unit Details Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('unitModal');
    const closeModal = document.querySelector('.close-modal');
    const closeDetailsBtns = document.querySelectorAll('.close-details-btn');
    const exploreBtns = document.querySelectorAll('.explore-btn');
    
    // Open modal when Explore Unit button is clicked
    exploreBtns.forEach(button => {
        button.addEventListener('click', function() {
            const roomType = this.getAttribute('data-room');
            openRoomDetails(roomType);
        });
    });
    
    // Function to open specific room details
    function openRoomDetails(roomType) {
        // Hide all room details
        document.querySelectorAll('.room-details').forEach(details => {
            details.classList.remove('active');
        });
        
        // Show selected room details
        const roomDetails = document.getElementById(`${roomType}-details`);
        if (roomDetails) {
            roomDetails.classList.add('active');
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        closeModalFunc();
    });
    
    // Close modal when close button is clicked
    closeDetailsBtns.forEach(button => {
        button.addEventListener('click', function() {
            closeModalFunc();
        });
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Function to close modal
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunc();
        }
    });
    
    // Thumbnail image click functionality
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const mainImage = this.closest('.room-gallery').querySelector('.main-image img');
            const tempSrc = mainImage.src;
            mainImage.src = this.src;
            this.src = tempSrc;
        });
    });
});




// Package Selection Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Package selection buttons
    const packageButtons = document.querySelectorAll('.package-select-btn');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            selectPackage(packageType);
        });
    });
    
    function selectPackage(packageType) {
        let packageName, packagePrice;
        
        switch(packageType) {
            case 'solar':
                packageName = 'Solar Power Package';
                packagePrice = '+₦15,000/night';
                break;
            case 'generator':
                packageName = 'Generator Power Package';
                packagePrice = '+₦30,000/night';
                break;
            case 'hybrid':
                packageName = 'Hybrid Power Package';
                packagePrice = '+₦22,000/night';
                break;
        }
        
        // Show confirmation message
        const confirmation = confirm(`You've selected: ${packageName}\nAdditional Cost: ${packagePrice}\n\nThis selection will be noted when you contact us for booking.`);
        
        if (confirmation) {
            // Scroll to contact section
            document.querySelector('#conta').scrollIntoView({
                behavior: 'smooth'
            });
            
            // You could also store this selection in localStorage
            localStorage.setItem('selectedPackage', packageType);
            
            // Show a success message
            alert(`Package selected! When you contact us via WhatsApp, please mention that you'd like the "${packageName}".`);
        }
    }
    
    // Highlight selected package in localStorage
    const savedPackage = localStorage.getItem('selectedPackage');
    if (savedPackage) {
        const savedButton = document.querySelector(`[data-package="${savedPackage}"]`);
        if (savedButton) {
            savedButton.innerHTML = '✓ Selected';
            savedButton.style.backgroundColor = '#2ecc71';
        }
    }
});




 // Unit Survey Modal (without alert)
        document.querySelectorAll('.explore-btn').forEach(button => {
            button.addEventListener('click', function() {
                const roomType = this.getAttribute('data-room');
                // You can add modal functionality here without alert
                console.log(`Surveying ${roomType} unit`);
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add hover effects for touch devices
        if ('ontouchstart' in window) {
            document.querySelectorAll('.room-card, .activity-card').forEach(card => {
                card.style.cursor = 'pointer';
            });
        }


        // FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Close other FAQ items (optional - remove if you want multiple open)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
});





// Handle Family Suite
if (roomType === 'family') {
    document.getElementById('family-details').style.display = 'block';
}
// Handle Penthouse Suite
if (roomType === 'penthouse') {
    document.getElementById('penthouse-details').style.display = 'block';
}