import { loadFile } from "../utils/load_file.js";

class SP_context extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        const htmlUrl = new URL("./context.html", import.meta.url).href;
        const cssUrl = new URL("./context.css", import.meta.url).href;

        loadFile(htmlUrl, cssUrl, this.shadow).then(() => {
            this.overlay = this.shadow.querySelector(".overlay");
            this.container = this.shadow.querySelector(".container");

            // clic dehors = fermer
            this.overlay.addEventListener("click", (e) => {
                if (e.target === this.overlay) this.close();
            });

            // signaler que tout est prêt
            this.dispatchEvent(new Event("ready"));
        });
    }

    open() {
        this.overlay?.classList.add("visible");
    }

    close() {
        this.overlay?.classList.remove("visible");
    }
}

customElements.define("aws-context", SP_context);
