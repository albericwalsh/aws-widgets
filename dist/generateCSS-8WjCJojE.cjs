"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("./theme-wIK325iA.cjs");function r(e=s.getThemeObject()){const a=e&&e.widgets&&e.widgets.table||{},l=20;let o="";for(let t=1;t<=l;t++)o+=`::slotted(aws-table-row) > aws-table-cell:nth-child(${t}){width:var(--col-${t}-width, auto);}`;return`:host{${s.cssVarsString(Object.assign({},s.getThemeObject().cssVars||{},e&&e.cssVars||{}))}}
        :host{display:block}
        .table{
            display:table;
            position: relative;
            width:100%;
            border-collapse:separate;
            border-spacing:0;
            border-radius:8px;
            overflow:hidden;
            background:var(--aws-bg, ${a.background||"linear-gradient(145deg, rgba(26, 26, 26, 0.04), rgba(34, 34, 34, 0.04))"});
            color:var(--aws-foreground, ${a.color||"#fff"});font-family:${a.fontFamily||"Inter, Arial, sans-serif"};
            box-shadow:inset 0 0 12px rgba(0,0,0,0.06);
            table-layout:fixed
        }

        /* slotted element basics (head/body/rows/cells are custom elements in light DOM) */
        ::slotted(aws-table-head){
            display:table-header-group;
            background:var(--aws-header-bg, ${a.headerBg||"rgba(245,245,245,0.02)"});
            font-weight:600}
        ::slotted(aws-table-body){
            display:table-row-group;
        }
        ::slotted(aws-table-row){
            display:table-row;
            transition: background 160ms ease, box-shadow 200ms ease;
        }
        ::slotted(aws-table-row:hover), ::slotted(aws-table-row.hover){
            background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
            box-shadow: 0 6px 18px rgba(0,0,0,0.06);
        }
        /* per-cell transition and transform origin for hover scaling */
        ::slotted(aws-table-cell) {
            transition: transform 220ms cubic-bezier(.2,.9,.2,1), box-shadow 220ms cubic-bezier(.2,.9,.2,1);
            transform-origin: center;
            will-change: transform;
            backface-visibility: hidden;
        }
        /* subtle left accent */
        ::slotted(aws-table-row.hover) > aws-table-cell:first-child {
            box-shadow: inset 4px 0 0 rgba(255,255,255,0.03);
        }
        ::slotted(aws-table-cell){
            display:table-cell;
            box-sizing: border-box;
            padding:1.2rem 20px;
            text-align:left;
            vertical-align:middle;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            border-bottom:1px solid rgba(0,0,0,0.04);
            border-right:1px solid rgba(255,255,255,0.06);
            position:relative;
            font-size:13px;
        }
        ::slotted(aws-table-cell:last-child){
            border-right: none
        }
        ::slotted(aws-table-head){
            position:sticky;
            top:0;
            z-index:2;
        }

        /* visual separation for header */
        ::slotted(aws-table-head aws-table-row > aws-table-cell){
        background:rgba(0,0,0,0.02);
        font-weight:600;
        padding-right:26px;
        }

        /* make the column divider visible */
        ::slotted(aws-table-row > aws-table-cell){
        box-shadow: inset -1px 0 0 rgba(255,255,255,0.03);
        }

        /* per-column width rules */
        ${o}
    `}const i={generateCSS:r};exports.setTheme=s.setThemeObject;exports.default=i;exports.generateCSS=r;
