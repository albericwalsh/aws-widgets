import { getThemeObject, setThemeObject, cssVarsString } from '../utils/theme.js';

export { setThemeObject as setTheme };

export function generateCSS(theme = getThemeObject()) {
    const cssVars = cssVarsString(Object.assign({}, getThemeObject().cssVars || {}, (theme && theme.cssVars) || {}));
    const btn = theme.widgets.button;
    function hexToRgb(hex) {
        if (!hex) return null;
        const h = hex.replace('#', '').trim();
        if (h.length === 3) {
            return [parseInt(h[0]+h[0],16), parseInt(h[1]+h[1],16), parseInt(h[2]+h[2],16)];
        }
        if (h.length === 6) {
            return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
        }
        return null;
    }
    const primaryRgb = hexToRgb(btn.primaryBg);
    const primaryRgbaFallback = primaryRgb ? `rgba(${primaryRgb[0]}, ${primaryRgb[1]}, ${primaryRgb[2]}, 0.08)` : 'rgba(16,185,129,0.08)';

    return `:host{${cssVars}}\n        :host { display: inline-block; }
        .btn {
            display: inline-flex;
            align-items: center;
            gap: ${theme.spacing.widgetGap};
            padding: ${btn.padding.md};
            border-radius: ${btn.borderRadius};
            cursor: pointer;
            border: 1px solid var(--aws-border, ${btn.border});
            background: var(--aws-button-bg, var(--aws-accent, ${btn.primaryBg}));
            /* prefer an alpha background when provided via --aws-button-bg; fallback to a subtle rgba of primary */
            background: var(--aws-button-bg, ${'${primaryRgbaFallback}'});
            color: var(--aws-button-color, var(--aws-foreground, ${btn.color}));
            transition: transform .2s ease, background .2s ease;
        }
        .btn[data-variant="secondary"] { background: var(--aws-button-secondary-bg, ${btn.secondaryBg}); border-color: var(--aws-border, ${btn.border}); }
        .btn[data-variant="ghost"] { background: var(--aws-button-ghost-bg, ${btn.ghostBg}); border: none; }
        .btn[data-size="sm"] { padding: ${btn.padding.sm}; }
        .btn[data-size="md"] { padding: ${btn.padding.md}; }
        .btn[data-size="lg"] { padding: ${btn.padding.lg}; }
        .btn:hover:not(:disabled) { transform: ${btn.hoverTransform}; }
        .btn:disabled { opacity: .5; cursor: not-allowed; }
    `;
}
