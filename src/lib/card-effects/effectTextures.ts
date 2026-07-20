import * as THREE from "three";

function seededNoise(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function createNoiseTexture(size: number, seed: number, transform: (value: number) => number) {
  const random = seededNoise(seed);
  const data = new Uint8Array(size * size);
  for (let index = 0; index < data.length; index += 1) {
    data[index] = Math.round(THREE.MathUtils.clamp(transform(random()), 0, 1) * 255);
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RedFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

export function createProceduralEffectTextures() {
  const neutralMaskData = new Uint8Array([255]);
  const neutralMask = new THREE.DataTexture(neutralMaskData, 1, 1, THREE.RedFormat);
  neutralMask.needsUpdate = true;

  return {
    neutralMask,
    foil: createNoiseTexture(256, 0x51f15e, (value) => 0.3 + value * 0.7),
    glitter: createNoiseTexture(256, 0x91e10a, (value) => (value > 0.91 ? 1 : value * 0.42)),
  };
}

export async function createAutoFoilMask(texture: THREE.Texture) {
  const source = texture.image as CanvasImageSource | undefined;
  if (!source) throw new Error("La texture de couverture ne possède pas de source image.");

  const width = 384;
  const height = 576;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Impossible de générer le masque de matière.");

  context.drawImage(source, 0, 0, width, height);
  const image = context.getImageData(0, 0, width, height);
  const sourceData = new Uint8ClampedArray(image.data);
  const luminance = (index: number) =>
    (sourceData[index] * 0.2126 + sourceData[index + 1] * 0.7152 + sourceData[index + 2] * 0.0722) / 255;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const red = sourceData[index] / 255;
      const green = sourceData[index + 1] / 255;
      const blue = sourceData[index + 2] / 255;
      const maxChannel = Math.max(red, green, blue);
      const minChannel = Math.min(red, green, blue);
      const saturation = maxChannel - minChannel;
      const light = luminance(index);
      const rightIndex = (y * width + Math.min(width - 1, x + 2)) * 4;
      const belowIndex = (Math.min(height - 1, y + 2) * width + x) * 4;
      const edge = Math.abs(light - luminance(rightIndex)) + Math.abs(light - luminance(belowIndex));
      const brightInk = THREE.MathUtils.smoothstep(light, 0.48, 0.88);
      const chroma = THREE.MathUtils.smoothstep(saturation, 0.18, 0.62);
      const detail = THREE.MathUtils.smoothstep(edge, 0.035, 0.24);
      const mask = THREE.MathUtils.clamp(brightInk * 0.42 + chroma * 0.32 + detail * 0.82, 0.05, 1);
      const byte = Math.round(mask * 255);
      image.data[index] = byte;
      image.data[index + 1] = byte;
      image.data[index + 2] = byte;
      image.data[index + 3] = 255;
    }
  }

  context.putImageData(image, 0, 0);
  const mask = new THREE.CanvasTexture(canvas);
  mask.colorSpace = THREE.NoColorSpace;
  mask.minFilter = THREE.LinearMipmapLinearFilter;
  mask.magFilter = THREE.LinearFilter;
  mask.generateMipmaps = true;
  mask.needsUpdate = true;
  return mask;
}
