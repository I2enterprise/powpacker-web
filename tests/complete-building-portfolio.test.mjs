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

const PRESERVED_ALL_PROJECTS_CARD_HASHES = [
  'bd5e980ce810ff25254a9a352d22d9106ab7b34ce1dd865958155bf4fa0be06b', '63847c205388b3f8dfdf28bd1826668445f6f782349b901078c3e591275c040f', 'cd759e3be86fd044fa0ea644b1688f17811709b259c25bc7ca22ffdc3089b54a', 'f433cd926c4e61767cf393df58efae58452e2941cae5ab50e7cbac9e01a30053', 'e6bafdcbcb544df1045842c8c6296d6cece03799dcc0703b5184c703c236d0c4',
  'dfb5e3857c11d55e29dfb08b7e0b525b071d0947a4f9155cda3f74fd86146dd8', 'd6a6014be46792c368777dafda271ed2b3f35bc20d96adad35cb74a83dc1d4ff', 'a624cf3c06202dfe08d50b33bd4763a77a75f970d91678acae27e64f0129311c', '623c81c27ab066c70b3215d461a1a5602b96947f8387070f602c525bfdcd5952', '58ab3e2b44d4c4a00490daebe98789c1f80935da4dd486c3791afe125140d2e0',
  'd22ffba054597634a9633a5a84ef22d355783878cf023f6d0fe143c2cf7a6e08', '9bd9c84a59ef860c76ca6f213bcf96dab5451c8b0876381436eacc3c2cf84ca5', '73e8c1e9b45f00c792df13015ebcca248eb1dce55021daa09939a25b89e1c937', '6f41974beac35a1541233b68475cb79b49bf64741c25d49ad74350675b8f8726', 'e1da1e4b7a57f4e5451d472fd4ffce1aafd18cc7f3dc3c757eba41804eafd40c',
  'e63b37080953c5ca67538b33453cd3e9270d01ab176f7dcead3f50c6838b1fc6', 'c782036e3573c7ff797e5325cd84e3654ac8765663f632ddd0c175c7a472b278', '0528eb3514fb7164dc4f7081ef8f85c21d25880d6cb95a9a30381f12725978f8', '8fca61d8825c423d400c339f3fb844ae2585e519e6bfcfd2c3a858d25dd48009', '3c8453b764e3e28bb2755474f55defb768d6a8ccff5417b6c55784dcb09a5816',
  'a2e35b72ce155446edcb0179420a8b5f850227a648eb590b2185caebc855db3b', '91515e838e2ab0d9a70265fd66b99600871cdc8da6cfe79fd567bffe030b566e', '922cfe976c044681ed4c5981a1f19ed83253a588f2ce6fd9682734879f879d8d', 'd77f44873e2f3b8b2e65cd229a3c1dd6f359ebbfe783c57e9440e58c19299f85', '6b126ddc1e355009a77fe1f2df78b28e188b0b12146ecab6518e773bda41c24f',
  '7485fcc4c3df6245d6a9fe25838b0d202cf6bcb3e6360f5364d0c83655052de9', 'e6202b52c8c9797e99542531199c8db771e12c7d081a39bb8dcb3293bc9e6681', '9f51f08c2805661c5273ecd5294bd03d03f39655d61d8e69ead30043831688ba', '0da54e0d227410dcbfd2a8059722c5c6b64beb5d1abab37d89cc0f20931f422c', 'ac24bfad182336256cb26096fe0a475fe6eb04d6739b385e35bfefb6d402eefd',
  '048d470a6e10dc615d785cab7680f59eec18165eef0f10fe2cb3614f208d70a4', 'fb6a51d03c30d6b0a208ed883d835524c54b11dd7e9894722703723045cc2014', '362c7b705c3e0d4621ab4e1881ceabe7b4035c930a87687c7221b24470b31980', '3f762faf7db35cfb01f6ead838cd41fc7249ca60dbf9ed12f20cb333d6051cc8', '550fd114bd52946fe9d7cc140d33cd3a83e6c12bc62baf40540126a00751a7ed',
  'db9178cac811ac7aee68cdfd12e48352d1d4204d9dd9419952af70caba53820e', '091b2a04f2b21d6f43acfca4772ae0ffa0a8884ace5e15451f172d0a4fa9d256', '8b9a4f1fc2ac624950beadf6fc1f11b9a998826c64862892d45f347588f9973d', 'c1d3a6922f37d99b02e734ee064d18d1be5df241724662485c8b2861a3e8e834', '00fbe3b110ff6091a26223152267ab1574b2176a0dfbbc1e8c12fbf8a731096c',
  '06974a721478f57f1548c833270183f74ee0d03f965c4338797bc1735528f8b8', '3dbd1cb4556907d5f435f3f10760ddc39fd3302ff10b13acc7d1448d05874392', '1a1f70500d3c2e979c013d5cc3b1c8968d3895101b81f02edbcd4d2b1ba4b638', 'a78e5557a468d17f5be1c9bdc78b304bb5ee43c8f52347a63aa3d9faa2017d24', 'bf4a74c51938b67a6bed82bc48b71fd0efcc65341e7af02603a5d3236f8e452d',
];
const PRESERVED_SOLAR_CARD_HASH = '034ec84d779551734ccceeb496484de8dae76529366ee55f352fa887c6ad59d4';
const PRESERVED_HOME_CARD_HASHES = ['7db01621e197318ee925d09d967cb149ed1d3a965275a243b84dcc57838f76f9', '9322ede808b73218534e1abe98d542bc5a0331db7d58edd10e52a8b46b02c6dd', 'ab2d99cf0e2cb223d6d1484a007edd03ffef80a371bdcce1334375c463b6e7e0'];

function portfolioArticles(page) {
  return [...page.matchAll(/<article class="portfolio-card reveal">[\s\S]*?<\/article>/g)].map(([article]) => article);
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

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

test('All Projects preserves existing cards while inserting canonical Building cards before Solar', async () => {
  const [allProjects, building, indexPage] = await Promise.all([
    readFile(path.join(root, 'projects.html'), 'utf8'),
    readFile(path.join(root, 'projects-building.html'), 'utf8'),
    readFile(path.join(root, 'index.html'), 'utf8'),
  ]);
  const allCards = portfolioArticles(allProjects);
  const buildingCards = portfolioArticles(building);
  const homeCards = [...indexPage.matchAll(/<article class="project(?: project-large)? reveal">[\s\S]*?<\/article>/g)].map(([article]) => article);

  assert.equal(allCards.length, 58);
  assert.deepEqual(allCards.slice(0, 45).map(sha256), PRESERVED_ALL_PROJECTS_CARD_HASHES);
  assert.deepEqual(allCards.slice(45, 57), buildingCards);
  assert.equal(sha256(allCards[57]), PRESERVED_SOLAR_CARD_HASH);
  assert.equal((allProjects.match(/National Sports Training Center/g) ?? []).length, 1);
  assert.equal(homeCards.length, 3);
  assert.deepEqual(homeCards.map(sha256), PRESERVED_HOME_CARD_HASHES);
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
