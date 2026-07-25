import * as THREE from "three";
import blendSource from "./shaders/pokebox/common/blend.glsl?raw";
import filtersSource from "./shaders/pokebox/common/filters.glsl?raw";
import rainbowSource from "./shaders/pokebox/common/rainbow.glsl?raw";
import fragmentSource from "./shaders/pokebox/special-illustration-rare.frag?raw";

/**
 * Reference material matching Pokebox's Special Illustration Rare profile.
 * Pokebox is Copyright (c) 2026 Sergej Lopatkin, MIT licensed.
 * This is separate from the production book-foil material for honest A/B tests.
 */
export type PokeboxSpecialIllustrationUniforms = {
  uCardTex: THREE.IUniform<THREE.Texture | null>;
  uCardBackTex: THREE.IUniform<THREE.Texture | null>;
  uMaskTex: THREE.IUniform<THREE.Texture>;
  uFoilTex: THREE.IUniform<THREE.Texture>;
  uIri7Tex: THREE.IUniform<THREE.Texture>;
  uIri8Tex: THREE.IUniform<THREE.Texture>;
  uIri9Tex: THREE.IUniform<THREE.Texture>;
  uIri1Tex: THREE.IUniform<THREE.Texture>;
  uIri2Tex: THREE.IUniform<THREE.Texture>;
  uHasFoil: THREE.IUniform<number>;
  uPointer: THREE.IUniform<THREE.Vector2>;
  uBackground: THREE.IUniform<THREE.Vector2>;
  uPointerFromCenter: THREE.IUniform<number>;
  uCardOpacity: THREE.IUniform<number>;
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

export function createPokeboxSpecialIllustrationMaterial(textures: {
  mask: THREE.Texture;
  foil: THREE.Texture;
  iri1: THREE.Texture;
  iri2: THREE.Texture;
  iri7: THREE.Texture;
  iri8: THREE.Texture;
  iri9: THREE.Texture;
}) {
  const uniforms: PokeboxSpecialIllustrationUniforms = {
    uCardTex: { value: null },
    uCardBackTex: { value: null },
    uMaskTex: { value: textures.mask },
    uFoilTex: { value: textures.foil },
    uIri1Tex: { value: textures.iri1 },
    uIri2Tex: { value: textures.iri2 },
    uIri7Tex: { value: textures.iri7 },
    uIri8Tex: { value: textures.iri8 },
    uIri9Tex: { value: textures.iri9 },
    uHasFoil: { value: 1 },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uBackground: { value: new THREE.Vector2(0.5, 0.5) },
    uPointerFromCenter: { value: 0 },
    uCardOpacity: { value: 0.82 },
    uFade: { value: 1 },
    uSirShineAngle: { value: 90 },
    uSirShineFrequency: { value: 1 },
    uSirShineBrightness: { value: 0 },
    uSirShineContrast: { value: 1 },
    uSirShineSaturation: { value: 3.25 },
    uSirGlitterContrast: { value: 2.3 },
    uSirGlitterSaturation: { value: 0 },
    uSirWashScale: { value: 1.1 },
    uSirWashTiltSensitivity: { value: 2.3 },
    uSirWashSaturation: { value: 0.8 },
    uSirWashContrast: { value: 0.95 },
    uSirWashOpacity: { value: 0.75 },
    uSirBaseBrightness: { value: 1.0 },
    uSirBaseContrast: { value: 1.0 },
    uLayerSilver: { value: 1 },
    uLayerShine: { value: 1 },
    uLayerWash: { value: 1 },
    uLayerGlitter: { value: 1 },
    uLayerGlare: { value: 1 },
    uLayerEtch: { value: 1 },
    uMaterialTint: { value: new THREE.Color("#fff7ed") },
    uTintStrength: { value: 0 },
    uSirTiltSparkleScale: { value: 4.5 },
    uSirTiltSparkleIntensity: { value: 0.4 },
    uSirTiltSparkleTiltSensitivity: { value: 0.1 },
    uSirTiltSparkle2Scale: { value: 6 },
    uSirTiltSparkle2Intensity: { value: 0.4 },
    uSirTiltSparkle2TiltSensitivity: { value: 0.05 },
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

export function setPokeboxSpecialIllustrationPointer(
  uniforms: PokeboxSpecialIllustrationUniforms,
  uv: THREE.Vector2,
) {
  const x = THREE.MathUtils.clamp(uv.x, 0, 1);
  const y = THREE.MathUtils.clamp(uv.y, 0, 1);
  uniforms.uPointer.value.set(x, y);
  uniforms.uBackground.value.set(0.37 + x * 0.26, 0.37 + y * 0.26);
  uniforms.uPointerFromCenter.value = Math.min(Math.hypot(x - 0.5, y - 0.5) * 2, 1);
}