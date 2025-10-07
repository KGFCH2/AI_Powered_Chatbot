// Authentication JavaScript
class AuthManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupForms();
        this.setupPasswordToggle();
        this.setupFormValidation();
        this.setupFloatingIcons();
    }
    
    setupForms() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }
        
        if (registerForm) {
            registerForm.addEventListener('submit', this.handleRegister.bind(this));
        }
    }
    
    setupPasswordToggle() {
        const passwordToggles = document.querySelectorAll('.password-toggle');
        
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const input = toggle.previousElementSibling.previousElementSibling;
                const icon = toggle.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });
    }
    
    setupFormValidation() {
        const inputs = document.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('input', this.validateInput.bind(this));
            input.addEventListener('blur', this.validateInput.bind(this));
            input.addEventListener('focus', this.clearError.bind(this));
        });
    }
    
    setupFloatingIcons() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach((icon, index) => {
            // Add random animation delay
            icon.style.animationDelay = `${index * 2}s`;
            
            // Add hover effect
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
    
    validateInput(e) {
        const input = e.target;
        const value = input.value.trim();
        const name = input.name;
        
        // Remove previous error styling
        this.clearError(e);
        
        let isValid = true;
        let errorMessage = '';
        
        // Validation rules
        switch (name) {
            case 'username':
                if (value.length < 3) {
                    isValid = false;
                    errorMessage = 'Username must be at least 3 characters long';
                } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Username can only contain letters, numbers, and underscores';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'password':
                if (value.length < 6) {
                    isValid = false;
                    errorMessage = 'Password must be at least 6 characters long';
                }
                break;
                
            case 'confirmPassword':
                const password = document.getElementById('password').value;
                if (value !== password) {
                    isValid = false;
                    errorMessage = 'Passwords do not match';
                }
                break;
        }
        
        if (!isValid) {
            this.showInputError(input, errorMessage);
        }
        
        return isValid;
    }
    
    showInputError(input, message) {
        input.classList.add('error');
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #f5576c;
            font-size: 0.8rem;
            margin-top: 5px;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        
        input.parentNode.appendChild(errorElement);
        
        // Animate in
        setTimeout(() => {
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        }, 10);
    }
    
    clearError(e) {
        const input = e.target;
        input.classList.remove('error');
        
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.style.opacity = '0';
            errorMessage.style.transform = 'translateY(-10px)';
            setTimeout(() => errorMessage.remove(), 300);
        }
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        // Validate form
        const isValid = this.validateForm(e.target);
        if (!isValid) {
            this.showFormError('Please fix the errors above');
            return;
        }
        
        // Show loading
        window.animationManager.showLoading(submitBtn);
        
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success animation
                window.animationManager.showSuccess(submitBtn);
                
                // Redirect after short delay
                setTimeout(() => {
                    window.location.href = result.redirect;
                }, 600);
            } else {
                this.showFormError(result.message);
                window.animationManager.showError(submitBtn);
            }
        } catch (error) {
            this.showFormError('Network error. Please try again.');
            window.animationManager.showError(submitBtn);
        } finally {
            setTimeout(() => {
                window.animationManager.hideLoading(submitBtn);
            }, 1000);
        }
    }
    
    async handleRegister(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        // Validate form
        const isValid = this.validateForm(e.target);
        if (!isValid) {
            this.showFormError('Please fix the errors above');
            return;
        }
        
        // Show loading
        window.animationManager.showLoading(submitBtn);
        
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success animation
                window.animationManager.showSuccess(submitBtn);
                
                // Redirect after short delay
                setTimeout(() => {
                    window.location.href = result.redirect;
                }, 600);
            } else {
                this.showFormError(result.message);
                window.animationManager.showError(submitBtn);
            }
        } catch (error) {
            this.showFormError('Network error. Please try again.');
            window.animationManager.showError(submitBtn);
        } finally {
            setTimeout(() => {
                window.animationManager.hideLoading(submitBtn);
            }, 1000);
        }
    }
    
    validateForm(form) {
        const inputs = form.querySelectorAll('.form-input');
        let isValid = true;
        
        inputs.forEach(input => {
            const event = { target: input };
            if (!this.validateInput(event)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    showFormError(message) {
        const errorAlert = document.getElementById('errorAlert');
        const errorMessage = document.getElementById('errorMessage');
        
        if (errorAlert && errorMessage) {
            errorMessage.textContent = message;
            errorAlert.style.display = 'flex';
            window.animationManager.fadeIn(errorAlert);
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                window.animationManager.fadeOut(errorAlert);
            }, 5000);
        }
    }
    
    hideFormError() {
        const errorAlert = document.getElementById('errorAlert');
        if (errorAlert) {
            window.animationManager.fadeOut(errorAlert);
        }
    }
}

// Additional CSS for auth forms
const authCSS = `
.form-input.error {
    border-color: #f5576c;
    box-shadow: 0 0 0 3px rgba(245, 87, 108, 0.1);
}

.error-message {
    display: block;
}

.auth-card {
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

.floating-icon {
    animation: float 8s infinite ease-in-out;
}

.floating-icon:hover {
    animation-play-state: paused;
}

.btn.loading {
    pointer-events: none;
}

.btn.loading .btn-text {
    opacity: 0;
}

.btn.loading .btn-loader {
    display: flex;
    align-items: center;
    justify-content: center;
}
`;

// Inject auth CSS
const authStyle = document.createElement('style');
authStyle.textContent = authCSS;
document.head.appendChild(authStyle);

// Initialize auth manager
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.auth-container')) {
        window.authManager = new AuthManager();
    }
});