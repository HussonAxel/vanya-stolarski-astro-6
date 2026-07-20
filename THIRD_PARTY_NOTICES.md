# Third-party notices

## Pokebox

- Project: https://github.com/selop/pokebox
- Pinned source: `vendor/pokebox-upstream`
- Commit: `7f6b1b4b6bb4684f80b49d1318b2a1c90a357b80`
- License: MIT — see `licenses/pokebox-MIT.txt`
- Copyright: Copyright (c) 2026 Sergej Lopatkin

The book-card effect engine in `src/lib/card-effects/` adapts generic ideas and
shader routines from Pokebox, notably its Illustration Rare shader, blend modes,
layered shine composition and pointer-derived uniforms.

Pokémon card images, masks, trademarks, MediaPipe tracking code and application
data are not copied into this project. The upstream clone is a pinned development
reference; production code does not import it at runtime.

## beUI Shader Background / Paper Shaders

- beUI component catalog: https://beui.dev/components/motion/shader-background
- beUI source: https://github.com/starc007/ui-components
- beUI license: MIT
- Shader implementation: @paper-design/shaders 0.0.77
- Paper Shaders source: https://github.com/paper-design/shaders
- Paper Shaders license: Apache-2.0 — see licenses/paper-shaders-Apache-2.0.txt
- Copyright: Copyright 2026 Paper

The selectable beUI effects in src/lib/card-effects/shaders/beui-card-effects.glsl
adapt the Paper Shaders Mesh Gradient, Grain Gradient, Warp, Waves, Voronoi, Dot
Orbit and God Rays patterns. Mesh, Grain, Grain — Sunset, Grain — Pastel and
Mesh — Aurora use the palettes and base parameters published in the beUI preview.
The original full-canvas GLSL was modified for Three.js GLSL 1, card UVs, pointer
interaction and texture-preserving compositing.

Powered by Paper Shaders: https://shaders.paper.design
## Pokebox Special Illustration Rare comparison

The isolated comparison profile in
`src/lib/card-effects/pokeboxSpecialIllustrationMaterial.ts` and its shader files
reproduces Pokebox's Special Illustration Rare defaults for an A/B rendering test.

The explicitly marked files in `public/assets/card-tests/pokebox-sv3-5-199/`
are a local comparison sample only. Their Pokémon artwork and derived textures
are third-party material and are not licensed under Pokebox's MIT license.