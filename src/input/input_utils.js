// widgets/input/input_utils.js

/**
 * Copie le texte dans le presse-papier.
 * @param {string} text
 */
export function copyToClipboard(text) {
    if (!navigator.clipboard) {
        // fallback ancien navigateur
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            document.execCommand("copy");
        } catch (err) {
            console.error("Copy failed", err);
        }
        document.body.removeChild(textarea);
        return;
    }

    navigator.clipboard.writeText(text).catch(err => {
        console.error("Copy failed", err);
    });
}

/**
 * Retourne le flag emoji pour un code pays donné.
 * @param {int} countryCode - Code pays (ex: "33")
 * @returns {string} - Emoji du drapeau
 */
export async function getFlagEmoji(countryCode) {
    const code = input.replace('+', '').slice(0, 3); // on récupère les premiers chiffres

    const res = await fetch('https://restcountries.com/v3.1/all');
    const countries = await res.json();

    const country = countries.find(c => c.idd.root && input.startsWith(c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : '')));

    if(country){
        document.getElementById('result').innerHTML = `
            <img src="${country.flags.svg}" width="50" alt="flag">
            <span>${country.name.common}</span>
        `;
    } else {
        document.getElementById('result').textContent = "Pays non trouvé";
    }
}

export function copi_btn(copyBtn, value) {
    copyBtn.addEventListener("click", async () => {
        if (!value) return;
        try {
            await navigator.clipboard.writeText(value);
            copyBtn.classList.add("copied");
            setTimeout(() => copyBtn.classList.remove("copied"), 700);
        } catch (err) {
            console.error("Erreur copie:", err);
        }
    });
}
