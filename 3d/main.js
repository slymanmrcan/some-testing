
import { initScene } from "./engine/scene.js";
import { initCamera } from "./engine/camera.js";
import { initControls } from "./engine/controls.js";
import { createRoom } from "./world/room.js";
import { createProjects } from "./world/projects.js";
import { startLoop } from "./engine/loop.js";

const { scene, renderer } = initScene();
const camera = initCamera();
const controls = initControls(camera, renderer.domElement);

createRoom(scene);
const projects = createProjects(scene);

startLoop({ scene, camera, renderer, controls, projects });
