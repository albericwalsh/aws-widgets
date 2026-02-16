"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function n(o){const t=o.widgets.iconButton,e=o.widgets.button||{};return`
        :host {
            display: inline-block;
        }

        button {
            width: var(--btn-size);
            height: var(--btn-size);
            border-radius: ${t.borderRadius};
            border: none;
            background: ${t.background};
            color: ${t.color};
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            transition: transform .25s ease, background .25s ease;
        }

        button:hover {
            background: ${t.backgroundHover};
            transform: scale(${t.hoverScale});
        }

        /* variants similar to main button */
        button[data-variant="secondary"] { background: ${e.secondaryBg||t.background}; border: 1px solid ${e.border||"transparent"}; }
        button[data-variant="ghost"] { background: ${e.ghostBg||"transparent"}; border: none; }

        button:active {
            background: ${t.backgroundActive};
            transform: scale(${t.activeScale});
        }

        /* Disabled state */
        :host(:disabled) button,
        button:disabled {
            opacity: 0.55;
            transform: none;
                /* keep pointer-events so the cursor can appear; interaction blocked by disabled attribute */
            filter: grayscale(28%);
            background: ${t.background};
            cursor: not-allowed;
        }
            

        /* No strikethrough; disabled state uses cursor + opacity (see above) */

        i {
            font-family: 'Material Icons', serif;
            font-size: calc(var(--btn-size) * ${t.iconRatio});
            line-height: 1;
            pointer-events: none;
            font-style: normal;
        }
    `}exports.generateCSS=n;
