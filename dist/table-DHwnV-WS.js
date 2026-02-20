import { loadTheme as F } from "./theme-D01i-Ra9.js";
import { generateCSS as X } from "./generateCSS-Br2eFqaY.js";
class G extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this._onSlotChange = this._onSlotChange.bind(this), this._onPointerMove = null;
  }
  async connectedCallback() {
    const a = await F(), o = X(a), l = document.createElement("template");
    l.innerHTML = `
            <style>${o}</style>
            <div class="table" role="table"><slot></slot></div>
        `, this.shadowRoot.appendChild(l.content.cloneNode(!0)), this.shadowRoot.querySelector("slot").addEventListener("slotchange", this._onSlotChange), this._onSlotChange();
  }
  _onSlotChange() {
    const o = this.shadowRoot.querySelector("slot").assignedElements({ flatten: !0 }), l = o.filter((e) => e.tagName && e.tagName.toLowerCase() === "aws-table-head");
    if (this._collectRows(o).forEach((e) => {
      e.addEventListener("mouseenter", () => {
        e.classList.add("hover");
        try {
          e.style.background = "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", e.style.boxShadow = "0 6px 18px rgba(0,0,0,0.06)";
        } catch {
        }
      }), e.addEventListener("mouseleave", () => {
        e.classList.remove("hover");
        try {
          e.style.background = "", e.style.boxShadow = "";
        } catch {
        }
      });
    }), l.length) {
      const e = l[0], h = Array.from(e.querySelectorAll("aws-table-row"));
      if (h.length) {
        const x = h[0];
        this._ensureGlobalResizers(e, x);
      }
    }
  }
  _collectRows(a) {
    const o = [];
    return a.forEach((l) => {
      l.tagName && l.tagName.toLowerCase() === "aws-table-row" && o.push(l), Array.from(l.querySelectorAll ? l.querySelectorAll("aws-table-row") : []).forEach((e) => o.push(e));
    }), o;
  }
  _ensureGlobalResizers(a, o) {
    const l = this.shadowRoot.querySelector(".table");
    if (!l) return;
    Array.from(l.querySelectorAll(".col-resizer-global")).forEach((c) => c.remove());
    const e = this, h = Array.from(o.querySelectorAll("aws-table-cell")), x = l.getBoundingClientRect(), k = a.getBoundingClientRect();
    a.offsetTop || k.top - x.top;
    try {
      Array.from(o.querySelectorAll("aws-table-cell")).forEach((i, g) => {
        const y = Math.max(24, i.getBoundingClientRect().width);
        this.style.setProperty(`--col-${g + 1}-width`, `${y}px`), this.querySelectorAll("aws-table-row").forEach((r) => {
          const s = r.querySelector(`aws-table-cell:nth-child(${g + 1})`);
          s && (s.style.boxSizing = "border-box", s.style.width = `${y}px`, s.style.overflow = "hidden", s.style.whiteSpace = "nowrap", s.style.textOverflow = "ellipsis");
        });
      });
    } catch {
    }
    h.forEach((c, i) => {
      if (i === h.length - 1) return;
      const y = c.getBoundingClientRect().right - x.left, t = document.createElement("div");
      t.className = "col-resizer-global", t.style.position = "absolute", t.style.left = `${y - 7}px`, t.style.top = "0px", t.style.height = `${Math.max(24, l.scrollHeight)}px`, t.style.pointerEvents = "auto", t.style.width = "14px", t.style.cursor = "col-resize", t.style.zIndex = "9999", t.style.touchAction = "none", t.style.display = "flex", t.style.alignItems = "center", t.style.justifyContent = "center", t.style.background = "transparent";
      const r = document.createElement("div");
      r.style.width = "2px", r.style.height = "100%", r.style.background = "rgba(255,255,255,0.5)", r.style.borderRadius = "2px", t.appendChild(r), l.appendChild(t), t.addEventListener("pointerdown", (s) => {
        s.preventDefault();
        try {
          t.setPointerCapture(s.pointerId);
        } catch {
        }
        const d = s.clientX, u = i + 1, p = e.querySelector ? e.querySelector(`aws-table-row > aws-table-cell:nth-child(${u})`) : null, w = e.querySelector ? e.querySelector(`aws-table-row > aws-table-cell:nth-child(${u + 1})`) : null, q = p ? p.offsetWidth || p.getBoundingClientRect().width : 80, z = w ? w.offsetWidth || w.getBoundingClientRect().width : 80, b = 24;
        let M = 0, $ = 0;
        try {
          if (p) {
            const n = getComputedStyle(p);
            M = (parseFloat(n.paddingLeft) || 0) + (parseFloat(n.paddingRight) || 0);
          }
          if (w) {
            const n = getComputedStyle(w);
            $ = (parseFloat(n.paddingLeft) || 0) + (parseFloat(n.paddingRight) || 0);
          }
        } catch {
        }
        const _ = (n) => {
          const T = n.clientX - d, H = q + z, N = Math.max(b, Math.ceil(b + M)), W = Math.max(b, Math.ceil(b + $));
          let I = q + T, v = Math.max(N, Math.min(I, H - W)), B = Math.max(b, H - v);
          e.style.setProperty(`--col-${u}-width`, `${v}px`), e.style.setProperty(`--col-${u + 1}-width`, `${B}px`);
          try {
            e.querySelectorAll("aws-table-row").forEach((f) => {
              const C = f.querySelector(`aws-table-cell:nth-child(${u})`), R = f.querySelector(`aws-table-cell:nth-child(${u + 1})`);
              C && (C.style.width = `${v}px`), R && (R.style.width = `${B}px`);
            });
          } catch {
          }
          try {
            const S = Array.from(o.querySelectorAll("aws-table-cell"));
            let f = 0;
            for (let A = 0; A <= i; A++) {
              const L = S[A];
              L && (f += L.offsetWidth || L.getBoundingClientRect().width);
            }
            const C = l.clientWidth || l.getBoundingClientRect().width, R = Math.min(Math.max(0, f), C);
            t.style.left = `${R - 7}px`;
          } catch {
          }
        }, P = (n) => {
          try {
            t.releasePointerCapture(n.pointerId);
          } catch {
          }
          document.removeEventListener("pointermove", _), document.removeEventListener("pointerup", P), r.style.background = "rgba(255,255,255,0.5)";
        };
        document.addEventListener("pointermove", _), document.addEventListener("pointerup", P), r.style.background = "rgba(255,255,255,0.9)";
      });
    }), new ResizeObserver(() => {
      const c = l.getBoundingClientRect();
      a.offsetTop || a.getBoundingClientRect().top - c.top;
      const i = Array.from(o.querySelectorAll("aws-table-cell")), g = Array.from(l.querySelectorAll(".col-resizer-global"));
      i.forEach((y, t) => {
        if (t >= i.length - 1) return;
        const s = y.getBoundingClientRect().right - c.left, d = g[t];
        d && (d.style.left = `${s - 7}px`), d && (d.style.top = "0px"), d && (d.style.height = `${Math.max(24, l.scrollHeight)}px`);
      });
    }).observe(l);
  }
}
class O extends HTMLElement {
  connectedCallback() {
    this.setAttribute("role", "rowgroup");
  }
}
class j extends HTMLElement {
  connectedCallback() {
    this.setAttribute("role", "rowgroup");
  }
}
class D extends HTMLElement {
  connectedCallback() {
    this.setAttribute("role", "row"), this.style.display = "table-row";
  }
}
class U extends HTMLElement {
  connectedCallback() {
    this.setAttribute("role", "cell"), this.style.display = "table-cell", this.style.padding = this.style.padding || "1.2rem 20px";
  }
}
customElements.define("aws-table", G);
customElements.define("aws-table-head", O);
customElements.define("aws-table-body", j);
customElements.define("aws-table-row", D);
customElements.define("aws-table-cell", U);
