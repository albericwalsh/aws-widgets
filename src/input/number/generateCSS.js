import { getThemeObject, setThemeObject, cssVarsString } from '../../utils/theme.js';

export { setThemeObject as setTheme };

export function generateCSS(theme = getThemeObject()){
    const cssVars = cssVarsString(Object.assign({}, getThemeObject().cssVars || {}, (theme && theme.cssVars) || {}));
        return `:host{${cssVars}}\n        #value{ font: inherit; color: var(--aws-foreground, inherit); }
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

export default { generateCSS };
