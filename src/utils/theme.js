// src/utils/theme.js
export async function loadTheme() {
    const res = await fetch(new URL("../style.json", import.meta.url));
    return await res.json();
}

export function generateTitleCSS(theme) {
    return `
        :host {
            --font-title: ${theme.fonts.title};
            --color-text-primary: ${theme.colors.textPrimary};
        }
        .widget-title {
            font-family: var(--font-title);
            font-size: 2.5rem;
            margin-bottom: 10px;
            color: var(--color-text-primary);
        }
    `;
}

export function generateButtonCSS(theme) {
    return `
        :host { display: inline-block; }
        .btn {
            display: inline-flex;
            align-items: center;
            gap: ${theme.spacing.widgetGap};
            padding: 12px 28px;
            border-radius: 40px;
            cursor: pointer;
            border: 1px solid ${theme.colors.btnBorder};
            background: ${theme.colors.btnPrimaryBg};
            color: ${theme.colors.btnColor};
            transition: transform .2s ease, background .2s ease;
        }
        .btn[data-variant="secondary"] { background: ${theme.colors.btnSecondaryBg}; border-color: ${theme.colors.btnBorder}; }
        .btn:hover:not(:disabled) { transform: translateY(-2px); }
        .btn:disabled { opacity: .5; cursor: not-allowed; }
    `;
}
