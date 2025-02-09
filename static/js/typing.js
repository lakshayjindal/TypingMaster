class TypingTutor {
    constructor() {
        this.textDisplay = document.getElementById('text-display');
        this.typingInput = document.getElementById('typing-input');
        this.languageSelect = document.getElementById('languageSelect');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.keystrokesDisplay = document.getElementById('keystrokes');
        this.correctDisplay = document.getElementById('correct');
        this.incorrectDisplay = document.getElementById('incorrect');
        this.timeLeftDisplay = document.getElementById('timeLeft');

        this.currentText = '';
        this.startTime = null;
        this.errors = 0;
        this.currentIndex = 0;
        this.keystrokes = 0;
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.timeLeft = 60;
        this.timerInterval = null;
        this.keyboard = new KeyboardDisplay();

        this.lessons = {
            english: [
                {
                    level: 1,
                    texts: [
                        "social media has come a long way in India and its penetration is growing rapidly",
                        "the quick brown fox jumps over the lazy dog while the sun sets in the west",
                        "practice makes perfect and consistent effort leads to improvement in typing"
                    ]
                }
            ],
            'hindi-inscript': [
                {
                    level: 1,
                    texts: [
                        "सामाजिक मीडिया ने भारत में एक लंबा सफर तय किया है",
                        "टाइपिंग सीखने का सबसे अच्छा तरीका नियमित अभ्यास है",
                        "कंप्यूटर शिक्षा आज के समय की मांग है"
                    ]
                }
            ],
            'hindi-rem': [
                {
                    level: 1,
                    texts: [
                        "हिंदी टाइपिंग सीखें और रोजगार के अवसर बढ़ाएं",
                        "नियमित अभ्यास से टाइपिंग में सुधार होता है",
                        "गति के साथ शुद्धता भी महत्वपूर्ण है"
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

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timeLeft = 60;
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.timeLeftDisplay.textContent = this.timeLeft;
            if (this.timeLeft <= 0) {
                this.completeLesson();
                clearInterval(this.timerInterval);
            }
        }, 1000);
    }

    initializeLesson() {
        this.currentIndex = 0;
        this.errors = 0;
        this.keystrokes = 0;
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.startTime = null;
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timeLeft = 60;
        this.timeLeftDisplay.textContent = this.timeLeft;

        const layout = this.languageSelect.value;
        const lessonSet = this.lessons[layout] || this.lessons.english;
        const currentLessonSet = lessonSet.find(l => l.level === this.currentLevel) || lessonSet[0];
        this.currentText = currentLessonSet.texts[Math.floor(Math.random() * currentLessonSet.texts.length)];

        this.displayText();
        this.typingInput.value = '';
        this.typingInput.focus();
        this.updateStats();

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
            this.startTimer();
        }

        const currentChar = this.currentText[this.currentIndex];
        const typedChar = this.typingInput.value;

        if (typedChar === currentChar) {
            this.keyboard.highlightKey(typedChar);
            this.currentIndex++;
            this.correctChars++;
            this.keystrokes++;
            this.typingInput.value = '';
            this.displayText();
            this.updateStats();

            if (this.currentIndex === this.currentText.length) {
                this.completeLesson();
            }
        } else if (typedChar) {
            this.errors++;
            this.incorrectChars++;
            this.keystrokes++;
            this.keyboard.showError(typedChar);
            this.updateStats();
            this.typingInput.value = '';
        }
    }

    updateStats() {
        const timeElapsed = this.startTime ? (new Date() - this.startTime) / 1000 / 60 : 0;
        const wordsTyped = this.currentIndex / 5;
        const wpm = Math.round(wordsTyped / (timeElapsed || 1));

        const accuracy = Math.round((this.correctChars / (this.keystrokes || 1)) * 100);

        this.wpmDisplay.textContent = wpm;
        this.accuracyDisplay.textContent = `${accuracy}%`;
        this.keystrokesDisplay.textContent = this.keystrokes;
        this.correctDisplay.textContent = this.correctChars;
        this.incorrectDisplay.textContent = this.incorrectChars;
    }

    async completeLesson() {
        if (this.timerInterval) clearInterval(this.timerInterval);

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
                if (accuracy >= 90 && this.currentLevel < Object.keys(this.lessons[this.languageSelect.value]).length) {
                    this.currentLevel++;
                }
                alert(`Test completed!\nSpeed: ${wpm} WPM\nAccuracy: ${accuracy}%\nKeystrokes: ${this.keystrokes}\nCorrect: ${this.correctChars}\nIncorrect: ${this.incorrectChars}`);
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