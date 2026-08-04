const GLSL_HEADER = `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_motion;
uniform float u_intensity;
#define PI 3.141592653589793
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
vec2 hash22(vec2 p){float n=hash21(p);return vec2(n,hash21(p+n+17.17));}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.0,a=0.5;mat2 m=rot(0.53);for(int i=0;i<5;i++){v+=a*noise(p);p=m*p*2.03+17.1;a*=0.5;}return v;}
float sdCircle(vec2 p,float r){return length(p)-r;}
float sdBox(vec2 p,vec2 b){vec2 d=abs(p)-b;return length(max(d,0.0))+min(max(d.x,d.y),0.0);}
vec3 palette(float t,vec3 a,vec3 b,vec3 c,vec3 d){return a+b*cos(6.2831853*(c*t+d));}
vec3 safeColor(vec3 c){c=max(c,vec3(0.0));return mix(vec3(dot(c,vec3(.2126,.7152,.0722))),c,u_intensity);}
`;

export const FAMILY_NAMES = [
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
  "echo-garden",
];

export const TRAIT_KEYS = [
  "scale", "tempo", "density", "turbulence", "contrast", "palette",
  "complexity", "rotation", "symmetry", "softness", "drift", "depth",
];

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
  "echo-garden": { cost: 7, motionMin: 0.65, varianceMin: 80 },
};

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
    schema: "tsdne-program-v3",
    generator: "tsdne-procedural-v1",
    family: family || FAMILY_NAMES[Math.floor(rng() * FAMILY_NAMES.length)],
    seed: [...seed],
    traits: randomTraits(rng),
    palette: randomPalette(rng),
  };
}

export const createProgram = createGraph;

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

function common(graph) {
  const t = graph.traits;
  return {
    scale: fixed(range(t.scale, 0.7, 4.5)), speed: fixed(range(t.tempo, 0.025, 0.42)),
    density: fixed(range(t.density, 2.2, 18.0)), warp: fixed(range(t.turbulence, 0.08, 2.4)),
    rotation: fixed(range(t.rotation, -1.4, 1.4)), symmetry: fixed(range(t.symmetry, 1.0, 10.0)),
    soft: fixed(range(t.softness, 0.015, 0.38)), drift: fixed(range(t.drift, -1.0, 1.0)),
    depth: fixed(range(t.depth, 0.4, 3.2)), layers: integer(t.complexity, 3, 8),
    palette: paletteCode(graph),
  };
}

const uv = `vec2 p=(2.0*gl_FragCoord.xy-u_resolution.xy)/min(u_resolution.x,u_resolution.y);`;

