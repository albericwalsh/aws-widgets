"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("./input_utils-DfIJtBg6.cjs"),f=require("./theme-GIGh0eiy.cjs"),y=require("./generateCSS-hI8KEkse.cjs");async function b({mode:l="input",value:a="",disabled:p=!1}={}){const d=`
<div id="favicon" class="favicon"><span class="fallback-emoji">🌐</span></div>
<label>
    <input id="value"
           class="input"
           type="url"
           placeholder="https://example.com" ${p?"disabled":""}>
</label>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,m=`
<div id="favicon" class="favicon"><span class="fallback-emoji">🌐</span></div>
<div id="value" class="output">${String(a||"")}</div>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,v=l==="input"?d:m,u=document.createElement("template");u.innerHTML=v;const e=u.content.cloneNode(!0);try{const o=await f.loadTheme(),i=document.createElement("style");i.textContent=y.generateCSS(o),e.prepend(i)}catch{}const n=e.querySelector("#value"),c=e.querySelector("#favicon"),t=e.querySelector("#copy");function r(o){try{const i=new URL(o);c.innerHTML=`<img src="https://www.google.com/s2/favicons?domain=${i.hostname}&sz=64" alt="favicon">`,c.classList.remove("no-favicon")}catch{c.innerHTML='<span class="fallback-emoji">🌐</span>',c.classList.add("no-favicon")}}return l==="input"?(n&&n.addEventListener("input",()=>{r(n.value),t&&s.copi_btn(t,()=>n.value)}),t&&s.copi_btn(t,()=>n?.value??"")):(r(a||""),t&&s.copi_btn(t,()=>String(a||""))),e}exports.create_element=b;
