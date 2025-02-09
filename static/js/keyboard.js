class KeyboardDisplay {
    constructor() {
        this.keyboardContainer = document.getElementById('keyboard-display');
        this.currentLayout = 'english';
        this.shiftPressed = false;
        this.layouts = {
            english: {
                normal: [
                    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
                    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
                    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
                    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
                ],
                shift: [
                    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
                    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
                    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"'],
                    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?']
                ]
            },
            'hindi-inscript': {
                normal: [
                    ['ॊ', '१', '२', '३', '४', '५', '६', '७', '८', '९', '०', '-', 'ृ'],
                    ['ौ', 'ै', 'ा', 'ी', 'ू', 'ब', 'ह', 'ग', 'द', 'ज', 'ड', 'ड़', 'ॉ'],
                    ['ो', 'े', '्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च', 'ट', 'ॆ'],
                    ['ं', 'म', 'न', 'व', 'ल', 'स', 'य', ',', '.', 'य़']
                ],
                shift: [
                    ['ऒ', 'ऍ', 'ॅ', '्र', 'र्', 'ज्ञ', 'त्र', 'क्ष', 'श्र', '(', ')', 'ः', 'ऋ'],
                    ['औ', 'ऐ', 'आ', 'ई', 'ऊ', 'भ', 'ङ', 'घ', 'ध', 'झ', 'ढ', 'ञ', 'ऑ'],
                    ['ओ', 'ए', 'अ', 'इ', 'उ', 'फ', 'ऱ', 'ख', 'थ', 'छ', 'ठ', 'ऎ'],
                    ['ँ', 'ण', 'ऩ', 'ऴ', 'ळ', 'श', 'ष', 'श्र', '।', 'य़']
                ]
            },
            'hindi-rem': [
                ['ज्ञ', '१', '२', '३', '४', '५', '६', '७', '८', '९', '०', '-', 'ृ'],
                ['त्त', 'ँ', 'े', 'र', 'त', 'य', 'ु', 'ि', 'ो', 'प', 'ै', 'ृ'],
                ['ा', 'स', 'द', 'ि', 'ग', 'ह', 'ज', 'क', 'ल', 'ः', '\"'],
                ['े', 'ॅ', 'ॉ', 'ब', 'न', 'म', 'ं', ',', '.', 'य़']
            ]
        };

        this.init();
    }

    init() {
        this.render();
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.currentLayout = e.target.value;
            this.render();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Shift') {
                this.shiftPressed = true;
                this.render();
            }
            this.highlightKey(e.key.toLowerCase());
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'Shift') {
                this.shiftPressed = false;
                this.render();
            }
            this.removeHighlight(e.key.toLowerCase());
        });
    }

    render() {
        this.keyboardContainer.innerHTML = '';
        const layoutSet = this.layouts[this.currentLayout] || this.layouts.english;
        const layout = this.shiftPressed ? layoutSet.shift : layoutSet.normal;

        // Add language-specific class for proper font rendering
        this.keyboardContainer.className = this.currentLayout.startsWith('hindi') ? 
            'keyboard-display hindi-text' : 'keyboard-display';

        layout.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'keyboard-row d-flex justify-content-center mb-1';

            row.forEach(key => {
                const keyDiv = document.createElement('div');
                keyDiv.className = 'key';
                keyDiv.dataset.key = key;
                keyDiv.textContent = key;
                rowDiv.appendChild(keyDiv);
            });

            this.keyboardContainer.appendChild(rowDiv);
        });
    }

    highlightKey(key) {
        const keyElement = this.keyboardContainer.querySelector(`[data-key="${key}"]`);
        if (keyElement) {
            keyElement.classList.add('active');
            setTimeout(() => this.removeHighlight(key), 200);
        }
    }

    removeHighlight(key) {
        const keyElement = this.keyboardContainer.querySelector(`[data-key="${key}"]`);
        if (keyElement) {
            keyElement.classList.remove('active');
            keyElement.classList.remove('error');
        }
    }

    showError(key) {
        const keyElement = this.keyboardContainer.querySelector(`[data-key="${key}"]`);
        if (keyElement) {
            keyElement.classList.add('error');
            setTimeout(() => this.removeHighlight(key), 500);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new KeyboardDisplay();
});