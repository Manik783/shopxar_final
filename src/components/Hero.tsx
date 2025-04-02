import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const Hero = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, gridRef.current.clientWidth / gridRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(gridRef.current.clientWidth, gridRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    gridRef.current.appendChild(renderer.domElement);

    const gridColor = new THREE.Color('#4A4A4A');
    const gridSize = 15;
    const gridDivisions = 10;

    const floorGrid = new THREE.GridHelper(gridSize, gridDivisions, gridColor, gridColor);
    floorGrid.position.y = -5;
    scene.add(floorGrid);

    const wallGrid = new THREE.GridHelper(gridSize, gridDivisions, gridColor, gridColor);
    wallGrid.position.y = -5;
    wallGrid.position.x = -gridSize/2;
    wallGrid.rotation.y = Math.PI / 2;
    scene.add(wallGrid);

    camera.position.set(0, 20, 40);
    camera.lookAt(0, 0, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!gridRef.current) return;
      const width = gridRef.current.clientWidth;
      const height = gridRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (gridRef.current) {
        gridRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen  from-[#1a1a24] to-[#121218] overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-[#1a1a24] to-[#121218] opacity-80"></div>

      <div className="container mx-auto px-4 sm:px-6 h-full py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center min-h-screen">
          {/* Left Column - Text Content */}
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Product visualizations<br />
              with 3D modeling<br />
              services
            </h1>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl">
              Infuse unparalleled realism with 3D visualization where we comprehensively 
              boast your business capabilities.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button className="bg-white text-black px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors">
                Request a sample
              </button>
              <button className="bg-green-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-green-500 transition-colors">
                Schedule now
              </button>
            </div>
          </div>

          {/* Right Column - 3D Model Viewer with Grid */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-screen w-full">
            {/* Three.js Grid Container */}
            <div ref={gridRef} className="absolute inset-0 z-0"></div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 site-gradient from-[#1a1a24] via-transparent to-transparent opacity-80 z-10"></div>
            <div className="absolute inset-0 site-gradient from-[#1a1a24] via-transparent to-transparent rotate-90 opacity-80 z-10"></div>

            {/* Model Viewer */}
            <model-viewer
              src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
              camera-controls
              auto-rotate
              rotation-per-second="30deg"
              shadow-intensity="1"
              exposure="1"
              environment-image="neutral"
              shadow-softness="1"
              camera-orbit="0deg 75deg 75%"
              min-camera-orbit="auto auto 50%"
              max-camera-orbit="auto auto 100%"
              class="w-full h-full absolute inset-0 z-20"
              style={{
                '--progress-bar-height': '0px',
                '--progress-bar-color': 'transparent',
                transform: 'scale(0.4)',
                transformOrigin: 'center center',
              }}
            ></model-viewer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;