"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function e(o){return o&&o.widgets&&o.widgets.selector,`
        :host{display:block}
        .selector{
            display:inline-block;
            position:relative;
            --option-padding: var(--option-padding, 10px 16px);
            --option-gap: 10px;
        }

        .selected{
            display:inline-flex;
            align-items:center;
            justify-content:space-between;
            gap:16px;
            padding:12px 20px;
            border-radius:var(--option-radius, 12px);
            background:var(--option-bg, rgba(255,255,255,0.02));
            color:var(--option-color, inherit);
            cursor:pointer;
            min-width:220px;
            user-select:none;
            box-shadow: 0 6px 18px rgba(0,0,0,0.08);
            transition: box-shadow .14s ease, transform .06s ease;
        }

        .selected:focus{ outline: none; box-shadow: 0 0 0 3px rgba(255,255,255,0.03); }

        :host([disabled]) .selected{ opacity:0.5; cursor:not-allowed; box-shadow:none; }
        :host([mode="view"]) .selected{ opacity:0.85; cursor:default; box-shadow:none; }
        :host([mode="view"]) .chev{ display:none; }

        .chev{ opacity:0.8; margin-left:8px; font-size:0.9em }

        .popup{
            position:absolute;
            top:calc(100% + 8px);
            left:0;
            min-width:100%;
            background:var(--option-bg, rgba(10,10,10,0.95));
            border-radius:12px;
            box-shadow:0 12px 40px rgba(0,0,0,0.35);
            padding:8px;
            z-index:9999;
            display:none;
            max-height:320px;
            overflow:auto;
            display:flex;
            flex-direction:column;
            gap:6px;
        }
        .popup.open{ display:flex; }

        .popup .item{
            display:flex;
            align-items:center;
            gap:12px;
            padding:10px 14px;
            border-radius:8px;
            color:var(--option-color, inherit);
            cursor:pointer;
            transition: background .08s ease, transform .06s ease;
        }
        .popup .item:hover, .popup .item:focus{ background: rgba(255,255,255,0.03); transform: translateY(-1px); }

        /* keep slotted options available in DOM but hide them visually */
        ::slotted(aws-option){ display:none; }
    `}const t={generateCSS:e};exports.default=t;exports.generateCSS=e;
