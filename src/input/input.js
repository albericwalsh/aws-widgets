
import { copi_btn } from "./input_utils.js";

class SP_Input extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.listeners = new Map();
        this._renderRaf = null;

        const hostCss = `:host{display:inline-block}
    .sp-input-wrapper{display:inline-flex;align-items:center;gap:8px;padding:4px 8px;border-radius:999px;background:rgba(255,255,255,0.02);border:1px solid transparent}
    .sp-input-wrapper:hover,:host([mode="edit"]) .sp-input-wrapper{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.06)}
    .sp-input-content{display:flex;align-items:center;gap:8px;min-width:80px}
    .input{flex:0 1 220px;min-width:80px;max-width:520px;padding:8px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.12);background:linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));color:#fff;font:inherit;font-size:0.95rem;outline:none}
    .input:focus{border-color:rgba(100,150,255,0.9);box-shadow:0 4px 14px rgba(100,150,255,0.08)}
    .output{padding:8px 10px;border-radius:12px;color:#fff}
    `;

        const hostHtml = `<div class="sp-input-wrapper"><div class="sp-input-content" id="root"></div></div>`;
        this.shadowRoot.innerHTML = `<style>${hostCss}</style>${hostHtml}`;
        this.isReady = true;
    }

    static get observedAttributes() {
        return ["type", "value", "mode", "disabled"];
    }

    connectedCallback() {
        // Avoid initial render here; rendering is triggered by attribute changes
        // (the demo sets attributes after insertion). This prevents duplicate
        // fragments from being appended when attributes are set sequentially.
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.isReady) return;
        if (oldValue === newValue) return;
        if (name === "value") {
            this.value = newValue;
            return;
        }
        // debounce multiple attribute changes (demo sets several attrs in sequence)
        if (this._renderRaf) cancelAnimationFrame(this._renderRaf);
        this._renderRaf = requestAnimationFrame(() => { this._renderRaf = null; this.render(); });
    }

    _getInputElement(id = "value") {
        const root = this.shadowRoot.querySelector("#root");
        if (!root) return null;
        let input = root.querySelector(`#${id}`);
        if (!input) input = root.querySelector("input, textarea, select, .output");
        return input;
    }

    get value() {
        const root = this.shadowRoot.querySelector("#root");
        if (!root) return "";
        const type = this.getAttribute("type");
        if (type === "phone" || type === "telephone") {
            const dial = root.querySelector("#dialphone")?.textContent ?? "";
            const input = root.querySelector(".input")?.value ?? "";
            return `${dial} ${input}`.trim();
        }
        if (type === "license") return root.querySelector("#value")?.getRealValue?.() ?? "";
        const el = this._getInputElement("value");
        return el?.value ?? el?.textContent ?? "";
    }

    set value(v) {
        const root = this.shadowRoot.querySelector("#root");
        if (!root) return;
        const type = this.getAttribute("type");
        if (type === "phone" || type === "telephone") {
            const dialEl = root.querySelector("#dialphone");
            const inputEl = root.querySelector(".input");
            if (dialEl && inputEl) {
                const parts = String(v || "").split(" ");
                dialEl.textContent = parts[0] || "";
                inputEl.value = parts.slice(1).join(" ") || "";
            }
            return;
        }
        if (type === "license") {
            const el = root.querySelector("#value");
            if (el?.setValue) el.setValue(v);
            return;
        }
        const el = this._getInputElement("value");
        if (!el) return;
        if ("value" in el) el.value = v;
        else el.textContent = v;
    }

    get type() {
        return this.getAttribute("type");
    }
    set type(v) {
        if (v === null || v === undefined) this.removeAttribute("type");
        else this.setAttribute("type", String(v));
    }

    get mode() {
        return this.getAttribute("mode");
    }
    set mode(v) {
        if (v === null || v === undefined) this.removeAttribute("mode");
        else this.setAttribute("mode", String(v));
    }

    get disabled() {
        return this.hasAttribute("disabled");
    }
    set disabled(v) {
        if (v) this.setAttribute("disabled", "");
        else this.removeAttribute("disabled");
    }

    async render() {
        const root = this.shadowRoot.querySelector("#root");
        if (!root) return;
        const preserved = this.value;
        root.innerHTML = "";
        const type = this.getAttribute("type") || "text";
        const rawMode = this.getAttribute("mode") || "input";
        const mode = rawMode === "edit" ? "input" : rawMode === "view" ? "output" : rawMode;
        try {
            // map 'phone' -> telephone folder
            const importPathCandidates = [];
            if (type === "phone") importPathCandidates.push("./telephone/telephone.js");
            importPathCandidates.push(`./${type}/${type}.js`);
            importPathCandidates.push(`./${type}.js`);

            // Use import.meta.glob so Vite can statically analyse available modules
            const moduleMap = Object.assign({}, import.meta.glob('./*/*.js'), import.meta.glob('./*.js'));

            let module = null;
            for (const p of importPathCandidates) {
                const loader = moduleMap[p];
                if (!loader) continue;
                try {
                    module = await loader();
                    if (module) break;
                } catch (e) {
                    // try next
                }
            }
            if (!module) throw new Error(`No module found for type=${type}`);

            const res = await module.create_element({ mode, disabled: this.hasAttribute("disabled"), value: preserved || this.getAttribute("value") || "" });
            const fragment = res?.fragment || res;
            if (fragment) root.appendChild(fragment);

            // initialize telephone-like behaviors if present
            if (type === "telephone" || type === "phone") this._initPhone(root);

            if (preserved) this.value = preserved;
        } catch (err) {
            console.error("[aws-input] render error:", err);
            root.textContent = "";
        }
    }

    _initPhone(root) {
        const selector = root.querySelector("aws-selector");
        const dial = root.querySelector("#dialphone");
        const input = root.querySelector(".input");
        if (!selector || !dial || !input) return;

        this._removeListeners(input);
        this._removeListeners(selector);

        const formatInput = () => {
            let val = input.value.replace(/\D/g, "");
            const format = input.dataset.format || "XX XX XX XX XX";
            let formatted = "";
            let i = 0;
            for (const char of format) {
                if (char === "X") {
                    if (i >= val.length) break;
                    formatted += val[i++];
                } else {
                    formatted += char;
                }
            }
            input.value = formatted;
        };

        const inputListener = () => formatInput();
        input.addEventListener("input", inputListener);
        this.listeners.set(input, inputListener);

        const selectorListener = e => {
            dial.textContent = e.detail?.value?.col2 || "";
            input.dataset.format = e.detail?.value?.format || input.dataset.format || "";
            input.value = "";
        };
        selector.addEventListener("change", selectorListener);
        this.listeners.set(selector, selectorListener);

        const copyBtn = root.querySelector("#copy");
        if (copyBtn) copi_btn(copyBtn, () => `${dial.textContent} ${input.value}`);
    }

    _removeListeners(el) {
        if (!this.listeners.has(el)) return;
        const fn = this.listeners.get(el);
        el.removeEventListener("input", fn);
        el.removeEventListener("change", fn);
        this.listeners.delete(el);
    }
}

customElements.define("aws-input", SP_Input);
export { SP_Input };
