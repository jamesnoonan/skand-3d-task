import React from 'react';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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

    // Create a 10x10 grid
    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);

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
    this.controls.update();

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
