function b(d) {
  return String(d).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function E(d) {
  return String(d).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}
function v(d, h, l) {
  const s = h.id, m = h.parameters || {}, n = d._refs;
  n.title.textContent = s, n.controls.innerHTML = "";
  function y() {
    Object.keys(l).forEach((e) => {
      const o = l[e];
      if (e === "label" || e === "text")
        n.liveEl.textContent = o;
      else if (e === "content")
        (/* @__PURE__ */ new Set(["table", "selector"])).has(s) ? n.liveEl.innerHTML = o || "" : n.liveEl.textContent = o;
      else if (typeof o == "boolean")
        o ? n.liveEl.setAttribute(e, "") : n.liveEl.removeAttribute(e);
      else if (e === "types" && s === "input") {
        let c = o;
        Array.isArray(o) && (c = o[0] || ""), c != null && c !== "" ? n.liveEl.setAttribute("type", String(c)) : n.liveEl.removeAttribute("type");
      } else o != null && o !== "" ? n.liveEl.setAttribute(e, String(o)) : n.liveEl.removeAttribute(e);
    });
  }
  function r() {
    const e = `aws-${s}`, o = [];
    let c = "";
    for (const [a, p] of Object.entries(l)) {
      if (a === "label" || a === "text" || a === "content") {
        c = p;
        continue;
      }
      const g = s === "input" && a === "types" ? "type" : a;
      let u = p;
      s === "input" && a === "types" && Array.isArray(p) && (u = p[0]), typeof p == "boolean" ? p && o.push(g) : u != null && u !== "" && o.push(`${g}="${b(String(u))}"`);
    }
    const i = o.length ? `<${e} ${o.join(" ")}>` : `<${e}>`, t = typeof c == "string" ? E(String(c)) : "", f = `${i}${t}</${e}>`;
    n.codeBlock.textContent = f;
    try {
      if (hljs && n.codeBlock) {
        try {
          n.codeBlock.querySelector && n.codeBlock.querySelector("*") && (n.codeBlock.textContent = n.codeBlock.textContent);
        } catch {
        }
        try {
          delete n.codeBlock.dataset.highlighted;
        } catch {
        }
        try {
          hljs.highlightElement(n.codeBlock);
        } catch {
        }
      }
    } catch {
    }
    y();
  }
  if (h.desactivable) {
    const e = "disabled", o = document.createElement("div");
    o.className = "control-group";
    const c = document.createElement("label");
    c.className = "control-label", c.textContent = e, o.appendChild(c);
    const i = document.createElement("input");
    i.type = "checkbox", i.className = "control-input";
    const t = l && typeof l[e] < "u" ? l[e] : m && typeof m[e] < "u" ? m[e] : !1;
    i.checked = !!t, l[e] = !!t, i.addEventListener("change", () => {
      l[e] = i.checked, r();
    }), o.appendChild(i), n.controls.appendChild(o);
  }
  for (const [e, o] of Object.entries(m)) {
    const c = document.createElement("div");
    c.className = "control-group";
    const i = document.createElement("label");
    i.className = "control-label", i.textContent = e, c.appendChild(i);
    let t;
    if (Array.isArray(o)) {
      t = document.createElement("select"), t.className = "control-input";
      for (const f of o) {
        const a = document.createElement("option");
        a.value = f, a.textContent = f, t.appendChild(a);
      }
      t.value = l[e], t.addEventListener("change", () => {
        l[e] = t.value, r();
      });
    } else typeof o == "boolean" ? (t = document.createElement("input"), t.type = "checkbox", t.className = "control-input", t.checked = !!l[e], t.addEventListener("change", () => {
      l[e] = t.checked, r();
    })) : typeof o == "number" ? (t = document.createElement("input"), t.type = "number", t.className = "control-input", t.value = l[e], t.addEventListener("input", () => {
      l[e] = Number(t.value), r();
    })) : e === "content" || e === "data" || e === "data_name" ? (t = document.createElement("textarea"), t.className = "control-input", t.rows = e === "data" ? 3 : 4, t.value = l[e] || "", t.addEventListener("input", () => {
      l[e] = t.value, r();
    })) : (t = document.createElement("input"), t.type = "text", t.className = "control-input", t.value = l[e], t.addEventListener("input", () => {
      l[e] = t.value, r();
    }));
    c.appendChild(t), n.controls.appendChild(c);
  }
  n.copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(n.codeBlock.textContent);
      const e = n.copyBtn.innerHTML;
      n.copyBtn.innerHTML = '<span class="material-icons">check</span>', setTimeout(() => {
        n.copyBtn.innerHTML = e;
      }, 1200);
    } catch {
      n.copyBtn.innerHTML = '<span class="material-icons">error</span>', setTimeout(() => {
        n.copyBtn.innerHTML = '<span class="material-icons">content_copy</span>';
      }, 1200);
    }
  }), r();
}
export {
  v as populatePresentationSection
};
