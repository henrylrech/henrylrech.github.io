import * as THREE from 'three'
import { sofaMaterial, tvMaterial, woodMaterial, image } from "./materials";
import pixelTexture from './util/pixelTexture';

function addBox(scene: THREE.Scene, sizeX: number, sizeY: number, sizeZ: number, x: number, y: number, z: number, rotation: number, material: any) {

  const mesh = new THREE.Mesh(new THREE.BoxGeometry(sizeX, sizeY, sizeZ), material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.rotation.x = rotation;
  mesh.position.y = y
  mesh.position.set(x, sizeY / 2 + .0001 + y, z);
  scene.add(mesh);
  return mesh;

}

function addCylinder(scene: THREE.Scene, sizeX: number, sizeY: number, sizeZ: number, x: number, y: number, z: number, rotation: number, material: any) {

  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(sizeX, sizeY, sizeZ, 12), material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.rotation.x = rotation;
  mesh.position.y = y
  mesh.position.set(x, sizeY / 2 + .0001 + y, z);
  scene.add(mesh);
  return mesh;

}

export function Floor(scene: THREE.Scene) {
  const loader = new THREE.TextureLoader();
  const texChecker = pixelTexture(loader.load('../regfloor.png'));
  const texChecker2 = pixelTexture(loader.load('../regfloor.png'));
  texChecker.repeat.set(3, 3);
  texChecker2.repeat.set(1.5, 1.5);
  const planeSideLength = 2
  const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(planeSideLength, planeSideLength),
    new THREE.MeshPhongMaterial({ map: texChecker, side: THREE.DoubleSide })
  );
  planeMesh.receiveShadow = true;
  planeMesh.rotation.x = - Math.PI / 2;
  scene.add(planeMesh);
}

export function Sofa(scene: THREE.Scene) {
  addBox(scene, 1.1, .15, .4, 0, 0, -.5, 0, sofaMaterial);
  addBox(scene, 1.1, .08, .5, 0, .15, -.5, 0, sofaMaterial);
  addCylinder(scene, .1, .1, .5, .5, .2, -.45, Math.PI / 2, sofaMaterial)
  addCylinder(scene, .1, .1, .5, -.5, .2, -.45, Math.PI / 2, sofaMaterial)
  addBox(scene, 1.1, .35, .15, 0, .12, -.7, -.12, sofaMaterial)
  addBox(scene, 1, .074, .15, 0, .45, -.725, -.12, sofaMaterial)
  addCylinder(scene, .05, .05, .15, -.5, .45, -.725, Math.PI / 2 - .1, sofaMaterial)
  addCylinder(scene, .05, .05, .15, .5, .45, -.725, Math.PI / 2 - .1, sofaMaterial)
}

export function Table(scene: THREE.Scene) {
  addBox(scene, .5, .02, .4, 0, .24, .6, 0, woodMaterial)
  addBox(scene, .5, .02, .4, 0, .16, .6, 0, woodMaterial)
  addBox(scene, .02, .24, .02, .23, 0, .42, 0, woodMaterial)
  addBox(scene, .02, .24, .02, -.23, 0, .42, 0, woodMaterial)
  addBox(scene, .02, .24, .02, .23, 0, .78, 0, woodMaterial)
  addBox(scene, .02, .24, .02, -.23, 0, .78, 0, woodMaterial)
}

export function TV(scene: THREE.Scene) {
  addBox(scene, .05, .30, .1, .175, .241, .48, 0, tvMaterial)
  addBox(scene, .12, .30, .1, -.140, .241, .48, 0, tvMaterial)
  addBox(scene, .4, .05, .1, 0, .241, .48, 0, tvMaterial)
  addBox(scene, .4, .05, .1, 0, .492, .48, 0, tvMaterial)
  addBox(scene, .4, .30, .15, 0, .241, .55, 0, tvMaterial)
  addBox(scene, .35, .25, .25, 0, .241, .6, 0, tvMaterial)
}

export function TVModem(scene: THREE.Scene) {
  addBox(scene, .14, .06, .1, .04, .161, .52, 0, tvMaterial)
}

export function TVScreen(scene: THREE.Scene) {
    var mesh = new THREE.Mesh(
    new THREE.PlaneGeometry( 1, 1, 1, 1 ),
    image
  )
  mesh.rotateY(Math.PI)
  mesh.position.set(.05, .4, .45)
  mesh.scale.set(.3, .25, .3)
  scene.add(mesh)
}
