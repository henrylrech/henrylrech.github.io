import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from 'three'

export function Mordecai(scene: THREE.Scene, gltfloader: GLTFLoader) {
    let model
    gltfloader.load('/mordecai/scene.gltf', function(gltf) {
      model = gltf.scene
      model.scale.set(.4, .4, .4)
      model.position.set(-.18, .44 + .0001, 0)
      scene.add(model)
    },
      undefined,
      function(error) {
        console.error(error);
      });
  }

export function Rigby(scene: THREE.Scene, gltfloader: GLTFLoader) {
    gltfloader.load('/rigby/scene.gltf', function(gltf) {
      let model = gltf.scene
      model.scale.set(.4, .4, .4)
      model. position.set(.18, .02+.0001, 0)
      scene.add(model)
    },
    undefined,
    function(error) {
      console.error(error)
    });
  }
