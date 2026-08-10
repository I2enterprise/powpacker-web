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
});
