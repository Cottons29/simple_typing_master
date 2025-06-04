document.addEventListener('DOMContentLoaded', function() {
    // Typing animation demo
    const typedTextElement = document.getElementById('typedText');
    const cursorElement = document.getElementById('cursor');
    const startBtn = document.getElementById('startBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    
    const phrases = [
        "The quick brown fox jumps over the lazy dog.",
        "Practice makes perfect!",
        "Typing Master helps you improve.",
        "Speed and accuracy matter.",
        "Master your keyboard skills today!"
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeWriter() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (!isDeleting && currentCharIndex < currentPhrase.length) {
            // Typing
            typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            setTimeout(typeWriter, 100 + Math.random() * 100);
        } else if (isDeleting && currentCharIndex > 0) {
            // Deleting
            typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            setTimeout(typeWriter, 50);
        } else if (!isDeleting && currentCharIndex === currentPhrase.length) {
            // Pause before deleting
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                typeWriter();
            }, 2000);
        } else if (isDeleting && currentCharIndex === 0) {
            // Move to next phrase
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(typeWriter, 500);
        }
    }
    
    // Start typing animation
    typeWriter();
    
    // Button event listeners
    startBtn.addEventListener('click', function() {
        window.location.href = './html/register.html';
    });
    
    learnMoreBtn.addEventListener('click', function() {
        // Smooth scroll to features section
        document.querySelector('.features-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
    
    // Add some interactive effects
    function addParallaxEffect() {
        const cards = document.querySelectorAll('.feature-card, .stat-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Initialize interactive effects
    addParallaxEffect();
    
    // Add smooth fade-in animation for elements
    function observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        const elementsToObserve = document.querySelectorAll('.feature-card, .stat-item');
        elementsToObserve.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Initialize scroll animations
    observeElements();
    
    // Add keyboard shortcut to start typing
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.code === 'Space') {
            if (event.target === document.body) {
                event.preventDefault();
                startBtn.click();
            }
        }
    });
    
    console.log('🎉 Typing Master intro page loaded successfully!');
});