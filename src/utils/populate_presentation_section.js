function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescapeHtml(str) {
  return String(str)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function populatePresentationSection(section, widget, values) {
  const id = widget.id;
  const paramsMeta = widget.parameters || {};
  const refs = section._refs;
  refs.title.textContent = id;

  // clear controls
  refs.controls.innerHTML = '';

  // update live and code
  function applyValues() {
    Object.keys(values).forEach(key => {
      const val = values[key];
      if (key === 'label' || key === 'text') {
        refs.liveEl.textContent = val;
      } else if (key === 'content') {
        // allow widgets that render HTML (slot-based) to inject markup
        const slotWidgets = new Set(['table','selector']);
        if (slotWidgets.has(id)) refs.liveEl.innerHTML = val || '';
        else refs.liveEl.textContent = val;
      } else if (typeof val === 'boolean') {
        if (val) refs.liveEl.setAttribute(key, ''); else refs.liveEl.removeAttribute(key);
      } else if (key === 'types' && id === 'input') {
        // demo parameter 'types' (array) maps to the actual attribute 'type' on aws-input
        // use the first type as the initial/default selection
        let chosen = val;
        if (Array.isArray(val)) chosen = val[0] || '';
        if (chosen !== null && chosen !== undefined && chosen !== '') refs.liveEl.setAttribute('type', String(chosen)); else refs.liveEl.removeAttribute('type');
      } else if (val !== null && val !== undefined && val !== '') {
        refs.liveEl.setAttribute(key, String(val));
      } else {
        refs.liveEl.removeAttribute(key);
      }
    });
  }

  function updateCodeAndPreview() {
    const tag = `aws-${id}`;
    const attrs = [];
    let inner = '';
    for (const [k, v] of Object.entries(values)) {
      if (k === 'label' || k === 'text' || k === 'content') { inner = v; continue; }
      const attrName = (id === 'input' && k === 'types') ? 'type' : k;
      let valForAttr = v;
      if (id === 'input' && k === 'types' && Array.isArray(v)) valForAttr = v[0];
      if (typeof v === 'boolean') { if (v) attrs.push(attrName); }
      else if (valForAttr !== null && valForAttr !== undefined && valForAttr !== '') attrs.push(`${attrName}="${escapeHtml(String(valForAttr))}"`);
    }
    const openTag = attrs.length ? `<${tag} ${attrs.join(' ')}>` : `<${tag}>`;
    // build example code for display: unescape inner so special chars show (e.g. <, >, ")
    const innerForCode = (typeof inner === 'string') ? unescapeHtml(String(inner)) : '';
    const example = `${openTag}${innerForCode}<\/${tag}>`;
    refs.codeBlock.textContent = example;
    try {
      if (hljs && refs.codeBlock) {
        try { if (refs.codeBlock.querySelector && refs.codeBlock.querySelector('*')) refs.codeBlock.textContent = refs.codeBlock.textContent; } catch(e){}
        try { delete refs.codeBlock.dataset.highlighted; } catch(e){}
        try { hljs.highlightElement(refs.codeBlock); } catch(e){}
      }
    } catch(_) {}
    applyValues();

    // ensure clicking the preview value opens URL in a new tab (works for <div> or <button>)
    try{
      if(!refs._previewClickDelegated){
        // if the previewed widget is an input url in view mode, expose host cursor and delegate clicks
        try{
          const isInputWidget = (refs.liveEl && refs.liveEl.tagName && refs.liveEl.tagName.toLowerCase() === 'aws-input');
          const typeAttr = refs.liveEl && refs.liveEl.getAttribute ? refs.liveEl.getAttribute('type') : null;
          const modeAttr = refs.liveEl && refs.liveEl.getAttribute ? refs.liveEl.getAttribute('mode') : null;
          if(isInputWidget && (typeAttr === 'url' || (refs.liveEl._type && refs.liveEl._type === 'url')) && modeAttr === 'view'){
            // apply pointer to the whole preview region and host
            try{ refs.liveWrap.style.setProperty && refs.liveWrap.style.setProperty('cursor','pointer','important'); }catch(_){ try{ refs.liveWrap.style.cursor='pointer'; }catch(_){} }
            try{ refs.liveEl.style.setProperty && refs.liveEl.style.setProperty('cursor','pointer','important'); }catch(_){ try{ refs.liveEl.style.cursor='pointer'; }catch(_){} }
            // try to set cursor on inner #value within shadowRoot if available
            try{
              const inner = refs.liveEl.shadowRoot && refs.liveEl.shadowRoot.querySelector ? refs.liveEl.shadowRoot.querySelector('#value') : null;
              if(inner && inner.style){ try{ inner.style.setProperty && inner.style.setProperty('cursor','pointer','important'); }catch(_){ inner.style.cursor='pointer'; } inner.tabIndex = 0; try{ inner.setAttribute && inner.setAttribute('role','link'); }catch(_){} }
              else {
                // schedule a retry in case shadow content isn't ready yet
                setTimeout(()=>{
                  try{ const i2 = refs.liveEl.shadowRoot && refs.liveEl.shadowRoot.querySelector ? refs.liveEl.shadowRoot.querySelector('#value') : null; if(i2 && i2.style){ try{ i2.style.setProperty && i2.style.setProperty('cursor','pointer','important'); }catch(_){ i2.style.cursor='pointer'; } i2.tabIndex = 0; try{ i2.setAttribute && i2.setAttribute('role','link'); }catch(_){} } }catch(_){}
                }, 50);
              }
            }catch(_){}
          }
        }catch(_){}

        refs.liveWrap.addEventListener('click', (ev)=>{
          try{
            // ignore clicks on copy button or inside it
            const path = ev.composedPath ? ev.composedPath() : (ev.path || []);
            const isCopy = (path || []).some(n => n && (n.id === 'copy' || (n.tagName && String(n.tagName).toLowerCase() === 'aws-icon-button') || (n.classList && n.classList.contains && n.classList.contains('aws-copy-btn'))));
            if(isCopy) return;

            // first try: find any node with id='value' in the event path
            const node = (path || []).find(n => n && n.id === 'value');
            let txt = '';
            if(node) txt = (node.textContent || node.value || '').trim();
            // fallback: read from host's shadowRoot or host textContent
            if(!txt && refs.liveEl){
              try{
                const inner = refs.liveEl.shadowRoot && refs.liveEl.shadowRoot.querySelector ? refs.liveEl.shadowRoot.querySelector('#value') : null;
                if(inner) txt = (inner.textContent || inner.value || '').trim();
                else {
                  // also try light DOM query inside liveEl
                  const inner2 = refs.liveEl.querySelector ? refs.liveEl.querySelector('#value') : null;
                  if(inner2) txt = (inner2.textContent || inner2.value || '').trim();
                }
                // as ultimate fallback, use host attribute or textContent
                if(!txt) txt = (refs.liveEl.getAttribute && refs.liveEl.getAttribute('value')) || (refs.liveEl.textContent || '').trim();
              }catch(_){}
            }

            if(!txt) return;
            const modeAttr2 = refs.liveEl.getAttribute && refs.liveEl.getAttribute('mode');
            if(modeAttr2 && modeAttr2 !== 'view') return;
            const u = new URL(txt);
            if(window && window.open) window.open(u.toString(), '_blank', 'noopener');
          }catch(_){}
        });
        refs._previewClickDelegated = true;
      }
    }catch(e){}
  }

  // Build controls
  // If widget supports being disabled, expose a checkbox control for it
  if (widget.desactivable) {
    const key = 'disabled';
    const group = document.createElement('div'); group.className = 'control-group';
    const label = document.createElement('label'); label.className = 'control-label'; label.textContent = key;
    group.appendChild(label);
    const input = document.createElement('input'); input.type = 'checkbox'; input.className = 'control-input';
    // determine initial state: values > paramsMeta > false
    const init = (values && typeof values[key] !== 'undefined') ? values[key] : (paramsMeta && typeof paramsMeta[key] !== 'undefined' ? paramsMeta[key] : false);
    input.checked = !!init; values[key] = !!init;
    input.addEventListener('change', () => { values[key] = input.checked; updateCodeAndPreview(); });
    group.appendChild(input);
    refs.controls.appendChild(group);
  }

  for (const [key, meta] of Object.entries(paramsMeta)) {
    const group = document.createElement('div'); group.className = 'control-group';
    const label = document.createElement('label'); label.className = 'control-label'; label.textContent = key;
    group.appendChild(label);

    let input;
    if (Array.isArray(meta)) {
      input = document.createElement('select'); input.className = 'control-input';
      for (const opt of meta) { const o = document.createElement('option'); o.value = opt; o.textContent = opt; input.appendChild(o); }
      input.value = values[key]; input.addEventListener('change', () => { values[key] = input.value; updateCodeAndPreview(); });
    } else if (typeof meta === 'boolean') {
      input = document.createElement('input'); input.type = 'checkbox'; input.className = 'control-input'; input.checked = !!values[key];
      input.addEventListener('change', () => { values[key] = input.checked; updateCodeAndPreview(); });
    } else if (typeof meta === 'number') {
      input = document.createElement('input'); input.type = 'number'; input.className = 'control-input'; input.value = values[key];
      input.addEventListener('input', () => { values[key] = Number(input.value); updateCodeAndPreview(); });
    } else {
      // special-case 'content' and 'data' to provide a textarea for multi-line editing
      if (key === 'content' || key === 'data' || key === 'data_name') {
        input = document.createElement('textarea'); input.className = 'control-input'; input.rows = (key === 'data' ? 3 : 4); input.value = values[key] || '';
        input.addEventListener('input', () => { values[key] = input.value; updateCodeAndPreview(); });
      } else {
        input = document.createElement('input'); input.type = 'text'; input.className = 'control-input'; input.value = values[key];
        input.addEventListener('input', () => { values[key] = input.value; updateCodeAndPreview(); });
      }
    }

    group.appendChild(input);
    refs.controls.appendChild(group);
  }

  // wire copy button
  refs.copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(refs.codeBlock.textContent);
      const prev = refs.copyBtn.innerHTML;
      refs.copyBtn.innerHTML = '<span class="material-icons">check</span>';
      setTimeout(() => { refs.copyBtn.innerHTML = prev; }, 1200);
    } catch (e) {
      refs.copyBtn.innerHTML = '<span class="material-icons">error</span>';
      setTimeout(() => { refs.copyBtn.innerHTML = '<span class="material-icons">content_copy</span>'; }, 1200);
    }
  });

  // initial render
  updateCodeAndPreview();
}
