document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const registerBtn = document.getElementById('registerBtn');
    const btnLoading = document.getElementById('btnLoading');
    
    // Form validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'First name must be at least 2 characters and contain only letters'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Last name must be at least 2 characters and contain only letters'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        username: {
            required: true,
            minLength: 3,
            maxLength: 20,
            pattern: /^[a-zA-Z0-9_]+$/,
            message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores'
        },
        password: {
            required: true,
            minLength: 8,
            message: 'Password must be at least 8 characters long'
        },
        confirmPassword: {
            required: true,
            message: 'Passwords do not match'
        },
        skillLevel: {
            required: true,
            message: 'Please select your current typing skill level'
        },
        terms: {
            required: true,
            message: 'You must agree to the Terms of Service and Privacy Policy'
        }
    };
    
    // Password strength checker
    function checkPasswordStrength(password) {
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        
        let score = 0;
        let feedback = [];
        
        // Length check
        if (password.length >= 8) score += 1;
        else feedback.push('at least 8 characters');
        
        // Lowercase check
        if (/[a-z]/.test(password)) score += 1;
        else feedback.push('lowercase letter');
        
        // Uppercase check
        if (/[A-Z]/.test(password)) score += 1;
        else feedback.push('uppercase letter');
        
        // Number check
        if (/[0-9]/.test(password)) score += 1;
        else feedback.push('number');
        
        // Special character check
        if (/[^a-zA-Z0-9]/.test(password)) score += 1;
        else feedback.push('special character');
        
        // Update strength indicator
        const percentage = (score / 5) * 100;
        strengthFill.style.width = percentage + '%';
        
        let strengthLevel = '';
        let color = '';
        
        if (score <= 1) {
            strengthLevel = 'Very Weak';
            color = '#ef4444';
        } else if (score <= 2) {
            strengthLevel = 'Weak';
            color = '#f97316';
        } else if (score <= 3) {
            strengthLevel = 'Fair';
            color = '#eab308';
        } else if (score <= 4) {
            strengthLevel = 'Good';
            color = '#22c55e';
        } else {
            strengthLevel = 'Strong';
            color = '#16a34a';
        }
        
        strengthFill.style.backgroundColor = color;
        
        if (password.length > 0) {
            if (feedback.length > 0) {
                strengthText.textContent = `${strengthLevel} - Add: ${feedback.join(', ')}`;
            } else {
                strengthText.textContent = `${strengthLevel} password`;
            }
        } else {
            strengthText.textContent = 'Password strength';
        }
        
        return score;
    }
    
    // Validation functions
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return { isValid: true };
        
        // Handle different field types
        let processedValue = value;
        const field = document.getElementById(fieldName);
        
        if (field && field.type === 'checkbox') {
            // For checkboxes, value is boolean
            processedValue = field.checked;
        } else if (typeof value === 'string') {
            // For text inputs, trim whitespace
            processedValue = value.trim();
        }
        
        // Required check
        if (rules.required) {
            if (field && field.type === 'checkbox') {
                if (!processedValue) {
                    return { isValid: false, message: rules.message };
                }
            } else {
                if (!processedValue || processedValue === '') {
                    return { isValid: false, message: `${fieldName} is required` };
                }
            }
        }
        
        // Skip other validations for checkboxes or empty non-required fields
        if (field && field.type === 'checkbox') {
            return { isValid: true };
        }
        
        if (!processedValue || processedValue === '') {
            return { isValid: true };
        }
        
        // Length checks
        if (rules.minLength && processedValue.length < rules.minLength) {
            return { isValid: false, message: rules.message };
        }
        
        if (rules.maxLength && processedValue.length > rules.maxLength) {
            return { isValid: false, message: rules.message };
        }
        
        // Pattern check
        if (rules.pattern && !rules.pattern.test(processedValue)) {
            return { isValid: false, message: rules.message };
        }
        
        // Special case for confirm password
        if (fieldName === 'confirmPassword') {
            const password = document.getElementById('password').value;
            if (processedValue !== password) {
                return { isValid: false, message: rules.message };
            }
        }
        
        return { isValid: true };
    }
    
    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        if (field) {
            field.classList.add('error');
            field.classList.remove('success');
        }
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    function showSuccess(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        if (field) {
            field.classList.remove('error');
            field.classList.add('success');
        }
        
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
    
    function clearValidation(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        if (field) {
            field.classList.remove('error', 'success');
        }
        
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
    
    // Real-time validation
    function setupRealTimeValidation() {
        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!field) return;
            
            // Handle different event types based on field type
            const eventType = field.type === 'checkbox' ? 'change' : 'input';
            
            field.addEventListener(eventType, function() {
                const value = field.type === 'checkbox' ? field.checked : field.value;
                const validation = validateField(fieldName, value);
                
                if (field.type !== 'checkbox' && (!field.value || field.value.trim() === '')) {
                    clearValidation(fieldName);
                } else if (validation.isValid) {
                    showSuccess(fieldName);
                } else {
                    showError(fieldName, validation.message);
                }
            });
            
            // Special handling for password field
            if (fieldName === 'password') {
                field.addEventListener('input', function() {
                    checkPasswordStrength(field.value);
                    
                    // Also validate confirm password if it has a value
                    const confirmPassword = document.getElementById('confirmPassword');
                    if (confirmPassword.value) {
                        const confirmValidation = validateField('confirmPassword', confirmPassword.value);
                        if (confirmValidation.isValid) {
                            showSuccess('confirmPassword');
                        } else {
                            showError('confirmPassword', confirmValidation.message);
                        }
                    }
                });
            }
        });
    }
    
    // Username availability check (simulated)
    function checkUsernameAvailability(username) {
        return new Promise((resolve) => {
            // Simulate API call
            setTimeout(() => {
                const unavailableUsernames = ['admin', 'test', 'user', 'typing', 'master'];
                const isAvailable = !unavailableUsernames.includes(username.toLowerCase());
                resolve(isAvailable);
            }, 500);
        });
    }
    
    // Email availability check (simulated)
    function checkEmailAvailability(email) {
        return new Promise((resolve) => {
            // Simulate API call
            setTimeout(() => {
                const unavailableEmails = ['test@example.com', 'admin@typingmaster.com'];
                const isAvailable = !unavailableEmails.includes(email.toLowerCase());
                resolve(isAvailable);
            }, 500);
        });
    }
    
    // Advanced validation for username and email
    async function validateAvailability() {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        
        if (username && validateField('username', username).isValid) {
            const isUsernameAvailable = await checkUsernameAvailability(username);
            if (!isUsernameAvailable) {
                showError('username', 'Username is already taken');
                return false;
            }
        }
        
        if (email && validateField('email', email).isValid) {
            const isEmailAvailable = await checkEmailAvailability(email);
            if (!isEmailAvailable) {
                showError('email', 'Email is already registered');
                return false;
            }
        }
        
        return true;
    }
    
    // Get form data safely
    function getFormData() {
        const formData = {};
        
        // Get text inputs
        const textFields = ['firstName', 'lastName', 'email', 'username', 'password', 'confirmPassword', 'skillLevel'];
        textFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                formData[fieldName] = field.value;
            }
        });
        
        // Get checkboxes
        const checkboxFields = ['terms', 'newsletter'];
        checkboxFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                formData[fieldName] = field.checked;
            }
        });
        
        return formData;
    }
    
    // Form submission
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disable submit button
        registerBtn.classList.add('loading');
        registerBtn.disabled = true;
        
        try {
            // Get form data
            const formData = getFormData();
            
            // Validate all fields
            let isFormValid = true;
            
            Object.keys(validationRules).forEach(fieldName => {
                const value = formData[fieldName];
                const validation = validateField(fieldName, value);
                
                if (!validation.isValid) {
                    showError(fieldName, validation.message);
                    isFormValid = false;
                } else {
                    showSuccess(fieldName);
                }
            });
            
            if (!isFormValid) {
                throw new Error('Please fix the errors above');
            }
            
            // Check availability
            const isAvailable = await validateAvailability();
            if (!isAvailable) {
                throw new Error('Username or email is not available');
            }
            
            // Simulate registration API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            alert('🎉 Registration successful!\n\nWelcome to Typing Master! You can now log in with your credentials.');
            
            // Redirect to login page or dashboard
            window.location.href = 'login.html';
            
            console.log('Registration successful with data:', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                username: formData.username,
                skillLevel: formData.skillLevel,
                newsletter: formData.newsletter
            });
            
        } catch (error) {
            alert('Registration failed: ' + error.message);
            console.error('Registration error:', error);
        } finally {
            // Re-enable submit button
            registerBtn.classList.remove('loading');
            registerBtn.disabled = false;
        }
    });
    
    // Social registration handlers
    document.getElementById('googleRegister').addEventListener('click', function() {
        alert('Google registration would be implemented here.\n\nThis would integrate with Google OAuth API.');
    });
    
    document.getElementById('githubRegister').addEventListener('click', function() {
        alert('GitHub registration would be implemented here.\n\nThis would integrate with GitHub OAuth API.');
    });
    
    // Initialize
    setupRealTimeValidation();
    
    // Add some interactive enhancements
    function addInteractiveEnhancements() {
        // Focus enhancement
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
        
        // Progress indicator
        const totalFields = Object.keys(validationRules).length;
        
        function updateProgress() {
            const validFields = document.querySelectorAll('input.success, select.success').length;
            const progressPercentage = (validFields / totalFields) * 100;
            
            // You could add a progress bar here if desired
            console.log(`Registration progress: ${Math.round(progressPercentage)}%`);
        }
        
        inputs.forEach(input => {
            input.addEventListener('input', updateProgress);
            input.addEventListener('change', updateProgress);
        });
    }
    
    addInteractiveEnhancements();
    
    console.log('🎉 Registration page loaded successfully!');
});