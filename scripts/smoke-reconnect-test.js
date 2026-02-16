#!/usr/bin/env node

// Smoke test to ensure connectedCallback is idempotent for AWSButton, AWSIconButton, SP_Selector

globalThis.customElements = {
  _registry: {},
  define(name, cls){ this._registry[name]=cls; },
  get(name){ return this._registry[name]; }
};

globalThis.HTMLElement = class {};

globalThis.document = {
  createElement(tag){
    if(tag === 'template'){
      return { content: { cloneNode(){ return { innerHTML: '', children: [], appendChild(node){ this.children.push(node); } }; } } };
    }
    return { tagName: tag.toUpperCase(), children: [], innerHTML: '', appendChild(c){ this.children.push(c); }, querySelector(){ return null; } };
  },
};

globalThis.window = {};

globalThis.console = console;

// stub fetch to return local src/style.json for loadTheme
const fs = await import('fs');
globalThis.fetch = async (url) => {
  const p = new URL('../src/style.json', import.meta.url);
  const txt = fs.readFileSync(p, 'utf8');
  return { ok: true, json: async () => JSON.parse(txt) };
};

(async ()=>{
  try{
    const btnMod = await import('../src/button/button.js');
    const iconMod = await import('../src/icon-button/icon-button.js');
    const selMod = await import('../src/selector/selector.js');

    // simulate element instances with minimal DOM-like shadowRoot
    function makeInstance(Cls){
      const inst = Object.create(Cls.prototype);
      inst.attachShadow = function(){
        this.shadowRoot = {
          innerHTML: '',
          children: [],
          appendChild(node){ this.children.push(node); },
          querySelector(selector){
            // return a minimal element stub used by components
            const el = {
              innerHTML: '', textContent: '', style:{}, dataset: {},
              classList:{ add(){}, remove(){} },
              setAttribute(){}, removeAttribute(){}, addEventListener(){}, tabIndex:0
            };
            return el;
          }
        };
      };
      inst.attachShadow();
      inst.style = { setProperty(){}, };
      inst.setAttribute = function(k,v){ this.attrs = this.attrs||{}; this.attrs[k]=String(v); };
      inst.getAttribute = function(k){ return (this.attrs||{})[k] ?? null; };
      inst.hasAttribute = function(k){ return Object.prototype.hasOwnProperty.call(this.attrs||{}, k); };
      inst.removeAttribute = function(k){ if(this.attrs) delete this.attrs[k]; };
      inst.addEventListener = function(){ };
      inst.querySelector = function(){ return null; };
      return inst;
    }

    // AWSButton
    const b = makeInstance(btnMod.AWSButton);
    await btnMod.AWSButton.prototype.connectedCallback.call(b);
    const firstCount = b.shadowRoot.children.length;
    await btnMod.AWSButton.prototype.connectedCallback.call(b);
    const secondCount = b.shadowRoot.children.length;
    console.log('AWSButton children count after double connect:', firstCount, secondCount);

    // AWSIconButton
    const ib = makeInstance(iconMod.AWSIconButton);
    await iconMod.AWSIconButton.prototype.connectedCallback.call(ib);
    const ibFirst = ib.shadowRoot.children.length;
    await iconMod.AWSIconButton.prototype.connectedCallback.call(ib);
    const ibSecond = ib.shadowRoot.children.length;
    console.log('AWSIconButton children count after double connect:', ibFirst, ibSecond);

    // SP_Selector
    const s = makeInstance(selMod.SP_Selector);
    // provide minimal methods used
    s.shadowRoot.querySelector = function(sel){
      if(sel === 'slot') return { addEventListener(){}, assignedElements(){ return []; } };
      return { addEventListener(){}, style:{}, setAttribute(){}, remove(){}, innerHTML:'' };
    };
    await selMod.SP_Selector.prototype.connectedCallback.call(s);
    const sFirst = s.shadowRoot.children ? s.shadowRoot.children.length : 0;
    await selMod.SP_Selector.prototype.connectedCallback.call(s);
    const sSecond = s.shadowRoot.children ? s.shadowRoot.children.length : 0;
    console.log('SP_Selector children count after double connect:', sFirst, sSecond);

  }catch(err){ console.error('Error', err); process.exitCode=2; }
})();
