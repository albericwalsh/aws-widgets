// src/icon-button/icon-button.js
import { loadTheme } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

export class AWSIconButton extends HTMLElement {
    static get observedAttributes() { return ["size", "disabled", "aria-label", "variant"]; }

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
            <button part="button" type="button">
                <i class="material-icons"><slot>account_circle</slot></i>
            </button>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._btn = this.shadowRoot.querySelector("button");

        this._syncSize();
        this._applyAttributes();
    }

    attributeChangedCallback(name) {
        if (name === 'size') this._syncSize();
        if (name === 'disabled' || name === 'aria-label' || name === 'variant') this._applyAttributes();
    }

    _applyAttributes() {
        if (!this._btn) return;
        // propagate disabled to inner button
        const isDisabled = this.hasAttribute('disabled');
        this._btn.disabled = isDisabled;
        if (isDisabled) {
            this._btn.setAttribute('aria-disabled', 'true');
        } else {
            this._btn.removeAttribute('aria-disabled');
        }

        // propagate aria-label if present
        const al = this.getAttribute('aria-label');
        if (al) this._btn.setAttribute('aria-label', al); else this._btn.removeAttribute('aria-label');

        // propagate variant and size as data-attributes for styling
        const variant = this.getAttribute('variant') || 'primary';
        this._btn.dataset.variant = variant;
        const sizeAttr = this.getAttribute('size') || 'md';
        this._btn.dataset.size = sizeAttr;
        // ensure cursor updates immediately
        this._btn.style.cursor = this._btn.disabled ? 'not-allowed' : 'pointer';
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
