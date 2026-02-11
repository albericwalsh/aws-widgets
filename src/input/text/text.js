import { copi_btn } from "../input_utils.js";
import { loadTheme } from "../../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

export async function create_element({ mode = "input", value = "" } = {}) {
    const inputHtml = `
<label>
    <input id="value" class="input" type="text" placeholder="text">
</label>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`;

    const outputHtml = `
<div id="value" class="output">Valeur affichée</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`;

    const html = mode === "input" ? inputHtml : outputHtml;

    const template = document.createElement("template");
    template.innerHTML = html;
    const fragment = template.content.cloneNode(true);

    // inject themed css
    try {
        const theme = await loadTheme();
        const s = document.createElement("style");
        s.textContent = generateCSS(theme);
        fragment.prepend(s);
    } catch (e) {}

    const el = fragment.querySelector("#value");
    if (mode === "input") el.value = value;
    else el.textContent = value;

    const copyBtn = fragment.querySelector("#copy");
    copi_btn(copyBtn, () => (mode === "input" ? el.value : el.textContent));

    return fragment;
}
