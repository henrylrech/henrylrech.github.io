import * as THREE from 'three'

export const sofaMaterial = new THREE.MeshPhongMaterial({ color: 0xe3dcd2 })
export const woodMaterial = new THREE.MeshPhongMaterial({ color: 0xc5b287 })
export const tvMaterial = new THREE.MeshPhongMaterial({ color: 0x8f9289 })
export const image = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./rickastley.jpg') })


