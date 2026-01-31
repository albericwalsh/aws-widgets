import {load_file} from "../utils.js";

class SP_ProgressCircle extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});

        const htmlUrl = new URL("./progress-circle.html", import.meta.url).href;
        const cssUrl = new URL("./progress-circle.css", import.meta.url).href;

        load_file("SP_ProgressCircle", htmlUrl, cssUrl, this.shadow).then(() => {
            this._initParticles();
        });
    }

    _initParticles() {
        const container = this.shadow.querySelector(".liquid-train");
        if (!container) return;

        container.innerHTML = "";

        const particleCount = parseInt(this.getAttribute("particles")) || 20;
        const baseDuration = parseFloat(this.getAttribute("speed")) || 5;

        // Rayon et multiplicateur de taille
        const mainRadius = parseFloat(this.getAttribute("radius")) || 20;
        const sizeMultiplier = parseFloat(this.getAttribute("particle-size-multiplier")) || 0.5;

        const mainSize = 10 * sizeMultiplier;

        // Particule principale
        const main = document.createElement("div");
        main.classList.add("particle");
        main.style.width = `${mainSize}px`;
        main.style.height = `${mainSize}px`;
        main.style.opacity = 1;
        main.style.transformOrigin = `-${mainRadius}px 0`;
        main.style.animation = `rotate ${baseDuration}s linear infinite`;
        container.appendChild(main);

        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement("div");
            p.classList.add("particle");

            // facteur pour taille et opacité
            const factor = (particleCount - i) / particleCount;
            const size = (6 * factor + 2) * sizeMultiplier;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.opacity = factor;

            // rayon variable autour du principal
            const radiusVariation = Math.random() * 8 - 4; // ±4px
            const radius = mainRadius + radiusVariation;
            p.style.transformOrigin = `-${radius}px 0`;

            // animation rotation
            const duration = baseDuration * (0.8 + Math.random() * 0.4);
            const delay = (i / particleCount) * duration;
            p.style.animation = `rotate ${duration}s linear infinite`;
            p.style.animationDelay = `${delay}s`;

            container.appendChild(p);
        }
    }
}

customElements.define("sp-progress-circle", SP_ProgressCircle);
