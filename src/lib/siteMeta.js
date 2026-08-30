const siteUrl = 'https://www.tommydo.dev'

export const siteMeta = {
  siteUrl,
  title: 'Tommy Do | Network Engineer',
  description:
    'Builds reliable networks and the software that operates them — bare metal, routing, observability, and automation.',
  ogImagePath: '/metaImage.png',
  ogImageAlt: 'Tommy Do — Network Engineer portfolio',
  locale: 'en_US',
  siteName: 'Tommy Do',
}

export function absoluteUrl(path) {
  return new URL(path, siteUrl).toString()
}
