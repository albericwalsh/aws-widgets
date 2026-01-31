export function generateCSS(theme) {
  // basic tokens can be extended via theme.widgets.table if present
  const t = (theme && theme.widgets && theme.widgets.table) || {};
  return `
    :host { display: block; }
    .table {
        display: table;
        width: 100%;
        border-collapse: collapse;
        border-radius: 6px;
        overflow: hidden;
        background: ${t.background || "linear-gradient(145deg, rgba(26, 26, 26, 0.3), rgba(34, 34, 34, 0.3))"};
        color: ${t.color || "#fff"};
        font-family: ${t.fontFamily || "Arial, sans-serif"};
        box-shadow: inset 0 0 20px rgba(0,0,0,0.3);
        table-layout: auto;
    }

    .table-cell {
        display: table-cell;
        padding: 12px 16px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
    }

    ::slotted(aws-table-head) {
        display: table-header-group;
        background: ${t.headerBg || "linear-gradient(90deg, rgba(42, 42, 42, 0.3), rgba(51, 51, 51, 0.3))"};
        font-weight: bold;
    }

    ::slotted(aws-table-body) { display: table-row-group; }

    ::slotted(aws-table-row) {
        display: table-row;
        transition: background 0.3s ease;
    }

    ::slotted(aws-table-row:hover) { background: rgba(0, 120, 255, 0.1); }

    ::slotted(aws-table-cell) {
        display: table-cell;
        text-align: center;
        border-right: 1px solid rgba(51, 51, 51, 0.1);
        vertical-align: middle;
        white-space: nowrap;
        transition: background 0.3s ease;
    }

    ::slotted(aws-table-cell:last-child) { border-right: none; }

    ::slotted(aws-table-head) { position: sticky; top: 0; z-index: 2; }
  `;
}

export default { generateCSS };
