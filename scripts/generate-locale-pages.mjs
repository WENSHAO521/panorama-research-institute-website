// One-time migration script: generate real src/pages/zh-cn/** and src/pages/zh-tw/**
// static pages from the English src/pages/**, reusing the existing phrase dictionaries
// (src/i18n/clientTranslations*.ts) for exact-match text substitution.
//
// Usage: node scripts/generate-locale-pages.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pagesDir = join(root, 'src', 'pages');
const i18nDir = join(root, 'src', 'i18n');

const DICT_FILES = [
  'clientTranslations.ts',
  'clientTranslationsExtra.ts',
  'clientTranslationsCoverage.ts',
  'clientTranslationsCharter.ts',
  'clientTranslationsMembership.ts',
  'clientTranslationsForms.ts',
  'clientTranslationsManual.ts',
];

const STATIC_PREFIXES = ['/images', '/documents', '/forms', '/favicon', '/research-institute-logo.svg'];

function unescapeJs(str) {
  return str.replace(/\\(['"\\])/g, '$1');
}

function escapeForQuote(str, quoteChar) {
  return str.replace(/\\/g, '\\\\').split(quoteChar).join('\\' + quoteChar);
}

function extractLocaleBlock(text, localeKey) {
  const startRe = new RegExp(`^\\s*['"]${localeKey}['"]\\s*:\\s*\\{\\s*$`, 'm');
  const startMatch = startRe.exec(text);
  const map = {};
  if (!startMatch) return map;
  const rest = text.slice(startMatch.index + startMatch[0].length);
  const lines = rest.split('\n');
  const pairRe = /^\s*(['"])((?:\\.|(?!\1).)*)\1\s*:\s*(['"])((?:\\.|(?!\3).)*)\3\s*,?\s*$/;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '},' || trimmed === '}') break;
    const m = pairRe.exec(line);
    if (m) {
      map[unescapeJs(m[2])] = unescapeJs(m[4]);
    }
  }
  return map;
}

function buildDictionary(localeKey) {
  const merged = {};
  for (const file of DICT_FILES) {
    const text = readFileSync(join(i18nDir, file), 'utf8');
    Object.assign(merged, extractLocaleBlock(text, localeKey));
  }
  return merged;
}

const dictionaries = {
  'zh-cn': buildDictionary('zh-cn'),
  'zh-tw': buildDictionary('zh-tw'),
};

console.log(`zh-cn dictionary: ${Object.keys(dictionaries['zh-cn']).length} keys`);
console.log(`zh-tw dictionary: ${Object.keys(dictionaries['zh-tw']).length} keys`);

const LOOKS_LIKE_PROSE = /[A-Za-z].*[A-Za-z].*\s[A-Za-z]/; // rough heuristic: 2+ words with letters

function translateTagText(content, dict, gaps, ctx) {
  return content.replace(/>([^<>{}][^<>]*)</g, (full, inner) => {
    const trimmed = inner.trim();
    if (!trimmed) return full;
    const translated = dict[trimmed];
    if (translated) {
      return '>' + inner.replace(trimmed, translated) + '<';
    }
    if (LOOKS_LIKE_PROSE.test(trimmed)) gaps.push({ ...ctx, kind: 'tag-text', text: trimmed });
    return full;
  });
}

function translateQuotedStrings(content, dict, gaps, ctx) {
  return content.replace(/(["'])((?:\\.|(?!\1).)*?)\1/g, (full, quote, inner) => {
    const unescaped = unescapeJs(inner);
    const trimmed = unescaped.trim();
    if (!trimmed) return full;
    const translated = dict[trimmed];
    if (translated) {
      const newInner = unescaped.replace(trimmed, translated);
      return quote + escapeForQuote(newInner, quote) + quote;
    }
    if (LOOKS_LIKE_PROSE.test(trimmed) && !trimmed.startsWith('/') && !trimmed.startsWith('.') && !trimmed.startsWith('http')) {
      gaps.push({ ...ctx, kind: 'quoted-string', text: trimmed });
    }
    return full;
  });
}

function localizeHrefs(content, lang) {
  return content.replace(/href(=|:\s*)(["'])(\/[^"']*)\2/g, (full, sep, quote, path) => {
    if (STATIC_PREFIXES.some((p) => path.startsWith(p))) return full;
    if (path.startsWith(`/${lang}`)) return full;
    return `href${sep}${quote}/${lang}${path}${quote}`;
  });
}

const files = globSync('**/*.astro', { cwd: pagesDir })
  .map((f) => f.split('\\').join('/'))
  .filter((f) => !f.startsWith('zh-cn/') && !f.startsWith('zh-tw/'));

const allGaps = [];

for (const relPath of files) {
  const srcPath = join(pagesDir, relPath);
  const source = readFileSync(srcPath, 'utf8');

  const extraUp = '../'.repeat(1); // zh-cn/ or zh-tw/ adds exactly one extra directory level

  for (const lang of ['zh-cn', 'zh-tw']) {
    const dict = dictionaries[lang];
    const ctx = { file: relPath, lang };

    let out = source;
    // fix relative import paths for the extra locale directory level
    out = out.replace(/from\s+(['"])(\.\.\/[^'"]+)\1/g, (_full, quote, path) => `from ${quote}${extraUp}${path}${quote}`);

    out = translateTagText(out, dict, allGaps, ctx);
    out = translateQuotedStrings(out, dict, allGaps, ctx);
    out = localizeHrefs(out, lang);

    const destPath = join(pagesDir, lang, relPath);
    mkdirSync(dirname(destPath), { recursive: true });
    writeFileSync(destPath, out, 'utf8');
  }
}

console.log(`Generated ${files.length * 2} locale pages.`);
console.log(`Gap count: ${allGaps.length}`);

const reportPath = join(root, 'scripts', 'translation-gaps.json');
writeFileSync(reportPath, JSON.stringify(allGaps, null, 2), 'utf8');
console.log(`Gap report written to ${relative(root, reportPath)}`);
