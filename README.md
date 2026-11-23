# EliteIcons

EliteIcons is an open-source SVG icon library and interactive icon studio. It combines a curated collection of SVG assets with a React component package and a searchable browser-based documentation app.

**Website:** [https://EliteIcons.github.io/](https://EliteIcons.github.io/)  
**Repository:** [EliteIcons/EliteIcons.github.io](https://github.com/EliteIcons/EliteIcons.github.io) 

## Features

- Searchable collection of SVG icons
- Customizable icon color, size, and stroke width
- Copy-ready raw SVG markup
- Copy-ready React JSX snippets
- Direct SVG downloads
- Shareable URLs that preserve icon studio settings
- Keyboard search with `Ctrl + K` / `Cmd + K`
- Automated SVG optimization and React component generation
- React 18 and React 19 support
- Automatic deployment to GitHub Pages

## Technology

- TypeScript
- CSS
- JavaScript
- HTML
- React
- Vite
- pnpm workspaces
- tsup
- SVGO
- Cheerio
- GitHub Actions
- GitHub Pages

## Repository Structure

```text
.
├── apps/
│   └── docs/                  # React and Vite icon studio and documentation site
├── icons/                     # Source SVG icon assets
├── packages/
│   └── elite-icons-react/     # Published React component package
├── scripts/
│   └── build-icons.mjs        # Generates React components and documentation metadata
├── .github/workflows/
│   └── deploy.yml             # GitHub Pages build and deployment workflow
├── package.json               # Monorepo build scripts
└── pnpm-workspace.yaml        # pnpm workspace configuration
```


## Prerequisites

- Node.js 20 or newer
- pnpm 9 or newer

## Local Development

Clone the repository:

```bash
git clone https://github.com/EliteIcons/EliteIcons.github.io.git
cd EliteIcons.github.io
```

Install dependencies:

```bash
pnpm install
```

Generate the icon components and documentation metadata:

```bash
pnpm generate
```

Build the React package:

```bash
pnpm build:pkg
```

Build the documentation app:

```bash
pnpm build:docs
```

Build everything:

```bash
pnpm build
```

The complete build:

- Generates components from the SVG assets
- Builds `elite-icons-react` with CommonJS, ESM, and declaration outputs
- Builds the Vite documentation application

The built documentation site is written to `apps/docs/dist`.

To run the documentation app locally, build it once, then serve `apps/docs/dist` with any static file server.

## React Usage

### Install

Because this repository hosts the package in a pnpm workspace, it can be used directly by workspace applications:

```json
{
  "dependencies": {
    "elite-icons-react": "workspace:*"
  }
}
```

### Import an Icon

```tsx
import { ArrowRight } from 'elite-icons-react';

export function Example() {
  return (
    <ArrowRight
      size={32}
      color="#ccff00"
      strokeWidth={2}
    />
  );
}
```

Component props are based on SVG rendering options:

| Prop | Description | Example |
| --- | --- | --- |
| `size` | Icon width and height | `32` |
| `color` | Stroke color | `"#ccff00"` |
| `strokeWidth` | SVG stroke width | `2` |

## Using the Icon Studio

Visit [https://EliteIcons.github.io/](https://EliteIcons.github.io/) to:

- Search icons by name
- Change icon color, size, and stroke width
- Copy SVG markup or React JSX
- Download an individual SVG
- Share the current settings through the URL

Useful controls:

- `Ctrl + K` or `Cmd + K` focuses the icon search
- `Escape` closes the icon inspector
- `RESET` restores the default studio settings
- `SVG` quickly copies an icon's SVG markup

## Adding an Icon

1. Add a valid SVG file to the `icons/` directory.
2. Use a descriptive filename. Spaces, hyphens, and apostrophes are normalized during generation.
3. Run the generator:

```bash
pnpm generate
```

4. Rebuild the package and documentation app:

```bash
pnpm build
```

The generator removes dimensions and optimizes SVG markup for consistent rendering.

Example:

```text
icons/cloud-download.svg
```

The file becomes a generated component using the PascalCase naming convention:

```tsx
import { CloudDownload } from 'elite-icons-react';
```

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm generate` | Generates React components and icon metadata from `icons/` |
| `pnpm build:pkg` | Builds the `elite-icons-react` package |
| `pnpm build:docs` | Builds the documentation and icon studio app |
| `pnpm build` | Runs icon generation and builds both package and docs |

## Deployment

Deployment is handled by `.github/workflows/deploy.yml`.

Pushing to `main` or manually running the workflow triggers:

1. Repository checkout
2. pnpm 9 setup
3. Node.js 20 setup
4. Dependency installation
5. Icon generation and package builds
6. Documentation app build
7. Upload of `apps/docs/dist`
8. Deployment to GitHub Pages

## Contributing

Contributions are welcome.

Before submitting a change:

- Keep source SVG files in `icons/`
- Run `pnpm generate` after adding or changing icons
- Build the full project with `pnpm build`
- Verify that the icon renders in the documentation app
- Do not commit unnecessary generated changes unless the icon build requires them

Please open an issue or submit a pull request with a clear description of the proposed change.

## License

This Project is licensed under the **ISC License**, Please view it! 🎉
