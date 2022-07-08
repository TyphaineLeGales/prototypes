import WaterTexture from "./waterTex";
import canvasSketch from "canvas-sketch";

// // Ensure ThreeJS is in global scope for the 'examples/'
// global.THREE = require("three");

// // Include any additional ThreeJS examples below
// require("three/examples/js/controls/OrbitControls");

// const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: "A4",
  // Make the loop animated
  animate: true,
};

const sketch = ({ context }) => {
  const waterTex = new WaterTexture({ debug: true, context: context });

  window.addEventListener("mousemove", (e) => {
    let point = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };

    waterTex.addPoint(point);
  });

  //   // Create a renderer
  //   const renderer = new THREE.WebGLRenderer({
  //     canvas: context.canvas,
  //   });

  //   // WebGL background color
  //   renderer.setClearColor("blue", 1);

  //   // Setup a camera
  //   const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  //   camera.position.set(0, 0, -4);
  //   camera.lookAt(new THREE.Vector3());

  //   // Setup camera controller
  //   const controls = new THREE.OrbitControls(camera, context.canvas);

  //   // Setup your scene
  //   const scene = new THREE.Scene();

  //   // Setup a geometry
  //   const geometry = new THREE.SphereGeometry(1, 32, 16);

  //   // Setup a material
  //   const material = new THREE.MeshBasicMaterial({
  //     color: "red",
  //     wireframe: true,
  //   });

  //   // Setup a mesh with geometry + material
  //   const mesh = new THREE.Mesh(geometry, material);
  //   scene.add(mesh);

  // draw each frame
  return {
    // Handle resize events here
    // resize({ pixelRatio, viewportWidth, viewportHeight }) {
    //   renderer.setPixelRatio(pixelRatio);
    //   renderer.setSize(viewportWidth, viewportHeight, false);
    //   camera.aspect = viewportWidth / viewportHeight;
    //   camera.updateProjectionMatrix();
    // },
    // Update & render your scene here
    render({ time }) {
      //controls.update();
      waterTex.update();
      // renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    // unload() {
    //   controls.dispose();
    //   renderer.dispose();
    // },
  };
};

canvasSketch(sketch, settings);
