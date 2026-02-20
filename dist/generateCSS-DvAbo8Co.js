import { getThemeObject as o, cssVarsString as s } from "./theme-D01i-Ra9.js";
import { setThemeObject as i } from "./theme-D01i-Ra9.js";
function n(r = o()) {
  return `:host{${s(Object.assign({}, o().cssVars || {}, r && r.cssVars || {}))}}
    :host{display:block}
    .phone-dial{ margin-right:6px; font-weight:600 }
    .input{ padding:6px 8px; border-radius:6px; border:1px solid var(--aws-border, ${r?.colors?.border || "#ccc"}); background:var(--aws-bg, ${r?.colors?.surface || "#fff"}); color:var(--aws-foreground, ${r?.colors?.text || "#000"}) }
    sp-icon-button{ margin-left:8px; color:var(--aws-foreground, ${r?.colors?.text || "#000"}) }
    `;
}
export {
  n as generateCSS,
  i as setTheme
};
