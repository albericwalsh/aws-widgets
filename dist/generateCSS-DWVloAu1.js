function n(a) {
  const d = a.widgets.button;
  return `
        :host { display: inline-block; }
        .btn {
            display: inline-flex;
            align-items: center;
            gap: ${a.spacing.widgetGap};
            padding: ${d.padding.md};
            border-radius: ${d.borderRadius};
            cursor: pointer;
            border: 1px solid ${d.border};
            background: ${d.primaryBg};
            color: ${d.color};
            transition: transform .2s ease, background .2s ease;
        }
        .btn[data-variant="secondary"] { background: ${d.secondaryBg}; border-color: ${d.border}; }
        .btn[data-variant="ghost"] { background: ${d.ghostBg}; border: none; }
        .btn[data-size="sm"] { padding: ${d.padding.sm}; }
        .btn[data-size="md"] { padding: ${d.padding.md}; }
        .btn[data-size="lg"] { padding: ${d.padding.lg}; }
        .btn:hover:not(:disabled) { transform: ${d.hoverTransform}; }
        .btn:disabled { opacity: .5; cursor: not-allowed; }
    `;
}
export {
  n as generateCSS
};
