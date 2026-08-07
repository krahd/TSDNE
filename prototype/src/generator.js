const GLSL_HEADER = `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_motion;
uniform float u_intensity;
#define PI 3.141592653589793
#define TAU 6.283185307179586
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float hash11(float p){p=fract(p*.1031);p*=p+33.33;return fract(p*(p+p));}
float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
vec2 hash22(vec2 p){float n=hash21(p);return vec2(n,hash21(p+n+17.17));}
float hash31(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),f.x),f.y);}
float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
float a=mix(mix(hash31(i),hash31(i+vec3(1,0,0)),f.x),mix(hash31(i+vec3(0,1,0)),hash31(i+vec3(1,1,0)),f.x),f.y);
float b=mix(mix(hash31(i+vec3(0,0,1)),hash31(i+vec3(1,0,1)),f.x),mix(hash31(i+vec3(0,1,1)),hash31(i+vec3(1,1,1)),f.x),f.y);
return mix(a,b,f.z);}
float fbm(vec2 p){float v=0.0,a=0.5;mat2 m=rot(0.53);for(int i=0;i<5;i++){v+=a*noise(p);p=m*p*2.03+17.1;a*=0.5;}return v;}
float fbmL(vec2 p){float v=0.0,a=0.5;for(int i=0;i<3;i++){v+=a*noise(p);p=p*2.07+11.3;a*=0.5;}return v;}
float fbm3(vec3 p){float v=0.0,a=0.5;for(int i=0;i<3;i++){v+=a*noise3(p);p=p*2.11+7.3;a*=0.5;}return v;}
float sdCircle(vec2 p,float r){return length(p)-r;}
float sdBox(vec2 p,vec2 b){vec2 d=abs(p)-b;return length(max(d,0.0))+min(max(d.x,d.y),0.0);}
float sdBox3(vec3 p,vec3 b){vec3 d=abs(p)-b;return length(max(d,0.0))+min(max(d.x,max(d.y,d.z)),0.0);}
float sdTorus(vec3 p,vec2 t){vec2 q=vec2(length(p.xz)-t.x,p.y);return length(q)-t.y;}
float sdSeg(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-6),0.0,1.0);return length(pa-ba*h);}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.0,1.0);return mix(b,a,h)-k*h*(1.0-h);}
vec2 cmul(vec2 a,vec2 b){return vec2(a.x*b.x-a.y*b.y,a.x*b.y+a.y*b.x);}
vec2 cdiv(vec2 a,vec2 b){float d=max(dot(b,b),1e-9);return vec2(dot(a,b),a.y*b.x-a.x*b.y)/d;}
float tri(float x){return abs(fract(x)-.5)*2.0;}
float bayer2(vec2 a){a=floor(a);return fract(a.x*.5+a.y*a.y*.75);}
float bayer4(vec2 a){return bayer2(.5*a)*.25+bayer2(a);}
vec4 hexGrid(vec2 p){vec2 s=vec2(1.0,1.7320508);vec4 hC=floor(vec4(p,p-vec2(.5,.8660254))/s.xyxy)+.5;vec4 h=vec4(p-hC.xy*s,p-(hC.zw+.5)*s);return dot(h.xy,h.xy)<dot(h.zw,h.zw)?vec4(h.xy,hC.xy):vec4(h.zw,hC.zw+.5);}
float hexDist(vec2 p){p=abs(p);return max(dot(p,vec2(.8660254,.5)),p.y);}
float aastep(float d){float w=fwidth(d)+1e-5;return smoothstep(w,-w,d);}
/* Antialiased periodic line: 1 near whole values of phase. Derivatives are
   taken on the unwrapped phase, so the mask survives high line densities. */
float stripe(float phase,float width){float g=abs(fract(phase)-.5)*2.0;float w=fwidth(phase)*2.0+1e-4;return smoothstep(1.0-width-w,1.0-width+w,g);}
float luma(vec3 c){return dot(c,vec3(.2126,.7152,.0722));}
vec3 palette(float t,vec3 a,vec3 b,vec3 c,vec3 d){return a+b*cos(TAU*(c*t+d));}
vec3 safeColor(vec3 c){c=max(c,vec3(0.0));return mix(vec3(luma(c)),c,u_intensity);}
`;

/**
 * Visual variation is produced along three independent axes:
 *
 *   family  — the structural system (what the image is made of)
 *   colour  — how a scalar field becomes colour (shade())
 *   finish  — the reprographic surface applied last (finish())
 *
 * Keeping them independent means a family is not locked to one look: the same
 * structure can arrive as a spectral field, a two-ink screen print, or a
 * dithered plate. Surprise comes from the product of the three axes rather
 * than from parameter jitter inside a single house style.
 */

export const FAMILY_NAMES = [
  // Continuous fields
  "folded-flow",
  "liquid-field",
  "moire-orbit",
  "cellular-drift",
  "polar-vault",
  "aurora-ribbons",
  "reaction-lace",
  "crystalline-lens",
  "tidal-ink",
  "magnetic-sand",
  "spectral-loom",
  // Constructivist and hard-edge geometry
  "richter-rhythm",
  "eggeling-diagonal",
  "suprematist-drift",
  "bauhaus-tiles",
  "truchet-weave",
  "op-stripes",
  // Reprographic
  "halftone-press",
  "dither-plate",
  "crt-broadcast",
  // Recursive and fractal
  "apollonian-foam",
  "orbit-trap-julia",
  "kifs-cathedral",
  "droste-spiral",
  // Dimensional: marched space with a moving camera
  "corridor-flight",
  "terrain-flyover",
  "monolith-orbit",
  "cloud-drift",
  // Biological
  "mitosis-plate",
  "venation-leaf",
  "diatom-plate",
  "neural-plexus",
  // Physical systems
  "ripple-tank",
  "metaball-iso",
  "ink-marbling",
  "contour-survey",
  "phyllotaxis-swarm",
  "neon-circuit",
  // Line and lattice
  "wireframe-solid",
  "stereo-parallax",
  // Synthetic period styles
  "grid-horizon",
  "memphis-pattern",
  "latent-wash",
  // Volume and water
  "volume-tomogram",
  "caustic-pool",
  // Rule-driven structure
  "newton-basins",
  "rule-automaton",
  "grammar-spiral",
  "branch-growth",
];

export const TRAIT_KEYS = [
  "scale", "tempo", "density", "turbulence", "contrast", "palette",
  "complexity", "rotation", "symmetry", "softness", "drift", "depth",
  "colorMode", "finish", "variant",
];

/**
 * cost        — relative fragment cost, gating what may reach the screen
 * motionMin   — least inter-frame change accepted before the result reads as static
 * varianceMin — least luminance variance accepted before the result reads as empty
 */
export const FAMILY_META = {
  "folded-flow": { cost: 6, motionMin: 1.4, varianceMin: 120 },
  "liquid-field": { cost: 7, motionMin: 0.9, varianceMin: 95 },
  "moire-orbit": { cost: 7, motionMin: 1.0, varianceMin: 145 },
  "cellular-drift": { cost: 8, motionMin: 0.8, varianceMin: 100 },
  "polar-vault": { cost: 5, motionMin: 0.9, varianceMin: 90 },
  "aurora-ribbons": { cost: 6, motionMin: 0.7, varianceMin: 75 },
  "reaction-lace": { cost: 8, motionMin: 1.0, varianceMin: 120 },
  "crystalline-lens": { cost: 6, motionMin: 0.7, varianceMin: 110 },
  "tidal-ink": { cost: 7, motionMin: 0.55, varianceMin: 70 },
  "magnetic-sand": { cost: 8, motionMin: 0.8, varianceMin: 120 },
  "spectral-loom": { cost: 6, motionMin: 0.9, varianceMin: 110 },
  "richter-rhythm": { cost: 7, motionMin: 0.6, varianceMin: 90 },
  "eggeling-diagonal": { cost: 7, motionMin: 0.6, varianceMin: 110 },
  "suprematist-drift": { cost: 6, motionMin: 0.35, varianceMin: 80 },
  "bauhaus-tiles": { cost: 6, motionMin: 0.5, varianceMin: 110 },
  "truchet-weave": { cost: 6, motionMin: 0.6, varianceMin: 100 },
  "op-stripes": { cost: 5, motionMin: 0.6, varianceMin: 120 },
  "halftone-press": { cost: 7, motionMin: 0.5, varianceMin: 120 },
  "dither-plate": { cost: 6, motionMin: 0.5, varianceMin: 120 },
  "crt-broadcast": { cost: 7, motionMin: 0.9, varianceMin: 90 },
  "apollonian-foam": { cost: 9, motionMin: 0.5, varianceMin: 90 },
  "orbit-trap-julia": { cost: 10, motionMin: 0.5, varianceMin: 80 },
  "kifs-cathedral": { cost: 8, motionMin: 0.6, varianceMin: 85 },
  "droste-spiral": { cost: 7, motionMin: 0.7, varianceMin: 95 },
  "corridor-flight": { cost: 12, motionMin: 0.9, varianceMin: 70 },
  "terrain-flyover": { cost: 12, motionMin: 0.5, varianceMin: 60 },
  "monolith-orbit": { cost: 13, motionMin: 0.45, varianceMin: 60 },
  "cloud-drift": { cost: 12, motionMin: 0.4, varianceMin: 45 },
  "mitosis-plate": { cost: 9, motionMin: 0.4, varianceMin: 75 },
  "venation-leaf": { cost: 8, motionMin: 0.35, varianceMin: 70 },
  "diatom-plate": { cost: 9, motionMin: 0.4, varianceMin: 70 },
  "neural-plexus": { cost: 11, motionMin: 0.5, varianceMin: 55 },
  "ripple-tank": { cost: 8, motionMin: 0.9, varianceMin: 90 },
  "metaball-iso": { cost: 7, motionMin: 0.6, varianceMin: 80 },
  "ink-marbling": { cost: 8, motionMin: 0.5, varianceMin: 95 },
  "contour-survey": { cost: 8, motionMin: 0.4, varianceMin: 85 },
  "phyllotaxis-swarm": { cost: 10, motionMin: 0.5, varianceMin: 70 },
  "neon-circuit": { cost: 7, motionMin: 0.5, varianceMin: 85 },
  "wireframe-solid": { cost: 8, motionMin: 0.45, varianceMin: 38 },
  "stereo-parallax": { cost: 9, motionMin: 0.5, varianceMin: 55 },
  "grid-horizon": { cost: 7, motionMin: 0.6, varianceMin: 90 },
  "memphis-pattern": { cost: 6, motionMin: 0.5, varianceMin: 110 },
  "latent-wash": { cost: 9, motionMin: 0.5, varianceMin: 75 },
  "volume-tomogram": { cost: 12, motionMin: 0.5, varianceMin: 55 },
  "caustic-pool": { cost: 9, motionMin: 0.8, varianceMin: 70 },
  "newton-basins": { cost: 10, motionMin: 0.45, varianceMin: 80 },
  "rule-automaton": { cost: 5, motionMin: 0.6, varianceMin: 130 },
  "grammar-spiral": { cost: 8, motionMin: 0.3, varianceMin: 90 },
  "branch-growth": { cost: 8, motionMin: 0.4, varianceMin: 70 },
};

/** Ceiling on estimated fragment cost allowed to reach the screen. */
export const COST_BUDGET = 17;

export const COLOR_MODES = ["spectral", "duotone", "riso", "ink", "neon", "mono"];
export const FINISHES = ["clean", "grain", "posterize", "dither", "scanlines", "vignette", "bloom"];
const FINISH_WEIGHTS = [4, 2, 1, 1, 1, 1, 1];

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const range = (value, min, max) => min + clamp(value) * (max - min);
const integer = (value, min, max) => Math.round(range(value, min, max));
const fixed = (value, digits = 4) => Number(value).toFixed(digits);
const TAU = Math.PI * 2;

