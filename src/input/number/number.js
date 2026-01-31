import {copi_btn} from "../input_utils.js";

export async function create_element() {
    const html = await fetch("./widgets/input/number/number.html")
        .then(res => res.text());

    const template = document.createElement("template");
    template.innerHTML = html.trim();

    const fragment = template.content.cloneNode(true);

    const input = fragment.querySelector(".input");
    const copyBtn = fragment.querySelector("#copy");
    

    // Bouton "copy"
    copi_btn(copyBtn, input.value);

    return fragment;
}