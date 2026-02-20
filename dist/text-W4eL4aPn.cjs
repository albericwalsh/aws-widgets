"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("./input_utils-DfIJtBg6.cjs"),r=require("./theme-wIK325iA.cjs"),p=require("./generateCSS-BOuf3IfD.cjs");async function m({mode:n="input",value:o=""}={}){const i=n==="input"?`
<label>
    <input id="value" class="input" type="text" placeholder="text">
</label>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`:`
<div id="value" class="output">Valeur affichée</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,c=document.createElement("template");c.innerHTML=i;const t=c.content.cloneNode(!0);try{const u=await r.loadTheme(),l=document.createElement("style");l.textContent=p.generateCSS(u),t.prepend(l)}catch{}const e=t.querySelector("#value");n==="input"?e.value=o:e.textContent=o;const a=t.querySelector("#copy");return s.copi_btn(a,()=>n==="input"?e.value:e.textContent),t}exports.create_element=m;