function pick(value, items, weights = null) {
  if (!weights) return items[Math.min(items.length - 1, Math.floor(clamp(value) * items.length))];
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let cursor = clamp(value) * total;
  for (let index = 0; index < items.length; index += 1) {
    cursor -= weights[index];
    if (cursor < 0) return items[index];
  }
  return items.at(-1);
}

function xoshiro128ss(words) {
  const state = new Uint32Array(words);
  const rotl = (x, k) => ((x << k) | (x >>> (32 - k))) >>> 0;
  return () => {
    const result = Math.imul(rotl(Math.imul(state[1], 5) >>> 0, 7), 9) >>> 0;
    const t = (state[1] << 9) >>> 0;
    state[2] ^= state[0]; state[3] ^= state[1]; state[1] ^= state[2]; state[0] ^= state[3];
    state[2] ^= t; state[3] = rotl(state[3], 11);
    return result / 0x100000000;
  };
}

export function randomSeed() {
  const words = new Uint32Array(4);
  globalThis.crypto.getRandomValues(words);
  return [...words];
}

export function seedId(seed) {
  return seed.map((value) => value.toString(16).padStart(8, "0")).join("");
}

function randomPalette(rng) {
  const vector = (min, max) => [0, 1, 2].map(() => min + rng() * (max - min));
  return { a: vector(0.28, 0.68), b: vector(0.18, 0.56), c: vector(0.55, 1.65), d: vector(0, 1) };
}

function randomTraits(rng) {
  return Object.fromEntries(TRAIT_KEYS.map((key) => [key, rng()]));
}

export function createGraph(seed = randomSeed(), family = null) {
  const rng = xoshiro128ss(seed);
  return {
    schema: "tsdne-program-v4",
    generator: "tsdne-procedural-v2",
    family: family || FAMILY_NAMES[Math.floor(rng() * FAMILY_NAMES.length)],
    seed: [...seed],
    traits: randomTraits(rng),
    palette: randomPalette(rng),
  };
}

export const createProgram = createGraph;

/* ---------------------------------------------------------------- colour -- */

const lumaOf = (color) => 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];
const v3 = (color) => `vec3(${color.map((value) => fixed(value)).join(",")})`;

function paletteSample(palette, t) {
  return [0, 1, 2].map((index) => clamp(
    palette.a[index] + palette.b[index] * Math.cos(TAU * (palette.c[index] * t + palette.d[index])),
    0,
    1,
  ));
}

/** Rescale a colour to a target luminance, desaturating only if it would clip. */
function withLuma(color, target) {
  const level = lumaOf(color);
  let out = level > 1e-4 ? color.map((value) => value * (target / level)) : [target, target, target];
  const peak = Math.max(...out);
  if (peak > 1) {
    out = out.map((value) => value / peak);
    const lift = target - lumaOf(out);
    out = out.map((value) => value + lift);
  }
  return out.map((value) => clamp(value, 0, 1));
}

function saturate(color, amount) {
  const level = lumaOf(color);
  return color.map((value) => clamp(level + (value - level) * amount, 0, 1));
}

function paletteCode(graph) {
  const contrast = range(graph.traits.contrast, 0.62, 1.18);
  const phase = (graph.traits.palette - 0.5) * 0.95;
  const array = (values) => values.map((value) => fixed(value)).join(",");
  const a = graph.palette.a.map((value) => clamp(value * (0.92 + contrast * 0.08), 0, 1.15));
  const b = graph.palette.b.map((value) => clamp(value * contrast, 0, 1.15));
  const c = graph.palette.c;
  const d = graph.palette.d.map((value, index) => value + phase * (index + 1) * 0.17);
  return `vec3(${array(a)}),vec3(${array(b)}),vec3(${array(c)}),vec3(${array(d)})`;
}

export function colorMode(graph) {
  return pick(graph.traits.colorMode, COLOR_MODES);
}

/**
 * Emits `vec3 shade(float t)`. Every family expresses itself as a scalar field
 * and asks shade() for colour, so the colour system is a genuinely separate
 * axis of variation rather than a per-family decision.
 */
function shadeFunction(graph) {
  const t = graph.traits;
  const mode = colorMode(graph);
  const base = (offset) => paletteSample(graph.palette, t.palette + offset);
  const [c0, c1, c2] = [base(0), base(0.37), base(0.71)];
  const contrast = range(t.contrast, 0.55, 1);

  if (mode === "duotone") {
    const dark = withLuma(saturate(c0, 1.25), 0.03 + t.depth * 0.06);
    const light = withLuma(saturate(c1, 1.15), 0.58 + contrast * 0.3);
    return `vec3 shade(float t){float u=.5+.5*cos(TAU*t);u=smoothstep(.04,.96,u);return mix(${v3(dark)},${v3(light)},u);}`;
  }
  if (mode === "riso") {
    const inks = [
      withLuma(saturate(c0, 1.4), 0.32),
      withLuma(saturate(c1, 1.4), 0.6),
      withLuma(saturate(c2, 1.25), 0.16),
    ];
    const phase = fixed(t.drift);
    return `vec3 shade(float t){float u=fract(t*1.5+${phase});u=floor(u*3.0);return u<.5?${v3(inks[0])}:(u<1.5?${v3(inks[1])}:${v3(inks[2])});}`;
  }
  if (mode === "ink") {
    const paper = withLuma(saturate(c0, 0.22), 0.86 + t.contrast * 0.08);
    const ink = withLuma(saturate(c1, 1.1), 0.04 + t.depth * 0.04);
    return `vec3 shade(float t){float u=.5+.5*cos(TAU*t);return mix(${v3(paper)},${v3(ink)},smoothstep(.18,.82,u));}`;
  }
  if (mode === "neon") {
    // A near-black ground made this the mode most often rejected as too dark.
    // Lifting the ground and widening the glow keeps the look while leaving
    // more of the frame lit.
    const ground = withLuma(saturate(c0, 0.85), 0.05);
    const glow = saturate(withLuma(c1, 0.5), 1.7);
    const hot = withLuma(saturate(c2, 0.55), 0.94);
    return `vec3 shade(float t){float u=.5+.5*cos(TAU*t);return ${v3(ground)}+${v3(glow)}*pow(u,1.8)+${v3(hot)}*pow(u,11.0);}`;
  }
  if (mode === "mono") {
    const tint = withLuma(saturate(c0, 0.4), 0.5);
    const low = tint.map((value) => value * 0.07);
    const high = tint.map((value) => clamp(value * (1.5 + contrast * 0.6), 0, 1));
    return `vec3 shade(float t){float u=.5+.5*cos(TAU*t);u=u*u*(3.0-2.0*u);return mix(${v3(low)},${v3(high)},u);}`;
  }
  return `vec3 shade(float t){return palette(t,${paletteCode(graph)});}`;
}

export function finishMode(graph) {
  return pick(graph.traits.finish, FINISHES, FINISH_WEIGHTS);
}

/** Emits `vec3 finish(vec3 col, vec2 frag)`: the reprographic surface. */
function finishFunction(graph) {
  const t = graph.traits;
  const mode = finishMode(graph);
  const levels = integer(t.contrast, 2, 6);

  if (mode === "grain") {
    return `vec3 finish(vec3 col,vec2 frag){float g=hash21(frag+floor(u_time*u_motion*24.0)*7.31);return col+(g-.5)*${fixed(range(t.softness, 0.05, 0.17))};}`;
  }
  if (mode === "posterize") {
    return `vec3 finish(vec3 col,vec2 frag){float n=${levels}.0;return clamp(floor(col*n+.5)/n,0.0,1.0);}`;
  }
  if (mode === "dither") {
    return `vec3 finish(vec3 col,vec2 frag){float n=${levels}.0;float b=bayer4(frag)-.5;return clamp(floor(col*n+b+.5)/n,0.0,1.0);}`;
  }
  if (mode === "scanlines") {
    return `vec3 finish(vec3 col,vec2 frag){float s=.5+.5*cos(frag.y*${fixed(range(t.density, 1.4, 2.4))}-u_time*u_motion*1.6);return col*(1.0-${fixed(range(t.softness, 0.12, 0.34))}*s);}`;
  }
  if (mode === "vignette") {
    return `vec3 finish(vec3 col,vec2 frag){vec2 q=frag/u_resolution-.5;return col*(1.0-${fixed(range(t.depth, 0.25, 0.7))}*clamp(dot(q,q)*2.6,0.0,1.0));}`;
  }
  if (mode === "bloom") {
    return `vec3 finish(vec3 col,vec2 frag){float l=clamp(luma(col),0.0,1.0);return col+col*pow(l,2.5)*${fixed(range(t.contrast, 0.4, 1.3))};}`;
  }
  return `vec3 finish(vec3 col,vec2 frag){return col;}`;
}

/* --------------------------------------------------------------- families -- */

function common(graph) {
  const t = graph.traits;
  return {
    scale: fixed(range(t.scale, 0.7, 4.5)), speed: fixed(range(t.tempo, 0.025, 0.42)),
    density: fixed(range(t.density, 2.2, 18.0)), warp: fixed(range(t.turbulence, 0.08, 2.4)),
    rotation: fixed(range(t.rotation, -1.4, 1.4)), symmetry: fixed(range(t.symmetry, 1.0, 10.0)),
    soft: fixed(range(t.softness, 0.015, 0.38)), drift: fixed(range(t.drift, -1.0, 1.0)),
    depth: fixed(range(t.depth, 0.4, 3.2)), layers: integer(t.complexity, 3, 8),
  };
}

/** Per-family parameter mapping, so each system chooses its own useful ranges. */
function params(graph) {
  const t = graph.traits;
  return {
    f: (key, min, max) => fixed(range(t[key], min, max)),
    i: (key, min, max) => integer(t[key], min, max),
    v: integer(t.variant, 0, 2),
  };
}

const uv = "vec2 p=(2.0*gl_FragCoord.xy-u_resolution.xy)/min(u_resolution.x,u_resolution.y);";

/* Continuous fields ---------------------------------------------------- */

