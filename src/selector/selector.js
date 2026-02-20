import { loadTheme, getThemeObject } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";

class SP_Selector extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this._onSlotChange = this._onSlotChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onDocumentClick = this._onDocumentClick ? this._onDocumentClick.bind(this) : null;
    }
    static get observedAttributes(){ return ['disabled','mode']; }
    attributeChangedCallback(name, oldV, newV){
        if(name === 'disabled') this._applyDisabledState();
        if(name === 'mode') this._applyModeState();
    }
    async connectedCallback(){
        if(this._inited) return;
        const theme = await loadTheme();
        const style = generateCSS(theme);
        const tpl = document.createElement('template');
        tpl.innerHTML = `<style>${style}</style>
            <div class="selector" role="combobox" aria-haspopup="listbox">
                <div class="selected" tabindex="0"><span class="selected-label"></span><span class="chev">▾</span></div>
                <div class="popup" role="listbox" aria-hidden="true"></div>
                <slot></slot>
            </div>`;
        this.shadowRoot.appendChild(tpl.content.cloneNode(true));
        this._root = this.shadowRoot.querySelector('.selector');
        this._selectedEl = this.shadowRoot.querySelector('.selected');
        this._selectedLabel = this.shadowRoot.querySelector('.selected-label');
        this._popupEl = this.shadowRoot.querySelector('.popup');
        // remove shadow popup element entirely — portal will render popup in body
        try{ if(this._popupEl){ this._popupEl.remove(); this._popupEl = null; } }catch(e){}
        this._portalEl = null;
        const slot = this.shadowRoot.querySelector('slot');
        slot.addEventListener('slotchange', this._onSlotChange);
        // ensure popup hidden initially
        try{ this._popupEl.style.display = 'none'; this._popupEl.setAttribute('aria-hidden','true'); }catch(e){}
        this._onSlotChange();
        this._selectedEl.addEventListener('click', (e)=>{ e.stopPropagation(); if(this.hasAttribute('disabled') || this.getAttribute('mode')==='view') return; this._togglePopup(); });
        this._selectedEl.addEventListener('keydown', (e)=>{
            if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._togglePopup(); }
            else if(e.key === 'ArrowDown') { e.preventDefault(); this._focusFirstItem(); }
        });
        if(this._root) this._root.addEventListener('keydown', this._onKeyDown);
        // apply initial states
        this._applyDisabledState();
        this._applyModeState();
        this._inited = true;
    }
    disconnectedCallback(){
            if(this._root) this._root.removeEventListener('keydown', this._onKeyDown);
            try{ document.removeEventListener('click', this._onDocumentClick); }catch(e){}
            if(this._portalEl){ try{ this._portalEl.remove(); }catch(e){} this._portalEl = null; }
    }
    _onSlotChange(){
        const slot = this.shadowRoot.querySelector('slot');
        const assigned = slot.assignedElements({flatten:true});
        // if someone accidentally nested an aws-selector inside the slot, hide it to avoid nested UI
        assigned.forEach(a=>{ try{ if(a.tagName && a.tagName.toLowerCase()==='aws-selector'){ a.style.display = 'none'; a.hidden = true; a.setAttribute('aria-hidden','true'); } }catch(e){} });
        const nodes = assigned.filter(n=>n.tagName && n.tagName.toLowerCase()==='aws-option');
        // hide original slotted nodes; we'll render items only into the portal
        this._options = nodes;
        nodes.forEach((n, i)=>{
            try{ n.style.display = 'none'; n.hidden = true; n.setAttribute('aria-hidden','true'); }catch(e){}
            n.setAttribute('role','option');
            if(!n.hasAttribute('tabindex')) n.setAttribute('tabindex','-1');
        });
        // if none selected, keep first as selected
        const sel = nodes.find(n=>n.hasAttribute('selected')) || nodes[0];
        this._focusedIndex = nodes.indexOf(sel) >=0 ? nodes.indexOf(sel) : 0;
        this._updateSelectedLabel(sel);
        // setup persistent document click handler if not already created
        if(!this._onDocumentClick){
            this._onDocumentClick = (e)=>{
                const inHost = this.contains(e.target) || (this.shadowRoot && this.shadowRoot.contains(e.target));
                const inPortal = this._portalEl && this._portalEl.contains(e.target);
                if(!inHost && !inPortal) this._closePopup();
            };
        }
    }
    _selectByElement(el){
        if(this.hasAttribute('disabled')) return;
        if(!el || el.hasAttribute('disabled')) return;
        // clear previous
            this._options.forEach(o=>{ o.removeAttribute('selected'); o.setAttribute('aria-selected','false'); });
            el.setAttribute('selected','');
            el.setAttribute('aria-selected','true');
            this._updateSelectedLabel(el);
            const id = el.getAttribute('data-id') || el.id || null;
            this.dispatchEvent(new CustomEvent('change',{detail:{id, element: el}, bubbles:true, composed:true}));
    }

        _applyDisabledState(){
            const disabled = this.hasAttribute('disabled');
            try{
                if(this._selectedEl){
                    if(disabled){
                        this._selectedEl.setAttribute('aria-disabled','true');
                        this._selectedEl.tabIndex = -1;
                        this._selectedEl.classList.add('disabled');
                    }else{
                        this._selectedEl.removeAttribute('aria-disabled');
                        this._selectedEl.tabIndex = 0;
                        this._selectedEl.classList.remove('disabled');
                    }
                }
            }catch(e){}
        }

        _applyModeState(){
            const mode = this.getAttribute('mode') || 'edit';
            try{
                if(this._selectedEl){
                    if(mode === 'view'){
                        this._selectedEl.setAttribute('aria-readonly','true');
                        this._selectedEl.tabIndex = -1;
                        this._selectedEl.classList.add('view');
                    }else{
                        if(!this.hasAttribute('disabled')) this._selectedEl.tabIndex = 0;
                        this._selectedEl.removeAttribute('aria-readonly');
                        this._selectedEl.classList.remove('view');
                    }
                }
            }catch(e){}
        }

        _updateSelectedLabel(el){
            if(!el) { this._selectedLabel.textContent = ''; return; }
            // copy display content from the original option
            try{ this._selectedLabel.innerHTML = el.innerHTML; } catch(e){ this._selectedLabel.textContent = el.textContent || ''; }
        }

        // public property accessors for value
        get value(){
            try{
                if(!this._options || !this._options.length) return this.getAttribute('value') || null;
                const sel = this._options.find(o=>o.hasAttribute('selected')) || null;
                if(!sel) return null;
                return sel.getAttribute('data-id') || sel.id || (sel.getAttribute('value') || (sel.textContent || '').trim()) || null;
            }catch(e){ return null; }
        }

        set value(v){
            try{
                // reflect to attribute for external observation
                if(v === null || v === undefined) { this.removeAttribute('value'); }
                else this.setAttribute('value', String(v));

                if(!this._options || !this._options.length) return;
                // find matching option by data-id, id, value or text content
                const found = this._options.find(o=>{
                    const dataId = o.getAttribute('data-id');
                    const id = o.id || null;
                    const valAttr = o.getAttribute('value');
                    const txt = (o.textContent||'').trim();
                    return (dataId !== null && dataId == v) || (id && id == v) || (valAttr !== null && valAttr == v) || (txt && txt == v);
                });
                if(found) this._selectByElement(found);
            }catch(e){}
        }

        _togglePopup(){
            if(this._portalEl) this._closePopup(); else this._openPopup();
        }

        _openPopup(){
            if(this._portalEl) return;
            // create portal container
            const portal = document.createElement('div');
            portal.className = 'aws-selector-portal';
            // use fixed positioning so portal is not affected by parent stacking contexts
            portal.style.position = 'fixed';
            portal.style.zIndex = '2147483647';
            portal.style.minWidth = '100px';
            portal.style.left = '0px';
            portal.style.top = '0px';
            portal.style.pointerEvents = 'auto';

            const popup = document.createElement('div');
            popup.className = 'popup open';
            popup.setAttribute('role','listbox');
            popup.setAttribute('aria-hidden','false');

            // build items from original options
            this._options.forEach((n, i)=>{
                const item = document.createElement('div');
                item.className = 'item';
                item.tabIndex = 0;
                try{ item.innerHTML = n.innerHTML; }catch(e){ item.textContent = n.textContent || ''; }
                const dataId = n.getAttribute('data-id') || n.id || '';
                if(dataId) item.dataset.id = dataId;
                item.addEventListener('click', (ev)=>{ ev.stopPropagation(); this._selectByElement(n); this._closePopup(); });
                item.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); this._selectByElement(n); this._closePopup(); } });
                popup.appendChild(item);
            });

            // copy component styles into portal so popup keeps styling
            try{
                const localStyle = this.shadowRoot.querySelector('style');
                if(localStyle && localStyle.textContent){
                    const s = document.createElement('style');
                    s.textContent = localStyle.textContent;
                    portal.appendChild(s);
                }
            }catch(e){}
            portal.appendChild(popup);
            document.body.appendChild(portal);
            // apply current theme CSS variables to portal so :host rules copied into document work via vars
            try{
                const themeObj = getThemeObject();
                Object.keys(themeObj).forEach(k=>{
                    if(typeof themeObj[k] === 'string' && k.startsWith('aws-')){
                        portal.style.setProperty('--' + k, themeObj[k]);
                    }
                });
                // if the user applied an inline/background style to the selector host, propagate that
                // to the portal so the popup keeps the same visible background.
                try{
                    const comp = window.getComputedStyle(this);
                    const hostBg = comp.getPropertyValue('background-color') || comp.getPropertyValue('background');
                    const hostBorderColor = comp.getPropertyValue('border-color');
                    if(hostBg && hostBg.trim()){
                        portal.style.setProperty('--aws-bg', hostBg.trim());
                    }
                    if(hostBorderColor && hostBorderColor.trim()){
                        portal.style.setProperty('--aws-border', hostBorderColor.trim());
                    }
                    // also set an inline fallback on popup to ensure visibility if CSS vars fail
                    try{ popup.style.background = hostBg && hostBg.trim() ? hostBg.trim() : popup.style.background; }catch(_){}
                }catch(_){}
            }catch(e){}
            this._portalEl = portal;

                // hide the shadow popup while portal is visible to avoid duplication
                try{ if(this._popupEl){ this._popupEl.style.display = 'none'; this._popupEl.setAttribute('aria-hidden','true'); } }catch(e){}

                // attach document click listener to close portal on outside click
                try{ document.addEventListener('click', this._onDocumentClick); }catch(e){}

            // position portal relative to selected element (fixed -> viewport coords)
            const rect = this._selectedEl.getBoundingClientRect();
            popup.style.minWidth = rect.width + 'px';
            // place below by default (viewport coordinates)
            let top = rect.bottom;
            let left = rect.left;
            // measure and flip if overflowing
            popup.style.visibility = 'hidden';
            const measure = ()=>{
                const r = this._selectedEl.getBoundingClientRect();
                top = r.bottom;
                left = r.left;
                const h = popup.offsetHeight;
                if(top + h > window.innerHeight){
                    top = r.top - h;
                }
                portal.style.left = Math.max(4, left) + 'px';
                portal.style.top = Math.max(4, top) + 'px';
                popup.style.visibility = 'visible';
            };
            // allow layout to settle and also reposition on scroll/resize
            requestAnimationFrame(measure);
            this._repositionHandler = ()=>{ try{ measure(); }catch(e){} };
            window.addEventListener('scroll', this._repositionHandler, true);
            window.addEventListener('resize', this._repositionHandler);

            this._selectedEl.setAttribute('aria-expanded','true');
            this._focusFirstItem();
        }

        _closePopup(){
            // hide and remove any portal(s) left in the document to avoid lingering UI
            try{
                const portals = Array.from(document.querySelectorAll('.aws-selector-portal'));
                portals.forEach(p=>{
                    try{
                        const pop = p.querySelector('.popup'); if(pop){ pop.classList.remove('open'); pop.style.display = 'none'; pop.setAttribute('aria-hidden','true'); }
                        p.style.display = 'none';
                        p.remove();
                    }catch(_){}
                });

                // also remove any stray popup nodes appended outside a portal
                const stray = Array.from(document.querySelectorAll('body .popup'));
                stray.forEach(p=>{
                    const portalParent = p.closest('.aws-selector-portal');
                    if(!portalParent){ try{ p.classList.remove('open'); p.style.display='none'; p.setAttribute('aria-hidden','true'); p.remove(); }catch(_){} }
                });
            }catch(e){}
            this._portalEl = null;
            try{ if(this._repositionHandler){ window.removeEventListener('scroll', this._repositionHandler, true); window.removeEventListener('resize', this._repositionHandler); this._repositionHandler = null; } }catch(e){}
            try{ document.removeEventListener('click', this._onDocumentClick); }catch(e){}
            // ensure shadow popup is hidden too
            if(this._popupEl){
                try{ this._popupEl.style.display = ''; }catch(e){}
                this._popupEl.classList.remove('open');
                this._popupEl.setAttribute('aria-hidden','true');
            }
            // no shadow popup to rebuild (portal is single source of truth)
            this._selectedEl.setAttribute('aria-expanded','false');
        }

        _focusFirstItem(){
            if(this._portalEl){
                const first = this._portalEl.querySelector('.item');
                if(first) first.focus();
                return;
            }
            const first = this._popupEl.querySelector('.item');
            if(first) first.focus();
        }
    _onKeyDown(e){
        if(!this._options || !this._options.length) return;
        const key = e.key;
        if(key === 'ArrowRight' || key === 'ArrowDown'){
            e.preventDefault();
            this._focusedIndex = Math.min(this._options.length-1, this._focusedIndex+1);
            if(this._portalEl){
                const items = Array.from(this._portalEl.querySelectorAll('.item'));
                const it = items[this._focusedIndex]; if(it) it.focus();
            }else{
                const o = this._options[this._focusedIndex]; if(o) o.focus();
            }
        }else if(key === 'ArrowLeft' || key === 'ArrowUp'){
            e.preventDefault();
            this._focusedIndex = Math.max(0, this._focusedIndex-1);
            if(this._portalEl){
                const items = Array.from(this._portalEl.querySelectorAll('.item'));
                const it = items[this._focusedIndex]; if(it) it.focus();
            }else{
                const o = this._options[this._focusedIndex]; if(o) o.focus();
            }
        }else if(key === 'Enter' || key === ' '){
            e.preventDefault();
            const el = this._options[this._focusedIndex];
            if(el) this._selectByElement(el);
        }
    }
}

class SP_Option extends HTMLElement{
    connectedCallback(){
        // allow arbitrary content; ensure role and tabindex exist
        if(!this.hasAttribute('role')) this.setAttribute('role','option');
        if(!this.hasAttribute('tabindex')) this.setAttribute('tabindex','-1');
    }
}

if (!customElements.get('aws-selector')) {
    customElements.define('aws-selector', SP_Selector);
}
if (!customElements.get('aws-option')) {
    customElements.define('aws-option', SP_Option);
}

export { SP_Selector, SP_Option };
import { loadFile } from "../utils/load_file.js";
