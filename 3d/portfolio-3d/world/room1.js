import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { createProjectNodes } from './projects.js';
import { createPortal } from './portal.js';

export function buildRoom1() {
  const group = new THREE.Group();

  const floorGeo = new THREE.PlaneGeometry(30, 30);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0b101d,
    roughness: 0.6,
    metalness: 0.1,
    emissive: new THREE.Color(0x0e1a2f)
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  group.add(floor);

  const wallMat = new THREE.MeshStandardMaterial({ color: 0x0a0f1c, emissive: 0x091326, side: THREE.DoubleSide });
  const wallGeo = new THREE.PlaneGeometry(30, 8);

  const walls = [];
  for (let i = 0; i < 4; i++) {
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.y = 4;
    if (i === 0) { wall.position.z = -15; }
    if (i === 1) { wall.position.z = 15; wall.rotation.y = Math.PI; }
    if (i === 2) { wall.position.x = -15; wall.rotation.y = Math.PI / 2; }
    if (i === 3) { wall.position.x = 15; wall.rotation.y = -Math.PI / 2; }
    group.add(wall);
    walls.push(wall);
  }

  const neonStripGeo = new THREE.PlaneGeometry(30, 0.12);
  const neonMat = new THREE.MeshBasicMaterial({ color: 0x35f3ff, transparent: true, opacity: 0.7 });
  const neon = new THREE.Mesh(neonStripGeo, neonMat);
  neon.position.set(0, 2.2, -14.9);
  group.add(neon);

  const neon2 = neon.clone();
  neon2.material = neonMat.clone();
  neon2.material.color = new THREE.Color(0xff2fd4);
  neon2.position.set(0, 5.8, -14.9);
  group.add(neon2);

  const { nodes, targets } = createProjectNodes();
  nodes.forEach((n) => group.add(n));

  const portal = createPortal({
    position: new THREE.Vector3(0, 1.8, -12.5),
    targetRoom: 'room2',
    color: 0x35f3ff,
    label: 'Press E to enter the Signal Lab'
  });
  group.add(portal.mesh);

  const spawn = new THREE.Vector3(0, 1.6, 8);

  return {
    name: 'room1',
    group,
    rayTargets: [...targets, portal.mesh],
    portal,
    spawn
  };
}