function foldedFlow(g){const c=common(g);return `${uv}p*=rot(${c.rotation});p*=${c.scale};float t=u_time*u_motion*${c.speed};float acc=0.0;vec2 q=p;for(int k=0;k<${c.layers};k++){q=abs(q)/max(dot(q,q),0.16)-${c.warp};q*=rot(t*.17+float(k)*.73);acc+=sin(q.x*${c.density}+t)*cos(q.y*(${c.density}*.81)-t*1.2);}float v=acc/float(${c.layers});vec3 col=shade(v*.19+length(q)*.08+t*.03);col*=.72+.28*cos(v*2.0);`;}
function liquidField(g){const c=common(g);return `${uv}p*=rot(${c.rotation});p*=${c.scale};float t=u_time*u_motion*${c.speed};vec2 w=vec2(fbm(p+vec2(t,-t)),fbm(p+vec2(7.1-t,3.4+t)));vec2 q=p+${c.warp}*(w-.5);float a=fbm(q*1.7-t*.4);float b=fbm(q*3.1+vec2(a*2.0,-a)+t*.23);float v=sin((a-b)*${c.density}+length(q)*1.2);vec3 col=shade(a*.7+b*.5+v*.11);col+=shade(.95)*(.065/(.09+abs(v)));`;}
function moireOrbit(g){const c=common(g);return `${uv}p*=rot(${c.rotation})*${c.scale};float t=u_time*u_motion*${c.speed};float v=0.0;for(int k=0;k<${c.layers};k++){float fk=float(k);vec2 q=rot(fk*.47+t*(.3+fk*.07))*p;q+=${c.warp}*vec2(sin(q.y*1.3+t),cos(q.x*1.1-t))/(2.0+fk);v+=sin(q.x*(${c.density}+fk*1.37)+sin(q.y*(3.0+fk)));}v/=float(${c.layers});float ring=sin(length(p)*${c.density}*.72-t*6.0);vec3 col=shade(v*.27+ring*.09+t*.04);col*=.62+.34*smoothstep(-.7,.8,v+ring*.2);`;}
function cellularDrift(g){const c=common(g);return `${uv}float t=u_time*u_motion*${c.speed};p*=rot(t*.19+${c.rotation});p+=${c.warp}*.25*vec2(sin(p.y*2.0+t),cos(p.x*1.7-t));vec2 grid=floor(p*${c.density});vec2 r=fract(p*${c.density});float d1=10.0,d2=10.0,id=0.0;for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 o=vec2(float(x),float(y));vec2 h=hash22(grid+o);vec2 cc=o+.5+.42*sin(t*(1.0+${c.drift})+6.2831*h)-r;float d=dot(cc,cc);if(d<d1){d2=d1;d1=d;id=h.x+h.y;}else if(d<d2)d2=d;}float border=sqrt(d2)-sqrt(d1);float v=exp(-border*(8.0+${c.depth}*5.0));vec3 col=shade(id+sqrt(d1)*.45+t*.03);col=mix(col*.32,col+shade(.92)*v*.45,smoothstep(0.0,.5,v));`;}
function polarVault(g){const c=common(g);return `${uv}p*=rot(${c.rotation});float t=u_time*u_motion*${c.speed};float r=length(p)+.001;float a=atan(p.y,p.x);float tunnel=log(r)*${c.density}-t*5.0;float spiral=a*${c.symmetry}+${c.warp}*sin(tunnel*.7)+t*2.0;float v=sin(tunnel+sin(spiral))+cos(spiral*.7-tunnel*.31);float mask=exp(-r*${c.depth})+.15/(.1+abs(sin(spiral)*cos(tunnel)));vec3 col=shade(v*.17+tunnel*.025);col*=.4+.48*mask;`;}
function auroraRibbons(g){const c=common(g);return `${uv}p*=rot(${c.rotation});float t=u_time*u_motion*${c.speed};float y=p.y;float v=0.0;for(int k=0;k<${c.layers};k++){float fk=float(k);float wave=sin(p.x*(1.2+fk*.31)+t*(.5+fk*.08)+fbm(p*.7+fk)*${c.warp});float d=abs(y-wave*.22-fk*.07+float(${c.layers})*.035);v+=exp(-d*(12.0+${c.depth}*8.0));}float haze=fbm(p*${c.scale}+vec2(t*.2,0.0));vec3 col=shade(v*.12+haze*.35+p.y*.08);col*=.22+v*.42+haze*.2;`;}
function reactionLace(g){const c=common(g);return `${uv}p*=rot(${c.rotation})*${c.scale};float t=u_time*u_motion*${c.speed};float a=fbm(p*1.2+vec2(t,0.0));float b=fbm((p+vec2(a,-a))*2.4-vec2(0.0,t));float v=sin((a-b)*${c.density}+sin((p.x+p.y)*${c.symmetry}));float lace=smoothstep(${c.soft},0.0,abs(v)*.22);vec3 col=shade(a*.4+b*.55+v*.1+t*.02);col=mix(col*.25,col+shade(.9)*lace*.45,lace);`;}
function crystallineLens(g){const c=common(g);return `${uv}p*=rot(${c.rotation})*${c.scale};float t=u_time*u_motion*${c.speed};float a=atan(p.y,p.x);float r=length(p);float sectors=floor((a/6.2831853+.5)*${c.symmetry});float ang=(sectors+.5)/${c.symmetry}*6.2831853-PI;vec2 q=rot(-ang)*p;q.x=abs(q.x);float facets=sin(q.x*${c.density}+r*${c.depth}-t*2.0);float lens=1.0/(.12+abs(sdCircle(q,.45+.16*sin(t+sectors))));vec3 col=shade(facets*.18+r*.2+sectors*.07);col*=.25+.08*lens;`;}
function tidalInk(g){const c=common(g);return `${uv}p*=rot(${c.rotation})*${c.scale};float t=u_time*u_motion*${c.speed};vec2 q=p;float ink=0.0;for(int k=0;k<${c.layers};k++){float fk=float(k);q+=${c.warp}*.12*vec2(sin(q.y*(1.4+fk*.1)+t),cos(q.x*(1.2+fk*.13)-t));float f=fbm(q*(1.1+fk*.28)+fk*3.7);ink+=smoothstep(.62-${c.soft},.62+${c.soft},f);}ink/=float(${c.layers});float tide=sin(p.y*${c.density}+fbm(p*1.3)*4.0+t*2.0);vec3 col=shade(ink*.7+tide*.08+t*.015);col*=.18+ink*.72;`;}
function magneticSand(g){const c=common(g);return `${uv}p*=rot(${c.rotation})*${c.scale};float t=u_time*u_motion*${c.speed};float field=0.0;for(int k=0;k<${c.layers};k++){float fk=float(k);vec2 pole=.55*vec2(cos(t*(.3+fk*.05)+fk*2.1),sin(t*(.23+fk*.07)+fk*1.7));vec2 d=p-pole;field+=sin(1.0/(.08+dot(d,d))*${c.depth}+atan(d.y,d.x)*${c.symmetry});}float grain=hash21(floor(gl_FragCoord.xy*(.35+${c.density}*.04)));float v=smoothstep(.55-${c.soft},.55+${c.soft},.5+.5*sin(field+grain*2.0));vec3 col=shade(field*.06+grain*.12+t*.01);col*=.2+v*.75;`;}
function spectralLoom(g){const c=common(g);return `${uv}p*=rot(${c.rotation})*${c.scale};float t=u_time*u_motion*${c.speed};float warp=sin(p.x*${c.density}+sin(p.y*${c.symmetry}+t))*cos(p.y*(${c.density}*.73)-t);float weft=sin((p.x+p.y)*${c.symmetry}+fbm(p*1.7)*${c.warp}*3.0);float v=warp+weft;float thread=smoothstep(.75-${c.soft},.75+${c.soft},abs(sin(v*3.14159)));vec3 col=shade(v*.17+p.x*.05-p.y*.04+t*.02);col*=.28+.62*thread;`;}

/* Constructivist and hard-edge geometry -------------------------------- */

/** Rhythmus 21: rectangles entering, sliding and collapsing on a beat. */
function richterRhythm(g) {
  const { f, i } = params(g);
  return `${uv}p*=rot(${f("rotation", -0.4, 0.4)});float t=u_time*u_motion*${f("tempo", 0.16, 0.85)};
vec3 col=shade(${f("palette", 0.02, 0.12)});
for(int k=0;k<${i("complexity", 4, 9)};k++){float fk=float(k);
float ph=t*(.3+hash11(fk)*.55)+hash11(fk+7.1)*9.0;float beat=floor(ph);float f=fract(ph);
float s=hash11(fk*3.3+beat*17.7);
vec2 sz=vec2(.1+hash11(s+1.0)*${f("scale", 0.2, 0.7)},.08+hash11(s+2.0)*${f("depth", 0.2, 0.8)});
vec2 c0=vec2(-1.3+hash11(s+3.0)*2.6,-.95+hash11(s+4.0)*1.9);
float ease=smoothstep(0.0,.3,f)*(1.0-smoothstep(.72,1.0,f));
c0.x+=(1.0-ease)*(hash11(s+5.0)<.5?-1.0:1.0)*1.4;
sz*=vec2(1.0,ease);
float d=sdBox(p-c0,max(sz,vec2(.0015)));
col=mix(col,shade(${f("symmetry", 0.25, 0.5)}+hash11(s+6.0)*.5),aastep(d)*step(.03,ease));}`;
}

/** Diagonal Symphony: combs of parallel teeth sweeping across an axis. */
function eggelingDiagonal(g) {
  const { f, i } = params(g);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)});float t=u_time*u_motion*${f("tempo", 0.1, 0.45)};
vec3 col=shade(${f("palette", 0.02, 0.14)});
for(int k=0;k<${i("complexity", 3, 7)};k++){float fk=float(k);
float a=(fk/float(${i("complexity", 3, 7)}))*PI*.85+t*.11+${f("drift", -0.5, 0.5)};
vec2 dir=vec2(cos(a),sin(a));vec2 q=vec2(dot(p,dir),dot(p,vec2(-dir.y,dir.x)));
float phase=fract(t*.22+fk*.17);float len=.25+.75*sin(phase*PI);
float teeth=stripe(q.y*(${f("density", 1.6, 5.0)}+fk*.8),${f("softness", 0.3, 0.55)});
float body=aastep(max(abs(q.x)-len,abs(q.y)-${f("scale", 0.6, 1.3)}));
col=mix(col,shade(${f("symmetry", 0.3, 0.6)}+fk*.08),teeth*body);}`;
}

/** Suprematist plane: few large bars adrift on a light ground. */
function suprematistDrift(g) {
  const { f, i } = params(g);
  return `${uv}p*=rot(${f("rotation", -0.3, 0.3)});float t=u_time*u_motion*${f("tempo", 0.05, 0.3)};
vec3 col=shade(${f("palette", 0.86, 0.99)});
for(int k=0;k<${i("complexity", 3, 8)};k++){float fk=float(k);
float a=hash11(fk)*TAU+t*(.04+hash11(fk+3.0)*${f("drift", 0.04, 0.3)});
vec2 c0=vec2(cos(t*(.08+hash11(fk+1.0)*.1)+fk*2.1),sin(t*(.07+hash11(fk+2.0)*.09)+fk*1.3))*(.1+hash11(fk+4.0)*${f("scale", 0.4, 1.0)});
vec2 q=rot(a)*(p-c0);
float d=sdBox(q,vec2(.05+hash11(fk+5.0)*${f("depth", 0.15, 0.6)},.015+hash11(fk+6.0)*${f("density", 0.04, 0.22)}));
col=mix(col,shade(${f("symmetry", 0.1, 0.35)}+hash11(fk+8.0)*.45),aastep(d));}`;
}

/** Modular tile alphabet: quarter discs, bars and wedges on a rotating grid. */
function bauhausTiles(g) {
  const { f } = params(g);
  return `${uv}p*=rot(${f("rotation", -0.8, 0.8)});float t=u_time*u_motion*${f("tempo", 0.05, 0.3)};
vec2 gp=p*${f("density", 1.1, 3.6)}+vec2(t*.4,t*.13);
vec2 id=floor(gp);vec2 q=fract(gp)-.5;
float h=hash21(id);float k=floor(hash21(id+floor(t*.25+h)*3.7)*4.0);
q*=rot(floor(hash21(id+1.7)*4.0)*1.5707963);
float d=k<1.0?length(q-vec2(-.5,-.5))-${f("scale", 0.4, 0.72)}
:(k<2.0?length(q)-${f("depth", 0.16, 0.38)}
:(k<3.0?sdBox(q,vec2(.5,${f("symmetry", 0.06, 0.24)}))
:max(max(-(q.x+.5),-(q.y+.5)),(q.x+q.y)*.7071)));
vec3 col=mix(shade(${f("palette", 0.8, 0.98)}),shade(${f("contrast", 0.15, 0.45)}+h*.4),aastep(d));`;
}

/** Truchet tiling: two arc orientations, optionally combed into line bands. */
function truchetWeave(g) {
  const { f, v } = params(g);
  const banded = v > 0;
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)});float t=u_time*u_motion*${f("tempo", 0.05, 0.3)};
vec2 gp=p*${f("density", 1.0, 3.4)}+vec2(t*.35,t*.2);
vec2 id=floor(gp);vec2 q=fract(gp)-.5;
if(hash21(id)>.5)q.x=-q.x;
float ring=abs(min(length(q-.5),length(q+.5))-.5);
${banded
    ? `float line=stripe(ring*${f("symmetry", 3.0, 12.0)}-t*.5,${f("softness", 0.2, 0.6)});
