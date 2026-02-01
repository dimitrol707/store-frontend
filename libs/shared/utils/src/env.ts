/// <reference types="vite/client" />

export const buildMediaUrl = (path?: string | null) =>
  path ? `${import.meta.env.VITE_API_URL}${path}` : "";
