"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=require("./theme-wIK325iA.cjs");function i(n=t.getThemeObject()){const o=t.cssVarsString(Object.assign({},t.getThemeObject().cssVars||{},n&&n.cssVars||{})),r=n.widgets.button;function d(s){if(!s)return null;const a=s.replace("#","").trim();return a.length===3?[parseInt(a[0]+a[0],16),parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16)]:a.length===6?[parseInt(a.slice(0,2),16),parseInt(a.slice(2,4),16),parseInt(a.slice(4,6),16)]:null}const e=d(r.primaryBg);return e&&`${e[0]}${e[1]}${e[2]}`,`:host{${o}}
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
    `}exports.setTheme=t.setThemeObject;exports.generateCSS=i;
