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
