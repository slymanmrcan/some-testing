import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export function createPortal({ position, targetRoom, color = 0x35f3ff, label = 'Press E to enter' }) {
  const ringGeo = new THREE.TorusGeometry(1.1, 0.08, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color, emissive: new THREE.Color(color), transparent: true, opacity: 0.9 });
  const ring = new THREE.Mesh(ringGeo, ringMat);

  const planeGeo = new THREE.PlaneGeometry(1.8, 3.2);
  const planeMat = new THREE.MeshBasicMaterial({ color: 0x0a0a22, opacity: 0.45, transparent: true, side: THREE.DoubleSide });
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.position.set(0, 0, 0);

  const glowGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.05, 32);
  const glowMat = new THREE.MeshBasicMaterial({ color, opacity: 0.3, transparent: true });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.rotation.x = Math.PI / 2;
  glow.position.y = -1.6;

  const group = new THREE.Group();
  group.add(plane);
  group.add(ring);
  group.add(glow);
  group.position.copy(position);
  group.userData = { type: 'portal', targetRoom };

  const radius = 2.3;

  return {
    mesh: group,
    targetRoom,
    radius,
    label
  };
}
