import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductPopup from './ProductPopup';
import { Product } from '../types';

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
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
      },
      {
        id: 2,
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
      },
      {
        id: 3,
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.usdz',
      },
      {
        id: 4,
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
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
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
      },
      {
        id: 6,
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
      },
      {
        id: 7,
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
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
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
      },
      {
        id: 9,
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',

      },
      {
        id: 10,
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
      },
      {
        id: 11,
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
      },
      {
        id: 12,
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',

      },
      {
        id: 13,
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
      },
      {
        id: 14,
        title: 'Modern Sofa',
        description: 'Contemporary 3-seater sofa with premium upholstery',
        price: '$1,299',
        modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
      },
      
    ],
  },
];

export default function LiveExamples() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeQR, setActiveQR] = useState<number | null>(null);
  const [qrCode, setQRCode] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && activeSectionIndex < sections.length - 1) {
      setActiveSectionIndex(activeSectionIndex + 1);
    } else if (direction === 'right' && activeSectionIndex > 0) {
      setActiveSectionIndex(activeSectionIndex - 1);
    }
  };

  const handleDotClick = (index: number) => {
    setActiveSectionIndex(index);
  };

  const generateARUrl = (item: Product) => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      model: isIOS ? item.iosSrc : item.modelSrc,
      title: item.title,
      format: isIOS ? 'usdz' : 'glb',
    });
    return `${baseUrl}/ar-view?${params.toString()}`;
  };

  const handleViewAR = async (id: number) => {
    const item = sections.flatMap((section) => section.items).find((item) => item.id === id);
    if (!item) return;

    if (isMobile) {
      const modelViewer = document.querySelector(`#model-${id}`) as any;
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

  const handleProductClick = (item: Product) => {
    // Add a small delay to prevent immediate popup opening on model rotation
    const timeoutId = setTimeout(() => {
      setSelectedProduct(item);
      setIsPopupOpen(true);
      // Remove the body scroll lock since we want scrolling in the popup
      // document.body.style.overflow = 'hidden';
    }, 200); // 200ms delay

    // Store the timeout ID to clear it if needed
    return () => clearTimeout(timeoutId);
  };

  return (
    <section className="relative py-3 md:py-12 lg:py-16 xl:py-24 site-gradient from-[#1a1a24] to-[#121218]">
      <div className="container mx-auto px-2 sm:px-6 text-center relative z-[5] mb-4 md:mb-6 lg:mb-8">
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white mb-2 md:mb-3">Live Examples</h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto px-2">
          See our technology in action with these interactive demos
        </p>
      </div>
  
      {/* Category Buttons */}
      <div className="flex justify-center gap-4 mb-6 md:mb-8">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => handleDotClick(index)}
            className={`px-4 py-2 text-sm md:text-base font-medium transition-colors ${
              index === activeSectionIndex
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>
  
      {/* Section Slider */}
      <div className="relative">
        <div
          ref={sectionContainerRef}
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${activeSectionIndex * 100}%)` }}
        >
          {sections.map((section) => (
            <div key={section.id} className="min-w-full flex flex-col items-center px-1 sm:px-4">
              <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 md:pb-9 md:justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 w-full scrollbar-hide">
                {section.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="relative w-[240px] sm:w-[290px] md:w-[320px] h-[400px] sm:h-[440px] md:h-[460px] flex-shrink-0 glass-card rounded-lg snap-center cursor-pointer"
                    onClick={() => handleProductClick(item)}
                  >
                    {/* Background Frosted Effect */}
                    <div className="absolute inset-0 transparent backdrop-blur-md rounded-lg -z-[1]"></div>
                    {/* Model Viewer Container */}
                    <div className="w-full h-[220px] sm:h-[240px] md:h-[265px] lg:h-[300px]">
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
                    {/* Product Info */}
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2">
                      <h4 className="text-white text-sm sm:text-base font-semibold">{item.title}</h4>
                      <p className="text-gray-300 text-xs sm:text-sm mt-1 line-clamp-2">{item.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-white text-sm sm:text-base font-medium">{item.price}</span>
                        <button 
                          onClick={() => handleViewAR(item.id)} 
                          className="text-green-500 hover:text-green-400 text-xs sm:text-sm font-medium transition-colors"
                        >
                          View in AR
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
  
        {/* Navigation Arrows */}
        {activeSectionIndex > 0 && (
          <button
            onClick={() => handleSwipe('right')}
            className="absolute left-0 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-300/80 hover:bg-gray-300 p-1 rounded-full"
            aria-label="Previous section"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
          </button>
        )}
        {activeSectionIndex < sections.length - 1 && (
          <button
            onClick={() => handleSwipe('left')}
            className="absolute right-0 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-300/80 hover:bg-gray-300 p-1 rounded-full"
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
          <div className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-lg max-w-[200px] sm:max-w-sm w-full mx-2 sm:mx-auto text-center border border-gray-700">
            {qrCode && (
              <>
                <img src={qrCode} alt="QR Code" className="mx-auto max-w-full h-auto" />
                <p className="mt-2 text-xs sm:text-sm md:text-base">Scan to view in AR</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Add the ProductPopup */}
      {selectedProduct && (
        <ProductPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          product={selectedProduct}
        />
      )}
    </section>
  );
}