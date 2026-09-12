import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "vanya-stolarski",
  title: "Vanya Stolarski — Contenus",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
