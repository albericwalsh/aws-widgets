import { copi_btn as r } from "./input_utils-CFhbOVXQ.js";
import { loadTheme as m } from "./theme-D01i-Ra9.js";
import { generateCSS as g } from "./generateCSS-DbIvQDS8.js";
async function h({ mode: s = "input", value: c = "", disabled: u = !1 } = {}) {
  const d = `
<label class="password-wrapper">
    <input id="value" class="input" type="password" placeholder="password" ${u ? "disabled" : ""}>
</label>

<aws-icon-button id="toggle" size="sm">visibility</aws-icon-button>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, y = `
<div id="value" class="output">${c ? "•".repeat(String(c).length) : ""}</div>
<aws-icon-button id="toggle" size="sm" variant="ghost">visibility</aws-icon-button>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, b = s === "input" ? d : y, l = document.createElement("template");
  l.innerHTML = b;
  const e = l.content.cloneNode(!0);
  try {
    const n = await m(), i = document.createElement("style");
    i.textContent = g(n), e.prepend(i);
  } catch {
  }
  const o = e.querySelector("#value"), t = e.querySelector("#toggle"), a = e.querySelector("#copy");
  if (s === "input" && !o) return e;
  if (s === "input" && t && (t.setAttribute("variant", "ghost"), t.addEventListener("click", () => {
    const n = o.type === "password";
    o.type = n ? "text" : "password", t.textContent = n ? "visibility_off" : "visibility";
  })), s !== "input" && t) {
    const n = e.querySelector("#value");
    let i = !1;
    const p = String(c || "");
    t.setAttribute("variant", "ghost"), t.addEventListener("click", () => {
      i = !i, n.textContent = i ? p : "•".repeat(p.length), t.textContent = i ? "visibility_off" : "visibility";
    });
  }
  return a && (s === "input" ? (r(a, () => o.value), o.addEventListener("input", () => {
    r(a, () => o.value);
  })) : r(a, () => String(c || ""))), e;
}
export {
  h as create_element
};
