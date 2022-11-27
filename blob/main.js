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
const light = new THREE.PointLight(0xffffff, 3);
light.position.set(0, 0, 0);
scene.add(light);

let clock = new THREE.Clock();


//camera
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);

//var helper = new THREE.CameraHelper(camera);
//scene.add(helper);

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

let img1 = 'v.gltf';
let img2 = 'salComune2.glb';
let img3 = 'jj.glb';
let img4 = 'jynistoe2.glb';
let img5 = 'oleum2.glb';
const symbol = [img1 , img2, img3, img4, img5];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let plant1 = 'Datura';
let plant2 = 'Artemisia';
let plant3 = 'Blackthorn';
let plant4 = 'Rowan';
let plant5 = 'Sage';
let plant6 = 'Mint';
let plant7 = 'Rosemary';
let plant8 = 'Thyme';
let plant9 = 'Mugwort';
let plant10 = 'Yarrow';
let plantArr = [plant1 , plant2, plant3, plant4, plant5, plant6, plant7, plant8, plant9, plant10];
document.getElementById("plant").innerHTML = `Associated Plant: ${plantArr[getRandomInt(9)]}`;

let name1 = 'Ake';
let name2 = 'Odger';
let name3 = 'Malakai';
let name4 = 'Eluf';
let name5 = 'Lif';
let name6 = 'Folke';
let name7 = 'Eydis';
let name8 = 'Frode';
let name9 = 'Gyda';
let name10 = 'Hod';
let name11 = 'Inkeri';
let name12 = 'Loki';
let name13 = 'Olaf';
let name14 = 'Olavi';
let name15 = 'Oydis';
let name16 = 'Oscar';
let name17 = 'Siv';
let nameArr = [name1 , name2, name3, name4, name5, name6, name7, name8, name9, name10, name11, name12, name13, name14, name15, name16, name17];

document.getElementById("name").innerHTML = `Name: ${nameArr[getRandomInt(16)]}`;


let color1 = '#33FFBD';
let color2 = '#33FF57';
let color3 = '#DBFF33';
let color4 = '#DFFF00';
let color5 = '#40E0D0';
let color6 = '#CCCCFF';
let color7 = '#826aed';
let color8 = '#c879ff';
let color9 = '#ffb7ff';
let color10 = '#3bf4fb';
let colorArr = [color1 , color2, color3, color4, color5, color6, color7, color8, color9, color10];
document.getElementById("color").style.backgroundColor = colorArr[getRandomInt(9)];




//middle jar
loader.load( `./blender/topRandom/${symbol[getRandomInt(4)]}`, function ( gltf ) {
    let modelTwo = gltf.scene;
    group.add(modelTwo);
    jargroup.add(modelTwo);
    //toptop.add(modelTwo);
}, undefined, function ( error ) {
    console.error( error );
});

loader.load( './blender/toptoptest11.glb', function ( gltf ) {
    let modelThree = gltf.scene;
    //group.add(modelThree);
    //jargroup.add(modelThree);
}, undefined, function ( error ) {
    console.error( error );
});



//character
loader.load( './blender/blobdot.gltf', function ( gltf ) {
    let modeldude = gltf.scene;

    group.add(modeldude);
    gui.add(modeldude.position,'y').min(-300).max(300);

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
light.position.x = 0;

scene.add(jargroup);

camera.position.z = 20;
camera.position.x = 1;
camera.position.y = -1.5;

//gui.add(group.position,'y').min(-300).max(300);

jargroup.position.x = 1.5;

jargroup.position.y = -.5;
group.position.x = 1.5;


function animate() {
  requestAnimationFrame( animate );

  const time = clock.getElapsedTime();


 group.position.y = Math.cos( time ) * .4;
  //group.position.y = Math.sin(time) + .59;



  controls.update();
  renderer.render( scene, camera );
}
animate();