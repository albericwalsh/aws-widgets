
import { loadTheme } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

class SP_ProgressCircle extends HTMLElement {
    static get observedAttributes(){ return ['particles','speed','radius','particle-size-multiplier','size','color','mode']; }

    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this._container = null;
    }

    async connectedCallback(){
        const theme = await loadTheme();
        const style = generateCSS(theme);
        const tpl = document.createElement('template');
        tpl.innerHTML = `<style>${style}</style><div class="liquid-train" part="container"></div>`;
        this.shadowRoot.appendChild(tpl.content.cloneNode(true));
        this._container = this.shadowRoot.querySelector('.liquid-train');
        this._render();
    }

    attributeChangedCallback(){
        this._render();
    }

    _render(){
        if(!this._container) return;
        // apply CSS variables from attributes
        const size = parseFloat(this.getAttribute('size')) || 60;
        const color = this.getAttribute('color') || '';
        if(color) this.style.setProperty('--pc-color', color);
        this.style.setProperty('--pc-size', (size? `${size}px` : '60px'));

        const mode = this.getAttribute('mode') || 'edit';
        if(mode === 'view'){
            // render a static SVG circle showing optional percent value
            const value = Number(this.getAttribute('value'));
            const pct = (isNaN(value) ? null : Math.max(0, Math.min(100, value)));
            this._container.innerHTML = '';
            const wrap = document.createElement('div');
            wrap.className = 'progress-static';
            const svgNS = 'http://www.w3.org/2000/svg';
            const svg = document.createElementNS(svgNS, 'svg');
            const s = size;
            svg.setAttribute('viewBox', `0 0 ${s} ${s}`);
            const cx = s/2, cy = s/2, r = (s/2) - 6;
            const track = document.createElementNS(svgNS, 'circle');
            track.setAttribute('cx', cx); track.setAttribute('cy', cy); track.setAttribute('r', r);
            track.classList.add('track');
            svg.appendChild(track);
            const fill = document.createElementNS(svgNS, 'circle');
            fill.setAttribute('cx', cx); fill.setAttribute('cy', cy); fill.setAttribute('r', r);
            fill.classList.add('fill');
            const circumference = 2 * Math.PI * r;
            if(pct === null){
                fill.setAttribute('stroke-dasharray', circumference);
                fill.setAttribute('stroke-dashoffset', circumference * 0.25);
            }else{
                const offset = circumference * (1 - pct/100);
                fill.setAttribute('stroke-dasharray', circumference);
                fill.setAttribute('stroke-dashoffset', offset);
            }
            svg.appendChild(fill);
            wrap.appendChild(svg);
            if(pct !== null){
                const label = document.createElement('div'); label.className = 'label'; label.textContent = `${Math.round(pct)}%`;
                wrap.appendChild(label);
            }
            this._container.appendChild(wrap);
        }else{
            // rebuild particles for edit/animated mode
            this._initParticles();
        }
    }

    _initParticles(){
        const container = this._container;
        if(!container) return;
        container.innerHTML = '';

        const particleCount = parseInt(this.getAttribute('particles')) || 20;
        // 'speed' attribute: larger value => faster animation.
        // Compute baseDuration (seconds per rotation) as defaultBase / speedAttr.
        const defaultBase = 5;
        let speedAttr = parseFloat(this.getAttribute('speed'));
        if(!speedAttr || isNaN(speedAttr) || speedAttr <= 0) speedAttr = 1;
        const baseDuration = defaultBase / speedAttr;
        const mainRadius = parseFloat(this.getAttribute('radius')) || (parseFloat(this.getAttribute('size'))? parseFloat(this.getAttribute('size'))/3 : 20);
        const sizeMultiplier = parseFloat(this.getAttribute('particle-size-multiplier')) || 0.5;

        const mainSize = 10 * sizeMultiplier;
        const main = document.createElement('div');
        main.classList.add('particle');
        main.style.width = `${mainSize}px`;
        main.style.height = `${mainSize}px`;
        main.style.opacity = 1;
        main.style.transformOrigin = `-${mainRadius}px 0`;
        main.style.animation = `rotate ${baseDuration}s linear infinite`;
        container.appendChild(main);

        for(let i=0;i<particleCount;i++){
            const p = document.createElement('div');
            p.classList.add('particle');
            const factor = (particleCount - i)/particleCount;
            const sz = (6*factor + 2) * sizeMultiplier;
            p.style.width = `${sz}px`;
            p.style.height = `${sz}px`;
            p.style.opacity = factor;
            const radiusVariation = Math.random()*8 - 4;
            const radius = mainRadius + radiusVariation;
            p.style.transformOrigin = `-${radius}px 0`;
            const duration = baseDuration * (0.8 + Math.random()*0.4);
            const delay = (i/particleCount) * duration;
            p.style.animation = `rotate ${duration}s linear infinite`;
            p.style.animationDelay = `${delay}s`;
            container.appendChild(p);
        }
    }
}

if(!customElements.get('aws-progress-circle')) customElements.define('aws-progress-circle', SP_ProgressCircle);