vec3 col=mix(shade(${f("palette", 0.05, 0.2)}),shade(${f("contrast", 0.4, 0.85)}+ring*.5),line);`
    : `float line=aastep(ring-${f("softness", 0.04, 0.19)});
vec3 col=mix(shade(${f("palette", 0.05, 0.2)}),shade(${f("contrast", 0.4, 0.85)}+hash21(id)*.3),line);`}`;
}

/** Op-art: hard stripe field bent by a slow travelling wave. */
function opStripes(g) {
  const { f, v } = params(g);
  const axis = v === 1 ? "length(p)*1.6" : v === 2 ? "atan(p.y,p.x)*${SYM}" : "p.x";
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)});float t=u_time*u_motion*${f("tempo", 0.04, 0.22)};
float bend=sin(p.y*${f("symmetry", 0.6, 3.4)}+t*1.3)*${f("turbulence", 0.1, 0.7)}+fbmL(p*.7+t*.08)*${f("scale", 0.1, 0.9)};
float axis=${axis.replace("${SYM}", f("symmetry", 1.0, 6.0))};
float s=sin((axis+bend)*${f("density", 4.5, 17.0)});
vec3 col=mix(shade(${f("palette", 0.06, 0.2)}),shade(${f("contrast", 0.5, 0.95)}),aastep(-s));`;
}

/* Reprographic --------------------------------------------------------- */

/** Halftone screen: dot radius driven by an underlying continuous field. */
function halftonePress(g) {
  const { f } = params(g);
  return `${uv}p*=rot(${f("rotation", -0.9, 0.9)});float t=u_time*u_motion*${f("tempo", 0.05, 0.3)};
float field=fbm(p*${f("scale", 0.5, 1.9)}+vec2(t*.3,-t*.2))*1.5-.25+.35*sin(p.x*${f("symmetry", 1.0, 5.0)}+t);
field=clamp(field,0.0,1.0);
vec2 cell=fract(rot(${f("drift", 0.2, 1.2)})*p*${f("density", 6.0, 22.0)})-.5;
float ink=aastep(length(cell)-sqrt(field)*${f("depth", 0.5, 0.72)});
vec3 col=mix(shade(${f("palette", 0.05, 0.22)}),shade(${f("contrast", 0.55, 0.95)}),ink);`;
}

/** Ordered-dither plate: a smooth field forced through a Bayer matrix. */
function ditherPlate(g) {
  const { f, i } = params(g);
  return `${uv}p*=rot(${f("rotation", -1.2, 1.2)})*${f("scale", 0.8, 3.0)};float t=u_time*u_motion*${f("tempo", 0.05, 0.3)};
float v=fbm(p*1.3+vec2(sin(t*.4),t*.28))*1.25+${f("turbulence", 0.1, 0.6)}*sin(length(p)*${f("density", 2.0, 9.0)}-t*1.4);
float n=${i("contrast", 2, 5)}.0;
float b=bayer4(gl_FragCoord.xy*${f("depth", 0.5, 1.0)})-.5;
float q=floor(clamp(v,0.0,1.0)*n+b+.5)/n;
vec3 col=shade(q*${f("symmetry", 0.7, 1.8)}+${f("palette", 0.0, 0.4)});`;
}

/** Broadcast artefact: triad mask, rolling scan and horizontal tearing. */
function crtBroadcast(g) {
  const { f } = params(g);
  return `${uv}float t=u_time*u_motion*${f("tempo", 0.1, 0.5)};
vec2 q=p;
float roll=fract(q.y*.5-t*.13);
q.x+=sin(q.y*${f("density", 2.0, 9.0)}+t*2.4)*${f("turbulence", 0.005, 0.05)};
q.x+=(hash21(vec2(floor(q.y*140.0),floor(t*7.0)))-.5)*${f("drift", 0.02, 0.14)}*step(.92,roll);
float bars=floor(fract(q.y*${f("symmetry", 1.0, 4.0)}+t*.05)*${f("contrast", 3.0, 8.0)});
float img=fbm(q*${f("scale", 0.7, 2.8)}+vec2(t*.24,0.0))*.9+bars*.28+sin(q.x*6.0+bars*2.1+t)*.18;
float mask=.55+.45*cos(gl_FragCoord.x*2.0943951);
float scan=.6+.4*cos(gl_FragCoord.y*2.4-t*5.0);
vec3 col=shade(img+${f("palette", 0.0, 0.5)});
col*=scan*(.6+.6*mask);
col+=shade(.9)*hash21(gl_FragCoord.xy+t)*${f("softness", 0.04, 0.18)};`;
}

/* Recursive and fractal ------------------------------------------------ */

/** Apollonian gasket by repeated circle inversion. */
function apollonianFoam(g) {
  const { f, i } = params(g);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 0.5, 1.4)};float t=u_time*u_motion*${f("tempo", 0.03, 0.2)};
float s=1.0;vec2 q=p;float trap=1e6;
for(int k=0;k<${i("complexity", 5, 9)};k++){
q=-1.0+2.0*fract(.5*q+.5);
float r=max(dot(q,q),1e-4);
float inv=(${f("depth", 1.05, 1.4)}+.08*sin(t*.7))/r;
q*=inv;s*=inv;
trap=min(trap,abs(length(q)-.92)/s);}
float d=abs(q.y)/s;
vec3 col=shade(log(s)*${f("density", 0.1, 0.5)}+${f("palette", 0.0, 1.0)}+t*.03);
col*=.28+.85*smoothstep(0.0,${f("turbulence", 0.01, 0.06)},trap);
col+=shade(${f("contrast", 0.55, 0.95)})*(1.0-smoothstep(0.0,${f("softness", 0.003, 0.02)},d))*.85;`;
}

/** Escape-time Julia set read through two orbit traps. */
function orbitTrapJulia(g) {
  const { f, i } = params(g);
  const iters = i("complexity", 34, 74);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 1.0, 2.4)};float t=u_time*u_motion*${f("tempo", 0.03, 0.22)};
float ca=${f("drift", 0.0, 6.28)}+t*.35;
vec2 c0=.7885*vec2(cos(ca),sin(ca));
vec2 z=p;float trap=1e6;float cross1=1e6;int it=${iters};
for(int k=0;k<${iters};k++){
z=cmul(z,z)+c0;
trap=min(trap,abs(length(z)-${f("depth", 0.4, 1.2)}));
cross1=min(cross1,abs(z.x*z.y));
if(dot(z,z)>64.0){it=k;break;}}
float esc=float(it)/${iters}.0;
float smoothed=esc+(1.0-clamp(log(log(max(length(z),2.72)))/1.3862,0.0,1.0))/${iters}.0;
vec3 col=shade(trap*${f("density", 1.5, 6.0)}+smoothed*${f("symmetry", 2.0, 9.0)}+${f("palette", 0.0, 1.0)});
col*=.25+.85*exp(-trap*${f("turbulence", 3.0, 14.0)})+.4*exp(-cross1*16.0);
col+=shade(${f("contrast", 0.6, 0.95)})*step(esc,.999)*exp(-trap*22.0)*.5;`;
}

/** Kaleidoscopic IFS: repeated fold, offset and rotate around a box. */
function kifsCathedral(g) {
  const { f, i } = params(g);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 0.8, 2.6)};float t=u_time*u_motion*${f("tempo", 0.03, 0.2)};
vec2 q=p;float sc=1.0;
for(int k=0;k<${i("complexity", 4, 9)};k++){
q=abs(q);
q-=vec2(${f("turbulence", 0.2, 0.75)},${f("depth", 0.15, 0.6)});
q*=rot(${f("drift", -0.6, 0.6)}+t*.11+float(k)*.29);
q*=1.27;sc*=1.27;}
float d=sdBox(q,vec2(${f("symmetry", 0.25, 0.8)},${f("softness", 0.06, 0.3)}))/sc;
float glow=exp(-abs(d)*${f("density", 14.0, 70.0)});
vec3 col=shade(d*4.0+${f("palette", 0.0, 1.0)}+t*.04);
col*=.22+glow*1.5;
col+=shade(${f("contrast", 0.6, 0.98)})*aastep(d)*.7;`;
}

/** Conformal log-polar mapping: an image that recedes into itself. */
function drosteSpiral(g) {
  const { f } = params(g);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)});float t=u_time*u_motion*${f("tempo", 0.05, 0.35)};
vec2 lp=vec2(log(max(length(p),1e-4)),atan(p.y,p.x));
lp*=rot(${f("drift", -0.7, 0.7)});
lp.x=lp.x*${f("density", 0.8, 3.2)}-t;
lp.y=lp.y*${f("symmetry", 0.6, 3.5)};
vec2 cell=fract(lp)-.5;
float grid=min(abs(cell.x),abs(cell.y));
float field=fbmL(lp*${f("scale", 0.4, 1.6)});
vec3 col=shade(lp.x*.12+field*${f("contrast", 0.4, 1.1)}+${f("palette", 0.0, 1.0)});
col=mix(col*.3,col*1.25,aastep(grid-${f("softness", 0.02, 0.14)}));`;
}

/* Marched space with a moving camera ----------------------------------- */

/** Camera flying down a repeating colonnade, integrated as volume. */
function corridorFlight(g) {
  const { f, i } = params(g);
  return `${uv}float t=u_time*u_motion*${f("tempo", 0.25, 1.1)};
vec3 ro=vec3(sin(t*.3)*${f("drift", 0.05, 0.6)},cos(t*.24)*${f("depth", 0.05, 0.5)},t*2.2);
vec3 rd=normalize(vec3(p*rot(sin(t*.17)*${f("rotation", 0.05, 0.6)}),${f("scale", 1.1, 2.2)}));
float d=0.0,tacc=0.0,gacc=0.0;
for(int k=0;k<${i("complexity", 40, 64)};k++){
vec3 q=ro+rd*d;vec3 c=q;
c.xy=mod(c.xy+${f("density", 1.1, 2.2)},${f("density", 2.2, 4.4)})-${f("density", 1.1, 2.2)};
float tube=abs(length(c.xy)-${f("symmetry", 0.5, 1.1)})-.05;
float strut=max(abs(c.x),abs(c.y))-${f("softness", 0.04, 0.16)};
float ring=max(abs(mod(q.z,${f("turbulence", 1.2, 3.0)})-${f("turbulence", 0.6, 1.5)})-.05,length(c.xy)-1.0);
float m=min(min(tube,strut),ring);
float glow=exp(-abs(m)*${f("contrast", 30.0, 90.0)})*exp(-d*${f("softness", 0.12, 0.3)});
tacc+=(q.z*.06+float(k)*.005)*glow;gacc+=glow;
d+=max(abs(m)*.8,.035);
if(d>26.0)break;}
float depthTone=tacc/max(gacc,1e-4);
vec3 col=shade(depthTone*.15+${f("palette", 0.0, 1.0)})*clamp(gacc*${f("turbulence", 0.06, 0.2)},0.0,1.4);`;
}

/** Heightfield flyover: horizon, sky and a sun. */
function terrainFlyover(g) {
  const { f, i } = params(g);
  return `${uv}float t=u_time*u_motion*${f("tempo", 0.1, 0.6)};
