// Backend URL as seen from the BROWSER (backend container is published on host port 2025).
// Override at build time with:  VITE_API_URL=http://myhost:2025/api
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:2025/api'
