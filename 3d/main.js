import * as THREE from 'three';
import { createRenderer, createScene } from './engine/scene.js';
import { createCamera } from './engine/camera.js';
import { createControls } from './engine/controls.js';
import { createLoop } from './engine/loop.js';
import { createState } from './engine/state.js';
import { buildRoom1 } from './world/room1.js';
import { buildRoom2 } from './world/room2.js';
import { createHUD } from './ui/hud.js';
import { createOverlay } from './ui/overlay.js';
import { createCrosshair } from './ui/crosshair.js';

const canvas = document.getElementById('scene');
const hudRoot = document.getElementById('hud');
const overlayRoot = document.getElementById('overlay');

const overlay = createOverlay(overlayRoot);
const { renderer, error } = createRenderer(canvas);

if (error || !renderer) {
  overlay.showError(error || 'WebGL failed to initialize. Enable Hardware Acceleration.');
  throw new Error(error || 'WebGL unavailable');
}

const scene = createScene();
const camera = createCamera();
scene.add(camera);

const hud = createHUD(hudRoot);
createCrosshair(hudRoot);

const controls = createControls(camera, renderer.domElement, hud);
const loop = createLoop(renderer, scene, camera);
const state = createState(scene);

const room1 = buildRoom1();
const room2 = buildRoom2();
state.registerRoom('room1', room1);
state.registerRoom('room2', room2);
state.setActiveRoom('room1');
camera.position.copy(state.getActiveSpawn());

hud.setHint('Click/WASD to lock. Nişan al + tık/E: hap. Portalda E ile Signal Lab.');
hud.setTitle('');

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(0, 0);
let portalCandidate = null;
let pillCandidate = null;

function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', handleResize);
handleResize();

function updateRaycast() {
  const targets = state.getRaycastTargets();
  if (!targets.length) {
    hud.clearPanel();
    return;
  }

  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(targets, true);
  pillCandidate = null;
  if (hits.length > 0) {
    let node = hits[0].object;
    while (node && !node.userData?.type) {
      node = node.parent;
    }
    const data = (node && node.userData) || {};
    if (data.type === 'project' || data.type === 'pill') {
      hud.showProject(data);
      if (data.type === 'pill') pillCandidate = data;
    } else {
      hud.clearPanel();
    }
  } else {
    hud.clearPanel();
  }
}

function updatePortal() {
  const portal = state.getPortal();
  if (!portal) {
    hud.hidePortalHint();
    portalCandidate = null;
    return;
  }

  const dist = portal.mesh.position.distanceTo(camera.position);
  if (dist < portal.radius) {
    hud.showPortalHint(portal.label || 'Press E to enter');
    portalCandidate = portal;
  } else {
    hud.hidePortalHint();
    if (portalCandidate === portal) portalCandidate = null;
  }
}

function switchRoom(targetRoom) {
  const next = state.setActiveRoom(targetRoom);
  camera.position.copy(next.spawn);
  hud.hidePortalHint();
  if (targetRoom === 'room2') {
    hud.setHint('Signal Lab: CV panoları merkezde, projeler halka; nişanla okumak için yaklaş.');
  } else {
    hud.setHint('Click/WASD to lock. Nişan al + tık/E: hap. Portalda E ile Signal Lab.');
  }
}

function handlePillChoice(choice) {
  if (!choice) return;
  if (choice.pillType === 'red') {
    hud.showPortalHint('Kırmızı hap: Portal açık, E ile geç');
    setTimeout(() => hud.hidePortalHint(), 2200);
  } else if (choice.pillType === 'blue') {
    hud.showPortalHint('Mavi hap: Lobide kal, serbestçe gez');
    setTimeout(() => hud.hidePortalHint(), 2000);
  }
}

window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyE' && portalCandidate) {
    switchRoom(portalCandidate.targetRoom);
  } else if (event.code === 'KeyE' && pillCandidate) {
    handlePillChoice(pillCandidate);
  }
});

window.addEventListener('mousedown', () => {
  if (pillCandidate) handlePillChoice(pillCandidate);
});

window.addEventListener('click', () => {
  if (!controls.isLocked()) {
    controls.controls.lock();
  }
});

loop.addUpdater((delta) => {
  controls.update(delta);
  updateRaycast();
  updatePortal();
});

loop.start();
