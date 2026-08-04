const GLSL_HEADER = `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 u_resolution;
uniform float u_time;
#define PI 3.141592653589793
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
vec2 hash22(vec2 p){float n=hash21(p);return vec2(n,hash21(p+n+17.17));}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.0,a=0.5;mat2 m=rot(0.53);for(int i=0;i<5;i++){v+=a*noise(p);p=m*p*2.03+17.1;a*=0.5;}return v;}
vec3 palette(float t,vec3 a,vec3 b,vec3 c,vec3 d){return a+b*cos(6.2831853*(c*t+d));}
`;

const FAMILY_NAMES = [
  "folded-flow",
  "liquid-field",
  "moire-orbit",
  "cellular-drift",
  "polar-vault",
];

export const MUTATION_KEYS = [
  "scale",
  "tempo",
  "density",
  "turbulence",
  "contrast",
  "palette",
  "complexity",
  "rotation",
];

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const range = (value, min, max) => min + clamp(value) * (max - min);
const integer = (value, min, max) => Math.round(range(value, min, max));
const fixed = (value, digits = 4) => Number(value).toFixed(digits);

function xoshiro128ss(words) {
  const state = new Uint32Array(words);
  const rotl = (x, k) => ((x << k) | (x >>> (32 - k))) >>> 0;
  return () => {
    const result = Math.imul(rotl(Math.imul(state[1], 5) >>> 0, 7), 9) >>> 0;
    const t = (state[1] << 9) >>> 0;
    state[2] ^= state[0];
    state[3] ^= state[1];
    state[1] ^= state[2];
    state[0] ^= state[3];
    state[2] ^= t;
    state[3] = rotl(state[3], 11);
    return result / 0x100000000;
  };
}

export function randomSeed() {
  const words = new Uint32Array(4);
  crypto.getRandomValues(words);
  return [...words];
}

export function seedId(seed) {
  return seed.map((value) => value.toString(16).padStart(8, "0")).join("");
}

function randomPalette(rng) {
  const vector = (min, max) => [0, 1, 2].map(() => min + rng() * (max - min));
  return {
    a: vector(0.3, 0.7),
    b: vector(0.22, 0.58),
    c: vector(0.65, 1.55),
    d: vector(0, 1),
  };
}

function randomTraits(rng) {
  return Object.fromEntries(MUTATION_KEYS.map((key) => [key, rng()]));
}

export function createGraph(seed = randomSeed()) {
  const rng = xoshiro128ss(seed);
  return {
    schema: "tsdne-graph-v1",
    family: FAMILY_NAMES[Math.floor(rng() * FAMILY_NAMES.length)],
    seed: [...seed],
    traits: randomTraits(rng),
    palette: randomPalette(rng),
  };
}

function paletteCode(graph) {
  const contrast = range(graph.traits.contrast, 0.68, 1.24);
  const phase = (graph.traits.palette - 0.5) * 0.9;
  const array = (values) => values.map((value) => fixed(value)).join(",");
  const a = graph.palette.a.map((value) => clamp(value * (0.92 + contrast * 0.08), 0, 1.2));
  const b = graph.palette.b.map((value) => clamp(value * contrast, 0, 1.2));
  const c = graph.palette.c;
  const d = graph.palette.d.map((value, index) => value + phase * (index + 1) * 0.17);
  return `vec3(${array(a)}),vec3(${array(b)}),vec3(${array(c)}),vec3(${array(d)})`;
}

function foldedFlow(graph) {
  const { traits } = graph;
  const scale = fixed(range(traits.scale, 1.15, 4.1));
  const speed = fixed(range(traits.tempo, 0.06, 0.48));
  const turns = fixed(range(traits.turbulence, 0.2, 1.2));
  const layers = integer(traits.complexity, 3, 8);
  const density = fixed(range(traits.density, 2.3, 8.3));
  const rotation = fixed(range(traits.rotation, -1.2, 1.2));
  return `
vec2 p=(2.0*gl_FragCoord.xy-u_resolution.xy)/min(u_resolution.x,u_resolution.y);
p*=rot(${rotation});p*=${scale};float t=u_time*${speed};float acc=0.0;vec2 q=p;
for(int k=0;k<${layers};k++){q=abs(q)/max(dot(q,q),0.16)-${turns};q*=rot(t*0.17+float(k)*0.73);acc+=sin(q.x*${density}+t)*cos(q.y*(${density}*0.81)-t*1.2);}
float v=acc/float(${layers});vec3 col=palette(v*0.19+length(q)*0.08+t*0.03,${paletteCode(graph)});col*=0.78+0.32*cos(v*2.0);outColor=vec4(pow(max(col,0.0),vec3(0.9)),1.0);`;
}

