#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/analyse-curation.mjs <curation-export.json> [output-prefix]");
  process.exit(1);
}

const outputPrefix = process.argv[3] || input.replace(/\.json$/i, "-analysis");
const data = JSON.parse(fs.readFileSync(input, "utf8"));
if (data.schema !== "tsdne-curation-export-v1" || !Array.isArray(data.records)) {
  throw new Error("Input is not a TSDNE curation export.");
}

const records = data.records;
const labelled = records.filter((record) => ["interesting", "not-interesting"].includes(record.rating));
const positive = labelled.filter((record) => record.rating === "interesting");
const negative = labelled.filter((record) => record.rating === "not-interesting");
const skipped = records.filter((record) => record.rating === "skip");
const traitKeys = [
  "scale", "tempo", "density", "turbulence", "contrast", "palette",
  "complexity", "rotation", "symmetry", "softness", "drift", "depth",
];

const mean = (values) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
const variance = (values) => {
  if (values.length < 2) return 0;
  const m = mean(values);
  return values.reduce((sum, value) => sum + (value - m) ** 2, 0) / (values.length - 1);
};
const sd = (values) => Math.sqrt(variance(values));
const round = (value, digits = 4) => value === null || !Number.isFinite(value) ? null : Number(value.toFixed(digits));

function wilson(successes, total, z = 1.96) {
  if (!total) return { rate: null, low: null, high: null };
  const p = successes / total;
  const denominator = 1 + (z * z) / total;
  const centre = (p + (z * z) / (2 * total)) / denominator;
  const margin = z * Math.sqrt((p * (1 - p) + (z * z) / (4 * total)) / total) / denominator;
  return { rate: p, low: Math.max(0, centre - margin), high: Math.min(1, centre + margin) };
}

function cohenD(a, b) {
  if (a.length < 2 || b.length < 2) return null;
  const pooled = Math.sqrt(((a.length - 1) * variance(a) + (b.length - 1) * variance(b)) / (a.length + b.length - 2));
  return pooled ? (mean(a) - mean(b)) / pooled : 0;
}

function numeric(record, accessor) {
  const value = accessor(record);
  return Number.isFinite(value) ? value : null;
}

function metricEffect(name, accessor) {
  const pos = positive.map((record) => numeric(record, accessor)).filter((value) => value !== null);
  const neg = negative.map((record) => numeric(record, accessor)).filter((value) => value !== null);
  return {
    metric: name,
    interestingN: pos.length,
    notInterestingN: neg.length,
    interestingMean: round(mean(pos)),
    notInterestingMean: round(mean(neg)),
    difference: round((mean(pos) ?? 0) - (mean(neg) ?? 0)),
    cohenD: round(cohenD(pos, neg)),
  };
}

const families = [...new Set(records.map((record) => record.candidate?.family).filter(Boolean))].sort();
const familyResults = families.map((family) => {
  const familyRecords = records.filter((record) => record.candidate?.family === family);
  const familyLabelled = familyRecords.filter((record) => ["interesting", "not-interesting"].includes(record.rating));
  const successes = familyLabelled.filter((record) => record.rating === "interesting").length;
  const interval = wilson(successes, familyLabelled.length);
  return {
    family,
    total: familyRecords.length,
    labelled: familyLabelled.length,
    interesting: successes,
    notInteresting: familyLabelled.length - successes,
    skipped: familyRecords.filter((record) => record.rating === "skip").length,
    rate: round(interval.rate),
    ci95Low: round(interval.low),
    ci95High: round(interval.high),
    meanViewingMs: round(mean(familyRecords.map((record) => record.displayDurationMs).filter(Number.isFinite)), 1),
    comments: familyRecords.filter((record) => record.comment).map((record) => record.comment),
  };
}).sort((a, b) => (b.rate ?? -1) - (a.rate ?? -1));

