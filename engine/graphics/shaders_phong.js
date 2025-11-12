/**
 * Built-in Phong shading shaders.
 * Vertex: transforms position and normal.
 * Fragment: computes diffuse + ambient lighting.
 */
export const VS_PHONG = `#version 300 es
precision highp float;
layout(location=0) in vec3 a_position;
layout(location=1) in vec3 a_normal;
uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_proj;
out vec3 v_normal;
out vec3 v_fragPos;
void main() {
  v_fragPos = vec3(u_model * vec4(a_position,1.0));
  v_normal = mat3(u_model) * a_normal;
  gl_Position = u_proj * u_view * vec4(v_fragPos,1.0);
}
`;

export const FS_PHONG = `#version 300 es
precision highp float;
in vec3 v_normal;
in vec3 v_fragPos;
out vec4 outColor;

uniform vec3 u_lightDir;
uniform vec3 u_lightColor;
uniform float u_lightIntensity;
uniform vec3 u_viewPos;

void main() {
  vec3 norm = normalize(v_normal);
  vec3 lightDir = normalize(-u_lightDir);
  float diff = max(dot(norm, lightDir), 0.0);
  vec3 diffuse = diff * u_lightColor * u_lightIntensity;

  vec3 ambient = 0.1 * u_lightColor;

  vec3 result = (ambient + diffuse);
  outColor = vec4(result,1.0);
}
`;
