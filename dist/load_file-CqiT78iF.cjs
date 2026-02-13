"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});async function s(e,l,n){const[i,o]=await Promise.all([fetch(e).then(t=>t.text()),fetch(l).then(t=>t.text())]);n.innerHTML=`
        <style>${o}</style>
        ${i}
    `}exports.loadFile=s;
