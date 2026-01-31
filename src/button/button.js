// src/button/button.js
import { loadTheme } from "../utils/theme.js";
import {generateCSS} from "./generateCSS.js";

export class AWSButton extends HTMLElement {
    static get observedAttributes() { return ["disabled", "variant", "type", "size", "aria-label"]; }

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
            <button class="btn" part="button">
                <span class="icon"><slot name="icon"></slot></span>
                <span class="text"><slot></slot></span>
            </button>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._btn = this.shadowRoot.querySelector("button");
        this._textEl = this.shadowRoot.querySelector('.text');

        this._btn.addEventListener("click", e => {
            if (this.disabled) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            this.dispatchEvent(new Event("click", { bubbles: true }));
        });

        this._syncAll();
    }

    attributeChangedCallback() { this._syncAll(); }

    get disabled() { return this.hasAttribute("disabled"); }
    set disabled(val) { val ? this.setAttribute("disabled", "") : this.removeAttribute("disabled"); }

    _syncAll() {
        if (!this._btn) return;
        this._btn.disabled = this.disabled;
        this._btn.type = this.getAttribute("type") || "button";
        this._btn.setAttribute("data-variant", this.getAttribute("variant") || "primary");
        this._btn.setAttribute("data-size", this.getAttribute("size") || "md");

        // Note: icon presentation is left to the user via slot (do not manage here)

        // aria label passthrough (if provided)
        const aria = this.getAttribute('aria-label');
        if (aria) this._btn.setAttribute('aria-label', aria);

        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }
}

customElements.define("aws-button", AWSButton);
