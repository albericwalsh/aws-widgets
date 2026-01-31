import { load_file } from "../utils.js";

function attachCSS(shadow) {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./widgets/table/table.css");
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


customElements.define("sp-table", SP_Table);
customElements.define("sp-table-head", SP_TableHead);
customElements.define("sp-table-body", SP_TableBody);
customElements.define("sp-table-row", SP_TableRow);
customElements.define("sp-table-cell", SP_TableCell);
