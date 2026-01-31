import { copi_btn } from "../input_utils.js";

export async function create_element() {
    const html = await fetch("./widgets/input/password/password.html")
        .then(res => res.text());

    const template = document.createElement("template");
    template.innerHTML = html;

    const fragment = template.content.cloneNode(true);

    const input     = fragment.querySelector("#value");
    const toggleBtn = fragment.querySelector("#toggle");
    const copyBtn   = fragment.querySelector("#copy");

    if (!input) return fragment;

    /* ---------- TOGGLE VISIBILITY ---------- */
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const isHidden = input.type === "password";
            input.type = isHidden ? "text" : "password";
            toggleBtn.textContent = isHidden ? "visibility_off" : "visibility";
        });
    }

    /* ---------- COPY BUTTON ---------- */
    if (copyBtn) {
        copi_btn(copyBtn, input.value);
        input.addEventListener("input", () => {
            copi_btn(copyBtn, input.value);
        });
    }

    return fragment;
}
