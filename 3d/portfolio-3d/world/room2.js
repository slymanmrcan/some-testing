import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { createPortal } from './portal.js';

export function buildRoom2() {
  const group = new THREE.Group();

  const floorGeo = new THREE.CircleGeometry(18, 64);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0f0b1c,
    roughness: 0.3,
    metalness: 0.4,
    emissive: 0x1a0f2e
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  group.add(floor);

  const domeGeo = new THREE.SphereGeometry(18, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2);
  const domeMat = new THREE.MeshBasicMaterial({
    color: 0x120820,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.y = -1;
  group.add(dome);

  const pillars = [];
  const pillarGeo = new THREE.CylinderGeometry(0.2, 0.2, 6, 12);
  for (let i = 0; i < 8; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: 0xff2fd4,
      emissive: 0xff2fd4,
      emissiveIntensity: 0.5,
      metalness: 0.6,
      roughness: 0.2
    });
    const pillar = new THREE.Mesh(pillarGeo, mat);
    const angle = (i / 8) * Math.PI * 2;
    pillar.position.set(Math.cos(angle) * 8, 3, Math.sin(angle) * 8);
    group.add(pillar);
    pillars.push(pillar);
  }

  const portal = createPortal({
    position: new THREE.Vector3(0, 1.8, 0),
    targetRoom: 'room1',
    color: 0xff2fd4,
    label: 'Press E to return to the Terminal Floor'
  });
  group.add(portal.mesh);

  const holoGeo = new THREE.RingGeometry(2, 2.8, 60);
  const holoMat = new THREE.MeshBasicMaterial({ color: 0x35f3ff, transparent: true, opacity: 0.35 });
  const holo = new THREE.Mesh(holoGeo, holoMat);
  holo.rotation.x = -Math.PI / 2;
  holo.position.y = 0.2;
  group.add(holo);

  const spawn = new THREE.Vector3(0, 1.6, 10);

  return {
    name: 'room2',
    group,
    rayTargets: [portal.mesh],
    portal,
    spawn
  };
}
