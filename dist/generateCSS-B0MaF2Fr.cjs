"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("./theme-wIK325iA.cjs");function e(r=s.getThemeObject()){return`:host{${s.cssVarsString(Object.assign({},s.getThemeObject().cssVars||{},r&&r.cssVars||{}))}}
    :host{display:block}
    .phone-dial{ margin-right:6px; font-weight:600 }
    .input{ padding:6px 8px; border-radius:6px; border:1px solid var(--aws-border, ${r?.colors?.border||"#ccc"}); background:var(--aws-bg, ${r?.colors?.surface||"#fff"}); color:var(--aws-foreground, ${r?.colors?.text||"#000"}) }
    sp-icon-button{ margin-left:8px; color:var(--aws-foreground, ${r?.colors?.text||"#000"}) }
    `}exports.setTheme=s.setThemeObject;exports.generateCSS=e;
