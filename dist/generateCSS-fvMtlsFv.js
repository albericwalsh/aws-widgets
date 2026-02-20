import { getThemeObject as s, cssVarsString as o } from "./theme-D01i-Ra9.js";
import { setThemeObject as d } from "./theme-D01i-Ra9.js";
function t(r = s()) {
  return `:host{${o(Object.assign({}, s().cssVars || {}, r && r.cssVars || {}))}}
    :host{display:block}
    .input{ padding:6px 8px; border-radius:6px; border:1px solid var(--aws-border, ${r?.colors?.border || "#ccc"}); background:var(--aws-bg, ${r?.colors?.surface || "#fff"}); color:var(--aws-foreground, ${r?.colors?.text || "#000"}) }
    sp-icon-button{ margin-left:8px; color:var(--aws-muted, ${r?.colors?.muted || "#666"}) }
    `;
}
export {
  t as generateCSS,
  d as setTheme
};
