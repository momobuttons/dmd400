import './style.css'
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GUI } from 'dat.gui';


//gui
const gui = new GUI();
//loader
const loader = new GLTFLoader();
//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
//light
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(10, 10, 10);
scene.add(light);
//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
camera.position.z = 5;
camera.position.x = 1;
camera.position.y = 1;
//renderer
const renderer = new THREE.WebGL1Renderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render( scene, camera);
renderer.setPixelRatio( window.devicePixelRatio );
//doc append
document.body.appendChild( renderer.domElement );
//orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
//asset groupd
const group = new THREE.Group();
const jargroup = new THREE.Group();

//light position gui
gui.add(light.position,'x').min(0).max(100).name('Light position X');
gui.add(light.position,'y').min(0).max(100).name('Light position Y');
gui.add(light.position,'z').min(0).max(100).name('Light position Z');
//bottom jar
loader.load( './blender/jarbottom.glb', function ( gltf ) {
    let model = gltf.scene;
    //glass
    let newMaterial = new THREE.MeshPhysicalMaterial({
        metalness: 0,
        roughness: 1,
        envMapIntensity: 0.9,
        clearcoat: 1,
        transparent: true,
        transmission: .95,
        opacity: 1,
        reflectivity: 0.2,
        roughness: 0
    })
    model.traverse((o) => {
        if (o.isMesh) o.material = newMaterial;});
            group.add( model );
            jargroup.add( model );
        }, undefined, function ( error ) {
      console.error( error );
    } 
);
//middle jar
loader.load( './blender/jarmiddle.glb', function ( gltf ) {
    let modelTwo = gltf.scene
    group.add(modelTwo);
    jargroup.add(modelTwo);
}, undefined, function ( error ) {
    console.error( error );
} );
//top jar
loader.load( './blender/topjar.glb', function ( gltf ) {
    let modelThree = gltf.scene
    group.add(modelThree);
    jargroup.add(modelThree);
}, undefined, function ( error ) {
    console.error( error );
} );
//character
loader.load( 'dude2.glb', function ( gltf ) {
    let modeldude = gltf.scene;
    gui.add(modeldude.position,'x', 0, 10, .1).name('character position X');
    gui.add(modeldude.position,'y', -10, 10, .1).name('character position Y');
    gui.add(modeldude.position,'z', 0, 10, .1).name('character position Z');

    gui.add(modeldude.rotation,'x', 0, 10, .1).name('character position X');
    gui.add(modeldude.position,'y', -10, 10, .1).name('character position Y');
    gui.add(modeldude.position,'z', 0, 10, .1).name('character position Z');
    group.add(modeldude);
}, undefined, function ( error ) {
  console.error( error );
});
//update controls
controls.update();
//groups
scene.add(group);
gui.add(group.position,'x', 0, 10, .1).name('group position X');
gui.add(group.position,'y', -10, 10, .1).name('group position Y');
gui.add(group.position,'z', 0, 10, .1).name('group position Z');
gui.add(group.rotation,'x', 0, 50, .1).name('group rotation X');
gui.add(group.rotation,'y', 0, 50, .1).name('group rotation Y');
gui.add(group.rotation,'z', 0, 50, .1).name('group rotation Z');
scene.add(jargroup);
gui.add(jargroup.position,'x', 0, 10, .1).name('jargroup position X');
gui.add(jargroup.position,'y', -10, 10, .1).name('jargroup position Y');
gui.add(jargroup.position,'z', 0, 10, .1).name('jargroup position Z');
gui.add(jargroup.rotation,'x', 0, 50, .1).name('jargroup rotation X');
gui.add(jargroup.rotation,'y', 0, 50, .1).name('jargroup rotation Y');
gui.add(jargroup.rotation,'z', 0, 50, .1).name('jargroup rotation Z');
//camera
camera.lookAt(group);

function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}
animate();