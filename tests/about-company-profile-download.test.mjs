import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const profilePath = path.join(root, 'assets', 'documents', 'company-profile-powpacker-2026.pdf');
const python = 'C:/Users/TeerawatSakronram/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
const execFileAsync = promisify(execFile);
const expectedHash = '01e72a47e0c30dfa134d2d6a7cd8dc8e29defd6ee329db28cbdbec2642088c17';
const href = 'assets/documents/company-profile-powpacker-2026.pdf';
const label = '\u0e14\u0e32\u0e27\u0e19\u0e4c\u0e42\u0e2b\u0e25\u0e14 Company Profile POWPACKER 2026 \u0e23\u0e39\u0e1b\u0e41\u0e1a\u0e1a PDF';
const text = '\u0e14\u0e32\u0e27\u0e19\u0e4c\u0e42\u0e2b\u0e25\u0e14 Company Profile (PDF)';

test('About hero provides the approved Company Profile PDF as a local direct download', async () => {
  const [profile, about] = await Promise.all([
    readFile(profilePath),
    readFile(path.join(root, 'about.html'), 'utf8'),
  ]);

  assert.equal(createHash('sha256').update(profile).digest('hex'), expectedHash, 'profile PDF must remain byte-identical to the approved source');
  assert.equal(profile.subarray(0, 5).toString('ascii'), '%PDF-', 'profile must be a PDF');

  const { stdout } = await execFileAsync(python, ['-c', "from pypdf import PdfReader; import sys; reader = PdfReader(sys.argv[1]); print(f'{len(reader.pages)}:{reader.is_encrypted}')", profilePath]);
  assert.equal(stdout.trim(), '45:False', 'profile must be an unencrypted 45-page PDF');

  const anchor = `<a class="button outline profile-download" href="${href}" download aria-label="${label}">${text}<span aria-hidden="true">\u2192</span></a>`;
  const hero = about.match(/<section class="page-hero"[\s\S]*?<\/section>/)?.[0] ?? '';
  assert.equal((hero.match(/<a\b[^>]*\bprofile-download\b[\s\S]*?<\/a>/g) ?? []).length, 1, 'hero must contain exactly one Company Profile download link');
  assert.match(hero, new RegExp(`</p>${anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`), 'download link must immediately follow the hero paragraph');
});
