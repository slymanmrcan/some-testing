import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/PointerLockControls.js';

export function createControls(camera, domElement, hud) {
  const controls = new PointerLockControls(camera, domElement);
  const move = { forward: false, back: false, left: false, right: false };
  const velocity = new THREE.Vector3();

  domElement.addEventListener('click', () => controls.lock());
  controls.addEventListener('lock', () => hud.setHint('WASD to move, E to enter portals'));
  controls.addEventListener('unlock', () => hud.setHint('Click to lock pointer'));

  function onKeyDown(event) {
    switch (event.code) {
      case 'KeyW': case 'ArrowUp': move.forward = true; break;
      case 'KeyS': case 'ArrowDown': move.back = true; break;
      case 'KeyA': case 'ArrowLeft': move.left = true; break;
      case 'KeyD': case 'ArrowRight': move.right = true; break;
      default: break;
    }
  }

  function onKeyUp(event) {
    switch (event.code) {
      case 'KeyW': case 'ArrowUp': move.forward = false; break;
      case 'KeyS': case 'ArrowDown': move.back = false; break;
      case 'KeyA': case 'ArrowLeft': move.left = false; break;
      case 'KeyD': case 'ArrowRight': move.right = false; break;
      default: break;
    }
  }

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);

  function update(delta) {
    if (!controls.isLocked) return;

    const speed = 6;
    velocity.set(0, 0, 0);

    if (move.forward) velocity.z -= 1;
    if (move.back) velocity.z += 1;
    if (move.left) velocity.x -= 1;
    if (move.right) velocity.x += 1;

    if (velocity.lengthSq() > 0) {
      velocity.normalize().multiplyScalar(speed * delta);
      controls.moveRight(velocity.x);
      controls.moveForward(-velocity.z);
    }

    const pos = controls.getObject().position;
    pos.y = 1.6;
  }

  return { controls, update };
}
