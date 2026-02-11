export async function create_element({ mode = 'input', value = '', disabled = false } = {}) {
    const inputHtml = `
<div id="selector-container"></div>
<span id="dialphone" class="phone-dial">+33</span>
<label>
    <input id="value" class="input" type="text" placeholder="Téléphone" ${disabled? 'disabled' : ''}>
</label>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`;

    const outputHtml = `
<div id="value" class="output">${String(value || '')}</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`;

    const html = mode === 'input' ? inputHtml : outputHtml;

    const template = document.createElement("template");
    template.innerHTML = html.trim();
    const fragment = template.content.cloneNode(true);

    // Ajouter le selector
    const container = fragment.querySelector("#selector-container");
    let selector = null;

    if (mode === 'input' && container) {
            await import("../../selector/selector.js");

            selector = document.createElement("aws-selector");
            // build options in the order: Flag - Country (code)
            const items = [
                { flag: "🇫🇷", code: "+33", country: "France", format: "XX XX XX XX XX" },
                { flag: "🇬🇧", code: "+44", country: "Grande-Bretagne", format: "XXXX XXX XXX" },
                { flag: "🇺🇸", code: "+1",  country: "USA", format: "(XXX) XXX-XXXX" },
                { flag: "🇩🇪", code: "+49", country: "Allemagne", format: "XXXX XXXXXXX" },
            ];

            for (const it of items) {
                const opt = document.createElement('aws-option');
                opt.setAttribute('data-id', it.code);
                opt.innerHTML = `${it.flag} ${it.country} (${it.code})`;
                // store format info on the option for later use
                opt.dataset.format = it.format;
                selector.appendChild(opt);
            }

            // select first option
            const first = selector.querySelector('aws-option');
            if (first) first.setAttribute('selected','');

            container.appendChild(selector);
    }

    // Return fragment and selector (selector may be null in output mode)
    return { fragment, selector };
}
