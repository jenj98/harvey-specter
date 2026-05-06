import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: '7m9xnr6m',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk3zEqdBTdKf0BfHVZ72C02qSYfw9VBn0exWDtULOILms1UlrK9OErrYfTqUYH0Yqhz1GgumILPcA1pLQ',
  useCdn: false,
})

const articles = [
  {
    _id: 'news-article-1',
    title: 'The Visual Grammar of a Brand',
    category: 'Feature',
    date: 'April 2025',
    body: 'What separates a logo from an identity? H.Studio breaks down the invisible rules that make great brands instantly recognisable — and why most get it wrong from the start.',
    imageFile: 'news-1.webp',
    order: 1,
  },
  {
    _id: 'news-article-2',
    title: 'Shooting with Intent',
    category: 'Process',
    date: 'February 2025',
    body: 'Every frame is a decision. A behind-the-scenes look at how art direction shapes commercial photography and why the brief matters as much as the shutter.',
    imageFile: 'news-2.webp',
    order: 2,
  },
  {
    _id: 'news-article-3',
    title: 'Why Less is Still More',
    category: 'Perspective',
    date: 'December 2024',
    body: 'In a landscape of maximum stimulation, restraint has become the rarest creative skill. A case for considered work in an age of endless output.',
    imageFile: 'news-3.webp',
    order: 3,
  },
]

async function seed() {
  const tx = client.transaction()

  for (const article of articles) {
    const imagePath = resolve(__dirname, '../public', article.imageFile)
    console.log(`Uploading ${article.imageFile}…`)
    const asset = await client.assets.upload('image', createReadStream(imagePath), {
      filename: article.imageFile,
    })

    tx.createOrReplace({
      _id: article._id,
      _type: 'newsArticle',
      title: article.title,
      category: article.category,
      date: article.date,
      body: article.body,
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        hotspot: { x: 0.5, y: 0.5, height: 0.5, width: 0.5 },
        alt: article.title,
      },
      order: article.order,
    })
  }

  await tx.commit()
  console.log('✓ News articles created')

  // Publish all drafts
  for (const article of articles) {
    try {
      await client.request({
        url: `/v2024-01-01/actions`,
        method: 'POST',
        body: {
          actions: [{ actionType: 'sanity.action.document.publish', draftId: `drafts.${article._id}`, publishedId: article._id }],
        },
      })
    } catch { /* already published */ }
  }
  console.log('✓ News articles published')
}

seed().catch((err) => { console.error(err); process.exit(1) })
