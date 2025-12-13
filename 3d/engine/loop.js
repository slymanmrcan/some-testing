
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const raycaster = new THREE.Raycaster();
const hud = document.getElementById("project");

export function startLoop({ scene, camera, renderer, controls, projects }) {
  function animate() {
    requestAnimationFrame(animate);

    raycaster.setFromCamera(new THREE.Vector2(0,0), camera);
    const hits = raycaster.intersectObjects(projects);

    if (hits.length) {
      hud.style.display = "block";
      hud.innerHTML = `
        <strong>${hits[0].object.userData.name}</strong><br>
        ${hits[0].object.userData.desc}
      `;
    } else {
      hud.style.display = "none";
    }

    renderer.render(scene, camera);
  }

  animate();
}
