"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("./input_utils-DfIJtBg6.cjs"),d=require("./theme-wIK325iA.cjs"),y=require("./generateCSS-pqe64ur0.cjs");async function b({mode:n="input",value:c="",disabled:r=!1}={}){const l=`
<label class="date-wrapper">
    <input id="value" class="input" type="date" ${r?"disabled":""}>
</label>

<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,p=`
<div id="value" class="output">${String(c||"")}</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,m=n==="input"?l:p,o=document.createElement("template");o.innerHTML=m;const t=o.content.cloneNode(!0);try{const s=await d.loadTheme(),u=document.createElement("style");u.textContent=y.generateCSS(s),t.prepend(u)}catch{}const i=t.querySelector(".input"),e=t.querySelector("#copy");return n==="input"?i&&e&&a.copi_btn(e,()=>i.value):e&&a.copi_btn(e,()=>String(c||"")),t}exports.create_element=b;
