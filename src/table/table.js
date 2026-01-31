import { loadFile } from "../utils/load_file.js";

function attachCSS(shadow) {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", new URL("./table.css", import.meta.url).href);
    shadow.appendChild(link);
}

class SP_Table extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        attachCSS(this.shadowRoot);

        const container = document.createElement("div");
        container.classList.add("table");
        const slot = document.createElement("slot");
        container.appendChild(slot);
        this.shadowRoot.appendChild(container);
    }
}

class SP_TableHead extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        attachCSS(this.shadowRoot);

        const slot = document.createElement("slot");
        slot.classList.add("table-head");
        this.shadowRoot.appendChild(slot);
    }
}

class SP_TableBody extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        attachCSS(this.shadowRoot);

        const slot = document.createElement("slot");
        slot.classList.add("table-body");
        this.shadowRoot.appendChild(slot);
    }
}

class SP_TableRow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        attachCSS(this.shadowRoot);

        const slot = document.createElement("slot");
        slot.classList.add("table-row");
        this.shadowRoot.appendChild(slot);
    }
}

class SP_TableCell extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        attachCSS(this.shadowRoot);

        const slot = document.createElement("slot");
        slot.classList.add("table-cell");
        this.shadowRoot.appendChild(slot);
    }
}


customElements.define("aws-table", SP_Table);
customElements.define("aws-table-head", SP_TableHead);
customElements.define("aws-table-body", SP_TableBody);
customElements.define("aws-table-row", SP_TableRow);
customElements.define("aws-table-cell", SP_TableCell);
