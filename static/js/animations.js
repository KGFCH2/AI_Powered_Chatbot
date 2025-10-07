// Animation and Visual Effects
class AnimationManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTiltEffect();
        this.setupScrollAnimations();
        this.setupFloatingShapes();
        this.setupParallaxEffect();
    }
    
    // Tilt effect for cards
    setupTiltEffect() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(element => {
            element.addEventListener('mouseenter', this.startTilt.bind(this));
            element.addEventListener('mousemove', this.updateTilt.bind(this));
            element.addEventListener('mouseleave', this.resetTilt.bind(this));
        });
    }
    
    startTilt(e) {
        e.target.style.transition = 'none';
    }
    
    updateTilt(e) {
        const rect = e.target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        
        const rotateX = deltaY * -10; // Max 10 degrees
        const rotateY = deltaX * 10;
        
        e.target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }
    
    resetTilt(e) {
        e.target.style.transition = 'transform 0.5s ease';
        e.target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    
    // Scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('.feature-card, .hero-content, .hero-visual');
        animateElements.forEach(el => observer.observe(el));
    }
    
    // Enhanced floating shapes animation
    setupFloatingShapes() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            // Add random movement variation
            const baseDelay = parseFloat(shape.style.animationDelay || '0s');
            const randomDelay = baseDelay + (Math.random() * 2);
            shape.style.animationDelay = `${randomDelay}s`;
            
            // Add mouse interaction
            document.addEventListener('mousemove', (e) => {
                const rect = shape.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) / window.innerWidth;
                const deltaY = (e.clientY - centerY) / window.innerHeight;
                
                const moveX = deltaX * 20; // Reduced movement
                const moveY = deltaY * 20;
                
                shape.style.transform += ` translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
    
    // Parallax scrolling effect
    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-visual, .floating-shapes');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // Ripple effect for buttons
    createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Smooth scroll to element
    smoothScrollTo(target) {
        if (typeof target === 'string') {
            target = document.querySelector(target);
        }
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Loading animation
    showLoading(element) {
        element.classList.add('loading');
        element.disabled = true;
    }
    
    hideLoading(element) {
        element.classList.remove('loading');
        element.disabled = false;
    }
    
    // Success animation
    showSuccess(element) {
        element.classList.add('success-animation');
        setTimeout(() => {
            element.classList.remove('success-animation');
        }, 600);
    }
    
    // Shake animation for errors
    showError(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
    
    // Fade in animation
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            element.style.opacity = Math.min(progress, 1);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Fade out animation
    fadeOut(element, duration = 300) {
        let start = null;
        const initialOpacity = parseFloat(window.getComputedStyle(element).opacity);
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            element.style.opacity = initialOpacity * (1 - progress);
            
            if (progress >= 1) {
                element.style.display = 'none';
            } else {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// CSS for additional animations
const additionalCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-in {
    animation: slideInUp 0.6s ease forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Initialize animation manager
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
    
    // Add ripple effect to all buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', window.animationManager.createRipple);
    });
});