import { copi_btn } from "../input_utils.js";

export async function create_element() {
    const html = await fetch(new URL("./license.html", import.meta.url).href)
        .then(res => res.text());

    const template = document.createElement("template");
    template.innerHTML = html;
    const fragment = template.content.cloneNode(true);

    const input  = fragment.querySelector("#value");
    const copy   = fragment.querySelector("#copy");
    const toggle = fragment.querySelector("#toggle");

    let visible   = false;
    let realValue = ""; // 🔑 vraie licence sans tirets

    /* ==========================
       FORMAT VISUEL
    ========================== */
    const format = (v) =>
        (v.match(/.{1,4}/g) || []).join("-");

    const mask = () => "XXXX-XXXX-XXXX";

    /* ==========================
       INPUT
    ========================== */
    input.addEventListener("input", () => {
        realValue = input.value
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .slice(0, 12);

        if (visible) {
            input.value = format(realValue);
        } else {
            input.value = mask();
        }
    });

    /* ==========================
       TOGGLE VISIBILITÉ
    ========================== */
    toggle.addEventListener("click", () => {
        visible = !visible;
        toggle.textContent = visible
            ? "visibility_off"
            : "visibility";

        input.value = visible
            ? format(realValue)
            : mask();
    });

    /* ==========================
       COPY → vraie valeur
    ========================== */
    copi_btn(copy, () => realValue);

    // état initial
    input.value = mask();
    input.autocomplete = "off";

    return fragment;
}
