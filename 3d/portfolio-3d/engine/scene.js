import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x04060f);
  scene.fog = new THREE.Fog(0x04060f, 12, 48);

  const ambient = new THREE.AmbientLight(0x88ccee, 0.5);
  scene.add(ambient);

  const fill = new THREE.DirectionalLight(0x33ccff, 1);
  fill.position.set(5, 10, 7);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xff2fd4, 0.6);
  rim.position.set(-6, 8, -4);
  scene.add(rim);

  return scene;
}

export function createRenderer(canvas) {
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) {
    return { renderer: null, error: 'WebGL unavailable. Enable Hardware Acceleration or try a different browser.' };
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
  } catch (err) {
    return { renderer: null, error: err.message || 'WebGL renderer failed to start.' };
  }

  return { renderer, error: null };
}
