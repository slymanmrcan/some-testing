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

  function makeLabel(text, position) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(10,18,34,0.6)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '28px Orbitron, sans-serif';
    ctx.fillStyle = '#35f3ff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.9 });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(3, 0.8, 1);
    sprite.position.copy(position);
    group.add(sprite);
    return sprite;
  }

  // guiding beacons on the floor to pull player inward
  function beacon(pos) {
    const geo = new THREE.CircleGeometry(0.35, 24);
    const mat = new THREE.MeshBasicMaterial({ color: 0x35f3ff, transparent: true, opacity: 0.35 });
    const m = new THREE.Mesh(geo, mat);
    m.rotation.x = -Math.PI / 2;
    m.position.copy(pos);
    m.position.y = 0.01;
    group.add(m);
  }
  [new THREE.Vector3(0, 0, 7.5), new THREE.Vector3(0, 0, 5.5), new THREE.Vector3(0, 0, 3.5)].forEach(beacon);

  // central holo core to anchor the space
  const coreGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.6, 24);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x18283d,
    emissive: 0x35f3ff,
    emissiveIntensity: 0.4,
    metalness: 0.5,
    roughness: 0.25
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.position.set(0, 0.3, 2.2);
  group.add(core);

  const coreRingGeo = new THREE.TorusGeometry(1.4, 0.06, 12, 50);
  const coreRingMat = new THREE.MeshBasicMaterial({ color: 0xff2fd4, transparent: true, opacity: 0.55 });
  const coreRing = new THREE.Mesh(coreRingGeo, coreRingMat);
  coreRing.rotation.x = Math.PI / 2;
  coreRing.position.set(0, 1.05, 2.2);
  group.add(coreRing);

  makeLabel('CV CORRIDOR', new THREE.Vector3(0, 2.2, 2.2));
  makeLabel('PROJECT RING', new THREE.Vector3(0, 2.2, 7.5));
  makeLabel('BACK TO PORTAL', new THREE.Vector3(0, 2.2, -8.5));

  // Corridor panels (sequential info as you walk forward)
  function corridorPanel({ name, desc, tags, position, faceZ }) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(13,21,38,0.92)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#35f3ff';
    ctx.font = 'bold 28px Orbitron, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(name, 24, 24);
    ctx.font = '18px Share Tech Mono, monospace';

    function wrapText(text, x, y, maxWidth, lineHeight) {
      const words = text.split(' ');
      let line = '';
      let yy = y;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, x, yy);
          line = words[n] + ' ';
          yy += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, yy);
    }

    wrapText(desc, 24, 70, 464, 26);
    ctx.fillStyle = '#ff2fd4';
    ctx.fillText((tags || []).join(' • '), 24, canvas.height - 48);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const panelGeo = new THREE.PlaneGeometry(2.6, 1.6);
    const panelMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.98,
      side: THREE.DoubleSide
    });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.position.set(position.x, 1.6, position.z);
    panel.lookAt(position.x, 1.6, faceZ);

    const node = new THREE.Group();
    node.add(panel);
    node.userData = { type: 'project', name, desc, tags };
    group.add(node);
    targets.push(node);
  }

  const seq = [
    { name: 'Süleyman MERCAN — Backend Developer', desc: 'REST API, veri erişimi, kurumsal backend; performans ve temiz mimari odaklı .NET Core geliştiricisi.', tags: ['Profile', '.NET Core'], pos: new THREE.Vector3(-2.2, 0, 4.5), face: 10 },
    { name: 'Deneyim', desc: 'Logiting Teknoloji (2021–2022): backend geliştirme, API tasarımı, veri modeli, süreç iyileştirme. KGM staj: network altyapısı ve donanım destek.', tags: ['Logiting', 'KGM'], pos: new THREE.Vector3(2.2, 0, 2.5), face: 10 },
    { name: 'Eğitim', desc: 'NEÜ Matematik Bilgisayar Bilimleri (2018–2021) • KTÜN Bilgisayar Programcılığı (2015–2018)', tags: ['Education'], pos: new THREE.Vector3(-2.2, 0, 0.5), face: 10 },
    { name: 'Teknik Beceriler', desc: 'Backend: .NET Core, ASP.NET, REST API, katmanlı mimari. ORM: EF Core, LINQ, Dapper. DB: SQL Server, PostgreSQL. DevOps: Git, GitHub Actions, CI/CD. Container: Docker. Prensipler: SOLID, Clean Architecture.', tags: ['Stack', 'DevOps'], pos: new THREE.Vector3(2.2, 0, -1.5), face: -10 },
    { name: 'Projeler Özet', desc: 'eduCenter, BaseLibrary, TaskScheduler.API, DeviceInfo, KasaTakip, github-infra, PrivFlow — GitHub üzerinden erişilebilir.', tags: ['Projects'], pos: new THREE.Vector3(-2.2, 0, -3.5), face: -10 },
    { name: 'İletişim & Hakkımda', desc: 'Telefon: +90 551 952 45 00 • E-posta: slymanmrcan@gmail.com • GitHub: github.com/slymanmrcan • LinkedIn: linkedin.com/in/slymanmrcan • Temiz kod, performans, katmanlı mimari tutkunu.', tags: ['Contact'], pos: new THREE.Vector3(2.2, 0, -5.5), face: -10 }
  ];
  seq.forEach((item) => corridorPanel({ name: item.name, desc: item.desc, tags: item.tags, position: item.pos, faceZ: item.face }));

  const holoGeo = new THREE.RingGeometry(2, 2.8, 60);
  const holoMat = new THREE.MeshBasicMaterial({ color: 0x35f3ff, transparent: true, opacity: 0.35 });
  const holo = new THREE.Mesh(holoGeo, holoMat);
  holo.rotation.x = -Math.PI / 2;
  holo.position.y = 0.2;
  group.add(holo);

  const portal = createPortal({
    position: new THREE.Vector3(0, 1.8, -9),
    targetRoom: 'room1',
    color: 0xff2fd4,
    label: 'Press E to return to the Terminal Floor'
  });
  group.add(portal.mesh);

  const spawn = new THREE.Vector3(0, 1.6, 8);

  return {
    name: 'room2',
    group,
    rayTargets: [...targets, portal.mesh],
    portal,
    spawn
  };
}
