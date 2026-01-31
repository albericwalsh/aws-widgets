export function generateCSS(theme) {
    const bool = theme.widgets.bool;

    return `
        :host { display: inline-block; }

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
            color: ${bool.view.color};
            text-align: center;
            opacity: 0.95;
            transition: all 0.25s ease;
        }

        .bool-view.on {
            background: ${bool.view.onBg};
            border: 1px solid ${bool.view.onBorder};
        }

        .bool-view.off {
            background: ${bool.view.offBg};
            border: 1px solid ${bool.view.offBorder};
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
            background: ${bool.toggle.bg};
            border: 1px solid ${bool.toggle.border};
            cursor: pointer;
            transition: background 0.3s ease, border-color 0.3s ease,
                        transform 0.25s ease, opacity 0.25s ease;
        }

        .toggle:active {
            transform: scale(${bool.toggle.activeScale});
            opacity: ${bool.toggle.activeOpacity};
        }

        .toggle.on {
            background: ${bool.toggle.onBg};
            border-color: ${bool.toggle.onBorder};
        }

        .toggle .thumb {
            position: absolute;
            top: ${bool.toggle.thumbOffset};
            left: ${bool.toggle.thumbOffset};
            width: ${bool.toggle.thumbSize};
            height: ${bool.toggle.thumbSize};
            background: ${bool.toggle.thumbBg};
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
    `;
}
