import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const profilePath = path.join(root, 'assets', 'documents', 'company-profile-powpacker-2026.pdf');
const expectedHash = '01e72a47e0c30dfa134d2d6a7cd8dc8e29defd6ee329db28cbdbec2642088c17';
const href = 'assets/documents/company-profile-powpacker-2026.pdf';
const label = '\u0e14\u0e32\u0e27\u0e19\u0e4c\u0e42\u0e2b\u0e25\u0e14 Company Profile POWPACKER 2026 \u0e23\u0e39\u0e1b\u0e41\u0e1a\u0e1a PDF';
const text = '\u0e14\u0e32\u0e27\u0e19\u0e4c\u0e42\u0e2b\u0e25\u0e14 Company Profile (PDF)';

function pdfPageCount(pdf) {
  return (pdf.toString('latin1').match(/\/Type\s*\/Page(?!s)\b/g) ?? []).length;
}

test('About hero provides the approved Company Profile PDF as a local direct download', async () => {
  const [profile, about] = await Promise.all([
    readFile(profilePath),
    readFile(path.join(root, 'about.html'), 'utf8'),
  ]);

  assert.equal(createHash('sha256').update(profile).digest('hex'), expectedHash, 'profile PDF must remain byte-identical to the approved source');
  assert.equal(profile.subarray(0, 5).toString('ascii'), '%PDF-', 'profile must be a PDF');
  assert.ok(profile.toString('latin1').trimEnd().endsWith('%%EOF'), 'profile must end with a PDF EOF marker');
  assert.doesNotMatch(profile.toString('latin1'), /\/Encrypt\b/, 'profile must not contain a PDF encryption reference');
  assert.equal(pdfPageCount(profile), 45, 'profile must contain the approved 45 PDF page objects');

  const anchor = `<a class="button outline profile-download" href="${href}" download aria-label="${label}">${text}<span aria-hidden="true">\u2192</span></a>`;
  const hero = about.match(/<section class="page-hero"[\s\S]*?<\/section>/)?.[0] ?? '';
  assert.equal((hero.match(/<a\b[^>]*\bprofile-download\b[\s\S]*?<\/a>/g) ?? []).length, 1, 'hero must contain exactly one Company Profile download link');
  assert.match(hero, new RegExp(`</p>${anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`), 'download link must immediately follow the hero paragraph');
});
