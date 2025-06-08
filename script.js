// Enhanced Delightful Bean Largo Website JavaScript
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuration specific to Largo site
    const config = {
        animationDuration: 300,
        scrollOffset: 80,
        observerThreshold: 0.1,
        mobileBreakpoint: 768,
        largoCoordinates: { lat: 27.9094, lng: -82.7873 }
    };

    // Utility Functions
    const utils = {
        // Debounce function for performance
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Check if element is in viewport
        isInViewport: function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        // Animate counter with Largo-specific styling
        animateCounter: function(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const current = Math.floor(progress * (end - start) + start);
                element.innerText = current + (end > 99 ? '+' : '');
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        },

        // Distance calculation for service areas
        calculateDistance: function(lat1, lng1, lat2, lng2) {
            const R = 3959; // Earth's radius in miles
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLng = (lng2 - lng1) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
            return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        }
    };

    // Initialize all components
    function initializeComponents() {
        initLazyLoading();
        initMobileMenu();
        initSmoothScroll();
        initHeaderScroll();
        initFAQ();
        initRevealAnimations();
        initCounters();
        initLocalFeatures();
        initFormValidation();
        initAnalytics();
        initAccessibility();
        initPerformanceOptimizations();
    }

    // Enhanced Lazy Loading
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('.lazy-image, [data-lazy]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Load the image
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        
                        // Add loaded class with slight delay for smooth transition
                        setTimeout(() => {
                            img.classList.add('loaded');
                        }, 50);
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: config.observerThreshold
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                img.classList.add('loaded');
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    }

    // Enhanced Mobile Menu with Largo styling
    function initMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function() {
                const isOpen = mobileMenu.classList.contains('active');
                
                if (isOpen) {
                    mobileMenu.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                } else {
                    mobileMenu.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                    document.body.style.overflow = 'hidden';
                }
                
                // Animate icon
                const icon = this.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
                
                // Track mobile menu usage
                trackEvent('Navigation', 'mobile_menu_toggle', isOpen ? 'close' : 'open');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                    
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });

            // Close menu on window resize
            window.addEventListener('resize', utils.debounce(function() {
                if (window.innerWidth > config.mobileBreakpoint) {
                    mobileMenu.classList.remove('active');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }, 250));
        }
    }

    // Enhanced Smooth Scroll with Largo-specific sections
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - config.scrollOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without scrolling
                    history.pushState(null, null, href);
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        document.getElementById('mobile-menu-toggle').click();
                    }
                    
                    // Set focus for accessibility
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                    
                    // Track section navigation
                    trackEvent('Navigation', 'section_click', href);
                }
            });
        });
    }

    // Enhanced Header Scroll with Largo branding
    function initHeaderScroll() {
        const header = document.querySelector('header');
        let lastScroll = 0;
        
        window.addEventListener('scroll', utils.debounce(function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll (keep visible for Largo branding)
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        }, 10));
    }

    // Enhanced FAQ with Largo-specific content
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.fa-chevron-down');
            
            if (question && answer) {
                question.addEventListener('click', function() {
                    const isOpen = !answer.classList.contains('hidden');
                    
                    // Close all other FAQs
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            const otherIcon = otherItem.querySelector('.fa-chevron-down');
                            
                            otherAnswer.classList.add('hidden');
                            if (otherIcon) {
                                otherIcon.style.transform = 'rotate(0deg)';
                            }
                        }
                    });
                    
                    // Toggle current FAQ
                    if (isOpen) {
                        answer.classList.add('hidden');
                        icon.style.transform = 'rotate(0deg)';
                        question.setAttribute('aria-expanded', 'false');
                    } else {
                        answer.classList.remove('hidden');
                        icon.style.transform = 'rotate(180deg)';
                        question.setAttribute('aria-expanded', 'true');
                        
                        // Track FAQ interaction
                        trackEvent('FAQ', 'question_opened', question.textContent.trim());
                        
                        // Smooth scroll to FAQ if needed
                        setTimeout(() => {
                            if (!utils.isInViewport(answer)) {
                                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                        }, 300);
                    }
                });
            }
        });
    }

    // Enhanced Reveal Animations
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        
                        // Add special effects for service area cards
                        if (entry.target.classList.contains('area-card')) {
                            setTimeout(() => {
                                entry.target.style.transform = 'scale(1.02)';
                                setTimeout(() => {
                                    entry.target.style.transform = '';
                                }, 200);
                            }, 300);
                        }
                        
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: config.observerThreshold,
                rootMargin: '0px 0px -100px 0px'
            });
            
            reveals.forEach(el => revealObserver.observe(el));
        } else {
            // Fallback: reveal all elements
            reveals.forEach(el => el.classList.add('active'));
        }
    }

    // Animated Counters for Largo statistics
    function initCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        
        if (counters.length > 0) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.getAttribute('data-counter'));
                        const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
                        
                        utils.animateCounter(counter, 0, target, duration);
                        counterObserver.unobserve(counter);
                    }
                });
            }, {
                threshold: 0.5
            });
            
            counters.forEach(counter => counterObserver.observe(counter));
        }
    }


    // Local Features specific to Largo
    function initLocalFeatures() {
        // Largo-specific trust indicators
        const trustIndicators = document.querySelectorAll('.trust-indicator');
        trustIndicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                trackEvent('Trust Indicators', 'click', this.textContent.trim());
            });
        });

        // Local business hours and contact info
        const contactElements = document.querySelectorAll('[href^="tel:"], [href^="mailto:"]');
        contactElements.forEach(element => {
            element.addEventListener('click', function() {
                const type = this.href.startsWith('tel:') ? 'phone' : 'email';
                trackEvent('Contact', type + '_click', 'Largo page');
            });
        });

        // Service area distance calculator (if geolocation available)
        if ('geolocation' in navigator) {
            const calculateServiceDistance = () => {
                navigator.geolocation.getCurrentPosition((position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    const distance = utils.calculateDistance(
                        userLat, userLng,
                        config.largoCoordinates.lat, config.largoCoordinates.lng
                    );
                    
                    if (distance <= 30) { // Within 30 miles
                        const serviceNote = document.createElement('div');
                        serviceNote.className = 'service-distance-note';
                        serviceNote.innerHTML = `
                            <div class="bg-green-100 text-green-800 p-3 rounded-lg text-center">
                                <i class="fas fa-map-marker-alt mr-2"></i>
                                Great news! You're only ${Math.round(distance)} miles from our Largo base.
                            </div>
                        `;
                        
                        const heroSection = document.querySelector('.hero-section .container');
                        if (heroSection) {
                            heroSection.appendChild(serviceNote);
                        }
                    }
                }, () => {
                    // Geolocation failed, no action needed
                });
            };
            
            // Only calculate distance if user interacts with service areas
            document.querySelector('#areas')?.addEventListener('click', calculateServiceDistance, { once: true });
        }
    }

    // Form Validation enhanced for Largo quotes
    function initFormValidation() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const inputs = form.querySelectorAll('input[required], textarea[required]');
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                        
                        // Remove error class on input
                        input.addEventListener('input', function() {
                            this.classList.remove('error');
                        }, { once: true });
                    }
                });
                
                if (isValid) {
                    // Track successful form submission
                    trackEvent('Form', 'submit_success', 'Largo quote form');
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <div class="bg-green-100 text-green-800 p-4 rounded-lg">
                            <i class="fas fa-check-circle mr-2"></i>
                            Thank you! We'll contact you soon about your Largo event.
                        </div>
                    `;
                    
                    form.appendChild(successMessage);
                    setTimeout(() => successMessage.remove(), 5000);
                }
            });
        });
    }

    // Enhanced Analytics for Largo site
    function initAnalytics() {
        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', utils.debounce(function() {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                // Track milestones
                [25, 50, 75, 100].forEach(milestone => {
                    if (maxScroll >= milestone && maxScroll < milestone + 5) {
                        trackEvent('Scroll', 'depth', `${milestone}% - Largo`);
                    }
                });
            }
        }, 500));

        // Track time on page
        let timeOnPage = 0;
        const timeTracker = setInterval(() => {
            timeOnPage += 5;
            
            // Track time milestones
            [30, 60, 120, 300].forEach(milestone => {
                if (timeOnPage === milestone) {
                    trackEvent('Engagement', 'time_on_page', `${milestone}s - Largo`);
                }
            });
        }, 5000);

        // Track external link clicks
        document.querySelectorAll('a[href^="http"]:not([href*="largocoffeecart.fyi"]):not([href*="delightfulbean.com"])').forEach(link => {
            link.addEventListener('click', function() {
                trackEvent('External Links', 'click', this.href);
            });
        });

        // Track CTA button effectiveness
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function() {
                trackEvent('CTA', 'click', this.textContent.trim() + ' - Largo');
            });
        });

        // Clean up timer when leaving page
        window.addEventListener('beforeunload', () => {
            clearInterval(timeTracker);
        });
    }

    // Accessibility Enhancements
    function initAccessibility() {
        // Skip link functionality
        const skipLink = document.querySelector('a[href="#main-content"]');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const main = document.getElementById('main-content');
                if (main) {
                    main.setAttribute('tabindex', '-1');
                    main.focus();
                }
            });
        }

        // Escape key closes mobile menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    document.getElementById('mobile-menu-toggle').click();
                }
            }
        });

        // Improve focus visibility
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-nav');
        });

        // ARIA labels for dynamic content
        const counters = document.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
            const observer = new MutationObserver(() => {
                counter.setAttribute('aria-label', `${counter.textContent} ${counter.dataset.label || ''}`);
            });
            observer.observe(counter, { childList: true, characterData: true });
        });
    }

    // Performance Optimizations
    function initPerformanceOptimizations() {
        // Prefetch important pages
        const prefetchLinks = [
            'https://www.delightfulbean.com/quote',
            'https://DelightfulBean.com'
        ];

        prefetchLinks.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });

        // Optimize images on interaction
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            });
        });

        // Critical resource hints
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                // Load non-critical resources
                const nonCriticalCSS = document.createElement('link');
                nonCriticalCSS.rel = 'stylesheet';
                nonCriticalCSS.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;600;700&display=swap';
                document.head.appendChild(nonCriticalCSS);
            });
        }
    }

    // Analytics helper function
    function trackEvent(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'custom_parameter_1': 'Largo Coffee Cart'
            });
        }
        
        // Also log to console in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`Analytics Event: ${category} - ${action} - ${label}`);
        }
    }

    // Initialize everything when DOM is ready
    initializeComponents();

    // Loading screen removal
    const removeLoader = () => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 200);
        }
    };

    // Remove loading screen when hero image loads
    const heroImg = document.querySelector('img[fetchpriority="high"]');
    if (heroImg && heroImg.complete) {
        removeLoader();
    } else if (heroImg) {
        heroImg.addEventListener('load', removeLoader);
    }
    
    // Fallback removal
    setTimeout(removeLoader, 3000);

    // Export utilities for use in other scripts (like voice assistant)
    window.DelightfulBeanLargo = {
        utils: utils,
        trackEvent: trackEvent,
        config: config
    };

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Largo Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            
            // Track performance metrics
            trackEvent('Performance', 'page_load_time', Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms');
        });
    }
});