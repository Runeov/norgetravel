import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    'src',
    'components',
    'modules',
    'kunnskapsbank',
    'vipps-wizard',
    'ExampleOfJson.html'
  );

  const html = await readFile(filePath, 'utf8');

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      // Demo page – ensure we always serve the latest version.
      'cache-control': 'no-store'
    }
  });
}

