export function generateCSS(theme) {
    const iconBtn = theme.widgets.iconButton;

    return `
        :host {
            display: inline-block;
        }

        button {
            width: var(--btn-size);
            height: var(--btn-size);
            border-radius: ${iconBtn.borderRadius};
            border: none;
            background: ${iconBtn.background};
            color: ${iconBtn.color};
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            transition: transform .25s ease, background .25s ease;
        }

        button:hover {
            background: ${iconBtn.backgroundHover};
            transform: scale(${iconBtn.hoverScale});
        }

        button:active {
            background: ${iconBtn.backgroundActive};
            transform: scale(${iconBtn.activeScale});
        }

        i {
            font-family: 'Material Icons', serif;
            font-size: calc(var(--btn-size) * ${iconBtn.iconRatio});
            line-height: 1;
            pointer-events: none;
            font-style: normal;
        }
    `;
}
