import { copi_btn as s } from "./input_utils-CFhbOVXQ.js";
import { loadTheme as v } from "./theme-D01i-Ra9.js";
import { generateCSS as y } from "./generateCSS-DlK808xh.js";
async function h({ mode: r = "input", value: c = "", disabled: l = !1 } = {}) {
  const d = `
<div id="favicon" class="favicon"><span class="fallback-emoji">🌐</span></div>
<label>
    <input id="value"
           class="input"
           type="url"
           placeholder="https://example.com" ${l ? "disabled" : ""}>
</label>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, f = `
<div id="favicon" class="favicon"><span class="fallback-emoji">🌐</span></div>
<button id="value" class="output" type="button">${String(c || "")}</button>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, m = r === "input" ? d : f, p = document.createElement("template");
  p.innerHTML = m;
  const i = p.content.cloneNode(!0);
  try {
    const e = await v(), n = document.createElement("style");
    n.textContent = y(e), i.prepend(n);
  } catch {
  }
  const t = i.querySelector("#value"), a = i.querySelector("#favicon"), o = i.querySelector("#copy");
  function u(e) {
    try {
      const n = new URL(e);
      a.innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${n.hostname}&sz=64" alt="favicon">`, a.classList.remove("no-favicon");
    } catch {
      a.innerHTML = '<span class="fallback-emoji">🌐</span>', a.classList.add("no-favicon");
    }
  }
  if (r === "input")
    t && t.addEventListener("input", () => {
      u(t.value), o && s(o, () => t.value);
    }), o && s(o, () => t?.value ?? "");
  else {
    u(c || ""), o && s(o, () => String(c || ""));
    try {
      if (t && !l) {
        t.style.cursor = "pointer", t.setAttribute && t.setAttribute("role", "link"), t.tabIndex = 0;
        const e = () => {
          try {
            const n = new URL((t.textContent || String(c || "")).trim());
            typeof window < "u" && window.open && window.open(n.toString(), "_blank", "noopener");
          } catch {
          }
        };
        t.addEventListener && t.addEventListener("click", e), t.addEventListener && t.addEventListener("keydown", (n) => {
          (n.key === "Enter" || n.key === " ") && (n.preventDefault(), e());
        });
      }
    } catch {
    }
  }
  return i;
}
export {
  h as create_element
};
