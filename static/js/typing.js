class TypingTutor {
    constructor() {
        this.textDisplay = document.getElementById('text-display');
        this.typingInput = document.getElementById('typing-input');
        this.languageSelect = document.getElementById('languageSelect');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        
        this.currentText = '';
        this.startTime = null;
        this.errors = 0;
        this.currentIndex = 0;
        
        this.englishTexts = [
            "The quick brown fox jumps over the lazy dog.",
            "Practice makes perfect, and perfect practice makes perfect typing.",
            "Type as quickly as you can while maintaining accuracy."
        ];
        
        this.hindiTexts = [
            "भारत एक विशाल देश है।",
            "टाइपिंग सीखना बहुत महत्वपूर्ण है।",
            "नमस्ते और स्वागत है आपका।"
        ];
        
        this.bindEvents();
        this.initializeLesson();
    }
    
    bindEvents() {
        this.typingInput.addEventListener('input', () => this.checkInput());
        this.languageSelect.addEventListener('change', () => this.initializeLesson());
    }
    
    initializeLesson() {
        this.currentIndex = 0;
        this.errors = 0;
        this.startTime = null;
        
        const texts = this.languageSelect.value.startsWith('hindi') ? 
            this.hindiTexts : this.englishTexts;
        this.currentText = texts[Math.floor(Math.random() * texts.length)];
        
        this.displayText();
        this.typingInput.value = '';
        this.typingInput.focus();
    }
    
    displayText() {
        this.textDisplay.innerHTML = this.currentText.split('').map((char, index) => {
            let className = '';
            if (index < this.currentIndex) {
                className = 'correct';
            } else if (index === this.currentIndex) {
                className = 'current';
            }
            return `<span class="${className}">${char}</span>`;
        }).join('');
    }
    
    checkInput() {
        if (!this.startTime) {
            this.startTime = new Date();
        }
        
        const currentChar = this.currentText[this.currentIndex];
        const typedChar = this.typingInput.value;
        
        if (typedChar === currentChar) {
            this.currentIndex++;
            this.typingInput.value = '';
            this.displayText();
            this.updateStats();
            
            if (this.currentIndex === this.currentText.length) {
                this.completeLesson();
            }
        } else {
            this.errors++;
            this.updateStats();
        }
    }
    
    updateStats() {
        if (!this.startTime) return;
        
        const timeElapsed = (new Date() - this.startTime) / 1000 / 60;
        const wordsTyped = this.currentIndex / 5;
        const wpm = Math.round(wordsTyped / timeElapsed);
        
        const totalCharacters = this.currentIndex;
        const accuracy = Math.round(((totalCharacters - this.errors) / totalCharacters) * 100) || 0;
        
        this.wpmDisplay.textContent = wpm;
        this.accuracyDisplay.textContent = `${accuracy}%`;
    }
    
    async completeLesson() {
        const wpm = parseInt(this.wpmDisplay.textContent);
        const accuracy = parseInt(this.accuracyDisplay.textContent);
        
        try {
            const response = await fetch('/submit_score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    wpm,
                    accuracy,
                    language: this.languageSelect.value
                })
            });
            
            if (response.ok) {
                alert('Lesson completed! Score saved.');
                this.initializeLesson();
            }
        } catch (error) {
            console.error('Error saving score:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TypingTutor();
});
