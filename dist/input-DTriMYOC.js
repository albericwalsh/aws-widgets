import { copi_btn as h } from "./input_utils-CFhbOVXQ.js";
class m extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.listeners = /* @__PURE__ */ new Map(), this._renderRaf = null;
    const e = `:host{display:inline-block}
    .sp-input-wrapper{display:inline-flex;align-items:center;gap:8px;padding:4px 8px;border-radius:999px;background:rgba(255,255,255,0.02);border:1px solid transparent}
    .sp-input-wrapper:hover,:host([mode="edit"]) .sp-input-wrapper{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.06)}
    .sp-input-content{display:flex;align-items:center;gap:8px;min-width:80px}
    .input{flex:0 1 220px;min-width:80px;max-width:520px;padding:8px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.12);background:linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));color:#fff;font:inherit;font-size:0.95rem;outline:none}
    .input:focus{border-color:rgba(100,150,255,0.9);box-shadow:0 4px 14px rgba(100,150,255,0.08)}
    .output{padding:8px 10px;border-radius:12px;color:#fff}
    `, t = '<div class="sp-input-wrapper"><div class="sp-input-content" id="root"></div></div>';
    this.shadowRoot.innerHTML = `<style>${e}</style>${t}`, this.isReady = !0;
  }
  static get observedAttributes() {
    return ["type", "value", "mode", "disabled"];
  }
  connectedCallback() {
  }
  attributeChangedCallback(e, t, r) {
    if (this.isReady && t !== r) {
      if (e === "value") {
        this.value = r;
        return;
      }
      this._renderRaf && cancelAnimationFrame(this._renderRaf), this._renderRaf = requestAnimationFrame(() => {
        this._renderRaf = null, this.render();
      });
    }
  }
  _getInputElement(e = "value") {
    const t = this.shadowRoot.querySelector("#root");
    if (!t) return null;
    let r = t.querySelector(`#${e}`);
    return r || (r = t.querySelector("input, textarea, select, .output")), r;
  }
  get value() {
    const e = this.shadowRoot.querySelector("#root");
    if (!e) return "";
    const t = this.getAttribute("type");
    if (t === "phone" || t === "telephone") {
      const i = e.querySelector("#dialphone")?.textContent ?? "", s = e.querySelector(".input")?.value ?? "";
      return `${i} ${s}`.trim();
    }
    if (t === "license") return e.querySelector("#value")?.getRealValue?.() ?? "";
    const r = this._getInputElement("value");
    return r?.value ?? r?.textContent ?? "";
  }
  set value(e) {
    const t = this.shadowRoot.querySelector("#root");
    if (!t) return;
    const r = this.getAttribute("type");
    if (r === "phone" || r === "telephone") {
      const s = t.querySelector("#dialphone"), n = t.querySelector(".input");
      if (s && n) {
        const a = String(e || "").split(" ");
        s.textContent = a[0] || "", n.value = a.slice(1).join(" ") || "";
      }
      return;
    }
    if (r === "license") {
      const s = t.querySelector("#value");
      s?.setValue && s.setValue(e);
      return;
    }
    const i = this._getInputElement("value");
    i && ("value" in i ? i.value = e : i.textContent = e);
  }
  get type() {
    return this.getAttribute("type");
  }
  set type(e) {
    e == null ? this.removeAttribute("type") : this.setAttribute("type", String(e));
  }
  get mode() {
    return this.getAttribute("mode");
  }
  set mode(e) {
    e == null ? this.removeAttribute("mode") : this.setAttribute("mode", String(e));
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(e) {
    e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }
  async render() {
    const e = this.shadowRoot.querySelector("#root");
    if (!e) return;
    const t = this.value;
    e.innerHTML = "";
    const r = this.getAttribute("type") || "text", i = this.getAttribute("mode") || "input", s = i === "edit" ? "input" : i === "view" ? "output" : i;
    try {
      const n = [];
      r === "phone" && n.push("./telephone/telephone.js"), n.push(`./${r}/${r}.js`), n.push(`./${r}.js`);
      const a = Object.assign({}, /* @__PURE__ */ Object.assign({ "./date/date.js": () => import("./date-CXFtZknd.js"), "./date/generateCSS.js": () => import("./generateCSS-C90fMwhA.js"), "./email/email.js": () => import("./email-CXS_ubi9.js"), "./email/generateCSS.js": () => import("./generateCSS-BOUJ7-mo.js"), "./license/generateCSS.js": () => import("./generateCSS-C824PdX-.js"), "./license/license.js": () => import("./license-tzBk1l66.js"), "./number/generateCSS.js": () => import("./generateCSS-SMThOGqE.js"), "./number/number.js": () => import("./number-b5OeVL_e.js"), "./password/generateCSS.js": () => import("./generateCSS-BOY6ZmLj.js"), "./password/password.js": () => import("./password-CQPaMVOL.js"), "./telephone/generateCSS.js": () => import("./generateCSS-nUoCSmHK.js"), "./telephone/telephone.js": () => import("./telephone-Cnub1T4p.js"), "./text/generateCSS.js": () => import("./generateCSS-D8e3eURg.js"), "./text/text.js": () => import("./text-DiBK4rF7.js"), "./url/generateCSS.js": () => import("./generateCSS-CemqUWH8.js"), "./url/url.js": () => import("./url-Dx85d1nz.js") }), /* @__PURE__ */ Object.assign({ "./input_utils.js": () => import("./input_utils-CFhbOVXQ.js"), "./license.js": () => import("./license-BdDWqKag.js").then((u) => u.l) }));
      let l = null;
      for (const u of n) {
        const p = a[u];
        if (p)
          try {
            if (l = await p(), l) break;
          } catch {
          }
      }
      if (!l) throw new Error(`No module found for type=${r}`);
      const o = await l.create_element({ mode: s, disabled: this.hasAttribute("disabled"), value: t || this.getAttribute("value") || "" }), d = o?.fragment || o;
      d && e.appendChild(d), (r === "telephone" || r === "phone") && this._initPhone(e), t && (this.value = t);
    } catch (n) {
      console.error("[aws-input] render error:", n), e.textContent = "";
    }
  }
  _initPhone(e) {
    const t = e.querySelector("aws-selector"), r = e.querySelector("#dialphone"), i = e.querySelector(".input");
    if (!t || !r || !i) return;
    this._removeListeners(i), this._removeListeners(t);
    const s = () => {
      let o = i.value.replace(/\D/g, "");
      const d = i.dataset.format || "XX XX XX XX XX";
      let u = "", p = 0;
      for (const c of d)
        if (c === "X") {
          if (p >= o.length) break;
          u += o[p++];
        } else
          u += c;
      i.value = u;
    }, n = () => s();
    i.addEventListener("input", n), this.listeners.set(i, n);
    const a = (o) => {
      r.textContent = o.detail?.value?.col2 || "", i.dataset.format = o.detail?.value?.format || i.dataset.format || "", i.value = "";
    };
    t.addEventListener("change", a), this.listeners.set(t, a);
    const l = e.querySelector("#copy");
    l && h(l, () => `${r.textContent} ${i.value}`);
  }
  _removeListeners(e) {
    if (!this.listeners.has(e)) return;
    const t = this.listeners.get(e);
    e.removeEventListener("input", t), e.removeEventListener("change", t), this.listeners.delete(e);
  }
}
customElements.define("aws-input", m);
export {
  m as SP_Input
};
