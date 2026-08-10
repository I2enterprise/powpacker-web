import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const DATA_CENTER_ASSETS = [
  'true-idc.webp', 'irpc-data-center.webp',
  'backup-computer-center-1.webp', 'backup-computer-center-2.webp',
  'ghb-main-computer-center.webp', 'utapao-data-center.webp',
  'pea-disaster-recovery-center.webp', 'laem-chabang-emergency-center.webp',
  'advanced-computing-power-system.webp', 'pea-rack-pdu-cold-containment.webp',
  'sriracha-1000kva-generator.webp', 'symphony-backup-noc.webp',
  'osprey-data-center.webp', 'osprey-data-hall-fitout.webp',
  'ott-data-center.webp',
];

const DATA_CENTER_HEADINGS = [
  'True IDC (Internet Data Center)', 'IRPC Data Center',
  'อาคารศูนย์คอมพิวเตอร์สำรอง — ภาพที่ 1',
  'อาคารศูนย์คอมพิวเตอร์สำรอง — ภาพที่ 2',
  'อาคารศูนย์คอมพิวเตอร์หลัก ธนาคารอาคารสงเคราะห์',
  'อาคารศูนย์ข้อมูล การท่าอากาศยานอู่ตะเภา',
  'PEA Disaster Recovery Center (DRC)',
  'ศูนย์ป้องกันและบรรเทาสาธารณภัย ท่าเรือแหลมฉบัง',
  'ระบบไฟฟ้า ศูนย์ทรัพยากรคอมพิวเตอร์เพื่อการคำนวณขั้นสูง',
  'PEA Rack, PDU & Cold Containment',
  'เครื่องกำเนิดไฟฟ้า 1,000 KVA ศูนย์โทรคมนาคมศรีราชา',
  'Symphony Backup Network Operations Center',
  'Osprey Data Center — MEP Infrastructure',
  'Osprey Data Center — Data Hall Fit Out',
  'OTT Data Center — Package 2',
];

const DATA_CENTER_LOCATIONS = JSON.parse(Buffer.from(
  'WyJNVUFORyBUSE9ORyBUSEFOSSDigJMgTk9OVEhBQlVSSSIsIlJBWU9ORyIsIlNBTVVUIFBSQUtBTiIsIlNBTVVUIFBSQUtBTiIsIlJBTUEgOSDigJMgQkFOR0tPSyIsIlUtVEFQQU8g4oCTIFJBWU9ORyIsIlJBTkdTSVQg4oCTIFBBVEhVTSBUSEFOSSIsIkxBRU0gQ0hBQkFORyDigJMgQ0hPTkJVUkkiLCJLSExPTkcgTFVBTkcg4oCTIFBBVEhVTSBUSEFOSSIsIlJBTkdTSVQg4oCTIFBBVEhVTSBUSEFOSSIsIlNSSVJBQ0hBIOKAkyBDSE9OQlVSSSIsIkFNQVRBIE5BS09STiDigJMgQ0hPTkJVUkkiLCJOQVZBIE5BS09STiDigJMgUEFUSFVNIFRIQU5JIiwiTkFWQSBOQUtPUk4g4oCTIFBBVEhVTSBUSEFOSSIsIlNSSU5BS0FSSU4gOCDigJMgQkFOR0tPSyJd',
  'base64',
).toString('utf8'));

const DATA_CENTER_DESCRIPTIONS = JSON.parse(Buffer.from(
  'WyJFbGVjdHJpY2FsIFN5c3RlbSIsIkNpdmlsLCBNZWNoYW5pY2FsICYgRWxlY3RyaWNhbCBTeXN0ZW0iLCJDaXZpbCwgTWVjaGFuaWNhbCAmIEVsZWN0cmljYWwgU3lzdGVtIiwiQ2l2aWwsIE1lY2hhbmljYWwgJiBFbGVjdHJpY2FsIFN5c3RlbSIsIlN0cnVjdHVyZSBXb3JrICYgTSZFIFdvcmsiLCJTdHJ1Y3R1cmUsIEFyY2hpdGVjdHVyZSBXb3JrICYgTSZFIFdvcmsiLCJTdHJ1Y3R1cmUsIEFyY2hpdGVjdHVyZSBXb3JrICYgTSZFIFdvcmsiLCJTdHJ1Y3R1cmUsIEFyY2hpdGVjdHVyZSwgU0NBREEgRmlyZSBTeXN0ZW0gJiBDQ1RWIiwiRWxlY3RyaWNhbCBXb3JrIiwiRWxlY3RyaWNhbCBXb3JrIiwiRWxlY3RyaWNhbCBXb3JrIiwiU3RydWN0dXJlICYgQXJjaGl0ZWN0dXJlIFdvcmsiLCJNJkUgV29yayIsIk0mRSBXb3JrIiwiTSZFIFdvcmsiXQ==',
  'base64',
).toString('utf8'));

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = path.join(root, 'assets', 'projects');

