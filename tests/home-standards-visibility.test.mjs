import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const standardsSection = /<section class="numbers standards" aria-label="([^"]+)">([\s\S]*?)<\/section>/g;

test('Home omits standards while About retains the four accessible standards', async () => {
  const [home, about] = await Promise.all([
    readFile(path.join(root, 'index.html'), 'utf8'),
    readFile(path.join(root, 'about.html'), 'utf8'),
  ]);
  const homeStandards = [...home.matchAll(standardsSection)];
  const aboutStandards = [...about.matchAll(standardsSection)];

  assert.equal(homeStandards.length, 0, 'Home must not render the standards strip');
  assert.equal(aboutStandards.length, 1, 'About must retain one standards strip');
  assert.equal(aboutStandards[0][1], 'มาตรฐานการทำงานของ POWPACKER');
  assert.equal((aboutStandards[0][2].match(/<article class="standard-item">/g) ?? []).length, 4);
});
