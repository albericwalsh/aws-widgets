import { getThemeObject as e, cssVarsString as r } from "./theme-D01i-Ra9.js";
import { setThemeObject as g } from "./theme-D01i-Ra9.js";
function t(s = e()) {
  return s && s.widgets && s.widgets.input, `:host{${r(Object.assign({}, e().cssVars || {}, s && s.cssVars || {}))}}
            #value{ font: inherit; color: var(--aws-foreground, inherit); }
            #value::placeholder{ color: var(--aws-subtext, rgba(255,255,255,0.7)); }
            #copy{ margin-left:8px; }
        `;
}
const c = { generateCSS: t };
export {
  c as default,
  t as generateCSS,
  g as setTheme
};
