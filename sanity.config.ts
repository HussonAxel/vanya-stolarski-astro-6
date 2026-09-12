import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

// Astro exposes PUBLIC_ variables through import.meta.env in the browser.
// The fallback keeps this config usable by the Sanity CLI in Node.
const projectId = import.meta.env?.PUBLIC_SANITY_PROJECT_ID
  || (typeof process !== "undefined" ? process.env.PUBLIC_SANITY_PROJECT_ID : undefined)
  || "placeholder";
const dataset = import.meta.env?.PUBLIC_SANITY_DATASET
  || (typeof process !== "undefined" ? process.env.PUBLIC_SANITY_DATASET : undefined)
  || "production";

export default defineConfig({
  name: "vanya-stolarski",
  title: "Vanya Stolarski — Contenus",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
