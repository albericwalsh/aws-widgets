"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const g=require("./input_utils-DfIJtBg6.cjs"),b=require("./theme-wIK325iA.cjs"),S=require("./generateCSS-WlxY8zE_.cjs");async function v({mode:l="input",value:t="",disabled:m=!1}={}){const f=`
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
`,y=`
<div id="value" class="output">${String(t?(String(t).toUpperCase().replace(/[^A-Z0-9]/g,"").match(/.{1,4}/g)||[]).join("-"):"XXXX-XXXX-XXXX")}</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,d=l==="input"?f:y,u=document.createElement("template");u.innerHTML=d;const o=u.content.cloneNode(!0);try{const c=await b.loadTheme(),X=document.createElement("style");X.textContent=S.generateCSS(c),o.prepend(X)}catch{}const e=o.querySelector("#value"),s=o.querySelector("#copy"),r=o.querySelector("#toggle");let i=!1,n="";try{t&&(n=String(t).toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,12))}catch{}const p=c=>(c.match(/.{1,4}/g)||[]).join("-"),a=()=>"XXXX-XXXX-XXXX";return l==="input"&&e.addEventListener("input",()=>{n=e.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,12),i?e.value=p(n):e.value=a()}),r&&r.addEventListener("click",()=>{i=!i,r.textContent=i?"visibility_off":"visibility",e.value=i?p(n):a()}),l==="input"?(g.copi_btn(s,()=>n),e.value=n?p(n):a(),e.autocomplete="off"):(t?(String(t).toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,12).match(/.{1,4}/g)||[]).join("-"):a(),s&&g.copi_btn(s,()=>String(t||""))),o}exports.create_element=v;
