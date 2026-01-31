import { loadTheme } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

export class AWSText extends HTMLElement {
    static get observedAttributes() {
        return [
            'styles','alignments','justify','colors','weight','transform','decoration','italic','loading'
        ];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        const theme = await loadTheme();
        const style = generateCSS(theme);

        const template = document.createElement("template");
        template.innerHTML = `
            <style>${style}</style>
            <div class="aws-text">
                <span class="content"><slot></slot></span>
                <span class="loader" aria-hidden="true">●</span>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._container = this.shadowRoot.querySelector('.aws-text');
        this._content = this.shadowRoot.querySelector('.content');
        this._applyAttributes();
    }

    attributeChangedCallback() { this._applyAttributes(); }

    _applyAttributes() {
        if (!this._container) return;

        // reset classes on container and content
        this._container.className = 'aws-text';
        this._content.className = 'content';

        // container-level classes (style, color, weight, transform, decoration, italic)
        const styles = this.getAttribute('styles');
        if (styles) this._container.classList.add(`variant-${styles}`);

        const colors = this.getAttribute('colors');
        if (colors) this._container.classList.add(`color-${colors}`);

        const weight = this.getAttribute('weight');
        if (weight) this._container.classList.add(`weight-${weight}`);

        const transform = this.getAttribute('transform');
        if (transform && transform !== 'none') this._container.classList.add(`transform-${transform}`);

        const decoration = this.getAttribute('decoration');
        if (decoration && decoration !== 'none') this._container.classList.add(`decoration-${decoration}`);

        if (this.hasAttribute('italic') && this.getAttribute('italic') !== 'false') this._container.classList.add('italic');

        // New semantics: `align` = vertical (top/center/bottom), `justify` = horizontal (left/center/right)
        const align = this.getAttribute('align') || this.getAttribute('alignments');
        const justify = this.getAttribute('justify');

        // vertical alignment (align -> justify-content on container)
        if (align) {
            if (align === 'top') this._container.style.justifyContent = 'flex-start';
            else if (align === 'center') this._container.style.justifyContent = 'center';
            else if (align === 'bottom') this._container.style.justifyContent = 'flex-end';
            else this._container.style.justifyContent = '';
        } else {
            this._container.style.justifyContent = '';
        }

        // horizontal justification (justify -> text-align on content)
        if (justify) {
            this._content.classList.add(`justify-${justify}`);
            if (['left','center','right'].includes(justify)) this._content.style.textAlign = justify;
            else this._content.style.textAlign = '';
        } else {
            this._content.style.textAlign = '';
        }

        // loading is reflected as attribute on host and CSS shows .loader
        if (this.hasAttribute('loading')) this.setAttribute('loading', ''); else this.removeAttribute('loading');
    }
}

customElements.define('aws-text', AWSText);
