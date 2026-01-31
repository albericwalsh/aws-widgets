import {copi_btn} from "../input_utils.js";

export async function create_element() {
    const html = await fetch("./widgets/input/email/email.html")
        .then(res => res.text());

    const template = document.createElement("template");
    template.innerHTML = html.trim();

    const fragment = template.content.cloneNode(true);

    const input = fragment.querySelector(".input");
    const sendBtn = fragment.querySelector("#send");
    const copyBtn = fragment.querySelector("#copy");

    // Validation simple : *@*.* (pattern HTML)
    input.setAttribute("pattern", ".+@.+\\..+");

    // Bouton "send mail"
    sendBtn.addEventListener("click", () => {
        if (input.value && input.checkValidity()) {
            window.location.href = `mailto:${input.value}`;
        } else {
            input.focus();
            input.reportValidity();
        }
    });

    // Bouton "copy"
    copi_btn(copyBtn, input.value);

    return fragment;
}
