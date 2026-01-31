import { loadTheme } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

export class AWSTitle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        const theme = await loadTheme();
        const style = generateCSS(theme);

        const template = document.createElement("template");
        template.innerHTML = `
            <style>${style}</style>
            <h1 class="widget-title"><slot></slot></h1>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define("aws-title", AWSTitle);
