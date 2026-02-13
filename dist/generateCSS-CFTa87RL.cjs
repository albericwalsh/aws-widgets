"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function n(d){const a=d.widgets.button;return`
        :host { display: inline-block; }
        .btn {
            display: inline-flex;
            align-items: center;
            gap: ${d.spacing.widgetGap};
            padding: ${a.padding.md};
            border-radius: ${a.borderRadius};
            cursor: pointer;
            border: 1px solid ${a.border};
            background: ${a.primaryBg};
            color: ${a.color};
            transition: transform .2s ease, background .2s ease;
        }
        .btn[data-variant="secondary"] { background: ${a.secondaryBg}; border-color: ${a.border}; }
        .btn[data-variant="ghost"] { background: ${a.ghostBg}; border: none; }
        .btn[data-size="sm"] { padding: ${a.padding.sm}; }
        .btn[data-size="md"] { padding: ${a.padding.md}; }
        .btn[data-size="lg"] { padding: ${a.padding.lg}; }
        .btn:hover:not(:disabled) { transform: ${a.hoverTransform}; }
        .btn:disabled { opacity: .5; cursor: not-allowed; }
    `}exports.generateCSS=n;
