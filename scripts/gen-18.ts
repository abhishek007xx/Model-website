import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/portfolio';

async function main() {
  const outPath = path.join(OUT_DIR, 'gallery-18.jpg');
  if (fs.existsSync(outPath)) {
    console.log('skip');
    return;
  }
  const zai = await ZAI.create();
  console.log('Generating gallery-18.jpg...');
  const res = await zai.images.generations.create({
    prompt:
      'High fashion editorial, elegant model seated on vintage chair in warm sunlit room, sheer curtain casting soft shadows, flowing neutral-toned outfit, Mediterranean afternoon light, timeless editorial aesthetic, sophisticated and poetic, high quality photography',
    size: '768x1344' as any,
  });
  const buf = Buffer.from(res.data[0].base64, 'base64');
  fs.writeFileSync(outPath, buf);
  console.log(`  -> saved ${outPath}`);
}

main();
