/**
 * Built-in shader sources for the minimal pipeline.
 * Vertex: transforms position by model/view/projection; passes color.
 * Fragment: outputs interpolated color.
 */
export const VS_BASIC_COLOR = `#version 300 es
precision highp float;
layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_color; // we also support non-explicit via getAttribLocation
uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_proj;
out vec3 v_color;
void main() {
  v_color = a_color;
  gl_Position = u_proj * u_view * u_model * vec4(a_position, 1.0);
}
`;

export const FS_BASIC_COLOR = `#version 300 es
precision highp float;
in vec3 v_color;
out vec4 outColor;
void main() {
  outColor = vec4(v_color, 1.0);
}
`;