const effects = [
  ...traitKeys.map((key) => metricEffect(`trait.${key}`, (record) => record.candidate?.graph?.traits?.[key])),
  metricEffect("selection.score", (record) => record.selection?.score),
  metricEffect("selection.novelty", (record) => record.selection?.novelty),
  metricEffect("selection.complexity", (record) => record.selection?.complexity),
  metricEffect("selection.family", (record) => record.selection?.family),
  metricEffect("estimatedCost", (record) => record.candidate?.estimatedCost),
  metricEffect("perception.mean", (record) => record.candidate?.perception?.mean),
  metricEffect("perception.variance", (record) => record.candidate?.perception?.variance),
  metricEffect("perception.edge", (record) => record.candidate?.perception?.edge),
  metricEffect("perception.saturation", (record) => record.candidate?.perception?.saturation),
  metricEffect("perception.temporal", (record) => record.candidate?.perception?.temporal),
  metricEffect("displayDurationMs", (record) => record.displayDurationMs),
].sort((a, b) => Math.abs(b.cohenD ?? 0) - Math.abs(a.cohenD ?? 0));

const overall = wilson(positive.length, labelled.length);
const analysis = {
  schema: "tsdne-curation-analysis-v1",
  analysedAt: new Date().toISOString(),
  input: path.resolve(input),
  counts: {
    total: records.length,
    labelled: labelled.length,
    interesting: positive.length,
    notInteresting: negative.length,
    skipped: skipped.length,
  },
  overallInterestingRate: {
    rate: round(overall.rate),
    ci95Low: round(overall.low),
    ci95High: round(overall.high),
  },
  familyResults,
  effects,
  comments: records.filter((record) => record.comment).map((record) => ({
    ordinal: record.ordinal,
    rating: record.rating,
    family: record.candidate?.family,
    comment: record.comment,
  })),
  interpretationRules: [
    "Treat explicit interesting/not-interesting ratings as labels.",
    "Treat skips as missing judgements, not negative labels.",
    "Treat viewing duration and comments as contextual evidence, not inferred preference.",
    "Do not optimise directly from 250 observations without visual review and held-out validation.",
    "Family rates with small samples are uncertain; use Wilson intervals rather than raw rank alone.",
    "Trait and descriptor effects are observational because the deployed selector changes the sampled distribution.",
  ],
};

const percent = (value) => value === null ? "—" : `${(value * 100).toFixed(1)}%`;
const table = (headers, rows) => [
  `| ${headers.join(" | ")} |`,
  `| ${headers.map(() => "---").join(" | ")} |`,
  ...rows.map((row) => `| ${row.join(" | ")} |`),
].join("\n");

const report = `# TSDNE curation analysis

**Analysed:** ${analysis.analysedAt}  
**Records:** ${records.length}  
**Explicitly labelled:** ${labelled.length}  
**Interesting:** ${positive.length}  
**Not interesting:** ${negative.length}  
**Skipped:** ${skipped.length}

## Overall

Explicit interesting rate: **${percent(overall.rate)}** (95% Wilson interval ${percent(overall.low)}–${percent(overall.high)}).

## Visual families

${table(
  ["Family", "N", "Interesting", "Not", "Skip", "Rate", "95% interval"],
  familyResults.map((item) => [
    item.family,
    item.total,
    item.interesting,
    item.notInteresting,
    item.skipped,
    percent(item.rate),
    `${percent(item.ci95Low)}–${percent(item.ci95High)}`,
  ]),
)}

## Strongest measured differences

Positive Cohen's d means the metric was higher among explicitly interesting shaders; negative values mean it was lower. These are observational associations, not causal effects.

${table(
  ["Metric", "Interesting mean", "Not-interesting mean", "Difference", "Cohen's d"],
  effects.map((item) => [
    item.metric,
    item.interestingMean ?? "—",
    item.notInterestingMean ?? "—",
    item.difference ?? "—",
    item.cohenD ?? "—",
  ]),
)}

## Comments

${analysis.comments.length ? analysis.comments.map((item) => `- **${item.ordinal} · ${item.rating} · ${item.family}:** ${item.comment}`).join("\n") : "No comments were recorded."}

## Interpretation constraints

- Explicit ratings are the only labels.
- Skips are not negative judgements.
- Viewing duration is contextual, not an inferred preference.
- The selector shapes which candidates are observed, so trait and descriptor associations are not independent causal estimates.
- Family rankings should be read with their uncertainty intervals and alongside comments and direct visual review.
- Any generator revision should be evaluated on a held-out batch rather than judged only on the same 250 ratings.
`;

fs.writeFileSync(`${outputPrefix}.json`, JSON.stringify(analysis, null, 2));
fs.writeFileSync(`${outputPrefix}.md`, report);
console.log(`Wrote ${outputPrefix}.json and ${outputPrefix}.md`);
