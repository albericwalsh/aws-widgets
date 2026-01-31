import { load_file } from "../utils.js";
import { copi_btn } from "./input_utils.js";

class SP_Input extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.listeners = new Map(); // Pour détacher proprement les listeners

        const htmlUrl = "./widgets/input/input.html";
        const cssUrl  = "./widgets/input/input.css";

        this.ready = load_file("SP_Input", htmlUrl, cssUrl, this.shadow)
            .then(() => {
                this.isReady = true;
                this.render(); // premier rendu
            });
    }

    static get observedAttributes() {
        return ["type", "value"];
    }

    connectedCallback() {
        if (this.isReady) this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.isReady) return;

        // Si c'est le type, rerender complet
        if (name === "type" && oldValue !== newValue) {
            this.render();
        }

        // Si c'est la valeur, mettre à jour le setter
        if (name === "value" && oldValue !== newValue) {
            this.value = newValue;
        }
    }

    // Retourne l'élément input réel
    _getInputElement(id = "value") {
        const root = this.shadow.getElementById("root");
        if (!root) return null;

        let input = root.querySelector(`#${id}`);
        if (!input) input = root.querySelector("input, textarea, select, .output");
        return input;
    }

    get value() {
        const root = this.shadow.getElementById("root");
        if (!root) return "";

        const type = this.getAttribute("type");
        if (type === "phone") {
            const dial = root.querySelector("#dialphone")?.textContent ?? "";
            const input = root.querySelector(".input")?.value ?? "";
            return `${dial} ${input}`.trim();
        }

        if (type === "license") {
            return root.querySelector("#value")?.getRealValue?.() ?? "";
        }

        const el = this._getInputElement("value");
        return el?.value ?? el?.textContent ?? "";
    }

    set value(v) {
        const root = this.shadow.getElementById("root");
        if (!root) return;

        const type = this.getAttribute("type");
        if (type === "phone") {
            const dialEl = root.querySelector("#dialphone");
            const inputEl = root.querySelector(".input");
            if (dialEl && inputEl) {
                const parts = v.split(" ");
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

    async render() {
        await this.ready;
        const root = this.shadow.getElementById("root");
        if (!root) return;

        // Préserver les valeurs existantes
        const currentValue = this.value;

        root.innerHTML = ""; // vider le contenu

        const type = this.getAttribute("type") || "text";
        let module;
        let fragment;

        try {
            switch (type) {
                case "phone":
                    module = await import("./telephone/telephone.js");
                    ({ fragment } = await module.create_element());
                    root.appendChild(fragment);
                    this._initPhone(root);
                    break;

                case "email":
                    module = await import("./email/email.js");
                    fragment = await module.create_element();
                    root.appendChild(fragment);
                    break;

                case "number":
                    module = await import("./number/number.js");
                    fragment = await module.create_element();
                    root.appendChild(fragment);
                    break;

                case "password":
                    module = await import("./password/password.js");
                    fragment = await module.create_element();
                    root.appendChild(fragment);
                    break;

                case "url":
                    module = await import("./url/url.js");
                    fragment = await module.create_element();
                    root.appendChild(fragment);
                    break;

                case "date":
                    module = await import("./date/date.js");
                    fragment = await module.create_element();
                    root.appendChild(fragment);
                    break;

                case "license":
                    module = await import("./license/license.js");
                    fragment = await module.create_element();
                    root.appendChild(fragment);
                    break;

                case "text":
                default:
                    module = await import("./text/text.js");
                    fragment = await module.create_element({
                        mode: this.getAttribute("mode") || "input",
                        value: currentValue || this.getAttribute("value") || ""
                    });
                    root.appendChild(fragment);
                    break;
            }

            // Restaurer la valeur si nécessaire
            if (currentValue) this.value = currentValue;

        } catch (err) {
            console.error("Erreur lors du render de SP_Input:", err);
        }
    }

    _initPhone(root) {
        const selector = root.querySelector("sp-selector");
        const dial = root.querySelector("#dialphone");
        const input = root.querySelector(".input");

        if (!selector || !dial || !input) return;

        // Supprimer anciens listeners
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
            dial.textContent = e.detail.value.col2;
            input.dataset.format = e.detail.value.format;
            input.value = "";
        };
        selector.addEventListener("change", selectorListener);
        this.listeners.set(selector, selectorListener);

        // Copy button
        const copyBtn = root.querySelector("#copy");
        if (copyBtn) {
            copi_btn(copyBtn, () => `${dial.textContent} ${input.value}`);
        }

        // Initialisation du format
        if (selector.value) input.dataset.format = selector.value.format;
    }

    _removeListeners(el) {
        if (!this.listeners.has(el)) return;
        el.removeEventListener("input", this.listeners.get(el));
        el.removeEventListener("change", this.listeners.get(el));
        this.listeners.delete(el);
    }
}

customElements.define("sp-input", SP_Input);
