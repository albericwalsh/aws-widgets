export function generateCSS(theme) {
    const s = theme.widgets.slider;

    return `
        :host {
            display: inline-block;
        }

        input[type="range"] {
            -webkit-appearance: none;
            width: ${s.width};
            height: ${s.trackHeight};
            background: ${s.trackBg};
            border-radius: ${s.borderRadius};
            cursor: pointer;
            border: 1px solid ${s.trackBorder};
            outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: ${s.thumbSize};
            height: ${s.thumbSize};
            border-radius: 50%;
            background: ${s.thumbBg};
            cursor: pointer;
            transition: transform 0.3s ease;
            border: none;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(${s.hoverScale});
        }

        /* Firefox */
        input[type="range"]::-moz-range-thumb {
            width: ${s.thumbSize};
            height: ${s.thumbSize};
            border-radius: 50%;
            background: ${s.thumbBg};
            border: none;
            cursor: pointer;
        }
    `;
}
