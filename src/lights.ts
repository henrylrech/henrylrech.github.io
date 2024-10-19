import * as THREE from 'three'

export function AmbientLight(scene: THREE.Scene) {
  scene.add(new THREE.AmbientLight(0x757f8e, 3));
}

export function DirectionalLight(scene: THREE.Scene) {
  const directionalLight = new THREE.DirectionalLight(0xfffecd, 1.5);
  directionalLight.position.set(100, 100, 100);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(2048, 2048);
  scene.add(directionalLight);
}

export function Spotlight(scene: THREE.Scene) {
  const spotLight = new THREE.SpotLight(0xffc100, 10, 10, Math.PI / 16, .02, 2);
  spotLight.position.set(2, 2, 0);
  const target = spotLight.target;
  scene.add(target);
  target.position.set(0, 0, 0);
  spotLight.castShadow = true;
  scene.add(spotLight);
}
