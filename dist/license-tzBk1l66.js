import { copi_btn as m } from "./input_utils-CFhbOVXQ.js";
import { loadTheme as b } from "./theme-C1Hn9FBu.js";
import { generateCSS as v } from "./generateCSS-C824PdX-.js";
async function C({ mode: l = "input", value: e = "", disabled: f = !1 } = {}) {
  const g = `
<label for="value"></label>
<input
        id="value"
        class="input"
        type="text"
        placeholder="XXXX-XXXX-XXXX"
        autocomplete="off"
        ${f ? "disabled" : ""}
/> 

<!-- toggle affichage -->
<aws-icon-button id="toggle" size="sm" variant="ghost">visibility</aws-icon-button>

<!-- copy -->
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, d = `
<div id="value" class="output">${String(e ? (String(e).toUpperCase().replace(/[^A-Z0-9]/g, "").match(/.{1,4}/g) || []).join("-") : "XXXX-XXXX-XXXX")}</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, y = l === "input" ? g : d, p = document.createElement("template");
  p.innerHTML = y;
  const o = p.content.cloneNode(!0);
  try {
    const a = await b(), u = document.createElement("style");
    u.textContent = v(a), o.prepend(u);
  } catch {
  }
  const t = o.querySelector("#value"), s = o.querySelector("#copy"), r = o.querySelector("#toggle");
  let n = !1, i = "";
  const X = (a) => (a.match(/.{1,4}/g) || []).join("-"), c = () => "XXXX-XXXX-XXXX";
  return l === "input" && t.addEventListener("input", () => {
    i = t.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12), n ? t.value = X(i) : t.value = c();
  }), r && r.addEventListener("click", () => {
    n = !n, r.textContent = n ? "visibility_off" : "visibility", t.value = n ? X(i) : c();
  }), l === "input" ? (m(s, () => i), t.value = c(), t.autocomplete = "off") : (e ? (String(e).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12).match(/.{1,4}/g) || []).join("-") : c(), s && m(s, () => String(e || ""))), o;
}
export {
  C as create_element
};
