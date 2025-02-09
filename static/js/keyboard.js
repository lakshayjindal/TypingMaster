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
            hindi: [
                ['ौ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', 'ृ'],
                ['ौ', 'ै', 'ा', 'ी', 'ू', 'ब', 'ह', 'ग', 'द', 'ज', 'ड', '़'],
                ['ो', 'े', '्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च', 'ट'],
                ['ं', 'म', 'न', 'व', 'ल', 'स', 'य', 'भ', 'ष']
            ]
        };
        
        this.init();
    }
    
    init() {
        this.render();
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.currentLayout = e.target.value.startsWith('hindi') ? 'hindi' : 'english';
            this.render();
        });
        
        document.addEventListener('keydown', (e) => this.highlightKey(e.key.toLowerCase()));
        document.addEventListener('keyup', (e) => this.removeHighlight(e.key.toLowerCase()));
    }
    
    render() {
        this.keyboardContainer.innerHTML = '';
        
        const layout = this.layouts[this.currentLayout];
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
        }
    }
    
    removeHighlight(key) {
        const keyElement = this.keyboardContainer.querySelector(`[data-key="${key}"]`);
        if (keyElement) {
            keyElement.classList.remove('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new KeyboardDisplay();
});
