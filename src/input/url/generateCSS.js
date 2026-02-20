import { getThemeObject, setThemeObject, cssVarsString } from '../../utils/theme.js';

export { setThemeObject as setTheme };

export function generateCSS(theme = getThemeObject()){
    const cssVars = cssVarsString(Object.assign({}, getThemeObject().cssVars || {}, (theme && theme.cssVars) || {}));
    return `:host{${cssVars}}\n        #value{ font: inherit; color: inherit; }
        /* output view: make value look like a button (no underline, pointer) */
        /* output shown as a light button (no underline) */
        .output#value {
            -webkit-appearance: none;
            appearance: none;
            border: none;
            background: var(--aws-bg, rgba(255,255,255,0.02));
            color: inherit;
            cursor: pointer;
            display: inline-block;
            padding: 4px 8px;
            border-radius: 6px;
            transition: background .12s ease;
        }
        .output#value:hover { background: var(--aws-bg, rgba(255,255,255,0.04)); }
        #copy{ margin-left:8px; }
        .favicon{ width:24px; height:24px; border-radius:50%; overflow:hidden; display:inline-flex; align-items:center; justify-content:center; margin-right:6px; background:var(--aws-bg, rgba(255,255,255,0.04)) }
        .favicon img{ width:100%; height:100%; object-fit:cover; display:block }
        .favicon.no-favicon .fallback-emoji{ font-size:16px; line-height:1 }
    `;
}

export default { generateCSS };
