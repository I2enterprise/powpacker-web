import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

export const BUILDING_PROJECTS = [
  { asset: '01-cholasa-place.webp', location: 'SAMET · CHONBURI', heading: 'ชลษาเพลส / Cholasa Place', description: 'Electrical System & Sanitary System' },
  { asset: '02-revenue-department.webp', location: 'NONTHABURI', heading: 'สำนักงานสรรพากร / Revenue Department', description: 'Electrical System' },
  { asset: '03-baac-khok-samrong.webp', location: 'KHOK SAMRONG · LOPBURI', heading: 'ธกส. สาขาโคกสำโรง', description: 'Civil, Mechanical & Electrical System' },
  { asset: '04-baac-pho-thale.webp', location: 'PHO THALE · PHICHIT', heading: 'ธกส. สาขาโพทะเล', description: 'Civil, Mechanical & Electrical System' },
  { asset: '05-baac-nong-chang.webp', location: 'NONG CHANG · UTHAI THANI', heading: 'ธกส. สาขาหนองฉาง', description: 'Civil, Mechanical & Electrical System' },
  { asset: '06-nakhon-sawan-product-design-building.webp', location: 'NAKHON SAWAN', heading: 'อาคารเรียนและปฏิบัติการออกแบบผลิตภัณฑ์ มหาวิทยาลัยราชภัฏนครสวรรค์', description: 'Civil, Mechanical & Electrical System' },
  { asset: '07-nakhon-sawan-innovation-center.webp', location: 'NAKHON SAWAN', heading: 'ศูนย์ถ่ายทอดเทคโนโลยีและนวัตกรรม มหาวิทยาลัยราชภัฏนครสวรรค์', description: 'Civil, Mechanical & Electrical System' },
  { asset: '08-new-canteen-building.webp', location: 'SIAM EASTERN INDUSTRIAL PARK · RAYONG', heading: 'New Canteen Building Project', description: 'Civil, Mechanical & Electrical System' },
  { asset: '09-national-sports-training-center.webp', location: 'MUAK LEK · SARABURI', heading: 'ศูนย์ฝึกกีฬาแห่งชาติ / National Sports Training Center', description: 'Civil, Mechanical & Electrical System' },
  { asset: '10-tcg-headquarters-renovation.webp', location: 'CHARN ISSARA TOWER 2 · BANGKOK', heading: 'ปรับปรุงสำนักงานใหญ่ บสย. / TCG Headquarters Renovation', description: 'Structure & Architecture Work, M&E Work, Access Control & CCTV' },
  { asset: '11-state-audit-office-buriram.webp', location: 'BURIRAM', heading: 'อาคารที่ทำการและอาคารชุดพักอาศัย สตง.บุรีรัมย์', description: 'Structure & Architecture Work & M&E Work' },
  { asset: '12-state-audit-office-bueng-kan.webp', location: 'BUENG KAN', heading: 'อาคารที่ทำการและอาคารชุดพักอาศัย สตง.บึงกาฬ', description: 'Structure & Architecture Work & M&E Work' },
];

