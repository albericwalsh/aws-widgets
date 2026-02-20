import { copi_btn as m } from "./input_utils-CFhbOVXQ.js";
import { loadTheme as b } from "./theme-D01i-Ra9.js";
import { generateCSS as v } from "./generateCSS-fvMtlsFv.js";
async function C({ mode: l = "input", value: t = "", disabled: g = !1 } = {}) {
  const f = `
<label for="value"></label>
<input
        id="value"
        class="input"
        type="text"
        placeholder="XXXX-XXXX-XXXX"
        autocomplete="off"
        ${g ? "disabled" : ""}
/> 

<!-- toggle affichage -->
<aws-icon-button id="toggle" size="sm" variant="ghost">visibility</aws-icon-button>

<!-- copy -->
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, y = `
<div id="value" class="output">${String(t ? (String(t).toUpperCase().replace(/[^A-Z0-9]/g, "").match(/.{1,4}/g) || []).join("-") : "XXXX-XXXX-XXXX")}</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, d = l === "input" ? f : y, X = document.createElement("template");
  X.innerHTML = d;
  const n = X.content.cloneNode(!0);
  try {
    const c = await b(), u = document.createElement("style");
    u.textContent = v(c), n.prepend(u);
  } catch {
  }
  const e = n.querySelector("#value"), s = n.querySelector("#copy"), r = n.querySelector("#toggle");
  let i = !1, o = "";
  try {
    t && (o = String(t).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12));
  } catch {
  }
  const p = (c) => (c.match(/.{1,4}/g) || []).join("-"), a = () => "XXXX-XXXX-XXXX";
  return l === "input" && e.addEventListener("input", () => {
    o = e.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12), i ? e.value = p(o) : e.value = a();
  }), r && r.addEventListener("click", () => {
    i = !i, r.textContent = i ? "visibility_off" : "visibility", e.value = i ? p(o) : a();
  }), l === "input" ? (m(s, () => o), e.value = o ? p(o) : a(), e.autocomplete = "off") : (t ? (String(t).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12).match(/.{1,4}/g) || []).join("-") : a(), s && m(s, () => String(t || ""))), n;
}
export {
  C as create_element
};