vec3 rd=normalize(vec3(p.x,p.y*.85+${f("rotation", 0.02, 0.3)},1.0));
rd.xz*=rot(sin(t*.07)*.45+${f("drift", -0.6, 0.6)});
float camZ=t*2.4;float d=.5;float hit=-1.0;float h=0.0;
for(int k=0;k<${i("complexity", 34, 54)};k++){
vec3 q=vec3(0.0,${f("depth", 0.9, 1.9)},camZ)+rd*d;
h=fbmL(q.xz*${f("scale", 0.25, 0.85)})*${f("turbulence", 0.8, 2.4)};
if(q.y<h){hit=d;break;}
d+=.09+d*.055;
if(d>32.0)break;}
vec3 col;
if(hit>0.0){
vec3 q=vec3(0.0,${f("depth", 0.9, 1.9)},camZ)+rd*hit;
float det=fbmL(q.xz*${f("scale", 0.75, 2.6)}+9.1);
float slope=clamp((h-fbmL((q.xz+vec2(.14,0.0))*${f("scale", 0.25, 0.85)})*${f("turbulence", 0.8, 2.4)})*7.0+.5,0.0,1.0);
col=shade(${f("palette", 0.1, 0.5)}+det*${f("density", 0.3, 0.9)}+q.y*.2);
col*=(.3+.8*slope)*exp(-hit*.05);
}else{
float sky=clamp(rd.y*2.2,0.0,1.0);
col=shade(${f("palette", 0.6, 1.0)}-sky*${f("contrast", 0.2, 0.6)});
col+=shade(.99)*exp(-length(p-vec2(${f("symmetry", -0.8, 0.8)},${f("softness", 0.15, 0.5)}))*${f("density", 3.0, 9.0)})*.9;
col=mix(col,shade(${f("palette", 0.35, 0.75)}),exp(-max(rd.y,0.0)*7.0)*.6);}`;
}

/** Orbiting camera around a lit, carved solid: surface normals and specular. */
function monolithOrbit(g) {
  const { f, i } = params(g);
  const helpers = `float mapM(vec3 p,float t){
vec3 q=p;q.xz*=rot(t*${f("drift", 0.1, 0.5)});q.y-=.1;
float d=sdBox3(q,vec3(${f("scale", 0.35, 0.75)},${f("depth", 0.5, 1.1)},${f("scale", 0.35, 0.75)}))-.07;
vec3 r=q;r.xy*=rot(t*${f("turbulence", 0.1, 0.45)});
d=max(d,-(sdTorus(r.yzx,vec2(${f("symmetry", 0.6, 1.0)},${f("softness", 0.1, 0.3)}))));
d=smin(d,sdTorus(q,vec2(${f("density", 1.0, 1.5)},.06)),.16);
return d;}`;
  const body = `${uv}float t=u_time*u_motion*${f("tempo", 0.1, 0.5)};
float ca=t*.35+${f("rotation", -3.0, 3.0)};
vec3 ro=vec3(sin(ca)*3.0,${f("contrast", 0.4, 1.8)},cos(ca)*3.0);
vec3 ww=normalize(vec3(0.0,.1,0.0)-ro);
vec3 uu=normalize(cross(vec3(0.0,1.0,0.0),ww));
vec3 rd=normalize(p.x*uu+p.y*cross(ww,uu)+1.7*ww);
float d=0.0;float hit=-1.0;
for(int k=0;k<${i("complexity", 56, 84)};k++){
float m=mapM(ro+rd*d,t);
if(m<.0015){hit=d;break;}
d+=m*.85;
if(d>11.0)break;}
vec3 col;
if(hit>0.0){
vec3 q=ro+rd*hit;vec2 e=vec2(.0018,0.0);
vec3 n=normalize(vec3(mapM(q+e.xyy,t)-mapM(q-e.xyy,t),mapM(q+e.yxy,t)-mapM(q-e.yxy,t),mapM(q+e.yyx,t)-mapM(q-e.yyx,t)));
vec3 l=normalize(vec3(.6,.75,-.4));
float dif=clamp(dot(n,l),0.0,1.0);
float rim=pow(1.0-clamp(dot(n,-rd),0.0,1.0),3.0);
float spec=pow(clamp(dot(reflect(-l,n),-rd),0.0,1.0),30.0);
col=shade(${f("palette", 0.1, 0.6)}+dif*.45+n.y*.15)*(.16+dif*.95);
col+=shade(.97)*spec*.7+shade(${f("contrast", 0.5, 0.9)})*rim*.45;
}else{
col=shade(${f("palette", 0.55, 1.0)}-rd.y*.3)*(.2+.35*clamp(rd.y+.4,0.0,1.0));}`;
  return { helpers, body };
}

/** Volumetric cloud deck with a slowly translating camera. */
function cloudDrift(g) {
  const { f, i } = params(g);
  return `${uv}float t=u_time*u_motion*${f("tempo", 0.08, 0.45)};
vec3 rd=normalize(vec3(p.x,p.y*.9+${f("rotation", 0.05, 0.4)},1.0));
rd.xz*=rot(t*.05+${f("drift", -0.8, 0.8)});
float d=1.0,tacc=0.0,gacc=0.0,trans=1.0;
for(int k=0;k<${i("complexity", 20, 30)};k++){
vec3 q=vec3(0.0,0.0,t*.9)+rd*d;
float dens=fbm3(q*${f("scale", 0.3, 0.9)}+vec3(0.0,0.0,t*.12))-${f("depth", 0.4, 0.56)}-q.y*${f("turbulence", 0.05, 0.3)};
dens=clamp(dens*2.4,0.0,1.0);
float a=dens*.17*trans;
tacc+=(q.y*.18+dens*${f("density", 0.4, 1.0)})*a;gacc+=a;trans*=1.0-dens*.14;
d+=.32;
if(trans<.04)break;}
float sky=clamp(rd.y,0.0,1.0);
vec3 col=shade(${f("palette", 0.55, 1.0)}-sky*${f("contrast", 0.2, 0.5)})*(.28+.5*sky);
col=mix(col,shade(clamp(tacc/max(gacc,1e-4),0.0,1.2)*${f("symmetry", 0.5, 1.2)}+${f("softness", 0.0, 0.3)}),clamp(gacc*1.5,0.0,1.0));`;
}

/* Biological ------------------------------------------------------------ */

/** Culture plate: cells swell, elongate and divide on their own cycles. */
function mitosisPlate(g) {
  const { f } = params(g);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)});float t=u_time*u_motion*${f("tempo", 0.06, 0.35)};
vec2 pp=p*${f("density", 1.4, 4.2)};
vec2 gc=floor(pp);float d=1e3,nuc=1e3,id=0.0;
for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
vec2 o=vec2(float(x),float(y));vec2 h=hash22(gc+o);
float ph=fract(t*(.07+h.x*.14)+h.y);
float split=smoothstep(.5,.95,ph);
vec2 c0=gc+o+.5+${f("drift", 0.1, 0.34)}*sin(TAU*h+t*.4);
vec2 axis=vec2(cos(h.x*TAU),sin(h.x*TAU))*split*${f("turbulence", 0.25, 0.5)};
float r=(${f("scale", 0.22, 0.38)}+.1*h.y)*(1.0-.22*split);
float da=length(pp-(c0+axis))-r;
float db=length(pp-(c0-axis))-r;
float cell=smin(da,db,${f("softness", 0.06, 0.2)});
if(cell<d){d=cell;id=h.x;}
nuc=min(nuc,min(length(pp-(c0+axis)),length(pp-(c0-axis)))-r*${f("depth", 0.2, 0.42)});}
vec3 col=shade(${f("palette", 0.02, 0.18)});
col=mix(col,shade(${f("contrast", 0.3, 0.6)}+id*.35),aastep(d)*.75);
col=mix(col,shade(${f("symmetry", 0.7, 0.98)}),aastep(abs(d)-${f("softness", 0.008, 0.03)}));
col=mix(col,shade(${f("contrast", 0.5, 0.85)}+id*.2),aastep(nuc)*.85);`;
}

/** Ridged multifractal read as vascular filaments, optionally inside a leaf. */
function venationLeaf(g) {
  const { f, i, v } = params(g);
  const silhouette = v > 0;
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 0.7, 2.2)};float t=u_time*u_motion*${f("tempo", 0.02, 0.16)};
float veins=0.0,amp=1.0;vec2 q=p;
for(int k=0;k<${i("complexity", 3, 6)};k++){
float fv=fbmL(q*(1.0+float(k)*${f("density", 0.9, 2.4)})+float(k)*4.3+vec2(0.0,t*.5));
float ridge=1.0-abs(fv*2.0-1.0);
veins=max(veins,pow(ridge,${f("softness", 4.0, 13.0)}+float(k)*3.0)*amp);
amp*=.7;q*=1.4;q*=rot(.7);}
float rib=exp(-abs(p.x+sin(p.y*${f("symmetry", 0.4, 1.6)})*${f("turbulence", 0.05, 0.4)})*${f("depth", 8.0, 26.0)});
float tissue=fbmL(p*${f("scale", 1.2, 3.4)}+3.3);
vec3 col=shade(${f("palette", 0.15, 0.6)}+tissue*.35);
col=mix(col,shade(${f("contrast", 0.05, 0.35)}),clamp(veins*1.3+rib,0.0,1.0));
${silhouette
    ? `float w=${f("density", 0.4, 0.8)}*pow(max(0.0,1.0-abs(p.y)/1.35),.72);
col=mix(shade(${f("palette", 0.85, 1.0)}),col,aastep(abs(p.x)-w));`
    : ""}`;
}

/** Microscope plate: radially ribbed silica shells scattered under glass. */
function diatomPlate(g) {
  const { f, i } = params(g);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 0.8, 2.0)};float t=u_time*u_motion*${f("tempo", 0.04, 0.25)};
vec3 col=shade(${f("palette", 0.02, 0.2)});
for(int k=0;k<${i("complexity", 10, 19)};k++){float fk=float(k);
vec2 c0=vec2(hash11(fk*1.7)-.5,hash11(fk*2.9+5.0)-.5)*3.8;
c0+=${f("drift", 0.04, 0.24)}*vec2(sin(t*(.2+hash11(fk)*.3)+fk),cos(t*(.17+hash11(fk+2.0)*.2)-fk));
vec2 q=(p-c0)*rot(t*(hash11(fk+3.0)-.5)*${f("turbulence", 0.1, 0.8)}+fk);
float r=length(q);float a=atan(q.y,q.x);
float sides=3.0+floor(hash11(fk+5.0)*${f("symmetry", 3.0, 9.0)});
float star=(${f("depth", 0.18, 0.42)}+hash11(fk+4.0)*.24)*(1.0+.13*cos(a*sides));
float inside=aastep(r-star);
float spokes=smoothstep(.25,.7,abs(sin(a*sides*1.5)));
float rings=stripe(r*${f("density", 8.0, 26.0)},.3);
float w=${f("softness", 0.004, 0.016)};
col=mix(col,shade(${f("contrast", 0.25, 0.55)}+hash11(fk+6.0)*.25),inside*.45);
col+=shade(${f("symmetry", 0.65, 0.95)})*inside*(spokes*.3+rings*.28);
col+=shade(${f("symmetry", 0.7, 0.98)})*(aastep(abs(r-star)-w)+aastep(abs(r-star*.55)-w*.7)*.6)*.9;}`;
}

