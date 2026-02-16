import { loadTheme as u } from "./theme-C1Hn9FBu.js";
import { generateCSS as p } from "./generateCSS-DD50tOKZ.js";
class _ extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this._onSlotChange = this._onSlotChange.bind(this), this._onKeyDown = this._onKeyDown.bind(this), this._onDocumentClick = this._onDocumentClick ? this._onDocumentClick.bind(this) : null;
  }
  static get observedAttributes() {
    return ["disabled", "mode"];
  }
  attributeChangedCallback(t, s, e) {
    t === "disabled" && this._applyDisabledState(), t === "mode" && this._applyModeState();
  }
  async connectedCallback() {
    if (this._inited) return;
    const t = await u(), s = p(t), e = document.createElement("template");
    e.innerHTML = `<style>${s}</style>
            <div class="selector" role="combobox" aria-haspopup="listbox">
                <div class="selected" tabindex="0"><span class="selected-label"></span><span class="chev">▾</span></div>
                <div class="popup" role="listbox" aria-hidden="true"></div>
                <slot></slot>
            </div>`, this.shadowRoot.appendChild(e.content.cloneNode(!0)), this._root = this.shadowRoot.querySelector(".selector"), this._selectedEl = this.shadowRoot.querySelector(".selected"), this._selectedLabel = this.shadowRoot.querySelector(".selected-label"), this._popupEl = this.shadowRoot.querySelector(".popup");
    try {
      this._popupEl && (this._popupEl.remove(), this._popupEl = null);
    } catch {
    }
    this._portalEl = null, this.shadowRoot.querySelector("slot").addEventListener("slotchange", this._onSlotChange);
    try {
      this._popupEl.style.display = "none", this._popupEl.setAttribute("aria-hidden", "true");
    } catch {
    }
    this._onSlotChange(), this._selectedEl.addEventListener("click", (i) => {
      i.stopPropagation(), !(this.hasAttribute("disabled") || this.getAttribute("mode") === "view") && this._togglePopup();
    }), this._selectedEl.addEventListener("keydown", (i) => {
      i.key === "Enter" || i.key === " " ? (i.preventDefault(), this._togglePopup()) : i.key === "ArrowDown" && (i.preventDefault(), this._focusFirstItem());
    }), this._root && this._root.addEventListener("keydown", this._onKeyDown), this._applyDisabledState(), this._applyModeState(), this._inited = !0;
  }
  disconnectedCallback() {
    this._root && this._root.removeEventListener("keydown", this._onKeyDown);
    try {
      document.removeEventListener("click", this._onDocumentClick);
    } catch {
    }
    if (this._portalEl) {
      try {
        this._portalEl.remove();
      } catch {
      }
      this._portalEl = null;
    }
  }
  _onSlotChange() {
    const s = this.shadowRoot.querySelector("slot").assignedElements({ flatten: !0 });
    s.forEach((i) => {
      try {
        i.tagName && i.tagName.toLowerCase() === "aws-selector" && (i.style.display = "none", i.hidden = !0, i.setAttribute("aria-hidden", "true"));
      } catch {
      }
    });
    const e = s.filter((i) => i.tagName && i.tagName.toLowerCase() === "aws-option");
    this._options = e, e.forEach((i, a) => {
      try {
        i.style.display = "none", i.hidden = !0, i.setAttribute("aria-hidden", "true");
      } catch {
      }
      i.setAttribute("role", "option"), i.hasAttribute("tabindex") || i.setAttribute("tabindex", "-1");
    });
    const o = e.find((i) => i.hasAttribute("selected")) || e[0];
    this._focusedIndex = e.indexOf(o) >= 0 ? e.indexOf(o) : 0, this._updateSelectedLabel(o), this._onDocumentClick || (this._onDocumentClick = (i) => {
      const a = this.contains(i.target) || this.shadowRoot && this.shadowRoot.contains(i.target), l = this._portalEl && this._portalEl.contains(i.target);
      !a && !l && this._closePopup();
    });
  }
  _selectByElement(t) {
    if (this.hasAttribute("disabled") || !t || t.hasAttribute("disabled")) return;
    this._options.forEach((e) => {
      e.removeAttribute("selected"), e.setAttribute("aria-selected", "false");
    }), t.setAttribute("selected", ""), t.setAttribute("aria-selected", "true"), this._updateSelectedLabel(t);
    const s = t.getAttribute("data-id") || t.id || null;
    this.dispatchEvent(new CustomEvent("change", { detail: { id: s, element: t }, bubbles: !0, composed: !0 }));
  }
  _applyDisabledState() {
    const t = this.hasAttribute("disabled");
    try {
      this._selectedEl && (t ? (this._selectedEl.setAttribute("aria-disabled", "true"), this._selectedEl.tabIndex = -1, this._selectedEl.classList.add("disabled")) : (this._selectedEl.removeAttribute("aria-disabled"), this._selectedEl.tabIndex = 0, this._selectedEl.classList.remove("disabled")));
    } catch {
    }
  }
  _applyModeState() {
    const t = this.getAttribute("mode") || "edit";
    try {
      this._selectedEl && (t === "view" ? (this._selectedEl.setAttribute("aria-readonly", "true"), this._selectedEl.tabIndex = -1, this._selectedEl.classList.add("view")) : (this.hasAttribute("disabled") || (this._selectedEl.tabIndex = 0), this._selectedEl.removeAttribute("aria-readonly"), this._selectedEl.classList.remove("view")));
    } catch {
    }
  }
  _updateSelectedLabel(t) {
    if (!t) {
      this._selectedLabel.textContent = "";
      return;
    }
    try {
      this._selectedLabel.innerHTML = t.innerHTML;
    } catch {
      this._selectedLabel.textContent = t.textContent || "";
    }
  }
  // public property accessors for value
  get value() {
    try {
      if (!this._options || !this._options.length) return this.getAttribute("value") || null;
      const t = this._options.find((s) => s.hasAttribute("selected")) || null;
      return t && (t.getAttribute("data-id") || t.id || t.getAttribute("value") || (t.textContent || "").trim()) || null;
    } catch {
      return null;
    }
  }
  set value(t) {
    try {
      if (t == null ? this.removeAttribute("value") : this.setAttribute("value", String(t)), !this._options || !this._options.length) return;
      const s = this._options.find((e) => {
        const o = e.getAttribute("data-id"), i = e.id || null, a = e.getAttribute("value"), l = (e.textContent || "").trim();
        return o !== null && o == t || i && i == t || a !== null && a == t || l && l == t;
      });
      s && this._selectByElement(s);
    } catch {
    }
  }
  _togglePopup() {
    this._portalEl ? this._closePopup() : this._openPopup();
  }
  _openPopup() {
    if (this._portalEl) return;
    const t = document.createElement("div");
    t.className = "aws-selector-portal", t.style.position = "fixed", t.style.zIndex = "2147483647", t.style.minWidth = "100px", t.style.left = "0px", t.style.top = "0px", t.style.pointerEvents = "auto";
    const s = document.createElement("div");
    s.className = "popup open", s.setAttribute("role", "listbox"), s.setAttribute("aria-hidden", "false"), this._options.forEach((l, c) => {
      const n = document.createElement("div");
      n.className = "item", n.tabIndex = 0;
      try {
        n.innerHTML = l.innerHTML;
      } catch {
        n.textContent = l.textContent || "";
      }
      const d = l.getAttribute("data-id") || l.id || "";
      d && (n.dataset.id = d), n.addEventListener("click", (r) => {
        r.stopPropagation(), this._selectByElement(l), this._closePopup();
      }), n.addEventListener("keydown", (r) => {
        (r.key === "Enter" || r.key === " ") && (r.preventDefault(), this._selectByElement(l), this._closePopup());
      }), s.appendChild(n);
    });
    try {
      const l = this.shadowRoot.querySelector("style");
      if (l && l.textContent) {
        const c = document.createElement("style");
        c.textContent = l.textContent, t.appendChild(c);
      }
    } catch {
    }
    t.appendChild(s), document.body.appendChild(t), this._portalEl = t;
    try {
      this._popupEl && (this._popupEl.style.display = "none", this._popupEl.setAttribute("aria-hidden", "true"));
    } catch {
    }
    try {
      document.addEventListener("click", this._onDocumentClick);
    } catch {
    }
    const e = this._selectedEl.getBoundingClientRect();
    s.style.minWidth = e.width + "px";
    let o = e.bottom, i = e.left;
    s.style.visibility = "hidden", requestAnimationFrame(() => {
      const l = s.offsetHeight;
      o + l > window.innerHeight && (o = e.top - l), t.style.left = Math.max(4, i) + "px", t.style.top = Math.max(4, o) + "px", s.style.visibility = "visible";
    }), this._selectedEl.setAttribute("aria-expanded", "true"), this._focusFirstItem();
  }
  _closePopup() {
    try {
      Array.from(document.querySelectorAll(".aws-selector-portal")).forEach((e) => {
        try {
          const o = e.querySelector(".popup");
          o && (o.classList.remove("open"), o.style.display = "none", o.setAttribute("aria-hidden", "true")), e.style.display = "none", e.remove();
        } catch {
        }
      }), Array.from(document.querySelectorAll("body .popup")).forEach((e) => {
        if (!e.closest(".aws-selector-portal"))
          try {
            e.classList.remove("open"), e.style.display = "none", e.setAttribute("aria-hidden", "true"), e.remove();
          } catch {
          }
      });
    } catch {
    }
    this._portalEl = null;
    try {
      document.removeEventListener("click", this._onDocumentClick);
    } catch {
    }
    if (this._popupEl) {
      try {
        this._popupEl.style.display = "";
      } catch {
      }
      this._popupEl.classList.remove("open"), this._popupEl.setAttribute("aria-hidden", "true");
    }
    this._selectedEl.setAttribute("aria-expanded", "false");
  }
  _focusFirstItem() {
    if (this._portalEl) {
      const s = this._portalEl.querySelector(".item");
      s && s.focus();
      return;
    }
    const t = this._popupEl.querySelector(".item");
    t && t.focus();
  }
  _onKeyDown(t) {
    if (!this._options || !this._options.length) return;
    const s = t.key;
    if (s === "ArrowRight" || s === "ArrowDown")
      if (t.preventDefault(), this._focusedIndex = Math.min(this._options.length - 1, this._focusedIndex + 1), this._portalEl) {
        const o = Array.from(this._portalEl.querySelectorAll(".item"))[this._focusedIndex];
        o && o.focus();
      } else {
        const e = this._options[this._focusedIndex];
        e && e.focus();
      }
    else if (s === "ArrowLeft" || s === "ArrowUp")
      if (t.preventDefault(), this._focusedIndex = Math.max(0, this._focusedIndex - 1), this._portalEl) {
        const o = Array.from(this._portalEl.querySelectorAll(".item"))[this._focusedIndex];
        o && o.focus();
      } else {
        const e = this._options[this._focusedIndex];
        e && e.focus();
      }
    else if (s === "Enter" || s === " ") {
      t.preventDefault();
      const e = this._options[this._focusedIndex];
      e && this._selectByElement(e);
    }
  }
}
class f extends HTMLElement {
  connectedCallback() {
    this.hasAttribute("role") || this.setAttribute("role", "option"), this.hasAttribute("tabindex") || this.setAttribute("tabindex", "-1");
  }
}
customElements.get("aws-selector") || customElements.define("aws-selector", _);
customElements.get("aws-option") || customElements.define("aws-option", f);
export {
  f as SP_Option,
  _ as SP_Selector
};
