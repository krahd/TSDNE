export function exportBundle(candidate) {
  const provenance = {
    encounter: candidate.id,
    parent: candidate.parentId,
    origin: candidate.origin,
    model: candidate.model,
    family: candidate.family,
    seed: candidate.seed,
    mutation: candidate.mutation,
    graph: candidate.graph,
  };
  const instructions = `This Shader Does Not Exist — encounter record\n\n` +
    `This record identifies a computational encounter. It confers no ownership, scarcity, exclusivity, or control over subsequent use. The shader may be copied, modified, shared, studied, and incorporated into other works.\n\n` +
    `Metadata:\n${JSON.stringify(provenance, null, 2)}\n\n` +
    `Uniform contract:\n- vec2 u_resolution: drawing-buffer width and height\n- float u_time: elapsed seconds\n\n` +
    `Host requirements:\n- WebGL2\n- Full-screen triangle vertex shader\n- GLSL ES 3.00 fragment shader\n\nFragment shader:\n\n`;
  return instructions + candidate.source;
}