/** Dendritic network with pulses travelling along the connections. */
function neuralPlexus(g) {
  const { f, i } = params(g);
  const nodes = i("complexity", 7, 11);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 0.7, 1.6)};float t=u_time*u_motion*${f("tempo", 0.08, 0.5)};
vec3 col=shade(${f("palette", 0.02, 0.16)});
for(int i=0;i<${nodes};i++){float fi=float(i);
vec2 a=vec2(cos(fi*2.399+t*.13),sin(fi*1.71-t*.11))*(.25+.85*hash11(fi));
for(int j=0;j<${nodes};j++){
if(j<=i)continue;
float fj=float(j);
vec2 b=vec2(cos(fj*2.399+t*.13),sin(fj*1.71-t*.11))*(.25+.85*hash11(fj));
if(length(a-b)>${f("density", 1.0, 2.2)})continue;
float d=sdSeg(p,a,b);
col+=shade(${f("contrast", 0.4, 0.7)})*exp(-d*${f("softness", 26.0, 90.0)})*.5;
float u=clamp(dot(p-a,b-a)/max(dot(b-a,b-a),1e-6),0.0,1.0);
float pulse=exp(-abs(fract(t*${f("turbulence", 0.2, 0.7)}+hash11(fi+fj*3.1))-u)*${f("symmetry", 12.0, 40.0)});
col+=shade(${f("depth", 0.8, 0.99)})*exp(-d*90.0)*pulse*1.3;}
col+=shade(${f("contrast", 0.6, 0.9)})*exp(-length(p-a)*${f("drift", 14.0, 40.0)})*.9;}`;
}

/* Physical systems ------------------------------------------------------ */

/** Interference of circular wavefronts from moving sources. */
function rippleTank(g) {
  const { f, i } = params(g);
  return `${uv}p*=${f("scale", 0.7, 2.4)};float t=u_time*u_motion*${f("tempo", 0.3, 1.4)};
float v=0.0;
for(int k=0;k<${i("complexity", 3, 7)};k++){float fk=float(k);
vec2 src=${f("drift", 0.6, 1.4)}*vec2(cos(fk*2.4+t*.21),sin(fk*1.9-t*.17));
float r=length(p-src);
v+=sin(r*${f("density", 9.0, 34.0)}-t*2.4+fk)*exp(-r*${f("depth", 0.1, 0.5)});}
v/=float(${i("complexity", 3, 7)});
float bands=sin(v*${f("symmetry", 2.0, 9.0)});
vec3 col=shade(v*${f("turbulence", 0.8, 2.6)}+bands*.1+${f("palette", 0.0, 1.0)});
col*=.4+.75*smoothstep(-.25,.4,v);`;
}

/** Smooth-minimum blobs read as an iso-contour map. */
function metaballIso(g) {
  const { f, i } = params(g);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 0.7, 2.2)};float t=u_time*u_motion*${f("tempo", 0.08, 0.5)};
float d=8.0;
for(int k=0;k<${i("complexity", 3, 8)};k++){float fk=float(k);
vec2 c0=${f("drift", 0.5, 1.1)}*vec2(cos(t*(.31+fk*.07)+fk*2.1),sin(t*(.27+fk*.05)+fk*1.3));
d=smin(d,length(p-c0)-(${f("depth", 0.15, 0.4)}+.12*sin(fk*3.1+t)),${f("softness", 0.12, 0.4)});}
vec3 col=shade(d*${f("turbulence", 0.6, 2.2)}+${f("palette", 0.0, 1.0)});
col*=.22+.6*smoothstep(${f("symmetry", 0.2, 0.6)},-.1,d);
col=mix(col,shade(${f("contrast", 0.55, 0.95)}),stripe(d*${f("density", 5.0, 22.0)}-t*.4,.25)*.7);
col+=shade(.95)*aastep(abs(d)-.006)*.7;`;
}

/** Suminagashi: concentric ink rings dragged through a combed bath. */
function inkMarbling(g) {
  const { f, i } = params(g);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 0.7, 2.0)};float t=u_time*u_motion*${f("tempo", 0.04, 0.28)};
p+=vec2(sin(p.y*${f("symmetry", 0.6, 3.5)}+t*.4),cos(p.x*${f("symmetry", 0.5, 3.0)}-t*.3))*${f("turbulence", 0.05, 0.45)};
float v=0.0;
for(int k=0;k<${i("complexity", 3, 7)};k++){float fk=float(k);
vec2 c0=${f("drift", 0.4, 1.2)}*vec2(cos(fk*2.7+t*.13),sin(fk*2.1-t*.11));
float r=length(p-c0);
v+=sin(r*${f("density", 10.0, 38.0)}-fk*1.7)*exp(-r*${f("depth", 0.3, 1.0)});}
float ink=stripe(v*.5,${f("contrast", 0.35, 0.6)});
vec3 col=mix(shade(${f("palette", 0.02, 0.25)}),shade(${f("softness", 0.5, 0.95)}+v*.1),ink);
col=mix(col,shade(.97),stripe(v*.5+.5,.06)*.5);`;
}

/** Cartographic survey: banded elevation with minor and index contours. */
function contourSurvey(g) {
  const { f, v } = params(g);
  const filled = v > 0;
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 0.6, 2.2)};float t=u_time*u_motion*${f("tempo", 0.02, 0.16)};
float h=fbm(p*.9+vec2(t*.5,-t*.4))*1.35+fbmL(p*2.7)*.3;
float k=h*${f("density", 6.0, 26.0)};
${filled
    ? `vec3 col=shade(floor(k)*${f("contrast", 0.05, 0.2)}+${f("palette", 0.0, 1.0)});`
    : `vec3 col=shade(${f("palette", 0.82, 1.0)});`}
col=mix(col,shade(${f("depth", 0.05, 0.3)}),stripe(k,${f("softness", 0.08, 0.3)})*.9);
col=mix(col,shade(${f("turbulence", 0.02, 0.2)}),stripe(k*.2,${f("symmetry", 0.1, 0.3)}));`;
}

/** Phyllotactic lattice: a sunflower spiral of drifting seeds. */
function phyllotaxisSwarm(g) {
  const { f, i } = params(g);
  const count = i("complexity", 34, 82);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 0.7, 1.8)};float t=u_time*u_motion*${f("tempo", 0.05, 0.4)};
float acc=0.0,near=8.0,nid=0.0;
for(int k=0;k<${count};k++){float fk=float(k);
float a=fk*${f("symmetry", 2.35, 2.45)}+t*${f("drift", 0.1, 0.7)};
float r=sqrt(fk/${count}.0)*${f("depth", 0.9, 1.5)};
vec2 q=vec2(cos(a),sin(a))*r;
float d=length(p-q);
acc+=exp(-d*${f("density", 10.0, 40.0)});
if(d<near){near=d;nid=fk;}}
vec3 col=shade(near*${f("turbulence", 1.0, 4.0)}+nid*.015+${f("palette", 0.0, 1.0)});
col*=.2+acc*${f("contrast", 0.25, 0.7)}+exp(-near*${f("softness", 6.0, 20.0)})*.6;`;
}

/** Orthogonal trace network with travelling charge. */
function neonCircuit(g) {
  const { f } = params(g);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 0.8, 2.6)};float t=u_time*u_motion*${f("tempo", 0.08, 0.5)};
vec2 gp=p*${f("density", 1.2, 4.0)};
vec2 id=floor(gp);vec2 q=fract(gp)-.5;
float h=hash21(id);
float d1=min(abs(q.x),abs(q.y));
float d2=abs(length(q-vec2(.5,.5))-.5);
float d3=abs(length(q+vec2(.5,.5))-.5);
float d=h<.34?d1:(h<.67?d2:min(d2,d3));
float w=${f("softness", 0.015, 0.07)};
float trace=exp(-max(d-w,0.0)*${f("depth", 40.0, 120.0)});
float charge=exp(-abs(fract(q.x+q.y+t*${f("drift", 0.2, 0.9)}+h)-.5)*${f("symmetry", 5.0, 20.0)});
vec3 col=shade(${f("palette", 0.02, 0.15)})*.6;
col+=shade(${f("contrast", 0.5, 0.85)})*trace*(.55+charge*.9);
col+=shade(${f("turbulence", 0.85, 0.99)})*exp(-length(q)*${f("density", 12.0, 30.0)})*step(.8,h);`;
}

/* Line and lattice ------------------------------------------------------ */

/** Projected wireframe solid: edges only, back edges falling away. */
function wireframeSolid(g) {
  const { f, v } = params(g);
  const lattice = v === 2;
  const size = f("scale", 0.7, 1.4);
  const focal = f("depth", 2.4, 3.6);
  const dist = f("drift", 3.0, 4.4);
  const spin = `q.xz*=rot(t*.6+${f("rotation", -3.0, 3.0)});q.yz*=rot(t*.41);`;
  return `${uv}float t=u_time*u_motion*${f("tempo", 0.06, 0.4)};
float glow=0.0,nodes=0.0,depthAcc=0.0,weight=0.0;
for(int i=0;i<8;i++){
vec3 a=(vec3(float(i&1),float((i>>1)&1),float((i>>2)&1))*2.0-1.0)*${size};
vec3 q=a;${spin}a=q;
vec2 pa=a.xy*${focal}/(a.z+${dist});
nodes+=exp(-length(p-pa)*${f("density", 30.0, 90.0)});
for(int b=0;b<3;b++){
int j=i^(1<<b);
if(j<i)continue;
vec3 c=(vec3(float(j&1),float((j>>1)&1),float((j>>2)&1))*2.0-1.0)*${size};
q=c;${spin}c=q;
vec2 pb=c.xy*${focal}/(c.z+${dist});
float d=sdSeg(p,pa,pb);
float behind=smoothstep(1.0,-1.0,(a.z+c.z)*.5);
float line=exp(-d*${f("symmetry", 40.0, 130.0)})*(${f("softness", 0.25, 0.6)}+.65*behind);
glow+=line;depthAcc+=(a.z+c.z)*.5*line;weight+=line;}}
${lattice ? `glow+=exp(-abs(sdBox(p*rot(t*.2),vec2(${size}*1.7)))*${f("turbulence", 18.0, 60.0)})*.5;` : ""}
vec3 col=shade(${f("palette", 0.02, 0.18)})*.5;
col+=shade(${f("contrast", 0.5, 0.9)}+depthAcc/max(weight,1e-4)*.12)*clamp(glow,0.0,1.8);
col+=shade(${f("turbulence", 0.85, 0.99)})*clamp(nodes,0.0,1.0)*.7;`;
}

/**
 * Side-by-side eyes with lens distortion: a headset view. The three scene
 * variants and the freely varying lens strength exist because a single fixed
 * scene made every sample of this family read as the same pair of dark ovals.
 */
