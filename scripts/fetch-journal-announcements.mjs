#!/usr/bin/env node
// Fetches "Call for Papers" announcements from selected Panorama Journals
// (journals.panorama-sg.com, an OJS/PKP platform) and writes them to
// src/data/journalAnnouncements.json for display on the Institute's
// Calls for Papers page. Intended to be run on a schedule (see
// .github/workflows/fetch-journal-announcements.yml) and safe to re-run —
// it only overwrites the output file, it never touches the source site.

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'journalAnnouncements.json');

// Journals to poll for announcements. Each maps to a journal on
// journals.panorama-sg.com whose scope is directly relevant to a Panorama
// Research Institute research center. Add more { slug, name } entries here
// to pull in additional journals.
const JOURNALS = [
  { slug: 'afs', name: 'AI & Future Society' },
];

const BASE_URL = 'https://journals.panorama-sg.com';
const MAX_ITEMS_PER_JOURNAL = 6;
const MAX_ITEMS_TOTAL = 8;
const CFP_TITLE_PATTERN = /\bcall for\b/i;

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
}

function parseAnnouncements(html, journal) {
  const results = [];
  const articleRe = /<article class="announcement-summary media">([\s\S]*?)<\/article>/g;
  let match;
  while ((match = articleRe.exec(html)) !== null) {
    const block = match[1];

    const linkMatch = block.match(/<h2 class="media-heading">\s*<a href="([^"]+)">([\s\S]*?)<\/a>/);
    if (!linkMatch) continue;
    const url = linkMatch[1].trim();
    const title = stripTags(linkMatch[2]);

    const dateMatch = block.match(/<p class="date">([\s\S]*?)<\/p>/);
    const date = dateMatch ? stripTags(dateMatch[1]).replace(/^.*?(\d{4}-\d{2}-\d{2}).*$/, '$1') : '';

    const descBlockMatch = block.match(/<p class="date">[\s\S]*?<\/p>\s*<p>([\s\S]*?)<\/p>/);
    const summary = descBlockMatch ? stripTags(descBlockMatch[1]) : '';

    results.push({ journal: journal.name, journalSlug: journal.slug, title, url, date, summary });
  }
  return results;
}

async function fetchJournalAnnouncements(journal) {
  const listUrl = `${BASE_URL}/index.php/${journal.slug}/announcement`;
  const res = await fetch(listUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PanoramaResearchInstituteBot/1.0)' },
  });
  if (!res.ok) {
    throw new Error(`Fetch failed for ${listUrl}: HTTP ${res.status}`);
  }
  const html = await res.text();
  const all = parseAnnouncements(html, journal);
  const cfps = all.filter((item) => CFP_TITLE_PATTERN.test(item.title));
  return cfps.slice(0, MAX_ITEMS_PER_JOURNAL);
}

async function main() {
  const items = [];
  for (const journal of JOURNALS) {
    try {
      const found = await fetchJournalAnnouncements(journal);
      items.push(...found);
      console.log(`[fetch-journal-announcements] ${journal.slug}: ${found.length} call(s) for papers found`);
    } catch (err) {
      console.error(`[fetch-journal-announcements] Failed to fetch ${journal.slug}:`, err.message);
    }
  }

  items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  const trimmed = items.slice(0, MAX_ITEMS_TOTAL);

  const output = {
    fetchedAt: new Date().toISOString(),
    source: `${BASE_URL}/`,
    items: trimmed,
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n', 'utf-8');
  console.log(`[fetch-journal-announcements] Wrote ${trimmed.length} item(s) to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

main().catch((err) => {
  console.error('[fetch-journal-announcements] Fatal error:', err);
  process.exitCode = 1;
});
