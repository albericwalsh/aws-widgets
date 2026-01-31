import { copi_btn } from "../input_utils.js";

export async function create_element() {
    const html = await fetch(new URL("./url.html", import.meta.url).href)
        .then(res => res.text());

    const template = document.createElement("template");
    template.innerHTML = html;

    const fragment = template.content.cloneNode(true);

    const input   = fragment.querySelector("#value");
    const favicon = fragment.querySelector("#favicon");
    const copyBtn = fragment.querySelector("#copy");

    /* ---------- FAVICON HANDLING ---------- */
    function updateFavicon(url) {
        try {
            const u = new URL(url);
            favicon.src = `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=64`;
            favicon.style.opacity = "1";
        } catch {
            favicon.style.opacity = "0";
        }
    }

    if (input) {
        input.addEventListener("input", () => {
            updateFavicon(input.value);
            if (copyBtn) copi_btn(copyBtn, input.value);
        });
    }

    /* ---------- COPY BUTTON ---------- */
    if (copyBtn) {
        copi_btn(copyBtn, input?.value ?? "");
    }

    return fragment;
}
