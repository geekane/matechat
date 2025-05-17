<template>
    <div class="scene-container" ref="sceneRef">
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const sceneRef = ref();
const loader = new GLTFLoader();
const scene = new THREE.Scene();
let camera;
let controls;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
scene.add( new THREE.AmbientLight( 0xffffff ) );
let model;
loader.load( '../../../assets/gltf/shuizhi.gltf', ( gltf ) => {
    gltf.scene.position.x = 0;
    gltf.scene.position.y = -20;
    gltf.scene.position.z = 0;
    gltf.scene.scale.x = 130.0;
    gltf.scene.scale.y = 130.0;
    gltf.scene.scale.z = 130.0;
    model = gltf.scene;
    scene.add( gltf.scene );
    gltf.scene.name = "model";
});

onMounted(() => {
    if (!sceneRef.value) {
        return;
    }
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( sceneRef.value.clientWidth, sceneRef.value.clientHeight );
    sceneRef.value.appendChild( renderer.domElement );
    camera = new THREE.PerspectiveCamera( 75, sceneRef.value.clientWidth / sceneRef.value.clientHeight, 1, 10000 );
    camera.position.z = 100;

    controls = new OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 100;
    controls.maxDistance = 5000;
    controls.addEventListener( 'change', cameraChange );
    
    window.addEventListener('resize', onWindowResize, false);
    render();
});

onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize);
})

function render(rotate?) {
    requestAnimationFrame(render); 
    //渲染
    if (model) {
        model.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}

function cameraChange() {
    renderer.render(scene, camera);
} 

function onWindowResize(){
    camera.aspect = sceneRef.value.clientWidth / sceneRef.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( sceneRef.value.clientWidth, sceneRef.value.clientHeight );
    cameraChange();
}
</script>

<style lang="scss" scoped>
.scene-container {
    width: 100%;
    height: 100%;
}
</style>