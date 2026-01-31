import { generateCSS } from './generateCSS.js';
import { escapeHtml } from '../../utils/html_utils.js';

class AWSChartBar extends HTMLElement {
  static get observedAttributes(){ return ['data','data_name','show_values']; }
  constructor(){
    super();
    const shadow = this.attachShadow({mode:'open'});
    const style = document.createElement('style');
    style.textContent = generateCSS();
    shadow.appendChild(style);
    this.container = document.createElement('div');
    this.container.className = 'chart';
    shadow.appendChild(this.container);
  }
  connectedCallback(){ this._render(); }
  attributeChangedCallback(){ this._render(); }
  _parseData(attr){
    if(!attr) return [30,60,45];
    if(attr === 'sample') return [30,60,45];
    try { const v = JSON.parse(attr); if(Array.isArray(v)) return v.map(Number); } catch(e){}
    return String(attr).split(',').map(s=>Number(s.trim())||0);
  }
  _parseNames(attr){
    if(!attr) return [];
    if(attr === 'sample') return ['A','B','C'];
    try { const v = JSON.parse(attr); if(Array.isArray(v)) return v.map(String); } catch(e){}
    return String(attr).split(',').map(s=>s.trim());
  }
  _render(){
    const raw = this.getAttribute('data');
    const values = this._parseData(raw);
    const names = this._parseNames(this.getAttribute('data_name'));
    const showValues = this.hasAttribute('show_values') && this.getAttribute('show_values') !== 'false';
    const title = this.getAttribute('title') || this.getAttribute('Title') || '';
    const xLabel = this.getAttribute('xlabel') || this.getAttribute('xLabel') || '';
    const yLabel = this.getAttribute('ylabel') || this.getAttribute('yLabel') || '';
    const max = Math.max(1,...values);
    const n = values.length || 1;
    const padding = 8;
    const gap = 6;
    const totalHeight = 60 - padding*2;
    const barH = (totalHeight - gap*(n-1)) / n;
    const maxWidth = 100 - padding*2;
    let y = padding;
    const svgPartsArr = values.map((v,i)=>{
      const w = (v/max) * maxWidth;
      const x = padding;
      const rect = `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${w.toFixed(2)}" height="${barH.toFixed(2)}" rx="3"></rect>`;
      // value text: inside if space, otherwise outside
      let valueText = '';
      if(showValues){
        if(w >= 14){
          const vx = x + w/2;
          const vy = y + barH/2;
          valueText = `<text class="value-label" x="${vx.toFixed(2)}" y="${vy.toFixed(2)}" text-anchor="middle" dominant-baseline="middle">${escapeHtml(String(v))}</text>`;
        } else {
          const vx = x + w + 2;
          const vy = y + barH/2;
          valueText = `<text class="value-label" x="${vx.toFixed(2)}" y="${vy.toFixed(2)}" text-anchor="start" dominant-baseline="middle">${escapeHtml(String(v))}</text>`;
        }
      }
      const labelText = names[i] ? `<text class="data-label" x="${(padding-2).toFixed(2)}" y="${(y + barH/2).toFixed(2)}" text-anchor="end" dominant-baseline="middle">${escapeHtml(names[i])}</text>` : '';
      const out = { rect, valueText, labelText };
      y += barH + gap;
      return out;
    });
    const svgParts = svgPartsArr.map(o=>o.rect).join('');
    const svgValueParts = svgPartsArr.map(o=>o.valueText).join('');
    const svgLabelParts = svgPartsArr.map(o=>o.labelText).join('');
    this.container.innerHTML = `<div class="chart-title">${escapeHtml(title)}</div><div class="chart-inner"><svg viewBox="0 0 100 60" role="img" aria-label="Bar chart"><g>${svgParts}${svgValueParts}${svgLabelParts}</g></svg></div><div class="chart-tooltip"></div><div class="axis-x">${escapeHtml(xLabel)}</div><div class="axis-y">${escapeHtml(yLabel)}</div>`;

    // tooltip behavior (position at cursor, add hover scaling)
    const svg = this.container.querySelector('svg');
    const tooltip = this.container.querySelector('.chart-tooltip');
    const rects = Array.from(svg.querySelectorAll('rect'));
    rects.forEach((r, i) => {
      const label = names[i] || '';
      const value = values[i];
      r.addEventListener('mousemove', (ev) => {
        tooltip.style.display = 'block';
        tooltip.style.opacity = '1';
        tooltip.textContent = label ? `${label}: ${value}` : String(value);
        const rectB = this.container.getBoundingClientRect();
        const left = ev.clientX - rectB.left;
        let top = ev.clientY - rectB.top - tooltip.offsetHeight - 8;
        if(top < 0) top = ev.clientY - rectB.top + 12;
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        r.classList.add('hovered');
      });
      r.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; tooltip.style.opacity = '0'; r.classList.remove('hovered'); });
    });
  }
}

customElements.define('aws-chart-bar', AWSChartBar);
