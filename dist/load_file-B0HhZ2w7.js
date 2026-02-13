async function a(e, n, l) {
  const [s, c] = await Promise.all([
    fetch(e).then((t) => t.text()),
    fetch(n).then((t) => t.text())
  ]);
  l.innerHTML = `
        <style>${c}</style>
        ${s}
    `;
}
export {
  a as loadFile
};
