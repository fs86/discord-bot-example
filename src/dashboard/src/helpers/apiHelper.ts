export function endpoint(path: string) {
  if (!import.meta.env.VITE_API_URL) {
    throw new Error('Environment variable "REACT_APP_API_URL" was not found.');
  }

  if (path.startsWith('/')) {
    path = path.substring(1);
  }

  return `${import.meta.env.VITE_API_URL}/${path}`;
}
