// Generate every charter PDF directly from the built language-specific web page.
// Build first. Use an installed Chromium browser and playwright-core.
// Optional: PRI_PLAYWRIGHT_MODULE points to a runtime-provided module;
// PRI_BROWSER_EXECUTABLE points to the installed Chromium executable.
// Optional: PRI_FONTSOURCE_DIR points to a node_modules directory containing
// @fontsource/{ibm-plex-serif,ibm-plex-sans,noto-serif-sc,noto-serif-tc,noto-sans-sc,noto-sans-tc}.
// When set, those fonts are embedded so the PDFs render the same on any machine;
// otherwise the installed system fonts in the stacks below are used.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const modulePath = process.env.PRI_PLAYWRIGHT_MODULE;
const { chromium } = await import(modulePath ? pathToFileURL(modulePath).href : 'playwright-core');
const browser = await chromium.launch({ headless: true, ...(process.env.PRI_BROWSER_EXECUTABLE ? { executablePath: process.env.PRI_BROWSER_EXECUTABLE } : {}) });
const locales = [
  { path: '', suffix: 'en', lang: 'en', title: 'Institute Charter', author: 'Panorama Scholarly Group', status: 'Version 1.1 · Effective 2026-10-05', contents: 'Table of Contents', tag: 'GOVERNANCE DOCUMENT', issued: 'ISSUED BY', state: 'STATUS', notice: 'The constitution, structure, and governing principles of Panorama Research Institute, a research institute established by Panorama Scholarly Group. PSG is its parent organization and legal and administrative entity. PRI is not a separate legal entity.', footer: 'Panorama Research Institute · Institute Charter', profile: [['INSTITUTE', 'Panorama Research Institute (PRI)'], ['ESTABLISHED', '2026'], ['LOCATION', 'Hong Kong']], parent: 'PARENT ORGANIZATION', parentName: 'Panorama Scholarly Group' },
  { path: 'zh-cn/', suffix: 'cn', lang: 'zh-CN', title: '研究院章程', author: '全景学术集团', status: '1.1 版 · 2026-10-05 生效', contents: '目录', tag: '治 理 文 件', issued: '发布机构', state: '版本状态', notice: '全景研究院的组织构成、治理规则与指导原则。全景研究院是由全景学术集团设立的研究机构；PSG 是其上级机构及法律与行政承载主体，PRI 不具有独立法人资格。', footer: '全景研究院 · 研究院章程', profile: [['研究院', '全景研究院（PRI）'], ['成立年份', '2026 年'], ['所在地', '香港']], parent: '上级机构', parentName: '全景学术集团' },
  { path: 'zh-tw/', suffix: 'cn-tw', lang: 'zh-TW', title: '研究院章程', author: '全景學術集團', status: '1.1 版 · 2026-10-05 生效', contents: '目錄', tag: '治 理 文 件', issued: '發布機構', state: '版本狀態', notice: '全景研究院的組織構成、治理規則與指導原則。全景研究院是由全景學術集團設立的研究機構；PSG 是其上級機構及法律與行政承載主體，PRI 不具有獨立法人資格。', footer: '全景研究院 · 研究院章程', profile: [['研究院', '全景研究院（PRI）'], ['成立年份', '2026 年'], ['所在地', '香港']], parent: '上級機構', parentName: '全景學術集團' },
];
const logo = 'data:image/svg+xml;base64,' + readFileSync(resolve(root, 'public/brand/logo-mono-black.svg')).toString('base64');
const rorIcon = readFileSync(resolve(root, 'public/brand/ror-icon.svg'), 'utf8').replace('<svg ', '<svg width="18" height="16" ');
const parentRor = 'https://ror.org/01x7hvy53';
const fontDir = process.env.PRI_FONTSOURCE_DIR ? resolve(process.env.PRI_FONTSOURCE_DIR) : null;
const fontSheets = ['ibm-plex-serif/400.css', 'ibm-plex-serif/400-italic.css', 'ibm-plex-serif/600.css', 'ibm-plex-sans/400.css', 'ibm-plex-sans/600.css', 'ibm-plex-sans/700.css'];
const cjkSheets = { 'zh-CN': ['noto-serif-sc/400.css', 'noto-serif-sc/700.css', 'noto-sans-sc/500.css', 'noto-sans-sc/700.css'], 'zh-TW': ['noto-serif-tc/400.css', 'noto-serif-tc/700.css', 'noto-sans-tc/500.css', 'noto-sans-tc/700.css'] };
const preview = resolve(root, '.charter-preview');
mkdirSync(preview, { recursive: true });
try {
  for (const loc of locales) {
    const page = await browser.newPage();
    await page.setContent(readFileSync(resolve(root, 'dist', loc.path, 'charter/index.html'), 'utf8'));
    const content = await page.evaluate(() => {
      const sections = [...document.querySelectorAll('[id^="article-"]')];
      if (sections.length !== 20) throw new Error('Expected all 20 charter articles');
      return sections.map(section => {
        const text = section.innerText;
        const title = section.querySelector('h2').textContent;
        const clone = section.cloneNode(true);
        for (const el of [clone, ...clone.querySelectorAll('*')]) {
          if (el.style.fontWeight === '600' || el.style.fontWeight === '700') el.setAttribute('data-emphasis', 'heading');
          el.removeAttribute('style'); el.removeAttribute('class');
        }
        clone.setAttribute('class', 'article');
        return { id: section.id, title, text, html: clone.outerHTML };
      });
    });
    const ranges = [[0,3],[3,6],[6,10],[10,14],[14,18],[18,20]];
    const groups = loc.suffix === 'en'
      ? ['I · IDENTITY & STATUS', 'II · MISSION & ACTIVITIES', 'III · STRUCTURE & GOVERNANCE', 'IV · OUTPUTS & COMMUNITY', 'V · ETHICS & STANDARDS', 'VI · ADMINISTRATION']
      : loc.suffix === 'cn' ? ['I · 名称与性质','II · 宗旨与活动','III · 组织与治理','IV · 成果与学者','V · 伦理与规范','VI · 财务与行政']
      : ['I · 名稱與性質','II · 宗旨與活動','III · 組織與治理','IV · 成果與學者','V · 倫理與規範','VI · 財務與行政'];
    const fontLinks = fontDir
      ? [...fontSheets, ...(cjkSheets[loc.lang] ?? [])].map(sheet => `<link rel="stylesheet" href="${pathToFileURL(resolve(fontDir, '@fontsource', sheet)).href}">`).join('')
      : '';
    const doc = `<!doctype html><html lang="${loc.lang}"><head><meta charset="utf-8"><title>${loc.title} | Panorama Research Institute | v1.1</title>${fontLinks}<style>
      @page { size:A4; margin:24mm 22mm 22mm; }
      :root { --serif:'IBM Plex Serif',Georgia,serif; --sans:'IBM Plex Sans',Arial,sans-serif; --ink:#1f2326; --text:#3a3f44; --muted:#8a9096; --rule:#d9dcdf; --accent:#3d5a73; }
      html[lang="zh-CN"] { --serif:'Noto Serif SC','SimSun','IBM Plex Serif',serif; --sans:'Noto Sans SC','Microsoft YaHei','IBM Plex Sans',sans-serif; }
      html[lang="zh-TW"] { --serif:'Noto Serif TC','PMingLiU','IBM Plex Serif',serif; --sans:'Noto Sans TC','Microsoft JhengHei','IBM Plex Sans',sans-serif; }
      * { box-sizing:border-box; }
      body { margin:0; color:var(--text); font-family:var(--serif); font-size:10.5pt; line-height:17.5pt; }
      html[lang^="zh"] body { font-size:11pt; line-height:20pt; text-align:justify; }
      .label { font-family:var(--sans); font-size:7.5pt; font-weight:600; letter-spacing:1.6pt; text-transform:uppercase; color:var(--muted); line-height:12pt; }
      html[lang^="zh"] .label { letter-spacing:2pt; }

      .cover { height:250mm; display:flex; flex-direction:column; break-after:page; }
      .cover img { width:200pt; height:auto; }
      .cover .band { margin-top:150pt; border-left:3pt solid var(--ink); padding-left:22pt; }
      .cover .tag { font-family:var(--sans); font-size:9pt; color:var(--muted); letter-spacing:4pt; line-height:14pt; }
      .cover h1 { font-family:var(--sans); font-size:50pt; font-weight:700; letter-spacing:-1.5pt; line-height:52pt; margin:12pt 0 0; color:var(--ink); }
      html[lang^="zh"] .cover h1 { font-size:46pt; line-height:58pt; letter-spacing:4pt; }
      .cover .version { margin-top:14pt; font-family:var(--sans); font-size:11pt; color:var(--accent); letter-spacing:0.4pt; }
      .cover .notice { margin:34pt 0 0; max-width:390pt; color:#555b61; font-size:11.5pt; line-height:19pt; }
      .cover .profile { margin-top:auto; border-top:1pt solid var(--ink); display:grid; grid-template-columns:repeat(3,1fr); }
      .cover .profile > div { padding:11pt 12pt 11pt 0; border-bottom:0.5pt solid var(--rule); }
      .cover .profile .value { font-family:var(--sans); font-size:10pt; line-height:15pt; color:var(--ink); margin-top:3pt; }
      .cover .profile .wide { grid-column:span 2; }
      .cover .ror { display:inline-flex; align-items:center; gap:7pt; }
      .cover .ror a { display:inline-flex; line-height:0; }

      .toc { break-after:page; }
      .toc h1 { font-family:var(--sans); font-weight:700; font-size:24pt; margin:4pt 0 0; line-height:30pt; letter-spacing:-0.4pt; color:var(--ink); }
      .rule { width:36pt; border-top:1.5pt solid var(--ink); margin:14pt 0 26pt; }
      .toc-grid { display:grid; grid-template-columns:1fr 1fr; column-gap:30pt; row-gap:22pt; }
      .toc-group h3 { font-family:var(--sans); font-size:7.5pt; color:var(--muted); font-weight:700; letter-spacing:1.3pt; line-height:12pt; padding-bottom:5pt; margin:0 0 6pt; border-bottom:0.75pt solid var(--ink); }
      .toc a { display:flex; gap:12pt; color:var(--text); text-decoration:none; font-size:10.5pt; line-height:21pt; }
      .toc .num { color:#b3b8bd; font-family:var(--sans); font-size:8.5pt; font-weight:700; min-width:12pt; }

      .article { padding-top:20pt; margin-top:20pt; border-top:0.5pt solid var(--rule); }
      .toc + .article { padding-top:0; margin-top:0; border-top:0; }
      .article > div:first-child { color:var(--accent); font-family:var(--sans); font-size:7.5pt; font-weight:600; letter-spacing:1.8pt; text-transform:uppercase; margin:0 0 4pt; line-height:12pt; break-after:avoid; }
      h2 { font-family:var(--sans); font-size:16pt; font-weight:700; margin:0 0 12pt; line-height:22pt; letter-spacing:-0.2pt; color:var(--ink); break-after:avoid; }
      html[lang^="zh"] h2 { letter-spacing:1pt; }
      h3,[data-emphasis="heading"] { font-family:var(--sans); font-size:10pt; font-weight:600; color:var(--ink); margin:8pt 0 2pt; break-after:avoid; }
      p { margin:0 0 9pt; orphans:3; widows:3; }
      .article > div:not(:first-child) { margin:0 0 9pt; }
      .article > div > p:last-child { margin-bottom:0; }
      .article div:has(> h3) { break-inside:avoid; }
      .article div:has(> span) { display:flex; gap:8pt; margin:0 !important; padding:1pt 0; font-size:10pt; line-height:16.5pt; }
      .article span:first-child { flex-shrink:0; }
      /* The research-area numerals and headings share fixed columns and a baseline. */
      #article-6 > div:has(> span:first-child) { display:grid; grid-template-columns:18pt minmax(0,1fr); column-gap:6pt; align-items:start; padding:3pt 0; break-inside:avoid; }
      #article-6 > div:has(> span:first-child) > span { display:block; width:18pt; font-size:8.5pt; line-height:17pt; font-family:var(--sans); color:var(--muted); }
      #article-6 > div:has(> span:first-child) > div { min-width:0; }
      #article-6 > div:has(> span:first-child) > div > [data-emphasis="heading"] { display:block; margin:0 0 1pt; line-height:17pt; }
      html[lang^="zh"] #article-6 > div:has(> span:first-child) > span,
      html[lang^="zh"] #article-6 > div:has(> span:first-child) > div > [data-emphasis="heading"] { line-height:20pt; }
    </style></head><body>
      <section class="cover">
        <img src="${logo}" alt="Panorama Research Institute">
        <div class="band"><div class="tag">${loc.tag}</div><h1>${loc.suffix==='en'?'Institute<br>Charter':loc.title}</h1><div class="version">${loc.status}</div></div>
        <p class="notice">${loc.notice}</p>
        <div class="profile">
          ${loc.profile.map(([label, value]) => `<div><div class="label">${label}</div><div class="value">${value}</div></div>`).join('')}
          <div><div class="label">${loc.issued}</div><div class="value">${loc.author}</div></div>
          <div class="wide"><div class="label">${loc.parent}</div><div class="value ror">${loc.parentName}<a href="${parentRor}" title="${loc.parentName} – ROR ID">${rorIcon}</a></div></div>
        </div>
      </section>
      <section class="toc"><div class="label">${loc.suffix==='en'?'CONTENTS':loc.contents}</div><h1>${loc.contents}</h1><div class="rule"></div><div class="toc-grid">${ranges.map(([start,end],g)=>`<div class="toc-group"><h3>${groups[g]}</h3>${content.slice(start,end).map((a,k)=>`<a href="#${a.id}"><span class="num">${String(start+k+1).padStart(2,'0')}</span><span>${a.title}</span></a>`).join('')}</div>`).join('')}</div></section>
      ${content.map(a=>a.html).join('')}
    </body></html>`;
    writeFileSync(resolve(preview, `charter-${loc.suffix}.html`), doc);
    writeFileSync(resolve(preview, `charter-${loc.suffix}-articles.json`), JSON.stringify(content, null, 2));
    await page.goto(pathToFileURL(resolve(preview, `charter-${loc.suffix}.html`)).href);
    await page.evaluate(() => document.fonts.ready);
    const rowLayout = await page.evaluate(() => [...document.querySelectorAll('#article-6 > div:has(> span:first-child)')].map(row => {
      const numeral = row.querySelector(':scope > span').getBoundingClientRect();
      const heading = row.querySelector(':scope > div > [data-emphasis="heading"]').getBoundingClientRect();
      return { numeralTop:numeral.top, headingTop:heading.top, headingLeft:heading.left };
    }));
    if (rowLayout.length !== 7 || rowLayout.some(row => Math.abs(row.numeralTop - row.headingTop) > 1 || Math.abs(row.headingLeft - rowLayout[0].headingLeft) > 1)) {
      throw new Error(`Research-area layout is misaligned in ${loc.suffix}: ${JSON.stringify(rowLayout)}`);
    }
    const file = resolve(root, `public/documents/panorama-research-institute-charter-${loc.suffix}.pdf`);
    await page.pdf({ path:file, preferCSSPageSize:true, printBackground:true, displayHeaderFooter:true, headerTemplate:'<span></span>', footerTemplate:`<div style="font-family:'IBM Plex Sans',Arial,'Microsoft YaHei','Microsoft JhengHei',sans-serif;font-size:7px;width:100%;margin:0 22mm;padding-top:6pt;border-top:0.5pt solid #d9dcdf;display:flex;justify-content:space-between;color:#8a9096;letter-spacing:0.6px"><span>${loc.footer}</span><span>v1.1 · 2026-10-05 · <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>` });
    console.log(`Generated ${file}`);
    await page.close();
  }
} finally { await browser.close(); }
const watermark = spawnSync(process.env.PRI_PYTHON || 'python', [resolve(root, 'scripts/add-charter-watermarks.py')], { stdio:'inherit' });
if (watermark.error) throw watermark.error;
if (watermark.status !== 0) throw new Error(`Charter watermarking failed with exit code ${watermark.status}`);
