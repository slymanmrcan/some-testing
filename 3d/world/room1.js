import * as THREE from 'three';
import { createPortal } from './portal.js';

export function buildRoom1() {
  const group = new THREE.Group();
  const rayTargets = [];

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

  for (let i = 0; i < 4; i++) {
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.y = 4;
    if (i === 0) { wall.position.z = -15; }
    if (i === 1) { wall.position.z = 15; wall.rotation.y = Math.PI; }
    if (i === 2) { wall.position.x = -15; wall.rotation.y = Math.PI / 2; }
    if (i === 3) { wall.position.x = 15; wall.rotation.y = -Math.PI / 2; }
    group.add(wall);
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

  // Matrix-style choice: blue pill vs red pill
  function pill({ color, name, desc, pillType, position }) {
    const baseGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.22, 18);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0c1322,
      emissive: 0x0b1b30,
      metalness: 0.5,
      roughness: 0.3
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.12;

    const pillGeo = new THREE.CapsuleGeometry(0.18, 0.4, 8, 16);
    const pillMat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.7,
      metalness: 0.1,
      roughness: 0.25
    });
    const mesh = new THREE.Mesh(pillGeo, pillMat);
    mesh.position.y = 0.6;

    const haloGeo = new THREE.RingGeometry(0.25, 0.35, 32);
    const haloMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = 0.02;

    const node = new THREE.Group();
    node.add(base);
    node.add(mesh);
    node.add(halo);
    node.position.copy(position);
    node.lookAt(0, 0.8, -6);
    node.userData = {
      type: 'pill',
      pillType,
      name,
      desc,
      tags: [pillType === 'red' ? 'Enter' : 'Stay']
    };

    group.add(node);
    rayTargets.push(node);
  }

  pill({
    color: 0x3aa0ff,
    name: 'Blue Pill',
    desc: 'Kal ve lobide dolaş. Portala girmeden ortamı keşfet.',
    pillType: 'blue',
    position: new THREE.Vector3(-1.2, 0, -3)
  });

  pill({
    color: 0xff365f,
    name: 'Red Pill',
    desc: 'Signal Lab’a geç, projeleri ve özgeçmiş panellerini gör.',
    pillType: 'red',
    position: new THREE.Vector3(1.2, 0, -3)
  });

  const portal = createPortal({
    position: new THREE.Vector3(0, 1.8, -6.5),
    targetRoom: 'room2',
    color: 0x35f3ff,
    label: 'Press E to enter the Signal Lab'
  });
  group.add(portal.mesh);

  const spawn = new THREE.Vector3(0, 1.6, 2.5);

  return {
    name: 'room1',
    group,
    rayTargets: [...rayTargets, portal.mesh],
    portal,
    spawn
  };
}
