#!/usr/bin/env node
// Looks for newly published articles in the Panorama journals
// (journals.panorama-sg.com, an OJS/PKP platform) via the standard OAI-PMH
// interface and records the ones not yet listed in
// src/data/journalArticles.ts into src/data/journalArticleCandidates.json.
//
// Nothing here is shown on the website. A maintainer reviews each candidate,
// and if the Institute sponsored it, adds it to journalArticles.ts together
// with the sponsorship number, research center(s) and whether Institute
// members are among the authors (OAI does not carry that information).
// Safe to re-run: it only rewrites the candidates file.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const CURATED_PATH = path.join(DATA_DIR, 'journalArticles.ts');
const OUTPUT_PATH = path.join(DATA_DIR, 'journalArticleCandidates.json');

// Journals to poll: the URL path segment of each journal. Add new journals here.
const JOURNALS = ['hndh', 'Resonance', 'pemr'];
const BASE_URL = 'https://journals.panorama-sg.com';

const decode = (t) =>
  t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'").replace(/&amp;/g, '&').trim();

const all = (xml, tag) =>
  [...xml.matchAll(new RegExp(`<dc:${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</dc:${tag}>`, 'g'))].map((m) => decode(m[1]));

// "Wang, Qilong" -> "Qilong Wang"
const flipName = (n) => (n.includes(',') ? n.split(',').slice(1).join(',').trim() + ' ' + n.split(',')[0].trim() : n);

async function fetchRecords(slug) {
  const records = [];
  let url = `${BASE_URL}/${slug}/oai?verb=ListRecords&metadataPrefix=oai_dc`;
  while (url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
    const xml = await res.text();
    for (const m of xml.matchAll(/<record>([\s\S]*?)<\/record>/g)) {
      if (/<header[^>]*status="deleted"/.test(m[1])) continue;
      records.push(m[1]);
    }
    const token = xml.match(/<resumptionToken[^>]*>([^<]+)<\/resumptionToken>/);
    url = token ? `${BASE_URL}/${slug}/oai?verb=ListRecords&resumptionToken=${encodeURIComponent(token[1])}` : null;
  }
  return records;
}

function toCandidate(record) {
  const doi = all(record, 'identifier').find((i) => /^10\./.test(i));
  const url = all(record, 'identifier').find((i) => /^https?:\/\//.test(i));
  const title = all(record, 'title')[0];
  if (!doi || !url || !title) return null;
  // e.g. "Health Nexus: ...; Vol. 1 No. 1 (2026); 14-36"
  const source = all(record, 'source')[0] ?? '';
  const sm = source.match(/^(.*?);\s*Vol\.\s*(\d+)\s*No\.\s*(\d+)\s*\((\d{4})\);\s*(.+)$/);
  return {
    title,
    authors: all(record, 'creator').map(flipName).join(', '),
    journal: sm ? sm[1] : (all(record, 'publisher')[0] ?? ''),
    volume: sm ? `Vol. ${sm[2]}, No. ${sm[3]}` : '',
    pages: sm ? sm[5].replace('-', '–') : '',
    year: sm ? sm[4] : (all(record, 'date')[0] ?? '').slice(0, 4),
    doi,
    url,
    published: all(record, 'date')[0] ?? '',
  };
}

const curated = await readFile(CURATED_PATH, 'utf8');
const known = new Set([...curated.matchAll(/doi:\s*"([^"]+)"/g)].map((m) => m[1].toLowerCase()));

const candidates = [];
for (const slug of JOURNALS) {
  try {
    for (const rec of await fetchRecords(slug)) {
      const c = toCandidate(rec);
      if (c && !known.has(c.doi.toLowerCase())) candidates.push(c);
    }
  } catch (err) {
    // Keep going; one unreachable journal should not wipe the others.
    console.error(`Skipping ${slug}: ${err.message}`);
    process.exitCode = 1;
  }
}
candidates.sort((a, b) => b.published.localeCompare(a.published));

let previous = '';
try { previous = await readFile(OUTPUT_PATH, 'utf8'); } catch {}
const next = JSON.stringify({ source: BASE_URL, candidates }, null, 2) + '\n';
if (next !== previous) await writeFile(OUTPUT_PATH, next);
console.log(`${candidates.length} candidate article(s) not yet in journalArticles.ts.`);
