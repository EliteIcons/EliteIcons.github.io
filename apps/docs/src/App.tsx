import { useState, useEffect, useRef } from 'react';
import * as EliteIcons from 'elite-icons-react';
import iconsMeta from './iconsMeta.json';
import './App.css';

interface IconMeta {
  name: string;
  componentName: string;
  svg: string;
}

export function App() {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState(32);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [color, setColor] = useState('#ccff00');
  const [selectedIcon, setSelectedIcon] = useState<IconMeta | null>(null);
  const [copiedType, setCopiedType] = useState<'svg' | 'jsx' | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const list: IconMeta[] = Array.isArray(iconsMeta) ? iconsMeta : [];
  const filtered = list.filter((icon) =>
    icon.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSelectedIcon(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const buildCleanSvg = (rawSvg: string) => {
    const inner = rawSvg.replace(/^<svg[^>]*>/i, '').replace(/<\/svg>$/i, '').trim();
    return `<svg xmlns="http://w3.org" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">\n  ${inner}\n</svg>`;
  };

  const copyText = (text: string, type: 'svg' | 'jsx') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1600);
  };

  const downloadSvg = (icon: IconMeta) => {
    const blob = new Blob([buildCleanSvg(icon.svg)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${icon.name}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const SelectedComponent = selectedIcon
    ? (EliteIcons as Record<string, any>)[selectedIcon.componentName]
    : null;

  return (
    <div className="studio">
      {/* Top Hero Header */}
      <header className="hero">
        <div className="hero-top">
          <span className="pill">OPEN SOURCE SVG ICONS // V1.0</span>
          <span className="count">{list.length} VECTOR ICONS</span>
        </div>

        <h1 className="title">
          ELITE<span className="accent">ICONS</span>
        </h1>

        <div className="search-box">
          <span className="prompt">&gt;_</span>
          <input
            ref={searchRef}
            type="text"
            placeholder="TYPE TO FILTER ICONS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <kbd>CTRL + K</kbd>
        </div>
      </header>

      {/* Edge-to-Edge Blueprint Grid */}
      <main className="blueprint-grid">
        {filtered.length === 0 ? (
          <div className="no-results">NO ICONS FOUND FOR "{search.toUpperCase()}"</div>
        ) : (
          filtered.map((icon, idx) => {
            const IconComponent = (EliteIcons as Record<string, any>)[icon.componentName];
            const isSelected = selectedIcon?.name === icon.name;
            return (
              <div
                key={icon.name}
                className={`cell ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedIcon(icon)}
              >
                <div className="cell-top">
                  <span className="index">{String(idx + 1).padStart(3, '0')}</span>
                  <button
                    className="quick-copy"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyText(buildCleanSvg(icon.svg), 'svg');
                    }}
                    title="Quick copy raw <svg>"
                  >
                    {copiedType === 'svg' && isSelected ? 'COPIED' : 'SVG'}
                  </button>
                </div>

                <div className="glyph-stage">
                  {IconComponent && (
                    <IconComponent size={size} color={color} strokeWidth={strokeWidth} />
                  )}
                </div>

                <div className="cell-name">{icon.name}</div>
              </div>
            );
          })
        )}
      </main>

      {/* Floating Bottom Control Dock */}
      <div className="dock">
        <div className="dock-item">
          <span>COLOR</span>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <code>{color.toUpperCase()}</code>
        </div>

        <div className="dock-divider" />

        <div className="dock-item">
          <span>SIZE</span>
          <input
            type="range"
            min="16"
            max="48"
            step="2"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <code>{size}PX</code>
        </div>

        <div className="dock-divider" />

        <div className="dock-item">
          <span>STROKE</span>
          <input
            type="range"
            min="1"
            max="3"
            step="0.25"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
          />
          <code>{strokeWidth}PX</code>
        </div>
      </div>

      {/* Right Slide-Over Inspector Drawer */}
      {selectedIcon && (
        <div className="drawer-backdrop" onClick={() => setSelectedIcon(null)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <span className="drawer-tag">ICON INSPECTOR</span>
                <h3>{selectedIcon.name}</h3>
              </div>
              <button className="close-btn" onClick={() => setSelectedIcon(null)}>
                ✕
              </button>
            </div>

            <div className="inspector-canvas">
              {SelectedComponent && (
                <SelectedComponent size={72} color={color} strokeWidth={strokeWidth} />
              )}
            </div>

            <div className="code-section">
              <div className="code-header">
                <span>RAW SVG MARKUP</span>
                <button
                  className="action-btn primary"
                  onClick={() => copyText(buildCleanSvg(selectedIcon.svg), 'svg')}
                >
                  {copiedType === 'svg' ? '✓ SVG COPIED!' : 'COPY SVG'}
                </button>
              </div>
              <pre className="code-block">{buildCleanSvg(selectedIcon.svg)}</pre>
            </div>

            <div className="code-section">
              <div className="code-header">
                <span>REACT COMPONENT</span>
                <button
                  className="action-btn"
                  onClick={() =>
                    copyText(
                      `<${selectedIcon.componentName} size={${size}} color="${color}" strokeWidth={${strokeWidth}} />`,
                      'jsx'
                    )
                  }
                >
                  {copiedType === 'jsx' ? '✓ JSX COPIED!' : 'COPY JSX'}
                </button>
              </div>
              <pre className="code-block">
                {`<${selectedIcon.componentName} size={${size}} color="${color}" strokeWidth={${strokeWidth}} />`}
              </pre>
            </div>

            <button className="download-full" onClick={() => downloadSvg(selectedIcon)}>
              DOWNLOAD {selectedIcon.name.toUpperCase()}.SVG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
