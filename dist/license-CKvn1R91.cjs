"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const g=require("./input_utils-DfIJtBg6.cjs"),b=require("./theme-GIGh0eiy.cjs"),v=require("./generateCSS-BIgsDnW3.cjs");async function S({mode:a="input",value:e="",disabled:m=!1}={}){const f=`
<label for="value"></label>
<input
        id="value"
        class="input"
        type="text"
        placeholder="XXXX-XXXX-XXXX"
        autocomplete="off"
        ${m?"disabled":""}
/> 

<!-- toggle affichage -->
<aws-icon-button id="toggle" size="sm" variant="ghost">visibility</aws-icon-button>

<!-- copy -->
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,d=`
<div id="value" class="output">${String(e?(String(e).toUpperCase().replace(/[^A-Z0-9]/g,"").match(/.{1,4}/g)||[]).join("-"):"XXXX-XXXX-XXXX")}</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,y=a==="input"?f:d,u=document.createElement("template");u.innerHTML=y;const n=u.content.cloneNode(!0);try{const l=await b.loadTheme(),X=document.createElement("style");X.textContent=v.generateCSS(l),n.prepend(X)}catch{}const t=n.querySelector("#value"),s=n.querySelector("#copy"),r=n.querySelector("#toggle");let o=!1,i="";const p=l=>(l.match(/.{1,4}/g)||[]).join("-"),c=()=>"XXXX-XXXX-XXXX";return a==="input"&&t.addEventListener("input",()=>{i=t.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,12),o?t.value=p(i):t.value=c()}),r&&r.addEventListener("click",()=>{o=!o,r.textContent=o?"visibility_off":"visibility",t.value=o?p(i):c()}),a==="input"?(g.copi_btn(s,()=>i),t.value=c(),t.autocomplete="off"):(e?(String(e).toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,12).match(/.{1,4}/g)||[]).join("-"):c(),s&&g.copi_btn(s,()=>String(e||""))),n}exports.create_element=S;
