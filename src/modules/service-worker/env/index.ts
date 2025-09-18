export const env = {
  buildType: import.meta.env.VITE_BUILD_TYPE === "prod" ? "prod" : "dev",
} as const;
