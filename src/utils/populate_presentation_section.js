function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
      if (key === 'label' || key === 'text' || key === 'content') {
        refs.liveEl.textContent = val;
      } else if (typeof val === 'boolean') {
        if (val) refs.liveEl.setAttribute(key, ''); else refs.liveEl.removeAttribute(key);
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
      if (typeof v === 'boolean') { if (v) attrs.push(k); }
      else if (v !== null && v !== undefined && v !== '') attrs.push(`${k}="${escapeHtml(String(v))}"`);
    }
    const openTag = attrs.length ? `<${tag} ${attrs.join(' ')}>` : `<${tag}>`;
    const example = `${openTag}${escapeHtml(inner)}<\/${tag}>`;
    refs.codeBlock.textContent = example;
    try { hljs && hljs.highlightElement(refs.codeBlock); } catch(_) {}
    applyValues();
  }

  // Build controls
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
      input = document.createElement('input'); input.type = 'text'; input.className = 'control-input'; input.value = values[key];
      input.addEventListener('input', () => { values[key] = input.value; updateCodeAndPreview(); });
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
