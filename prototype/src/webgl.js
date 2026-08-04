const VERTEX_SOURCE = `#version 300 es
in vec2 a_position;
void main(){gl_Position=vec4(a_position,0.0,1.0);}`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader) || "Unknown shader compile error";
    gl.deleteShader(shader);
    throw new Error(error);
  }
  return shader;
}

function link(gl, vertex, fragmentSource) {
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program) || "Unknown program link error";
    gl.deleteProgram(program);
    throw new Error(error);
  }
  return program;
}

export function createRenderer(
  canvas,
  {
    onContextLost = () => {},
    onContextRestored = () => {},
  } = {},
) {
  const options = {
    antialias: false,
    alpha: false,
    preserveDrawingBuffer: false,
    powerPreference: "high-performance",
    desynchronized: true,
  };

  let gl = canvas.getContext("webgl2", options);
  if (!gl) throw new Error("WebGL2 is required.");

  let vertex = null;
  let buffer = null;
  let current = null;
  let currentSource = null;
  let settings = { motion: 1, intensity: 1 };

  function createBuffer() {
    const next = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, next);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    return next;
  }

  function buildProgram(source) {
    const program = link(gl, vertex, source);
    return {
      source,
      program,
      position: gl.getAttribLocation(program, "a_position"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      motion: gl.getUniformLocation(program, "u_motion"),
      intensity: gl.getUniformLocation(program, "u_intensity"),
    };
  }

  function initialiseResources() {
    vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SOURCE);
    buffer = createBuffer();
    current = currentSource ? buildProgram(currentSource) : null;
  }

  initialiseResources();

  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    onContextLost();
  });

  canvas.addEventListener("webglcontextrestored", () => {
    gl = canvas.getContext("webgl2", options);
    if (!gl) {
      onContextRestored(new Error("WebGL2 context could not be restored."));
      return;
    }
    try {
      initialiseResources();
      onContextRestored(null);
    } catch (error) {
      onContextRestored(error);
    }
  });

  function setFragmentSource(source) {
    const next = buildProgram(source);
    if (current?.program) gl.deleteProgram(current.program);
    currentSource = source;
    current = next;
  }

  function resize(pixelRatio = Math.min(globalThis.devicePixelRatio || 1, 2)) {
    const width = Math.max(
      1,
      Math.floor(canvas.clientWidth * pixelRatio || canvas.width || 64),
    );
    const height = Math.max(
      1,
      Math.floor(canvas.clientHeight * pixelRatio || canvas.height || 64),
    );
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function draw(timeSeconds, shouldResize = true) {
    if (!current) return;
    if (shouldResize) resize();
    gl.useProgram(current.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(current.position);
    gl.vertexAttribPointer(current.position, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(current.resolution, canvas.width, canvas.height);
    gl.uniform1f(current.time, timeSeconds);
    if (current.motion !== null) gl.uniform1f(current.motion, settings.motion);
    if (current.intensity !== null) gl.uniform1f(current.intensity, settings.intensity);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function sampleSequence(times = [.73, 2.11, 4.47], size = 64, sampleSettings = settings) {
    if (!current) throw new Error("Cannot sample before a fragment source is set.");

    const oldWidth = canvas.width;
    const oldHeight = canvas.height;
    const oldSettings = settings;
    const frames = [];

    settings = { ...settings, ...sampleSettings };
    canvas.width = size;
    canvas.height = size;
    gl.viewport(0, 0, size, size);

    try {
      for (const time of times) {
        draw(time, false);
        const pixels = new Uint8Array(size * size * 4);
        gl.readPixels(0, 0, size, size, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        frames.push(pixels);
      }
      return frames;
    } finally {
      canvas.width = Math.max(1, oldWidth);
      canvas.height = Math.max(1, oldHeight);
      gl.viewport(0, 0, canvas.width, canvas.height);
      settings = oldSettings;
    }
  }

  function sample(timeSeconds, size = 64, sampleSettings = settings) {
    return sampleSequence([timeSeconds], size, sampleSettings)[0];
  }

  function setSettings(next) {
    settings = { ...settings, ...next };
  }

  function destroy() {
    if (current?.program) gl.deleteProgram(current.program);
    if (vertex) gl.deleteShader(vertex);
    if (buffer) gl.deleteBuffer(buffer);
    current = null;
    currentSource = null;
  }

  return {
    setFragmentSource,
    render: (time) => draw(time, true),
    sample,
    sampleSequence,
    resize,
    setSettings,
    destroy,
    get source() {
      return currentSource;
    },
  };
}
