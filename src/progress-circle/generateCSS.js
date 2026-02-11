export function generateCSS(theme){
    const t = (theme && theme.widgets && theme.widgets['progress-circle']) || {};
    return `
        :host{ display:inline-block; --pc-size: 60px; --pc-color: ${t.color || 'var(--color-text-primary, #fff)'}; }

        .liquid-train{
            position: relative;
            width: var(--pc-size);
            height: var(--pc-size);
            display:flex;
            justify-content:center;
            align-items:center;
        }

        .particle{
            position: absolute;
            top: 50%;
            left: 100%;
            background-color: var(--pc-color);
            border-radius:50%;
            filter: drop-shadow(0 0 6px rgba(0,0,0,0.2));
            animation-name: rotate;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-fill-mode: both;
            will-change: transform, opacity;
        }

        .particle::after{
            content: "";
            position:absolute;
            width:100%;
            height:100%;
            border-radius:50%;
            background: inherit;
            opacity:0.7;
            filter: blur(4px);
            animation: twinkle 2s ease-in-out infinite alternate;
        }

        .particle:nth-child(odd)::after{ animation-delay: 0.3s; }
        .particle:nth-child(even)::after{ animation-delay: 0.6s; }
        .particle:nth-child(3n)::after{ animation-delay: 1s; }

        @keyframes rotate{ 0% { transform: rotate(0deg) translateX(0); } 100% { transform: rotate(360deg) translateX(0); } }

        @keyframes twinkle {
            0% { opacity: 0.2; transform: scale(0.6); }
            25% { opacity: 0.8; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1); }
            75% { opacity: 0.5; transform: scale(0.7); }
            100% { opacity: 0.3; transform: scale(0.8); }
        }

        :host([mode="view"]) { opacity: 0.95; }

        /* static view (read-only) */
        .progress-static{
            display:inline-flex;
            align-items:center;
            justify-content:center;
            width: var(--pc-size);
            height: var(--pc-size);
        }
        .progress-static svg{ width:100%; height:100%; transform: rotate(-90deg); }
        .progress-static .track{ fill: none; stroke: rgba(0,0,0,0.06); stroke-width: 6; }
        .progress-static .fill{ fill: none; stroke: var(--pc-color); stroke-width: 6; stroke-linecap: round; transition: stroke-dashoffset .25s ease; }
        .progress-static .label{ position:absolute; font-weight:600; font-size:0.9em; color:inherit; }
    `;
}

export default { generateCSS };
