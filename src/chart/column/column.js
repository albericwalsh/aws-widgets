import { generateCSS } from './generateCSS.js';
import { escapeHtml } from '../../utils/html_utils.js';

class AWSChartColumn extends HTMLElement {
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
    if(!attr) return [46,34,52];
    if(attr === 'sample') return [46,34,52];
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
    const title = this.getAttribute('title') || this.getAttribute('Title') || '';
    const xLabel = this.getAttribute('xlabel') || this.getAttribute('xLabel') || '';
    const yLabel = this.getAttribute('ylabel') || this.getAttribute('yLabel') || '';
    const max = Math.max(1,...values);
    const n = values.length || 1;
    const padding = 10;
    const gap = 6;
    const totalWidth = 100 - padding*2;
    const colW = (totalWidth - gap*(n-1))/n;
    let x = padding;
    const showValues = this.hasAttribute('show_values') && this.getAttribute('show_values') !== 'false';
    const svgPartsArr = values.map(v=>{
      const h = (v/max)*48;
      const y = 60 - h - 6;
      const rect = `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${colW.toFixed(2)}" height="${h.toFixed(2)}" rx="3"></rect>`;
      const cx = x + colW/2;
      const valueText = showValues ? `<text class="value-label" x="${cx.toFixed(2)}" y="${(y-2).toFixed(2)}" text-anchor="middle">${escapeHtml(String(v))}</text>` : '';
      const out = { rect, valueText, centerX: cx };
      x += colW + gap;
      return out;
    });
    const svgParts = svgPartsArr.map(o=>o.rect).join('');
    const svgValueParts = svgPartsArr.map(o=>o.valueText).join('');
    const svgLabelParts = names.length ? names.map((n,i)=>`<text class="data-label" x="${svgPartsArr[i].centerX.toFixed(2)}" y="60" text-anchor="middle">${escapeHtml(n)}</text>`).join('') : '';
    this.container.innerHTML = `<div class="chart-title">${escapeHtml(title)}</div><div class="chart-inner"><svg viewBox="0 0 100 60" role="img" aria-label="Column chart"><g>${svgParts}${svgValueParts}${svgLabelParts}</g></svg></div><div class="axis-x">${escapeHtml(xLabel)}</div><div class="axis-y">${escapeHtml(yLabel)}</div>`;
    this.container.innerHTML += `<div class="chart-tooltip"></div>`;

    // tooltip behavior for columns (position at cursor, hover scale)
    const svg = this.container.querySelector('svg');
    const tooltip = this.container.querySelector('.chart-tooltip');
    const rects = Array.from(svg.querySelectorAll('rect'));
    rects.forEach((r,i)=>{
      const label = names[i] || '';
      const value = values[i];
      r.addEventListener('mousemove', (ev)=>{
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
      r.addEventListener('mouseleave', ()=>{ tooltip.style.display = 'none'; tooltip.style.opacity = '0'; r.classList.remove('hovered'); });
    });
  }
}

customElements.define('aws-chart-column', AWSChartColumn);
