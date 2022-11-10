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
light.position.set(0, 0, 0);
scene.add(light);

let clock = new THREE.Clock();


//camera
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);

var helper = new THREE.CameraHelper(camera);
scene.add(helper);

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
const toptop = new THREE.Group();


loader.load( './blender/jarbottomSmoothLG.glb', function ( gltf ) {
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

//make the file name random on start --> eventually on burn 

let img1 = 'vrinar.glb';
let img2 = 'salComunerr.glb';
let img3 = 'jgmsr.glb';
let img4 = 'jynistoer2.glb';
let img5 = 'oleumr.glb';
const symbol = [img1 , img2, img3, img4, img5];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//middle jar
loader.load( `./blender/topRandom/${symbol[2]}`, function ( gltf ) {
    let modelTwo = gltf.scene;
    group.add(modelTwo);
    jargroup.add(modelTwo);
    //toptop.add(modelTwo);
}, undefined, function ( error ) {
    console.error( error );
});

loader.load( './blender/toptop5.glb', function ( gltf ) {
    let modelThree = gltf.scene;
    group.add(modelThree);
    jargroup.add(modelThree);
}, undefined, function ( error ) {
    console.error( error );
});



//character
loader.load( './blender/dudeLG.glb', function ( gltf ) {
    let modeldude = gltf.scene;

    group.add(modeldude);
    //jargroup.add(modeldude);
}, undefined, function ( error ) {
  console.error( error );
});
//update controls
controls.update();
//groups
scene.add(group);
scene.add(toptop);

light.position.y = 72;
light.position.z = 50;
light.position.x = 5;

scene.add(jargroup);

camera.position.z = 20;
camera.position.x = 0;
camera.position.y = 0;


function animate() {
  requestAnimationFrame( animate );

  const time = clock.getElapsedTime();
  

  group.position.y = Math.cos( time ) * .5;
  //group.position.y = Math.sin(time) + .001;



  controls.update();
  renderer.render( scene, camera );
}
animate();