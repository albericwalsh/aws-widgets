function t(o) {
  const e = o.widgets.bool;
  return `
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
            color: ${e.view.color};
            text-align: center;
            opacity: 0.95;
            transition: all 0.25s ease;
        }

        .bool-view.on {
            background: ${e.view.onBg};
            border: 1px solid ${e.view.onBorder};
        }

        .bool-view.off {
            background: ${e.view.offBg};
            border: 1px solid ${e.view.offBorder};
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
            background: ${e.toggle.bg};
            border: 1px solid ${e.toggle.border};
            cursor: pointer;
            transition: background 0.3s ease, border-color 0.3s ease,
                        transform 0.25s ease, opacity 0.25s ease;
        }

        .toggle:active {
            transform: scale(${e.toggle.activeScale});
            opacity: ${e.toggle.activeOpacity};
        }

        .toggle.on {
            background: ${e.toggle.onBg};
            border-color: ${e.toggle.onBorder};
        }

        .toggle .thumb {
            position: absolute;
            top: ${e.toggle.thumbOffset};
            left: ${e.toggle.thumbOffset};
            width: ${e.toggle.thumbSize};
            height: ${e.toggle.thumbSize};
            background: ${e.toggle.thumbBg};
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
            background: rgba(255,255,255,0.65);
        }

        :host([disabled]) .bool-view {
            opacity: 0.6;
            color: rgba(255,255,255,0.65);
        }
    `;
}
export {
  t as generateCSS
};
