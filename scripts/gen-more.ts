import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/portfolio';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const jobs = [
  {
    name: 'gallery-7.jpg',
    size: '1344x768',
    prompt:
      'Cinematic wide editorial fashion photograph, elegant model reclining in flowing neutral-toned couture, vast minimalist studio with soft atmospheric haze, warm golden side light, film still aesthetic, anamorphic, sophisticated and serene, high quality fashion photography',
  },
  {
    name: 'gallery-8.jpg',
    size: '1024x1024',
    prompt:
      'Intimate beauty close-up editorial, elegant model with hand near face, soft warm window light, delicate shadows, luxury skincare campaign aesthetic, warm neutral palette, fine art photography, high quality',
  },
  {
    name: 'gallery-9.jpg',
    size: '768x1344',
    prompt:
      'High fashion runway moment, elegant model mid-stride in sculptural avant-garde gown, dramatic spotlight beam, dark moody background, motion in fabric, cinematic fashion show atmosphere, high quality professional photography',
  },
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
  const log = (m: string) => {
    console.log(m);
    fs.appendFileSync('/home/z/my-project/scripts/gen-more.log', m + '\n');
  };
  const zai = await ZAI.create();
  for (const job of jobs) {
    const outPath = path.join(OUT_DIR, job.name);
    if (fs.existsSync(outPath)) {
      log(`skip existing ${job.name}`);
      continue;
    }
    try {
      log(`Generating ${job.name} (${job.size})...`);
      const res = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size as any,
      });
      const buf = Buffer.from(res.data[0].base64, 'base64');
      fs.writeFileSync(outPath, buf);
      log(`  -> saved ${outPath} (${(buf.length / 1024).toFixed(1)} KB)`);
    } catch (e: any) {
      log(`  !! failed ${job.name}: ${e?.message || e}`);
    }
  }
  log('DONE');
}

main();
