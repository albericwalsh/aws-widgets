import { loadTheme as a } from "./theme-D01i-Ra9.js";
import { generateCSS as n } from "./generateCSS-BNMsTSFB.js";
class r extends HTMLElement {
  static get observedAttributes() {
    return ["disabled", "variant", "type", "size", "aria-label"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  async connectedCallback() {
    if (this._inited) {
      this._syncAll();
      return;
    }
    const t = await a(), i = n(t), e = document.createElement("template");
    e.innerHTML = `
            <style>${i}</style>
            <button class="btn" part="button">
                <span class="icon"><slot name="icon"></slot></span>
                <span class="text"><slot></slot></span>
            </button>
        `, this.shadowRoot.appendChild(e.content.cloneNode(!0)), this._btn = this.shadowRoot.querySelector("button"), this._textEl = this.shadowRoot.querySelector(".text"), this._btn.addEventListener("click", (s) => {
      if (this.disabled) {
        s.preventDefault(), s.stopPropagation();
        return;
      }
      this.dispatchEvent(new Event("click", { bubbles: !0 }));
    }), this._syncAll(), this._inited = !0;
  }
  attributeChangedCallback() {
    this._syncAll();
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(t) {
    t ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }
  _syncAll() {
    if (!this._btn) return;
    this._btn.disabled = this.disabled, this._btn.type = this.getAttribute("type") || "button", this._btn.setAttribute("data-variant", this.getAttribute("variant") || "primary"), this._btn.setAttribute("data-size", this.getAttribute("size") || "md");
    const t = this.getAttribute("aria-label");
    t && this._btn.setAttribute("aria-label", t), this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
}
customElements.define("aws-button", r);
export {
  r as AWSButton
};
