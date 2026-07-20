/*
 * Card-surface adaptations of patterns from Paper Shaders 0.0.77.
 * Copyright 2026 Paper — Apache License 2.0.
 * The original full-canvas shaders were modified for Three.js, GLSL 1,
 * texture-preserving compositing, pointer interaction, and card UVs.
 * See THIRD_PARTY_NOTICES.md and licenses/paper-shaders-Apache-2.0.txt.
 */

#define BEUI_PI 3.141592653589793
#define BEUI_TWO_PI 6.283185307179586

float beuiHash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float beuiHash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 beuiHash22(vec2 p) {
  float n = beuiHash12(p);
  return vec2(n, beuiHash12(p + n + 19.19));
}

mat2 beuiRotation(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float beuiValueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(beuiHash12(i), beuiHash12(i + vec2(1.0, 0.0)), f.x),
    mix(beuiHash12(i + vec2(0.0, 1.0)), beuiHash12(i + vec2(1.0)), f.x),
    f.y
  );
}

float beuiFbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.52;
  mat2 rotation = beuiRotation(0.47);
  for (int i = 0; i < 4; i++) {
    value += beuiValueNoise(p) * amplitude;
    p = rotation * p * 2.03 + 7.13;
    amplitude *= 0.5;
  }
  return value;
}

vec3 beuiPalette4(float value, vec3 color0, vec3 color1, vec3 color2, vec3 color3) {
  float mixer = clamp(value, 0.0, 1.0) * 3.0;
  vec3 first = mix(color0, color1, smoothstep(0.0, 1.0, mixer));
  vec3 second = mix(color1, color2, smoothstep(1.0, 2.0, mixer));
  vec3 third = mix(color2, color3, smoothstep(2.0, 3.0, mixer));
  return mix(mix(first, second, step(1.0, mixer)), third, step(2.0, mixer));
}

vec2 beuiMeshPosition(float index, float time) {
  float angle = index * 0.37;
  float horizontalSpeed = 0.6 + fract(index / 3.0) * 0.9;
  float verticalSpeed = 0.8 + fract((index + 1.0) / 4.0);
  return 0.5 + 0.5 * vec2(
    sin(time * horizontalSpeed + angle),
    cos(time * verticalSpeed + angle * 1.5)
  );
}

vec4 beuiMeshWeights(vec2 uv, float time, float distortion, float swirl) {
  float shiftedTime = 0.5 * (time + 41.5);
  float radius = smoothstep(0.0, 1.0, length(uv - 0.5));
  float center = 1.0 - radius;

  for (int i = 1; i <= 2; i++) {
    float index = float(i);
    uv.x += distortion * center / index
      * sin(shiftedTime + index * 0.4 * smoothstep(0.0, 1.0, uv.y))
      * cos(0.2 * shiftedTime + index * 2.4 * smoothstep(0.0, 1.0, uv.y));
    uv.y += distortion * center / index
      * cos(shiftedTime + index * 2.0 * smoothstep(0.0, 1.0, uv.x));
  }

  uv -= 0.5;
  uv = beuiRotation(-3.0 * swirl * radius) * uv;
  uv += 0.5;

  float weight0 = 1.0 / (pow(length(uv - beuiMeshPosition(0.0, shiftedTime)), 3.5) + 0.001);
  float weight1 = 1.0 / (pow(length(uv - beuiMeshPosition(1.0, shiftedTime)), 3.5) + 0.001);
  float weight2 = 1.0 / (pow(length(uv - beuiMeshPosition(2.0, shiftedTime)), 3.5) + 0.001);
  float weight3 = 1.0 / (pow(length(uv - beuiMeshPosition(3.0, shiftedTime)), 3.5) + 0.001);
  vec4 weights = vec4(weight0, weight1, weight2, weight3);
  return weights / max(dot(weights, vec4(1.0)), 0.0001);
}
float beuiWarp(vec2 uv, float time, vec2 pointer, float softness) {
  vec2 warped = uv * 5.2;
  float n1 = beuiValueNoise(warped * 0.62 + time * 0.1);
  float n2 = beuiValueNoise(warped * 1.12 - time * 0.08);
  float angle = n1 * BEUI_TWO_PI + dot(pointer, vec2(3.0, -2.0));
  warped += vec2(cos(angle), sin(angle)) * n2 * (0.8 + softness * 1.2);
  for (int i = 1; i <= 5; i++) {
    float fi = float(i);
    warped.x += (0.28 + softness * 0.22) / fi * cos(time * 0.18 + fi * 1.5 * warped.y);
    warped.y += (0.24 + softness * 0.18) / fi * cos(time * 0.16 + fi * warped.x);
  }
  float bands = 0.5 + 0.5 * sin(warped.y * 1.75 + warped.x * 0.34);
  return smoothstep(0.24 - softness * 0.12, 0.76 + softness * 0.12, bands);
}

