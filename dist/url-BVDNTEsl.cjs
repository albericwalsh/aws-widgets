"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("./input_utils-DfIJtBg6.cjs"),v=require("./theme-GIGh0eiy.cjs"),y=require("./generateCSS-CAG0BR1i.cjs");async function b({mode:r="input",value:c="",disabled:l=!1}={}){const d=`
<div id="favicon" class="favicon"><span class="fallback-emoji">🌐</span></div>
<label>
    <input id="value"
           class="input"
           type="url"
           placeholder="https://example.com" ${l?"disabled":""}>
</label>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,f=`
<div id="favicon" class="favicon"><span class="fallback-emoji">🌐</span></div>
<button id="value" class="output" type="button">${String(c||"")}</button>
<aws-icon-button id="copy" size="sm">content_copy</aws-icon-button>
`,m=r==="input"?d:f,u=document.createElement("template");u.innerHTML=m;const i=u.content.cloneNode(!0);try{const n=await v.loadTheme(),e=document.createElement("style");e.textContent=y.generateCSS(n),i.prepend(e)}catch{}const t=i.querySelector("#value"),a=i.querySelector("#favicon"),o=i.querySelector("#copy");function p(n){try{const e=new URL(n);a.innerHTML=`<img src="https://www.google.com/s2/favicons?domain=${e.hostname}&sz=64" alt="favicon">`,a.classList.remove("no-favicon")}catch{a.innerHTML='<span class="fallback-emoji">🌐</span>',a.classList.add("no-favicon")}}if(r==="input")t&&t.addEventListener("input",()=>{p(t.value),o&&s.copi_btn(o,()=>t.value)}),o&&s.copi_btn(o,()=>t?.value??"");else{p(c||""),o&&s.copi_btn(o,()=>String(c||""));try{if(t&&!l){t.style.cursor="pointer",t.setAttribute&&t.setAttribute("role","link"),t.tabIndex=0;const n=()=>{try{const e=new URL((t.textContent||String(c||"")).trim());typeof window<"u"&&window.open&&window.open(e.toString(),"_blank","noopener")}catch{}};t.addEventListener&&t.addEventListener("click",n),t.addEventListener&&t.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),n())})}}catch{}}return i}exports.create_element=b;
