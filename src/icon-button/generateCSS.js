import { getThemeObject, setThemeObject, cssVarsString } from '../utils/theme.js';

export { setThemeObject as setTheme };

export function generateCSS(theme = getThemeObject()) {
    const cssVars = cssVarsString(Object.assign({}, getThemeObject().cssVars || {}, (theme && theme.cssVars) || {}));
    const iconBtn = theme.widgets.iconButton;
    const btnTheme = theme.widgets.button || {};

    return `:host{${cssVars}}\n        :host {
            display: inline-block;
        }

        button {
            width: var(--btn-size);
            height: var(--btn-size);
            border-radius: ${iconBtn.borderRadius};
            border: none;
            background: ${iconBtn.background};
            color: ${iconBtn.color};
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            transition: transform .25s ease, background .25s ease;
        }

        button:hover {
            background: ${iconBtn.backgroundHover};
            transform: scale(${iconBtn.hoverScale});
        }

        /* variants similar to main button */
        button[data-variant="secondary"] { background: ${btnTheme.secondaryBg || iconBtn.background}; border: 1px solid ${btnTheme.border || 'transparent'}; }
        button[data-variant="ghost"] { background: ${btnTheme.ghostBg || 'transparent'}; border: none; }

        button:active {
            background: ${iconBtn.backgroundActive};
            transform: scale(${iconBtn.activeScale});
        }

        /* Disabled state */
        :host(:disabled) button,
        button:disabled {
            opacity: 0.55;
            transform: none;
                /* keep pointer-events so the cursor can appear; interaction blocked by disabled attribute */
            filter: grayscale(28%);
            background: ${iconBtn.background};
            cursor: not-allowed;
        }
            

        /* No strikethrough; disabled state uses cursor + opacity (see above) */

        i {
            font-family: 'Material Icons', serif;
            font-size: calc(var(--btn-size) * ${iconBtn.iconRatio});
            line-height: 1;
            pointer-events: none;
            font-style: normal;
        }
    `;
}
