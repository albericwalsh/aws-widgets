import { loadTheme } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";
import { normalizeStep, readNumber } from "../utils/field_helpers.js";

export class AWSSlider extends HTMLElement {
    static get observedAttributes() {
        return ["min", "max", "value", "step", "disabled"];
    }

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
            <input type="range" />
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._input = this.shadowRoot.querySelector("input");

        this._sync();

        this._input.addEventListener("input", () => {
            this.setAttribute("value", this._input.value);
            this.dispatchEvent(new CustomEvent("change", {
                detail: { value: readNumber(this._input.value) },
                bubbles: true,
                composed: true
            }));
        });
    }

    attributeChangedCallback() {
        this._sync();
    }

    _sync() {
        if (!this._input) return;
        this._input.min = this.getAttribute("min") ?? 0;
        this._input.max = this.getAttribute("max") ?? 100;
        // normalize step: if missing or 0 => 'any' (continuous)
        this._input.step = normalizeStep(this.getAttribute("step"));
        this._input.value = this.getAttribute("value") ?? 50;
        // disabled handling
        const isDisabled = this.hasAttribute('disabled');
        this._input.disabled = isDisabled;
        this._input.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
    }

    get value() {
        // prefer the live input value when available
        if (this._input) return readNumber(this._input.value);
        return readNumber(this.getAttribute("value"));
    }

    set value(v) {
        this.setAttribute("value", v);
    }

    // Convenience method used by demo and other code to read current numeric value
    getValue() {
        return this.value;
    }
}

customElements.define("aws-slider", AWSSlider);
