import { copi_btn } from "../input_utils.js";
import { loadTheme } from "../../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

export async function create_element({ mode = 'input', value = '', disabled = false } = {}) {
    const inputHtml = `
<label class="password-wrapper">
    <input id="value" class="input" type="password" placeholder="password" ${disabled? 'disabled' : ''}>
</label>

<aws-icon-button id="toggle" size="sm">visibility</aws-icon-button>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`;

    const outputHtml = `
<div id="value" class="output">${value ? '•'.repeat(String(value).length) : ''}</div>
<aws-icon-button id="toggle" size="sm" variant="ghost">visibility</aws-icon-button>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`;

    const html = mode === 'input' ? inputHtml : outputHtml;

    const template = document.createElement("template");
    template.innerHTML = html;

    const fragment = template.content.cloneNode(true);

    try{
        const theme = await loadTheme();
        const s = document.createElement('style'); s.textContent = generateCSS(theme); fragment.prepend(s);
    }catch(e){}

    const input     = fragment.querySelector("#value");
    const toggleBtn = fragment.querySelector("#toggle");
    const copyBtn   = fragment.querySelector("#copy");

    if (mode === 'input' && !input) return fragment;

    /* ---------- TOGGLE VISIBILITY ---------- */
    if (mode === 'input' && toggleBtn) {
        // toggle button is non-destructive UI — use ghost variant
        toggleBtn.setAttribute('variant', 'ghost');
        toggleBtn.addEventListener("click", () => {
            const isHidden = input.type === "password";
            input.type = isHidden ? "text" : "password";
            toggleBtn.textContent = isHidden ? "visibility_off" : "visibility";
        });
    }

    // view mode: allow toggling visibility of the static masked value
    if (mode !== 'input' && toggleBtn) {
        const outputEl = fragment.querySelector('#value');
        let revealed = false;
        const real = String(value || '');
        toggleBtn.setAttribute('variant','ghost');
        toggleBtn.addEventListener('click', () => {
            revealed = !revealed;
            outputEl.textContent = revealed ? real : '•'.repeat(real.length);
            toggleBtn.textContent = revealed ? 'visibility_off' : 'visibility';
        });
    }

    /* ---------- COPY BUTTON ---------- */
    if (copyBtn) {
        if (mode === 'input') {
            copi_btn(copyBtn, () => input.value);
            input.addEventListener("input", () => { copi_btn(copyBtn, () => input.value); });
        } else {
            // output mode: copy static value
            copi_btn(copyBtn, () => String(value || ''));
        }
    }

    return fragment;
}
