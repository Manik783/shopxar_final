import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Html, 
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';

// Simple drawer model with basic geometries
const DrawerModel = ({ materials, selectedSize, showDimensions, isDarkMode }) => {
  const group = useRef();
  
  // Get dimensions based on size
  const getSizeDimensions = () => {
    switch(selectedSize) {
      case 'single-drawer':
        return { width: 1.5, height: 1.8, depth: 1 };
      case 'three-drawer':
        return { width: 1.5, height: 2.5, depth: 1 };
      case 'chest':
        return { width: 2.5, height: 1.8, depth: 1 };
      case 'single-wardrobe':
        return { width: 1.5, height: 5, depth: 1.5 };
      case 'double-wardrobe':
        return { width: 3, height: 5, depth: 1.5 };
      default:
        return { width: 1.5, height: 1.8, depth: 1 };
    }
  };

  const dimensions = getSizeDimensions();
  
  // Create detailed dimension lines and labels
  const createDimensionLines = () => {
    if (!showDimensions) return null;
    
    const textColor = isDarkMode ? '#FFFFFF' : '#000000';
    const lineColor = isDarkMode ? new THREE.Color('#FFFFFF') : new THREE.Color('#000000');
    const lineThickness = 0.01;
    
    // Format dimensions for display
    const formatDimension = (val) => `${(val * 100).toFixed(0)} cm`;
    
    return (
      <group>
        {/* Width dimension line */}
        <group position={[0, -dimensions.height/2 - 0.3, 0]}>
          {/* Main line */}
          <mesh>
            <boxGeometry args={[dimensions.width, lineThickness, lineThickness]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
          
          {/* Dimension endpoints with arrows */}
          <group position={[-dimensions.width/2, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI/4]}>
              <boxGeometry args={[0.1, lineThickness, lineThickness]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI/4]}>
              <boxGeometry args={[0.1, lineThickness, lineThickness]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
          </group>
          
          <group position={[dimensions.width/2, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI/4]}>
              <boxGeometry args={[0.1, lineThickness, lineThickness]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI/4]}>
              <boxGeometry args={[0.1, lineThickness, lineThickness]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
          </group>
          
          {/* Width label */}
          <Html position={[0, -0.15, 0]} center>
            <div style={{ 
              backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255, 244, 226, 0.8)', 
              padding: '3px 6px', 
              borderRadius: '4px', 
              fontFamily: 'Arial', 
              fontSize: '11px',
              fontWeight: 'bold',
              color: textColor,
              border: `1px solid ${textColor}`
            }}>
              {formatDimension(dimensions.width)}
            </div>
          </Html>
        </group>
        
        {/* Height dimension line */}
        <group position={[-dimensions.width/2 - 0.3, 0, 0]}>
          {/* Main line */}
          <mesh>
            <boxGeometry args={[lineThickness, dimensions.height, lineThickness]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
          
          {/* Dimension endpoints with arrows */}
          <group position={[0, -dimensions.height/2, 0]}>
            <mesh rotation={[0, 0, Math.PI/4]}>
              <boxGeometry args={[0.1, lineThickness, lineThickness]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI/4]}>
              <boxGeometry args={[0.1, lineThickness, lineThickness]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
          </group>
          
          <group position={[0, dimensions.height/2, 0]}>
            <mesh rotation={[0, 0, Math.PI/4]}>
              <boxGeometry args={[0.1, lineThickness, lineThickness]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI/4]}>
              <boxGeometry args={[0.1, lineThickness, lineThickness]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
          </group>
          
          {/* Height label */}
          <Html position={[-0.15, 0, 0]} center>
            <div style={{ 
              backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', 
              padding: '3px 6px', 
              borderRadius: '4px', 
              fontFamily: 'Arial', 
              fontSize: '11px',
              fontWeight: 'bold',
              color: textColor,
              border: `1px solid ${textColor}`,
              transform: 'rotate(-90deg)'
            }}>
              {formatDimension(dimensions.height)}
            </div>
          </Html>
        </group>
        
        {/* FIXED Depth dimension line - corrected positioning */}
        <group position={[dimensions.width/2 + 0.1, dimensions.height/2, dimensions.depth/2]}>
          {/* Main line */}
          <mesh position={[0, 0, -dimensions.depth/2]}>
            <boxGeometry args={[lineThickness, lineThickness, dimensions.depth]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
          
          {/* Dimension endpoints with arrows */}
          <group position={[0, 0, 0]}>
            <mesh rotation={[Math.PI/4, 0, 0]}>
              <boxGeometry args={[lineThickness, 0.1, lineThickness]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
            <mesh rotation={[-Math.PI/4, 0, 0]}>
              <boxGeometry args={[lineThickness, 0.1, lineThickness]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
          </group>
          
          <group position={[0, 0, -dimensions.depth]}>
            <mesh rotation={[Math.PI/4, 0, 0]}>
              <boxGeometry args={[lineThickness, 0.1, lineThickness]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
            <mesh rotation={[-Math.PI/4, 0, 0]}>
              <boxGeometry args={[lineThickness, 0.1, lineThickness]} />
              <meshBasicMaterial color={lineColor} />
            </mesh>
          </group>
          
          {/* Depth label */}
          <Html position={[0.15, 0, -dimensions.depth/2]} center>
            <div style={{ 
              backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', 
              padding: '3px 6px', 
              borderRadius: '4px', 
              fontFamily: 'Arial', 
              fontSize: '11px',
              fontWeight: 'bold',
              color: textColor,
              border: `1px solid ${textColor}`
            }}>
              {formatDimension(dimensions.depth)}
            </div>
          </Html>
        </group>
      </group>
    );
  };
  
  return (
    <group 
      ref={group} 
      position={[0, 0, 0]} 
      rotation={[0, Math.PI / 6, 0]} 
      scale={0.9}
    >
      {/* Main cabinet body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth]} />
        <meshStandardMaterial 
          color={materials.wood.color}
          roughness={0.65}
          metalness={0.15}
        />
      </mesh>
      
      {/* Cabinet base */}
      <mesh castShadow receiveShadow position={[0, -dimensions.height/2 + 0.05, 0]}>
        <boxGeometry args={[dimensions.width + 0.1, 0.1, dimensions.depth + 0.05]} />
        <meshStandardMaterial 
          color={materials.wood.color}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Drawer */}
      <mesh castShadow receiveShadow position={[0, 0.6, 0.05]}>
        <boxGeometry args={[dimensions.width-0.1, 0.3, dimensions.depth-0.1]} />
        <meshStandardMaterial 
          color={materials.wood.color}
          roughness={0.6}
          metalness={0.15}
        />
      </mesh>
      
      {/* Door */}
      <mesh castShadow receiveShadow position={[0, -0.3, 0.05]}>
        <boxGeometry args={[dimensions.width-0.1, 1, dimensions.depth-0.1]} />
        <meshStandardMaterial 
          color={materials.wood.color}
          roughness={0.6}
          metalness={0.15}
        />
      </mesh>
      
      {/* Drawer handle */}
      <mesh castShadow receiveShadow position={[0, 0.6, 0.55]}>
        <boxGeometry args={[0.4, 0.05, 0.05]} />
        <meshStandardMaterial 
          color={isDarkMode ? "#444444" : "#333333"} 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>

      {/* Show detailed dimensions or simple label based on state */}
      {createDimensionLines()}
    </group>
  );
};

// Simplified camera controller with basic functionality
const CameraController = ({ zoomLevel, setOrbitRef }) => {
  const orbitRef = useRef();
  const { camera } = useThree();
  
  useEffect(() => {
    if (orbitRef.current) {
      setOrbitRef(orbitRef.current);
      orbitRef.current.target.set(0, 0, 0);
    }
  }, [orbitRef, setOrbitRef]);
  
  useEffect(() => {
    // Apply zoom level with direct camera position
    camera.position.z = 5 - (zoomLevel * 0.3);
  }, [zoomLevel, camera]);
  
  return (
    <OrbitControls 
      ref={orbitRef}
      enablePan={false}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2}
      minDistance={2}
      maxDistance={10}
      enableDamping={true}
      dampingFactor={0.1}
      rotateSpeed={0.7}
      zoomSpeed={0.8}
    />
  );
};

// Simplified error boundary component
const ThreeJSErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="font-medium text-xl text-gray-700">3D viewer could not be loaded</p>
        <p className="mt-2 text-gray-500">Please try a different browser or device</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white transition-colors"
        >
          Reload Page
        </button>
      </div>
    );
  }
  
  return children;
};