test('all 15 approved Data Center WebP assets exist', async () => {
  for (const asset of DATA_CENTER_ASSETS) {
    const assetPath = path.join(projectsDir, asset);
    const [info, bytes] = await Promise.all([stat(assetPath), readFile(assetPath)]);

    assert.ok(info.size > 1024, `${asset} must be over 1024 bytes`);
    assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF', `${asset} must start with RIFF`);
    assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP', `${asset} must have WEBP magic bytes`);
  }
});

test('Data Center page contains 15 source-ordered cards', async () => {
  const page = await readFile(path.join(root, 'projects-data-center.html'), 'utf8');
  const cards = [...page.matchAll(/<article class="portfolio-card reveal">([\s\S]*?)<\/article>/g)];

  assert.equal(cards.length, 15);
  assert.deepEqual(cards.map(([, card]) => card.match(/<h3>([^<]+)<\/h3>/)?.[1]), DATA_CENTER_HEADINGS);
  assert.deepEqual(cards.map(([, card]) => card.match(/assets\/projects\/([^')]+)/)?.[1]), DATA_CENTER_ASSETS);
  assert.deepEqual(cards.map(([, card]) => card.match(/<small>([^<]+)<\/small>/)?.[1]), DATA_CENTER_LOCATIONS);
  assert.deepEqual(cards.map(([, card]) => card.match(/<p>([^<]+)<\/p>/)?.[1]), DATA_CENTER_DESCRIPTIONS);
});

test('All Projects contains 15 Data Center, 30 Factory, Solar, then Sports cards', async () => {
  const page = await readFile(path.join(root, 'projects.html'), 'utf8');
  const cards = [...page.matchAll(/<article class="portfolio-card reveal">([\s\S]*?)<\/article>/g)];

  assert.equal(cards.length, 47);
  assert.deepEqual(cards.slice(0, 15).map(([, card]) => card.match(/<h3>([^<]+)<\/h3>/)?.[1]), DATA_CENTER_HEADINGS);
  assert.deepEqual(cards.slice(0, 15).map(([, card]) => card.match(/assets\/projects\/([^')]+)/)?.[1]), DATA_CENTER_ASSETS);
  assert.deepEqual(cards.slice(0, 15).map(([, card]) => card.match(/<small>([^<]+)<\/small>/)?.[1]), DATA_CENTER_LOCATIONS);
  assert.deepEqual(cards.slice(0, 15).map(([, card]) => card.match(/<p>([^<]+)<\/p>/)?.[1]), DATA_CENTER_DESCRIPTIONS);
  assert.equal(cards.slice(15, 45).length, 30);
  assert.deepEqual(cards.slice(45).map(([, card]) => ({
    asset: card.match(/--thumb:url\('([^']+)'\)/)?.[1],
    location: card.match(/<small>([^<]+)<\/small>/)?.[1],
    heading: card.match(/<h3>([^<]+)<\/h3>/)?.[1],
    description: card.match(/<p>([^<]+)<\/p>/)?.[1],
  })), [
    {
      asset: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=85',
      location: 'ENERGY · THAILAND',
      heading: 'PTT Khao Tao Solar',
      description: 'ระบบประหยัดพลังงานและ Dashboard แสดงผลแบบ Real-time',
    },
    {
      asset: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=800&q=85',
      location: 'SATELLITE · NATIONWIDE',
      heading: 'National Sports Training Center',
      description: 'โครงสร้างพื้นฐานการสื่อสารสำหรับพื้นที่ห่างไกลทั่วประเทศ',
    },
  ]);
});

test('Home remains three featured projects', async () => {
  const [home, styles] = await Promise.all([
    readFile(path.join(root, 'index.html'), 'utf8'),
    readFile(path.join(root, 'styles.css'), 'utf8'),
  ]);

  assert.equal([...home.matchAll(/<article class="project(?: project-large)? reveal">/g)].length, 3);
  assert.match(styles, /\.p1\{height:510px;background-image:url\('assets\/projects\/osprey-data-center\.webp'\)\}/);
  assert.match(styles, /\.p2\{background-image:url\('assets\/projects\/ott-data-center\.webp'\)\}/);
  assert.match(styles, /\.p3\{background-image:url\('https:\/\/images\.unsplash\.com\/photo-1509391366360-2e959784a276\?auto=format&fit=crop&w=800&q=85'\)\}/);
});

test('portfolio pages contain neither monetary values nor POWPACKER editor hotlinks', async () => {
  for (const file of ['projects.html', 'projects-data-center.html']) {
    const page = await readFile(path.join(root, file), 'utf8');

    assert.doesNotMatch(page, /https?:\/\/(?:www\.)?powpacker\.(?:com|co\.th)\b/i, `${file} must not include a POWPACKER editor hotlink`);
    assert.doesNotMatch(page, /(?:฿|\b(?:THB|USD)\s*\d|\b\d[\d,]*(?:\.\d+)?\s*(?:THB|บาท)\b)/i, `${file} must not include a monetary value`);
  }
});
