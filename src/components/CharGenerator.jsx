import { useState, useEffect } from 'react';

export default function CharGenerator() {
  const VERSION = 'v15';
  const [gridData, setGridData] = useState([]);
  const [cols, setCols] = useState(5);
  const [rows, setRows] = useState(5);
  const [isReady, setIsReady] = useState(false);

  const presets = {
    triangle_up: { hex: [0x20, 0x50, 0x88, 0x88, 0xF8] },
    triangle_down: { hex: [0xF8, 0x88, 0x88, 0x50, 0x20] },
    diamond: { hex: [0x20, 0x50, 0x88, 0x50, 0x20] },
    heart: { hex: [0x50, 0xF8, 0xF8, 0x70, 0x20] },
    star: { hex: [0x20, 0xA8, 0x70, 0xA8, 0x20] },
    check: { hex: [0x08, 0x10, 0x20, 0x50, 0x88] },
    x_mark: { hex: [0x88, 0x50, 0x20, 0x50, 0x88] },
    smile: { hex: [0x88, 0x00, 0x70, 0x88, 0x70] },
    circle: { hex: [0x70, 0x88, 0x88, 0x88, 0x70] },
    square: { hex: [0xF8, 0x88, 0x88, 0x88, 0xF8] }
  };

  // Initialize grid on mount
  useEffect(() => {
    const newGrid = Array(rows).fill(null).map(() => Array(cols).fill(0));
    setGridData(newGrid);
    setIsReady(true);
  }, [cols, rows]);

  const togglePixel = (row, col) => {
    const newGrid = gridData.map(r => [...r]);
    newGrid[row][col] = newGrid[row][col] ? 0 : 1;
    setGridData(newGrid);
  };

  const clearGrid = () => {
    setGridData(Array(rows).fill(null).map(() => Array(cols).fill(0)));
  };

  const fillGrid = () => {
    setGridData(gridData.map(row => row.map(() => 1)));
  };

  const invertGrid = () => {
    setGridData(gridData.map(row => row.map(pixel => pixel ? 0 : 1)));
  };

  const loadPreset = (name) => {
    const preset = presets[name];
    const presetCols = 5; // Presets are always 5 bits wide
    const presetRows = 5; // Presets are always 5 rows tall
    
    // Update grid size to match preset
    setCols(presetCols);
    setRows(presetRows);
    
    setGridData(preset.hex.map(byte => {
      const row = [];
      for (let i = 0; i < presetCols; i++) {
        row.push((byte >> (7 - i)) & 1);
      }
      return row;
    }));
  };

  const getHexOutput = () => {
    const hexValues = gridData.map(row => {
      let byte = 0;
      for (let i = 0; i < cols; i++) {
        byte = (byte << 1) | row[i];
      }
      byte = byte << (8 - cols);
      return '0x' + byte.toString(16).toUpperCase().padStart(2, '0');
    });
    return '{' + hexValues.join(', ') + '}';
  };

  const getAsciiDisplay = () => {
    let ascii = '┌';
    for (let i = 0; i < cols; i++) ascii += '──┬';
    ascii = ascii.slice(0, -1) + '┐\n';
    
    gridData.forEach((row, rowIdx) => {
      ascii += '│';
      row.forEach(pixel => {
        ascii += pixel ? '██' : '  ';
        ascii += '│';
      });
      ascii += '\n';
      
      if (rowIdx < gridData.length - 1) {
        ascii += '├';
        for (let i = 0; i < cols; i++) ascii += '──┼';
        ascii = ascii.slice(0, -1) + '┤\n';
      }
    });
    
    ascii += '└';
    for (let i = 0; i < cols; i++) ascii += '──┴';
    ascii = ascii.slice(0, -1) + '┘';
    
    return ascii;
  };

  if (!isReady || gridData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', margin: '30px 0' }}>
      {/* Editor */}
      <div style={{ background: '#0a0a0a', padding: '20px', border: '2px solid #00ff00', borderRadius: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ marginTop: 0, color: '#00ff00' }}>Editor</h3>
          <div style={{ fontSize: '10px', color: '#00aa00' }}>{VERSION}</div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', justifyContent: 'center' }}>
          <label style={{ color: '#00ff00' }}>
            Width: 
            <input 
              type="number" 
              value={cols} 
              onChange={(e) => setCols(parseInt(e.target.value))} 
              min="3" 
              max="8" 
              style={{ width: '60px', padding: '5px', margin: '0 5px', background: '#1a1a1a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px' }} 
            />
          </label>
          <label style={{ color: '#00ff00' }}>
            Height: 
            <input 
              type="number" 
              value={rows} 
              onChange={(e) => setRows(parseInt(e.target.value))} 
              min="5" 
              max="16" 
              style={{ width: '60px', padding: '5px', margin: '0 5px', background: '#1a1a1a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px' }} 
            />
          </label>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '2px', background: '#000', padding: '10px', border: '2px solid #00aa00', width: 'fit-content', margin: '0 auto' }}>
            {gridData.map((row, rowIdx) =>
              row.map((pixel, colIdx) => (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  onClick={() => togglePixel(rowIdx, colIdx)}
                  style={{
                    width: '30px',
                    height: '30px',
                    background: pixel ? '#00ff00' : '#333',
                    border: pixel ? '1px solid #00ff00' : '1px solid #111',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    boxShadow: pixel ? '0 0 5px #00ff00' : 'none',
                    transition: 'all 0.1s'
                  }}
                />
              ))
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', margin: '15px 0', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={clearGrid} 
            style={{ padding: '8px 15px', background: '#0a0a0a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px', cursor: 'pointer' }}
          >
            Clear
          </button>
          <button 
            onClick={fillGrid} 
            style={{ padding: '8px 15px', background: '#0a0a0a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px', cursor: 'pointer' }}
          >
            Fill
          </button>
          <button 
            onClick={invertGrid} 
            style={{ padding: '8px 15px', background: '#0a0a0a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px', cursor: 'pointer' }}
          >
            Invert
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #00aa00' }}>
          <button onClick={() => loadPreset('triangle_up')} style={{ padding: '6px 10px', fontSize: '12px', background: '#0a0a0a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px', cursor: 'pointer' }}>▲ Up</button>
          <button onClick={() => loadPreset('triangle_down')} style={{ padding: '6px 10px', fontSize: '12px', background: '#0a0a0a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px', cursor: 'pointer' }}>▼ Down</button>
          <button onClick={() => loadPreset('diamond')} style={{ padding: '6px 10px', fontSize: '12px', background: '#0a0a0a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px', cursor: 'pointer' }}>◆ Diamond</button>
          <button onClick={() => loadPreset('heart')} style={{ padding: '6px 10px', fontSize: '12px', background: '#0a0a0a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px', cursor: 'pointer' }}>♥ Heart</button>
          <button onClick={() => loadPreset('star')} style={{ padding: '6px 10px', fontSize: '12px', background: '#0a0a0a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px', cursor: 'pointer' }}>★ Star</button>
          <button onClick={() => loadPreset('check')} style={{ padding: '6px 10px', fontSize: '12px', background: '#0a0a0a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px', cursor: 'pointer' }}>✓ Check</button>
          <button onClick={() => loadPreset('x_mark')} style={{ padding: '6px 10px', fontSize: '12px', background: '#0a0a0a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px', cursor: 'pointer' }}>✕ Mark</button>
          <button onClick={() => loadPreset('smile')} style={{ padding: '6px 10px', fontSize: '12px', background: '#0a0a0a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px', cursor: 'pointer' }}>☺ Smile</button>
          <button onClick={() => loadPreset('circle')} style={{ padding: '6px 10px', fontSize: '12px', background: '#0a0a0a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px', cursor: 'pointer' }}>● Circle</button>
          <button onClick={() => loadPreset('square')} style={{ padding: '6px 10px', fontSize: '12px', background: '#0a0a0a', color: '#00ff00', border: '1px solid #00ff00', borderRadius: '3px', cursor: 'pointer' }}>■ Square</button>
        </div>
      </div>

      {/* Preview & Output */}
      <div style={{ background: '#0a0a0a', padding: '20px', border: '2px solid #00ff00', borderRadius: '5px' }}>
        <h3 style={{ marginTop: 0, color: '#00ff00', borderBottom: '1px solid #00aa00', paddingBottom: '10px' }}>Preview & Output</h3>

        <div style={{ textAlign: 'center' }}>
          <pre style={{ background: '#000', border: '2px solid #00aa00', padding: '15px', margin: '20px auto', fontSize: '11px', lineHeight: '1.4', whiteSpace: 'pre', display: 'inline-block', color: '#00ff00' }}>
            {getAsciiDisplay()}
          </pre>
        </div>

        <div style={{ background: '#000', border: '2px solid #00aa00', padding: '15px', margin: '20px 0', borderRadius: '3px' }}>
          <div style={{ color: '#00aa00', fontSize: '12px', marginBottom: '8px' }}>C Code (Hex Array):</div>
          <div style={{ background: '#1a1a1a', padding: '10px', border: '1px solid #00aa00', borderRadius: '3px', fontSize: '13px', wordBreak: 'break-all', color: '#00ff00' }}>
            {getHexOutput()}
          </div>
        </div>

        <div style={{ background: '#1a1a1a', padding: '10px', border: '1px solid #00aa00', borderRadius: '3px', fontSize: '12px', color: '#00aa00' }}>
          <strong>Click on pixels to toggle them on/off. Use presets or create custom characters!</strong>
        </div>
      </div>
    </div>
  );
}