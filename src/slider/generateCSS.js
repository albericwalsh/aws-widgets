export function generateCSS(theme) {
    const s = theme.widgets.slider;

    return `
        :host {
            display: inline-block;
        }

        input[type="range"] {
            -webkit-appearance: none;
            width: ${s.width};
            /* stronger, more solid track while keeping smooth transitions */
            height: calc(${s.trackHeight} * 1.6);
            background: ${s.trackBg};
            border-radius: ${s.borderRadius};
            cursor: pointer;
            border: 1px solid ${s.trackBorder};
            outline: none;
            transition: background 0.2s ease, box-shadow 0.15s ease;
            box-shadow: inset 0 1px 0 rgba(0,0,0,0.2);
        }

        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: calc(${s.thumbSize} * 1.15);
            height: calc(${s.thumbSize} * 1.15);
            border-radius: 50%;
            background: ${s.thumbBg};
            cursor: pointer;
            transition: transform 0.18s ease, box-shadow 0.18s ease;
            border: none;
            box-shadow: 0 2px 6px rgba(0,0,0,0.35);
        }

        input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(${s.hoverScale});
            box-shadow: 0 4px 10px rgba(0,0,0,0.45);
        }

        /* Firefox */
        input[type="range"]::-moz-range-thumb {
            width: calc(${s.thumbSize} * 1.15);
            height: calc(${s.thumbSize} * 1.15);
            border-radius: 50%;
            background: ${s.thumbBg};
            border: none;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.35);
        }

        /* Disabled look */
        :host([disabled]) input[type="range"],
        input[type="range"]:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        /* Ensure the movable thumb also shows not-allowed cursor when disabled */
        :host([disabled]) input[type="range"]::-webkit-slider-thumb,
        input[type="range"]:disabled::-webkit-slider-thumb {
            cursor: not-allowed;
        }

        :host([disabled]) input[type="range"]::-moz-range-thumb,
        input[type="range"]:disabled::-moz-range-thumb {
            cursor: not-allowed;
        }
    `;
}