vec2 beuiVoronoi(vec2 uv, float time, float softness) {
  vec2 p = uv * mix(8.0, 4.8, softness);
  vec2 cell = floor(p);
  vec2 local = fract(p);
  float nearest = 8.0;
  float secondNearest = 8.0;
  float cellRandom = 0.0;

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 random = beuiHash22(cell + offset);
      vec2 center = offset + 0.5 + 0.34 * sin(time * 0.22 + BEUI_TWO_PI * random);
      float distanceToCell = length(center - local);
      if (distanceToCell < nearest) {
        secondNearest = nearest;
        nearest = distanceToCell;
        cellRandom = random.x;
      } else if (distanceToCell < secondNearest) {
        secondNearest = distanceToCell;
      }
    }
  }

  float borderDistance = secondNearest - nearest;
  float border = 1.0 - smoothstep(0.025, mix(0.16, 0.29, softness), borderDistance);
  return vec2(border, cellRandom);
}

vec2 beuiDotOrbit(vec2 uv, float time, float softness) {
  vec2 p = uv * mix(16.0, 11.0, softness);
  vec2 cell = floor(p);
  vec2 local = fract(p);
  float nearest = 2.0;
  float randomValue = 0.0;

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 random = beuiHash22(cell + offset);
      vec2 orbit = vec2(cos(time * 0.5 + random.x * BEUI_TWO_PI), sin(time * 0.46 + random.y * BEUI_TWO_PI));
      vec2 center = offset + 0.5 + orbit * mix(0.08, 0.24, softness);
      float distanceToDot = length(center - local);
      if (distanceToDot < nearest) {
        nearest = distanceToDot;
        randomValue = random.x;
      }
    }
  }

  float radius = mix(0.035, 0.095, softness) * mix(0.78, 1.08, randomValue);
  float dotShape = 1.0 - smoothstep(radius - 0.012, radius + 0.025, nearest);
  return vec2(dotShape, randomValue);
}

float beuiGodRays(vec2 uv, vec2 origin, float time, float softness) {
  vec2 rayUv = uv - origin;
  float radius = length(rayUv);
  float angle = atan(rayUv.y, rayUv.x) / BEUI_TWO_PI + 0.5;
  float density = mix(7.0, 18.0, 1.0 - softness);
  float rayNoise = beuiValueNoise(vec2(angle * density, radius * 4.2 - time * 0.34));
  rayNoise *= beuiValueNoise(vec2(angle * density * 0.53 + 11.0, radius * 7.0 - time * 0.21));
  float rays = pow(clamp(rayNoise * 1.75, 0.0, 1.0), mix(3.5, 1.3, softness));
  rays *= 1.0 - smoothstep(0.08, 0.86, radius);
  float bloom = 1.0 - smoothstep(0.0, mix(0.12, 0.28, softness), radius);
  return clamp(rays + bloom * 0.72, 0.0, 1.0);
}
