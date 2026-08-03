export function exportBundle(candidate){
  const instructions=`TSDNE prototype shader\n\nEncounter: ${candidate.id}\nFamily: ${candidate.family}\n\nUniform contract:\n- vec2 u_resolution: drawing-buffer width and height\n- float u_time: elapsed seconds\n\nHost requirements:\n- WebGL2\n- Full-screen triangle vertex shader\n- GLSL ES 3.00 fragment shader\n\nFragment shader:\n\n`;
  return instructions+candidate.source;
}
