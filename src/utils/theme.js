// src/utils/theme.js
export async function loadTheme() {
    const res = await fetch(new URL("../style.json", import.meta.url));
    return await res.json();
}