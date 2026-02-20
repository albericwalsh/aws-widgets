import { loadTheme as r } from "./theme-D01i-Ra9.js";
import { generateCSS as c } from "./generateCSS-By4qfLYn.js";
class l extends HTMLElement {
  static get observedAttributes() {
    return [
      "styles",
      "alignments",
      "justify",
      "colors",
      "weight",
      "transform",
      "decoration",
      "italic",
      "loading"
    ];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  async connectedCallback() {
    const e = await r(), s = c(e), t = document.createElement("template");
    t.innerHTML = `
            <style>${s}</style>
            <div class="aws-text">
                <span class="content"><slot></slot></span>
                <span class="loader" aria-hidden="true">●</span>
            </div>
        `, this.shadowRoot.appendChild(t.content.cloneNode(!0)), this._container = this.shadowRoot.querySelector(".aws-text"), this._content = this.shadowRoot.querySelector(".content"), this._applyAttributes();
  }
  attributeChangedCallback() {
    this._applyAttributes();
  }
  _applyAttributes() {
    if (!this._container) return;
    this._container.className = "aws-text", this._content.className = "content";
    const e = this.getAttribute("styles");
    e && this._container.classList.add(`variant-${e}`);
    const s = this.getAttribute("colors");
    s && this._container.classList.add(`color-${s}`);
    const t = this.getAttribute("weight");
    t && this._container.classList.add(`weight-${t}`);
    const o = this.getAttribute("transform");
    o && o !== "none" && this._container.classList.add(`transform-${o}`);
    const a = this.getAttribute("decoration");
    a && a !== "none" && this._container.classList.add(`decoration-${a}`), this.hasAttribute("italic") && this.getAttribute("italic") !== "false" && this._container.classList.add("italic");
    const i = this.getAttribute("align") || this.getAttribute("alignments"), n = this.getAttribute("justify");
    i ? i === "top" ? this._container.style.justifyContent = "flex-start" : i === "center" ? this._container.style.justifyContent = "center" : i === "bottom" ? this._container.style.justifyContent = "flex-end" : this._container.style.justifyContent = "" : this._container.style.justifyContent = "", n ? (this._content.classList.add(`justify-${n}`), ["left", "center", "right"].includes(n) ? this._content.style.textAlign = n : this._content.style.textAlign = "") : this._content.style.textAlign = "", this.hasAttribute("loading") ? this.setAttribute("loading", "") : this.removeAttribute("loading");
  }
}
customElements.define("aws-text", l);
export {
  l as AWSText
};