export const BUILDING_SOURCE_TO_ASSET = [
  { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20001.jpg', asset: '01-cholasa-place.webp' },
  { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20002.jpg', asset: '02-revenue-department.webp' },
  { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20003.jpg', asset: '03-baac-khok-samrong.webp' },
  { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20004.jpg', asset: '04-baac-pho-thale.webp' },
  { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20005.jpg', asset: '05-baac-nong-chang.webp' },
  { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20006.jpg', asset: '06-nakhon-sawan-product-design-building.webp' },
  { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20007.jpg', asset: '07-nakhon-sawan-innovation-center.webp' },
  { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20008.jpg', asset: '08-new-canteen-building.webp' },
  { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20009.jpg', asset: '09-national-sports-training-center.webp' },
  { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20010.jpg', asset: '10-tcg-headquarters-renovation.webp' },
  { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20011.jpg', asset: '11-state-audit-office-buriram.webp' },
  { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20012.jpg', asset: '12-state-audit-office-bueng-kan.webp' },
];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = path.join(root, 'assets', 'projects', 'building');

function webpDimensions(bytes) {
  const chunk = bytes.subarray(12, 16).toString('ascii');
  assert.ok(['VP8 ', 'VP8L', 'VP8X'].includes(chunk), `unsupported WebP chunk ${chunk}`);

  if (chunk === 'VP8 ') {
    assert.equal(bytes.subarray(23, 26).toString('hex'), '9d012a', 'VP8 frame must contain a key-frame signature');
    return {
      width: bytes.readUInt16LE(26) & 0x3fff,
      height: bytes.readUInt16LE(28) & 0x3fff,
    };
  }

  if (chunk === 'VP8L') {
    const bits = bytes.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
  }

  return { width: 1 + bytes.readUIntLE(24, 3), height: 1 + bytes.readUIntLE(27, 3) };
}

test('all 12 approved Building WebP assets are 650 by 371 and unique', async () => {
  assert.equal(BUILDING_PROJECTS.length, 12);
  assert.equal(new Set(BUILDING_PROJECTS.map(({ asset }) => asset)).size, 12);
  assert.deepEqual(
    BUILDING_SOURCE_TO_ASSET,
    [
      { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20001.jpg', asset: '01-cholasa-place.webp' },
      { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20002.jpg', asset: '02-revenue-department.webp' },
      { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20003.jpg', asset: '03-baac-khok-samrong.webp' },
      { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20004.jpg', asset: '04-baac-pho-thale.webp' },
      { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20005.jpg', asset: '05-baac-nong-chang.webp' },
      { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20006.jpg', asset: '06-nakhon-sawan-product-design-building.webp' },
      { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20007.jpg', asset: '07-nakhon-sawan-innovation-center.webp' },
      { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20008.jpg', asset: '08-new-canteen-building.webp' },
      { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20009.jpg', asset: '09-national-sports-training-center.webp' },
      { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20010.jpg', asset: '10-tcg-headquarters-renovation.webp' },
      { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20011.jpg', asset: '11-state-audit-office-buriram.webp' },
      { sourceUrl: 'http://www.pacdd.com/images/pulldown_1658723202/buil%20012.jpg', asset: '12-state-audit-office-bueng-kan.webp' },
    ],
    'Building source URLs must map sequentially to their approved local assets',
  );
  assert.deepEqual(
    BUILDING_SOURCE_TO_ASSET.map(({ asset }) => asset),
    BUILDING_PROJECTS.map(({ asset }) => asset),
    'Building source mapping must cover every project asset in source order',
  );

  const hashes = [];
  for (const { asset } of BUILDING_PROJECTS) {
    const assetPath = path.join(projectsDir, asset);
    const [info, bytes] = await Promise.all([stat(assetPath), readFile(assetPath)]);

    assert.ok(info.size > 1024, `${asset} must be over 1 KB`);
    assert.ok(info.size < 1_500_000, `${asset} must be below 1.5 MB`);
    assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF', `${asset} must start with RIFF`);
    assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP', `${asset} must have WEBP magic bytes`);
    assert.deepEqual(webpDimensions(bytes), { width: 650, height: 371 }, `${asset} dimensions must be 650 by 371`);
    hashes.push(createHash('sha256').update(bytes).digest('hex'));
  }

  assert.equal(new Set(hashes).size, 12, 'Building assets must have unique SHA-256 hashes');
});

test('Building page contains the approved hero and 12 local source-ordered cards', async () => {
  const page = await readFile(path.join(root, 'projects-building.html'), 'utf8');
  const hero = page.match(/<section class="page-hero" style="--page-image:url\('([^']+)'\)">/);
  const cards = [...page.matchAll(/<article class="portfolio-card reveal"><div class="thumb" style="--thumb:url\('assets\/projects\/building\/([^']+)'\)"><\/div><div class="body"><small>([^<]+)<\/small><h3>([^<]+)<\/h3><p>([^<]+)<\/p><\/div><\/article>/g)]
    .map(([, asset, location, heading, description]) => ({
      asset,
      location,
      heading: heading.replaceAll('&amp;', '&'),
      description: description.replaceAll('&amp;', '&'),
    }));

  assert.equal(hero?.[1], 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85');
  assert.equal([...page.matchAll(/<article class="portfolio-card reveal">/g)].length, 12);
  assert.deepEqual(cards, BUILDING_PROJECTS);
  assert.doesNotMatch(page, /https?:\/\/(?:www\.)?pacdd\.com\b/i);
  assert.doesNotMatch(page, /https?:\/\/(?:www\.)?powpacker\.(?:com|co\.th)\b/i);
  assert.doesNotMatch(page, /(?:\b(?:THB|USD)\s*\d|\b\d[\d,]*(?:\.\d+)?\s*(?:THB|บาท)\b)/i);
});
