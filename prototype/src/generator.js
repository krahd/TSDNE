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

function xoshiro128ss(words){const s=new Uint32Array(words);const rotl=(x,k)=>((x<<k)|(x>>>(32-k)))>>>0;return()=>{const result=Math.imul(rotl(Math.imul(s[1],5)>>>0,7),9)>>>0;const t=(s[1]<<9)>>>0;s[2]^=s[0];s[3]^=s[1];s[1]^=s[2];s[0]^=s[3];s[2]^=t;s[3]=rotl(s[3],11);return result/0x100000000;};}
export function randomSeed(){const words=new Uint32Array(4);crypto.getRandomValues(words);return[...words];}
export function seedId(seed){return seed.map(v=>v.toString(16).padStart(8,"0")).join("");}
const f=(rng,min,max,digits=4)=>(min+rng()*(max-min)).toFixed(digits);
const i=(rng,min,max)=>Math.floor(min+rng()*(max-min+1));
function paletteParams(rng){const a=[f(rng,.30,.70),f(rng,.30,.70),f(rng,.30,.70)],b=[f(rng,.22,.58),f(rng,.22,.58),f(rng,.22,.58)],c=[f(rng,.65,1.55),f(rng,.65,1.55),f(rng,.65,1.55)],d=[f(rng,0,1),f(rng,0,1),f(rng,0,1)];return{a,b,c,d,code:`vec3(${a}),vec3(${b}),vec3(${c}),vec3(${d})`};}

const families=[
{name:"folded-flow",build(rng,pal){const scale=f(rng,1.2,3.8),speed=f(rng,.08,.42),turns=f(rng,.25,1.1),layers=i(rng,3,7),density=f(rng,2.5,7.5);return{params:[scale,speed,turns,layers,density],body:`
vec2 p=(2.0*gl_FragCoord.xy-u_resolution.xy)/min(u_resolution.x,u_resolution.y);p*=${scale};float t=u_time*${speed};float acc=0.0;vec2 q=p;
for(int k=0;k<${layers};k++){q=abs(q)/max(dot(q,q),0.16)-${turns};q*=rot(t*0.17+float(k)*0.73);acc+=sin(q.x*${density}+t)*cos(q.y*(${density}*0.81)-t*1.2);}
float v=acc/float(${layers});vec3 col=palette(v*0.19+length(q)*0.08+t*0.03,${pal.code});col*=0.78+0.32*cos(v*2.0);outColor=vec4(pow(max(col,0.0),vec3(0.9)),1.0);`};}},
{name:"liquid-field",build(rng,pal){const scale=f(rng,1.0,3.2),warp=f(rng,.65,2.4),speed=f(rng,.05,.28),ridge=f(rng,2.0,7.0),glow=f(rng,.4,1.4);return{params:[scale,warp,speed,ridge,glow],body:`
vec2 p=(2.0*gl_FragCoord.xy-u_resolution.xy)/min(u_resolution.x,u_resolution.y);p*=${scale};float t=u_time*${speed};vec2 w=vec2(fbm(p+vec2(t,-t)),fbm(p+vec2(7.1-t,3.4+t)));vec2 q=p+${warp}*(w-0.5);float a=fbm(q*1.7-t*0.4);float b=fbm(q*3.1+vec2(a*2.0,-a)+t*0.23);float v=sin((a-b)*${ridge}+length(q)*1.2);vec3 col=palette(a*0.7+b*0.5+v*0.11,${pal.code});col+=${glow}*0.08/(0.08+abs(v));outColor=vec4(col,1.0);`};}},
{name:"moire-orbit",build(rng,pal){const bands=f(rng,7.0,22.0),drift=f(rng,.03,.22),twist=f(rng,.2,1.8),count=i(rng,3,7),curve=f(rng,.25,1.4);return{params:[bands,drift,twist,count,curve],body:`
vec2 p=(2.0*gl_FragCoord.xy-u_resolution.xy)/min(u_resolution.x,u_resolution.y);float t=u_time*${drift};float v=0.0;
for(int k=0;k<${count};k++){float fk=float(k);vec2 q=rot(fk*${twist}+t*(0.3+fk*0.07))*p;q+=${curve}*vec2(sin(q.y*1.3+t),cos(q.x*1.1-t))/(2.0+fk);v+=sin(q.x*(${bands}+fk*1.37)+sin(q.y*(3.0+fk)));}
v/=float(${count});float ring=sin(length(p)*${bands}*0.72-t*6.0);vec3 col=palette(v*0.27+ring*0.09+t*0.04,${pal.code});col*=0.66+0.40*smoothstep(-0.7,0.8,v+ring*0.2);outColor=vec4(col,1.0);`};}},
{name:"cellular-drift",build(rng,pal){const scale=f(rng,3.0,8.0),speed=f(rng,.05,.22),edge=f(rng,7.0,24.0),bend=f(rng,.08,.48),pulse=f(rng,.5,2.2);return{params:[scale,speed,edge,bend,pulse],body:`
vec2 p=(2.0*gl_FragCoord.xy-u_resolution.xy)/min(u_resolution.x,u_resolution.y);float t=u_time*${speed};p*=rot(t*0.19);p+=${bend}*vec2(sin(p.y*2.0+t),cos(p.x*1.7-t));vec2 g=floor(p*${scale});vec2 r=fract(p*${scale});float d1=10.0,d2=10.0,id=0.0;
for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 o=vec2(float(x),float(y));vec2 h=hash22(g+o);vec2 c=o+0.5+0.42*sin(t*${pulse}+6.2831*h)-r;float d=dot(c,c);if(d<d1){d2=d1;d1=d;id=h.x+h.y;}else if(d<d2)d2=d;}
float border=sqrt(d2)-sqrt(d1);float v=exp(-border*${edge});vec3 col=palette(id+sqrt(d1)*0.45+t*0.03,${pal.code});col=mix(col*0.35,col+vec3(v*0.55),smoothstep(0.0,0.5,v));outColor=vec4(col,1.0);`};}},
{name:"polar-vault",build(rng,pal){const spokes=f(rng,3.0,14.0),rings=f(rng,4.0,18.0),speed=f(rng,.06,.32),warp=f(rng,.15,.9),depth=f(rng,.8,2.4);return{params:[spokes,rings,speed,warp,depth],body:`
vec2 p=(2.0*gl_FragCoord.xy-u_resolution.xy)/min(u_resolution.x,u_resolution.y);float t=u_time*${speed};float r=length(p)+0.001;float a=atan(p.y,p.x);float tunnel=log(r)*${rings}-t*5.0;float spiral=a*${spokes}+${warp}*sin(tunnel*0.7)+t*2.0;float v=sin(tunnel+sin(spiral))+cos(spiral*0.7-tunnel*0.31);float mask=exp(-r*${depth})+0.18/(0.08+abs(sin(spiral)*cos(tunnel)));vec3 col=palette(v*0.17+tunnel*0.025,${pal.code});col*=0.42+0.52*mask;outColor=vec4(col,1.0);`};}}
];

export function generateCandidate(seed=randomSeed()){
  const rng=xoshiro128ss(seed),family=families[Math.floor(rng()*families.length)],pal=paletteParams(rng),built=family.build(rng,pal);
  const source=`${GLSL_HEADER}\nvoid main(){${built.body}\n}\n`;
  const signature=`${family.name}:${[...built.params,...pal.a,...pal.b,...pal.c,...pal.d].join(":")}`;
  return{seed,id:seedId(seed),family:family.name,signature,source};
}
