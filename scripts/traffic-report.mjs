#!/usr/bin/env node
// Weekly traffic worklog for the Chinese and Japanese sites, from Vercel
// observability data. Writes docs/seo/worklog/traffic-<date>.md and prints it.
//
//   node scripts/traffic-report.mjs            # last 7 days
//   node scripts/traffic-report.mjs 28d        # last 28 days
//
// Needs the Vercel CLI logged in to the team that owns the project
// (`vercel login`). Page views come from Web Analytics; "human requests" are
// server-side HTML requests that Vercel did not classify as a bot, so they also
// count visitors whose browsers block the analytics script.
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SINCE = process.argv[2] || '7d';
const SCOPE = process.env.VERCEL_SCOPE || 'pro-design';
const PROJECT = process.env.VERCEL_PROJECT || 'norgetravel';
const LANGS = ['zh', 'ja', 'en'];
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Where a visit came from, by referrer hostname
const SOURCES = [
  ['Baidu', /(^|\.)baidu\.com$/],
  ['Sogou', /(^|\.)sogou\.com$/],
  ['360 Search', /(^|\.)so\.com$/],
  ['Shenma', /(^|\.)sm\.cn$/],
  ['Yahoo Japan', /(^|\.)yahoo\.co\.jp$/],
  ['Google', /(^|\.)google\.[a-z.]+$/],
  ['Bing', /(^|\.)bing\.com$/],
  ['Yahoo', /(^|\.)yahoo\.com$/],
  ['DuckDuckGo', /duckduckgo\.com$/],
  ['Ecosia', /ecosia\.org$/],
  ['Naver', /naver\.com$/],
  ['ChatGPT', /(chatgpt\.com|openai\.com)$/],
  ['Perplexity', /perplexity\.ai$/],
  ['Copilot', /copilot\.microsoft\.com$/],
  ['Gemini', /gemini\.google\.com$/],
  ['Doubao', /doubao\.com$/],
  ['Kimi', /(kimi\.com|moonshot\.cn)$/],
  ['DeepSeek', /deepseek\.com$/],
  ['Ernie', /yiyan\.baidu\.com$/],
  ['Xiaohongshu', /xiaohongshu\.com$/],
  ['Mafengwo', /mafengwo\.cn$/],
  ['WeChat', /weixin\.qq\.com$/],
  ['note.com', /note\.com$/],
  ['4travel', /4travel\.jp$/],
];
const source = (host) => {
  if (!host) return 'direct or unknown';
  const hit = SOURCES.find(([, re]) => re.test(host));
  return hit ? hit[0] : host;
};

function query(metric, filter, groupBy, limit = 25) {
  const args = [
    'vercel', 'metrics', metric, '--scope', SCOPE, '--project', PROJECT, '--since', SINCE,
    '-g', '1d', '-F', 'json', '--limit', String(limit), ...groupBy.flatMap((g) => ['--group-by', g]),
  ];
  if (filter) args.push('-f', `"${filter}"`);
  const out = execSync(args.join(' '), { encoding: 'utf8', timeout: 180000, stdio: ['ignore', 'pipe', 'pipe'] });
  const json = JSON.parse(out.slice(out.indexOf('{')));
  if (json.error) throw new Error(json.error.message);
  return (json.summary || []).map((row) => {
    const key = Object.keys(row).find((k) => k.endsWith('_sum'));
    const dims = Object.entries(row).filter(([k]) => k !== key).map(([, v]) => v);
    return { dims, value: Number(row[key]) };
  });
}
const total = (rows) => rows.reduce((s, r) => s + r.value, 0);

const lines = [];
const out = (s = '') => { lines.push(s); console.log(s); };
const table = (header, rows, label = (r) => r.dims.map((d) => d ?? '(none)').join(' / ')) => {
  out(`| ${header} | ${SINCE} |`);
  out('|---|---:|');
  if (!rows.length) out('| (nothing recorded) | 0 |');
  for (const r of rows) out(`| ${label(r)} | ${r.value} |`);
  out();
};

