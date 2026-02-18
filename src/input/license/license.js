import { copi_btn } from "../input_utils.js";
import { loadTheme } from "../../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

export async function create_element({ mode = 'input', value = '', disabled = false } = {}) {
    const inputHtml = `
<label for="value"></label>
<input
        id="value"
        class="input"
        type="text"
        placeholder="XXXX-XXXX-XXXX"
        autocomplete="off"
        ${disabled? 'disabled' : ''}
/> 

<!-- toggle affichage -->
<aws-icon-button id="toggle" size="sm" variant="ghost">visibility</aws-icon-button>

<!-- copy -->
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`;

    const outputHtml = `
<div id="value" class="output">${String(value ? (String(value).toUpperCase().replace(/[^A-Z0-9]/g, '').match(/.{1,4}/g)||[]).join('-') : 'XXXX-XXXX-XXXX')}</div>
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

    const input  = fragment.querySelector("#value");
    const copy   = fragment.querySelector("#copy");
    const toggle = fragment.querySelector("#toggle");

    let visible   = false;
    let realValue = ""; // vraie licence sans tirets
    // initialize from provided value when present
    try {
        if (value) {
            realValue = String(value).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
        }
    } catch (e) {}
    const format = (v) => (v.match(/.{1,4}/g) || []).join("-");
    const mask = () => "XXXX-XXXX-XXXX";

    /* INPUT */
    if (mode === 'input') {
        input.addEventListener("input", () => {
            realValue = input.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "")
                .slice(0, 12);

            if (visible) input.value = format(realValue);
            else input.value = mask();
        });
    }

    /* TOGGLE */
    if (toggle) {
        toggle.addEventListener("click", () => {
            visible = !visible;
            toggle.textContent = visible ? "visibility_off" : "visibility";
            input.value = visible ? format(realValue) : mask();
        });
    }

    /* COPY → vraie valeur */
    if (mode === 'input') {
        copi_btn(copy, () => realValue);
        // état initial (respecter valeur initiale passée): afficher la valeur formatée si fournie
        input.value = realValue ? format(realValue) : mask();
        input.autocomplete = "off";
    } else {
        // output mode: copy static formatted or real value
        const formatted = value ? (String(value).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0,12).match(/.{1,4}/g)||[]).join('-') : mask();
        if (copy) copi_btn(copy, () => String(value || ''));
        // ensure output div exists (it does) — nothing else to init
    }

    return fragment;
}
