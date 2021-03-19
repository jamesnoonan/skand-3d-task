import React from 'react';
import './App.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFLoader } from './GLTFLoader';

import { TilesRenderer } from './tilesRendererJS/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize, false);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth - 1, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
    this.loader = new GLTFLoader();

    this.loader.load(
      './gltfOne/Box.gltf',
      (gltf) => {
        // ADD MODEL TO THE SCENE
        // gltf.scene.children[0].scale.set(new THREE.Vector3(1, 1, 1));
        this.scene.add(gltf.scene);
        this.scene.background = new THREE.Color(0xff5555);
        this.renderer.render(this.scene, this.camera);
      },
      undefined,

      (error) => {
        console.log(error);
      }
    );

    // Create a 10x10 grid
    const size = 5;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);

    // this.tilesRenderer = new TilesRenderer(
    //   'https://skand-upload-data.s3-ap-southeast-2.amazonaws.com/Skand+St+Kilda+HQ/Production_2.json'
    // );
    // this.tilesRenderer.setCamera(this.camera);
    // this.tilesRenderer.setResolutionFromRenderer(this.camera, this.renderer);
    // this.scene.add(this.tilesRenderer.group);

    // this.tilesRenderer.onLoadTileSet = (t) => {
    //   const loc = new THREE.Vector3(
    //     t.root.boundingVolume.sphere[0],
    //     t.root.boundingVolume.sphere[1],
    //     t.root.boundingVolume.sphere[2]
    //   );
    //   this.camera.position.set(loc.x, loc.y, loc.z);
    //   this.needsRerender = true;
    // };
    // this.tilesRenderer.onLoadModel = () => (this.needsRerender = true);
    // this.needsRerender = true;
    // Move position camera back to allow for orbit controls
    this.camera.position.z = 5;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.animate();
  }

  onWindowResize() {
    // The browser has been resized, so the size of the camera and renderer must be updated
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth - 1, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate);

    this.camera.updateMatrixWorld();
    this.controls.update();
    // if (this.needsRerender) {
    //   this.needsRerender = false;
    //   this.tilesRenderer.update();
    // }

    this.renderer.render(this.scene, this.camera);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize, false);
  }

  render() {
    return (
      <div className="app-container" ref={(ref) => (this.mount = ref)}></div>
    );
  }
}

export default App;
