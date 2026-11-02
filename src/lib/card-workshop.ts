import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createBookFoilMaterial, setBookFoilPointer } from "./card-effects/bookFoilMaterial";
import { createAutoFoilMask, createProceduralEffectTextures } from "./card-effects/effectTextures";
import {
  createPokeboxIllustrationRareMaterial,
  setPokeboxIllustrationRarePointer,
} from "./card-effects/pokeboxIllustrationRareMaterial";
import {
  createPokeboxSpecialIllustrationMaterial,
  setPokeboxSpecialIllustrationPointer,
} from "./card-effects/pokeboxSpecialIllustrationMaterial";

export async function initializeCardWorkshop() {
  const canvas = document.querySelector("#card-canvas");
  const stage = document.querySelector("#card-stage");
  const renderState = document.querySelector("#render-state");
  const errorState = document.querySelector("#stage-error");

  if (!(canvas instanceof HTMLCanvasElement) || !(stage instanceof HTMLElement)) {
    throw new Error("La scène 3D est introuvable.");
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let renderer: THREE.WebGLRenderer;

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch (error) {
    if (errorState instanceof HTMLElement) errorState.hidden = false;
    if (renderState instanceof HTMLElement) renderState.textContent = "WebGL indisponible";
    throw error;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const roomEnvironment = new RoomEnvironment();
  const environmentRenderTarget = pmremGenerator.fromScene(roomEnvironment, 0.04);
  scene.environment = environmentRenderTarget.texture;
  roomEnvironment.dispose();
  pmremGenerator.dispose();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
  camera.position.set(0, 0.1, 9.3);

  const cardRoot = new THREE.Group();
  const cardFloat = new THREE.Group();
  cardRoot.add(cardFloat);
  scene.add(cardRoot);

  const roundedRectShape = (width: number, height: number, radius: number) => {
    const x = -width / 2;
    const y = -height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    return shape;
  };

  const cardShape = roundedRectShape(3.04, 4.58, 0.13);
  const volumeGeometry = new THREE.ExtrudeGeometry(cardShape, {
    depth: 0.18,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.045,
    bevelSegments: 5,
    curveSegments: 14,
  });
  volumeGeometry.center();

  const edgeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x191b19,
    metalness: 0.18,
    roughness: 0.34,
    clearcoat: 0.85,
    clearcoatRoughness: 0.2,
  });
  const volume = new THREE.Mesh(volumeGeometry, edgeMaterial);
  volume.castShadow = true;
  volume.receiveShadow = true;
  cardFloat.add(volume);

  const effectTextures = createProceduralEffectTextures();
  const { material: coverMaterial, uniforms: coverUniforms } = createBookFoilMaterial({
    mask: effectTextures.neutralMask,
    foil: effectTextures.foil,
    glitter: effectTextures.glitter,
  });

  const coverGeometry = new THREE.PlaneGeometry(3.03, 4.57, 1, 1);
  const coverMesh = new THREE.Mesh(coverGeometry, coverMaterial);
  coverMesh.position.z = 0.137;
  coverMesh.castShadow = true;
  cardFloat.add(coverMesh);

  const backMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x20231f,
    roughness: 0.58,
    metalness: 0.04,
    clearcoat: 0.38,
  });
  const backMesh = new THREE.Mesh(coverGeometry, backMaterial);
  backMesh.position.z = -0.137;
  backMesh.rotation.y = Math.PI;
  cardFloat.add(backMesh);

  const floorMaterial = new THREE.ShadowMaterial({ color: 0x07100c, opacity: 0.27 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, 12), floorMaterial);
  floor.position.set(0, -2.57, -0.5);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  scene.add(new THREE.HemisphereLight(0xdce8df, 0x151714, 1.7));
  const keyLight = new THREE.SpotLight(0xfff5dc, 55, 20, Math.PI / 5, 0.65, 1.6);
  keyLight.position.set(3.8, 4.7, 6.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.bias = -0.0006;
  scene.add(keyLight);
  scene.add(keyLight.target);

  const rimLight = new THREE.DirectionalLight(0x759486, 2.4);
  rimLight.position.set(-4, 1, 2);
  scene.add(rimLight);

  const textureLoader = new THREE.TextureLoader();
  const loadedTextures = new Map<string, THREE.Texture>();
  const loadedMasks = new Map<string, THREE.Texture>();

  const loadCover = async (src: string): Promise<THREE.Texture> => {
    const cachedTexture = loadedTextures.get(src);
    if (cachedTexture) return cachedTexture;
    const texture = await textureLoader.loadAsync(src);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    loadedTextures.set(src, texture);
    return texture;
  };

  const pokeboxReferencePaths = {
    front: "/assets/card-tests/pokebox-sv3-5-199/front.webp",
    mask: "/assets/card-tests/pokebox-sv3-5-199/mask.webp",
    foil: "/assets/card-tests/pokebox-sv3-5-199/etch.webp",
    iri1: "/assets/card-tests/pokebox-sv3-5-199/iri-1.webp",
    iri2: "/assets/card-tests/pokebox-sv3-5-199/iri-2.webp",
    iri7: "/assets/card-tests/pokebox-sv3-5-199/iri-7.webp",
    iri8: "/assets/card-tests/pokebox-sv3-5-199/iri-8.webp",
    iri9: "/assets/card-tests/pokebox-sv3-5-199/iri-9.webp",
  } as const;
  const pokeboxReferenceTextures = new Map<string, THREE.Texture>();
  const pokeboxGlitterPath = "/assets/card-tests/pokebox-common/glitter.webp";
  let pokeboxIrMaterial: THREE.ShaderMaterial | null = null;
  let pokeboxIrUniforms: ReturnType<typeof createPokeboxIllustrationRareMaterial>["uniforms"] | null = null;
  let pokeboxSirMaterial: THREE.ShaderMaterial | null = null;
  let pokeboxSirUniforms: ReturnType<typeof createPokeboxSpecialIllustrationMaterial>["uniforms"] | null = null;
  let currentCoverProfile = "book";
  let currentEffect = "holo";
  let currentCardTexture: THREE.Texture | null = null;
  let currentCardMask: THREE.Texture | null = null;
  let currentCardSrc = "/assets/card-tests/collibris/aube-musique.webp";
  let currentCardTitle = "Aube · Variation musicale";
  let uploadedMaskTexture: THREE.Texture | null = null;
  let uploadedEtchTexture: THREE.Texture | null = null;
  const emptyMask = new THREE.DataTexture(new Uint8Array([0]), 1, 1, THREE.RedFormat);
  emptyMask.needsUpdate = true;

  const loadPokeboxReferenceTexture = async (src: string, colorSpace: THREE.ColorSpace = THREE.NoColorSpace) => {
    const cachedTexture = pokeboxReferenceTextures.get(src);
    if (cachedTexture) return cachedTexture;
    const texture = await textureLoader.loadAsync(src);
    texture.colorSpace = colorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    pokeboxReferenceTextures.set(src, texture);
    return texture;
  };

  const loadPokeboxReference = async () => {
    const [front, mask, foil, iri1, iri2, iri7, iri8, iri9] = await Promise.all([
      loadPokeboxReferenceTexture(pokeboxReferencePaths.front, THREE.SRGBColorSpace),
      loadPokeboxReferenceTexture(pokeboxReferencePaths.mask),
      loadPokeboxReferenceTexture(pokeboxReferencePaths.foil),
      loadPokeboxReferenceTexture(pokeboxReferencePaths.iri1),
      loadPokeboxReferenceTexture(pokeboxReferencePaths.iri2),
      loadPokeboxReferenceTexture(pokeboxReferencePaths.iri7),
      loadPokeboxReferenceTexture(pokeboxReferencePaths.iri8),
      loadPokeboxReferenceTexture(pokeboxReferencePaths.iri9),
    ]);

    if (!pokeboxSirMaterial || !pokeboxSirUniforms) {
      const referenceMaterial = createPokeboxSpecialIllustrationMaterial({
        mask,
        foil,
        iri1,
        iri2,
        iri7,
        iri8,
        iri9,
      });
      pokeboxSirMaterial = referenceMaterial.material;
      pokeboxSirUniforms = referenceMaterial.uniforms;
    }

    return { front, mask, foil };
  };

  const applyPokeboxIllustrationRareToCurrentCard = async () => {
    if (!currentCardTexture || !currentCardMask) {
      throw new Error("La carte active n’est pas prête.");
    }
    const glitter = await loadPokeboxReferenceTexture(pokeboxGlitterPath);
    if (!pokeboxIrMaterial || !pokeboxIrUniforms) {
      const illustrationMaterial = createPokeboxIllustrationRareMaterial({
        mask: currentCardMask,
        foil: emptyMask,
        glitter,
      });
      pokeboxIrMaterial = illustrationMaterial.material;
      pokeboxIrUniforms = illustrationMaterial.uniforms;
    }
    pokeboxIrUniforms.uCardTex.value = currentCardTexture;
    pokeboxIrUniforms.uCardBackTex.value = currentCardTexture;
    pokeboxIrUniforms.uMaskTex.value = currentCardMask;
    pokeboxIrUniforms.uFoilTex.value = emptyMask;
    pokeboxIrUniforms.uHasFoil.value = 0;
    pokeboxIrUniforms.uHasGlitter.value = 1;
    pokeboxIrUniforms.uCardOpacity.value = state.intensity / 100;
    coverMesh.material = pokeboxIrMaterial;
  };

  const applyPokeboxEffectToCurrentCard = async () => {
    const reference = await loadPokeboxReference();
    if (!pokeboxSirMaterial || !pokeboxSirUniforms || !currentCardTexture || !currentCardMask) {
      throw new Error("La matière Pokebox ou la carte active ne sont pas prêtes.");
    }

    const maskMode = (document.querySelector("#material-mask-mode") as HTMLSelectElement | null)?.value ?? "auto";
    const etchMode = (document.querySelector("#material-etch-mode") as HTMLSelectElement | null)?.value ?? "auto";
    const activeMask = maskMode === "full"
      ? effectTextures.neutralMask
      : maskMode === "reference"
        ? reference.mask
        : maskMode === "uploaded" && uploadedMaskTexture
          ? uploadedMaskTexture
          : maskMode === "none"
            ? emptyMask
            : currentCardMask;
    const activeEtch = etchMode === "reference"
      ? reference.foil
      : etchMode === "uploaded" && uploadedEtchTexture
        ? uploadedEtchTexture
        : etchMode === "none"
          ? emptyMask
          : currentCoverProfile === "pokebox-sir"
            ? reference.foil
            : currentCardMask;

    pokeboxSirUniforms.uCardTex.value = currentCardTexture;
    pokeboxSirUniforms.uCardBackTex.value = currentCardTexture;
    pokeboxSirUniforms.uMaskTex.value = activeMask;
    pokeboxSirUniforms.uFoilTex.value = activeEtch;
    pokeboxSirUniforms.uHasFoil.value = etchMode === "none" ? 0 : 1;
    syncMaterialBuilderUniforms();
    coverMesh.material = pokeboxSirMaterial;
  };

  const setCover = async (src: string, profile = "book") => {
    if (renderState instanceof HTMLElement) renderState.textContent = "Chargement de la matière";
    stage.classList.add("is-loading");
    currentCoverProfile = profile;
    currentCardSrc = src;
    try {
      if (profile === "pokebox-sir") {
        const reference = await loadPokeboxReference();
        currentCardTexture = reference.front;
        currentCardMask = reference.mask;
        coverUniforms.uMap.value = reference.front;
        coverUniforms.uMask.value = reference.mask;
        await applyPokeboxEffectToCurrentCard();
      } else {
        const texture = await loadCover(src);
        let mask = loadedMasks.get(src);
        if (!mask) {
          mask = await createAutoFoilMask(texture);
          mask.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
          loadedMasks.set(src, mask);
        }
        currentCardTexture = texture;
        currentCardMask = mask;
        coverUniforms.uMap.value = texture;
        coverUniforms.uMask.value = mask;
        coverMesh.material = coverMaterial;
      }
      coverMaterial.needsUpdate = true;
      if (renderState instanceof HTMLElement) {
        renderState.textContent = profile === "pokebox-sir" ? "Référence Pokebox active" : "Rendu en temps réel";
      }
      stage.classList.remove("is-loading");
    } catch (error) {
      if (renderState instanceof HTMLElement) renderState.textContent = "Texture indisponible";
      if (errorState instanceof HTMLElement) {
        errorState.textContent = "La couverture n’a pas pu être chargée. Choisissez une autre carte.";
        errorState.hidden = false;
      }
      console.error(error);
    }
  };
  const state = {
    tilt: 14,
    depth: 18,
    intensity: 72,
    softness: 46,
    pointerFollow: true,
    floatMotion: true,
    autoRotate: false,
    castShadow: true,
    targetRotationX: 0,
    targetRotationY: 0,
    pointerInside: false,
  };

  const modeMap: Record<string, number> = {
    satin: 0,
    holo: 1,
    prism: 2,
    spot: 3,
    "beui-warp": 4,
    "beui-voronoi": 5,
    "beui-orbit": 6,
    "beui-rays": 7,
    "beui-mesh": 8,
    "beui-mesh-aurora": 9,
  };
  const modeLabels: Record<string, string> = {
    satin: "Satin",
    holo: "Holographique",
    prism: "Prismatique",
    spot: "Projecteur",
    "beui-mesh": "beUI · Mesh",
    "beui-mesh-aurora": "beUI · Mesh — Aurora",
    "beui-warp": "beUI · Warp",
    "beui-voronoi": "beUI · Voronoï",
    "beui-orbit": "beUI · Dot Orbit",
    "beui-rays": "beUI · God Rays",
    "pokebox-ir": "Pokebox · Illustration Rare (#168)",
    "pokebox-sir": "Pokebox · Special Illustration Rare",
  };
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const animationStartedAt = performance.now();
  let previousFrameAt = animationStartedAt;
  let animationFrame = 0;
  let isDisposed = false;
  let stageInView = true;

  const resize = () => {
    const rect = stage.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  resize();

  const updatePointer = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const localX = (event.clientX - rect.left) / rect.width;
    const localY = (event.clientY - rect.top) / rect.height;
    pointer.x = localX * 2 - 1;
    pointer.y = -(localY * 2 - 1);
    state.pointerInside = true;

    if (!reduceMotion) {
      const maxTilt = THREE.MathUtils.degToRad(state.tilt);
      state.targetRotationY = (localX - 0.5) * maxTilt * 1.6;
      state.targetRotationX = (0.5 - localY) * maxTilt;
    }

    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObject(coverMesh, false)[0];
    if (hit?.uv && state.pointerFollow) {
      coverUniforms.uPointer.value.lerp(hit.uv, 0.42);
      setBookFoilPointer(coverUniforms, coverUniforms.uPointer.value);
      if (pokeboxSirUniforms) {
        pokeboxSirUniforms.uPointer.value.lerp(hit.uv, 0.42);
        setPokeboxSpecialIllustrationPointer(pokeboxSirUniforms, pokeboxSirUniforms.uPointer.value);
      }
      if (pokeboxIrUniforms) {
        pokeboxIrUniforms.uPointer.value.lerp(hit.uv, 0.42);
        setPokeboxIllustrationRarePointer(pokeboxIrUniforms, pokeboxIrUniforms.uPointer.value);
      }
      keyLight.position.x = THREE.MathUtils.lerp(-4.2, 4.2, hit.uv.x);
      keyLight.position.y = THREE.MathUtils.lerp(-3.5, 5.2, hit.uv.y);
    }
  };

  const leavePointer = () => {
    state.pointerInside = false;
    state.targetRotationX = 0;
    state.targetRotationY = 0;
  };

  canvas.addEventListener("pointermove", updatePointer);
  canvas.addEventListener("pointerleave", leavePointer);
  canvas.addEventListener("pointercancel", leavePointer);

  const setPressed = (selector: string, current: HTMLButtonElement) => {
    document.querySelectorAll(selector).forEach((element) => {
      if (element instanceof HTMLButtonElement) element.setAttribute("aria-pressed", String(element === current));
    });
  };

  document.querySelectorAll(".cover-option").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!(button instanceof HTMLButtonElement)) return;
      setPressed(".cover-option", button);
      const src = button.dataset.coverSrc;
      const profile = button.dataset.coverProfile ?? "book";
      const defaultEffect = button.dataset.coverEffect;
      if (src) await setCover(src, profile);
      currentCardTitle = button.dataset.coverTitle ?? "Carte sans titre";
      if (profile === "pokebox-sir") {
        setRangeValue("intensity", 82);
        chooseEffect("pokebox-sir");
      } else if (defaultEffect) {
        chooseEffect(defaultEffect);
      } else if (currentEffect === "pokebox-sir") {
        chooseEffect("holo");
      }
      const title = document.querySelector("#stage-book-title");
      const edition = document.querySelector("#stage-book-edition");
      if (title instanceof HTMLElement) title.textContent = button.dataset.coverTitle ?? "";
      if (edition instanceof HTMLElement) edition.textContent = button.dataset.coverEdition ?? "";
    });
  });

  document.querySelectorAll(".effect-option").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!(button instanceof HTMLButtonElement)) return;
      const effect = button.dataset.effect ?? "holo";

      setPressed(".effect-option", button);
      currentEffect = effect;
      if (effect === "pokebox-sir") {
        try {
          if (renderState instanceof HTMLElement) renderState.textContent = "Chargement de l’effet Pokebox";
          await applyPokeboxEffectToCurrentCard();
          if (renderState instanceof HTMLElement) {
            renderState.textContent = currentCoverProfile === "pokebox-sir"
              ? "Référence Pokebox active"
              : "Effet Pokebox appliqué à la carte";
          }
        } catch (error) {
          currentEffect = "holo";
          coverMesh.material = coverMaterial;
          coverUniforms.uMode.value = modeMap.holo ?? 1;
          const holoButton = document.querySelector('[data-effect="holo"]');
          if (holoButton instanceof HTMLButtonElement) setPressed(".effect-option", holoButton);
          if (renderState instanceof HTMLElement) renderState.textContent = "Effet Pokebox indisponible";
          console.error(error);
        }
      } else if (effect === "pokebox-ir") {
        try {
          if (renderState instanceof HTMLElement) renderState.textContent = "Chargement de l’effet Illustration Rare";
          await applyPokeboxIllustrationRareToCurrentCard();
          if (renderState instanceof HTMLElement) renderState.textContent = "Pokebox Illustration Rare actif";
        } catch (error) {
          currentEffect = "holo";
          coverMesh.material = coverMaterial;
          coverUniforms.uMode.value = modeMap.holo ?? 1;
          const holoButton = document.querySelector('[data-effect="holo"]');
          if (holoButton instanceof HTMLButtonElement) setPressed(".effect-option", holoButton);
          if (renderState instanceof HTMLElement) renderState.textContent = "Illustration Rare indisponible";
          console.error(error);
        }
      } else {
        coverMesh.material = coverMaterial;
        coverUniforms.uMode.value = modeMap[effect] ?? 1;
        if (renderState instanceof HTMLElement) renderState.textContent = "Rendu en temps réel";
      }
      const label = document.querySelector("#stage-effect-label");
      if (label instanceof HTMLElement) label.textContent = modeLabels[currentEffect] ?? "Holographique";
    });
  });
  document.querySelectorAll(".position-option").forEach((button) => {
    button.addEventListener("click", () => {
      if (!(button instanceof HTMLButtonElement)) return;
      setPressed(".position-option", button);
      const x = Number(button.dataset.x ?? 0.5);
      const y = Number(button.dataset.y ?? 0.5);
      coverUniforms.uPointer.value.set(x, y);
      setBookFoilPointer(coverUniforms, coverUniforms.uPointer.value);
      if (pokeboxSirUniforms) {
        pokeboxSirUniforms.uPointer.value.set(x, y);
        setPokeboxSpecialIllustrationPointer(pokeboxSirUniforms, pokeboxSirUniforms.uPointer.value);
      }
      if (pokeboxIrUniforms) {
        pokeboxIrUniforms.uPointer.value.set(x, y);
        setPokeboxIllustrationRarePointer(pokeboxIrUniforms, pokeboxIrUniforms.uPointer.value);
      }
      keyLight.position.x = THREE.MathUtils.lerp(-4.2, 4.2, x);
      keyLight.position.y = THREE.MathUtils.lerp(-3.5, 5.2, y);
    });
  });

  type MaterialPresetConfig = {
    schema: "vanya-pokebox-material";
    version: 1;
    name: string;
    card?: { title: string; src: string };
    maskMode?: string;
    etchMode?: string;
    tint?: string;
    tintStrength?: number;
    layers?: Record<string, { enabled: boolean; intensity: number }>;
    uniforms?: Record<string, number>;
    view?: { intensity: number; tilt: number; depth: number; softness: number };
  };

  const builderStatus = document.querySelector("#builder-status");
  const setBuilderStatus = (message: string) => {
    if (builderStatus instanceof HTMLElement) builderStatus.textContent = message;
  };

  const readSelectValue = (selector: string, fallback: string) => {
    const select = document.querySelector(selector);
    return select instanceof HTMLSelectElement ? select.value : fallback;
  };

  function refreshBuilderOutputs() {
    document.querySelectorAll<HTMLInputElement>("[data-layer-uniform]").forEach((input) => {
      const output = document.querySelector(`[data-layer-output="${input.dataset.layerUniform}"]`);
      if (output instanceof HTMLOutputElement) output.textContent = `${Math.round(Number(input.value))}%`;
    });
    document.querySelectorAll<HTMLInputElement>("[data-material-uniform]").forEach((input) => {
      const output = document.querySelector(`[data-material-output="${input.dataset.materialUniform}"]`);
      if (output instanceof HTMLOutputElement) output.textContent = `${input.value}${input.dataset.suffix ?? ""}`;
    });
    const tintStrength = document.querySelector("#material-tint-strength");
    const tintOutput = document.querySelector("#material-tint-strength-output");
    if (tintStrength instanceof HTMLInputElement && tintOutput instanceof HTMLOutputElement) {
      tintOutput.textContent = `${tintStrength.value}%`;
    }
  }

  function serializeMaterialPreset(name?: string): MaterialPresetConfig {
    const layers: MaterialPresetConfig["layers"] = {};
    document.querySelectorAll<HTMLInputElement>("[data-layer-uniform]").forEach((input) => {
      const uniform = input.dataset.layerUniform;
      if (!uniform) return;
      const enabled = document.querySelector(`[data-layer-enabled="${uniform}"]`);
      layers[uniform] = {
        enabled: enabled instanceof HTMLInputElement ? enabled.checked : true,
        intensity: Number(input.value),
      };
    });
    const uniforms: Record<string, number> = {};
    document.querySelectorAll<HTMLInputElement>("[data-material-uniform]").forEach((input) => {
      if (input.dataset.materialUniform) uniforms[input.dataset.materialUniform] = Number(input.value);
    });
    const tint = document.querySelector("#material-tint");
    const tintStrength = document.querySelector("#material-tint-strength");
    const nameInput = document.querySelector("#material-preset-name");
    return {
      schema: "vanya-pokebox-material",
      version: 1,
      name: name ?? ((nameInput instanceof HTMLInputElement ? nameInput.value.trim() : "Ma matière") || "Ma matière"),
      card: { title: currentCardTitle, src: currentCardSrc },
      maskMode: readSelectValue("#material-mask-mode", "auto"),
      etchMode: readSelectValue("#material-etch-mode", "auto"),
      tint: tint instanceof HTMLInputElement ? tint.value : "#fff1d2",
      tintStrength: tintStrength instanceof HTMLInputElement ? Number(tintStrength.value) : 0,
      layers,
      uniforms,
      view: {
        intensity: state.intensity,
        tilt: state.tilt,
        depth: state.depth,
        softness: state.softness,
      },
    };
  }

  function updateMaterialJsonPreview() {
    const textarea = document.querySelector("#material-preset-json");
    if (textarea instanceof HTMLTextAreaElement) {
      textarea.value = JSON.stringify(serializeMaterialPreset(), null, 2);
    }
  }

  function syncMaterialBuilderUniforms() {
    if (!pokeboxSirUniforms) return;
    document.querySelectorAll<HTMLInputElement>("[data-layer-uniform]").forEach((input) => {
      const uniformName = input.dataset.layerUniform;
      if (!uniformName || !pokeboxSirUniforms?.[uniformName]) return;
      const enabled = document.querySelector(`[data-layer-enabled="${uniformName}"]`);
      const isEnabled = !(enabled instanceof HTMLInputElement) || enabled.checked;
      pokeboxSirUniforms[uniformName].value = isEnabled ? Number(input.value) / 100 : 0;
    });
    document.querySelectorAll<HTMLInputElement>("[data-material-uniform]").forEach((input) => {
      const uniformName = input.dataset.materialUniform;
      if (uniformName && pokeboxSirUniforms?.[uniformName]) {
        pokeboxSirUniforms[uniformName].value = Number(input.value);
      }
    });
    const tint = document.querySelector("#material-tint");
    const tintStrength = document.querySelector("#material-tint-strength");
    if (tint instanceof HTMLInputElement) {
      const tintUniform = pokeboxSirUniforms.uMaterialTint.value;
      if (tintUniform instanceof THREE.Color) tintUniform.set(tint.value);
    }
    if (tintStrength instanceof HTMLInputElement) {
      pokeboxSirUniforms.uTintStrength.value = Number(tintStrength.value) / 100;
    }
    pokeboxSirUniforms.uCardOpacity.value = state.intensity / 100;
    refreshBuilderOutputs();
    updateMaterialJsonPreview();
  }

  const activateMaterialBuilder = async () => {
    const button = document.querySelector('[data-effect="pokebox-sir"]');
    if (button instanceof HTMLButtonElement) setPressed(".effect-option", button);
    currentEffect = "pokebox-sir";
    try {
      setBuilderStatus("Application de la matière…");
      await applyPokeboxEffectToCurrentCard();
      const label = document.querySelector("#stage-effect-label");
      if (label instanceof HTMLElement) label.textContent = modeLabels["pokebox-sir"];
      if (renderState instanceof HTMLElement) renderState.textContent = "Material Builder actif";
      setBuilderStatus("Matière Pokebox appliquée à la carte sélectionnée.");
    } catch (error) {
      setBuilderStatus("La matière n’a pas pu être appliquée.");
      console.error(error);
    }
  };

  const requestMaterialUpdate = () => {
    refreshBuilderOutputs();
    if (currentEffect === "pokebox-sir" && pokeboxSirUniforms) {
      syncMaterialBuilderUniforms();
    } else {
      void activateMaterialBuilder();
    }
  };

  const loadUploadedMaterialTexture = async (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    try {
      const texture = await textureLoader.loadAsync(objectUrl);
      texture.colorSpace = THREE.NoColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
      return texture;
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  };

  document.querySelector("#activate-builder")?.addEventListener("click", () => void activateMaterialBuilder());
  ["#material-mask-mode", "#material-etch-mode"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("change", () => void activateMaterialBuilder());
  });

  const maskFileInput = document.querySelector("#material-mask-file");
  maskFileInput?.addEventListener("change", async () => {
    if (!(maskFileInput instanceof HTMLInputElement) || !maskFileInput.files?.[0]) return;
    try {
      const texture = await loadUploadedMaterialTexture(maskFileInput.files[0]);
      uploadedMaskTexture?.dispose();
      uploadedMaskTexture = texture;
      const select = document.querySelector("#material-mask-mode");
      if (select instanceof HTMLSelectElement) select.value = "uploaded";
      setBuilderStatus(`Masque « ${maskFileInput.files[0].name} » chargé.`);
      await activateMaterialBuilder();
    } catch (error) {
      setBuilderStatus("Impossible de lire ce masque.");
      console.error(error);
    }
  });

  const etchFileInput = document.querySelector("#material-etch-file");
  etchFileInput?.addEventListener("change", async () => {
    if (!(etchFileInput instanceof HTMLInputElement) || !etchFileInput.files?.[0]) return;
    try {
      const texture = await loadUploadedMaterialTexture(etchFileInput.files[0]);
      uploadedEtchTexture?.dispose();
      uploadedEtchTexture = texture;
      const select = document.querySelector("#material-etch-mode");
      if (select instanceof HTMLSelectElement) select.value = "uploaded";
      setBuilderStatus(`Gravure « ${etchFileInput.files[0].name} » chargée.`);
      await activateMaterialBuilder();
    } catch (error) {
      setBuilderStatus("Impossible de lire cette gravure.");
      console.error(error);
    }
  });

  document.querySelectorAll<HTMLInputElement>("[data-layer-uniform], [data-material-uniform], #material-tint-strength").forEach((input) => {
    input.addEventListener("input", requestMaterialUpdate);
  });
  document.querySelectorAll<HTMLInputElement>("[data-layer-enabled]").forEach((input) => {
    input.addEventListener("change", requestMaterialUpdate);
  });
  document.querySelector("#material-tint")?.addEventListener("input", requestMaterialUpdate);

  const applyMaterialPresetConfig = async (preset: Partial<MaterialPresetConfig>) => {
    const maskSelect = document.querySelector("#material-mask-mode");
    const etchSelect = document.querySelector("#material-etch-mode");
    if (maskSelect instanceof HTMLSelectElement && preset.maskMode) {
      maskSelect.value = preset.maskMode === "uploaded" && !uploadedMaskTexture ? "auto" : preset.maskMode;
    }
    if (etchSelect instanceof HTMLSelectElement && preset.etchMode) {
      etchSelect.value = preset.etchMode === "uploaded" && !uploadedEtchTexture ? "auto" : preset.etchMode;
    }
    if (preset.tint) {
      const tint = document.querySelector("#material-tint");
      if (tint instanceof HTMLInputElement) tint.value = preset.tint;
    }
    if (typeof preset.tintStrength === "number") {
      const strength = document.querySelector("#material-tint-strength");
      if (strength instanceof HTMLInputElement) strength.value = String(preset.tintStrength);
    }
    Object.entries(preset.layers ?? {}).forEach(([uniform, layer]) => {
      const range = document.querySelector(`[data-layer-uniform="${uniform}"]`);
      const enabled = document.querySelector(`[data-layer-enabled="${uniform}"]`);
      if (range instanceof HTMLInputElement) range.value = String(layer.intensity);
      if (enabled instanceof HTMLInputElement) enabled.checked = layer.enabled;
    });
    Object.entries(preset.uniforms ?? {}).forEach(([uniform, value]) => {
      const input = document.querySelector(`[data-material-uniform="${uniform}"]`);
      if (input instanceof HTMLInputElement && Number.isFinite(value)) input.value = String(value);
    });
    if (preset.view) {
      setRangeValue("intensity", preset.view.intensity);
      setRangeValue("tilt", preset.view.tilt);
      setRangeValue("depth", preset.view.depth);
      setRangeValue("softness", preset.view.softness);
    }
    const name = document.querySelector("#material-preset-name");
    if (name instanceof HTMLInputElement && preset.name) name.value = preset.name;
    refreshBuilderOutputs();
    await activateMaterialBuilder();
    updateMaterialJsonPreview();
  };

  const starterPresets: Record<string, Partial<MaterialPresetConfig>> = {
    nacre: {
      name: "Nacre douce", tint: "#ffe8df", tintStrength: 18, maskMode: "auto", etchMode: "auto",
      layers: {
        uLayerSilver: { enabled: true, intensity: 68 }, uLayerShine: { enabled: true, intensity: 52 },
        uLayerWash: { enabled: true, intensity: 45 }, uLayerGlitter: { enabled: true, intensity: 24 },
        uLayerGlare: { enabled: true, intensity: 34 }, uLayerEtch: { enabled: true, intensity: 40 },
      },
      uniforms: { uSirShineSaturation: 1.3, uSirWashSaturation: 0.55, uSirGlitterContrast: 1.45, uSirBaseBrightness: 1.04 },
    },
    argent: {
      name: "Argent gravé", tint: "#e5eef2", tintStrength: 16, maskMode: "auto", etchMode: "auto",
      layers: {
        uLayerSilver: { enabled: true, intensity: 100 }, uLayerShine: { enabled: true, intensity: 34 },
        uLayerWash: { enabled: true, intensity: 22 }, uLayerGlitter: { enabled: true, intensity: 28 },
        uLayerGlare: { enabled: true, intensity: 50 }, uLayerEtch: { enabled: true, intensity: 100 },
      },
      uniforms: { uSirShineSaturation: 0.4, uSirWashSaturation: 0.25, uSirGlitterSaturation: 0.15, uSirBaseContrast: 1.08, uSirTiltSparkleIntensity: 0.62 },
    },
    dore: {
      name: "Dorure chaude", tint: "#e4a744", tintStrength: 68, maskMode: "auto", etchMode: "auto",
      layers: {
        uLayerSilver: { enabled: true, intensity: 42 }, uLayerShine: { enabled: true, intensity: 42 },
        uLayerWash: { enabled: true, intensity: 36 }, uLayerGlitter: { enabled: true, intensity: 34 },
        uLayerGlare: { enabled: true, intensity: 38 }, uLayerEtch: { enabled: true, intensity: 78 },
      },
      uniforms: { uSirShineSaturation: 0.75, uSirWashSaturation: 0.5, uSirGlitterContrast: 2.7, uSirBaseBrightness: 0.98 },
    },
    cosmique: {
      name: "Cosmique", tint: "#8b7cff", tintStrength: 42, maskMode: "auto", etchMode: "auto",
      layers: {
        uLayerSilver: { enabled: true, intensity: 62 }, uLayerShine: { enabled: true, intensity: 100 },
        uLayerWash: { enabled: true, intensity: 92 }, uLayerGlitter: { enabled: true, intensity: 90 },
        uLayerGlare: { enabled: true, intensity: 58 }, uLayerEtch: { enabled: true, intensity: 72 },
      },
      uniforms: { uSirShineFrequency: 2.4, uSirShineSaturation: 4.2, uSirWashScale: 1.8, uSirWashSaturation: 1.55, uSirGlitterSaturation: 2.2 },
    },
  };

  document.querySelectorAll<HTMLButtonElement>("[data-material-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = button.dataset.materialPreset ? starterPresets[button.dataset.materialPreset] : null;
      if (preset) void applyMaterialPresetConfig(preset);
    });
  });

  const presetStorageKey = "vanya-pokebox-material-presets-v1";
  const readStoredPresets = (): Record<string, MaterialPresetConfig> => {
    try {
      const value = localStorage.getItem(presetStorageKey);
      return value ? JSON.parse(value) : {};
    } catch {
      return {};
    }
  };
  const renderStoredPresets = () => {
    const select = document.querySelector("#saved-material-presets");
    if (!(select instanceof HTMLSelectElement)) return;
    const selected = select.value;
    select.replaceChildren(new Option("Choisir un preset local", ""));
    Object.keys(readStoredPresets()).sort((a, b) => a.localeCompare(b, "fr")).forEach((name) => select.add(new Option(name, name)));
    select.value = selected;
  };

  document.querySelector("#save-material-preset")?.addEventListener("click", () => {
    const preset = serializeMaterialPreset();
    const presets = readStoredPresets();
    presets[preset.name] = preset;
    try {
      localStorage.setItem(presetStorageKey, JSON.stringify(presets));
      renderStoredPresets();
      const select = document.querySelector("#saved-material-presets");
      if (select instanceof HTMLSelectElement) select.value = preset.name;
      setBuilderStatus(`Preset « ${preset.name} » enregistré dans ce navigateur.`);
    } catch {
      setBuilderStatus("Le navigateur a refusé l’enregistrement local.");
    }
  });

  document.querySelector("#saved-material-presets")?.addEventListener("change", (event) => {
    const select = event.currentTarget;
    if (!(select instanceof HTMLSelectElement) || !select.value) return;
    const preset = readStoredPresets()[select.value];
    if (preset) void applyMaterialPresetConfig(preset);
  });

  document.querySelector("#download-material-preset")?.addEventListener("click", () => {
    const preset = serializeMaterialPreset();
    const blob = new Blob([JSON.stringify(preset, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${preset.name.toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "matiere-pokebox"}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setBuilderStatus("Preset JSON téléchargé.");
  });

  const applyJsonTextarea = async () => {
    const textarea = document.querySelector("#material-preset-json");
    if (!(textarea instanceof HTMLTextAreaElement)) return;
    try {
      const preset = JSON.parse(textarea.value) as MaterialPresetConfig;
      if (preset.schema !== "vanya-pokebox-material" || preset.version !== 1) throw new Error("Format inconnu");
      await applyMaterialPresetConfig(preset);
      setBuilderStatus(`Preset « ${preset.name || "sans nom"} » appliqué.`);
    } catch (error) {
      setBuilderStatus("JSON invalide ou format de preset incompatible.");
      console.error(error);
    }
  };
  document.querySelector("#apply-material-json")?.addEventListener("click", () => void applyJsonTextarea());

  const importPresetInput = document.querySelector("#import-material-preset");
  importPresetInput?.addEventListener("change", async () => {
    if (!(importPresetInput instanceof HTMLInputElement) || !importPresetInput.files?.[0]) return;
    const textarea = document.querySelector("#material-preset-json");
    if (textarea instanceof HTMLTextAreaElement) textarea.value = await importPresetInput.files[0].text();
    await applyJsonTextarea();
  });

  document.querySelectorAll<HTMLButtonElement>("[data-capture-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      const slot = button.dataset.captureSlot;
      const figure = slot ? document.querySelector(`[data-comparison="${slot}"]`) : null;
      if (!(figure instanceof HTMLElement)) return;
      renderer.render(scene, camera);
      const image = figure.querySelector("img");
      const placeholder = figure.querySelector(".comparison-placeholder");
      const caption = figure.querySelector("figcaption small");
      if (image instanceof HTMLImageElement) {
        image.src = renderer.domElement.toDataURL("image/png");
        image.hidden = false;
      }
      if (placeholder instanceof HTMLElement) placeholder.hidden = true;
      if (caption instanceof HTMLElement) {
        caption.textContent = `${currentCardTitle} · ${readSelectValue("#material-mask-mode", "auto")} / ${readSelectValue("#material-etch-mode", "auto")}`;
      }
      setBuilderStatus(`Variante ${slot?.toUpperCase()} capturée.`);
    });
  });

  document.querySelector("#clear-comparison")?.addEventListener("click", () => {
    document.querySelectorAll<HTMLElement>("[data-comparison]").forEach((figure) => {
      const image = figure.querySelector("img");
      const placeholder = figure.querySelector(".comparison-placeholder");
      const caption = figure.querySelector("figcaption small");
      if (image instanceof HTMLImageElement) { image.src = ""; image.hidden = true; }
      if (placeholder instanceof HTMLElement) placeholder.hidden = false;
      if (caption instanceof HTMLElement) caption.textContent = "Aucune capture";
    });
  });

  refreshBuilderOutputs();
  renderStoredPresets();
  updateMaterialJsonPreview();
  type NumericStateKey = "tilt" | "depth" | "intensity" | "softness";
  type BooleanStateKey = "pointerFollow" | "floatMotion" | "autoRotate" | "castShadow";

  const bindRange = (
    id: string,
    stateKey: NumericStateKey,
    outputId: string,
    suffix: string,
    update?: (value: number) => void,
  ) => {
    const input = document.querySelector(`#${id}`);
    const output = document.querySelector(`#${outputId}`);
    if (!(input instanceof HTMLInputElement)) return;
    const sync = () => {
      const value = Number(input.value);
      state[stateKey] = value;
      if (output instanceof HTMLOutputElement) output.textContent = `${value}${suffix}`;
      update?.(value);
    };
    input.addEventListener("input", sync);
    sync();
  };

  bindRange("intensity", "intensity", "intensity-output", "%", (value) => {
    coverUniforms.uIntensity.value = value / 100;
    if (pokeboxSirUniforms) pokeboxSirUniforms.uCardOpacity.value = value / 100;
    if (pokeboxIrUniforms) pokeboxIrUniforms.uCardOpacity.value = value / 100;
  });
  bindRange("tilt", "tilt", "tilt-output", "°");
  bindRange("depth", "depth", "depth-output", "%", (value) => {
    cardFloat.scale.z = THREE.MathUtils.lerp(0.4, 2.1, value / 36);
  });
  bindRange("softness", "softness", "softness-output", "%", (value) => {
    coverUniforms.uSoftness.value = value / 100;
  });

  const bindToggle = (
    id: string,
    stateKey: BooleanStateKey,
    update?: (enabled: boolean) => void,
  ) => {
    const input = document.querySelector(`#${id}`);
    if (!(input instanceof HTMLInputElement)) return;
    const sync = () => {
      state[stateKey] = input.checked;
      update?.(input.checked);
    };
    input.addEventListener("change", sync);
    sync();
  };

  bindToggle("pointer-follow", "pointerFollow");
  bindToggle("float-motion", "floatMotion");
  bindToggle("auto-rotate", "autoRotate");
  bindToggle("cast-shadow", "castShadow", (enabled) => {
    volume.castShadow = enabled;
    coverMesh.castShadow = enabled;
    floor.visible = enabled;
  });

  const setRangeValue = (id: string, value: number) => {
    const input = document.querySelector(`#${id}`);
    if (input instanceof HTMLInputElement) {
      input.value = String(value);
      input.dispatchEvent(new Event("input"));
    }
  };

  const chooseEffect = (effect: string) => {
    const button = document.querySelector(`[data-effect="${effect}"]`);
    if (button instanceof HTMLButtonElement) button.click();
  };

  const applyPreset = (preset: string) => {
    if (preset === "velvet") {
      chooseEffect("satin");
      setRangeValue("intensity", 38);
      setRangeValue("softness", 78);
      setRangeValue("tilt", 9);
      setRangeValue("depth", 24);
    }
    if (preset === "chrome") {
      chooseEffect("spot");
      setRangeValue("intensity", 86);
      setRangeValue("softness", 24);
      setRangeValue("tilt", 17);
      setRangeValue("depth", 30);
    }
    if (preset === "spectrum") {
      chooseEffect("prism");
      setRangeValue("intensity", 88);
      setRangeValue("softness", 34);
      setRangeValue("tilt", 15);
      setRangeValue("depth", 18);
    }
  };

  document.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button instanceof HTMLButtonElement && button.dataset.preset) applyPreset(button.dataset.preset);
    });
  });

  const reset = () => {
    chooseEffect("holo");
    setRangeValue("intensity", 72);
    setRangeValue("tilt", 14);
    setRangeValue("depth", 18);
    setRangeValue("softness", 46);
    const toggleDefaults: Array<[string, boolean]> = [
      ["pointer-follow", true],
      ["float-motion", true],
      ["auto-rotate", false],
      ["cast-shadow", true],
    ];
    toggleDefaults.forEach(([id, checked]) => {
      const input = document.querySelector(`#${id}`);
      if (input instanceof HTMLInputElement) {
        input.checked = checked;
        input.dispatchEvent(new Event("change"));
      }
    });
    const center = document.querySelector('[data-position="center"]');
    if (center instanceof HTMLButtonElement) center.click();
  };

  document.querySelector("#reset-controls")?.addEventListener("click", reset);

  const animate = (now = performance.now()) => {
    animationFrame = 0;
    if (isDisposed || document.hidden || !stageInView) return;
    animationFrame = window.requestAnimationFrame(animate);
    const delta = Math.min((now - previousFrameAt) / 1000, 0.05);
    previousFrameAt = now;
    const elapsed = (now - animationStartedAt) / 1000;
    coverUniforms.uTime.value = reduceMotion ? 0 : elapsed;
    if (pokeboxIrUniforms) pokeboxIrUniforms.uTime.value = reduceMotion ? 0 : elapsed;

    const autoY = !reduceMotion && state.autoRotate ? Math.sin(elapsed * 0.42) * 0.16 : 0;
    const targetX = reduceMotion ? 0 : state.targetRotationX;
    const targetY = reduceMotion ? 0 : state.targetRotationY + autoY;
    cardRoot.rotation.x = THREE.MathUtils.damp(cardRoot.rotation.x, targetX, 8.5, delta);
    cardRoot.rotation.y = THREE.MathUtils.damp(cardRoot.rotation.y, targetY, 8.5, delta);
    cardRoot.quaternion.normalize();

    cardFloat.position.y = !reduceMotion && state.floatMotion ? Math.sin(elapsed * 0.85) * 0.075 : 0;
    cardFloat.rotation.z = !reduceMotion && state.floatMotion ? Math.sin(elapsed * 0.46) * 0.012 : 0;

    renderer.render(scene, camera);
  };

  const dispose = () => {
    if (isDisposed) return;
    isDisposed = true;
    window.cancelAnimationFrame(animationFrame);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    document.removeEventListener("visibilitychange", syncRendering);
    canvas.removeEventListener("pointermove", updatePointer);
    canvas.removeEventListener("pointerleave", leavePointer);
    canvas.removeEventListener("pointercancel", leavePointer);
    loadedTextures.forEach((texture) => texture.dispose());
    loadedMasks.forEach((texture) => texture.dispose());
    pokeboxReferenceTextures.forEach((texture) => texture.dispose());
    uploadedMaskTexture?.dispose();
    uploadedEtchTexture?.dispose();
    emptyMask.dispose();
    effectTextures.neutralMask.dispose();
    effectTextures.foil.dispose();
    effectTextures.glitter.dispose();
    environmentRenderTarget.dispose();
    volumeGeometry.dispose();
    coverGeometry.dispose();
    floor.geometry.dispose();
    edgeMaterial.dispose();
    coverMaterial.dispose();
    pokeboxIrMaterial?.dispose();
    pokeboxSirMaterial?.dispose();
    backMaterial.dispose();
    floorMaterial.dispose();
    renderer.dispose();
  };

  const syncRendering = () => {
    if (isDisposed) return;
    window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    if (!document.hidden && stageInView) {
      previousFrameAt = performance.now();
      animate();
    }
  };
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    stageInView = entry.isIntersecting;
    syncRendering();
  });
  visibilityObserver.observe(stage);
  document.addEventListener("visibilitychange", syncRendering);

  window.addEventListener("pagehide", dispose, { once: true });
  document.addEventListener("astro:before-swap", dispose, { once: true });

  const query = new URLSearchParams(window.location.search);
  const requestedPokeboxReference = query.get("set") === "sv3-5_en" && query.get("card") === "199";
  if (requestedPokeboxReference) {
    const referenceCover = document.querySelector('[data-cover-profile="pokebox-sir"]');
    if (referenceCover instanceof HTMLButtonElement) referenceCover.click();
  } else {
    await setCover("/assets/card-tests/collibris/aube-musique.webp");
  }
  syncRendering();
  return dispose;
  }
