import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: '7m9xnr6m',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk3zEqdBTdKf0BfHVZ72C02qSYfw9VBn0exWDtULOILms1UlrK9OErrYfTqUYH0Yqhz1GgumILPcA1pLQ',
  useCdn: false,
})

const services = [
  {
    title: 'Creative Direction',
    imageFile: 'deliverables-3.png',
    description:
      'Setting the visual tone for campaigns, shoots, and brand worlds. From initial concept through final execution — this is where a scattered idea becomes a cohesive visual language.',
    deliverables: ['Creative Brief', 'Mood Boards', 'Art Direction', 'Campaign Visuals'],
    order: 1,
  },
  {
    title: 'Brand Discovery',
    imageFile: 'deliverables-1.png',
    description:
      'Building visual systems that communicate who you are before you say a word. Logo, colour, type, and the rules that hold it all together across every touchpoint.',
    deliverables: ['Logo Suite', 'Colour System', 'Typography', 'Brand Guidelines'],
    order: 2,
  },
  {
    title: 'Photography',
    imageFile: 'deliverables-4.png',
    description:
      'Editorial and commercial photography that goes beyond documentation. Sharp, cinematic images built to stop the scroll and hold attention long after.',
    deliverables: ['Art-Directed Shoot', 'Edited Selects', 'Licensing', 'Usage Rights'],
    order: 3,
  },
  {
    title: 'Web Design & Dev',
    imageFile: 'deliverables-2.png',
    description:
      'Design and direction for websites, campaigns, and interactive touchpoints — where brand identity becomes something people move through and remember.',
    deliverables: ['UX/UI Design', 'Prototypes', 'Design System', 'Dev Handoff'],
    order: 4,
  },
]

async function uploadImage(filename) {
  const filePath = path.join(__dirname, '../public', filename)
  console.log(`Uploading ${filename}...`)
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename,
  })
  console.log(`  ✓ Uploaded as ${asset._id}`)
  return asset
}

async function run() {
  for (const service of services) {
    const asset = await uploadImage(service.imageFile)
    const doc = {
      _type: 'service',
      title: service.title,
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
      description: service.description,
      deliverables: service.deliverables,
      order: service.order,
    }
    const created = await client.create(doc)
    await client.patch(created._id).set({}).commit()
    // Publish immediately
    const publishedId = created._id.replace('drafts.', '')
    await client
      .transaction()
      .createOrReplace({ ...doc, _id: publishedId })
      .commit()
    console.log(`  ✓ Created & published: ${service.title}`)
  }
  console.log('\nAll 4 services seeded successfully.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
