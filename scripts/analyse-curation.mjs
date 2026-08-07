#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { descriptorDistance } from "../prototype/src/perception.js";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/analyse-curation.mjs <curation-export.json> [output-prefix]");
  process.exit(1);
}
const outputPrefix = process.argv[3] || input.replace(/\.json$/i, "-analysis");
const data = JSON.parse(fs.readFileSync(input, "utf8"));
if (data.schema !== "tsdne-curation-export-v2" || !Array.isArray(data.records)) {
  throw new Error("Input is not a TSDNE curation export v2.");
}
const records = [...data.records].sort((a,b) => a.ordinal-b.ordinal);
const ratings = ["ok", "not-ok", "repetitive"];
const countRating = (value) => records.filter((r) => r.rating === value).length;
const safeRate = (n,d) => d ? n/d : null;
const round = (v,d=4) => Number.isFinite(v) ? Number(v.toFixed(d)) : null;
const mean = (xs) => xs.length ? xs.reduce((a,b)=>a+b,0)/xs.length : null;

function dimension(keyFn) {
  const groups = new Map();
  for (const record of records) {
    const key = keyFn(record) || "unknown";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return [...groups.entries()].map(([key, items]) => {
    const ok = items.filter((r)=>r.rating==="ok").length;
    const no = items.filter((r)=>r.rating==="not-ok").length;
    const repetitive = items.filter((r)=>r.rating==="repetitive").length;
    return {
      key, n: items.length, ok, notOk: no, repetitive,
      acceptable: ok + repetitive,
      acceptableRate: round(safeRate(ok+repetitive, items.length)),
      notOkRate: round(safeRate(no, items.length)),
      repetitiveRate: round(safeRate(repetitive, items.length)),
    };
  }).sort((a,b) => b.n-a.n || a.key.localeCompare(b.key));
}

function nearestHistory(record) {
  const current = record.encounter?.candidate?.perception;
  const history = record.encounter?.audit?.historyBeforeSelection?.recentTraces || [];
  if (!current || !history.length) return null;
  const distances = history
    .map((trace, index) => ({ index, family: trace.family, distance: descriptorDistance(current, trace.perception) }))
    .sort((a,b)=>a.distance-b.distance);
  return distances[0] || null;
}

const repetitionDiagnostics = records
  .filter((r)=>r.rating==="repetitive")
  .map((r) => ({
    ordinal: r.ordinal,
    sessionNumber: r.sessionNumber,
    family: r.encounter?.candidate?.family,
    category: r.encounter?.candidate?.category,
    selectorNovelty: round(r.encounter?.audit?.selectedScore?.novelty),
    nearestHistory: nearestHistory(r),
    comment: r.comment || "",
  }));

const selectorMetrics = ["score","novelty","complexity","family","mode"].map((metric) => {
  const byRating = Object.fromEntries(ratings.map((rating) => {
    const values = records.filter((r)=>r.rating===rating)
      .map((r)=>r.encounter?.audit?.selectedScore?.[metric])
      .filter(Number.isFinite);
    return [rating, { n: values.length, mean: round(mean(values)) }];
  }));
  return { metric, byRating };
});

const rejectionStages = {};
for (const record of records) {
  for (const attempt of record.encounter?.audit?.attempts || []) {
    if (attempt.accepted) continue;
    const stage = attempt.stage || "unknown";
    rejectionStages[stage] = (rejectionStages[stage] || 0) + 1;
    for (const reason of attempt.reasons || []) {
      const key = `${stage}:${reason}`;
      rejectionStages[key] = (rejectionStages[key] || 0) + 1;
    }
  }
}

const sessions = (data.sessions || []).map((session) => {
  const items = records.filter((r)=>r.sessionId===session.sessionId);
  return {
    sessionNumber: session.sessionOrdinal,
    sessionId: session.sessionId,
    startedAt: session.startedAt,
    build: session.build,
    n: items.length,
    ok: items.filter((r)=>r.rating==="ok").length,
    notOk: items.filter((r)=>r.rating==="not-ok").length,
    repetitive: items.filter((r)=>r.rating==="repetitive").length,
    meanDisplayDurationMs: round(mean(items.map((r)=>r.displayDurationMs).filter(Number.isFinite)),1),
  };
});

const ok = countRating("ok");
const notOk = countRating("not-ok");
const repetitive = countRating("repetitive");
const analysis = {
  schema: "tsdne-curation-analysis-v2",
  analysedAt: new Date().toISOString(),
  input: path.resolve(input),
  counts: { total: records.length, ok, notOk, repetitive },
  rates: {
    acceptable: round(safeRate(ok + repetitive, records.length)),
    notOk: round(safeRate(notOk, records.length)),
    repetitive: round(safeRate(repetitive, records.length)),
  },
  sessions,
  byCategory: dimension((r)=>r.encounter?.candidate?.category),
  byFamily: dimension((r)=>r.encounter?.candidate?.family),
  byColourMode: dimension((r)=>r.encounter?.candidate?.colorMode),
  byFinish: dimension((r)=>r.encounter?.candidate?.finish),
  repetitionDiagnostics,
  selectorMetrics,
  rejectionStages,
  comments: records.filter((r)=>r.comment).map((r)=>({ ordinal:r.ordinal,rating:r.rating,family:r.encounter?.candidate?.family,comment:r.comment })),
  interpretation: [
    "OK and repetitive are both intrinsically acceptable outputs; repetitive additionally marks a sequence-level failure.",
    "Not-OK judgements diagnose generator/visual failures, not population preference.",
    "Repetitive judgements diagnose the production anti-repetition system and its perceptual descriptor against explicit artist judgement.",
    "Rates are descriptive for this artist-led production audit; they are not population estimates.",
    "Curation labels never altered generation online. Revisions belong to later, explicitly versioned generator epochs.",
  ],
};

function pct(v){return v==null?"—":`${(v*100).toFixed(1)}%`;}
function table(headers, rows){return [`| ${headers.join(" | ")} |`,`| ${headers.map(()=>"---").join(" | ")} |`,...rows.map(r=>`| ${r.join(" | ")} |`)].join("\n");}
function dimensionTable(items){return table(["Group","N","OK","not OK","repetitive","acceptable","repetitive rate"],items.map(x=>[x.key,x.n,x.ok,x.notOk,x.repetitive,pct(x.acceptableRate),pct(x.repetitiveRate)]));}

const report = `# TSDNE curation audit analysis

**Analysed:** ${analysis.analysedAt}  
**Ratings:** ${records.length}  
**OK:** ${ok}  
**not OK:** ${notOk}  
**repetitive:** ${repetitive}

## Overall

Intrinsic acceptability (OK + repetitive): **${pct(analysis.rates.acceptable)}**.  
Not-OK rate: **${pct(analysis.rates.notOk)}**.  
Sequence-repetition rate: **${pct(analysis.rates.repetitive)}**.

These are descriptive artist-curation rates, not population estimates.

## Categories

${dimensionTable(analysis.byCategory)}

## Families

${dimensionTable(analysis.byFamily)}

## Colour modes

${dimensionTable(analysis.byColourMode)}

## Finishes

${dimensionTable(analysis.byFinish)}

## Repetitive judgements

${repetitionDiagnostics.length ? repetitionDiagnostics.map(x=>`- **${x.ordinal} · ${x.family}:** selector novelty ${x.selectorNovelty ?? "—"}; nearest stored perceptual trace ${x.nearestHistory ? x.nearestHistory.distance.toFixed(4) : "—"}${x.comment ? `; ${x.comment}` : ""}`).join("\n") : "No repetitive judgements recorded."}

## Technical rejection funnel

${Object.keys(rejectionStages).length ? table(["Stage/reason","Count"],Object.entries(rejectionStages).sort((a,b)=>b[1]-a[1]).map(([k,v])=>[k,v])) : "No rejection data recorded."}

## Comments

${analysis.comments.length ? analysis.comments.map(x=>`- **${x.ordinal} · ${x.rating} · ${x.family}:** ${x.comment}`).join("\n") : "No comments recorded."}

## Interpretation

- OK and repetitive are both individually acceptable outputs.
- not OK diagnoses the generator or rendering result.
- repetitive diagnoses sequence-level anti-repetition failure.
- The audit is first-person production evidence, not a user-preference study.
- Use associations to guide inspectable authored revisions; do not convert the corpus into an opaque online recommender.
`;

fs.writeFileSync(`${outputPrefix}.json`, JSON.stringify(analysis,null,2));
fs.writeFileSync(`${outputPrefix}.md`, report);
console.log(`Wrote ${outputPrefix}.json and ${outputPrefix}.md`);
