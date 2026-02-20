import { getThemeObject, setThemeObject, cssVarsString } from '../../utils/theme.js';

export { setThemeObject as setTheme };

export function generateCSS(theme = getThemeObject()){
    const cssVars = cssVarsString(Object.assign({}, getThemeObject().cssVars || {}, (theme && theme.cssVars) || {}));
    return `:host{${cssVars}}\n    :host{display:block}\n    .input{ padding:6px 8px; border-radius:6px; border:1px solid var(--aws-border, ${theme?.colors?.border || '#ccc'}); background:var(--aws-bg, ${theme?.colors?.surface || '#fff'}); color:var(--aws-foreground, ${theme?.colors?.text || '#000'}) }\n    sp-icon-button{ margin-left:8px; color:var(--aws-muted, ${theme?.colors?.muted || '#666'}) }\n    `
}
