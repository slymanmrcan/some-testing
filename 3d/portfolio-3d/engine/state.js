export function createState(scene) {
  const rooms = new Map();
  let current = null;

  function registerRoom(name, room) {
    rooms.set(name, room);
  }

  function setActiveRoom(name) {
    const next = rooms.get(name);
    if (!next) throw new Error(`Room ${name} not registered`);

    if (current) scene.remove(current.group);
    scene.add(next.group);
    current = next;
    return next;
  }

  function getActiveRoom() {
    return current;
  }

  function getRaycastTargets() {
    if (!current) return [];
    return current.rayTargets || [];
  }

  function getPortal() {
    if (!current) return null;
    return current.portal || null;
  }

  function getActiveSpawn() {
    if (!current) return { x: 0, y: 1.6, z: 0 };
    return current.spawn.clone ? current.spawn.clone() : current.spawn;
  }

  return { registerRoom, setActiveRoom, getActiveRoom, getRaycastTargets, getPortal, getActiveSpawn };
}
