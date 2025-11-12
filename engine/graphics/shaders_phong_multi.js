/**
 * Multi-light Phong shading shaders.
 * Supports up to 4 lights.
 */
export const VS_PHONG_MULTI = `#version 300 es
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

export const FS_PHONG_MULTI = `#version 300 es
precision highp float;
in vec3 v_normal;
in vec3 v_fragPos;
out vec4 outColor;

struct Light {
  int type; // 0=directional, 1=point
  vec3 color;
  float intensity;
  vec3 direction;
  vec3 position;
};

uniform Light u_lights[4];
uniform int u_lightCount;
uniform vec3 u_viewPos;

void main() {
  vec3 norm = normalize(v_normal);
  vec3 result = vec3(0.0);

  for (int i=0; i<u_lightCount; i++) {
    Light l = u_lights[i];
    vec3 lightDir;
    if (l.type==0) {
      lightDir = normalize(-l.direction);
    } else {
      lightDir = normalize(l.position - v_fragPos);
    }
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * l.color * l.intensity;
    vec3 ambient = 0.1 * l.color;
    result += ambient + diffuse;
  }

  outColor = vec4(result,1.0);
}
`;
