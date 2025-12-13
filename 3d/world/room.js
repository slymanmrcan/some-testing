
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export function createRoom(scene) {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x080c12 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const wallMat = new THREE.MeshStandardMaterial({ color: 0x0a0f14 });

  const walls = [
    [0, 2.5, -10, 20, 5, 1],
    [0, 2.5, 10, 20, 5, 1],
    [-10, 2.5, 0, 1, 5, 20],
    [10, 2.5, 0, 1, 5, 20]
  ];

  walls.forEach(w => {
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(w[3], w[4], w[5]),
      wallMat
    );
    wall.position.set(w[0], w[1], w[2]);
    scene.add(wall);
  });
}
