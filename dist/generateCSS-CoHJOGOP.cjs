"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("./theme-wIK325iA.cjs");function r(t=e.getThemeObject()){return`:host{${e.cssVarsString(Object.assign({},e.getThemeObject().cssVars||{},t&&t.cssVars||{}))}}
            #value{ font: inherit; color: var(--aws-foreground, inherit); }
            #value::placeholder{ color: var(--aws-subtext, rgba(255,255,255,0.7)); }
            #copy{ margin-left:8px; }
        `}const s={generateCSS:r};exports.setTheme=e.setThemeObject;exports.default=s;exports.generateCSS=r;
