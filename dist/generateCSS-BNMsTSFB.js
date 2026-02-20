import { getThemeObject as o, cssVarsString as i } from "./theme-D01i-Ra9.js";
import { setThemeObject as p } from "./theme-D01i-Ra9.js";
function g(n = o()) {
  const e = i(Object.assign({}, o().cssVars || {}, n && n.cssVars || {})), r = n.widgets.button;
  function d(s) {
    if (!s) return null;
    const a = s.replace("#", "").trim();
    return a.length === 3 ? [parseInt(a[0] + a[0], 16), parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16)] : a.length === 6 ? [parseInt(a.slice(0, 2), 16), parseInt(a.slice(2, 4), 16), parseInt(a.slice(4, 6), 16)] : null;
  }
  const t = d(r.primaryBg);
  return t && `${t[0]}${t[1]}${t[2]}`, `:host{${e}}
        :host { display: inline-block; }
        .btn {
            display: inline-flex;
            align-items: center;
            gap: ${n.spacing.widgetGap};
            padding: ${r.padding.md};
            border-radius: ${r.borderRadius};
            cursor: pointer;
            border: 1px solid var(--aws-border, ${r.border});
            background: var(--aws-button-bg, var(--aws-accent, ${r.primaryBg}));
            /* prefer an alpha background when provided via --aws-button-bg; fallback to a subtle rgba of primary */
            background: var(--aws-button-bg, \${primaryRgbaFallback});
            color: var(--aws-button-color, var(--aws-foreground, ${r.color}));
            transition: transform .2s ease, background .2s ease;
        }
        .btn[data-variant="secondary"] { background: var(--aws-button-secondary-bg, ${r.secondaryBg}); border-color: var(--aws-border, ${r.border}); }
        .btn[data-variant="ghost"] { background: var(--aws-button-ghost-bg, ${r.ghostBg}); border: none; }
        .btn[data-size="sm"] { padding: ${r.padding.sm}; }
        .btn[data-size="md"] { padding: ${r.padding.md}; }
        .btn[data-size="lg"] { padding: ${r.padding.lg}; }
        .btn:hover:not(:disabled) { transform: ${r.hoverTransform}; }
        .btn:disabled { opacity: .5; cursor: not-allowed; }
    `;
}
export {
  g as generateCSS,
  p as setTheme
};
