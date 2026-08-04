export const MODEL_CATALOG = [
  {
    id: "SmolLM2-360M-Instruct-q4f16_1-MLC",
    label: "SmolLM2 360M",
    downloadEstimateMB: 190,
    approxVRAMMB: 376,
    role: "lower-bound experiment",
  },
  {
    id: "Qwen2.5-0.5B-Instruct-q4f16_1-MLC",
    label: "Qwen2.5 0.5B",
    downloadEstimateMB: 290,
    approxVRAMMB: 945,
    role: "default smallest-useful candidate",
  },
  {
    id: "Llama-3.2-1B-Instruct-q4f16_1-MLC",
    label: "Llama 3.2 1B",
    downloadEstimateMB: 700,
    approxVRAMMB: 879,
    role: "larger comparison",
  },
];

const WEBLLM_URL = "https://esm.run/@mlc-ai/web-llm@0.2.83";

let selectedId = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC";
let engine = null;
let worker = null;
let loading = null;
let disabled = false;

try {
  const saved = localStorage.getItem("tsdne-model-id");
  if (MODEL_CATALOG.some((model) => model.id === saved)) selectedId = saved;
} catch {}

export let MODEL_ID = selectedId;
export let MODEL_APPROX_MB =
  MODEL_CATALOG.find((model) => model.id === selectedId)?.downloadEstimateMB || 290;
export let MODEL_APPROX_VRAM_MB =
  MODEL_CATALOG.find((model) => model.id === selectedId)?.approxVRAMMB || 945;

const timeout = (promise, milliseconds, label) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`${label} timed out after ${Math.round(milliseconds / 1000)} seconds.`)),
        milliseconds,
      ),
    ),
  ]);

export function selectLocalAIModel(id) {
  if (engine || loading) throw new Error("Reload the page before changing a loaded model.");
  const model = MODEL_CATALOG.find((item) => item.id === id);
  if (!model) throw new Error("Unknown local model.");

  selectedId = model.id;
  MODEL_ID = model.id;
  MODEL_APPROX_MB = model.downloadEstimateMB;
  MODEL_APPROX_VRAM_MB = model.approxVRAMMB;

  try {
    localStorage.setItem("tsdne-model-id", model.id);
  } catch {}

  return model;
}

export function localAISupport() {
  if (disabled) return { supported: false, reason: "local AI disabled for this session" };
  if (
    !globalThis.isSecureContext &&
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1"
  ) {
    return { supported: false, reason: "local AI requires HTTPS or localhost" };
  }
  if (!("gpu" in navigator)) return { supported: false, reason: "WebGPU is unavailable" };
  if (navigator.connection?.saveData) return { supported: false, reason: "data-saver is enabled" };

  const memory = Number(navigator.deviceMemory || 0);
  if (memory && memory < 4) {
    return { supported: false, reason: "device memory is below the safe threshold" };
  }

  return { supported: true, reason: null };
}

export function disableLocalAI() {
  disabled = true;
  try {
    worker?.terminate();
  } catch {}
  worker = null;
  engine = null;
  loading = null;
}

export async function loadLocalAI(onProgress = () => {}) {
  if (engine) return engine;
  if (loading) return loading;

  const support = localAISupport();
  if (!support.supported) throw new Error(support.reason);

  loading = (async () => {
    const webllm = await timeout(import(WEBLLM_URL), 30000, "WebLLM library loading");
    worker = new Worker(new URL("./ai-worker.js", import.meta.url), { type: "module" });

    const created = webllm.CreateWebWorkerMLCEngine(worker, MODEL_ID, {
      initProgressCallback: (report) =>
        onProgress({
          ...report,
          model: MODEL_ID,
          downloadEstimateMB: MODEL_APPROX_MB,
          approxVRAMMB: MODEL_APPROX_VRAM_MB,
        }),
    });

    engine = await timeout(created, 240000, "Local model loading");
    return engine;
  })();

  try {
    return await loading;
  } catch (error) {
    try {
      worker?.terminate();
    } catch {}
    worker = null;
    engine = null;
    loading = null;
    throw error;
  }
}

function extractJSON(text) {
  const trimmed = String(text || "").trim();
  const unfenced = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");
  const start = unfenced.indexOf("{");
  const end = unfenced.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("The local model did not return JSON.");
  return JSON.parse(unfenced.slice(start, end + 1));
}

function mutationSchema() {
  return {
    type: "object",
    properties: {
      changes: {
        type: "object",
        properties: Object.fromEntries(
          [
            "scale",
            "tempo",
            "density",
            "turbulence",
            "contrast",
            "palette",
            "complexity",
            "rotation",
            "symmetry",
            "softness",
            "drift",
            "depth",
          ].map((key) => [key, { type: "number", minimum: -1, maximum: 1 }]),
        ),
        additionalProperties: false,
      },
      intention: { type: "string", maxLength: 160 },
    },
    required: ["changes", "intention"],
    additionalProperties: false,
  };
}

async function requestMutation(graphDescription, attempt) {
  const completion = await timeout(
    engine.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are the local mutation agent inside the artwork This Shader Does Not Exist. Return valid JSON only. Propose restrained numeric deltas from -1 to 1. Preserve a recognisable relation while changing rhythm, structure, atmosphere, or spatial organisation. Do not maximise complexity. Slowness, emptiness, simplification, asymmetry, and quiet contrast are valid. Change at least two traits.",
        },
        {
          role: "user",
          content: `Current typed shader graph:\n${JSON.stringify(graphDescription)}\n\nAttempt ${attempt}. Return a changes object and a brief intention.`,
        },
      ],
      temperature: 0.82,
      top_p: 0.9,
      max_tokens: 220,
      response_format: { type: "json_object", schema: mutationSchema() },
    }),
    30000,
    "Local mutation inference",
  );

  return extractJSON(completion.choices?.[0]?.message?.content);
}

export async function proposeMutation(graphDescription, { retries = 2 } = {}) {
  if (!engine) throw new Error("The local model is not ready.");

  let lastError;
  for (let attempt = 1; attempt <= retries + 1; attempt += 1) {
    try {
      return await requestMutation(graphDescription, attempt);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("The local model failed to propose a mutation.");
}

export async function interruptLocalAI() {
  try {
    await engine?.interruptGenerate?.();
  } catch {}
}
