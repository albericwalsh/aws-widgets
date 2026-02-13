import { copi_btn as s } from "./input_utils-CFhbOVXQ.js";
import { loadTheme as v } from "./theme-C1Hn9FBu.js";
import { generateCSS as y } from "./generateCSS-G-R38CJk.js";
async function g({ mode: l = "input", value: i = "", disabled: u = !1 } = {}) {
  const m = `
<div id="favicon" class="favicon"><span class="fallback-emoji">🌐</span></div>
<label>
    <input id="value"
           class="input"
           type="url"
           placeholder="https://example.com" ${u ? "disabled" : ""}>
</label>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, d = `
<div id="favicon" class="favicon"><span class="fallback-emoji">🌐</span></div>
<div id="value" class="output">${String(i || "")}</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, f = l === "input" ? m : d, p = document.createElement("template");
  p.innerHTML = f;
  const n = p.content.cloneNode(!0);
  try {
    const c = await v(), a = document.createElement("style");
    a.textContent = y(c), n.prepend(a);
  } catch {
  }
  const e = n.querySelector("#value"), o = n.querySelector("#favicon"), t = n.querySelector("#copy");
  function r(c) {
    try {
      const a = new URL(c);
      o.innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${a.hostname}&sz=64" alt="favicon">`, o.classList.remove("no-favicon");
    } catch {
      o.innerHTML = '<span class="fallback-emoji">🌐</span>', o.classList.add("no-favicon");
    }
  }
  return l === "input" ? (e && e.addEventListener("input", () => {
    r(e.value), t && s(t, () => e.value);
  }), t && s(t, () => e?.value ?? "")) : (r(i || ""), t && s(t, () => String(i || ""))), n;
}
export {
  g as create_element
};
