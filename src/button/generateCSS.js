export function generateCSS(theme) {
    const btn = theme.widgets.button;

    return `
        :host { display: inline-block; }
        .btn {
            display: inline-flex;
            align-items: center;
            gap: ${theme.spacing.widgetGap};
            padding: ${btn.padding.md};
            border-radius: ${btn.borderRadius};
            cursor: pointer;
            border: 1px solid ${btn.border};
            background: ${btn.primaryBg};
            color: ${btn.color};
            transition: transform .2s ease, background .2s ease;
        }
        .btn[data-variant="secondary"] { background: ${btn.secondaryBg}; border-color: ${btn.border}; }
        .btn[data-variant="ghost"] { background: ${btn.ghostBg}; border: none; }
        .btn[data-size="sm"] { padding: ${btn.padding.sm}; }
        .btn[data-size="md"] { padding: ${btn.padding.md}; }
        .btn[data-size="lg"] { padding: ${btn.padding.lg}; }
        .btn:hover:not(:disabled) { transform: ${btn.hoverTransform}; }
        .btn:disabled { opacity: .5; cursor: not-allowed; }
    `;
}
