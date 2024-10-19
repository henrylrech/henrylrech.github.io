import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { Mordecai, Rigby } from './characters';
import { Floor, Sofa, Table, TV, TVModem, TVScreen } from './objects';
import { AmbientLight, DirectionalLight, Spotlight } from './lights';

let camera: THREE.OrthographicCamera
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer
let composer: EffectComposer

init();

function init() {

  const aspectRatio = window.innerWidth / window.innerHeight;

  camera = new THREE.OrthographicCamera(- aspectRatio, aspectRatio, 1, - 1, 0.1, 10);
  camera.position.y = 2 * Math.tan(Math.PI / 8);
  camera.position.z = 2;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x151729);

  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  composer = new EffectComposer(renderer);
  const renderPixelatedPass = new RenderPixelatedPass(6, scene, camera);
  renderPixelatedPass.setPixelSize(5)
  renderPixelatedPass.normalEdgeStrength = 0
  renderPixelatedPass.depthEdgeStrength = .04
  composer.addPass(renderPixelatedPass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  window.addEventListener('resize', onWindowResize);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.maxZoom = 2;

  const gltfloader = new GLTFLoader();

  // objects

  Floor(scene)
  Sofa(scene)
  Table(scene)
  TV(scene)
  TVModem(scene)
  TVScreen(scene)

  //characters

  Mordecai(scene, gltfloader)
  Rigby(scene, gltfloader)

  // lights

  AmbientLight(scene)
  DirectionalLight(scene)
  Spotlight(scene)
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
