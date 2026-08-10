import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

export const FACTORY_PROJECTS = [
  { asset: '01-tgi-bp5-new-factory.webp', heading: 'TGI BP5 New Factory (M&E System)', location: 'SAMUT PRAKAN', description: 'Mechanical & Electrical System' },
  { asset: '02-tgi-bp3-cold-repair.webp', heading: 'TGI BP3 Cold Repair', location: 'SAMUT PRAKAN', description: 'Mechanical & Electrical System' },
  { asset: '03-tgi-bp2-cold-repair.webp', heading: 'TGI BP2 Cold Repair', location: 'SAMUT PRAKAN', description: 'Mechanical & Electrical System' },
  { asset: '04-thai-malaya-glass.webp', heading: 'THAI MALAYA GLASS', location: 'SARABURI', description: 'Mechanical & Electrical System' },
  { asset: '05-oishi-new-uht-plant.webp', heading: 'Oishi - New UHT Plant', location: 'NAVANAKORN · PATHUM THANI', description: 'Mechanical & SCADA System' },
  { asset: '06-oishi-central-catering.webp', heading: 'Oishi - Renovate Central Catering', location: 'NAVANAKORN · PATHUM THANI', description: 'Structure, Architecture, Mechanical & Electrical System' },
  { asset: '07-nan-yang-garment.webp', heading: 'Nan Yang Garment (Tuang Nakorn)', location: 'NAKHON PATHOM', description: 'Electrical System' },
  { asset: '08-tmg-tm2.webp', heading: 'TMG TM2 Power, Communication & Mechanical Systems', location: 'SARABURI', description: 'Mechanical & Electrical System' },
  { asset: '09-tmg-tm3.webp', heading: 'TMG TM3 Electrical & Mechanical Systems', location: 'SARABURI', description: 'Electrical & Mechanical System' },
  { asset: '10-toa-production.webp', heading: 'TOA Production Building Electrical System', location: 'SAMUT PRAKAN', description: 'Electrical System' },
  { asset: '11-nippon-paint.webp', heading: 'Nippon Paint M&E', location: 'CHONBURI', description: 'Mechanical & Electrical System' },
  { asset: '12-magotteaux.webp', heading: 'Magotteaux Mechanical System', location: 'SARABURI', description: 'Mechanical System' },
  { asset: '13-troy-siam-electrical.webp', heading: 'Troy Siam Expansion Phase III — Electrical', location: 'PRACHIN BURI', description: 'Electrical System' },
  { asset: '14-troy-siam-mechanical.webp', heading: 'Troy Siam Expansion Phase III — Mechanical', location: 'PRACHIN BURI', description: 'Mechanical System' },
  { asset: '15-tcp-fire-protection.webp', heading: 'TCP Fire Protection System for 8 Buildings', location: 'PRACHIN BURI', description: 'Mechanical System' },
  { asset: '16-apg-utility-pipes.webp', heading: 'APG Mechanical Utility Pipes', location: 'CHACHOENGSAO', description: 'Mechanical System' },
  { asset: '17-apg-glass-furnace-2.webp', heading: 'APG Glass Furnace 2 Utility & Electrical Systems', location: 'CHACHOENGSAO', description: 'M&E Work' },
  { asset: '18-new-cpp-plant.webp', heading: 'New CPP Plant Project', location: 'RAYONG', description: 'Mechanical & Electrical System' },
  { asset: '19-nan-yang-textile.webp', heading: 'Nan Yang Textile OE & Boolroom', location: 'NAKHON PATHOM', description: 'Electrical System' },
  { asset: '20-fn-new-factory.webp', heading: 'F&N New Factory', location: 'AYUTTHAYA', description: 'Mechanical & Piping System' },
  { asset: '21-sukhothai-sugar-lighting.webp', heading: 'Sukhothai Sugar Factory Lighting System', location: 'SUKHOTHAI', description: 'Electrical System' },
  { asset: '22-merry-electronics.webp', heading: 'Merry Electronics Electrical & Air-conditioning Systems', location: 'RAYONG', description: 'Electrical & Mechanical System' },
  { asset: '23-merry-fire-protection.webp', heading: 'Merry Electrical & Fire Protection Systems', location: 'KANCHANABURI', description: 'Mechanical & Electrical System' },
  { asset: '24-pineapple-utility-building.webp', heading: 'New Building of Utility for Pineapple', location: 'RAYONG', description: 'Mechanical & Electrical System' },
  { asset: '25-gir-furnace.webp', heading: 'GIR Furnace CTR Mechanical', location: 'RAYONG', description: 'Mechanical System' },
  { asset: '26-swan-project.webp', heading: 'SWAN Project', location: 'SA KAEO', description: 'Mechanical & Electrical System' },
  { asset: '27-mitsubishi-elevator.webp', heading: 'Mitsubishi Elevator Asia', location: 'CHONBURI', description: 'Electrical System' },
  { asset: '28-sga-furnace-301.webp', heading: 'SGA Furnace #301 Electrical & Generator Systems', location: 'AYUTTHAYA', description: 'Electrical System' },
  { asset: '29-bjc-cellox-paper-me.webp', heading: 'BJC Cellox Paper Factory M&E Systems', location: 'PRACHIN BURI', description: 'M&E Work' },
  { asset: '30-bjc-cellox-pm5.webp', heading: 'BJC Cellox PM5 Piping & Machinery Installation', location: 'PRACHIN BURI', description: 'Mechanical Work' },
];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = path.join(root, 'assets', 'projects', 'factory');

test('all 30 approved Factory WebP assets exist and are unique', async () => {
  assert.equal(FACTORY_PROJECTS.length, 30);
  assert.equal(new Set(FACTORY_PROJECTS.map(({ asset }) => asset)).size, 30);

  const hashes = [];
  for (const { asset } of FACTORY_PROJECTS) {
    const assetPath = path.join(projectsDir, asset);
    const [info, bytes] = await Promise.all([stat(assetPath), readFile(assetPath)]);

    assert.ok(info.size > 1024, `${asset} must be over 1 KB`);
    assert.ok(info.size < 1.5 * 1024 * 1024, `${asset} must be below 1.5 MB`);
    assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF', `${asset} must start with RIFF`);
    assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP', `${asset} must have WEBP magic bytes`);
    hashes.push(createHash('sha256').update(bytes).digest('hex'));
  }

  assert.equal(new Set(hashes).size, 30, 'Factory assets must have unique SHA-256 hashes');
});
