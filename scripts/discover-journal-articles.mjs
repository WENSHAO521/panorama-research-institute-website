#!/usr/bin/env node
// Looks for newly published articles in the Panorama journals from two sources:
//   1. Crossref (all works registered under the Panorama DOI prefix, so new
//      journals are picked up automatically), and
//   2. the journals' own OAI-PMH interface (journals.panorama-sg.com, an
//      OJS/PKP platform), which lists articles before their DOIs reach Crossref.
// Articles found in either source are merged by DOI and recorded the ones not yet listed in
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

// Journals polled via OAI-PMH: the URL path segment of each journal. Crossref
// needs no list. Add a journal here only to see its articles before Crossref does.
const JOURNALS = ['hndh', 'Resonance', 'pemr'];
const BASE_URL = 'https://journals.panorama-sg.com';
const DOI_PREFIX = '10.63802';
// The Institute was established in 2026; earlier articles cannot be Institute-sponsored.
const MIN_YEAR = 2026;
// The Institute's ROR ID (e.g. "05gq02987", or the full https://ror.org/... URL).
// When set, Crossref is also searched for articles by authors affiliated with
// the Institute in ANY journal, not just Panorama's. Matching by ROR rather
// than by name matters: unrelated organizations are also called "Panorama
// Research Institute". Can be overridden with the INSTITUTE_ROR_ID env var.
const INSTITUTE_ROR_ID = process.env.INSTITUTE_ROR_ID ?? '';

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

async function fetchJournalName(slug) {
  const res = await fetch(`${BASE_URL}/${slug}/oai?verb=Identify`);
  if (!res.ok) throw new Error(`Identify ${slug} -> HTTP ${res.status}`);
  const m = (await res.text()).match(/<repositoryName>([^<]+)<\/repositoryName>/);
  return m ? decode(m[1]) : '';
}

function toCandidate(record, journalName) {
  const doi = all(record, 'identifier').find((i) => /^10\./.test(i));
  const url = all(record, 'identifier').find((i) => /^https?:\/\//.test(i));
  const title = all(record, 'title')[0];
  if (!doi || !url || !title) return null;
  // dc:source can repeat (ISSN, DOI prefix, ...). The citation line looks like
  // "Health Nexus: ...; Vol. 1 No. 1 (2026); 14-36" or, for issues with a title,
  // "Journal; Vol. 2 No. 1 (2026): Issue title; 7-16".
  let sm = null;
  for (const source of all(record, 'source')) {
    sm = source.match(/^(.*?);\s*Vol\.\s*(\d+)\s*No\.\s*(\d+)\s*\((\d{4})\)(?::[^;]*)?;\s*(.+)$/);
    if (sm) break;
  }
  return {
    title,
    authors: all(record, 'creator').map(flipName).join(', '),
    journal: sm ? sm[1] : (journalName || all(record, 'publisher')[0] || ''),
    volume: sm ? `Vol. ${sm[2]}, No. ${sm[3]}` : '',
    pages: sm ? sm[5].replace('-', '–') : '',
    year: sm ? sm[4] : (all(record, 'date')[0] ?? '').slice(0, 4),
    doi,
    url,
    published: all(record, 'date')[0] ?? '',
  };
}

const stripTags = (t) => decode(String(t ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' '));

async function fetchCrossref(filter, extra = {}) {
  const out = [];
  let cursor = '*';
  for (;;) {
    const url = `https://api.crossref.org/works?filter=${filter},type:journal-article&rows=500&cursor=${encodeURIComponent(cursor)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Crossref -> HTTP ${res.status}`);
    const { message } = await res.json();
    if (!message.items.length) break;
    for (const w of message.items) {
      const [y, m = 1, d = 1] = w.issued?.['date-parts']?.[0] ?? w.created?.['date-parts']?.[0] ?? [];
      out.push({
        title: stripTags(w.title?.[0]),
        authors: (w.author ?? []).map((a) => [a.given, a.family].filter(Boolean).join(' ') || a.name).join(', '),
        journal: stripTags(w['container-title']?.[0]),
        volume: w.volume ? `Vol. ${w.volume}${w.issue ? `, No. ${w.issue}` : ''}` : '',
        pages: (w.page ?? '').replace('-', '–'),
        year: y ? String(y) : '',
        doi: w.DOI,
        url: w.resource?.primary?.URL ?? w.URL,
        published: y ? `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` : '',
        ...extra,
      });
    }
    cursor = message['next-cursor'];
    if (!cursor || message.items.length < 500) break;
  }
  return out;
}

const curated = await readFile(CURATED_PATH, 'utf8');
const known = new Set([...curated.matchAll(/doi:\s*"([^"]+)"/g)].map((m) => m[1].toLowerCase()));

let failed = false;
const byDoi = new Map();
try {
  for (const c of await fetchCrossref(`prefix:${DOI_PREFIX}`)) if (c.title && c.doi) byDoi.set(c.doi.toLowerCase(), c);
  const ror = INSTITUTE_ROR_ID.replace(/^https?:\/\/ror\.org\//, '');
  if (ror) {
    // Articles with Institute-affiliated authors, from any publisher.
    for (const c of await fetchCrossref(`ror-id:${ror},from-pub-date:${MIN_YEAR}-01-01`, { matchedByRor: true })) {
      const key = c.doi.toLowerCase();
      if (c.title && c.doi && !byDoi.has(key)) byDoi.set(key, c);
    }
  }
} catch (err) {
  console.error(`Crossref failed: ${err.message}`);
  failed = true;
}
for (const slug of JOURNALS) {
  try {
    const journalName = await fetchJournalName(slug);
    for (const rec of await fetchRecords(slug)) {
      const c = toCandidate(rec, journalName);
      if (c) byDoi.set(c.doi.toLowerCase(), c); // OAI data is authoritative for DOI casing and URLs
    }
  } catch (err) {
    // Keep checking the other journals, but do not rewrite the candidates file afterwards.
    console.error(`Failed to read ${slug}: ${err.message}`);
    failed = true;
  }
}
if (failed) {
  console.error('At least one source could not be read; leaving journalArticleCandidates.json unchanged.');
  process.exit(1);
}
const candidates = [...byDoi.entries()].filter(([doi, c]) => !known.has(doi) && Number(c.year) >= MIN_YEAR).map(([, c]) => c);
candidates.sort((a, b) => b.published.localeCompare(a.published));

let previous = '';
try { previous = await readFile(OUTPUT_PATH, 'utf8'); } catch {}
const next = JSON.stringify({ source: BASE_URL, candidates }, null, 2) + '\n';
if (next !== previous) await writeFile(OUTPUT_PATH, next);
console.log(`${candidates.length} candidate article(s) not yet in journalArticles.ts.`);
