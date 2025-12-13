import * as THREE from 'three';
import { createPortal } from './portal.js';
import { createProjectNodes } from './projects.js';

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
  }

  const { nodes, targets } = createProjectNodes();
  nodes.forEach((n) => group.add(n));

  // CV/info pylons near center
  function cvNode({ name, desc, tags, position }) {
    const baseGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 20);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x132438,
      emissive: 0x1a2f4a,
      metalness: 0.4,
      roughness: 0.25
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.12;

    const slabGeo = new THREE.BoxGeometry(0.5, 1.6, 0.16);
    const slabMat = new THREE.MeshStandardMaterial({
      color: 0x35f3ff,
      emissive: 0x35f3ff,
      emissiveIntensity: 0.6,
      metalness: 0.15,
      roughness: 0.3,
      transparent: true,
      opacity: 0.9
    });
    const slab = new THREE.Mesh(slabGeo, slabMat);
    slab.position.y = 1;

    const node = new THREE.Group();
    node.add(base);
    node.add(slab);
    node.position.copy(position);
    node.userData = {
      type: 'project',
      name,
      desc,
      tags
    };

    group.add(node);
    targets.push(node);
  }

  cvNode({
    name: 'Süleyman Mercan — Backend Dev',
    desc: '.NET Core, REST API, EF Core, Docker. Performans ve temiz mimari odaklı backend.',
    tags: ['.NET Core', 'REST', 'Clean Architecture', 'Docker'],
    position: new THREE.Vector3(0, 0, 3)
  });

  cvNode({
    name: 'Deneyim',
    desc: 'Logiting Teknoloji: API tasarımı, veri modeli, süreç iyileştirme. KGM staj: network & donanım destek.',
    tags: ['Logiting', 'KGM', 'API Design'],
    position: new THREE.Vector3(-2.5, 0, 1)
  });

  cvNode({
    name: 'İletişim',
    desc: 'GitHub: github.com/slymanmrcan • LinkedIn: linkedin.com/in/slymanmrcan • E-posta: slymanmrcan@gmail.com',
    tags: ['Contact', '+90 551 952 45 00'],
    position: new THREE.Vector3(2.5, 0, 1)
  });

  const holoGeo = new THREE.RingGeometry(2, 2.8, 60);
  const holoMat = new THREE.MeshBasicMaterial({ color: 0x35f3ff, transparent: true, opacity: 0.35 });
  const holo = new THREE.Mesh(holoGeo, holoMat);
  holo.rotation.x = -Math.PI / 2;
  holo.position.y = 0.2;
  group.add(holo);

  const portal = createPortal({
    position: new THREE.Vector3(0, 1.8, -2),
    targetRoom: 'room1',
    color: 0xff2fd4,
    label: 'Press E to return to the Terminal Floor'
  });
  group.add(portal.mesh);

  const spawn = new THREE.Vector3(0, 1.6, 10);

  return {
    name: 'room2',
    group,
    rayTargets: [...targets, portal.mesh],
    portal,
    spawn
  };
}
