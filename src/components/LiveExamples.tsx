import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

// Sections data
const sections = [
  {
    id: 'furniture',
    title: 'Furniture',
    items: [
      {
        id: 1,
        title: 'Astronaut',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
      },
      {
        id: 2,
        title: 'RobotExpressive',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
      },
      {
        id: 3,
        title: 'NeilArmstrong',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.usdz',
      },
      {
        id: 4,
        title: 'RobotExpressive',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
      },
    ],
  },
  {
    id: 'sofas',
    title: 'Sofas',
    items: [
     
      {
        id: 5,
        title: 'RobotExpressive',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
      },
      {
        id: 6,
        title: 'Astronaut Duplicate',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
      },
      {
        id: 7,
        title: 'RobotExpressive',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
      },
    ],
  },
  {
    id: 'beds',
    title: 'Beds',
    items: [
     
      {
        id: 8,
        title: 'Astronaut Duplicate',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
      },
      {
        id: 9,
        title: 'RobotExpressive',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',

      },
      {
        id: 10,
        title: 'RobotExpressive',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
      },
      {
        id: 11,
        title: 'Astronaut Duplicate',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
      },
      {
        id: 12,
        title: 'RobotExpressive',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',

      },
      {
        id: 13,
        title: 'Astronaut Duplicate',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
      },
      {
        id: 14,
        title: 'Astronaut Duplicate',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
      },
      
    ],
  },
];

export default function LiveExamples() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeQR, setActiveQR] = useState(null);
  const [qrCode, setQRCode] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const sectionContainerRef = useRef<HTMLDivElement>(null);

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
      script.onload = () => setModelsLoaded(true);
      document.body.appendChild(script);
    } else {
      setModelsLoaded(true);
    }
  }, []);

  const handleSwipe = (direction) => {
    if (direction === 'left' && activeSectionIndex < sections.length - 1) {
      setActiveSectionIndex(activeSectionIndex + 1);
    } else if (direction === 'right' && activeSectionIndex > 0) {
      setActiveSectionIndex(activeSectionIndex - 1);
    }
  };

  const handleDotClick = (index) => {
    setActiveSectionIndex(index);
  };

  const generateARUrl = (item) => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      model: isIOS ? item.iosSrc : item.modelSrc,
      title: item.title,
      format: isIOS ? 'usdz' : 'glb',
    });
    return `${baseUrl}/ar-view?${params.toString()}`;
  };

  const handleViewAR = async (id) => {
    const item = sections.flatMap((section) => section.items).find((item) => item.id === id);
    if (!item) return;

    if (isMobile) {
      const modelViewer = document.querySelector(`#model-${id}`);
      if (modelViewer?.activateAR) modelViewer.activateAR();
    } else {
      try {
        const arUrl = generateARUrl(item);
        const QRCode = await import('qrcode');
        const qrCodeData = await QRCode.toDataURL(arUrl, { errorCorrectionLevel: 'H', margin: 1, width: 300 });
        setQRCode(qrCodeData);
        setActiveQR(id);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    }
  };

  return (
    <section className="relative py-3 md:py-12 lg:py-16 xl:py-24 site-gradient from-[#1a1a24] to-[#121218]">
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-[5] mb-8 md:mb-6 lg:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white mb-2 md:mb-3">Live Examples</h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto">
          See our technology in action with these interactive demos
        </p>
      </div>
  
      {/* Section Slider */}
      <div className="relative">
        <div
          ref={sectionContainerRef}
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${activeSectionIndex * 100}%)` }}
        >
          {sections.map((section) => (
            <div key={section.id} className="min-w-full flex flex-col items-center px-2 sm:px-4">
              <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-white mb-3 sm:mb-4 text-center w-full">{section.title}</h3>
              <div className="flex overflow-x-auto snap-x snap-mandatory pb-9 md:justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full scrollbar-hide">
                {section.items.map((item) => (
                  <div key={item.id} className="relative w-[265px] sm:w-[290px] md:w-[320px] h-[320px] sm:h-[340px] md:h-[360px] flex-shrink-0 glass-card rounded-lg snap-center">
                    {/* Background Frosted Effect */}
                    <div className="absolute inset-0 transparent backdrop-blur-md rounded-lg -z-[1]"></div>
                    {/* Model Viewer Container */}
                    <div className="w-full h-[280px] sm:h-[240px] md:h-[265px] lg:h-[300px]">
                      {modelsLoaded ? (
                        <model-viewer
                          id={`model-${item.id}`}
                          src={item.modelSrc}
                          ios-src={item.iosSrc}
                          camera-controls
                          auto-rotate
                          ar
                          alt={`3D model of ${item.title}`}
                          style={{ width: "100%", height: "100%" }}
                        ></model-viewer>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-white text-sm">Loading...</div>
                        </div>
                      )}
                    </div>
                    {/* Title and AR Button */}
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2">
                      <h4 className="text-white text-medium sm:text-base font-semibold truncate">{item.title}</h4>
                      <button 
                        onClick={() => handleViewAR(item.id)} 
                        className="text-green-500 hover:text-green-400 text-s sm:text-sm font-medium mt-1 transition-colors"
                      >
                        View in AR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
  
        {/* Navigation Dots */}
        <div className="flex justify-center mt-2 md:mt-4">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full mx-1 ${
                index === activeSectionIndex ? "bg-green-500" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
  
        {/* Navigation Arrows */}
        {activeSectionIndex > 0 && (
          <button
            onClick={() => handleSwipe('right')}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-300/80 hover:bg-gray-300 p-1 rounded-full"
            aria-label="Previous section"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
          </button>
        )}
        {activeSectionIndex < sections.length - 1 && (
          <button
            onClick={() => handleSwipe('left')}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-300/80 hover:bg-gray-300 p-1 rounded-full"
            aria-label="Next section"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
          </button>
        )}
      </div>
  
      {/* QR Code Modal */}
      {activeQR !== null && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]"
          onClick={() => setActiveQR(null)}
        >
          <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-lg max-w-[250px] sm:max-w-sm w-full mx-4 sm:mx-auto text-center border border-gray-700">
            {qrCode && (
              <>
                <img src={qrCode} alt="QR Code" className="mx-auto max-w-full h-auto" />
                <p className="mt-2 text-xs sm:text-sm md:text-base">Scan to view in AR</p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );}