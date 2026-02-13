function n(t) {
  if (!navigator.clipboard) {
    const e = document.createElement("textarea");
    e.value = t, e.style.position = "fixed", e.style.opacity = "0", document.body.appendChild(e), e.focus(), e.select();
    try {
      document.execCommand("copy");
    } catch (o) {
      console.error("Copy failed", o);
    }
    document.body.removeChild(e);
    return;
  }
  navigator.clipboard.writeText(t).catch((e) => {
    console.error("Copy failed", e);
  });
}
async function s(t) {
  input.replace("+", "").slice(0, 3);
  const r = (await (await fetch("https://restcountries.com/v3.1/all")).json()).find((i) => i.idd.root && input.startsWith(i.idd.root + (i.idd.suffixes ? i.idd.suffixes[0] : "")));
  r ? document.getElementById("result").innerHTML = `
            <img src="${r.flags.svg}" width="50" alt="flag">
            <span>${r.name.common}</span>
        ` : document.getElementById("result").textContent = "Pays non trouvé";
}
function c(t, e) {
  t && t.addEventListener("click", async () => {
    try {
      const o = String(typeof e == "function" ? e() : e || "");
      if (!o) return;
      await navigator.clipboard.writeText(o);
      try {
        const r = t.innerHTML;
        t.innerHTML = '<span class="material-icons">check</span>', setTimeout(() => {
          t.innerHTML = r;
        }, 800);
      } catch {
        t.classList.add("copied"), setTimeout(() => t.classList.remove("copied"), 800);
      }
    } catch (o) {
      console.error("Erreur copie:", o);
    }
  });
}
export {
  c as copi_btn,
  n as copyToClipboard,
  s as getFlagEmoji
};
