import './bar/bar.js';
import './column/column.js';
import './pie/pie.js';
import './line/line.js';

class AWSChart extends HTMLElement {
  static get observedAttributes() { return ['type','data','data_name','title','xlabel','xLabel','ylabel','yLabel','disabled']; }
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this._wrapper = document.createElement('div');
    this.shadowRoot.appendChild(this._wrapper);
  }
  connectedCallback(){ this._render(); }
  attributeChangedCallback(name, oldValue, newValue){
    // if type changed, re-create internal element
    if(name === 'type') return this._render();
    // otherwise forward attribute to inner element if present
    const child = this._wrapper.firstElementChild;
    if(!child) return;
    if(typeof newValue === 'undefined' || newValue === null) { child.removeAttribute(name); }
    else if(newValue === '') { child.setAttribute(name, ''); }
    else { child.setAttribute(name, newValue); }
  }
  _render(){
    const type = (this.getAttribute('type') || 'bar').toLowerCase();
    const map = {
      bar: 'aws-chart-bar',
      column: 'aws-chart-column',
      pie: 'aws-chart-pie',
      line: 'aws-chart-line'
    };
    const tag = map[type] || 'aws-chart-bar';
    if(this._currentTag === tag) {
      // already rendered
      return;
    }
    this._currentTag = tag;
    this._wrapper.innerHTML = '';
    const el = document.createElement(tag);
    for(const {name, value} of Array.from(this.attributes)){
      if(name === 'type') continue;
      el.setAttribute(name, value);
    }
    this._wrapper.appendChild(el);
  }
}

customElements.define('aws-chart', AWSChart);
