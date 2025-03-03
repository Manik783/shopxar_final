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
    size: 'w-[260px] h-[260px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px]'
  },
  {
    id: 2,
    title: 'RobotExpressive',
    modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
    iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
    size: 'w-[260px] h-[260px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px]'
  },
  {
    id: 3,
    title: 'NeilArmstrong',
    modelSrc: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
    iosSrc: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.usdz',
    size: 'w-[260px] h-[260px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px]'
  },
  {
    id: 4,
    title: 'Astronaut',
    modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
    size: 'w-[260px] h-[260px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px]'
  },
];

export default function LiveExamples() {
  const [activeQR, setActiveQR] = useState<number | null>(null);
  const [qrCode, setQRCode] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const ua = navigator.userAgent;
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(ua));
      setIsIOS(/iPhone|iPad|iPod/i.test(ua));
    };

    checkMobile();
  }, []);

  const generateARUrl = (example: typeof examples[0]) => {
    // Create a URL that includes device-specific parameters
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      model: isIOS ? example.iosSrc : example.modelSrc,
      title: example.title,
      format: isIOS ? 'usdz' : 'glb',
    });
    return `${baseUrl}/ar-view?${params.toString()}`;
  };

  const handleViewAR = async (id: number) => {
    const example = examples.find(e => e.id === id);
    if (!example) return;

    if (isMobile) {
      // On mobile, directly activate AR view
      const modelViewer = document.querySelector(`#model-${id}`) as any;
      if (modelViewer?.activateAR) {
        modelViewer.activateAR();
      }
    } else {
      // On desktop, show QR code
      try {
        const arUrl = generateARUrl(example);
        // Using dynamic import for QRCode to avoid SSR issues
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
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-16 md:py-24 site-gradient">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Live Examples</h2>
        <p className="text-gray-300 mb-12">See our technology in action with these interactive demos</p>
        
        <div className="relative">
          {/* Navigation Buttons */}
          {showLeftArrow && (
            <button 
              onClick={() => scroll('left')}
              className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          
          {showRightArrow && (
            <button 
              onClick={() => scroll('right')}
              className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 md:gap-8 py-6 px-2"
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {examples.map((example) => (
              <div 
                key={example.id}
                className="bubble-container flex-none snap-center"
                style={{ width: 'auto' }}
              >
                <div className="bubble-wrapper">
                  <div 
                    className="bubble-background absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center pointer-events-none"
                    style={{
                      backgroundImage: 'url(https://dcfvgbhj.netlify.app/%E2%80%94Pngtree%E2%80%94round%20transparent%20glass_4513490.png)',
                      zIndex: 1
                    }}
                  />
                  <div className={`relative ${example.size} scale-[0.85] transition-transform duration-300 hover:scale-[0.9]`}>
                    <model-viewer
                      id={`model-${example.id}`}
                      src={example.modelSrc}
                      ios-src={example.iosSrc}
                      ar
                      ar-modes="webxr scene-viewer quick-look"
                      camera-controls
                      auto-rotate
                      touch-action="pan-y"
                      interaction-prompt="none"
                      alt={`A 3D model of ${example.title}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        cursor: 'grab'
                      }}
                      environment-image="neutral"
                      exposure="1"
                      shadow-intensity="1"
                    ></model-viewer>
                  </div>
                  <div className="absolute bottom-4 left-4 z-10">
                    <h3 className="text-sm md:text-base font-medium text-white mb-2">{example.title}</h3>
                    <button 
                      onClick={() => handleViewAR(example.id)}
                      className="inline-flex items-center text-[#4CAF50] hover:text-[#45a049] font-medium text-sm md:text-base"
                    >
                      View in AR <ExternalLink className="ml-1 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {activeQR !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeQRModal}
        >
          <div 
            className="bg-[#1a1a24] rounded-lg p-6 max-w-md w-full mx-4" 
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
                <img src={qrCode} alt="QR Code" className="mx-auto mb-4 w-[300px] h-[300px]" />
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
    </div>
  );
}