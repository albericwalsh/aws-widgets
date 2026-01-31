import { loadTheme } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

export class AWSBool extends HTMLElement {
    static get observedAttributes() { return ["value", "mode", "disabled"]; }

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
        if (name === "disabled") { this._updateDisplay(); }
    }

    set value(v) { this._value = !!v; this.setAttribute("value", this._value ? "true" : "false"); }
    get value() { return this._value; }
    get mode() { return this.getAttribute("mode") || "edit"; }
    get disabled() { return this.hasAttribute('disabled'); }
    set disabled(val) { val ? this.setAttribute('disabled','') : this.removeAttribute('disabled'); }

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

            // pointer interaction
            toggle.addEventListener("click", () => {
                if (this.mode === "view" || this.disabled) return;
                this.toggleValue();
            });

            // keyboard interaction (Space / Enter)
            toggle.tabIndex = 0;
            toggle.setAttribute('role', 'switch');
            const ariaLabel = this.getAttribute('aria-label') || 'Toggle';
            toggle.setAttribute('aria-label', ariaLabel);
            toggle.addEventListener('keydown', (e) => {
                if (this.mode === 'view' || this.disabled) return;
                if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
                    e.preventDefault();
                    this.toggleValue();
                }
            });
        }
    }

    toggleValue() {
        this.value = !this.value;
        this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value }, bubbles: true, composed: true }));
        this._updateDisplay();
    }

    _updateDisplay() {
        if (!this._root) return; // Éviter les appels avant connectedCallback
        const isOn = this.value;

        const badge = this._root.querySelector(".bool-view");
        badge.textContent = isOn ? "ON" : "OFF";
        badge.className = `bool-view ${isOn ? "on" : "off"} pulse`;
        setTimeout(() => badge.classList.remove("pulse"), 350);

        const toggle = this._root.querySelector(".toggle");
        if (toggle) {
            toggle.className = `toggle ${isOn ? "on" : ""}`;
            toggle.setAttribute('aria-checked', isOn ? 'true' : 'false');
            toggle.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
            toggle.tabIndex = (this.mode === 'edit' && !this.disabled) ? 0 : -1;
        }

        badge.style.display = this.mode === "view" ? "inline-flex" : "none";
        if (badge) badge.setAttribute('aria-hidden', this.mode === 'view' ? 'false' : 'true');
        if (toggle) toggle.style.display = this.mode === "edit" ? "inline-flex" : "none";
    }
}

customElements.define("aws-bool", AWSBool);
