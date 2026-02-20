import { getThemeObject, setThemeObject, cssVarsString } from '../utils/theme.js';

export { setThemeObject as setTheme };

export function generateCSS(theme = getThemeObject()) {
    const cssVars = cssVarsString(Object.assign({}, getThemeObject().cssVars || {}, (theme && theme.cssVars) || {}));
    const bool = theme.widgets.bool;

    return `:host{${cssVars}}\n        :host { display: inline-block; }

        .bool-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: ${bool.wrapperMinWidth};
        }

        .bool-view {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: ${bool.view.padding};
            border-radius: ${bool.view.borderRadius};
            font-size: ${bool.view.fontSize};
            font-weight: bold;
            color: var(--aws-foreground, ${bool.view.color});
            text-align: center;
            opacity: 0.95;
            transition: all 0.25s ease;
        }

        .bool-view.on {
            background: var(--aws-accent, ${bool.view.onBg});
            border: 1px solid var(--aws-accent, ${bool.view.onBorder});
            color: var(--aws-chart-value, var(--aws-foreground, ${bool.view.color}));
        }

        .bool-view.off {
            background: var(--aws-bg, ${bool.view.offBg});
            border: 1px solid var(--aws-border, ${bool.view.offBorder});
        }

        .bool-view.pulse {
            animation: pulseChange ${bool.view.pulseDuration} ease-out;
        }

        @keyframes pulseChange {
            0%   { transform: scale(${bool.view.pulseScale}); opacity: ${bool.view.pulseOpacityStart}; }
            100% { transform: scale(1); opacity: 0.95; }
        }

        .toggle {
            position: relative;
            width: ${bool.toggle.width};
            height: ${bool.toggle.height};
            border-radius: ${bool.toggle.borderRadius};
            background: var(--aws-bg, ${bool.toggle.bg});
            border: 1px solid var(--aws-border, ${bool.toggle.border});
            cursor: pointer;
            transition: background 0.3s ease, border-color 0.3s ease,
                        transform 0.25s ease, opacity 0.25s ease;
        }

        .toggle:active {
            transform: scale(${bool.toggle.activeScale});
            opacity: ${bool.toggle.activeOpacity};
        }

        .toggle.on {
            background: var(--aws-accent, ${bool.toggle.onBg});
            border-color: var(--aws-accent, ${bool.toggle.onBorder});
        }

        .toggle .thumb {
            position: absolute;
            top: ${bool.toggle.thumbOffset};
            left: ${bool.toggle.thumbOffset};
            width: ${bool.toggle.thumbSize};
            height: ${bool.toggle.thumbSize};
            background: var(--aws-foreground, ${bool.toggle.thumbBg});
            border-radius: 50%;
            transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .toggle.on .thumb {
            transform: translateX(${bool.toggle.thumbActiveOffset});
        }

        .toggle:active .thumb {
            transform: scale(${bool.toggle.thumbActiveScale});
            opacity: ${bool.toggle.thumbActiveOpacity};
        }

        /* Disabled appearance when host or toggle is disabled */
        :host([disabled]) .toggle,
        .toggle[aria-disabled="true"] {
            cursor: not-allowed;
            opacity: 0.55;
            filter: grayscale(24%);
        }

        :host([disabled]) .toggle .thumb,
        .toggle[aria-disabled="true"] .thumb {
            background: var(--aws-muted, rgba(255,255,255,0.65));
        }

        :host([disabled]) .bool-view {
            opacity: 0.6;
            color: var(--aws-muted, rgba(255,255,255,0.65));
        }
    `;
}
