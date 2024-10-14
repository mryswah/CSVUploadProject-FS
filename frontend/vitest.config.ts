import { defineConfig } from "vitest/config";

console.log("Loading Vitest configuration!!");

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "tests/setup.ts",
    //testTimeout: 0, // Disable timeout for debugging
  },
});
