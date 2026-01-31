import { loadTheme } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

class SP_Table extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        const theme = await loadTheme();
        const style = generateCSS(theme);
        const tpl = document.createElement('template');
        tpl.innerHTML = `
            <style>${style}</style>
            <div class="table"><slot></slot></div>
        `;
        this.shadowRoot.appendChild(tpl.content.cloneNode(true));
    }
}

class SP_TableHead extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: "open" }); }
    async connectedCallback() {
        const theme = await loadTheme();
        const style = generateCSS(theme);
        const tpl = document.createElement('template');
        tpl.innerHTML = `<style>${style}</style><slot class="table-head"></slot>`;
        this.shadowRoot.appendChild(tpl.content.cloneNode(true));
    }
}

class SP_TableBody extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: "open" }); }
    async connectedCallback() {
        const theme = await loadTheme();
        const style = generateCSS(theme);
        const tpl = document.createElement('template');
        tpl.innerHTML = `<style>${style}</style><slot class="table-body"></slot>`;
        this.shadowRoot.appendChild(tpl.content.cloneNode(true));
    }
}

class SP_TableRow extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: "open" }); }
    async connectedCallback() {
        const theme = await loadTheme();
        const style = generateCSS(theme);
        const tpl = document.createElement('template');
        tpl.innerHTML = `<style>${style}</style><slot class="table-row"></slot>`;
        this.shadowRoot.appendChild(tpl.content.cloneNode(true));
    }
}

class SP_TableCell extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: "open" }); }
    async connectedCallback() {
        const theme = await loadTheme();
        const style = generateCSS(theme);
        const tpl = document.createElement('template');
        tpl.innerHTML = `<style>${style}</style><slot class="table-cell"></slot>`;
        this.shadowRoot.appendChild(tpl.content.cloneNode(true));
    }
}

customElements.define("aws-table", SP_Table);
customElements.define("aws-table-head", SP_TableHead);
customElements.define("aws-table-body", SP_TableBody);
customElements.define("aws-table-row", SP_TableRow);
customElements.define("aws-table-cell", SP_TableCell);
