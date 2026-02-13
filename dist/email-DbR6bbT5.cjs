"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const u=require("./input_utils-DfIJtBg6.cjs"),b=require("./theme-GIGh0eiy.cjs"),y=require("./generateCSS-BYxyLpf2.cjs");async function S({mode:n="input",value:o="",disabled:l=!1}={}){const p=`
<label>
    <input id="value" class="input" type="email" placeholder="email@example.com" ${l?"disabled":""}/>
</label>
<aws-icon-button id="send" size="sm">mail</aws-icon-button>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,m=`
<div id="value" class="output">${String(o||"")}</div>
<aws-icon-button id="send" size="sm" variant="ghost">mail</aws-icon-button>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,d=n==="input"?p:m,s=document.createElement("template");s.innerHTML=d.trim();const t=s.content.cloneNode(!0);try{const e=await b.loadTheme(),r=document.createElement("style");r.textContent=y.generateCSS(e),t.prepend(r)}catch{}const i=t.querySelector(".input"),c=t.querySelector("#send"),a=t.querySelector("#copy");return n==="input"&&i&&i.setAttribute("pattern",".+@.+\\..+"),c&&(c.setAttribute("variant","ghost"),c.addEventListener("click",()=>{const e=(n==="input"?i?.value:String(o||""))||"";e&&(window.location.href=`mailto:${e}`)})),n==="input"?u.copi_btn(a,()=>i?.value??""):u.copi_btn(a,()=>String(o||"")),t}exports.create_element=S;