function liquidField(graph) {
  const { traits } = graph;
  const scale = fixed(range(traits.scale, 0.95, 3.45));
  const warp = fixed(range(traits.turbulence, 0.55, 2.8));
  const speed = fixed(range(traits.tempo, 0.04, 0.34));
  const ridge = fixed(range(traits.density, 1.8, 8.0));
  const glow = fixed(range(traits.contrast, 0.3, 1.55));
  const rotation = fixed(range(traits.rotation, -1.1, 1.1));
  return `
vec2 p=(2.0*gl_FragCoord.xy-u_resolution.xy)/min(u_resolution.x,u_resolution.y);
p*=rot(${rotation});p*=${scale};float t=u_time*${speed};vec2 w=vec2(fbm(p+vec2(t,-t)),fbm(p+vec2(7.1-t,3.4+t)));vec2 q=p+${warp}*(w-0.5);float a=fbm(q*1.7-t*0.4);float b=fbm(q*3.1+vec2(a*2.0,-a)+t*0.23);float v=sin((a-b)*${ridge}+length(q)*1.2);vec3 col=palette(a*0.7+b*0.5+v*0.11,${paletteCode(graph)});col+=${glow}*0.08/(0.08+abs(v));outColor=vec4(col,1.0);`;
}

function moireOrbit(graph) {
  const { traits } = graph;
  const bands = fixed(range(traits.density, 6.5, 24.0));
  const drift = fixed(range(traits.tempo, 0.025, 0.28));
  const twist = fixed(range(traits.rotation, 0.16, 2.1));
  const count = integer(traits.complexity, 3, 8);
  const curve = fixed(range(traits.turbulence, 0.18, 1.65));
  const scale = fixed(range(traits.scale, 0.75, 1.55));
  return `
vec2 p=(2.0*gl_FragCoord.xy-u_resolution.xy)/min(u_resolution.x,u_resolution.y);p*=${scale};float t=u_time*${drift};float v=0.0;
for(int k=0;k<${count};k++){float fk=float(k);vec2 q=rot(fk*${twist}+t*(0.3+fk*0.07))*p;q+=${curve}*vec2(sin(q.y*1.3+t),cos(q.x*1.1-t))/(2.0+fk);v+=sin(q.x*(${bands}+fk*1.37)+sin(q.y*(3.0+fk)));}
v/=float(${count});float ring=sin(length(p)*${bands}*0.72-t*6.0);vec3 col=palette(v*0.27+ring*0.09+t*0.04,${paletteCode(graph)});col*=0.66+0.40*smoothstep(-0.7,0.8,v+ring*0.2);outColor=vec4(col,1.0);`;
}

function cellularDrift(graph) {
  const { traits } = graph;
  const scale = fixed(range(traits.scale, 2.7, 9.0));
  const speed = fixed(range(traits.tempo, 0.045, 0.28));
  const edge = fixed(range(traits.contrast, 6.0, 28.0));
  const bend = fixed(range(traits.turbulence, 0.06, 0.58));
  const pulse = fixed(range(traits.density, 0.45, 2.65));
  const rotation = fixed(range(traits.rotation, -0.7, 0.7));
  return `
vec2 p=(2.0*gl_FragCoord.xy-u_resolution.xy)/min(u_resolution.x,u_resolution.y);float t=u_time*${speed};p*=rot(t*0.19+${rotation});p+=${bend}*vec2(sin(p.y*2.0+t),cos(p.x*1.7-t));vec2 g=floor(p*${scale});vec2 r=fract(p*${scale});float d1=10.0,d2=10.0,id=0.0;
for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 o=vec2(float(x),float(y));vec2 h=hash22(g+o);vec2 c=o+0.5+0.42*sin(t*${pulse}+6.2831*h)-r;float d=dot(c,c);if(d<d1){d2=d1;d1=d;id=h.x+h.y;}else if(d<d2)d2=d;}
float border=sqrt(d2)-sqrt(d1);float v=exp(-border*${edge});vec3 col=palette(id+sqrt(d1)*0.45+t*0.03,${paletteCode(graph)});col=mix(col*0.35,col+vec3(v*0.55),smoothstep(0.0,0.5,v));outColor=vec4(col,1.0);`;
}

