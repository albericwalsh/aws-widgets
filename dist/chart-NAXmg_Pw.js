class n extends HTMLElement {
  static get observedAttributes() {
    return ["type", "data", "data_name", "title", "xlabel", "xLabel", "ylabel", "yLabel", "disabled"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this._wrapper = document.createElement("div"), this.shadowRoot.appendChild(this._wrapper);
  }
  connectedCallback() {
    this._render();
  }
  attributeChangedCallback(r, s, t) {
    if (r === "type") return this._render();
    const e = this._wrapper.firstElementChild;
    e && (typeof t > "u" || t === null ? e.removeAttribute(r) : t === "" ? e.setAttribute(r, "") : e.setAttribute(r, t));
  }
  _render() {
    const r = (this.getAttribute("type") || "bar").toLowerCase(), t = {
      bar: "aws-chart-bar",
      column: "aws-chart-column",
      pie: "aws-chart-pie",
      line: "aws-chart-line"
    }[r] || "aws-chart-bar";
    if (this._currentTag === t)
      return;
    this._currentTag = t, this._wrapper.innerHTML = "";
    const e = document.createElement(t);
    for (const { name: a, value: i } of Array.from(this.attributes))
      a !== "type" && e.setAttribute(a, i);
    this._wrapper.appendChild(e);
  }
}
customElements.define("aws-chart", n);
