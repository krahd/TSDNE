import test from "node:test";
import assert from "node:assert/strict";
import { createTSDNERuntime, rejectionSummary } from "../prototype/src/runtime.js";

/*
 * Drives the real production runtime — buildCandidatePool, validateCandidate,
 * qualityAssessment and the search-cycle loop — against a fake WebGL2 context.
 *
 * An empty quality cycle is a normal outcome, so the runtime retries. The retry
 * was unbounded, which turned any systematic rejection into a silent infinite
 * loop rather than a reported failure: exactly what happened when validation
 * inherited the viewer's motion setting and `too-static` rejected all
 * forty-nine families at once. These tests pin the ceiling.
 */

/** Frames whose pixels either ignore the shader clock (static) or follow it. */
function fakeGL({ animated }) {
  let time = 0;
  const gl = {
    ARRAY_BUFFER: 1, STATIC_DRAW: 2, COMPILE_STATUS: 3, LINK_STATUS: 4,
    VERTEX_SHADER: 5, FRAGMENT_SHADER: 6, FLOAT: 7, TRIANGLES: 8,
    RGBA: 9, UNSIGNED_BYTE: 10,
    createShader: () => ({}), shaderSource: () => {}, compileShader: () => {},
    getShaderParameter: () => true, getShaderInfoLog: () => "", deleteShader: () => {},
    createProgram: () => ({}), attachShader: () => {}, linkProgram: () => {},
    getProgramParameter: () => true, getProgramInfoLog: () => "", deleteProgram: () => {},
    createBuffer: () => ({}), bindBuffer: () => {}, bufferData: () => {}, deleteBuffer: () => {},
    getAttribLocation: () => 0,
    // The uniform name doubles as its location so uniform1f can spot the clock.
    getUniformLocation: (_program, name) => name,
    viewport: () => {}, useProgram: () => {},
    enableVertexAttribArray: () => {}, vertexAttribPointer: () => {},
    uniform2f: () => {},
    uniform1f: (location, value) => { if (location === "u_time") time = value; },
    drawArrays: () => {},
    readPixels: (_x, _y, width, height, _format, _type, pixels) => {
      // Mean ~126 with high spatial variance, so the only quality check this can
      // fail is the temporal one. A static field fails it for every family.
      const phase = animated ? Math.floor(time * 97) : 0;
      for (let i = 0, p = 0; i < width * height; i += 1, p += 4) {
        pixels[p] = (i * 37 + phase * 53) % 256;
        pixels[p + 1] = (i * 91 + phase * 29) % 256;
        pixels[p + 2] = (i * 17 + phase * 71) % 256;
        pixels[p + 3] = 255;
      }
    },
  };
  return gl;
}

function fakeCanvas(options) {
  return {
    width: 64, height: 64, clientWidth: 64, clientHeight: 64,
    style: {}, classList: { add() {}, remove() {} }, setAttribute() {},
    addEventListener() {},
    getContext: () => fakeGL(options),
  };
}

function harness({ animated, maxSearchCycles }) {
  const retries = [];
  return {
    retries,
    create: () => createTSDNERuntime({
      canvases: [fakeCanvas({ animated }), fakeCanvas({ animated })],
      validatorCanvas: fakeCanvas({ animated }),
      maxAttempts: 3,
      maxSearchCycles,
      frameBudgetMs: Number.MAX_SAFE_INTEGER,
    }),
  };
}

// nextFrame() and the render loop need these; Node has neither.
globalThis.requestAnimationFrame ??= (callback) => setTimeout(() => callback(performance.now()), 0);
globalThis.cancelAnimationFrame ??= (handle) => clearTimeout(handle);

test("a systematically rejected search reports instead of looping forever", async () => {
  const maxSearchCycles = 4;
  const { create, retries } = harness({ animated: false, maxSearchCycles });
  const runtime = await create();
  runtime.on("generation-retry", (event) => retries.push(event));

  let thrown = null;
  try {
    await runtime.another({ initial: true });
  } catch (error) {
    thrown = error;
  } finally {
    runtime.stop();
  }

  assert.ok(thrown, "an exhausted search must reject rather than spin");
  assert.match(thrown.message, new RegExp(`exhausted ${maxSearchCycles} cycles`));
  // The message must name the cause, not merely report failure.
  assert.match(thrown.message, /quality:too-static/);
  assert.ok(thrown.audit, "the error must carry its audit");
  assert.equal(thrown.audit.searchBatches.length, maxSearchCycles);
  assert.ok(thrown.audit.searchBatches.every((batch) => batch.validPoolSize === 0));

  // Every cycle but the last announced a retry; the last one raised instead.
  assert.equal(retries.length, maxSearchCycles - 1);
  assert.deepEqual(retries.map((event) => event.searchCycle), [1, 2, 3]);
  assert.ok(retries.every((event) => event.reason === "no-candidate-passed-quality-checks"));
});

test("an unlucky cycle is still only a retry, not an error", async () => {
  // The ceiling must not turn the normal empty-cycle case into a failure.
  const { create } = harness({ animated: true, maxSearchCycles: 4 });
  const runtime = await create();
  try {
    const encounter = await runtime.another({ initial: true });
    assert.ok(encounter?.candidate?.source, "a valid pool must still produce an encounter");
    assert.equal(encounter.audit.searchCycles, 1);
    assert.equal(encounter.audit.maxSearchCycles, 4);
    assert.ok(encounter.candidate.perception.temporal > 0);
  } finally {
    runtime.stop();
  }
});

test("the search ceiling is reported in the audit", async () => {
  const { create } = harness({ animated: true, maxSearchCycles: 9 });
  const runtime = await create();
  try {
    const encounter = await runtime.another({ initial: true });
    assert.equal(encounter.audit.maxSearchCycles, 9);
  } finally {
    runtime.stop();
  }
});

test("an exhausted search names its dominant cause", () => {
  assert.equal(rejectionSummary([]), "No rejection reasons were recorded.");
  assert.equal(
    rejectionSummary([
      { stage: "quality", reasons: ["too-static"] },
      { stage: "quality", reasons: ["too-static"] },
      { stage: "cost", reasons: ["cost-budget"] },
      { accepted: true, stage: "quality", reasons: [] },
    ]),
    "Most common: quality:too-static (2), cost:cost-budget (1).",
  );
  assert.match(rejectionSummary([{ stage: "sample" }]), /sample:unspecified \(1\)/);
});