const today = new Date().toISOString().slice(0, 10);
out(`# Traffic worklog ${today} (last ${SINCE})`);
out();
out(`Source: Vercel observability for project ${PROJECT}. Page views need the analytics script to run in the browser; human requests are server-side HTML requests not classified as bots, so they are the better count for China, where that script may be blocked.`);
out();

const prefix = (lang) => `startswith(request_path,'/${lang}')`;
const human = (lang) => `${prefix(lang)} and content_type eq 'text/html' and bot_category eq null`;

out('## Summary');
out();
out('| Site | Page views | Human HTML requests | Search engine visits | AI assistant visits |');
out('|---|---:|---:|---:|---:|');
const summaries = {};
for (const lang of LANGS) {
  const views = query('vercel.analytics_pageview.count', prefix(lang), ['country']);
  const refs = query('vercel.analytics_pageview.count', prefix(lang), ['referrer_hostname'], 50);
  const humans = query('vercel.request.count', human(lang), ['client_ip_country']);
  const bySource = {};
  for (const r of refs) { const s = source(r.dims[0]); bySource[s] = (bySource[s] ?? 0) + r.value; }
  const engines = ['Baidu', 'Sogou', '360 Search', 'Shenma', 'Yahoo Japan', 'Google', 'Bing', 'Yahoo', 'DuckDuckGo', 'Ecosia', 'Naver'];
  const assistants = ['ChatGPT', 'Perplexity', 'Copilot', 'Gemini', 'Doubao', 'Kimi', 'DeepSeek', 'Ernie'];
  const sum = (names) => names.reduce((s, n) => s + (bySource[n] ?? 0), 0);
  summaries[lang] = { views, refs, humans, bySource };
  out(`| /${lang}/ | ${total(views)} | ${total(humans)} | ${sum(engines)} | ${sum(assistants)} |`);
}
out();

for (const lang of LANGS) {
  const { views, humans, bySource } = summaries[lang];
  out(`## /${lang}/`);
  out();
  table(`Page views by country`, views);
  table(`Human HTML requests by country`, humans);
  const sources = Object.entries(bySource).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ dims: [k], value: v }));
  table(`Page views by source`, sources);
  table(`Top pages (page views)`, query('vercel.analytics_pageview.count', prefix(lang), ['request_path'], 15));
}

// LLM visibility: an assistant that fetches a page is using it to answer someone.
// chatgpt-user is ChatGPT fetching for a user's question; gpt-actions is GPT
// actions; perplexitybot, claudebot and bytespider (Doubao) show up here too.
const AI = "content_type eq 'text/html' and (bot_category eq 'ai_assistant' or bot_category eq 'ai_crawler')";
out('## AI assistants reading the site (HTML fetches)');
out();
table('By assistant', query('vercel.request.count', AI, ['bot_name'], 20));
for (const lang of LANGS) {
  table(`Pages fetched by AI assistants on /${lang}/`, query('vercel.request.count', `${prefix(lang)} and ${AI}`, ['request_path'], 15));
}

out('## Crawlers (whole site, HTML requests)');
out();
table('By bot name', query('vercel.request.count', "content_type eq 'text/html' and bot_category ne null", ['bot_name'], 30));
for (const lang of ['zh', 'ja']) {
  table(`Bots on /${lang}/`, query('vercel.request.count', `${prefix(lang)} and content_type eq 'text/html' and bot_category ne null`, ['bot_name'], 15));
}
const watch = ['baiduspider', 'bingbot', 'googlebot', 'yandexbot', 'bytespider', 'petalbot', 'sogou', '360spider', 'yisouspider', 'gptbot', 'chatgpt-user', 'claudebot', 'perplexitybot'];
const bots = query('vercel.request.count', "content_type eq 'text/html' and bot_category ne null", ['bot_name'], 200);
out('Watch list (0 means the engine is not crawling the site):');
out();
for (const name of watch) {
  const hit = bots.find((b) => String(b.dims[0]).toLowerCase().includes(name));
  out(`- ${name}: ${hit ? hit.value : 0}`);
}
out();

const file = join(ROOT, 'docs', 'seo', 'worklog', `traffic-${today}.md`);
mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, lines.join('\n') + '\n');
console.log(`\nwritten ${file}`);
