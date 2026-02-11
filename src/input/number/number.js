import {copi_btn} from "../input_utils.js";
import { loadTheme } from "../../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

export async function create_element({ mode = 'input', value = '', disabled = false } = {}) {
    const inputHtml = `
<label>
    <input id="value" class="input" type="number" placeholder="number" ${disabled? 'disabled' : ''}/>
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

    try{
        const theme = await loadTheme();
        const s = document.createElement('style'); s.textContent = generateCSS(theme); fragment.prepend(s);
    }catch(e){}


    const input = fragment.querySelector(".input");
    const copyBtn = fragment.querySelector("#copy");

    if (mode === 'input') {
        // Bouton "copy" — read live value
        copi_btn(copyBtn, () => input.value);
    } else {
        // output mode — copy static value
        copi_btn(copyBtn, () => String(value || ''));
    }

    return fragment;
}