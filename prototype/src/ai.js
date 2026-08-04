const MODEL_ID = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC";
let engine = null;
let loading = null;

export function localAISupport() {
  if (!("gpu" in navigator)) return { supported: false, reason: "WebGPU is unavailable" };
  if (navigator.connection?.saveData) return { supported: false, reason: "data-saver is enabled" };
  return { supported: true, reason: null };
}

export async function loadLocalAI(onProgress = () => {}) {
  if (engine) return engine;
  if (loading) return loading;
  const support = localAISupport();
  if (!support.supported) throw new Error(support.reason);

  loading = (async () => {
    const webllm = await import("https://esm.run/@mlc-ai/web-llm");
    const worker = new Worker(new URL("./ai-worker.js", import.meta.url), { type: "module" });
    engine = await webllm.CreateWebWorkerMLCEngine(worker, MODEL_ID, {
      initProgressCallback: (report) => onProgress(report),
    });
    return engine;
  })();

  try {
    return await loading;
  } catch (error) {
    loading = null;
    engine = null;
    throw error;
  }
}

function extractJSON(text) {
  const trimmed = String(text || "").trim();
  const unfenced = trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  const start = unfenced.indexOf("{");
  const end = unfenced.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("The local model did not return JSON.");
  return JSON.parse(unfenced.slice(start, end + 1));
}

export async function proposeMutation(graphDescription) {
  if (!engine) throw new Error("The local model is not ready.");
  const schema = {
    changes: {
      scale: 0,
      tempo: 0,
      density: 0,
      turbulence: 0,
      contrast: 0,
      palette: 0,
      complexity: 0,
      rotation: 0,
    },
    intention: "brief phrase",
  };
  const completion = await engine.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are the local mutation agent inside the artwork This Shader Does Not Exist. " +
          "Return only valid JSON. Propose restrained numeric deltas between -1 and 1. " +
          "Preserve continuity with the current shader while changing its rhythm, structure, or atmosphere. " +
          "Do not maximise complexity. Silence, slowness, emptiness, and simplification are valid.",
      },
      {
        role: "user",
        content: `Current typed shader graph:\n${JSON.stringify(graphDescription)}\n\nReturn this shape:\n${JSON.stringify(schema)}`,
      },
    ],
    temperature: 0.85,
    top_p: 0.9,
    max_tokens: 180,
    response_format: { type: "json_object" },
  });
  const content = completion.choices?.[0]?.message?.content;
  return extractJSON(content);
}

export { MODEL_ID };
