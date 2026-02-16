#!/usr/bin/env node

// Smoke test for SP_Selector get/set value
// This runs in Node without a browser by importing the module and creating a fake instance.

globalThis.customElements = {
  _registry: {},
  define(name, cls){ this._registry[name]=cls; },
  get(name){ return this._registry[name]; }
};

globalThis.HTMLElement = class {};

class FakeOption {
  constructor(attrs = {}, inner = ''){
    this.attrs = {...attrs};
    this.innerHTML = inner;
    this.textContent = inner.replace(/<.*?>/g,'').trim();
    this.id = this.attrs.id || '';
  }
  hasAttribute(n){ return Object.prototype.hasOwnProperty.call(this.attrs, n); }
  getAttribute(n){ return this.attrs[n] ?? null; }
  setAttribute(n,v){ this.attrs[n] = (v===undefined ? '' : String(v)); }
  removeAttribute(n){ delete this.attrs[n]; }
}

(async ()=>{
  try{
    const { SP_Selector } = await import('../src/selector/selector.js');
    const sel = Object.create(SP_Selector.prototype);
    sel.attrs = {};
    sel.setAttribute = function(n,v){ this.attrs[n]=String(v); };
    sel.removeAttribute = function(n){ delete this.attrs[n]; };
    sel.getAttribute = function(n){ return this.attrs[n] ?? null; };
    sel.hasAttribute = function(n){ return Object.prototype.hasOwnProperty.call(this.attrs,n); };
    sel._selectedLabel = { innerHTML:'', textContent: '' };

    const o1 = new FakeOption({'data-id':'light'}, 'Light');
    const o2 = new FakeOption({'data-id':'dark'}, 'Dark');
    sel._options = [o1, o2];

    console.log('initial value:', sel.value);

    sel.value = 'dark';
    console.log('after set to dark, getter:', sel.value);
    const selOpt = sel._options.find(o=>o.hasAttribute('selected'));
    console.log('selected option data-id:', selOpt ? selOpt.getAttribute('data-id') : null);

    // reset and try selecting by visible text
    sel._options.forEach(o=>o.removeAttribute('selected'));
    sel.value = 'Light';
    const sel2 = sel._options.find(o=>o.hasAttribute('selected'));
    console.log('after set to "Light", selected data-id:', sel2 ? sel2.getAttribute('data-id') : null);

    console.log('selectedLabel innerHTML:', sel._selectedLabel.innerHTML);
  }catch(err){
    console.error('Error during smoke test:', err);
    process.exitCode = 2;
  }
})();
