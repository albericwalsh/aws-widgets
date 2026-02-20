import { loadTheme as f } from "./theme-D01i-Ra9.js";
import { generateCSS as g } from "./generateCSS-B3YMewvq.js";
class A extends HTMLElement {
  static get observedAttributes() {
    return ["particles", "speed", "radius", "particle-size-multiplier", "size", "color", "mode"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this._container = null;
  }
  async connectedCallback() {
    const i = await f(), r = g(i), b = document.createElement("template");
    b.innerHTML = `<style>${r}</style><div class="liquid-train" part="container"></div>`, this.shadowRoot.appendChild(b.content.cloneNode(!0)), this._container = this.shadowRoot.querySelector(".liquid-train"), this._render();
  }
  attributeChangedCallback() {
    this._render();
  }
  _render() {
    if (!this._container) return;
    const i = parseFloat(this.getAttribute("size")) || 60, r = this.getAttribute("color") || "";
    if (r && this.style.setProperty("--pc-color", r), this.style.setProperty("--pc-size", `${i}px`), (this.getAttribute("mode") || "edit") === "view") {
      const a = Number(this.getAttribute("value")), c = isNaN(a) ? null : Math.max(0, Math.min(100, a));
      this._container.innerHTML = "";
      const l = document.createElement("div");
      l.className = "progress-static";
      const u = "http://www.w3.org/2000/svg", d = document.createElementNS(u, "svg"), t = i;
      d.setAttribute("viewBox", `0 0 ${t} ${t}`);
      const p = t / 2, e = t / 2, h = t / 2 - 6, n = document.createElementNS(u, "circle");
      n.setAttribute("cx", p), n.setAttribute("cy", e), n.setAttribute("r", h), n.classList.add("track"), d.appendChild(n);
      const s = document.createElementNS(u, "circle");
      s.setAttribute("cx", p), s.setAttribute("cy", e), s.setAttribute("r", h), s.classList.add("fill");
      const m = 2 * Math.PI * h;
      if (c === null)
        s.setAttribute("stroke-dasharray", m), s.setAttribute("stroke-dashoffset", m * 0.25);
      else {
        const o = m * (1 - c / 100);
        s.setAttribute("stroke-dasharray", m), s.setAttribute("stroke-dashoffset", o);
      }
      if (d.appendChild(s), l.appendChild(d), c !== null) {
        const o = document.createElement("div");
        o.className = "label", o.textContent = `${Math.round(c)}%`, l.appendChild(o);
      }
      this._container.appendChild(l);
    } else
      this._initParticles();
  }
  _initParticles() {
    const i = this._container;
    if (!i) return;
    i.innerHTML = "";
    const r = parseInt(this.getAttribute("particles")) || 20, b = 5;
    let a = parseFloat(this.getAttribute("speed"));
    (!a || isNaN(a) || a <= 0) && (a = 1);
    const c = b / a, l = parseFloat(this.getAttribute("radius")) || (parseFloat(this.getAttribute("size")) ? parseFloat(this.getAttribute("size")) / 3 : 20), u = parseFloat(this.getAttribute("particle-size-multiplier")) || 0.5, d = 10 * u, t = document.createElement("div");
    t.classList.add("particle"), t.style.width = `${d}px`, t.style.height = `${d}px`, t.style.opacity = 1, t.style.transformOrigin = `-${l}px 0`, t.style.animation = `rotate ${c}s linear infinite`, i.appendChild(t);
    for (let p = 0; p < r; p++) {
      const e = document.createElement("div");
      e.classList.add("particle");
      const h = (r - p) / r, n = (6 * h + 2) * u;
      e.style.width = `${n}px`, e.style.height = `${n}px`, e.style.opacity = h;
      const s = Math.random() * 8 - 4, m = l + s;
      e.style.transformOrigin = `-${m}px 0`;
      const o = c * (0.8 + Math.random() * 0.4), y = p / r * o;
      e.style.animation = `rotate ${o}s linear infinite`, e.style.animationDelay = `${y}s`, i.appendChild(e);
    }
  }
}
customElements.get("aws-progress-circle") || customElements.define("aws-progress-circle", A);
