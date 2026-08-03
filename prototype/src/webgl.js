const VERTEX_SOURCE=`#version 300 es
in vec2 a_position;
void main(){gl_Position=vec4(a_position,0.0,1.0);}
`;

function compile(gl,type,source){
  const shader=gl.createShader(type);
  gl.shaderSource(shader,source);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
    const error=gl.getShaderInfoLog(shader)||"Unknown shader compile error";
    gl.deleteShader(shader);
    throw new Error(error);
  }
  return shader;
}

export function createRenderer(canvas){
  const gl=canvas.getContext("webgl2",{antialias:false,alpha:false,preserveDrawingBuffer:true});
  if(!gl)throw new Error("WebGL2 is required for this prototype.");
  const vertex=compile(gl,gl.VERTEX_SHADER,VERTEX_SOURCE);
  const buffer=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  let current=null;

  function setFragmentSource(source){
    const fragment=compile(gl,gl.FRAGMENT_SHADER,source);
    const program=gl.createProgram();
    gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);gl.deleteShader(fragment);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
      const error=gl.getProgramInfoLog(program)||"Unknown program link error";
      gl.deleteProgram(program);throw new Error(error);
    }
    if(current?.program)gl.deleteProgram(current.program);
    current={program,position:gl.getAttribLocation(program,"a_position"),resolution:gl.getUniformLocation(program,"u_resolution"),time:gl.getUniformLocation(program,"u_time")};
  }

  function resize(pixelRatio=Math.min(devicePixelRatio||1,2)){
    const width=Math.max(1,Math.floor(canvas.clientWidth*pixelRatio));
    const height=Math.max(1,Math.floor(canvas.clientHeight*pixelRatio));
    if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
    gl.viewport(0,0,canvas.width,canvas.height);
  }

  function draw(timeSeconds,shouldResize=true){
    if(!current)return;
    if(shouldResize)resize();
    gl.useProgram(current.program);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.enableVertexAttribArray(current.position);gl.vertexAttribPointer(current.position,2,gl.FLOAT,false,0,0);
    gl.uniform2f(current.resolution,canvas.width,canvas.height);gl.uniform1f(current.time,timeSeconds);gl.drawArrays(gl.TRIANGLES,0,3);
  }

  function render(timeSeconds){draw(timeSeconds,true);}

  function sample(timeSeconds,size=48){
    const oldWidth=canvas.width,oldHeight=canvas.height;
    canvas.width=size;canvas.height=size;gl.viewport(0,0,size,size);draw(timeSeconds,false);
    const pixels=new Uint8Array(size*size*4);gl.readPixels(0,0,size,size,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
    canvas.width=oldWidth;canvas.height=oldHeight;gl.viewport(0,0,oldWidth,oldHeight);return pixels;
  }

  return{setFragmentSource,render,sample,resize};
}

export function qualityMetrics(a,b){
  let sum=0,sumSq=0,temporal=0;const count=a.length/4;
  for(let p=0;p<a.length;p+=4){
    const lumA=.2126*a[p]+.7152*a[p+1]+.0722*a[p+2];
    const lumB=.2126*b[p]+.7152*b[p+1]+.0722*b[p+2];
    sum+=lumA;sumSq+=lumA*lumA;temporal+=Math.abs(lumA-lumB);
  }
  const mean=sum/count,variance=Math.max(0,sumSq/count-mean*mean);
  return{mean,variance,temporal:temporal/count};
}
