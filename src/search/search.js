import {load_file} from "../utils.js";

class SP_search extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const htmlUrl = "./widgets/search/search.html";
        const cssUrl  = "./widgets/search/search.css";

        load_file("SP_search", htmlUrl, cssUrl, shadow);
    }
}

customElements.define("sp-search", SP_search);
