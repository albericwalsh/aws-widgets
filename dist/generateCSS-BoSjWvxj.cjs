"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function e(n){return`
        #value{ font: inherit; color: inherit; }
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
    `}const t={generateCSS:e};exports.default=t;exports.generateCSS=e;
