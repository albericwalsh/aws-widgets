import {copi_btn} from "../input_utils.js";
import { loadTheme } from "../../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

export async function create_element({ mode = 'input', value = '', disabled = false } = {}) {
    const inputHtml = `
<label>
    <input id="value" class="input" type="email" placeholder="email@example.com" ${disabled? 'disabled' : ''}/>
</label>
<aws-icon-button id="send" size="sm">mail</aws-icon-button>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`;

    const outputHtml = `
<div id="value" class="output">${String(value || '')}</div>
<aws-icon-button id="send" size="sm" variant="ghost">mail</aws-icon-button>
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
    const sendBtn = fragment.querySelector("#send");
    const copyBtn = fragment.querySelector("#copy");

    // Validation simple : *@*.* (pattern HTML)
    if (mode === 'input' && input) input.setAttribute("pattern", ".+@.+\\..+");

    // Bouton "send mail" — available in both modes; use input value or static value
    if (sendBtn) {
        sendBtn.setAttribute('variant', 'ghost');
        sendBtn.addEventListener("click", () => {
            const target = (mode === 'input' ? input?.value : String(value || '')) || '';
            if (target) {
                window.location.href = `mailto:${target}`;
            }
        });
    }

    // Bouton "copy"
    if (mode === 'input') copi_btn(copyBtn, () => input?.value ?? "");
    else copi_btn(copyBtn, () => String(value || ''));

    return fragment;
}
