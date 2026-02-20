import { getThemeObject as t, cssVarsString as r } from "./theme-D01i-Ra9.js";
import { setThemeObject as c } from "./theme-D01i-Ra9.js";
function a(e = t()) {
  return `:host{${r(Object.assign({}, t().cssVars || {}, e && e.cssVars || {}))}}
        #value{ font: inherit; color: var(--aws-foreground, inherit); }
            #value::placeholder{ color: var(--aws-subtext, rgba(255,255,255,0.7)); }
        #copy{ margin-left:8px; }
        /* customize native spinner arrows */
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
            width: 14px;
            height: 14px;
            opacity: 0.9;
            filter: grayscale(20%);
        }
        /* fallback for Firefox */
        input[type=number] {
            -moz-appearance: textfield;
        }
    `;
}
const i = { generateCSS: a };
export {
  i as default,
  a as generateCSS,
  c as setTheme
};
