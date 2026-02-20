import { getThemeObject as t, cssVarsString as r } from "./theme-D01i-Ra9.js";
import { setThemeObject as n } from "./theme-D01i-Ra9.js";
function i(o = t()) {
  const a = r(Object.assign({}, t().cssVars || {}, o && o.cssVars || {})), e = o.widgets.bool;
  return `:host{${a}}
        :host { display: inline-block; }

        .bool-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: ${e.wrapperMinWidth};
        }

        .bool-view {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: ${e.view.padding};
            border-radius: ${e.view.borderRadius};
            font-size: ${e.view.fontSize};
            font-weight: bold;
            color: var(--aws-foreground, ${e.view.color});
            text-align: center;
            opacity: 0.95;
            transition: all 0.25s ease;
        }

        .bool-view.on {
            background: var(--aws-accent, ${e.view.onBg});
            border: 1px solid var(--aws-accent, ${e.view.onBorder});
            color: var(--aws-chart-value, var(--aws-foreground, ${e.view.color}));
        }

        .bool-view.off {
            background: var(--aws-bg, ${e.view.offBg});
            border: 1px solid var(--aws-border, ${e.view.offBorder});
        }

        .bool-view.pulse {
            animation: pulseChange ${e.view.pulseDuration} ease-out;
        }

        @keyframes pulseChange {
            0%   { transform: scale(${e.view.pulseScale}); opacity: ${e.view.pulseOpacityStart}; }
            100% { transform: scale(1); opacity: 0.95; }
        }

        .toggle {
            position: relative;
            width: ${e.toggle.width};
            height: ${e.toggle.height};
            border-radius: ${e.toggle.borderRadius};
            background: var(--aws-bg, ${e.toggle.bg});
            border: 1px solid var(--aws-border, ${e.toggle.border});
            cursor: pointer;
            transition: background 0.3s ease, border-color 0.3s ease,
                        transform 0.25s ease, opacity 0.25s ease;
        }

        .toggle:active {
            transform: scale(${e.toggle.activeScale});
            opacity: ${e.toggle.activeOpacity};
        }

        .toggle.on {
            background: var(--aws-accent, ${e.toggle.onBg});
            border-color: var(--aws-accent, ${e.toggle.onBorder});
        }

        .toggle .thumb {
            position: absolute;
            top: ${e.toggle.thumbOffset};
            left: ${e.toggle.thumbOffset};
            width: ${e.toggle.thumbSize};
            height: ${e.toggle.thumbSize};
            background: var(--aws-foreground, ${e.toggle.thumbBg});
            border-radius: 50%;
            transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .toggle.on .thumb {
            transform: translateX(${e.toggle.thumbActiveOffset});
        }

        .toggle:active .thumb {
            transform: scale(${e.toggle.thumbActiveScale});
            opacity: ${e.toggle.thumbActiveOpacity};
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
export {
  i as generateCSS,
  n as setTheme
};
