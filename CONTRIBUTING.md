# Contributing to EliteIcons

EliteIcons is an open-source, community-maintained icon library. Anyone can propose or submit new SVG icons!

## How to Submit a New Icon

1. **Design or Draw Your Icon:**
   - You can create your icon directly in the browser using **[Elite Icon Studio](https://eliteicons.github.io/Icon-Studio)** or in Figma/Inkscape.
2. **Follow the 24×24 Grid Rules:**
   - **ViewBox:** `0 0 24 24`
   - **Padding:** Leave a `2px` safe margin around the outer edges.
   - **Stroke:** `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`.
   - **Color:** Use `stroke="currentColor"` (no hardcoded hex colors).
   - **Clean Markup:** Remove `<defs>`, `<style>`, `<g>` transforms, and editor metadata.
3. **Add Your File:**
   - Place your `.svg` file inside the `icons/` folder using lowercase `kebab-case` naming (e.g., `arrow-up-right.svg`).
4. **Open a Pull Request:**
   - Once merged into `main`, GitHub Actions automatically compiles the React component, publishes the package, and updates the live gallery! (Not yet! )
