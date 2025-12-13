import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const projectData = [
  {
    name: 'PulseGrid',
    desc: 'Realtime data dashboard with WebGL overlays and reactive streams.',
    tags: ['WebGL', 'RxJS', 'SSE'],
    repoUrl: 'https://github.com/example/pulsegrid',
    liveUrl: 'https://pulsegrid.example.com'
  },
  {
    name: 'EchoSynth',
    desc: 'Audio-reactive shader toy pack rendered in-browser.',
    tags: ['Audio', 'Shaders', 'Three.js'],
    repoUrl: 'https://github.com/example/echosynth',
    liveUrl: 'https://echosynth.example.com'
  },
  {
    name: 'Nebula CMS',
    desc: 'Headless CMS with MDX blocks, GraphQL, and live preview.',
    tags: ['GraphQL', 'MDX', 'CMS'],
    repoUrl: 'https://github.com/example/nebulacms',
    liveUrl: 'https://nebula.example.com'
  },
  {
    name: 'Flux Arcade',
    desc: 'Retro mini-games bundle with leaderboard and replay storage.',
    tags: ['Games', 'WebRTC', 'Leaderboard'],
    repoUrl: 'https://github.com/example/flux-arcade',
    liveUrl: 'https://fluxarcade.example.com'
  },
  {
    name: 'Specter AI',
    desc: 'Browser-native AI playground with on-device inference demos.',
    tags: ['AI', 'WebGPU', 'Playground'],
    repoUrl: 'https://github.com/example/specter-ai',
    liveUrl: 'https://specterai.example.com'
  },
  {
    name: 'GlitchNet',
    desc: 'Mesh network visualizer for distributed IoT clusters.',
    tags: ['Networking', 'Visualization', 'IoT'],
    repoUrl: 'https://github.com/example/glitchnet',
    liveUrl: 'https://glitchnet.example.com'
  }
];

export function createProjectNodes() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meshes = [];

  projectData.forEach((proj, idx) => {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(`hsl(${(idx * 60) % 360}, 80%, 55%)`),
      emissive: new THREE.Color(`hsl(${(idx * 60 + 180) % 360}, 80%, 40%)`),
      metalness: 0.2,
      roughness: 0.4
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      Math.cos(idx) * 4.5,
      1.2 + (idx % 2) * 0.5,
      Math.sin(idx) * 4.5
    );

    mesh.userData = {
      type: 'project',
      ...proj
    };

    const ringGeo = new THREE.TorusGeometry(0.7, 0.05, 12, 60);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.4, transparent: true });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    mesh.add(ring);

    meshes.push(mesh);
  });

  return { nodes: meshes, targets: meshes };
}
