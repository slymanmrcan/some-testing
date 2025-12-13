
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export function initScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05070b);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.PointLight(0x00ffe0, 2, 20);
  light.position.set(0, 5, 5);
  scene.add(light);

  scene.add(new THREE.AmbientLight(0x00ffe0, 0.2));

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, renderer };
}