// Basic loading fallback
const Fallback = () => (
  <div className="flex items-center justify-center h-full w-full bg-gray-100">
    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-800"></div>
  </div>
);

const ProductConfigurator = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showDimensions, setShowDimensions] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0); // 0 to 10 scale
  const [selectedSize, setSelectedSize] = useState('single-drawer');
  const [orbitRef, setOrbitRef] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  
  const viewerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Wood finish options
  const woodFinishOptions = [
    { id: 'bitmoreFinish', name: 'Bitmore', color: '#8B4513' },
    { id: 'oakFinish', name: 'Oak', color: '#D2B48C' },
    { id: 'cherryFinish', name: 'Cherry', color: '#800000' },
  ];

  // Materials state
  const [materials, setMaterials] = useState({
    wood: { color: woodFinishOptions[0].color },
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  // Toggle dimensions display
  const toggleDimensions = () => {
    setShowDimensions(prev => !prev);
  };
  
  // Zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 10));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 0));
  };
  
  // Reset camera position
  const resetView = () => {
    if (orbitRef) {
      orbitRef.reset();
      setZoomLevel(0);
    }
  };

  // Change wood finish
  const changeWoodFinish = (colorHex) => {
    setMaterials({
      ...materials,
      wood: { color: colorHex }
    });
  };
  
  // Simulate model loading with very short timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModelLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Take screenshot of the 3D model - simplified approach
  const takeScreenshot = () => {
    try {
      // Set capturing state
      setIsCapturing(true);
      
      // Find canvas
      const canvas = document.querySelector('canvas');
      if (!canvas) {
        alert('Could not find canvas element');
        setIsCapturing(false);
        return;
      }
      
      // Create link element
      const link = document.createElement('a');
      link.download = `3d-furniture-${selectedSize}-${Date.now()}.png`;
      
      // Set timeout to ensure UI is hidden first
      setTimeout(() => {
        // Get the data URL directly from the canvas
        try {
          link.href = canvas.toDataURL('image/png');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (err) {
          alert('Failed to capture screenshot. Please try again.');
          console.error('Screenshot error:', err);
        }
        
        // Reset state
        setTimeout(() => setIsCapturing(false), 300);
      }, 200);
    } catch (error) {
      alert('Screenshot failed. Please try again.');
      console.error('Screenshot error:', error);
      setIsCapturing(false);
    }
  };

  return (
    <div className="h-full bg-[#fff4e2]" ref={viewerRef}>
      <div className="h-full relative">
        <div className="h-full relative">
          <ThreeJSErrorBoundary>
            {!isModelLoaded ? (
              <Fallback />
            ) : (
              <Canvas 
                ref={canvasRef}
                shadows 
                gl={{ 
                  antialias: true,
                  preserveDrawingBuffer: true
                }}
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ height: '100%' }}
              >
                <Suspense fallback={null}>
                  <color attach="background" args={[isDarkMode ? '#000000' : '#f9fafb']} />
                  
                  <ambientLight intensity={0.5} />
                  <spotLight 
                    position={[10, 10, 10]} 
                    angle={0.15} 
                    penumbra={1} 
                    intensity={0.8} 
                    castShadow 
                  />
                  
                  <DrawerModel 
                    materials={materials} 
                    selectedSize={selectedSize}
                    showDimensions={showDimensions}
                    isDarkMode={isDarkMode}
                  />
                  
                  <ContactShadows
                    position={[0, -1.5, 0]}
                    opacity={0.3}
                    width={10}
                    height={10}
                    blur={2}
                    far={1.5}
                  />
                  
                  <Environment preset="sunset" />
                  <CameraController zoomLevel={zoomLevel} setOrbitRef={setOrbitRef} />
                </Suspense>
              </Canvas>
            )}
          </ThreeJSErrorBoundary>
          
          {!isCapturing && (
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-3">
              <button 
                className={`w-10 h-10 flex items-center justify-center rounded-md shadow-md bg-white text-gray-800 hover:bg-gray-100 focus:outline-none border ${isDarkMode ? 'border-blue-500' : 'border-gray-200'}`}
                onClick={toggleDarkMode}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                ): (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) }
              </button>
              
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-md shadow-md bg-white text-gray-800 hover:bg-gray-100 focus:outline-none border border-gray-200"
                onClick={handleZoomIn}
                title="Zoom In"
                disabled={zoomLevel >= 10}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
              
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-md shadow-md bg-white text-gray-800 hover:bg-gray-100 focus:outline-none border border-gray-200"
                onClick={handleZoomOut}
                title="Zoom Out"
                disabled={zoomLevel <= 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
              
              <button 
                className={`w-10 h-10 flex items-center justify-center rounded-md shadow-md bg-white text-gray-800 hover:bg-gray-100 focus:outline-none border ${showDimensions ? 'border-blue-500' : 'border-gray-200'}`}
                onClick={toggleDimensions}
                title="Show Dimensions"
              >
                <div className="utils-item" style={{ display: "flex" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 2H3C2.4 2 2 2.4 2 3V21C2 21.6 2.4 22 3 22H21C21.6 22 22 21.6 22 21V3C22 2.4 21.6 2 21 2ZM20 20H4V4H20V20Z" fill="currentColor"/>
                    <path d="M19 9H5V7H19V9ZM19 13H5V11H19V13ZM19 17H5V15H19V17Z" fill="currentColor"/>
                  </svg>
                </div>
              </button>
              
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-md shadow-md bg-white text-gray-800 hover:bg-gray-100 focus:outline-none border border-gray-200"
                onClick={takeScreenshot}
                title="Take Screenshot"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </button>
              
              {/* Fullscreen button */}
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-md shadow-md bg-white text-gray-800 hover:bg-gray-100 focus:outline-none border border-gray-200"
                onClick={() => {
                  if (viewerRef.current && !document.fullscreenElement) {
                    viewerRef.current.requestFullscreen();
                  } else if (document.fullscreenElement) {
                    document.exitFullscreen();
                  }
                }}
                title="Fullscreen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </button>
            </div>
          )}
          
          {!isCapturing && (
            <div className="absolute left-6 bottom-6">
              <button
                className="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-200 border border-gray-200"
                onClick={() => alert('AR functionality would launch here')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                View in your room
              </button>
            </div>
          )}
          
          {isCapturing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-4 flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                <p className="text-sm font-medium">Capturing Screenshot...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductConfigurator; 