import { load_file } from "../utils.js";

class SP_StatCard extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        const htmlUrl = new URL("./stat-card.html", import.meta.url).href;
        const cssUrl = new URL("./stat-card.css", import.meta.url).href;

        load_file("SP_StatCard", htmlUrl, cssUrl, this.shadow).then(() => {
            console.log("HTML & CSS chargés");
            this.updateBackground();
        });
    }

    static get observedAttributes() {
        return ["value", "min", "max", "color-min", "color-max"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute changed: ${name} from ${oldValue} to ${newValue}`);
        this.waitForCardThenUpdate();
    }

    waitForCardThenUpdate(retries = 10) {
        const card = this.shadow.querySelector(".stat-card");
        if (card) {
            this.updateBackground();
        } else if (retries > 0) {
            setTimeout(() => this.waitForCardThenUpdate(retries - 1), 50);
        } else {
            console.log("Pas de .stat-card trouvé après attente");
        }
    }

    updateBackground() {
        const value = parseFloat(this.getAttribute("value") || 0);
        const min = parseFloat(this.getAttribute("min") || 0);
        const max = parseFloat(this.getAttribute("max") || 100);

        const colMin = this.getAttribute("color-min") || "rgba(0,255,127,0.2)";
        const colMax = this.getAttribute("color-max") || "rgba(255,75,75,0.2)";

        const card = this.shadow.querySelector(".stat-card");
        if (!card) {
            console.log("updateBackground: pas de .stat-card trouvé");
            return;
        }

        const ratio = Math.min(1, Math.max(0, (value - min) / (max - min)));
        const color = this.interpolateColor(colMin, colMax, ratio);

        // console.log(`Setting background: ${color} (value=${value}, ratio=${ratio})`);
        card.style.backgroundColor = color;
    }

    interpolateColor(c1, c2, t) {
        const parseColor = (c) => {
            if (c.startsWith("#")) {
                const n = c.replace("#", "");
                const r = parseInt(n.substring(0, 2), 16);
                const g = parseInt(n.substring(2, 4), 16);
                const b = parseInt(n.substring(4, 6), 16);
                const a = n.length === 8 ? parseInt(n.substring(6, 8), 16) / 255 : 1;
                return [r, g, b, a];
            }
            const m = c.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([0-9.]+))?\s*\)/i);
            if (!m) throw new Error("Couleur non supportée : " + c);
            const r = parseInt(m[1]);
            const g = parseInt(m[2]);
            const b = parseInt(m[3]);
            const a = m[4] !== undefined && m[4] !== "" ? parseFloat(m[4]) : 1;
            return [r, g, b, a];
        };

        const rgb1 = parseColor(c1);
        const rgb2 = parseColor(c2);
        const mix = (a, b) => a + (b - a) * t;

        const result = `rgba(${Math.round(mix(rgb1[0], rgb2[0]))}, ${Math.round(mix(rgb1[1], rgb2[1]))}, ${Math.round(mix(rgb1[2], rgb2[2]))}, ${mix(rgb1[3], rgb2[3]).toFixed(2)})`;
        // console.log(`Interpolate ${c1} -> ${c2} at t=${t}: ${result}`);
        return result;
    }
}

customElements.define("sp-stat-card", SP_StatCard);
