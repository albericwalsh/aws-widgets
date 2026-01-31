import { load_file } from "../utils.js";

class SP_context extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        const html = "./widgets/context/context.html";
        const css = "./widgets/context/context.css";

        load_file("SP_context", html, css, this.shadow).then(() => {
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

customElements.define("sp-context", SP_context);
