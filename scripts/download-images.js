/**
 * Download CC-licensed images from Wikimedia Commons for Geiranger hiking trails.
 * Uses Node.js https module with proper User-Agent header (required by Wikimedia).
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'geiranger');

const IMAGES = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Geiranger_fjord%2C_small_waterfall_on_the_stairs_of_the_rock_wall.jpg',
    filename: 'fossevandring_stairs.jpg',
    description: 'Geiranger waterfall stairs on the rock wall',
    license: 'Public domain',
    author: 'Szilas',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Skagefl%C3%A5_Farm_on_the_Cliff_-_2013.08.jpg',
    filename: 'skagefla_farm.jpg',
    description: 'Skageflå Farm on the Cliff above Geirangerfjord',
    license: 'CC BY 3.0',
    author: 'rheins',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/00_3584_The_Seven_Sisters_-_Geirangerfjord.jpg',
    filename: 'seven_sisters_waterfall.jpg',
    description: 'The Seven Sisters waterfall, Geirangerfjord',
    license: 'CC BY-SA 4.0',
    author: 'W. Bulach',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Geirangerfjord_View_from_L%C3%B8sta.JPG',
    filename: 'geirangerfjord_view_losta.jpg',
    description: 'View on the Geirangerfjord from Løsta',
    license: 'CC0',
    author: 'Bloodworx',
  },
];

function download(imageUrl, destPath, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      return reject(new Error('Too many redirects'));
    }

    const parsedUrl = new URL(imageUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'NorgetravelBot/1.0 (hello@norgetravel.com; downloading CC-licensed images for editorial use)',
        'Accept': 'image/jpeg,image/png,image/*,*/*',
      },
    };

    const req = protocol.request(options, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : `${parsedUrl.protocol}//${parsedUrl.hostname}${res.headers.location}`;
        console.log(`  Redirect ${res.statusCode} -> ${redirectUrl}`);
        res.resume(); // consume response
        return download(redirectUrl, destPath, maxRedirects - 1).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${imageUrl}`));
      }

      const contentType = res.headers['content-type'] || '';
      const contentLength = res.headers['content-length'] || 'unknown';
      console.log(`  Status: 200, Content-Type: ${contentType}, Size: ${contentLength}`);

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        const stats = fs.statSync(destPath);
        if (stats.size < 10240) {
          fs.unlinkSync(destPath);
          reject(new Error(`File too small (${stats.size} bytes) - likely an error page, removed.`));
        } else {
          resolve(stats.size);
        }
      });

      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    });

    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });

    req.end();
  });
}

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Downloading ${IMAGES.length} images to ${OUTPUT_DIR}\n`);

  const results = [];

  for (const img of IMAGES) {
    const destPath = path.join(OUTPUT_DIR, img.filename);
    console.log(`Downloading: ${img.filename}`);
    console.log(`  Source: ${img.url}`);
    console.log(`  License: ${img.license} | Author: ${img.author}`);

    try {
      const size = await download(img.url, destPath);
      const sizeMB = (size / 1024 / 1024).toFixed(2);
      console.log(`  SUCCESS: ${sizeMB} MB saved to ${img.filename}\n`);
      results.push({ ...img, status: 'ok', size });
    } catch (err) {
      console.log(`  FAILED: ${err.message}\n`);
      results.push({ ...img, status: 'failed', error: err.message });
    }
  }

  // Summary
  console.log('=== DOWNLOAD SUMMARY ===');
  const ok = results.filter(r => r.status === 'ok');
  const failed = results.filter(r => r.status === 'failed');
  console.log(`Success: ${ok.length}/${results.length}`);
  if (failed.length > 0) {
    console.log('Failed:');
    failed.forEach(f => console.log(`  - ${f.filename}: ${f.error}`));
  }

  // Write attribution file
  if (ok.length > 0) {
    const attrLines = ok.map(img =>
      `${img.filename}\n  Description: ${img.description}\n  License: ${img.license}\n  Author: ${img.author}\n  Source: ${img.url}\n`
    );
    const attrPath = path.join(OUTPUT_DIR, 'ATTRIBUTION_hiking.txt');
    fs.writeFileSync(attrPath, `Geiranger Hiking Trail Images - Attribution\nDownloaded: ${new Date().toISOString()}\n\n${attrLines.join('\n')}`);
    console.log(`\nAttribution file written to ATTRIBUTION_hiking.txt`);
  }
}

main().catch(console.error);
