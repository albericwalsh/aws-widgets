import { copi_btn as p } from "./input_utils-CFhbOVXQ.js";
import { loadTheme as d } from "./theme-D01i-Ra9.js";
import { generateCSS as y } from "./generateCSS-DeTeZwUU.js";
async function h({ mode: e = "input", value: n = "", disabled: s = !1 } = {}) {
  const u = `
<label>
    <input id="value" class="input" type="number" placeholder="number" ${s ? "disabled" : ""}/>
</label>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, l = `
<div id="value" class="output">${String(n || "")}</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, a = e === "input" ? u : l, o = document.createElement("template");
  o.innerHTML = a.trim();
  const t = o.content.cloneNode(!0);
  try {
    const i = await d(), r = document.createElement("style");
    r.textContent = y(i), t.prepend(r);
  } catch {
  }
  const m = t.querySelector(".input"), c = t.querySelector("#copy");
  return e === "input" ? p(c, () => m.value) : p(c, () => String(n || "")), t;
}
export {
  h as create_element
};
