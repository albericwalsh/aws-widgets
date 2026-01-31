import { copi_btn } from "../input_utils.js";

export async function create_element({ mode = "input", value = "" } = {}) {
    const htmlFile = mode === "input" ? "text-input.html" : "text-output.html";

    const html = await fetch(new URL(`./${htmlFile}`, import.meta.url).href)
        .then(res => res.text());

    const template = document.createElement("template");
    template.innerHTML = html;
    const fragment = template.content.cloneNode(true);

    const el = fragment.querySelector("#value");
    if (mode === "input") {
        el.value = value;
    } else {
        el.textContent = value;
    }

    const copyBtn = fragment.querySelector("#copy");
    copi_btn(copyBtn, () => mode === "input" ? el.value : el.textContent);

    return fragment;
}
