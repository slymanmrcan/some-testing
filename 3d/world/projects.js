import * as THREE from 'three';

const projectData = [
  {
    name: 'eduCenter',
    desc: 'Öğrenci, ders, ödeme ve sınav yönetimi için .NET Core tabanlı backend.',
    tags: ['.NET Core', 'EF Core', 'Role-based access'],
    repoUrl: 'https://github.com/slymanmrcan/eduCenter',
    liveUrl: ''
  },
  {
    name: 'BaseLibrary',
    desc: 'Yeni projeler için ortak altyapıyı sağlayan çekirdek kütüphane.',
    tags: ['Clean Architecture', 'Repository', 'Unit of Work'],
    repoUrl: 'https://github.com/slymanmrcan/BaseLibrary',
    liveUrl: ''
  },
  {
    name: 'TaskScheduler.API',
    desc: 'Zamanlanmış görev ve tetikleyici yönetimi için hafif API servisi.',
    tags: ['Minimal API', 'PostgreSQL', 'Background jobs'],
    repoUrl: 'https://github.com/slymanmrcan/TaskScheduler.API',
    liveUrl: ''
  },
  {
    name: 'DeviceInfo',
    desc: 'Cihaz bilgisi toplayan ve raporlayan yardımcı servisler.',
    tags: ['.NET', 'Diagnostics', 'API'],
    repoUrl: 'https://github.com/slymanmrcan/DeviceInfo',
    liveUrl: ''
  },
  {
    name: 'KasaTakip',
    desc: 'Kasa ve işlem takibi için hafif izleme uygulaması.',
    tags: ['Finance', 'Tracking', 'API'],
    repoUrl: 'https://github.com/slymanmrcan/KasaTakip',
    liveUrl: ''
  },
  {
    name: 'PrivFlow',
    desc: 'Github üzerinden erişilebilir, gizlilik odaklı akış araçları.',
    tags: ['Security', 'Workflow', 'GitHub'],
    repoUrl: 'https://github.com/slymanmrcan/PrivFlow',
    liveUrl: ''
  },
  {
    name: 'github-infra',
    desc: 'CI/CD ve otomasyon için GitHub Actions altyapısı.',
    tags: ['CI/CD', 'Automation', 'GitHub Actions'],
    repoUrl: 'https://github.com/slymanmrcan/github-infra',
    liveUrl: ''
  }
];

export function createProjectNodes() {
  const pedestalGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.2, 20);
  const slabGeo = new THREE.BoxGeometry(0.4, 1.5, 0.12);
  const meshes = [];

  projectData.forEach((proj, idx) => {
    const hue = (idx * 55) % 360;
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(`hsl(${hue}, 70%, 45%)`),
      emissive: new THREE.Color(`hsl(${(hue + 40) % 360}, 70%, 30%)`),
      metalness: 0.5,
      roughness: 0.25
    });
    const slabMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(`hsl(${(hue + 140) % 360}, 70%, 70%)`),
      emissive: new THREE.Color(`hsl(${(hue + 200) % 360}, 70%, 45%)`),
      emissiveIntensity: 0.6,
      metalness: 0.1,
      roughness: 0.3,
      opacity: 0.9,
      transparent: true
    });

    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = 0.1;

    const slab = new THREE.Mesh(slabGeo, slabMat);
    slab.position.y = 1;

    const node = new THREE.Group();
    node.add(pedestal);
    node.add(slab);
    const radius = 7.5;
    const angle = (idx / projectData.length) * Math.PI * 2;
    node.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    node.rotation.y = -angle + Math.PI;

    node.userData = {
      type: 'project',
      ...proj
    };

    const haloGeo = new THREE.RingGeometry(0.6, 0.75, 32);
    const haloMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.35, transparent: true });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = 0.02;
    node.add(halo);

    meshes.push(node);
  });

  return { nodes: meshes, targets: meshes };
}
