import * as THREE from "three";
import blendSource from "./shaders/pokebox/common/blend.glsl?raw";
import filtersSource from "./shaders/pokebox/common/filters.glsl?raw";
import rainbowSource from "./shaders/pokebox/common/rainbow.glsl?raw";
import fragmentSource from "./shaders/pokebox/illustration-rare.frag?raw";

/**
 * Pokebox Illustration Rare material, used by SV 151 card #168.
 * Pokebox is Copyright (c) 2026 Sergej Lopatkin, MIT licensed.
 */
export type PokeboxIllustrationRareUniforms = {
  uCardTex: THREE.IUniform<THREE.Texture | null>;
  uCardBackTex: THREE.IUniform<THREE.Texture | null>;
  uMaskTex: THREE.IUniform<THREE.Texture>;
  uFoilTex: THREE.IUniform<THREE.Texture>;
  uGlitterTex: THREE.IUniform<THREE.Texture>;
  uHasFoil: THREE.IUniform<number>;
  uHasGlitter: THREE.IUniform<number>;
  uPointer: THREE.IUniform<THREE.Vector2>;
  uBackground: THREE.IUniform<THREE.Vector2>;
  uPointerFromCenter: THREE.IUniform<number>;
  uCardOpacity: THREE.IUniform<number>;
  uTime: THREE.IUniform<number>;
  uFade: THREE.IUniform<number>;
  [key: string]: THREE.IUniform;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = fragmentSource
  .replace('#include "common/blend.glsl"', blendSource)
  .replace('#include "common/filters.glsl"', filtersSource)
  .replace('#include "common/rainbow.glsl"', rainbowSource);

export function createPokeboxIllustrationRareMaterial(textures: {
  mask: THREE.Texture;
  foil: THREE.Texture;
  glitter: THREE.Texture;
}) {
  const uniforms: PokeboxIllustrationRareUniforms = {
    uCardTex: { value: null },
    uCardBackTex: { value: null },
    uMaskTex: { value: textures.mask },
    uFoilTex: { value: textures.foil },
    uGlitterTex: { value: textures.glitter },
    uHasFoil: { value: 0 },
    uHasGlitter: { value: 1 },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uBackground: { value: new THREE.Vector2(0.5, 0.5) },
    uPointerFromCenter: { value: 0 },
    uCardOpacity: { value: 0.82 },
    uTime: { value: 0 },
    uFade: { value: 1 },
    uRainbowScale: { value: 0.5 },
    uBarAngle: { value: 132 },
    uBarDensity: { value: 2.6 },
    uBarDensity2: { value: 1.8 },
    uBarOffsetBgYMult: { value: -0.7 },
    uBar2OffsetBgYMult: { value: 0.85 },
    uBarWidth: { value: 5.4 },
    uBarWidth2: { value: 3.95 },
    uBarIntensity: { value: 20 },
    uBarIntensity2: { value: 10.35 },
    uBarHue: { value: 231 },
    uBarMediumSaturation: { value: 0.33 },
    uBarMediumLightness: { value: 0.6 },
    uBarBrightSaturation: { value: 0.38 },
    uBarBrightLightness: { value: 0.71 },
    uBarHue2: { value: 248 },
    uBarMediumSaturation2: { value: 0.17 },
    uBarMediumLightness2: { value: 0.43 },
    uBarBrightSaturation2: { value: 0.19 },
    uBarBrightLightness2: { value: 0.83 },
    uShine1Contrast: { value: 1.5 },
    uShine1Saturation: { value: 0.8 },
    uShine2Opacity: { value: 0.85 },
    uGlareOpacity: { value: 0.9 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
    toneMapped: false,
  });

  return { material, uniforms };
}

export function setPokeboxIllustrationRarePointer(
  uniforms: PokeboxIllustrationRareUniforms,
  uv: THREE.Vector2,
) {
  const x = THREE.MathUtils.clamp(uv.x, 0, 1);
  const y = THREE.MathUtils.clamp(uv.y, 0, 1);
  uniforms.uPointer.value.set(x, y);
  uniforms.uBackground.value.set(0.37 + x * 0.26, 0.37 + y * 0.26);
  uniforms.uPointerFromCenter.value = Math.min(Math.hypot(x - 0.5, y - 0.5) * 2, 1);
}
