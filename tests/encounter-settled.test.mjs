import test from "node:test";
import assert from "node:assert/strict";
import { createTSDNERuntime } from "../prototype/src/runtime.js";

/*
 * Drives the real runtime against a fake WebGL2 context to pin the order in
 * which a paused visitor arrives at a new shader.
 *
 * "encounter" fires as the crossfade begins, while the outgoing shader is still
 * on screen. Resuming there would set the shader being relinquished moving again
 * and only then reveal its replacement, which is the opposite of what pausing is
 * for. The resume therefore belongs to "encounter-settled", emitted once the
 * crossfade has finished. These tests read the shader clock straight out of
 * uniform1f, so they measure motion rather than describe it.
 */

const TRANSITION_MS = 900;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** A context that records every u_time it is given, in order. */
function fakeCanvas() {
  const times = [];
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
    getUniformLocation: (_program, name) => name,
    viewport: () => {}, useProgram: () => {},
    enableVertexAttribArray: () => {}, vertexAttribPointer: () => {},
    uniform2f: () => {},
    uniform1f: (location, value) => { if (location === "u_time") times.push(value); },
    drawArrays: () => {},
    readPixels: (_x, _y, width, height, _format, _type, pixels) => {
      // Follows the clock, so candidates pass the temporal check and a search
      // actually succeeds. Mean ~126 with high spatial variance otherwise.
      const phase = Math.floor((times.at(-1) ?? 0) * 97);
      for (let i = 0, p = 0; i < width * height; i += 1, p += 4) {
        pixels[p] = (i * 37 + phase * 53) % 256;
        pixels[p + 1] = (i * 91 + phase * 29) % 256;
        pixels[p + 2] = (i * 17 + phase * 71) % 256;
        pixels[p + 3] = 255;
      }
    },
  };
  return {
    times,
    width: 64, height: 64, clientWidth: 64, clientHeight: 64,
    style: {}, classList: { add() {}, remove() {} }, setAttribute() {},
    addEventListener() {},
    getContext: () => gl,
  };
}

globalThis.requestAnimationFrame ??= (callback) => setTimeout(() => callback(performance.now()), 0);
globalThis.cancelAnimationFrame ??= (handle) => clearTimeout(handle);

test("a paused shader stays still until its replacement stands alone", async () => {
  const canvases = [fakeCanvas(), fakeCanvas()];
  const runtime = await createTSDNERuntime({
    canvases,
    validatorCanvas: fakeCanvas(),
    settings: { paused: false, reducedMotion: false, reducedIntensity: false },
    maxAttempts: 8,
    frameBudgetMs: Number.MAX_SAFE_INTEGER,
  });

  const events = [];
  let outgoingAtEncounter = 0;
  let outgoingAtSettled = 0;
  let incomingAtEncounter = 0;
  let incomingAtSettled = 0;

  try {
    await runtime.start();
    await sleep(60);
    // The first shader is on canvas 0 and moving.
    assert.ok(canvases[0].times.length > 1, "the render loop is running");
    assert.ok(canvases[0].times.at(-1) > 0, "an unpaused shader advances");

    runtime.setSettings({ paused: true, reducedMotion: false, reducedIntensity: false });
    await sleep(60);
    const frozenAt = canvases[0].times.at(-1);
    const framesWhilePaused = canvases[0].times.length;
    await sleep(60);
    assert.equal(canvases[0].times.at(-1), frozenAt, "pausing holds the moment");
    assert.ok(canvases[0].times.length > framesWhilePaused, "still rendering, just not advancing");

    // Exactly what main.js does, and only here.
    runtime.on("encounter", () => {
      events.push("encounter");
      outgoingAtEncounter = canvases[0].times.length;
      incomingAtEncounter = canvases[1].times.length;
    });
    runtime.on("encounter-settled", () => {
      events.push("encounter-settled");
      outgoingAtSettled = canvases[0].times.length;
      incomingAtSettled = canvases[1].times.length;
      runtime.setSettings({ paused: false, reducedMotion: false, reducedIntensity: false });
    });

    const startedAt = performance.now();
    await runtime.another();
    assert.deepEqual(events, ["encounter"], "the crossfade has begun but not finished");

    await sleep(TRANSITION_MS + 250);
    const settledAfterMs = performance.now() - startedAt;
    assert.deepEqual(events, ["encounter", "encounter-settled"], "settled exactly once, after");
    assert.ok(settledAfterMs >= TRANSITION_MS * 0.9, `settled after ${Math.round(settledAfterMs)}ms, not before the crossfade`);

    // The claim under test: the shader being relinquished never moved again.
    const outgoingDuringFade = canvases[0].times.slice(outgoingAtEncounter, outgoingAtSettled);
    assert.ok(outgoingDuringFade.length > 1, "the outgoing shader kept rendering during the fade");
    assert.deepEqual(
      [...new Set(outgoingDuringFade)],
      [frozenAt],
      "the outgoing shader must not resume while the new one fades in",
    );

    // And the new shader was held on its first frame throughout the fade.
    const incomingDuringFade = canvases[1].times.slice(incomingAtEncounter, incomingAtSettled);
    assert.deepEqual([...new Set(incomingDuringFade)], [0], "the arriving shader waits on frame one");

    // Only after settling does it begin to move.
    await sleep(80);
    assert.ok(canvases[1].times.at(-1) > 0, "the new shader plays once it stands alone");
  } finally {
    runtime.stop();
  }
});

test("a stopped runtime does not settle afterwards", async () => {
  const canvases = [fakeCanvas(), fakeCanvas()];
  const runtime = await createTSDNERuntime({
    canvases,
    validatorCanvas: fakeCanvas(),
    settings: { paused: true, reducedMotion: false, reducedIntensity: false },
    maxAttempts: 8,
    frameBudgetMs: Number.MAX_SAFE_INTEGER,
  });

  let settled = 0;
  runtime.on("encounter-settled", () => { settled += 1; });
  // The first encounter has no crossfade to wait for, so it settles at once.
  await runtime.another({ initial: true });
  await sleep(60);
  const settledBeforeStop = settled;
  assert.equal(settledBeforeStop, 1, "a first encounter settles immediately");

  // The second leaves a timer pending across the crossfade.
  await runtime.another();
  runtime.stop();
  await sleep(TRANSITION_MS + 150);
  assert.equal(settled, settledBeforeStop, "a pending settle must not fire into a stopped runtime");
});