function stereoParallax(g) {
  const { f, i, v } = params(g);
  const scene = v === 1
    // Receding bars: a corridor rather than a void.
    ? `float fz=1.0/max(abs(e.x)+.12,1e-3);
glow+=stripe(atan(e.y,abs(e.x)+.12)*${f("density", 2.0, 7.0)}+t*.5,.12)*exp(-fz*.05)*.9;
glow+=stripe(fz*${f("turbulence", 0.4, 1.6)}-t*1.2,.08)*.7;`
    : v === 2
      // Dense field, weak lens: an open sky.
      ? `for(int k=0;k<${i("complexity", 70, 150)};k++){float fk=float(k);
vec3 q=vec3(hash11(fk)*2.0-1.0,hash11(fk+9.7)*2.0-1.0,fract(hash11(fk+3.1)+t*${f("drift", 0.05, 0.3)})*${f("depth", 2.4, 5.0)}+.3);
vec2 sp=vec2(q.x-eye*${f("softness", 0.03, 0.13)},q.y)*${f("scale", 1.0, 2.2)}/q.z;
glow+=exp(-length(e-sp)*(${f("density", 30.0, 90.0)}+q.z*10.0))*2.2/(.3+q.z);}`
      : `for(int k=0;k<${i("complexity", 46, 96)};k++){float fk=float(k);
vec3 q=vec3(hash11(fk)*2.0-1.0,hash11(fk+9.7)*2.0-1.0,fract(hash11(fk+3.1)+t*${f("drift", 0.05, 0.3)})*${f("depth", 2.4, 5.0)}+.35);
q.xy*=rot(${f("rotation", -1.4, 1.4)}+t*.06);
vec2 sp=vec2(q.x-eye*${f("softness", 0.03, 0.13)},q.y)*${f("scale", 1.0, 2.2)}/q.z;
glow+=exp(-length(e-sp)*(${f("density", 16.0, 46.0)}+q.z*6.0))*1.6/(.35+q.z);}`;
  const floorGrid = v === 2 ? "" : `float fy=e.y+${f("symmetry", 0.5, 0.95)};
if(fy<0.0){
float z=1.0/max(-fy,1e-3);
grid=max(stripe(z*${f("turbulence", 0.3, 1.2)}-t*1.4,.05),stripe((e.x-eye*${f("softness", 0.03, 0.13)})*z*.7,.04));
grid*=exp(-z*.09);}`;
  return `${uv}float t=u_time*u_motion*${f("tempo", 0.1, 0.55)};
float halfW=u_resolution.x/min(u_resolution.x,u_resolution.y);
float eye=p.x<0.0?-1.0:1.0;
vec2 e=vec2((p.x-eye*halfW*.5)/max(halfW*.5,1e-3),p.y);
float r2=dot(e,e);
e*=1.0+${f("turbulence", 0.06, 0.34)}*r2;
float glow=0.0,grid=0.0;
${scene}
${floorGrid}
vec3 col=shade(${f("palette", 0.02, 0.3)})*${f("contrast", 0.35, 0.9)};
col+=shade(${f("symmetry", 0.45, 0.95)})*clamp(glow*1.8,0.0,2.4);
col+=shade(${f("symmetry", 0.4, 0.85)})*grid*1.1;
col*=mix(1.0,smoothstep(1.75,.2,length(e)),${f("turbulence", 0.25, 1.0)});
col*=1.0-aastep(abs(p.x)-.003)*.85;`;
}

/* Synthetic period styles ----------------------------------------------- */

/** Receding neon grid under a banded sun. */
function gridHorizon(g) {
  const { f } = params(g);
  const hy = f("rotation", -0.3, 0.12);
  return `${uv}float t=u_time*u_motion*${f("tempo", 0.1, 0.6)};
float hy=${hy};
vec3 col;
if(p.y<hy){
float z=1.0/max(hy-p.y,1e-3);
float x=p.x*z;
float grid=max(stripe(z*${f("density", 0.3, 1.4)}-t*2.0,${f("softness", 0.02, 0.09)}),stripe(x*${f("symmetry", 0.3, 1.5)},${f("softness", 0.02, 0.09)}));
col=mix(shade(${f("palette", 0.02, 0.16)}),shade(${f("contrast", 0.55, 0.95)}),grid*exp(-z*${f("depth", 0.03, 0.13)}));
}else{
col=shade(${f("palette", 0.3, 0.8)}-(p.y-hy)*${f("turbulence", 0.15, 0.5)});
vec2 sp=p-vec2(${f("drift", -0.7, 0.7)},hy+${f("scale", 0.16, 0.52)});
float sun=aastep(length(sp)-${f("scale", 0.24, 0.5)})*${f("contrast", 0.0, 1.0)};
sun*=1.0-step(0.0,-sp.y)*step(0.0,sin(sp.y*${f("density", 14.0, 44.0)}+t*.6))*.92;
col=mix(col,shade(${f("drift", 0.82, 0.99)}),sun);
col+=shade(.95)*step(.9975,hash21(floor(p*${f("density", 60.0, 180.0)})))*smoothstep(hy,hy+.5,p.y)*${f("turbulence", 0.0, 0.9)};
float ridge=hy+.03+fbmL(vec2(p.x*${f("symmetry", 0.5, 1.8)}+t*.05,0.0))*${f("depth", 0.12, 0.4)};
col=mix(col,shade(${f("palette", 0.02, 0.12)}),aastep(p.y-ridge));}`;
}

/** Memphis Milano: flat confetti primitives scattered on a bright ground. */
function memphisPattern(g) {
  const { f } = params(g);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)});float t=u_time*u_motion*${f("tempo", 0.05, 0.32)};
vec2 gp=p*${f("density", 1.2, 3.8)}+vec2(t*.3,t*.17);
vec2 id=floor(gp);vec2 q=fract(gp)-.5;
float h=hash21(id);
q*=rot(floor(hash21(id+2.1)*4.0)*1.5707963);
float k=floor(hash21(id+7.3)*5.0);
float d=k<1.0?length(q)-${f("scale", 0.18, 0.34)}
:(k<2.0?abs(length(q)-${f("scale", 0.2, 0.36)})-${f("softness", 0.04, 0.1)}
:(k<3.0?sdBox(q,vec2(${f("depth", 0.2, 0.4)},${f("softness", 0.04, 0.12)}))
:(k<4.0?abs(q.y-sin(q.x*${f("symmetry", 6.0, 16.0)})*${f("turbulence", 0.06, 0.2)})-${f("softness", 0.03, 0.08)}
:max(max(-(q.x+.36),-(q.y+.36)),(q.x+q.y)*.7071-.04))));
vec3 col=shade(${f("palette", 0.82, 0.99)});
col=mix(col,shade(${f("contrast", 0.1, 0.55)}+h*.42),aastep(d));
col=mix(col,shade(${f("drift", 0.2, 0.6)}),step(.965,hash21(floor(p*${f("density", 30.0, 90.0)})))*.75);`;
}

/**
 * The surface of a generative image model rendered procedurally: latent-grid
 * interpolation, repeated contrast pushes standing in for denoising steps,
 * checkerboard upsampling artefacts and residual noise. No model is involved,
 * and none is consulted; this is an authored imitation of an appearance.
 */
function latentWash(g) {
  const { f, i } = params(g);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 0.6, 2.0)};float t=u_time*u_motion*${f("tempo", 0.03, 0.22)};
vec2 lat=p*${f("density", 1.2, 4.0)}+t*.15;
vec2 li=floor(lat),lf=fract(lat);
lf=lf*lf*(3.0-2.0*lf);
float img=mix(mix(hash21(li),hash21(li+vec2(1,0)),lf.x),mix(hash21(li+vec2(0,1)),hash21(li+vec2(1,1)),lf.x),lf.y);
vec2 q=p;
for(int k=0;k<${i("complexity", 2, 5)};k++){
q+=vec2(fbmL(q*1.7+t*.1),fbmL(q*1.7+5.3-t*.1))*${f("turbulence", 0.1, 0.6)};
img=mix(img,fbm(q*${f("symmetry", 1.4, 3.4)}+float(k)*2.7),.38);
img=clamp((img-.5)*${f("contrast", 1.15, 1.7)}+.5,0.0,1.0);}
float chk=mod(floor(gl_FragCoord.x/${f("depth", 3.0, 9.0)})+floor(gl_FragCoord.y/${f("depth", 3.0, 9.0)}),2.0);
img+=(chk-.5)*${f("softness", 0.02, 0.13)};
img+=(hash21(gl_FragCoord.xy+floor(t*8.0))-.5)*${f("drift", 0.02, 0.12)};
vec3 col=shade(img*${f("symmetry", 0.8, 2.0)}+${f("palette", 0.0, 1.0)});`;
}

/* Volume and water ------------------------------------------------------ */

/** Scanned volume: emission-absorption integration with a travelling slice. */
function volumeTomogram(g) {
  const { f, i } = params(g);
  return `${uv}float t=u_time*u_motion*${f("tempo", 0.06, 0.4)};
vec3 rd=normalize(vec3(p*rot(${f("rotation", -1.4, 1.4)}),${f("scale", 1.3, 2.4)}));
float ca=t*${f("drift", 0.1, 0.5)};
float trans=1.0,tacc=0.0,gacc=0.0,slice=0.0;
float slicePos=sin(t*.5)*1.1;
for(int k=0;k<${i("complexity", 26, 44)};k++){
vec3 q=vec3(0.0,0.0,-2.6)+rd*(1.1+float(k)*${f("depth", 0.08, 0.17)});
q.xz*=rot(ca);q.yz*=rot(ca*.55);
if(dot(q,q)>2.4)continue;
float dens=fbm3(q*${f("density", 1.1, 3.4)}+vec3(0.0,0.0,t*.08));
dens=smoothstep(${f("turbulence", 0.3, 0.62)},${f("turbulence", 0.62, 0.95)},dens);
float a=dens*${f("softness", 0.1, 0.3)}*trans;
tacc+=(dens+q.y*.25)*a;gacc+=a;trans*=1.0-a*.9;
slice+=dens*exp(-abs(q.z-slicePos)*${f("symmetry", 14.0, 50.0)})*trans;
if(trans<.04)break;}
vec3 col=shade(${f("palette", 0.02, 0.2)})*.35;
col+=shade(${f("contrast", 0.35, 0.85)}+tacc/max(gacc,1e-4)*.3)*clamp(gacc*1.5,0.0,1.3);
col+=shade(${f("drift", 0.8, 0.99)})*clamp(slice*${f("scale", 0.3, 0.9)},0.0,1.0);
col*=mix(1.0,smoothstep(1.5,.45,length(p)),${f("symmetry", 0.15, 1.0)});`;
}

