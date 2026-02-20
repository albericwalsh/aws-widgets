"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("./theme-wIK325iA.cjs");function a(e=n.getThemeObject()){const r=n.cssVarsString(Object.assign({},n.getThemeObject().cssVars||{},e&&e.cssVars||{})),t=e.widgets.iconButton,o=e.widgets.button||{};return`:host{${r}}
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
        button[data-variant="secondary"] { background: ${o.secondaryBg||t.background}; border: 1px solid ${o.border||"transparent"}; }
        button[data-variant="ghost"] { background: ${o.ghostBg||"transparent"}; border: none; }

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
    `}exports.setTheme=n.setThemeObject;exports.generateCSS=a;
