// engine/os-loader.js
export async function loadOS(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error('Failed to load OS JSON: ' + path);
  return await res.json();
}
