#!/usr/bin/env node

// check url create_element output attributes

globalThis.document = {
  createElement(tag){
    if(tag === 'template') return { content: { cloneNode(){ return { querySelector: (sel)=>null, children:[], appendChild(){}, prepend(){}, innerHTML: '' }; } } };
    return { querySelector: ()=>null, innerHTML:'', children:[], appendChild(){}, prepend(){} };
  }
};

const fs = await import('fs');
globalThis.fetch = async (url) => {
  const p = new URL('../src/style.json', import.meta.url);
  const txt = fs.readFileSync(p, 'utf8');
  return { ok: true, json: async () => JSON.parse(txt) };
};

globalThis.window = { open: (u,t,f)=>{ console.log('window.open called with', u, t); } };

const { create_element } = await import('../src/input/url/url.js');

(async ()=>{
  const frag = await create_element({ mode: 'output', value: 'https://example.com', disabled: false });
  const node = frag.querySelector('#value');
  console.log('node exists?', !!node);
  if(node){
    console.log('cursor:', node.style ? node.style.cursor : '<no style>');
    console.log('role:', node.getAttribute ? node.getAttribute('role') : '<no getAttribute>');
    console.log('tabIndex:', node.tabIndex);
    // simulate click
    if(node.__clickHandlers){
      console.log('has click handlers count', node.__clickHandlers.length);
    }
  }
})();
