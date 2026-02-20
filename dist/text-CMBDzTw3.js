import { copi_btn as a } from "./input_utils-CFhbOVXQ.js";
import { loadTheme as s } from "./theme-D01i-Ra9.js";
import { generateCSS as r } from "./generateCSS-CLoykNIQ.js";
async function h({ mode: n = "input", value: o = "" } = {}) {
  const i = n === "input" ? `
<label>
    <input id="value" class="input" type="text" placeholder="text">
</label>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
` : `
<div id="value" class="output">Valeur affichée</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, c = document.createElement("template");
  c.innerHTML = i;
  const t = c.content.cloneNode(!0);
  try {
    const l = await s(), u = document.createElement("style");
    u.textContent = r(l), t.prepend(u);
  } catch {
  }
  const e = t.querySelector("#value");
  n === "input" ? e.value = o : e.textContent = o;
  const p = t.querySelector("#copy");
  return a(p, () => n === "input" ? e.value : e.textContent), t;
}
export {
  h as create_element
};
