import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/portfolio';

const jobs = [
  {
    name: 'gallery-13.jpg',
    size: '768x1344',
    prompt:
      'High fashion editorial portrait, elegant model in dramatic sculptural black gown, side profile against deep charcoal backdrop, single beam of warm light, couture atmosphere, sophisticated and timeless, cinematic film still aesthetic, high quality professional photography',
  },
  {
    name: 'gallery-14.jpg',
    size: '1344x768',
    prompt:
      'Wide cinematic fashion editorial, elegant model walking through grand empty corridor with arched windows, flowing white dress catching warm afternoon light, architectural elegance, Wes Anderson symmetry meets Vogue editorial, sophisticated and serene, high quality',
  },
  {
    name: 'gallery-15.jpg',
    size: '1024x1024',
    prompt:
      'Intimate fashion beauty portrait, elegant model with eyes closed, hand resting on shoulder, soft warm directional light, delicate film grain, luxury skincare campaign aesthetic, muted warm palette, fine art editorial photography, high quality',
  },
  {
    name: 'gallery-16.jpg',
    size: '864x1152',
    prompt:
      'Editorial fashion portrait, elegant model in oversized camel coat on rain-slicked city street at dusk, warm streetlamp glow, cinematic mood, reflective pavement, timeless sophisticated aesthetic, muted earth tones, magazine quality photography',
  },
  {
    name: 'gallery-17.jpg',
    size: '1024x1024',
    prompt:
      'Artistic detail fashion photograph, elegant draped fabric in motion, silk and chiffon swirling, warm backlight catching the edges, abstract beauty, luxury textile campaign aesthetic, soft shadows, sophisticated and minimal, high quality',
  },
  {
    name: 'gallery-18.jpg',
    size: '768x1344',
    prompt:
      'High fashion editorial, elegant model seated on vintage chair in warm sunlit room, sheer curtain casting soft shadows, flowing neutral-toned outfit, Mediterranean afternoon light, timeless editorial aesthetic, sophisticated and poetic, high quality photography',
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
      console.log(`Generating ${job.name} (${job.size})...`);
      const res = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size as any,
      });
      const buf = Buffer.from(res.data[0].base64, 'base64');
      fs.writeFileSync(outPath, buf);
      console.log(`  -> saved ${outPath} (${(buf.length / 1024).toFixed(1)} KB)`);
    } catch (e: any) {
      console.error(`  !! failed ${job.name}: ${e?.message || e}`);
    }
  }
  console.log('DONE');
}

main();
