(function(e){typeof define=="function"&&define.amd?define(e):e()})((function(){"use strict";class e extends HTMLElement{static get observedAttributes(){return["disabled","variant","type","size"]}constructor(){super(),this.attachShadow({mode:"open"});const t=document.createElement("template");t.innerHTML=`
        <style>
            :host { display: inline-block; }

            .btn {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                padding: 12px 28px;
                border-radius: 40px;
                cursor: pointer;
                border: 1px solid rgba(255,255,255,0.25);
                background: rgba(255,255,255,0.08);
                color: white;
                transition: transform .2s ease, background .2s ease;
            }

            /* Variants */
            .btn[data-variant="secondary"] { background: transparent; border-color: rgba(255,255,255,0.4); }
            .btn[data-variant="ghost"] { background: none; border: none; }

            /* Sizes */
            .btn[data-size="sm"] { padding: 8px 16px; }
            .btn[data-size="lg"] { padding: 16px 36px; }

            /* States */
            .btn:hover:not(:disabled) { transform: translateY(-2px); }
            .btn:disabled { opacity: .5; cursor: not-allowed; }

            .icon { display: inline-flex; align-items: center; }
            .text { display: inline-flex; align-items: center; }
        </style>

        <button class="btn" part="button">
            <span class="icon"><slot name="icon"></slot></span>
            <span class="text"><slot></slot></span>
        </button>
        `,this.shadowRoot.appendChild(t.content.cloneNode(!0)),this._btn=this.shadowRoot.querySelector("button"),this._btn.addEventListener("click",n=>{if(this.disabled){n.preventDefault(),n.stopPropagation();return}this.dispatchEvent(new Event("click",{bubbles:!0}))}),this._syncAll()}connectedCallback(){this._syncAll()}attributeChangedCallback(t,n,i){this._syncAll()}get disabled(){return this.hasAttribute("disabled")}set disabled(t){t?this.setAttribute("disabled",""):this.removeAttribute("disabled")}_syncAll(){this._btn&&(this._btn.disabled=this.disabled,this._btn.type=this.getAttribute("type")||"button",this._btn.setAttribute("data-variant",this.getAttribute("variant")||"primary"),this._btn.setAttribute("data-size",this.getAttribute("size")||"md"),this.setAttribute("aria-disabled",this.disabled?"true":"false"))}}customElements.define("aws-button",e)}));
