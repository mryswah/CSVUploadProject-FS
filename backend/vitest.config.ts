import { defineConfig } from "vitest/config";

console.log("Loading Vitest configuration!!");

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    // testTimeout: 0, // Disable timeout for debugging
  },
});
