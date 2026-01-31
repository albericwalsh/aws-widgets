// Builds a static DOM template for a widget presentation and returns the section
export function buildPresentationTemplate(id) {
  const section = document.createElement('section');
  section.className = `aws-widget-presentation aws-widget-${id}`;

  const title = document.createElement('h3');
  title.className = 'aws-widget-title';
  title.textContent = id;
  section.appendChild(title);

  const paramsWrap = document.createElement('div');
  paramsWrap.className = 'aws-widget-params-wrap';
  const controls = document.createElement('div');
  controls.className = 'aws-widget-controls';
  paramsWrap.appendChild(controls);

  const main = document.createElement('div');
  main.className = 'aws-widget-main';

  const codeCol = document.createElement('div');
  codeCol.className = 'aws-widget-code-col';
  const header = document.createElement('div'); header.className = 'aws-code-header';
  const codeTitle = document.createElement('h4'); codeTitle.textContent = 'Code';
  const codeActions = document.createElement('div'); codeActions.className = 'aws-code-actions';
  header.appendChild(codeTitle);
  header.appendChild(codeActions);

  const codePre = document.createElement('pre');
  const codeBlock = document.createElement('code'); codeBlock.className = 'aws-widget-code language-html';
  codePre.appendChild(codeBlock);

  codeCol.appendChild(header);
  codeCol.appendChild(codePre);

  const resultCol = document.createElement('div'); resultCol.className = 'aws-widget-result-col';
  const resultTitle = document.createElement('h4'); resultTitle.textContent = 'Résultat';
  const liveWrap = document.createElement('div'); liveWrap.className = 'aws-widget-live';
  const liveEl = document.createElement(`aws-${id}`);
  liveWrap.appendChild(liveEl);
  resultCol.appendChild(resultTitle);
  resultCol.appendChild(liveWrap);

  main.appendChild(codeCol);
  main.appendChild(resultCol);

  section.appendChild(paramsWrap);
  section.appendChild(main);

  // copy button (icon) placed in actions
  const copyBtn = document.createElement('button');
  copyBtn.type = 'button'; copyBtn.className = 'aws-copy-btn';
  copyBtn.innerHTML = '<span class="material-icons">content_copy</span>';
  copyBtn.title = 'Copier le code';
  codeActions.appendChild(copyBtn);

  // refs for later population
  section._refs = {
    title,
    paramsWrap,
    controls,
    codeBlock,
    codePre,
    copyBtn,
    liveEl,
    liveWrap,
  };

  return section;
}
