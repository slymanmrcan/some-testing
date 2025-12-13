
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const DATA = [
  { name: "HajiLang", desc: "Custom language & CLI" },
  { name: "RealtimeChat", desc: ".NET SignalR backend" },
  { name: "DevOps Stack", desc: "CI/CD & hardening" }
];

export function createProjects(scene) {
  return DATA.map((p, i) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshStandardMaterial({
        color: 0x001217,
        emissive: 0x00ffe0,
        emissiveIntensity: 0.5
      })
    );

    mesh.position.set(i * 3 - 3, 1, -6);
    mesh.userData = p;
    scene.add(mesh);

    return mesh;
  });
}
