// widgets/paragraph/paragraph.js
import {loadFile} from "../utils/load_file.js";

class SP_Paragraph extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        const htmlUrl = new URL("./paragraph.html", import.meta.url).href;
        const cssUrl  = new URL("./paragraph.css", import.meta.url).href;

        // On attend que le HTML+CSS soient chargés avant de manipuler le DOM
        loadFile(htmlUrl, cssUrl, this.shadow).then(() => {
            this.updateVariant();
            this.updateLoading();
        });
    }

    static get observedAttributes() {
        return ["type", "loading"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.shadow) return; // sécurité si appelé trop tôt
        if (name === "type") this.updateVariant();
        if (name === "loading") this.updateLoading();
    }

    updateVariant() {
        const container = this.shadow.querySelector(".paragraph-container");
        if (!container) return;

        const allowed = ["default", "info", "warning", "error", "success"];
        const type = this.getAttribute("type") || "default";

        container.className = "paragraph-container"; // reset
        if (allowed.includes(type)) container.classList.add(`variant-${type}`);
        else container.classList.add("variant-default");
    }

    updateLoading() {
        const loader = this.shadow.querySelector("#loader");
        if (!loader) return;

        loader.style.display = this.hasAttribute("loading") ? "inline-block" : "none";
    }
}

customElements.define("aws-paragraph", SP_Paragraph);
