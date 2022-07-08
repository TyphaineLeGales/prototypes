import WaterTexture from "./waterTex";
import canvasSketch from "canvas-sketch";
// import waterEffectShader from "./waterEffectShader";

// // Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// // Include any additional ThreeJS examples below
// require("three/examples/js/controls/OrbitControls");
require("three/examples/js/shaders/CopyShader.js");
require("three/examples/js/postprocessing/Pass.js");
require("three/examples/js/postprocessing/ShaderPass.js");
require("three/examples/js/postprocessing/EffectComposer.js");
require("three/examples/js/postprocessing/RenderPass.js");
require("./waterEffectShader.js");

const settings = {
  dimensions: "A4",
  // Make the loop animated
  animate: true,
  context: "webgl",
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ context: context });

  // WebGL background color
  renderer.setClearColor("blue", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 30);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  //const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();
  let geometry = new THREE.PlaneBufferGeometry(5, 5, 1, 1);
  let material = new THREE.MeshNormalMaterial();
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //ripple logic
  const waterTex = new WaterTexture({ debug: true, context: context });
  window.addEventListener("mousemove", (e) => {
    let point = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };

    waterTex.addPoint(point);
  });

  const composer = new THREE.EffectComposer(renderer);
  // //const clock = new THREE.Clock();

  const renderPass = new THREE.RenderPass(scene, camera);
  composer.addPass(renderPass);

  // renderPass.renderToScreen = true;

  const ripplePass = new THREE.ShaderPass(THREE.WaterShader);
  composer.addPass(ripplePass);
  // ripplePass.renderToScreen = false;

  // draw each frame by returning the renderer function
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      //controls.update();
      waterTex.update();
      //renderer.render(scene, camera);
      composer.render();
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
