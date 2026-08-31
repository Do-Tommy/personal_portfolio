import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const outPath = path.join(root, 'public', 'metaImage.png')
const photoPath = path.join(root, 'public', 'DSC00639.jpg')

const width = 1200
const height = 630
const photoLeft = 470
const textPanelWidth = 540
const panelBg = { r: 10, g: 18, b: 16, alpha: 1 }

const background = await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: panelBg,
  },
})
  .png()
  .toBuffer()

const source = await sharp(photoPath).metadata()
const subjectCropWidth = Math.round(source.width * 0.68)
const subjectCropTop = Math.round(source.height * 0.02)
const subjectCropHeight = Math.round(source.height * 0.96)

const subject = await sharp(photoPath)
  .extract({
    left: 0,
    top: subjectCropTop,
    width: subjectCropWidth,
    height: subjectCropHeight,
  })
  .resize({ height })
  .modulate({ brightness: 1.04, saturation: 1.02 })
  .png()
  .toBuffer()

const overlay = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a1210" stop-opacity="1"/>
      <stop offset="58%" stop-color="#0a1210" stop-opacity="0.96"/>
      <stop offset="78%" stop-color="#0a1210" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0a1210" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="glow" cx="22%" cy="16%" r="38%">
      <stop offset="0%" stop-color="#5eead4" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#5eead4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${textPanelWidth}" height="${height}" fill="url(#fade)"/>
  <text x="72" y="118" fill="#5eead4" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="8">TOMMY DO</text>
  <text x="72" y="210" fill="#ebf6fa" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="500">Network Engineer</text>
  <text x="72" y="292" fill="#d7ecef" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="400">Bare metal, routing, observability,</text>
  <text x="72" y="332" fill="#d7ecef" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="400">and automation.</text>
  <rect x="72" y="372" width="132" height="3" fill="#5eead4" opacity="0.85"/>
  <text x="72" y="418" fill="#9eb4b8" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="500">tommydo.dev</text>
</svg>`)

await sharp(background)
  .composite([
    { input: subject, left: photoLeft, top: 0 },
    { input: overlay, left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(outPath)

const stats = await fs.stat(outPath)
const subjectMeta = await sharp(subject).metadata()
console.log(`Wrote ${outPath} (${stats.size} bytes, photo ${subjectMeta.width}x${subjectMeta.height})`)
