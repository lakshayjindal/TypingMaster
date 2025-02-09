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
        this.keyboard = new KeyboardDisplay();

        this.lessons = {
            english: [
                {
                    level: 1,
                    texts: [
                        "aaa sss ddd fff jjj kkk lll ;;;",
                        "asdf jkl; asdf jkl; asdf jkl;",
                        "fjfjfj dkdkdk slslsl ajajaj"
                    ]
                },
                {
                    level: 2,
                    texts: [
                        "The quick brown fox jumps over the lazy dog.",
                        "Pack my box with five dozen liquor jugs.",
                        "How vexingly quick daft zebras jump!"
                    ]
                }
            ],
            'hindi-inscript': [
                {
                    level: 1,
                    texts: [
                        "कमल नमन मनन लाल",
                        "अनार नाला काला पान",
                        "राम नाम मन भाता"
                    ]
                }
            ],
            'hindi-rem': [
                {
                    level: 1,
                    texts: [
                        "कखग घङच छजझ",
                        "टठड ढणत थदध",
                        "नपफ बभमय रल"
                    ]
                }
            ]
        };

        this.currentLevel = 1;
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

        const layout = this.languageSelect.value;
        const lessonSet = this.lessons[layout] || this.lessons.english;
        const currentLessonSet = lessonSet.find(l => l.level === this.currentLevel) || lessonSet[0];
        this.currentText = currentLessonSet.texts[Math.floor(Math.random() * currentLessonSet.texts.length)];

        this.displayText();
        this.typingInput.value = '';
        this.typingInput.focus();

        // Update font family based on language
        this.textDisplay.className = layout.startsWith('hindi') ? 'text-display hindi-text' : 'text-display';
    }

    displayText() {
        this.textDisplay.innerHTML = this.currentText.split('').map((char, index) => {
            let className = '';
            if (index < this.currentIndex) {
                className = this.currentText[index] === char ? 'correct' : 'incorrect';
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
            this.keyboard.highlightKey(typedChar);
            this.currentIndex++;
            this.typingInput.value = '';
            this.displayText();
            this.updateStats();

            if (this.currentIndex === this.currentText.length) {
                this.completeLesson();
            }
        } else if (typedChar) {
            this.errors++;
            this.keyboard.showError(typedChar);
            this.updateStats();
            this.typingInput.value = '';
        }
    }

    updateStats() {
        if (!this.startTime) return;

        const timeElapsed = (new Date() - this.startTime) / 1000 / 60;
        const wordsTyped = this.currentIndex / 5;
        const wpm = Math.round(wordsTyped / timeElapsed);

        const totalCharacters = this.currentIndex + this.errors;
        const accuracy = Math.round(((this.currentIndex) / totalCharacters) * 100) || 0;

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
                // Progress to next level if accuracy is good
                if (accuracy >= 90 && this.currentLevel < Object.keys(this.lessons[this.languageSelect.value]).length) {
                    this.currentLevel++;
                }
                alert(`Lesson completed! Speed: ${wpm} WPM, Accuracy: ${accuracy}%`);
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