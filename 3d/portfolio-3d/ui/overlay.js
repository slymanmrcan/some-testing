export function createOverlay(root) {
  function showError(message) {
    root.textContent = `WebGL unavailable: ${message} — Enable Hardware Acceleration in your browser settings.`;
    root.classList.add('show');
  }

  function hide() {
    root.classList.remove('show');
    root.textContent = '';
  }

  return { showError, hide };
}
