import {loadFile} from "../utils/load_file.js";

class SP_search extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const htmlUrl = new URL("./search.html", import.meta.url).href;
        const cssUrl  = new URL("./search.css", import.meta.url).href;

        loadFile(htmlUrl, cssUrl, shadow);
    }
}

customElements.define("aws-search", SP_search);
