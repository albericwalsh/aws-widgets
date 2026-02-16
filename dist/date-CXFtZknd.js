import { copi_btn as p } from "./input_utils-CFhbOVXQ.js";
import { loadTheme as d } from "./theme-C1Hn9FBu.js";
import { generateCSS as y } from "./generateCSS-C90fMwhA.js";
async function S({ mode: n = "input", value: o = "", disabled: r = !1 } = {}) {
  const l = `
<label class="date-wrapper">
    <input id="value" class="input" type="date" ${r ? "disabled" : ""}>
</label>

<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, u = `
<div id="value" class="output">${String(o || "")}</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, m = n === "input" ? l : u, c = document.createElement("template");
  c.innerHTML = m;
  const t = c.content.cloneNode(!0);
  try {
    const s = await d(), a = document.createElement("style");
    a.textContent = y(s), t.prepend(a);
  } catch {
  }
  const i = t.querySelector(".input"), e = t.querySelector("#copy");
  return n === "input" ? i && e && p(e, () => i.value) : e && p(e, () => String(o || "")), t;
}
export {
  S as create_element
};
