"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("./theme-wIK325iA.cjs");function r(t=e.getThemeObject()){return`:host{${e.cssVarsString(Object.assign({},e.getThemeObject().cssVars||{},t&&t.cssVars||{}))}}
        #value{ font: inherit; color: var(--aws-foreground, inherit); }
            #value::placeholder{ color: var(--aws-subtext, rgba(255,255,255,0.7)); }
        #copy{ margin-left:8px; }
        /* customize native spinner arrows */
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
            width: 14px;
            height: 14px;
            opacity: 0.9;
            filter: grayscale(20%);
        }
        /* fallback for Firefox */
        input[type=number] {
            -moz-appearance: textfield;
        }
    `}const n={generateCSS:r};exports.setTheme=e.setThemeObject;exports.default=n;exports.generateCSS=r;
