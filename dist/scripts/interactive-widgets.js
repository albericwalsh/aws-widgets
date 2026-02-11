/**
 * Fonction générique pour créer un widget interactif
 * @param {Object} config - Configuration du widget
 * @param {string} config.codeDisplayId - ID de l'élément où afficher le code
 * @param {string} config.previewId - ID de l'élément pour la preview
 * @param {Object} config.controls - Objets avec les sélecteurs et les noms des contrôles
 * @param {Function} config.generateCode - Fonction qui génère le code HTML
 * @param {Function} config.generatePreview - Fonction qui génère le HTML de preview
 */
function createInteractiveWidget(config) {
    const { codeDisplayId, previewId, controls, generateCode, generatePreview } = config;
    
    const codeDisplay = document.getElementById(codeDisplayId);
    const preview = document.getElementById(previewId);
    
    if (!codeDisplay || !preview) {
        console.error('Code display or preview element not found');
        return;
    }
    
    // Récupérer tous les contrôles basés sur la config
    const controlElements = {};
    Object.keys(controls).forEach(key => {
        const selector = controls[key];
        const element = document.querySelector(selector);
        if (element) {
            controlElements[key] = element;
        }
    });
    
    // Fonction de mise à jour
    function update() {
        // Récupérer les valeurs actuelles
        const values = {};
        Object.keys(controlElements).forEach(key => {
            const element = controlElements[key];
            if (element.type === 'checkbox') {
                values[key] = element.checked;
            } else {
                values[key] = element.value;
            }
        });
        
        // Générer le code
        const code = generateCode(values);
        codeDisplay.textContent = code;
        try { if (hljs && codeDisplay) { try { delete codeDisplay.dataset.highlighted; } catch(e){}; hljs.highlightElement(codeDisplay); } } catch(e) {}
        
        // Générer la preview
        const html = generatePreview(values);
        preview.innerHTML = html;
    }
    
    // Ajouter les événements à tous les contrôles
    Object.values(controlElements).forEach(element => {
        element.addEventListener('input', update);
        element.addEventListener('change', update);
    });
    
    // Initialisation
    update();
}

// Initialiser les widgets au chargement
document.addEventListener('DOMContentLoaded', () => {
    // Highlight code blocks statiques
    document.querySelectorAll('pre code').forEach((block) => {
        try { if (block.querySelector && block.querySelector('*')) block.textContent = block.textContent; } catch(e){}
        try { delete block.dataset.highlighted; } catch(e){}
        try { hljs.highlightElement(block); } catch(e){}
    });
    
    // Bouton context
    const contextBtn = document.getElementById("openContext");
    if (contextBtn) {
        contextBtn.addEventListener("click", () => {
            document.getElementById("myContext").open();
        });
    }
});