function foldedFlow(g){const c=common(g);return `${uv}p*=rot(${c.rotation});p*=${c.scale};float t=u_time*u_motion*${c.speed};float acc=0.0;vec2 q=p;for(int k=0;k<${c.layers};k++){q=abs(q)/max(dot(q,q),0.16)-${c.warp};q*=rot(t*.17+float(k)*.73);acc+=sin(q.x*${c.density}+t)*cos(q.y*(${c.density}*.81)-t*1.2);}float v=acc/float(${c.layers});vec3 col=palette(v*.19+length(q)*.08+t*.03,${c.palette});col*=.72+.28*cos(v*2.0);outColor=vec4(safeColor(col),1.0);`;}
function liquidField(g){const c=common(g);return `${uv}p*=rot(${c.rotation});p*=${c.scale};float t=u_time*u_motion*${c.speed};vec2 w=vec2(fbm(p+vec2(t,-t)),fbm(p+vec2(7.1-t,3.4+t)));vec2 q=p+${c.warp}*(w-.5);float a=fbm(q*1.7-t*.4);float b=fbm(q*3.1+vec2(a*2.0,-a)+t*.23);float v=sin((a-b)*${c.density}+length(q)*1.2);vec3 col=palette(a*.7+b*.5+v*.11,${c.palette});col+=.065/(.09+abs(v));outColor=vec4(safeColor(col),1.0);`;}
function moireOrbit(g){const c=common(g);return `${uv}p*=rot(${c.rotation})*${c.scale};float t=u_time*u_motion*${c.speed};float v=0.0;for(int k=0;k<${c.layers};k++){float fk=float(k);vec2 q=rot(fk*.47+t*(.3+fk*.07))*p;q+=${c.warp}*vec2(sin(q.y*1.3+t),cos(q.x*1.1-t))/(2.0+fk);v+=sin(q.x*(${c.density}+fk*1.37)+sin(q.y*(3.0+fk)));}v/=float(${c.layers});float ring=sin(length(p)*${c.density}*.72-t*6.0);vec3 col=palette(v*.27+ring*.09+t*.04,${c.palette});col*=.62+.34*smoothstep(-.7,.8,v+ring*.2);outColor=vec4(safeColor(col),1.0);`;}
function cellularDrift(g){const c=common(g);return `${uv}float t=u_time*u_motion*${c.speed};p*=rot(t*.19+${c.rotation});p+=${c.warp}*.25*vec2(sin(p.y*2.0+t),cos(p.x*1.7-t));vec2 grid=floor(p*${c.density});vec2 r=fract(p*${c.density});float d1=10.0,d2=10.0,id=0.0;for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 o=vec2(float(x),float(y));vec2 h=hash22(grid+o);vec2 cc=o+.5+.42*sin(t*(1.0+${c.drift})+6.2831*h)-r;float d=dot(cc,cc);if(d<d1){d2=d1;d1=d;id=h.x+h.y;}else if(d<d2)d2=d;}float border=sqrt(d2)-sqrt(d1);float v=exp(-border*(8.0+${c.depth}*5.0));vec3 col=palette(id+sqrt(d1)*.45+t*.03,${c.palette});col=mix(col*.32,col+vec3(v*.45),smoothstep(0.0,.5,v));outColor=vec4(safeColor(col),1.0);`;}
function polarVault(g){const c=common(g);return `${uv}p*=rot(${c.rotation});float t=u_time*u_motion*${c.speed};float r=length(p)+.001;float a=atan(p.y,p.x);float tunnel=log(r)*${c.density}-t*5.0;float spiral=a*${c.symmetry}+${c.warp}*sin(tunnel*.7)+t*2.0;float v=sin(tunnel+sin(spiral))+cos(spiral*.7-tunnel*.31);float mask=exp(-r*${c.depth})+.15/(.1+abs(sin(spiral)*cos(tunnel)));vec3 col=palette(v*.17+tunnel*.025,${c.palette});col*=.4+.48*mask;outColor=vec4(safeColor(col),1.0);`;}
function auroraRibbons(g){const c=common(g);return `${uv}p*=rot(${c.rotation});float t=u_time*u_motion*${c.speed};float y=p.y;float v=0.0;for(int k=0;k<${c.layers};k++){float fk=float(k);float wave=sin(p.x*(1.2+fk*.31)+t*(.5+fk*.08)+fbm(p*.7+fk)*${c.warp});float d=abs(y-wave*.22-fk*.07+float(${c.layers})*.035);v+=exp(-d*(12.0+${c.depth}*8.0));}float haze=fbm(p*${c.scale}+vec2(t*.2,0.0));vec3 col=palette(v*.12+haze*.35+p.y*.08,${c.palette});col*=.22+v*.42+haze*.2;outColor=vec4(safeColor(col),1.0);`;}
function reactionLace(g){const c=common(g);return `${uv}p*=rot(${c.rotation})*${c.scale};float t=u_time*u_motion*${c.speed};float a=fbm(p*1.2+vec2(t,0.0));float b=fbm((p+vec2(a,-a))*2.4-vec2(0.0,t));float v=sin((a-b)*${c.density}+sin((p.x+p.y)*${c.symmetry}));float lace=smoothstep(${c.soft},0.0,abs(v)*.22);vec3 col=palette(a*.4+b*.55+v*.1+t*.02,${c.palette});col=mix(col*.25,col+lace*.45,lace);outColor=vec4(safeColor(col),1.0);`;}
function crystallineLens(g){const c=common(g);return `${uv}p*=rot(${c.rotation})*${c.scale};float t=u_time*u_motion*${c.speed};float a=atan(p.y,p.x);float r=length(p);float sectors=floor((a/6.2831853+.5)*${c.symmetry});float ang=(sectors+.5)/${c.symmetry}*6.2831853-PI;vec2 q=rot(-ang)*p;q.x=abs(q.x);float facets=sin(q.x*${c.density}+r*${c.depth}-t*2.0);float lens=1.0/(.12+abs(sdCircle(q, .45+.16*sin(t+sectors))));vec3 col=palette(facets*.18+r*.2+sectors*.07,${c.palette});col*=.25+.08*lens;outColor=vec4(safeColor(col),1.0);`;}
function tidalInk(g){const c=common(g);return `${uv}p*=rot(${c.rotation})*${c.scale};float t=u_time*u_motion*${c.speed};vec2 q=p;float ink=0.0;for(int k=0;k<${c.layers};k++){float fk=float(k);q+=${c.warp}*.12*vec2(sin(q.y*(1.4+fk*.1)+t),cos(q.x*(1.2+fk*.13)-t));float f=fbm(q*(1.1+fk*.28)+fk*3.7);ink+=smoothstep(.62-${c.soft},.62+${c.soft},f);}ink/=float(${c.layers});float tide=sin(p.y*${c.density}+fbm(p*1.3)*4.0+t*2.0);vec3 col=palette(ink*.7+tide*.08+t*.015,${c.palette});col*=.18+ink*.72;outColor=vec4(safeColor(col),1.0);`;}
function magneticSand(g){const c=common(g);return `${uv}p*=rot(${c.rotation})*${c.scale};float t=u_time*u_motion*${c.speed};float field=0.0;for(int k=0;k<${c.layers};k++){float fk=float(k);vec2 pole=.55*vec2(cos(t*(.3+fk*.05)+fk*2.1),sin(t*(.23+fk*.07)+fk*1.7));vec2 d=p-pole;field+=sin(1.0/(.08+dot(d,d))*${c.depth}+atan(d.y,d.x)*${c.symmetry});}float grain=hash21(floor(gl_FragCoord.xy*(.35+${c.density}*.04)));float v=smoothstep(.55-${c.soft},.55+${c.soft},.5+.5*sin(field+grain*2.0));vec3 col=palette(field*.06+grain*.12+t*.01,${c.palette});col*=.2+v*.75;outColor=vec4(safeColor(col),1.0);`;}
function spectralLoom(g){const c=common(g);return `${uv}p*=rot(${c.rotation})*${c.scale};float t=u_time*u_motion*${c.speed};float warp=sin(p.x*${c.density}+sin(p.y*${c.symmetry}+t))*cos(p.y*(${c.density}*.73)-t);float weft=sin((p.x+p.y)*${c.symmetry}+fbm(p*1.7)*${c.warp}*3.0);float v=warp+weft;float thread=smoothstep(.75-${c.soft},.75+${c.soft},abs(sin(v*3.14159)));vec3 col=palette(v*.17+p.x*.05-p.y*.04+t*.02,${c.palette});col*=.28+.62*thread;outColor=vec4(safeColor(col),1.0);`;}
function echoGarden(g){const c=common(g);return `${uv}p*=rot(${c.rotation});float t=u_time*u_motion*${c.speed};float v=0.0;for(int k=0;k<${c.layers};k++){float fk=float(k);vec2 center=.55*vec2(sin(fk*2.13+t*.31),cos(fk*1.71-t*.27));vec2 q=p-center;float petals=sin(atan(q.y,q.x)*${c.symmetry}+fk)+sin(length(q)*${c.density}-t*(1.0+fk*.08));float bloom=exp(-length(q)*(2.0+${c.depth}))*(.5+.5*petals);v+=bloom;}float mist=fbm(p*${c.scale}+vec2(t*.08,-t*.05));vec3 col=palette(v*.22+mist*.34+t*.01,${c.palette});col*=.18+v*.45+mist*.22;outColor=vec4(safeColor(col),1.0);`;}

const BUILDERS = {
  "folded-flow": foldedFlow, "liquid-field": liquidField, "moire-orbit": moireOrbit,
  "cellular-drift": cellularDrift, "polar-vault": polarVault, "aurora-ribbons": auroraRibbons,
  "reaction-lace": reactionLace, "crystalline-lens": crystallineLens, "tidal-ink": tidalInk,
  "magnetic-sand": magneticSand, "spectral-loom": spectralLoom, "echo-garden": echoGarden,
};

export function compileGraph(graph) {
  const build = BUILDERS[graph.family];
  if (!build) throw new Error(`Unknown shader family: ${graph.family}`);
  return `${GLSL_HEADER}\nvoid main(){${build(graph)}\n}\n`;
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
    origin: metadata.origin || "authored-procedural",
    createdAt: new Date().toISOString(),
  };
}
export function generateCandidate(seed = randomSeed(), family = null) { return candidateFromGraph(createGraph(seed, family), { seed, origin: "procedural" }); }
export function familyMeta(family) { return FAMILY_META[family] || { cost: 10, motionMin: 1, varianceMin: 100 }; }
