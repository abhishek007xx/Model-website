import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/portfolio';

const jobs = [
  {
    name: 'gallery-10.jpg',
    size: '864x1152',
    prompt:
      'Editorial fashion portrait, elegant model in camel wool coat against warm terracotta wall, soft Mediterranean afternoon light, timeless sophisticated aesthetic, muted earth tones, magazine quality photography',
  },
  {
    name: 'gallery-11.jpg',
    size: '1024x1024',
    prompt:
      'Artistic detail fashion photograph, elegant hand with delicate jewelry draped in silk fabric, warm directional light, luxury still life aesthetic, soft shadows, sophisticated and minimal, high quality',
  },
  {
    name: 'gallery-12.jpg',
    size: '768x1344',
    prompt:
      'Silhouette fashion editorial, elegant profile of model against large window with bright diffused light, sheer curtain, dreamy atmospheric mood, black and white fine art photography, timeless and poetic, high quality',
  },
];

async function main() {
  const zai = await ZAI.create();
  for (const job of jobs) {
    const outPath = path.join(OUT_DIR, job.name);
    if (fs.existsSync(outPath)) {
      console.log(`skip ${job.name}`);
      continue;
    }
    try {
      console.log(`Generating ${job.name}...`);
      const res = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size as any,
      });
      const buf = Buffer.from(res.data[0].base64, 'base64');
      fs.writeFileSync(outPath, buf);
      console.log(`  -> saved ${outPath}`);
    } catch (e: any) {
      console.error(`  !! failed ${job.name}: ${e?.message || e}`);
    }
  }
  console.log('DONE');
}

main();
