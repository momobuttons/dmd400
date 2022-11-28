import './style.css'
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { GUI } from 'dat.gui';


//gui
//const gui = new GUI();
//loader
const loader = new GLTFLoader();
//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
//light
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(4, 4, 69);
scene.add(light);

let clock = new THREE.Clock();

/*const light2 = new THREE.AmbientLight( 0x404040,20 ); // soft white light

scene.add( light2 )*/



//camera
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);

//var helper = new THREE.CameraHelper(camera);
//scene.add(helper);

//renderer
const renderer = new THREE.WebGL1Renderer();
renderer.setSize( window.innerWidth * .5, window.innerHeight * .5);
renderer.render( scene, camera);
renderer.setPixelRatio( window.devicePixelRatio );



//doc append
document.getElementById("app").appendChild( renderer.domElement );
//orbit controls
const controls = new OrbitControls( camera, renderer.domElement );

//asset groupd
const group = new THREE.Group();
const jargroup = new THREE.Group();
const toptop = new THREE.Group();


loader.load( './blender/glass.glb', function ( gltf ) {
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

let img1 = 'vrinaGold.gltf';//
let img2 = 'salComuneGold.gltf';//
let img3 = 'jgmsCopperBottom.gltf';//
let img4 = 'jynistoeGold.gltf';//
let img5 = 'oleumGold.gltf';
const symbol = [img1 , img2, img3, img4, img5];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let element1 = 'Earth';
let element2 = 'Fire';
let element3 = 'Air';
let element4 = 'Water';

let elementArr = [element1 , element2, element3, element4];
document.getElementById("element").innerHTML = `Element: ${elementArr[getRandomInt(3)]}`;

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


let color1 = '#f000ff';
let color2 = '#ffe700';
let color3 = '#4deeea';
let color4 = '#83018E';
let color5 = '#ff00fa';
let color6 = '#04eeff';
let color7 = '#ffff71';
let color8 = '#c879ff';
let color9 = '#7fff00';
let color10 = '#ccff00';
let colorArr = [color1 , color2, color3, color4, color5, color6, color7, color8, color9, color10];
//document.getElementById("color").style.backgroundColor = colorArr[getRandomInt(9)];
const light3 = new THREE.HemisphereLight( 0xffffbb, `${colorArr[getRandomInt(9)]}`, 4);
scene.add( light3 );



//middle jar
loader.load( `./blender/bottomSymbol/${symbol[getRandomInt(4)]}`, function ( gltf ) {
    let modelTwo = gltf.scene;
    group.add(modelTwo);
    jargroup.add(modelTwo);
    //toptop.add(modelTwo);
}, undefined, function ( error ) {
    console.error( error );
});

loader.load( './blender/capsule/topCopper.gltf', function ( gltf ) {
    let modelThree = gltf.scene;
   group.add(modelThree);
 
 jargroup.add(modelThree);
}, undefined, function ( error ) {
    console.error( error );
});

/*loader.load( './blender/bottomLeather.gltf', function ( gltf ) {
    let modelThree = gltf.scene;
    group.add(modelThree);
    jargroup.add(modelThree);
}, undefined, function ( error ) {
    console.error( error );
});*/



//character
loader.load( './blender/dude/blobdot.gltf', function ( gltf ) {
    let modeldude = gltf.scene;

    group.add(modeldude);
   // gui.add(modeldude.position,'y').min(-300).max(300);
        modeldude.position.y = 3.5;
    //jargroup.add(modeldude);
}, undefined, function ( error ) {
  console.error( error );
});

//update controls
controls.update();
//groups
scene.add(group);
scene.add(toptop);

/*light.position.y = 72;
light.position.z = 50;
light.position.x = 0;*/

scene.add(jargroup);

camera.position.z = 17;
camera.position.x = 1;
camera.position.y = -1.5;

/*gui.add(camera.position,'x').min(-300).max(300);
gui.add(camera.position,'y').min(-300).max(300);
gui.add(camera.position,'z').min(-300).max(300);*/

jargroup.position.x = 1.5;

jargroup.position.y = 3;
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