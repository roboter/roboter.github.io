import { useState, useEffect, useRef } from "react";

if (typeof window !== "undefined" && !window.qrcode) {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js";
  script.async = true;
  document.head.appendChild(script);
}

export default function LabelGenerator() {
  const previewRef = useRef(null);
  const sheetRef = useRef(null);

  const [name, setName] = useState("RESISTOR");
  const [headerColor, setHeaderColor] = useState("#1f8f3a");
  const [rows, setRows] = useState([
    { label: "Value", value: "4.7kΩ" },
    { label: "Power", value: "1/4W" },
    { label: "Qty", value: "100 pcs" },
  ]);

  const addRow = () => setRows([...rows, { label: "", value: "" }]);
  const updateRow = (index, field, val) => {
    const newRows = [...rows];
    newRows[index][field] = val;
    setRows(newRows);
  };
  const deleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const generateQR = (text, size = 160) => {
    if (!window.qrcode) return null;
    const qrGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    const qr = window.qrcode(0, "M");
    qr.addData(text);
    qr.make();
    const count = qr.getModuleCount();
    const scale = size / count;
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          const rect = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
          );
          rect.setAttribute("x", c * scale);
          rect.setAttribute("y", r * scale);
          rect.setAttribute("width", scale);
          rect.setAttribute("height", scale);
          rect.setAttribute("fill", "#000");
          qrGroup.appendChild(rect);
        }
      }
    }
    return qrGroup;
  };

  const renderLabel = (svg) => {
    if (!svg) return;
    svg.innerHTML = "";

    const rect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    rect.setAttribute("x", 5);
    rect.setAttribute("y", 5);
    rect.setAttribute("width", 490);
    rect.setAttribute("height", 490);
    rect.setAttribute("rx", 30);
    rect.setAttribute("fill", "#f5f5f5");
    rect.setAttribute("stroke", "#222");
    rect.setAttribute("stroke-width", 10);
    svg.appendChild(rect);

    const header = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    header.setAttribute("x", 20);
    header.setAttribute("y", 20);
    header.setAttribute("width", 460);
    header.setAttribute("height", 70);
    header.setAttribute("rx", 20);
    header.setAttribute("fill", headerColor);
    svg.appendChild(header);

    const textName = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    textName.setAttribute("x", 250);
    textName.setAttribute("y", 68);
    textName.setAttribute("font-size", 40);
    textName.setAttribute("text-anchor", "middle");
    textName.setAttribute("fill", "#fff");
    textName.setAttribute("font-weight", "bold");
    textName.textContent = name;
    svg.appendChild(textName);

    const qrGroup = generateQR(name);
    if (qrGroup) {
      qrGroup.setAttribute("transform", "translate(300,140) scale(1)");
      svg.appendChild(qrGroup);
    }

    let y = 150;
    const lineHeight = 38;
    rows.forEach((row) => {
      if (!row.label && !row.value) return;
      const t = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      t.setAttribute("x", 40);
      t.setAttribute("y", y);
      t.setAttribute("font-size", 28);
      t.textContent = row.label ? `${row.label}: ${row.value}` : row.value;
      svg.appendChild(t);
      y += lineHeight;
    });
  };

  useEffect(() => {
    renderLabel(previewRef.current);
  }, [name, headerColor, rows]);

  const addToSheet = () => {
    const group = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    const index = sheetRef.current.children.length;
    const labelsPerRow = 4;
    const spacing = 20;
    const labelSize = 500;
    const col = index % labelsPerRow;
    const row = Math.floor(index / labelsPerRow);
    group.setAttribute(
      "transform",
      `translate(${col * (labelSize + spacing)},${row * (labelSize + spacing)})`
    );
    [...previewRef.current.children].forEach((el) =>
      group.appendChild(el.cloneNode(true))
    );

    const delBtn = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    delBtn.setAttribute("x", 470);
    delBtn.setAttribute("y", 20);
    delBtn.setAttribute("font-size", 30);
    delBtn.setAttribute("fill", "red");
    delBtn.textContent = "✕";
    delBtn.addEventListener("click", () => group.remove());
    group.appendChild(delBtn);

    sheetRef.current.appendChild(group);
  };

  const saveSheet = () => {
    const clone = sheetRef.current.cloneNode(true);
    clone.querySelectorAll("text").forEach((t) => {
      if (t.textContent === "✕") t.remove();
    });
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(clone);
    const blob = new Blob([source], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "labels.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const sidebarStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
    minWidth: 250,
   
    
    borderRadius: 8,
    border: "1px solid #ccc",
  };

  const inputStyle = {
    padding: "6px 8px",
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ccc",
    marginBottom: 6,
  };

  const buttonStyle = {
    padding: "8px 12px",
    margin: "4px 0",
    borderRadius: 6,
    border: "none",
    backgroundColor: "#1f8f3a",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const sheetContainerStyle = {
    flex: 1,
    overflow: "auto",
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 8,
  };

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <div style={sidebarStyle}>
        <h3>Edit Label Preview</h3>
        <svg
          ref={previewRef}
          className="preview"
          width={200}
          height={200}
          viewBox="0 0 500 500"
          style={{ border: "1px solid #aaa", borderRadius: 8 }}
        ></svg>

        <label>
          Component Name
          <input
            style={inputStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Header Color
          <input
            style={{ ...inputStyle, padding: "3px" }}
            type="color"
            value={headerColor}
            onChange={(e) => setHeaderColor(e.target.value)}
          />
        </label>

        <h4>Properties</h4>
        {rows.map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
            <input
              style={inputStyle}
              placeholder="Label"
              value={row.label}
              onChange={(e) => updateRow(i, "label", e.target.value)}
            />
            <input
              style={inputStyle}
              placeholder="Value"
              value={row.value}
              onChange={(e) => updateRow(i, "value", e.target.value)}
            />
            <button style={{ ...buttonStyle, backgroundColor: "#d9534f" }} onClick={() => deleteRow(i)}>
              ✕
            </button>
          </div>
        ))}
        <button style={buttonStyle} onClick={addRow}>
          + Add row
        </button>
        <button style={buttonStyle} onClick={addToSheet}>
          Add to Sheet
        </button>
        <button style={buttonStyle} onClick={saveSheet}>
          Save Sheet as SVG
        </button>
      </div>

      <div style={sheetContainerStyle}>
        <svg
          ref={sheetRef}
          viewBox="0 0 2100 2970"
          style={{ width: "100%", border: "1px solid #888", borderRadius: 8 }}
        ></svg>
      </div>
    </div>
  );
}