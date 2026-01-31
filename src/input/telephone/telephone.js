export async function create_element() {
    const html = await fetch(new URL("./telephone.html", import.meta.url).href)
        .then(res => res.text());

    const template = document.createElement("template");
    template.innerHTML = html.trim();
    const fragment = template.content.cloneNode(true);

    // Ajouter le selector
    const container = fragment.querySelector("#selector-container");
    let selector = null;

    if (container) {
        await import("../../selector/selector.js");

        selector = document.createElement("sp-selector");
        container.appendChild(selector);

        selector.list = [
            { col1: "🇫🇷", col2: "+33", col3: "France", format: "XX XX XX XX XX" },
            { col1: "🇬🇧", col2: "+44", col3: "Grande-Bretagne", format: "XXXX XXX XXX" },
            { col1: "🇺🇸", col2: "+1",  col3: "USA", format: "(XXX) XXX-XXXX" },
            { col1: "🇩🇪", col2: "+49", col3: "Allemagne", format: "XXXX XXXXXXX" },
            // ... ajouter les autres pays ici
        ];

        selector.displayKey = "col1";
        selector.value = selector.list[0];
    }

    // Retourne le fragment ET le selector pour que SP_Input puisse faire le binding
    return { fragment, selector };
}
