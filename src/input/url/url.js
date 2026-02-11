import { copi_btn } from "../input_utils.js";
import { loadTheme } from "../../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

export async function create_element({ mode = 'input', value = '', disabled = false } = {}) {
    const inputHtml = `
<div id="favicon" class="favicon"><span class="fallback-emoji">🌐</span></div>
<label>
    <input id="value"
           class="input"
           type="url"
           placeholder="https://example.com" ${disabled? 'disabled' : ''}>
</label>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`;

    const outputHtml = `
<div id="favicon" class="favicon"><span class="fallback-emoji">🌐</span></div>
<div id="value" class="output">${String(value || '')}</div>
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

    const input   = fragment.querySelector("#value");
    const favicon = fragment.querySelector("#favicon");
    const copyBtn = fragment.querySelector("#copy");

    /* ---------- FAVICON HANDLING ---------- */
    function updateFavicon(url) {
        // if valid URL, show Google's favicon service; otherwise show default material icon
        try {
            const u = new URL(url);
            // create or update img inside favicon container
            favicon.innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${u.hostname}&sz=64" alt="favicon">`;
            favicon.classList.remove('no-favicon');
        } catch {
                // show default globe emoji as fallback (reliable rendering)
                favicon.innerHTML = `<span class="fallback-emoji">🌐</span>`;
                favicon.classList.add('no-favicon');
        }
    }

    if (mode === 'input') {
        if (input) {
            input.addEventListener("input", () => {
                updateFavicon(input.value);
                if (copyBtn) copi_btn(copyBtn, () => input.value);
            });
        }
        if (copyBtn) copi_btn(copyBtn, () => input?.value ?? "");
    } else {
        // output mode: show favicon for provided value and copy static value
        updateFavicon(value || '');
        if (copyBtn) copi_btn(copyBtn, () => String(value || ''));
    }

    return fragment;
}
