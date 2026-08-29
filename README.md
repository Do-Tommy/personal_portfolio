# Tommy Do — Personal Portfolio

Next.js + Tailwind portfolio with ThreeUI Community motion.

## Run locally

```bash
npm install
# Copy ThreeUI iframe assets if missing:
cp node_modules/@designcodeio/threeui/lib-dist/assets/synthralos-halftone.html public/
cp node_modules/@designcodeio/threeui/lib-dist/assets/spark-badge.html public/
npm run build
npx next start -H 0.0.0.0 -p 3000
```

## Contact form (optional)

Create a Formspree form, then in `.env.local`:

```
NEXT_PUBLIC_FORM=your_form_id
```

Without that, the contact page uses a mailto link.

## Skills used

- `~/.cursor/skills/web-ui-animations`
- `~/.cursor/skills/tommydo-portfolio-content`
