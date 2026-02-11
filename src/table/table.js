import { loadTheme } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

class SP_Table extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._onSlotChange = this._onSlotChange.bind(this);
        this._onPointerMove = null;
    }

    async connectedCallback() {
        const theme = await loadTheme();
        const style = generateCSS(theme);
        const tpl = document.createElement('template');
        tpl.innerHTML = `
            <style>${style}</style>
            <div class="table" role="table"><slot></slot></div>
        `;
        this.shadowRoot.appendChild(tpl.content.cloneNode(true));

        const slot = this.shadowRoot.querySelector('slot');
        slot.addEventListener('slotchange', this._onSlotChange);
        // initial setup
        this._onSlotChange();
    }

    _onSlotChange(){
        const slot = this.shadowRoot.querySelector('slot');
        const nodes = slot.assignedElements({flatten:true});
        // find header rows to attach resizers
        const heads = nodes.filter(n => n.tagName && n.tagName.toLowerCase() === 'aws-table-head');
        // attach hover listeners to rows and prepare resizers
        const allRows = this._collectRows(nodes);
        allRows.forEach(r => {
            // row-level background/box-shadow on hover remains
            r.addEventListener('mouseenter', ()=>{
                r.classList.add('hover');
                try{
                    r.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))';
                    r.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
                }catch(e){}
            });
            r.addEventListener('mouseleave', ()=>{
                r.classList.remove('hover');
                try{
                    r.style.background = '';
                    r.style.boxShadow = '';
                }catch(e){}
            });

            // per-cell scaling removed — keep only row-level hover visuals
        });

        // setup global resizers based on first header row if present
        if(heads.length){
            const firstHead = heads[0];
            const headRows = Array.from(firstHead.querySelectorAll('aws-table-row'));
            if(headRows.length){
                const firstHeaderRow = headRows[0];
                    this._ensureGlobalResizers(firstHead, firstHeaderRow);
            }
        }
    }

    _collectRows(nodes){
        const rows = [];
        nodes.forEach(n=>{
            if(n.tagName && n.tagName.toLowerCase() === 'aws-table-row') rows.push(n);
            // also collect rows inside head/body if provided as elements
            const innerRows = Array.from(n.querySelectorAll ? n.querySelectorAll('aws-table-row') : []);
            innerRows.forEach(r=>rows.push(r));
        });
        return rows;
    }

    _ensureGlobalResizers(headEl, headerRow){
        // append resizers to the table container so they cover full height
        const tableEl = this.shadowRoot.querySelector('.table');
        if(!tableEl) return;
        const existing = Array.from(tableEl.querySelectorAll('.col-resizer-global'));
        existing.forEach(e=>e.remove());
        const host = this;
        const cells = Array.from(headerRow.querySelectorAll('aws-table-cell'));
        const tableRect = tableEl.getBoundingClientRect();
        const headerRect = headEl.getBoundingClientRect();
        const headerOffset = headEl.offsetTop || (headerRect.top - tableRect.top);
        // initialize fixed widths for all columns to avoid table reflow when resizing
        try{
            const allHeaderCells = Array.from(headerRow.querySelectorAll('aws-table-cell'));
            allHeaderCells.forEach((hc, i)=>{
                const w = Math.max(24, hc.getBoundingClientRect().width);
                this.style.setProperty(`--col-${i+1}-width`, `${w}px`);
                // apply inline width to all cells in this column and enforce box-sizing
                const rows = this.querySelectorAll('aws-table-row');
                rows.forEach(r => {
                    const c = r.querySelector(`aws-table-cell:nth-child(${i+1})`);
                    if(c){
                        c.style.boxSizing = 'border-box';
                        c.style.width = `${w}px`;
                        c.style.overflow = 'hidden';
                        c.style.whiteSpace = 'nowrap';
                        c.style.textOverflow = 'ellipsis';
                    }
                });
            });
        }catch(e){}

        cells.forEach((cell, idx)=>{
            if(idx === cells.length - 1) return;
            const rect = cell.getBoundingClientRect();
            const left = rect.right - tableRect.left;
            const resizer = document.createElement('div');
            resizer.className = 'col-resizer-global';
            resizer.style.position = 'absolute';
            resizer.style.left = `${left - 7}px`;
            // position resizer at the very top of the table (include header)
            resizer.style.top = '0px';
            // set height to cover header + body (use scrollHeight for robust total height)
            resizer.style.height = `${Math.max(24, tableEl.scrollHeight)}px`;
            resizer.style.pointerEvents = 'auto';
            resizer.style.width = '14px';
            resizer.style.cursor = 'col-resize';
            // ensure resizer is above the sticky header and captures input
            resizer.style.zIndex = '9999';
            resizer.style.touchAction = 'none';
            resizer.style.display = 'flex';
            resizer.style.alignItems = 'center';
            resizer.style.justifyContent = 'center';
            resizer.style.background = 'transparent';
            const thumb = document.createElement('div');
            thumb.style.width = '2px';
            thumb.style.height = '100%';
            thumb.style.background = 'rgba(255,255,255,0.5)';
            thumb.style.borderRadius = '2px';
            resizer.appendChild(thumb);
            tableEl.appendChild(resizer);

            resizer.addEventListener('pointerdown', (ev)=>{
                // pointerdown on resizer
                ev.preventDefault();
                try{ resizer.setPointerCapture(ev.pointerId); } catch(e){ /* ignore setPointerCapture errors */ }
                const startX = ev.clientX;
                const colIndex = idx + 1; // left column index
                const leftCell = host.querySelector ? host.querySelector(`aws-table-row > aws-table-cell:nth-child(${colIndex})`) : null;
                const rightCell = host.querySelector ? host.querySelector(`aws-table-row > aws-table-cell:nth-child(${colIndex+1})`) : null;
                const startLeft = leftCell ? (leftCell.offsetWidth || leftCell.getBoundingClientRect().width) : 80;
                const startRight = rightCell ? (rightCell.offsetWidth || rightCell.getBoundingClientRect().width) : 80;
                const minW = 24;
                // compute horizontal padding for each column to avoid overlapping/resizing into padding
                let leftPad = 0, rightPad = 0;
                try{
                    if(leftCell){
                        const s = getComputedStyle(leftCell);
                        leftPad = (parseFloat(s.paddingLeft) || 0) + (parseFloat(s.paddingRight) || 0);
                    }
                    if(rightCell){
                        const s2 = getComputedStyle(rightCell);
                        rightPad = (parseFloat(s2.paddingLeft) || 0) + (parseFloat(s2.paddingRight) || 0);
                    }
                }catch(e){/* ignore */}

                const onMove = (moveEv) => {
                    const dx = moveEv.clientX - startX;
                    // compute new left width but clamp so neither column goes below minW
                    const total = startLeft + startRight;
                    // ensure we don't move into the padding area: compute left/right limits
                    const leftLimit = Math.max(minW, Math.ceil(minW + leftPad));
                    const rightLimit = Math.max(minW, Math.ceil(minW + rightPad));
                    let requested = startLeft + dx;
                    let newLeft = Math.max(leftLimit, Math.min(requested, total - rightLimit));
                    let newRight = Math.max(minW, total - newLeft);

                    host.style.setProperty(`--col-${colIndex}-width`, `${newLeft}px`);
                    host.style.setProperty(`--col-${colIndex+1}-width`, `${newRight}px`);

                    // apply inline width to the two columns only
                    try{
                        const rows = host.querySelectorAll('aws-table-row');
                        rows.forEach(r => {
                            const lc = r.querySelector(`aws-table-cell:nth-child(${colIndex})`);
                            const rc = r.querySelector(`aws-table-cell:nth-child(${colIndex+1})`);
                            if(lc) lc.style.width = `${newLeft}px`;
                            if(rc) rc.style.width = `${newRight}px`;
                        });
                    }catch(e){/* ignore */}

                            // move this resizer to follow the left cell's right edge by summing header cell widths
                            try{
                                const headerCellsNow = Array.from(headerRow.querySelectorAll('aws-table-cell'));
                                let sum = 0;
                                for(let ii=0; ii<=idx; ii++){
                                    const h = headerCellsNow[ii];
                                    if(!h) continue;
                                    sum += (h.offsetWidth || h.getBoundingClientRect().width);
                                }
                                // clamp sum to table width
                                const tbW = tableEl.clientWidth || tableEl.getBoundingClientRect().width;
                                const leftPos = Math.min(Math.max(0, sum), tbW);
                                resizer.style.left = `${leftPos - 7}px`;
                            }catch(e){}

                    // pointermove
                };
                const onUp = (upEv)=>{
                    try{ resizer.releasePointerCapture(upEv.pointerId); } catch(e){ /* ignore releasePointerCapture errors */ }
                    document.removeEventListener('pointermove', onMove);
                    document.removeEventListener('pointerup', onUp);
                    thumb.style.background = 'rgba(255,255,255,0.5)';
                    // pointerup
                };
                document.addEventListener('pointermove', onMove);
                document.addEventListener('pointerup', onUp);
                thumb.style.background = 'rgba(255,255,255,0.9)';
            });
            // additional diagnostic listeners
            // diagnostic listeners removed
        });

        // reposition resizers on resize
        const ro = new ResizeObserver(()=>{
            const tableRect2 = tableEl.getBoundingClientRect();
            const headerOffset2 = headEl.offsetTop || (headEl.getBoundingClientRect().top - tableRect2.top);
            const headerCells = Array.from(headerRow.querySelectorAll('aws-table-cell'));
            const globals = Array.from(tableEl.querySelectorAll('.col-resizer-global'));
            headerCells.forEach((c,i)=>{
                if(i >= headerCells.length -1) return;
                const r = c.getBoundingClientRect();
                const left2 = r.right - tableRect2.left;
                const g = globals[i];
                if(g) g.style.left = `${left2 - 7}px`;
                if(g) g.style.top = '0px';
                if(g) g.style.height = `${Math.max(24, tableEl.scrollHeight)}px`;
                // reposition resizer
            });
        });
        ro.observe(tableEl);
    }
}

// lightweight subelements: do not use shadow DOM so parent styling via ::slotted applies
class SP_TableHead extends HTMLElement { connectedCallback(){ this.setAttribute('role','rowgroup'); } }
class SP_TableBody extends HTMLElement { connectedCallback(){ this.setAttribute('role','rowgroup'); } }
class SP_TableRow extends HTMLElement { connectedCallback(){ this.setAttribute('role','row'); this.style.display='table-row'; } }
class SP_TableCell extends HTMLElement { connectedCallback(){ this.setAttribute('role','cell'); this.style.display='table-cell'; this.style.padding = this.style.padding || '1.2rem 20px'; } }

customElements.define("aws-table", SP_Table);
customElements.define("aws-table-head", SP_TableHead);
customElements.define("aws-table-body", SP_TableBody);
customElements.define("aws-table-row", SP_TableRow);
customElements.define("aws-table-cell", SP_TableCell);
