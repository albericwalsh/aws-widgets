import { getThemeObject as r, cssVarsString as o } from "./theme-D01i-Ra9.js";
import { setThemeObject as b } from "./theme-D01i-Ra9.js";
function n(t = r()) {
  const i = o(Object.assign({}, r().cssVars || {}, t && t.cssVars || {})), e = t.widgets.slider;
  return `:host{${i}}
        :host {
            display: inline-block;
        }

        input[type="range"] {
            -webkit-appearance: none;
            width: ${e.width};
            /* stronger, more solid track while keeping smooth transitions */
            height: calc(${e.trackHeight} * 1.6);
            background: var(--aws-bg, ${e.trackBg});
            border-radius: ${e.borderRadius};
            cursor: pointer;
            border: 1px solid ${e.trackBorder};
            outline: none;
            transition: background 0.2s ease, box-shadow 0.15s ease;
            box-shadow: inset 0 1px 0 rgba(0,0,0,0.2);
        }

        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: calc(${e.thumbSize} * 1.15);
            height: calc(${e.thumbSize} * 1.15);
            border-radius: 50%;
            background: var(--aws-bg, ${e.thumbBg});
            cursor: pointer;
            transition: transform 0.18s ease, box-shadow 0.18s ease;
            border: none;
            box-shadow: 0 2px 6px rgba(0,0,0,0.35);
        }

        input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(${e.hoverScale});
            box-shadow: 0 4px 10px rgba(0,0,0,0.45);
        }

        /* Firefox */
        input[type="range"]::-moz-range-thumb {
            width: calc(${e.thumbSize} * 1.15);
            height: calc(${e.thumbSize} * 1.15);
            border-radius: 50%;
            background: var(--aws-bg, ${e.thumbBg});
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

        /* View mode: non-interactive and hide the thumb to avoid confusion */
        :host([mode="view"]) input[type="range"],
        :host([mode="view"]) input[type="range"]:not(:disabled) {
            opacity: 0.95;
            pointer-events: none;
            cursor: default;
        }

        :host([mode="view"]) input[type="range"]::-webkit-slider-thumb {
            visibility: hidden;
        }
        :host([mode="view"]) input[type="range"]::-moz-range-thumb {
            visibility: hidden;
        }

        /* Value display for view mode */
        .aws-slider-value{
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-width:64px;
            padding:8px 12px;
            border-radius:8px;
            background: rgba(0,0,0,0.04);
            color: inherit;
            font-weight: 600;
            box-shadow: inset 0 -1px 0 rgba(0,0,0,0.02);
        }
    `;
}
export {
  n as generateCSS,
  b as setTheme
};
