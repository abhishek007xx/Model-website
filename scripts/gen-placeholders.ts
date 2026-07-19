import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/portfolio';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

type Job = { name: string; prompt: string; size: string };

const jobs: Job[] = [
  {
    name: 'hero.jpg',
    size: '768x1344',
    prompt:
      'High fashion editorial photograph, elegant female fashion model wearing a flowing cream silk dress, standing in dramatic studio lighting with soft shadows, minimalist beige background, sophisticated Vogue magazine cover style, full body elegant pose, warm neutral tones, cinematic, high quality, professional fashion photography',
  },
  {
    name: 'about.jpg',
    size: '864x1152',
    prompt:
      'Artistic black and white fashion portrait, elegant woman with graceful profile, soft natural window light, fine art editorial photography, timeless monochrome, subtle film grain, high fashion magazine style, sophisticated and minimal, high quality',
  },
  {
    name: 'gallery-1.jpg',
    size: '768x1344',
    prompt:
      'High fashion editorial portrait, elegant model in a tailored beige trench coat, soft warm studio lighting, minimalist aesthetic, sophisticated poses, neutral cream background, Vogue editorial style, cinematic, high quality fashion photography',
  },
  {
    name: 'gallery-2.jpg',
    size: '1024x1024',
    prompt:
      'Beauty close-up fashion editorial, elegant model with flawless makeup, soft glamorous lighting, warm neutral tones, luxury cosmetics campaign aesthetic, sophisticated and minimal, high quality professional photography',
  },
  {
    name: 'gallery-3.jpg',
    size: '768x1344',
    prompt:
      'High fashion runway editorial, elegant model walking in flowing evening gown, dramatic spotlight, dark elegant background, couture fashion show atmosphere, sophisticated and cinematic, high quality fashion photography',
  },
  {
    name: 'gallery-4.jpg',
    size: '864x1152',
    prompt:
      'Minimalist fashion editorial, elegant model in white linen outfit, soft diffused daylight, clean architectural background, Scandinavian aesthetic, warm neutral palette, sophisticated and serene, high quality photography',
  },
  {
    name: 'gallery-5.jpg',
    size: '1024x1024',
    prompt:
      'Artistic fashion editorial, elegant silhouette of model against warm sunset light, golden hour glow, flowing fabric, dreamy atmospheric mood, sophisticated fashion photography, high quality',
  },
  {
    name: 'gallery-6.jpg',
    size: '768x1344',
    prompt:
      'High fashion editorial, elegant model in elegant black evening wear, dramatic chiaroscuro lighting, luxury atmosphere, sophisticated pose, timeless elegance, magazine cover style, high quality professional photography',
  },
];

async function main() {
  const zai = await ZAI.create();
  for (const job of jobs) {
    try {
      console.log(`Generating ${job.name} (${job.size})...`);
      const res = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size as any,
      });
      const b64 = res.data[0].base64;
      const buf = Buffer.from(b64, 'base64');
      const outPath = path.join(OUT_DIR, job.name);
      fs.writeFileSync(outPath, buf);
      console.log(`  -> saved ${outPath} (${(buf.length / 1024).toFixed(1)} KB)`);
    } catch (e: any) {
      console.error(`  !! failed ${job.name}: ${e?.message || e}`);
    }
  }
  console.log('Done.');
}

main();
