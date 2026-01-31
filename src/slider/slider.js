import { loadTheme } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

export class AWSSlider extends HTMLElement {
    static get observedAttributes() {
        return ["min", "max", "value", "step"];
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
                detail: { value: this._input.value },
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
        this._input.step = this.getAttribute("step") ?? 1;
        this._input.value = this.getAttribute("value") ?? 50;
    }

    get value() {
        return Number(this.getAttribute("value"));
    }

    set value(v) {
        this.setAttribute("value", v);
    }
}

customElements.define("aws-slider", AWSSlider);
