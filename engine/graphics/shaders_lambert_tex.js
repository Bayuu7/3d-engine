/**
 * Lambert shading with a single directional light and a baseColor texture.
 */
export const VS_LAMBERT_TEX = `#version 300 es
precision highp float;
layout(location=0) in vec3 a_position;
layout(location=1) in vec3 a_normal;
layout(location=2) in vec2 a_uv;
uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_proj;
out vec3 v_normal;
out vec3 v_worldPos;
out vec2 v_uv;
void main() {
  vec4 worldPos = u_model * vec4(a_position,1.0);
  v_worldPos = worldPos.xyz;
  v_normal = mat3(u_model) * a_normal;
  v_uv = a_uv;
  gl_Position = u_proj * u_view * worldPos;
}
`;

export const FS_LAMBERT_TEX = `#version 300 es
precision highp float;
in vec3 v_normal;
in vec3 v_worldPos;
in vec2 v_uv;
out vec4 outColor;

uniform sampler2D u_baseColorTex;

struct DirLight {
  vec3 direction;
  vec3 color;
  float intensity;
};
uniform DirLight u_dirLight;

void main() {
  vec3 N = normalize(v_normal);
  vec3 L = normalize(-u_dirLight.direction);
  float diff = max(dot(N, L), 0.0);

  vec3 baseColor = texture(u_baseColorTex, v_uv).rgb;
  vec3 ambient = 0.1 * baseColor * u_dirLight.color;
  vec3 diffuse = diff * baseColor * u_dirLight.color * u_dirLight.intensity;

  outColor = vec4(ambient + diffuse, 1.0);
}
`;