function polarVault(graph) {
  const { traits } = graph;
  const spokes = fixed(range(traits.density, 2.7, 15.5));
  const rings = fixed(range(traits.scale, 3.5, 20.0));
  const speed = fixed(range(traits.tempo, 0.05, 0.38));
  const warp = fixed(range(traits.turbulence, 0.1, 1.05));
  const depth = fixed(range(traits.contrast, 0.7, 2.8));
  const rotation = fixed(range(traits.rotation, -1.0, 1.0));
  return `
vec2 p=(2.0*gl_FragCoord.xy-u_resolution.xy)/min(u_resolution.x,u_resolution.y);p*=rot(${rotation});float t=u_time*${speed};float r=length(p)+0.001;float a=atan(p.y,p.x);float tunnel=log(r)*${rings}-t*5.0;float spiral=a*${spokes}+${warp}*sin(tunnel*0.7)+t*2.0;float v=sin(tunnel+sin(spiral))+cos(spiral*0.7-tunnel*0.31);float mask=exp(-r*${depth})+0.18/(0.08+abs(sin(spiral)*cos(tunnel)));vec3 col=palette(v*0.17+tunnel*0.025,${paletteCode(graph)});col*=0.42+0.52*mask;outColor=vec4(col,1.0);`;
}

export function compileGraph(graph) {
  const builders = {
    "folded-flow": foldedFlow,
    "liquid-field": liquidField,
    "moire-orbit": moireOrbit,
    "cellular-drift": cellularDrift,
    "polar-vault": polarVault,
  };
  const build = builders[graph.family];
  if (!build) throw new Error(`Unknown shader family: ${graph.family}`);
  return `${GLSL_HEADER}\nvoid main(){${build(graph)}\n}\n`;
}

function roundedGraph(graph) {
  const round = (value) => Number(value.toFixed(4));
  return {
    schema: graph.schema,
    family: graph.family,
    traits: Object.fromEntries(Object.entries(graph.traits).map(([key, value]) => [key, round(value)])),
    palette: Object.fromEntries(Object.entries(graph.palette).map(([key, values]) => [key, values.map(round)])),
  };
}

export function graphSignature(graph) {
  return JSON.stringify(roundedGraph(graph));
}

export function candidateFromGraph(graph, metadata = {}) {
  const seed = metadata.seed || graph.seed || randomSeed();
  return {
    id: seedId(seed),
    seed,
    family: graph.family,
    graph,
    signature: graphSignature(graph),
    source: compileGraph(graph),
    origin: metadata.origin || "procedural",
    parentId: metadata.parentId || null,
    model: metadata.model || null,
    mutation: metadata.mutation || null,
  };
}

export function generateCandidate(seed = randomSeed()) {
  return candidateFromGraph(createGraph(seed), { seed, origin: "procedural" });
}

export function describeCandidate(candidate) {
  return {
    family: candidate.family,
    traits: roundedGraph(candidate.graph).traits,
    instruction: "Propose restrained deltas from -1 to 1. Preserve recognisable continuity while making the result meaningfully different.",
  };
}

export function normaliseMutation(input) {
  const source = input && typeof input === "object" ? input : {};
  const changes = source.changes && typeof source.changes === "object" ? source.changes : source;
  const result = {};
  for (const key of MUTATION_KEYS) {
    const value = Number(changes[key]);
    result[key] = Number.isFinite(value) ? clamp(value, -1, 1) : 0;
  }
  if (Object.values(result).every((value) => Math.abs(value) < 0.08)) {
    result.palette = 0.35;
    result.turbulence = -0.22;
  }
  return result;
}

export function mutateCandidate(candidate, mutationInput, metadata = {}) {
  const mutation = normaliseMutation(mutationInput);
  const graph = structuredClone(candidate.graph);
  const step = 0.24;
  for (const key of MUTATION_KEYS) {
    graph.traits[key] = clamp(graph.traits[key] + mutation[key] * step);
  }
  const paletteShift = mutation.palette * 0.18;
  graph.palette.d = graph.palette.d.map((value, index) => value + paletteShift * (index + 1));
  const seed = randomSeed();
  graph.seed = [...seed];
  return candidateFromGraph(graph, {
    seed,
    origin: metadata.origin || "webllm",
    parentId: candidate.id,
    model: metadata.model || null,
    mutation,
  });
}
