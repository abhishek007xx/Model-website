import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/portfolio';

const jobs = [
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
    const outPath = path.join(OUT_DIR, job.name);
    if (fs.existsSync(outPath)) {
      console.log(`skip existing ${job.name}`);
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
  console.log('Done.');
}

main();
