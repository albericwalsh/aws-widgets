"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});async function m({mode:o="input",value:l="",disabled:s=!1}={}){const X=`
<div id="selector-container"></div>
<span id="dialphone" class="phone-dial">+33</span>
<label>
    <input id="value" class="input" type="text" placeholder="Téléphone" ${s?"disabled":""}>
</label>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,u=`
<div id="value" class="output">${String(l||"")}</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,d=o==="input"?X:u,c=document.createElement("template");c.innerHTML=d.trim();const a=c.content.cloneNode(!0),i=a.querySelector("#selector-container");let t=null;if(o==="input"&&i){await Promise.resolve().then(()=>require("./selector-1eoCa5UT.cjs")),t=document.createElement("aws-selector");const p=[{flag:"🇫🇷",code:"+33",country:"France",format:"XX XX XX XX XX"},{flag:"🇬🇧",code:"+44",country:"Grande-Bretagne",format:"XXXX XXX XXX"},{flag:"🇺🇸",code:"+1",country:"USA",format:"(XXX) XXX-XXXX"},{flag:"🇩🇪",code:"+49",country:"Allemagne",format:"XXXX XXXXXXX"}];for(const e of p){const n=document.createElement("aws-option");n.setAttribute("data-id",e.code),n.innerHTML=`${e.flag} ${e.country} (${e.code})`,n.dataset.format=e.format,t.appendChild(n)}const r=t.querySelector("aws-option");r&&r.setAttribute("selected",""),i.appendChild(t)}return{fragment:a,selector:t}}exports.create_element=m;
