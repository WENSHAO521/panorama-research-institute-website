// Generate every charter PDF directly from the built language-specific web page.
// Build first. Use an installed Chromium browser and playwright-core.
// Optional: PRI_PLAYWRIGHT_MODULE points to a runtime-provided module;
// PRI_BROWSER_EXECUTABLE points to the installed Chromium executable.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const modulePath = process.env.PRI_PLAYWRIGHT_MODULE;
const { chromium } = await import(modulePath ? pathToFileURL(modulePath).href : 'playwright-core');
const browser = await chromium.launch({ headless: true, ...(process.env.PRI_BROWSER_EXECUTABLE ? { executablePath: process.env.PRI_BROWSER_EXECUTABLE } : {}) });
const locales = [
  { path: '', suffix: 'en', lang: 'en', title: 'Institute Charter', author: 'Panorama Scholarly Group', status: 'Version 1.1 · Effective 2026-10-05', contents: 'Table of Contents', tag: 'GOVERNANCE DOCUMENT', issued: 'ISSUED BY', state: 'STATUS', notice: 'The constitution, structure, and governing principles of Panorama Research Institute, a research institute established by Panorama Scholarly Group. PSG is its parent organization and legal and administrative entity. PRI is not a separate legal entity.' },
  { path: 'zh-cn/', suffix: 'cn', lang: 'zh-CN', title: '研究院章程', author: '全景学术集团', status: '1.1 版 · 2026-10-05 生效', contents: '目录', tag: '治 理 文 件', issued: '发布机构', state: '版本状态', notice: '全景研究院的组织构成、治理规则与指导原则。全景研究院是由全景学术集团设立的研究机构；PSG 是其上级机构及法律与行政承载主体，PRI 不具有独立法人资格。' },
  { path: 'zh-tw/', suffix: 'cn-tw', lang: 'zh-TW', title: '研究院章程', author: '全景學術集團', status: '1.1 版 · 2026-10-05 生效', contents: '目錄', tag: '治 理 文 件', issued: '發布機構', state: '版本狀態', notice: '全景研究院的組織構成、治理規則與指導原則。全景研究院是由全景學術集團設立的研究機構；PSG 是其上級機構及法律與行政承載主體，PRI 不具有獨立法人資格。' },
];
const logo = 'data:image/svg+xml;base64,' + readFileSync(resolve(root, 'public/brand/logo-mono-black.svg')).toString('base64');
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
    const doc = `<!doctype html><html lang="${loc.lang}"><head><meta charset="utf-8"><title>${loc.title} | Panorama Research Institute | v1.1</title><style>
      @page { size:Letter; margin:90pt 64.8pt 60pt; }
      * { box-sizing:border-box; }
      body { margin:0; color:#333; font-family:Georgia,'SimSun','PMingLiU',serif; font-size:11.25pt; line-height:21pt; }
      html[lang^="zh"] body { font-family:'SimSun','PMingLiU',Georgia,serif; font-size:12pt; line-height:24pt; }
      html[lang="zh-TW"] body { font-family:'PMingLiU','SimSun',Georgia,serif; }
      .cover { height:641pt; break-after:page; position:relative; }
      .cover img { width:225pt; height:67.5pt; position:absolute; left:0; top:26pt; }
      .cover .tag { position:absolute; top:190pt; font-family:Arial,'Microsoft YaHei','Microsoft JhengHei',sans-serif; font-size:9.75pt; color:#999; letter-spacing:4.5pt; line-height:16pt; }
      .cover h1 { position:absolute; top:218pt; font-family:Arial,'Microsoft YaHei','Microsoft JhengHei',sans-serif; font-size:63pt; font-weight:700; letter-spacing:-2pt; line-height:60pt; margin:0; color:#292929; }
      html[lang^="zh"] .cover h1 { font-size:58pt; line-height:72pt; top:250pt; letter-spacing:0; }
      html[lang^="zh"] .cover .tag { top:225pt; font-size:12pt; letter-spacing:8pt; }
      .cover .rule { position:absolute; top:366pt; width:54pt; border-top:2.5pt solid #333; }
      html[lang^="zh"] .cover .rule { top:346pt; }
      .cover .notice { position:absolute; top:394pt; margin:0; color:#555; font-size:14.25pt; line-height:22.5pt; }
      html[lang^="zh"] .cover .notice { top:375pt; }
      .cover .meta { position:absolute; top:560pt; width:100%; display:flex; justify-content:space-between; border-top:0.5pt solid #ddd; padding-top:12pt; font-family:Arial,'Microsoft YaHei','Microsoft JhengHei',sans-serif; font-size:11.25pt; line-height:19pt; }
      .meta .right { text-align:right; }
      .meta .label { font-size:7.5pt; color:#999; letter-spacing:1.2pt; line-height:15pt; }
      .toc { break-after:page; }
      .toc .tag { font-family:Arial,'Microsoft YaHei','Microsoft JhengHei',sans-serif; font-size:9pt; color:#999; letter-spacing:3pt; line-height:14pt; }
      .toc h1 { font-family:Arial,'Microsoft YaHei','Microsoft JhengHei',sans-serif; font-weight:700; font-size:27pt; margin:3pt 0 0; line-height:34pt; letter-spacing:-0.5pt; color:#292929; }
      .toc .rule { width:42pt; border-top:1.5pt solid #333; margin-bottom:24pt; }
      .toc-grid { display:grid; grid-template-columns:1fr 1fr; column-gap:36pt; row-gap:25pt; }
      .toc-group h3 { font-family:Arial,'Microsoft YaHei','Microsoft JhengHei',sans-serif; font-size:8.25pt; color:#999; font-weight:700; letter-spacing:1.3pt; line-height:14pt; padding-bottom:5pt; margin:0 0 7pt; border-bottom:0.5pt solid #333; }
      .toc a { display:flex; gap:13pt; color:#333; text-decoration:none; font-size:10.9pt; line-height:22pt; }
      .toc .num { color:#bbb; font-family:Arial,sans-serif; font-size:9pt; font-weight:700; min-width:11pt; }
      .article { break-before:page; }
      .article > div:first-child { color:#999; font-family:Arial,'Microsoft YaHei','Microsoft JhengHei',sans-serif; font-size:9pt; letter-spacing:2pt; text-transform:uppercase; margin:0 0 5pt; line-height:11.5pt; }
      h2 { font-family:Arial,'Microsoft YaHei','Microsoft JhengHei',sans-serif; font-size:24pt; font-weight:700; margin:0 0 24pt; line-height:29pt; letter-spacing:-0.5pt; color:#292929; }
      h2::after { content:''; display:block; width:42pt; border-top:1.8pt solid #333; margin-top:14pt; }
      h3,[data-emphasis="heading"] { font-family:Arial,'Microsoft YaHei','Microsoft JhengHei',sans-serif; font-size:11.25pt; font-weight:700; margin:8pt 0 2pt; }
      p { margin:0 0 12.5pt; orphans:3; widows:3; }
      .article > div:not(:first-child) { margin:0 0 12.5pt; }
      .article > div > p:last-child { margin-bottom:0; }
      .article div:has(> h3) { break-inside:avoid; }
      .article div:has(> span) { display:flex; gap:8pt; padding:3pt 0; }
      .article div:has(> span) { margin:0 !important; padding:1pt 0; font-size:10.9pt; line-height:18pt; }
      #article-6, #article-7, #article-11 { font-size:10.9pt; line-height:18pt; }
      #article-6 h3, #article-7 h3, #article-11 h3 { margin:7pt 0 2pt; }
      #article-6 p, #article-7 p, #article-11 p { margin-bottom:7pt; }
      #article-6 > div:not(:first-child), #article-7 > div:not(:first-child), #article-11 > div:not(:first-child) { margin-bottom:7pt; }
      #article-15 { line-height:20pt; }
      #article-7 { line-height:16.5pt; }
      #article-7 > div:not(:first-child) { margin-bottom:4pt; }
      #article-7 [data-emphasis="heading"] { margin:4pt 0 0; }
      html[lang^="zh"] #article-6, html[lang^="zh"] #article-7 { font-size:11.25pt; line-height:20pt; }
      .article span:first-child { flex-shrink:0; }
      /* The research-area numerals and headings share fixed columns and a baseline. */
      #article-6 > div:has(> span:first-child) { display:grid; grid-template-columns:18pt minmax(0,1fr); column-gap:5pt; align-items:start; padding:0; break-inside:avoid; }
      #article-6 > div:has(> span:first-child) > span { display:block; width:18pt; font-size:9pt; line-height:18pt; font-family:Arial,sans-serif; }
      #article-6 > div:has(> span:first-child) > div { min-width:0; }
      #article-6 > div:has(> span:first-child) > div > [data-emphasis="heading"] { display:block; margin:0 0 2pt; line-height:18pt; }
      html[lang^="zh"] #article-6 > div:has(> span:first-child) > span,
      html[lang^="zh"] #article-6 > div:has(> span:first-child) > div > [data-emphasis="heading"] { line-height:20pt; }
      h2,h3 { break-after:avoid; }
    </style></head><body>
      <section class="cover"><img src="${logo}" alt="Panorama Research Institute"><div class="tag">${loc.tag}</div><h1>${loc.suffix==='en'?'Institute<br>Charter':loc.title}</h1><div class="rule"></div><p class="notice">${loc.notice}</p><div class="meta"><div><div class="label">${loc.issued}</div>${loc.author}</div><div class="right"><div class="label">${loc.state}</div>${loc.status}</div></div></section>
      <section class="toc"><div class="tag">${loc.suffix==='en'?'CONTENTS':loc.contents}</div><h1>${loc.contents}</h1><div class="rule"></div><div class="toc-grid">${ranges.map(([start,end],g)=>`<div class="toc-group"><h3>${groups[g]}</h3>${content.slice(start,end).map((a,k)=>`<a href="#${a.id}"><span class="num">${String(start+k+1).padStart(2,'0')}</span><span>${a.title}</span></a>`).join('')}</div>`).join('')}</div></section>
      ${content.map(a=>a.html).join('')}
    </body></html>`;
    writeFileSync(resolve(preview, `charter-${loc.suffix}.html`), doc);
    writeFileSync(resolve(preview, `charter-${loc.suffix}-articles.json`), JSON.stringify(content, null, 2));
    await page.setContent(doc);
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
    await page.pdf({ path:file, preferCSSPageSize:true, printBackground:true, displayHeaderFooter:true, headerTemplate:'<span></span>', footerTemplate:`<div style="font-family:Arial,sans-serif;font-size:7px;width:100%;margin:0 64.8pt;padding-top:7pt;border-top:0.5pt solid #ddd;display:flex;justify-content:space-between;color:#999;letter-spacing:1px"><span>PRI</span><span>v1.1 · 2026-10-05 · <span class="pageNumber"></span></span></div>` });
    console.log(`Generated ${file}`);
    await page.close();
  }
} finally { await browser.close(); }
const watermark = spawnSync(process.env.PRI_PYTHON || 'python', [resolve(root, 'scripts/add-charter-watermarks.py')], { stdio:'inherit' });
if (watermark.error) throw watermark.error;
if (watermark.status !== 0) throw new Error(`Charter watermarking failed with exit code ${watermark.status}`);
