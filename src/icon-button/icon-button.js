// src/icon-button/icon-button.js
import { loadTheme } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

export class AWSIconButton extends HTMLElement {
    static get observedAttributes() { return ["size"]; }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        this._theme = await loadTheme();
        const style = generateCSS(this._theme);

        const template = document.createElement("template");
        template.innerHTML = `
            <style>${style}</style>
            <button part="button">
                <i class="material-icons"><slot>account_circle</slot></i>
            </button>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._btn = this.shadowRoot.querySelector("button");

        this._syncSize();
    }

    attributeChangedCallback() {
        this._syncSize();
    }

    _syncSize() {
        if (!this._btn || !this._theme) return;

        const sizes = this._theme.widgets.iconButton.sizes;
        let size = this.getAttribute("size") || "md";

        let px;
        if (sizes[size]) {
            px = sizes[size];
        } else {
            px = parseInt(size);
            if (isNaN(px)) px = sizes.md;
        }

        this.style.setProperty("--btn-size", `${px}px`);
    }
}

customElements.define("aws-icon-button", AWSIconButton);
