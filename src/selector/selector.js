import { loadFile } from "../utils/load_file.js";

class SP_selector extends HTMLElement {
    static get observedAttributes() { return ["value", "displaykey", "zindex"]; }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this._list = [
            { col1: "Apple", col2: "Red", col3: "Fruit" },
            { col1: "Banana", col2: "Yellow", col3: "Fruit" },
            { col1: "Cherry", col2: "Red", col3: "Fruit" }
        ];
        this._value = this._list[0];
        this._displayKey = "col1";
        this._zindex = 9999;
        this._dropdown = null;
        this._selected = null;
        this._optionsContainer = null;

        const htmlUrl = new URL("./selector.html", import.meta.url).href;
        const cssUrl  = new URL("./selector.css", import.meta.url).href;
        loadFile(htmlUrl, cssUrl, this.shadowRoot);
    }

    connectedCallback() {
        this._waitForRoot().then(() => {
            this._initDom();
            this._renderOptions();
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "displaykey") {
            this._displayKey = newValue || "col1";
            if (this._selected) this._selected.textContent = this._value[this._displayKey];
        }
        if (name === "zindex") {
            this._zindex = parseInt(newValue) || 9999;
            if (this._optionsContainer) this._optionsContainer.style.zIndex = this._zindex;
        }
    }

    _waitForRoot() {
        return new Promise(resolve => {
            const check = () => {
                if (this.shadowRoot.querySelector("#root")) resolve();
                else requestAnimationFrame(check);
            };
            check();
        });
    }

    _initDom() {
        const root = this.shadowRoot.querySelector("#root");
        if (!root) return;

        if (!root.querySelector(".dropdown")) {
            // Container principal
            this._dropdown = document.createElement("div");
            this._dropdown.className = "dropdown";

            // Bouton sélection
            this._selected = document.createElement("div");
            this._selected.className = "selected";
            this._selected.textContent = this._value[this._displayKey];
            this._dropdown.appendChild(this._selected);

            // Container pour options avec shadow root
            this._optionsContainer = document.createElement("div");
            const shadowOptions = this._optionsContainer.attachShadow({ mode: "open" });
            shadowOptions.innerHTML = `
<style>
.options {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    border-radius: 20px;
    background: rgba(30,60,114,0.9);
    backdrop-filter: blur(12px);
    max-height: 20rem;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    transition: opacity 0.2s ease, transform 0.2s ease;
    z-index: ${this._zindex};
    width: max-content;
    min-width: 100%;
}
.options.hidden { display: none; }
.dropdown-item {
    display: grid;
    grid-auto-columns: max-content; /* chaque colonne prend la taille max de son contenu */
    grid-auto-flow: column;         /* disposition en colonnes */
    gap: 16px;                      /* espace entre colonnes */
    padding: 10px 16px;
    color: white;
    cursor: pointer;
    transition: background 0.2s ease;
}

.dropdown-item:hover {
    background: rgba(255,255,255,0.15);
}

.dropdown-item .col {
    white-space: nowrap;
    /* plus besoin de width fixe */
}
</style>
<div class="options hidden"></div>
`;
            document.body.appendChild(this._optionsContainer);

            root.appendChild(this._dropdown);

            const optionsRoot = shadowOptions.querySelector(".options");

            // Toggle dropdown
            this._selected.addEventListener("click", e => {
                e.stopPropagation();
                optionsRoot.classList.toggle("hidden");
                if (!optionsRoot.classList.contains("hidden")) {
                    const rect = this._selected.getBoundingClientRect();
                    optionsRoot.style.top = `${rect.bottom + window.scrollY}px`;
                    optionsRoot.style.left = `${rect.left + window.scrollX}px`;
                    optionsRoot.style.minWidth = `${rect.width}px`;
                }
            });

            // Click outside
            document.addEventListener("click", () => optionsRoot.classList.add("hidden"));

            // Repositionnement scroll
            window.addEventListener("scroll", () => {
                if (!optionsRoot.classList.contains("hidden")) {
                    const rect = this._selected.getBoundingClientRect();
                    optionsRoot.style.top = `${rect.bottom + window.scrollY}px`;
                    optionsRoot.style.left = `${rect.left + window.scrollX}px`;
                }
            });

            this._optionsContentRoot = optionsRoot; // pour _renderOptions()
        }
    }

    _renderOptions() {
        if (!this._optionsContentRoot) return;

        this._optionsContentRoot.innerHTML = "";

        this._list.forEach(item => {
            const div = document.createElement("div");
            div.className = "dropdown-item";
            div.innerHTML = Object.values(item).map(v => `<span class="col">${v}</span>`).join("");

            div.addEventListener("click", e => {
                e.stopPropagation();
                this._value = item;
                this._selected.textContent = item[this._displayKey];
                this._optionsContentRoot.classList.add("hidden");
                this.dispatchEvent(new CustomEvent("change", {
                    detail: { value: this._value },
                    bubbles: true,
                    composed: true
                }));
            });

            this._optionsContentRoot.appendChild(div);
        });

        if (this._selected) this._selected.textContent = this._value[this._displayKey];
    }

    // Getter / Setter
    get list() { return this._list; }
    set list(arr) { this._list = arr; this._renderOptions(); }

    get value() { return this._value; }
    set value(obj) { this._value = obj; if (this._selected) this._selected.textContent = obj[this._displayKey]; }

    get displayKey() { return this._displayKey; }
    set displayKey(key) { this._displayKey = key; if (this._selected) this._selected.textContent = this._value[this._displayKey]; }

    get zindex() { return this._zindex; }
    set zindex(z) { this._zindex = z; if (this._optionsContentRoot) this._optionsContentRoot.style.zIndex = z; }
}

customElements.define("aws-selector", SP_selector);
