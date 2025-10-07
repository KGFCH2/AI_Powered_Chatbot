// Landing Page Specific JavaScript
class LandingPage {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTypingAnimation();
        this.setupChatPreview();
        this.setupFeatureCards();
        this.setupScrollEffects();
    }
    
    // Typing animation for hero title
    setupTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;
        
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typeSpeed = 100;
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Animated chat preview
    setupChatPreview() {
        const chatMessages = document.querySelector('.chat-preview .chat-messages');
        if (!chatMessages) return;
        
        // Simulate typing animation for the chat preview
        const typingMessage = chatMessages.querySelector('.typing');
        if (typingMessage) {
            setTimeout(() => {
                typingMessage.classList.remove('typing');
                typingMessage.querySelector('.message-content').innerHTML = `
                    Artificial Intelligence is a fascinating field that focuses on creating intelligent machines capable of performing tasks that typically require human intelligence...
                `;
            }, 3000);
        }
    }
    
    // Feature cards interaction
    setupFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach((card, index) => {
            // Staggered animation delay
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Enhanced hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(31, 38, 135, 0.5)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.37)';
            });
        });
    }
    
    // Scroll-triggered animations
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe feature cards for staggered animation
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }
    
    // Smooth scroll for navigation
    smoothScrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Additional CSS for landing page animations
const landingCSS = `
.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

.hero-content {
    animation: slideInLeft 1s ease forwards;
}

.hero-visual {
    animation: slideInRight 1s ease forwards;
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.feature-card {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.chat-preview {
    animation: float-in 1s ease forwards;
}

@keyframes float-in {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
`;

// Inject landing page CSS
const landingStyle = document.createElement('style');
landingStyle.textContent = landingCSS;
document.head.appendChild(landingStyle);

// Initialize landing page functionality
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.landing-container')) {
        window.landingPage = new LandingPage();
    }
});