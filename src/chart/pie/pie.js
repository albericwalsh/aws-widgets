import { generateCSS } from './generateCSS.js';
import { escapeHtml } from '../../utils/html_utils.js';

class AWSChartPie extends HTMLElement {
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
    if(!attr) return [40,30,30];
    if(attr === 'sample') return [40,30,30];
    try { const v = JSON.parse(attr); if(Array.isArray(v)) return v.map(Number); } catch(e){}
    return String(attr).split(',').map(s=>Number(s.trim())||0);
  }
  _parseNames(attr){
    if(!attr) return [];
    if(attr === 'sample') return ['A','B','C'];
    try { const v = JSON.parse(attr); if(Array.isArray(v)) return v.map(String); } catch(e){}
    return String(attr).split(',').map(s=>s.trim());
  }
  _polar(cx, cy, r, angle){
    const rad = (angle-90) * Math.PI/180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }
  _arcPath(cx, cy, r, startAngle, endAngle){
    const start = this._polar(cx, cy, r, startAngle);
    const end = this._polar(cx, cy, r, endAngle);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  }
  _render(){
    const raw = this.getAttribute('data');
    const values = this._parseData(raw);
    const title = this.getAttribute('title') || this.getAttribute('Title') || '';
    const xLabel = this.getAttribute('xlabel') || this.getAttribute('xLabel') || '';
    const yLabel = this.getAttribute('ylabel') || this.getAttribute('yLabel') || '';
    const total = values.reduce((a,b)=>a+Number(b),0) || 1;
    const cx = 16, cy = 16, r = 16;
    let start = 0;
    const colors = ['#ef4444','#f59e0b','#4f46e5','#10b981','#06b6d4','#8b5cf6'];
    const names = this._parseNames(this.getAttribute('data_name'));
    const svgSlices = values.map((v,i)=>{
      const angle = (v/total)*360;
      const d = this._arcPath(cx, cy, r, start, start + angle);
      // prefer CSS variable so theme can override; fall back to default palette color
      const fallback = colors[i%colors.length];
      const slice = `<path d="${d}" style="fill:var(--aws-accent, ${fallback})" class="slice"></path>`;
      start += angle;
      return slice;
    }).join('');
    const showValues = this.hasAttribute('show_values') && this.getAttribute('show_values') !== 'false';
    const legend = names.length ? '<div class="legend">' + names.map((n,i)=>{
      const fallback = colors[i%colors.length];
      const swatch = '<span class="legend-swatch" style="background:var(--aws-accent, ' + fallback + ')"></span>';
      const label = '<span>' + escapeHtml(n) + '</span>';
      const val = showValues ? '<span class="legend-value">' + escapeHtml(String(values[i]||0)) + '</span>' : '';
      return '<div class="legend-item">' + swatch + label + val + '</div>';
    }).join('') + '</div>' : '';
    this.container.innerHTML = `<div class="chart-title">${escapeHtml(title)}</div><div class="chart-inner"><svg viewBox="0 0 32 32" role="img" aria-label="Pie chart"><g>${svgSlices}</g></svg></div>${legend}<div class="chart-tooltip"></div><div class="axis-x">${escapeHtml(xLabel)}</div><div class="axis-y">${escapeHtml(yLabel)}</div>`;

    // tooltip behavior for pie slices
    const svg = this.container.querySelector('svg');
    const tooltip = this.container.querySelector('.chart-tooltip');
    const paths = Array.from(svg.querySelectorAll('path'));
    paths.forEach((p,i)=>{
      const label = names[i] || '';
      const value = values[i] || 0;
      p.addEventListener('mousemove', (ev)=>{
        tooltip.style.display = 'block';
        tooltip.style.opacity = '1';
        tooltip.textContent = label ? `${label}: ${value}` : String(value);
        const rectB = this.container.getBoundingClientRect();
        const left = ev.clientX - rectB.left;
        let top = ev.clientY - rectB.top - tooltip.offsetHeight - 8;
        if(top < 0) top = ev.clientY - rectB.top + 12;
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        p.classList.add('hovered');
      });
      p.addEventListener('mouseleave', ()=>{ tooltip.style.display = 'none'; tooltip.style.opacity = '0'; p.classList.remove('hovered'); });
    });
  }
}

customElements.define('aws-chart-pie', AWSChartPie);

