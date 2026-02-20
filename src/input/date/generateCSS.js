import { getThemeObject, setThemeObject, cssVarsString } from '../../utils/theme.js';

export { setThemeObject as setTheme };

export function generateCSS(theme = getThemeObject()){
    const cssVars = cssVarsString(Object.assign({}, getThemeObject().cssVars || {}, (theme && theme.cssVars) || {}));
        return `:host{${cssVars}}\n        #value{ font: inherit; color: var(--aws-foreground, inherit); }
            #value::placeholder{ color: var(--aws-subtext, rgba(255,255,255,0.7)); }
        #copy{ margin-left:8px; }
    `;
}

export default { generateCSS };
