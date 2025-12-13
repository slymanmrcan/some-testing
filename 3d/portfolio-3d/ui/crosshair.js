export function createCrosshair(root) {
  const cross = document.createElement('div');
  cross.className = 'crosshair';
  root.appendChild(cross);
  return cross;
}
