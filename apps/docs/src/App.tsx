import { useState } from 'react';
import * as EliteIcons from 'elite-icons-react';
import iconsMeta from './iconsMeta.json';
import './App.css';

export function App() {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState(24);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = iconsMeta.filter((icon) =>
    icon.name.toLowerCase().includes(search.toLowerCase())
  );

  const copyJSX = (componentName: string) => {
    navigator.clipboard.writeText(`<${componentName} size={${size}} strokeWidth={${strokeWidth}} />`);
    setCopied(componentName);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>EliteIcons</h1>
        <p>Crisp, customizable open-source React icons.</p>
      </header>

      <div className="controls">
        <input
          type="search"
          placeholder={`Search ${iconsMeta.length} icons...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label>
          Size: {size}px
          <input type="range" min="16" max="48" value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </label>
        <label>
          Stroke: {strokeWidth}px
          <input type="range" min="1" max="3" step="0.25" value={strokeWidth} onChange={(e) => setStrokeWidth(Number(e.target.value))} />
        </label>
      </div>

      <main className="grid">
        {filtered.map(({ name, componentName }) => {
          const IconComponent = (EliteIcons as Record<string, any>)[componentName];
          return (
            <button key={name} className="card" onClick={() => copyJSX(componentName)}>
              {IconComponent && <IconComponent size={size} strokeWidth={strokeWidth} />}
              <span>{copied === componentName ? 'Copied!' : name}</span>
            </button>
          );
        })}
      </main>
    </div>
  );
}
export default App;
