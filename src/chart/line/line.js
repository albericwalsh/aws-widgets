import { generateCSS } from './generateCSS.js';
import { escapeHtml } from '../../utils/html_utils.js';

class AWSChartLine extends HTMLElement {
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
    if(!attr) return [45,30,35,20,25];
    if(attr === 'sample') return [45,30,35,20,25];
    try { const v = JSON.parse(attr); if(Array.isArray(v)) return v.map(Number); } catch(e){}
    return String(attr).split(',').map(s=>Number(s.trim())||0);
  }
  _parseNames(attr){
    if(!attr) return [];
    if(attr === 'sample') return ['A','B','C','D','E'];
    try { const v = JSON.parse(attr); if(Array.isArray(v)) return v.map(String); } catch(e){}
    return String(attr).split(',').map(s=>s.trim());
  }
  _catmullRom2bezier(points){
    if(!points || points.length === 0) return '';
    if(points.length === 1) return `M ${points[0].x} ${points[0].y}`;
    let d = `M ${points[0].x} ${points[0].y}`;
    for(let i=0;i<points.length-1;i++){
      const p0 = i===0 ? points[0] : points[i-1];
      const p1 = points[i];
      const p2 = points[i+1];
      const p3 = (i+2 < points.length) ? points[i+2] : points[points.length-1];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }
  _render(){
    const raw = this.getAttribute('data');
    const values = this._parseData(raw);
    const names = this._parseNames(this.getAttribute('data_name'));
    const title = this.getAttribute('title') || this.getAttribute('Title') || '';
    const xLabel = this.getAttribute('xlabel') || this.getAttribute('xLabel') || '';
    const yLabel = this.getAttribute('ylabel') || this.getAttribute('yLabel') || '';
    const max = Math.max(1,...values);
    const n = values.length;
    const padding = 8;
    const usableW = 100 - padding*2;
    const usableH = 60 - 12;
    const coords = values.map((v,i)=>{
      const x = padding + (n>1 ? (i*(usableW/(n-1))) : usableW/2);
      const y = 6 + (1 - v/max)*usableH;
      return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)), v };
    });
    const pointsStr = coords.map(p=>`${p.x},${p.y}`).join(' ');
    const showValues = this.hasAttribute('show_values') && this.getAttribute('show_values') !== 'false';
    const valuesSvg = showValues ? coords.map(p=>`<text class="value-label" x="${p.x}" y="${(p.y-4)}">${escapeHtml(String(p.v))}</text>`).join('') : '';
    const pathD = this._catmullRom2bezier(coords);
    const circles = coords.map((p,i)=>`<g class="pt" data-i="${i}"><circle class="point-overlay" cx="${p.x}" cy="${p.y}" r="6"></circle><circle class="point" cx="${p.x}" cy="${p.y}" r="2.5"></circle></g>`).join('');
    const svgLabelParts = names.length ? names.map((n,i)=>`<text class="data-label" x="${coords[i].x}" y="60" text-anchor="middle">${escapeHtml(n)}</text>`).join('') : '';
    this.container.innerHTML = `<div class="chart-title">${escapeHtml(title)}</div><div class="chart-inner"><svg viewBox="0 0 100 60" role="img" aria-label="Line chart"><path d="${pathD}" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2"></path>${circles}${valuesSvg}${svgLabelParts}</svg></div><div class="axis-x">${escapeHtml(xLabel)}</div><div class="axis-y">${escapeHtml(yLabel)}</div>`;
    this.container.innerHTML += `<div class="chart-tooltip"></div>`;

    // proximity tooltip & hover for points (grow when approaching)
    const svg = this.container.querySelector('svg');
    const tooltip = this.container.querySelector('.chart-tooltip');
    const pts = Array.from(svg.querySelectorAll('.pt'));
    const threshold = 8; // svg units distance to trigger hover
    svg.addEventListener('mousemove', (ev) => {
      const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
      let found = -1;
      pts.forEach((g, i) => {
        const cx = coords[i].x;
        const cy = coords[i].y;
        const dx = svgP.x - cx;
        const dy = svgP.y - cy;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist <= threshold){
          g.classList.add('hovered');
          found = i;
        } else {
          g.classList.remove('hovered');
        }
      });
      if(found >= 0){
        const label = names[found] || '';
        const value = coords[found].v;
        tooltip.style.display = 'block'; tooltip.style.opacity = '1';
        tooltip.textContent = label ? `${label}: ${value}` : String(value);
        const rectB = this.container.getBoundingClientRect();
        const left = ev.clientX - rectB.left;
        let top = ev.clientY - rectB.top - tooltip.offsetHeight - 8;
        if(top < 0) top = ev.clientY - rectB.top + 12;
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
      } else {
        tooltip.style.display = 'none'; tooltip.style.opacity = '0';
      }
    });
    svg.addEventListener('mouseleave', ()=>{ pts.forEach(c=>c.classList.remove('hovered')); tooltip.style.display='none'; tooltip.style.opacity='0'; });
  }
}

customElements.define('aws-chart-line', AWSChartLine);