/** Light refracted through a moving surface: caustic net, depth and shafts. */
function causticPool(g) {
  const { f, i } = params(g);
  const iterations = i("complexity", 3, 6);
  // A bounded formulation: the caustic net is the zero set of a warped sum of
  // waves, so every term stays in range instead of running away through a
  // reciprocal.
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 0.7, 2.4)};float t=u_time*u_motion*${f("tempo", 0.2, 0.9)};
vec2 z=p;
for(int k=0;k<${iterations};k++){float fk=float(k);
z+=vec2(sin(z.y*${f("softness", 1.6, 3.0)}+t*1.1+fk),cos(z.x*${f("drift", 1.5, 2.8)}-t*.9+fk))*${f("turbulence", 0.2, 0.55)};}
float w=sin(z.x*${f("density", 3.5, 9.0)}+t)+sin(z.y*${f("density", 3.2, 8.2)}-t*1.2)+sin((z.x+z.y)*${f("density", 2.0, 5.2)}+t*.7);
float w2=sin(z.x*${f("density", 7.0, 18.0)}-t*1.4)+sin(z.y*${f("density", 6.4, 16.4)}+t*.9);
float net=pow(clamp(1.0-abs(w)*${f("symmetry", 0.5, 1.05)},0.0,1.0),${f("contrast", 4.0, 11.0)});
net+=pow(clamp(1.0-abs(w2)*.85,0.0,1.0),${f("contrast", 6.0, 14.0)})*.45;
float shafts=smoothstep(${f("scale", 0.3, 0.62)},1.0,fbmL(vec2(p.x*${f("symmetry", 1.0, 3.4)}+t*.2,p.y*.28)))*exp(-max(p.y,0.0)*${f("depth", 0.3, 1.1)});
vec3 col=shade(${f("palette", 0.05, 0.4)}+clamp(.5-p.y*.35,0.0,1.0)*${f("turbulence", 0.15, 0.45)})*.55;
col+=shade(${f("drift", 0.75, 0.98)})*clamp(net,0.0,1.8)*1.35;
col+=shade(${f("drift", 0.7, 0.95)})*shafts*${f("softness", 0.15, 0.5)};`;
}

/* Rule-driven structure -------------------------------------------------- */

/** Newton's method: basins of attraction, with a relaxation factor in motion. */
function newtonBasins(g) {
  const { f, i, v } = params(g);
  const roots = v === 0 ? 3 : v === 1 ? 4 : 5;
  const powerCode = roots === 3
    ? "vec2 z2=cmul(z,z);vec2 zp=cmul(z2,z);vec2 dz=3.0*z2;"
    : roots === 4
      ? "vec2 z2=cmul(z,z);vec2 zp=cmul(z2,z2);vec2 dz=4.0*cmul(z2,z);"
      : "vec2 z2=cmul(z,z);vec2 z4=cmul(z2,z2);vec2 zp=cmul(z4,z);vec2 dz=5.0*z4;";
  const iterations = i("complexity", 12, 30);
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)})*${f("scale", 0.8, 2.6)};float t=u_time*u_motion*${f("tempo", 0.05, 0.32)};
vec2 z=p;
float relax=1.0+${f("turbulence", 0.1, 0.55)}*sin(t*.6);
int it=${iterations};
for(int k=0;k<${iterations};k++){
${powerCode}
z-=relax*cdiv(zp-vec2(1.0,0.0),dz);
if(dot(zp-vec2(1.0,0.0),zp-vec2(1.0,0.0))<1e-5){it=k;break;}}
float best=1e6,rid=0.0;
for(int r=0;r<${roots};r++){
float a=TAU*float(r)/${roots}.0;
float d=length(z-vec2(cos(a),sin(a)));
if(d<best){best=d;rid=float(r);}}
float speed=float(it)/${iterations}.0;
vec3 col=shade(rid/${roots}.0+speed*${f("density", 0.3, 1.6)}+${f("palette", 0.0, 1.0)});
col*=${f("softness", 0.2, 0.5)}+.85*(1.0-speed);
col=mix(col,shade(${f("contrast", 0.6, 0.95)}),stripe(speed*${f("symmetry", 4.0, 16.0)},${f("depth", 0.05, 0.2)})*.5);`;
}

/**
 * Elementary cellular automaton read in closed form. Rule 90 from a single
 * live cell is the Sierpinski gasket, which a bitwise AND evaluates directly,
 * so the whole evolution is available per fragment without a feedback buffer.
 */
function ruleAutomaton(g) {
  const { f, v } = params(g);
  const rule = v === 0
    ? "int s=x&y;float on=s==0?1.0:0.0;float lvl=float(s&7)/7.0;"
    : v === 1
      ? "int s=x^y;float on=float(s&1);float lvl=float(s&15)/15.0;"
      : "int s=(x&y)+(x^y);float on=float((s>>2)&1);float lvl=float(s&31)/31.0;";
  return `${uv}p*=rot(${f("rotation", -0.5, 0.5)});float t=u_time*u_motion*${f("tempo", 0.3, 2.4)};
vec2 gp=p*${f("density", 6.0, 34.0)};
gp.y-=t*${f("drift", 1.0, 6.0)};
vec2 cell=fract(gp);
ivec2 c=ivec2(floor(gp))+ivec2(4096,4096);
int x=c.x,y=c.y;
${rule}
float border=1.0-smoothstep(0.0,${f("softness", 0.02, 0.3)},min(min(cell.x,1.0-cell.x),min(cell.y,1.0-cell.y)));
vec3 col=shade(${f("palette", 0.03, 0.2)});
col=mix(col,shade(${f("contrast", 0.4, 0.9)}+lvl*${f("symmetry", 0.05, 0.4)}),on);
col=mix(col,shade(${f("turbulence", 0.05, 0.35)}),border*${f("depth", 0.0, 0.55)});`;
}

/** Context-free substitution: one rule applied repeatedly to one primitive. */
function grammarSpiral(g) {
  const { f, i, v } = params(g);
  const primitive = v === 0
    ? `length(q)-${f("scale", 0.35, 0.62)}`
    : v === 1
      ? `sdBox(q,vec2(${f("scale", 0.32, 0.6)},${f("depth", 0.18, 0.5)}))`
      : `abs(length(q)-${f("scale", 0.34, 0.6)})-${f("softness", 0.05, 0.18)}`;
  return `${uv}p*=rot(${f("rotation", -1.4, 1.4)});float t=u_time*u_motion*${f("tempo", 0.03, 0.25)};
vec2 q=p*${f("turbulence", 0.5, 1.5)};
vec3 col=shade(${f("palette", 0.85, 0.99)});
for(int k=0;k<${i("complexity", 8, 20)};k++){float fk=float(k);
float d=${primitive};
col=mix(col,shade(${f("contrast", 0.1, 0.6)}+fk*${f("density", 0.02, 0.11)}),aastep(d)*.94);
q=rot(${f("symmetry", 0.15, 1.2)}+t*.35)*(q-vec2(${f("drift", 0.1, 0.75)}+sin(t*.7)*${f("turbulence", 0.02, 0.16)},0.0))*${f("depth", 1.08, 1.42)};}`;
}

/** A symmetric tree grown by folding space, with a travelling growth front. */
function branchGrowth(g) {
  const { f, i } = params(g);
  const levels = i("complexity", 7, 11);
  const shrink = f("softness", 1.24, 1.42);
  // The fold mirrors into x >= 0, so the child frame has to rotate towards that
  // half plane. Rotating the other way sends every branch into the half the
  // fold never produces, leaving a bare trunk.
  // Growth breathes between a stub and the full tree rather than resetting,
  // so the structure is always substantially present.
  return `${uv}p*=${f("scale", 0.8, 1.4)};float t=u_time*u_motion*${f("tempo", 0.05, 0.35)};
float grow=mix(3.0,${levels + 1}.0,.5+.5*sin(t*${f("drift", 0.15, 0.7)}));
vec2 q=p+vec2(0.0,${f("depth", 0.85, 1.05)});
float d=1e5,k=1.0;
float len=${f("density", 0.4, 0.62)};
for(int i=0;i<${levels};i++){float fi=float(i);
float seg=(sdSeg(q,vec2(0.0),vec2(0.0,len))-${f("turbulence", 0.03, 0.07)})/k;
d=min(d,mix(1e5,seg,smoothstep(fi,fi+1.0,grow)));
q.y-=len;
q.x=abs(q.x);
q=rot(-(${f("symmetry", 0.4, 0.85)}+sin(t*.4+fi*.3)*${f("contrast", 0.02, 0.18)}))*q;
q*=${shrink};k*=${shrink};}
float leaf=(length(q)-${f("rotation", 0.3, 0.9)})/k;
vec3 col=shade(${f("palette", 0.03, 0.22)});
col=mix(col,shade(${f("contrast", 0.35, 0.75)}),aastep(d));
col=mix(col,shade(${f("drift", 0.6, 0.95)}),aastep(leaf)*smoothstep(${levels - 1}.0,${levels}.0,grow)*.85);
col+=shade(${f("drift", 0.6, 0.95)})*exp(-abs(d)*${f("density", 40.0, 120.0)})*.3;`;
}

const BUILDERS = {
  "folded-flow": foldedFlow, "liquid-field": liquidField, "moire-orbit": moireOrbit,
  "cellular-drift": cellularDrift, "polar-vault": polarVault, "aurora-ribbons": auroraRibbons,
  "reaction-lace": reactionLace, "crystalline-lens": crystallineLens, "tidal-ink": tidalInk,
  "magnetic-sand": magneticSand, "spectral-loom": spectralLoom,
  "richter-rhythm": richterRhythm, "eggeling-diagonal": eggelingDiagonal,
  "suprematist-drift": suprematistDrift, "bauhaus-tiles": bauhausTiles,
  "truchet-weave": truchetWeave, "op-stripes": opStripes,
  "halftone-press": halftonePress, "dither-plate": ditherPlate, "crt-broadcast": crtBroadcast,
  "apollonian-foam": apollonianFoam, "orbit-trap-julia": orbitTrapJulia,
  "kifs-cathedral": kifsCathedral, "droste-spiral": drosteSpiral,
  "corridor-flight": corridorFlight, "terrain-flyover": terrainFlyover,
  "monolith-orbit": monolithOrbit, "cloud-drift": cloudDrift,
  "mitosis-plate": mitosisPlate, "venation-leaf": venationLeaf,
  "diatom-plate": diatomPlate, "neural-plexus": neuralPlexus,
  "ripple-tank": rippleTank, "metaball-iso": metaballIso, "ink-marbling": inkMarbling,
  "contour-survey": contourSurvey, "phyllotaxis-swarm": phyllotaxisSwarm,
  "neon-circuit": neonCircuit,
  "wireframe-solid": wireframeSolid, "stereo-parallax": stereoParallax,
  "grid-horizon": gridHorizon, "memphis-pattern": memphisPattern,
  "latent-wash": latentWash, "volume-tomogram": volumeTomogram,
  "caustic-pool": causticPool, "newton-basins": newtonBasins,
  "rule-automaton": ruleAutomaton, "grammar-spiral": grammarSpiral,
  "branch-growth": branchGrowth,
};

export function compileGraph(graph) {
  const build = BUILDERS[graph.family];
  if (!build) throw new Error(`Unknown shader family: ${graph.family}`);
  const emitted = build(graph);
  const { helpers = "", body } = typeof emitted === "string" ? { body: emitted } : emitted;
  return `${GLSL_HEADER}
${shadeFunction(graph)}
${finishFunction(graph)}
${helpers}
void main(){${body}
outColor=vec4(safeColor(finish(col,gl_FragCoord.xy)),1.0);
}
`;
}

const round = (value) => Number(value.toFixed(5));
export function canonicalGraph(graph) {
  return {
    schema: graph.schema, generator: graph.generator, family: graph.family,
    traits: Object.fromEntries(Object.entries(graph.traits).map(([k,v]) => [k,round(v)])),
    palette: Object.fromEntries(Object.entries(graph.palette).map(([k,v]) => [k,v.map(round)])),
  };
}
export function graphSignature(graph) { return JSON.stringify(canonicalGraph(graph)); }
export function graphFeatureVector(graph) {
  return [FAMILY_NAMES.indexOf(graph.family) / (FAMILY_NAMES.length - 1), ...TRAIT_KEYS.map(k => graph.traits[k]), ...graph.palette.a, ...graph.palette.b, ...graph.palette.c, ...graph.palette.d];
}
export function estimateCost(graph) { return FAMILY_META[graph.family].cost + Math.round(graph.traits.complexity * 4); }

export function candidateFromGraph(graph, metadata = {}) {
  const seed = metadata.seed || graph.seed || randomSeed();
  return {
    id: seedId(seed), seed, family: graph.family, graph,
    signature: graphSignature(graph), structuralVector: graphFeatureVector(graph),
    estimatedCost: estimateCost(graph), source: compileGraph(graph),
    colorMode: colorMode(graph), finish: finishMode(graph),
    origin: metadata.origin || "authored-procedural",
    createdAt: new Date().toISOString(),
  };
}
export function generateCandidate(seed = randomSeed(), family = null) { return candidateFromGraph(createGraph(seed, family), { seed, origin: "procedural" }); }
export function familyMeta(family) { return FAMILY_META[family] || { cost: 10, motionMin: 1, varianceMin: 100 }; }
