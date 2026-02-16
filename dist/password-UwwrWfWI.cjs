"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("./input_utils-DfIJtBg6.cjs"),g=require("./theme-GIGh0eiy.cjs"),v=require("./generateCSS-D5taHUFc.cjs");async function m({mode:s="input",value:c="",disabled:p=!1}={}){const d=`
<label class="password-wrapper">
    <input id="value" class="input" type="password" placeholder="password" ${p?"disabled":""}>
</label>

<aws-icon-button id="toggle" size="sm">visibility</aws-icon-button>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,b=`
<div id="value" class="output">${c?"•".repeat(String(c).length):""}</div>
<aws-icon-button id="toggle" size="sm" variant="ghost">visibility</aws-icon-button>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,y=s==="input"?d:b,l=document.createElement("template");l.innerHTML=y;const e=l.content.cloneNode(!0);try{const n=await g.loadTheme(),i=document.createElement("style");i.textContent=v.generateCSS(n),e.prepend(i)}catch{}const o=e.querySelector("#value"),t=e.querySelector("#toggle"),r=e.querySelector("#copy");if(s==="input"&&!o)return e;if(s==="input"&&t&&(t.setAttribute("variant","ghost"),t.addEventListener("click",()=>{const n=o.type==="password";o.type=n?"text":"password",t.textContent=n?"visibility_off":"visibility"})),s!=="input"&&t){const n=e.querySelector("#value");let i=!1;const u=String(c||"");t.setAttribute("variant","ghost"),t.addEventListener("click",()=>{i=!i,n.textContent=i?u:"•".repeat(u.length),t.textContent=i?"visibility_off":"visibility"})}return r&&(s==="input"?(a.copi_btn(r,()=>o.value),o.addEventListener("input",()=>{a.copi_btn(r,()=>o.value)})):a.copi_btn(r,()=>String(c||""))),e}exports.create_element=m;
