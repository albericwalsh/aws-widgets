"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=require("./input_utils-DfIJtBg6.cjs"),d=require("./theme-GIGh0eiy.cjs"),y=require("./generateCSS-BoSjWvxj.cjs");async function b({mode:e="input",value:n="",disabled:s=!1}={}){const l=`
<label>
    <input id="value" class="input" type="number" placeholder="number" ${s?"disabled":""}/>
</label>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,a=`
<div id="value" class="output">${String(n||"")}</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,p=e==="input"?l:a,o=document.createElement("template");o.innerHTML=p.trim();const t=o.content.cloneNode(!0);try{const i=await d.loadTheme(),u=document.createElement("style");u.textContent=y.generateCSS(i),t.prepend(u)}catch{}const m=t.querySelector(".input"),c=t.querySelector("#copy");return e==="input"?r.copi_btn(c,()=>m.value):r.copi_btn(c,()=>String(n||"")),t}exports.create_element=b;
