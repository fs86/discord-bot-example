export function resetUrl() {
  window.history.replaceState({}, document.title, '/');
}
