class KeyboardDisplay {
    constructor() {
        this.keyboardContainer = document.getElementById('keyboard-display');
        this.currentLayout = 'english';
        this.layouts = {
            english: [
                ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
                ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
                ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
                ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
            ],
            'hindi-inscript': [
                ['ॊ', '१', '२', '३', '४', '५', '६', '७', '८', '९', '०', '-', 'ृ'],
                ['ौ', 'ै', 'ा', 'ी', 'ू', 'ब', 'ह', 'ग', 'द', 'ज', 'ड', 'ड़'],
                ['ो', 'े', '्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च', 'ट'],
                ['ं', 'म', 'न', 'व', 'ल', 'स', 'य', 'भ', 'ष']
            ],
            'hindi-rem': [
                ['१', '२', '३', '४', '५', '६', '७', '८', '९', '०', '-', '='],
                ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ'],
                ['ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब'],
                ['भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह']
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

        document.addEventListener('keydown', (e) => this.highlightKey(e.key.toLowerCase()));
        document.addEventListener('keyup', (e) => this.removeHighlight(e.key.toLowerCase()));
    }

    render() {
        this.keyboardContainer.innerHTML = '';

        const layout = this.layouts[this.currentLayout] || this.layouts.english;
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