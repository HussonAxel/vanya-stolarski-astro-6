import * as THREE from "three";
import beuiCardEffectsSource from "./shaders/beui-card-effects.glsl?raw";

/**
 * Generic book-foil shader adapted from Pokebox's Illustration Rare material.
 * Pokebox is Copyright (c) 2026 Sergej Lopatkin and distributed under MIT.
 * See THIRD_PARTY_NOTICES.md and licenses/pokebox-MIT.txt.
 *
 * Modes 4–9 adapt Paper Shaders 0.0.77 (Copyright 2026 Paper,
 * Apache-2.0) as card-surface effects. The upstream canvas shaders were
 * modified for Three.js, GLSL 1, pointer interaction and non-destructive
 * compositing. See licenses/paper-shaders-Apache-2.0.txt.
 */

export type BookFoilUniforms = {
  uMap: THREE.IUniform<THREE.Texture | null>;
  uMask: THREE.IUniform<THREE.Texture>;
  uFoil: THREE.IUniform<THREE.Texture>;
  uGlitter: THREE.IUniform<THREE.Texture>;
  uPointer: THREE.IUniform<THREE.Vector2>;
  uBackground: THREE.IUniform<THREE.Vector2>;
  uPointerFromCenter: THREE.IUniform<number>;
  uIntensity: THREE.IUniform<number>;
  uSoftness: THREE.IUniform<number>;
  uMode: THREE.IUniform<number>;
  uTime: THREE.IUniform<number>;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uMap;
  uniform sampler2D uMask;
  uniform sampler2D uFoil;
  uniform sampler2D uGlitter;
  uniform vec2 uPointer;
  uniform vec2 uBackground;
  uniform float uPointerFromCenter;
  uniform float uIntensity;
  uniform float uSoftness;
  uniform float uMode;
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  float roundedBoxSdf(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  vec3 blendColorDodge(vec3 base, vec3 blend) {
    return min(base / max(vec3(1.0) - blend, vec3(0.001)), vec3(1.0));
  }

  vec3 blendOverlay(vec3 base, vec3 blend) {
    return mix(
      2.0 * base * blend,
      1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
      step(vec3(0.5), base)
    );
  }

  vec3 blendSoftLight(vec3 base, vec3 blend) {
    return (1.0 - 2.0 * blend) * base * base + 2.0 * blend * base;
  }

  vec3 blendScreen(vec3 base, vec3 blend) {
    return 1.0 - (1.0 - base) * (1.0 - blend);
  }

  vec3 adjustContrast(vec3 color, float contrast) {
    return (color - 0.5) * contrast + 0.5;
  }

  vec3 adjustSaturation(vec3 color, float saturation) {
    float grey = dot(color, vec3(0.2126, 0.7152, 0.0722));
    return mix(vec3(grey), color, saturation);
  }

  vec3 spectrum(float value) {
    return 0.55 + 0.45 * cos(6.2831853 * (value + vec3(0.02, 0.34, 0.67)));
  }

  vec3 shineLayer(float coordinate, float offset, float density, float width, float glitter, float spotlight) {
    float bandPosition = fract((coordinate + offset) * density);
    float band = smoothstep(0.0, 0.03 * width, bandPosition)
      * (1.0 - smoothstep(0.04 * width, 0.095 * width, bandPosition));
    vec3 rainbow = spectrum(coordinate * 0.72 + offset * 1.6);
    vec3 silver = mix(vec3(0.22, 0.25, 0.24), vec3(1.0, 0.98, 0.9), band);
    vec3 result = blendOverlay(rainbow, silver);
    result *= 0.62 + glitter * 0.38;
    result *= 0.55 + spotlight * 0.55;
    result *= 0.72 + uPointerFromCenter * 0.48;
    return clamp(adjustSaturation(adjustContrast(result, 1.12), 1.18), 0.0, 1.0);
  }

  ${beuiCardEffectsSource}

  void main() {
    if (roundedBoxSdf(vUv - 0.5, vec2(0.5), 0.035) > 0.0) discard;

    vec4 card = texture2D(uMap, vUv);
    float authoredMask = texture2D(uMask, vUv).r;
    float foil = texture2D(uFoil, vUv * vec2(1.1, 1.7)).r;
    float glitter = texture2D(uGlitter, vUv * vec2(2.0, 3.0)).r;
    float effectMask = clamp(authoredMask * 0.82 + foil * authoredMask * 0.42, 0.0, 1.0);

    vec2 delta = vUv - uPointer;
    float distanceFromPointer = length(delta);
    float innerRadius = mix(0.055, 0.16, uSoftness);
    float outerRadius = mix(0.28, 0.72, uSoftness);
    float spotlight = 1.0 - smoothstep(innerRadius, outerRadius, distanceFromPointer);

    float angle = radians(34.0);
    float barCoordinate = dot(vUv, vec2(cos(angle), sin(angle)));
    float pointerOffset = dot(uBackground - 0.5, vec2(cos(angle), sin(angle)));
    float timeDrift = sin(uTime * 0.3) * 0.012;
    vec3 shine1 = shineLayer(barCoordinate, pointerOffset * 3.8 + timeDrift, 4.8, 1.0 + uSoftness, glitter, spotlight);
    vec3 shine2 = shineLayer(barCoordinate, -pointerOffset * 2.9 - timeDrift, 8.6, 0.78 + uSoftness * 0.7, 1.0 - glitter * 0.35, spotlight);

    vec3 glare = mix(vec3(1.0), vec3(0.0), smoothstep(0.0, 0.88, distanceFromPointer));
    glare = clamp(adjustContrast(glare * 0.92, 1.08), 0.0, 1.0);
    vec3 result = card.rgb;
    vec2 paperUv = vec2((vUv.x - 0.5) * 0.663, vUv.y - 0.5);
    vec2 paperPointer = vec2((uPointer.x - 0.5) * 0.663, uPointer.y - 0.5);
    float paperCoverage = 0.28 + effectMask * 0.72;

    if (uMode < 0.5) {
      float satin = spotlight * (0.22 + effectMask * 0.78) * uIntensity;
      result = mix(result, blendSoftLight(result, vec3(0.82, 0.86, 0.8)), satin * 0.42);
      result = mix(result, blendScreen(result, glare), satin * 0.18);
    } else if (uMode < 1.5) {
      float amount = effectMask * uIntensity;
      result = mix(result, blendColorDodge(result, shine1 * 0.78), amount * 0.62);
      result = mix(result, blendSoftLight(result, shine2), amount * 0.74);
      result = mix(result, blendOverlay(result, glare), amount * spotlight * 0.48);
      result = mix(result, blendScreen(result, glare * 0.5), amount * uPointerFromCenter * 0.24);
    } else if (uMode < 2.5) {
      float narrowBands = pow(max(shine1, shine2), vec3(1.45)).r;
      float amount = effectMask * uIntensity * (0.55 + narrowBands * 0.6);
      vec3 prism = spectrum(barCoordinate * 2.1 - pointerOffset * 2.7);
      result = mix(result, blendColorDodge(result, prism * narrowBands), amount * 0.74);
      result = mix(result, blendScreen(result, shine2 * 0.7), amount * 0.34);
    } else if (uMode < 3.5) {
      float materialResponse = 0.32 + effectMask * 0.68;
      float amount = spotlight * materialResponse * uIntensity;
      result = mix(result, blendColorDodge(result, vec3(0.7, 0.67, 0.58)), amount * 0.68);
      result = mix(result, blendOverlay(result, glare), amount * 0.54);
    } else if (uMode < 4.5) {
      float warp = beuiWarp(paperUv, uTime, paperPointer, uSoftness);
      float ribbon = pow(warp, mix(2.8, 1.1, uSoftness));
      float amount = paperCoverage * uIntensity * (0.2 + ribbon * 0.8);
      vec3 warpColor = spectrum(warp * 0.7 + pointerOffset * 1.8 + uTime * 0.015);
      result = mix(result, blendOverlay(result, warpColor), amount * 0.48);
      result = mix(result, blendColorDodge(result, warpColor * ribbon * 0.72), amount * 0.38);
    } else if (uMode < 5.5) {
      vec2 voronoi = beuiVoronoi(paperUv + paperPointer * 0.08, uTime, uSoftness);
      float amount = paperCoverage * uIntensity;
      vec3 cellColor = spectrum(voronoi.y * 0.72 + pointerOffset + uTime * 0.01);
      result = mix(result, blendSoftLight(result, cellColor), amount * 0.2);
      result = mix(result, blendColorDodge(result, cellColor * voronoi.x * 0.76), amount * (0.24 + spotlight * 0.18));
    } else if (uMode < 6.5) {
      vec2 orbit = beuiDotOrbit(paperUv + paperPointer * 0.06, uTime, uSoftness);
      float amount = paperCoverage * uIntensity * orbit.x * 0.55;
      vec3 orbitColor = spectrum(orbit.y + pointerOffset * 0.8 + uTime * 0.012);
      result = mix(result, blendScreen(result, orbitColor * 0.62), amount * 0.3);
      result = mix(result, blendColorDodge(result, vec3(0.58) * orbit.x), amount * 0.08);
    } else if (uMode < 7.5) {
      float rays = beuiGodRays(paperUv, paperPointer, uTime, uSoftness);
      float amount = paperCoverage * uIntensity * rays;
      float rayAngle = atan(paperUv.y - paperPointer.y, paperUv.x - paperPointer.x) / 6.2831853;
      vec3 rayColor = mix(vec3(1.0, 0.75, 0.48), spectrum(rayAngle + pointerOffset), 0.42);
      result = mix(result, blendScreen(result, rayColor), amount * 0.66);
      result = mix(result, blendColorDodge(result, rayColor * rays * 0.56), amount * 0.28);
    } else if (uMode < 8.5) {
      vec4 mesh = beuiMeshWeights(vUv, uTime * 0.4, 0.8, 0.3);
      vec3 meshColor =
        vec3(0.878, 0.918, 1.0) * mesh.x +
        vec3(0.141, 0.114, 0.604) * mesh.y +
        vec3(0.969, 0.314, 0.573) * mesh.z +
        vec3(0.624, 0.314, 0.827) * mesh.w;
      float meshGrain = beuiValueNoise(vUv * 420.0 + uTime * 0.02);
      meshColor = mix(meshColor, vec3(step(0.5, meshGrain)), abs(meshGrain - 0.5) * 0.08);
      float amount = paperCoverage * uIntensity;
      result = mix(result, blendSoftLight(result, meshColor), amount * 0.62);
      result = mix(result, blendScreen(result, meshColor), amount * (0.08 + spotlight * 0.18));
    } else {
      vec4 mesh = beuiMeshWeights(vUv, uTime * 0.3, 0.6, 0.5);
      vec3 auroraColor =
        vec3(0.0, 1.0, 0.698) * mesh.x +
        vec3(0.0, 0.447, 1.0) * mesh.y +
        vec3(0.635, 0.0, 1.0) * mesh.z +
        vec3(0.0, 0.102, 0.173) * mesh.w;
      float meshGrain = beuiValueNoise(vUv * 360.0 + uTime * 0.015);
      auroraColor = mix(auroraColor, vec3(step(0.52, meshGrain)), abs(meshGrain - 0.5) * 0.06);
      float amount = paperCoverage * uIntensity;
      result = mix(result, blendSoftLight(result, auroraColor), amount * 0.66);
      result = mix(result, blendColorDodge(result, auroraColor * 0.72), amount * (0.1 + spotlight * 0.16));
    }

    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(viewDirection, normalize(vWorldNormal)), 0.0), 2.25);
    result = mix(result, blendScreen(result, vec3(0.42, 0.55, 0.49)), fresnel * uIntensity * 0.16);

    gl_FragColor = vec4(clamp(result, 0.0, 1.0), card.a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export function createBookFoilMaterial(textures: {
  mask: THREE.Texture;
  foil: THREE.Texture;
  glitter: THREE.Texture;
}) {
  const uniforms: BookFoilUniforms = {
    uMap: { value: null },
    uMask: { value: textures.mask },
    uFoil: { value: textures.foil },
    uGlitter: { value: textures.glitter },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uBackground: { value: new THREE.Vector2(0.5, 0.5) },
    uPointerFromCenter: { value: 0 },
    uIntensity: { value: 0.72 },
    uSoftness: { value: 0.46 },
    uMode: { value: 1 },
    uTime: { value: 0 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    toneMapped: true,
  });

  return { material, uniforms };
}

export function setBookFoilPointer(uniforms: BookFoilUniforms, uv: THREE.Vector2) {
  const x = THREE.MathUtils.clamp(uv.x, 0, 1);
  const y = THREE.MathUtils.clamp(uv.y, 0, 1);
  uniforms.uPointer.value.set(x, y);
  uniforms.uBackground.value.set(0.37 + x * 0.26, 0.37 + y * 0.26);
  uniforms.uPointerFromCenter.value = Math.min(Math.hypot(x - 0.5, y - 0.5) * 2, 1);
}
