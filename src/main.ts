import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera: THREE.OrthographicCamera
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer
let composer: EffectComposer
let clock: THREE.Clock;

init();

function init() {

  const aspectRatio = window.innerWidth / window.innerHeight;

  camera = new THREE.OrthographicCamera(- aspectRatio, aspectRatio, 1, - 1, 0.1, 10);
  camera.position.y = 2 * Math.tan(Math.PI / 6);
  camera.position.z = 2;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x151729);

  clock = new THREE.Clock();

  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  //renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  composer = new EffectComposer(renderer);
  const renderPixelatedPass = new RenderPixelatedPass(6, scene, camera);
  renderPixelatedPass.setPixelSize(6)
  renderPixelatedPass.normalEdgeStrength = 0
  renderPixelatedPass.depthEdgeStrength = 0
  composer.addPass(renderPixelatedPass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  window.addEventListener('resize', onWindowResize);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.maxZoom = 2;

  // textures

  const loader = new THREE.TextureLoader();
  const texChecker = pixelTexture(loader.load('../regfloor.png'));
  const texChecker2 = pixelTexture(loader.load('../regfloor.png'));
  texChecker.repeat.set(3, 3);
  texChecker2.repeat.set(1.5, 1.5);

  // meshes

  function addBox(sizeX: number, sizeY: number, sizeZ: number, x: number, y: number, z: number, rotation: number, material: any) {

    const mesh = new THREE.Mesh(new THREE.BoxGeometry(sizeX, sizeY, sizeZ), material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.rotation.x = rotation;
    mesh.position.y = y
    mesh.position.set(x, sizeY / 2 + .0001 + y, z);
    scene.add(mesh);
    return mesh;

  }

  function addCylinder(sizeX: number, sizeY: number, sizeZ: number, x: number, y: number, z: number, rotation: number, material: any) {

    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(sizeX, sizeY, sizeZ, 8), material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.rotation.x = rotation;
    mesh.position.y = y
    mesh.position.set(x, sizeY / 2 + .0001 + y, z);
    scene.add(mesh);
    return mesh;

  }
  const woodMaterial = new THREE.MeshPhongMaterial({ color: 0xc5b287 })
  const sofaMaterial = new THREE.MeshPhongMaterial({ color: 0xe3dcd2 })

  //sofa
  addBox(1.1, .15, .4, 0, 0, -.5, 0, sofaMaterial);
  addBox(1.1, .08, .5, 0, .15, -.5, 0, sofaMaterial);
  addCylinder(.1, .1, .5, .5, .2, -.45, Math.PI / 2, sofaMaterial)
  addCylinder(.1, .1, .5, -.5, .2, -.45, Math.PI / 2, sofaMaterial)
  addBox(1.1, .45, .15, 0, .12, -.7, -.12, sofaMaterial)

  //table
  addBox(.5, .02, .4, 0, .24, .6, 0, woodMaterial)
  addBox(.5, .02, .4, 0, .16, .6, 0, woodMaterial)
  addBox(.02, .24, .02, .23, 0, .42, 0, woodMaterial)
  addBox(.02, .24, .02, -.23, 0, .42, 0, woodMaterial)
  addBox(.02, .24, .02, .23, 0, .78, 0, woodMaterial)
  addBox(.02, .24, .02, -.23, 0, .78, 0, woodMaterial)

  const planeSideLength = 2
  const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(planeSideLength, planeSideLength),
    new THREE.MeshPhongMaterial({ map: texChecker, side: THREE.DoubleSide })
  );
  planeMesh.receiveShadow = true;
  planeMesh.rotation.x = - Math.PI / 2;
  scene.add(planeMesh);

  // lights

  scene.add(new THREE.AmbientLight(0x757f8e, 3));

  const directionalLight = new THREE.DirectionalLight(0xfffecd, 1.5);
  directionalLight.position.set(100, 100, 100);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(2048, 2048);
  scene.add(directionalLight);

  const spotLight = new THREE.SpotLight(0xffc100, 10, 10, Math.PI / 16, .02, 2);
  spotLight.position.set(2, 2, 0);
  const target = spotLight.target;
  scene.add(target);
  target.position.set(0, 0, 0);
  spotLight.castShadow = true;
  scene.add(spotLight);

}

function onWindowResize() {

  const aspectRatio = window.innerWidth / window.innerHeight;
  camera.left = - aspectRatio;
  camera.right = aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

  const rendererSize = renderer.getSize(new THREE.Vector2());
  const aspectRatio = rendererSize.x / rendererSize.y;
  if (camera.left != - aspectRatio || camera.top != 1.0) {

    // Reset the Camera Frustum if it has been modified
    camera.left = - aspectRatio;
    camera.right = aspectRatio;
    camera.top = 1.0;
    camera.bottom = - 1.0;
    camera.updateProjectionMatrix();

  }

  composer.render();

}

// Helper functions

function pixelTexture(texture: any) {

  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;

}

