"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function r(o){return`
    :host{display:block}
    .input{ padding:6px 8px; border-radius:6px; border:1px solid ${o?.colors?.border||"#ccc"}; background:${o?.colors?.surface||"#fff"}; color:${o?.colors?.text||"#000"} }
    sp-icon-button{ margin-left:8px; color:${o?.colors?.muted||"#666"} }
    `}exports.generateCSS=r;
