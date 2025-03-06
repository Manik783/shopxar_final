import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const examples = [
  {
    id: 1,
    title: 'Astronaut',
    modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
    size: 'w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]',
  },
  {
    id: 2,
    title: 'RobotExpressive',
    modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
    iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
    size: 'w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]',
  },
  {
    id: 3,
    title: 'NeilArmstrong',
    modelSrc: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
    iosSrc: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.usdz',
    size: 'w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]',
  },
  {
    id: 4,
    title: 'Astronaut Duplicate',
    modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
    size: 'w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]',
  },
];

export default function LiveExamples() {
  const [activeQR, setActiveQR] = useState(null);
  const [qrCode, setQRCode] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isModelInteracting, setIsModelInteracting] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const ua = navigator.userAgent;
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(ua));
      setIsIOS(/iPhone|iPad|iPod/i.test(ua));
    };
    checkMobile();

    // Load model-viewer script if not already loaded
    if (!document.querySelector('script[src*="model-viewer.min.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      script.type = 'module';
      script.onload = () => {
        setModelsLoaded(true);
        
        // Add event listeners to model-viewers after they're loaded
        setTimeout(() => {
          const modelViewers = document.querySelectorAll('model-viewer');
          modelViewers.forEach(viewer => {
            viewer.addEventListener('mousedown', () => {
              setIsModelInteracting(true);
              // Prevent slider from moving when interacting with model
              if (scrollContainerRef.current) {
                scrollContainerRef.current.style.pointerEvents = 'none';
              }
            });
            
            viewer.addEventListener('touchstart', () => {
              setIsModelInteracting(true);
              // Prevent slider from moving when interacting with model
              if (scrollContainerRef.current) {
                scrollContainerRef.current.style.pointerEvents = 'none';
              }
            });
            
            // Add global event listeners to detect when user stops interacting
            document.addEventListener('mouseup', () => {
              if (isModelInteracting) {
                setIsModelInteracting(false);
                // Re-enable slider movement
                if (scrollContainerRef.current) {
                  setTimeout(() => {
                    scrollContainerRef.current.style.pointerEvents = 'auto';
                  }, 100);
                }
              }
            });
            
            document.addEventListener('touchend', () => {
              if (isModelInteracting) {
                setIsModelInteracting(false);
                // Re-enable slider movement
                if (scrollContainerRef.current) {
                  setTimeout(() => {
                    scrollContainerRef.current.style.pointerEvents = 'auto';
                  }, 100);
                }
              }
            });
          });
        }, 1000);
      };
      document.body.appendChild(script);
    } else {
      setModelsLoaded(true);
    }

    // Initialize scroll position check
    if (scrollContainerRef.current) {
      handleScroll();
    }
    
    // Cleanup event listeners
    return () => {
      document.removeEventListener('mouseup', () => {});
      document.removeEventListener('touchend', () => {});
    };
  }, [isModelInteracting]);

  const generateARUrl = (example) => {
    // Create a URL that includes device-specific parameters
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      model: isIOS ? example.iosSrc : example.modelSrc,
      title: example.title,
      format: isIOS ? 'usdz' : 'glb',
    });
    return `${baseUrl}/ar-view?${params.toString()}`;
  };

  const handleViewAR = async (id) => {
    const example = examples.find((e) => e.id === id);
    if (!example) return;

    if (isMobile) {
      // On mobile, directly activate AR view
      const modelViewer = document.querySelector(`#model-${id}`);
      if (modelViewer?.activateAR) {
        modelViewer.activateAR();
      }
    } else {
      // On desktop, show QR code
      try {
        const arUrl = generateARUrl(example);
        const QRCode = await import('qrcode');
        const qrCodeData = await QRCode.toDataURL(arUrl, {
          errorCorrectionLevel: 'H',
          margin: 1,
          width: 300,
        });
        setQRCode(qrCodeData);
        setActiveQR(id);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    }
  };

  const closeQRModal = () => {
    setActiveQR(null);
    setQRCode('');
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current && !isModelInteracting) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -container.clientWidth / 1.5 : container.clientWidth / 1.5;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Mouse drag scrolling for smoother control
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current || isModelInteracting) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    if (!isModelInteracting) {
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    if (!isModelInteracting) {
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current || isModelInteracting) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    if (!scrollContainerRef.current || isModelInteracting) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !scrollContainerRef.current || isModelInteracting) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="relative py-16 md:py-24 site-gradient overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-[5] mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 relative">
          Live Examples
        </h2>
        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto relative">
          See our technology in action with these interactive demos
        </p>
      </div>

      {/* Full-width container for the slider */}
      <div className="relative w-full">
        {/* Navigation Buttons */}
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all"
            aria-label="Scroll left"
            disabled={isModelInteracting}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}
        
        {showRightArrow && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all"
            aria-label="Scroll right"
            disabled={isModelInteracting}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}

        {/* Scrollable Container - Full Width */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-10 lg:gap-12 overflow-x-auto pb-12 pt-6 px-4 md:px-12 scrollbar-hide snap-x snap-mandatory w-full"
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          {/* Add padding element at start for better spacing */}
          <div className="flex-shrink-0 w-[5vw] md:w-[10vw]"></div>
          
          {examples.map((example) => (
            <div
              key={example.id}
              className={`relative flex-shrink-0 ${example.size} snap-center flex items-center justify-center`}
            >
              {/* Bubble Background */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  backgroundImage:
                    "url('https://dcfvgbhj.netlify.app/%E2%80%94Pngtree%E2%80%94round%20transparent%20glass_4513490.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 1
                }}
              />

              {/* Model Viewer */}
              <div className="relative w-[85%] h-[85%] scale-[0.7] transition-transform duration-300 hover:scale-[0.75] flex items-center justify-center" style={{ zIndex: 2 }}>
                {modelsLoaded ? (
                  <model-viewer
                    id={`model-${example.id}`}
                    src={example.modelSrc}
                    ios-src={example.iosSrc}
                    camera-controls
                    auto-rotate
                    rotation-per-second="30deg"
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    touch-action="pan-y"
                    interaction-prompt="none"
                    alt={`3D model of ${example.title}`}
                    camera-orbit="0deg 75deg 105%"
                    min-camera-orbit="auto auto 50%"
                    max-camera-orbit="auto auto 200%"
                    interpolation-decay="200"
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "grab",
                      position: "relative",
                      zIndex: 2,
                      "--poster-color": "transparent",
                    }}
                    environment-image="neutral"
                    exposure="1"
                    shadow-intensity="1"
                  ></model-viewer>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-t-[#4CAF50] border-gray-200/20 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {/* Example Title and AR Link */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center z-10 w-full px-4">
                <h3 className="text-sm md:text-base font-medium text-white">
                  {example.title}
                </h3>
                <button
                  onClick={() => handleViewAR(example.id)}
                  className="inline-flex items-center text-[#4CAF50] hover:text-[#45a049] font-medium text-sm md:text-base mt-2"
                >
                  View in AR <ExternalLink className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          {/* Add padding element at end for better spacing */}
          <div className="flex-shrink-0 w-[5vw] md:w-[10vw]"></div>
        </div>
      </div>

      {/* QR Code Modal */}
      {activeQR !== null && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={closeQRModal}
        >
          <div 
            className="bg-[#1a1a24] p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 text-center border border-gray-700" 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Scan to View in AR</h3>
              <button 
                onClick={closeQRModal}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {qrCode && (
              <div className="text-center">
                <img src={qrCode} alt="QR Code" className="mx-auto mb-4 w-[250px] h-[250px]" />
                <p className="text-gray-300 mb-2">
                  Scan this QR code with your mobile device to view the 3D model in AR
                </p>
                <p className="text-sm text-gray-400">
                  Supports both iOS (USDZ) and Android (GLB) devices
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
