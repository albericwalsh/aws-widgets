import { loadTheme } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

export class AWSBool extends HTMLElement {
    static get observedAttributes() { return ["value", "mode"]; }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._value = this.getAttribute("value") === "true";
    }

    async connectedCallback() {
        const theme = await loadTheme();
        const style = generateCSS(theme);

        const template = document.createElement("template");
        template.innerHTML = `
            <style>${style}</style>
            <div id="root" class="bool-wrapper"></div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._root = this.shadowRoot.querySelector("#root");
        this._initDom();
        this._updateDisplay();
    }

    attributeChangedCallback(name, oldV, newV) {
        if (name === "value") { this._value = newV === "true"; this._updateDisplay(); }
        if (name === "mode") { this._updateDisplay(); }
    }

    set value(v) { this._value = !!v; this.setAttribute("value", this._value ? "true" : "false"); }
    get value() { return this._value; }
    get mode() { return this.getAttribute("mode") || "edit"; }

    _initDom() {
        // VIEW badge
        if (!this._root.querySelector(".bool-view")) {
            const badge = document.createElement("div");
            badge.className = "bool-view";
            this._root.appendChild(badge);
        }

        // EDIT toggle
        if (!this._root.querySelector(".toggle")) {
            const toggle = document.createElement("div");
            toggle.className = "toggle";
            const thumb = document.createElement("div");
            thumb.className = "thumb";
            toggle.appendChild(thumb);
            this._root.appendChild(toggle);

            toggle.addEventListener("click", () => {
                if (this.mode === "view") return;
                this.value = !this.value;
                this.dispatchEvent(new CustomEvent("change", {
                    detail: { value: this.value },
                    bubbles: true,
                    composed: true
                }));
                this._updateDisplay();
            });
        }
    }

    _updateDisplay() {
        if (!this._root) return; // Éviter les appels avant connectedCallback
        const isOn = this.value;

        const badge = this._root.querySelector(".bool-view");
        badge.textContent = isOn ? "ON" : "OFF";
        badge.className = `bool-view ${isOn ? "on" : "off"} pulse`;
        setTimeout(() => badge.classList.remove("pulse"), 350);

        const toggle = this._root.querySelector(".toggle");
        toggle.className = `toggle ${isOn ? "on" : ""}`;

        badge.style.display = this.mode === "view" ? "inline-flex" : "none";
        toggle.style.display = this.mode === "edit" ? "inline-flex" : "none";
    }
}

customElements.define("aws-bool", AWSBool);
