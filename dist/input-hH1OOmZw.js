import { copi_btn as b } from "./input_utils-CFhbOVXQ.js";
import { getWidgetValue as m, setWidgetValue as h } from "./value_helpers-BR6tLt7O.js";
class f extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.listeners = /* @__PURE__ */ new Map(), this._renderRaf = null;
    const e = `:host{display:inline-block}
    /* wrapper: no background by default (view), border transparent */
    .sp-input-wrapper{display:inline-flex;align-items:center;gap:8px;padding:4px 8px;border-radius:999px;background:transparent;border:1px solid transparent}
    /* on hover show background and subtle border (view hover) */
    .sp-input-wrapper:hover{background:var(--aws-bg-hover, rgba(255,255,255,0.04));border-color:var(--aws-border, rgba(255,255,255,0.06))}
    /* in edit mode show the same border as when input is focused (use --aws-border) */
    :host([mode="edit"]) .sp-input-wrapper{border-color:var(--aws-border, rgba(100,150,255,0.9))}
    /* when a child input is focused, match the focused border and shadow (use border-based vars) */
    .sp-input-wrapper:focus-within{border-color:var(--aws-border, rgba(100,150,255,0.9));box-shadow:0 4px 14px var(--aws-border-shadow, rgba(100,150,255,0.08))}
    .sp-input-content{display:flex;align-items:center;gap:8px;min-width:80px}
    /* icon buttons inside inputs should use the text color */
    .sp-input-wrapper aws-icon-button, .sp-input-wrapper sp-icon-button{color:var(--aws-foreground, #fff)}
    .input{flex:0 1 220px;min-width:80px;max-width:520px;padding:8px 12px;border-radius:12px;border:1px solid var(--aws-input-border, rgba(255,255,255,0.12));background:var(--aws-input-bg, linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03)));color:var(--aws-foreground,#fff);font:inherit;font-size:0.95rem;outline:none}
    .input:focus{border-color:var(--aws-border, rgba(100,150,255,0.9));box-shadow:0 4px 14px var(--aws-border-shadow, rgba(100,150,255,0.08))}
    .output{padding:8px 10px;border-radius:12px;color:var(--aws-foreground,#fff)}
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
      const s = e.querySelector("#dialphone")?.textContent ?? "", n = e.querySelector(".input")?.value ?? "";
      return `${s} ${n}`.trim();
    }
    if (t === "license") return e.querySelector("#value")?.getRealValue?.() ?? "";
    const r = this._getInputElement("value");
    return m(r);
  }
  set value(e) {
    const t = this.shadowRoot.querySelector("#root");
    if (!t) return;
    const r = this.getAttribute("type");
    if (r === "phone" || r === "telephone") {
      const n = t.querySelector("#dialphone"), o = t.querySelector(".input");
      if (n && o) {
        const a = String(e || "").split(" ");
        n.textContent = a[0] || "", o.value = a.slice(1).join(" ") || "";
      }
      return;
    }
    if (r === "license") {
      const n = t.querySelector("#value");
      h(n, e);
      return;
    }
    const s = this._getInputElement("value");
    s && h(s, e);
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
    const r = this.getAttribute("type") || "text", s = this.getAttribute("mode") || "input", n = s === "edit" ? "input" : s === "view" ? "output" : s;
    try {
      const o = [];
      r === "phone" && o.push("./telephone/telephone.js"), o.push(`./${r}/${r}.js`), o.push(`./${r}.js`);
      const a = Object.assign({}, /* @__PURE__ */ Object.assign({ "./date/date.js": () => import("./date-CKPb7BfV.js"), "./date/generateCSS.js": () => import("./generateCSS-BGWFEy-8.js"), "./email/email.js": () => import("./email-BY2zo52E.js"), "./email/generateCSS.js": () => import("./generateCSS-WLMR6app.js"), "./license/generateCSS.js": () => import("./generateCSS-fvMtlsFv.js"), "./license/license.js": () => import("./license-IZ1lRAZw.js"), "./number/generateCSS.js": () => import("./generateCSS-DeTeZwUU.js"), "./number/number.js": () => import("./number-lBUJrMcG.js"), "./password/generateCSS.js": () => import("./generateCSS-DbIvQDS8.js"), "./password/password.js": () => import("./password-H9X_xRx6.js"), "./telephone/generateCSS.js": () => import("./generateCSS-DvAbo8Co.js"), "./telephone/telephone.js": () => import("./telephone-Q6LxRZjP.js"), "./text/generateCSS.js": () => import("./generateCSS-CLoykNIQ.js"), "./text/text.js": () => import("./text-CMBDzTw3.js"), "./url/generateCSS.js": () => import("./generateCSS-DlK808xh.js"), "./url/url.js": () => import("./url-urLd2Qbk.js") }), /* @__PURE__ */ Object.assign({ "./input_utils.js": () => import("./input_utils-CFhbOVXQ.js"), "./license.js": () => import("./license-Bscxw4zn.js").then((l) => l.l) }));
      let u = null;
      for (const l of o) {
        const p = a[l];
        if (p)
          try {
            if (u = await p(), u) break;
          } catch {
          }
      }
      if (!u) throw new Error(`No module found for type=${r}`);
      const i = await u.create_element({ mode: n, disabled: this.hasAttribute("disabled"), value: t || this.getAttribute("value") || "" }), d = i?.fragment || i;
      d && e.appendChild(d), (r === "telephone" || r === "phone") && this._initPhone(e), t && (this.value = t);
    } catch (o) {
      console.error("[aws-input] render error:", o), e.textContent = "";
    }
  }
  _initPhone(e) {
    const t = e.querySelector("aws-selector"), r = e.querySelector("#dialphone"), s = e.querySelector(".input");
    if (!t || !r || !s) return;
    this._removeListeners(s), this._removeListeners(t);
    const n = () => {
      let i = s.value.replace(/\D/g, "");
      const d = s.dataset.format || "XX XX XX XX XX";
      let l = "", p = 0;
      for (const c of d)
        if (c === "X") {
          if (p >= i.length) break;
          l += i[p++];
        } else
          l += c;
      s.value = l;
    }, o = () => n();
    s.addEventListener("input", o), this.listeners.set(s, o);
    const a = (i) => {
      r.textContent = i.detail?.value?.col2 || "", s.dataset.format = i.detail?.value?.format || s.dataset.format || "", s.value = "";
    };
    t.addEventListener("change", a), this.listeners.set(t, a);
    const u = e.querySelector("#copy");
    u && b(u, () => `${r.textContent} ${s.value}`);
  }
  _removeListeners(e) {
    if (!this.listeners.has(e)) return;
    const t = this.listeners.get(e);
    e.removeEventListener("input", t), e.removeEventListener("change", t), this.listeners.delete(e);
  }
}
customElements.define("aws-input", f);
export {
  f as SP_Input
};
