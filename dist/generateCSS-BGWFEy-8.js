import { getThemeObject as s, cssVarsString as r } from "./theme-D01i-Ra9.js";
import { setThemeObject as l } from "./theme-D01i-Ra9.js";
function t(e = s()) {
  return `:host{${r(Object.assign({}, s().cssVars || {}, e && e.cssVars || {}))}}
        #value{ font: inherit; color: var(--aws-foreground, inherit); }
            #value::placeholder{ color: var(--aws-subtext, rgba(255,255,255,0.7)); }
        #copy{ margin-left:8px; }
    `;
}
const c = { generateCSS: t };
export {
  c as default,
  t as generateCSS,
  l as setTheme
};
