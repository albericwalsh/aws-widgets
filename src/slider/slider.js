import { loadTheme } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";
import { normalizeStep, readNumber } from "../utils/field_helpers.js";

export class AWSSlider extends HTMLElement {
    static get observedAttributes() {
        return ["min", "max", "value", "step", "disabled", "mode"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._valueDisplay = null;
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
        // apply mode state initially
        this._applyModeState();

        this._input.addEventListener("input", () => {
            this.setAttribute("value", this._input.value);
            this.dispatchEvent(new CustomEvent("change", {
                detail: { value: readNumber(this._input.value) },
                bubbles: true,
                composed: true
            }));
            if(this._valueDisplay) this._valueDisplay.textContent = this._input.value;
        });
    }

    attributeChangedCallback() {
        this._sync();
        this._applyModeState();
    }

    _sync() {
        if (!this._input) return;
        this._input.min = this.getAttribute("min") ?? 0;
        this._input.max = this.getAttribute("max") ?? 100;
        // normalize step: if missing or 0 => 'any' (continuous)
        this._input.step = normalizeStep(this.getAttribute("step"));
        this._input.value = this.getAttribute("value") ?? 50;
        if(this._valueDisplay) this._valueDisplay.textContent = this._input.value;
        // disabled handling
        const isDisabled = this.hasAttribute('disabled');
        this._input.disabled = isDisabled;
        this._input.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
    }

    _applyModeState(){
        if(!this._input) return;
        const mode = this.getAttribute('mode') || 'edit';
        if(mode === 'view'){
            // make non-interactive in view mode
            this._input.disabled = true;
            this._input.style.pointerEvents = 'none';
            this._input.style.cursor = 'default';
            // hide input visually and show a value display
            try{ this._input.style.display = 'none'; }catch(e){}
            if(!this._valueDisplay){
                this._valueDisplay = document.createElement('div');
                this._valueDisplay.className = 'aws-slider-value';
                this._valueDisplay.textContent = this._input.value;
                this.shadowRoot.appendChild(this._valueDisplay);
            }
            // do not modify the attribute here to avoid recursive attributeChangedCallback
        }else{
            // restore editable behavior (unless disabled)
            const isDisabled = this.hasAttribute('disabled');
            this._input.disabled = !!isDisabled;
            this._input.style.pointerEvents = '';
            this._input.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
            try{ this._input.style.display = ''; }catch(e){}
            if(this._valueDisplay){ try{ this._valueDisplay.remove(); }catch(e){} this._valueDisplay = null; }
            // do not modify the attribute here to avoid recursive attributeChangedCallback
        }
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
