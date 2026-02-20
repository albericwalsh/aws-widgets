import { copi_btn as l } from "./input_utils-CFhbOVXQ.js";
import { loadTheme as b } from "./theme-D01i-Ra9.js";
import { generateCSS as y } from "./generateCSS-WLMR6app.js";
async function h({ mode: n = "input", value: i = "", disabled: u = !1 } = {}) {
  const p = `
<label>
    <input id="value" class="input" type="email" placeholder="email@example.com" ${u ? "disabled" : ""}/>
</label>
<aws-icon-button id="send" size="sm">mail</aws-icon-button>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, m = `
<div id="value" class="output">${String(i || "")}</div>
<aws-icon-button id="send" size="sm" variant="ghost">mail</aws-icon-button>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`, d = n === "input" ? p : m, s = document.createElement("template");
  s.innerHTML = d.trim();
  const t = s.content.cloneNode(!0);
  try {
    const e = await b(), r = document.createElement("style");
    r.textContent = y(e), t.prepend(r);
  } catch {
  }
  const o = t.querySelector(".input"), c = t.querySelector("#send"), a = t.querySelector("#copy");
  return n === "input" && o && o.setAttribute("pattern", ".+@.+\\..+"), c && (c.setAttribute("variant", "ghost"), c.addEventListener("click", () => {
    const e = (n === "input" ? o?.value : String(i || "")) || "";
    e && (window.location.href = `mailto:${e}`);
  })), n === "input" ? l(a, () => o?.value ?? "") : l(a, () => String(i || "")), t;
}
export {
  h as create_element
};
