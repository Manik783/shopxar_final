import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
        title: 'Modern Chair',
        description: 'Contemporary chair with premium design',
        price: '$599',
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
    ],
  },
];

export default function LiveExamples() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
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

  const activeSection = sections[activeSectionIndex];
  const activeProduct = activeSection?.items[activeItemIndex];

  const handlePrevious = () => {
    setSlideDirection('right');
    if (activeItemIndex > 0) {
      setActiveItemIndex(activeItemIndex - 1);
    } else {
      setActiveItemIndex(activeSection.items.length - 1);
    }
  };

  const handleNext = () => {
    setSlideDirection('left');
    if (activeItemIndex < activeSection.items.length - 1) {
      setActiveItemIndex(activeItemIndex + 1);
    } else {
      setActiveItemIndex(0);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideDirection(null);
    }, 500);
    return () => clearTimeout(timer);
  }, [slideDirection]);

  const getTransformStyle = () => {
    if (!slideDirection) return {};
    return {
      transform: `translateX(${slideDirection === 'left' ? '-100%' : '100%'})`,
      transition: 'transform 500ms ease-in-out'
    };
  };

  return (
    <section className="relative py-16 site-gradient from-[#1a1a24] to-[#121218]">
      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          Live Examples
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          See our technology in action with these interactive demos
        </p>
      </div>

      {/* Category Navigation */}
      <div className="container mx-auto px-4 mb-16">
        <div className="flex justify-center gap-6">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSectionIndex(index);
                setActiveItemIndex(1);
                setSlideDirection(null);
              }}
              className={`px-6 py-2 text-lg font-medium rounded-full ${
                index === activeSectionIndex
                  ? 'border-2 border-purple-900 text-white shadow-lg shadow-purple-500/20'
                  : 'text-gray-200 hover:text-white hover:bg-purple/90'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-center gap-20">
          {/* Previous Item */}
          {modelsLoaded && (
            <div className="w-72 transition-all duration-500 hover:scale-105 cursor-pointer" onClick={handlePrevious}>
              <div className="rounded-xl p-4">
                <div style={{
                  transform: `translateX(${slideDirection === 'right' ? '100%' : '0'})`,
                  transition: 'transform 500ms ease-in-out'
                }}>
                  <model-viewer
                    src={activeSection.items[(activeItemIndex - 1 + activeSection.items.length) % activeSection.items.length].modelSrc}
                    camera-controls
                    auto-rotate
                    disable-zoom
                    interaction-prompt="none"
                    style={{ width: "100%", height: "300px" }}
                    background-color="transparent"
                  ></model-viewer>
                </div>
              </div>
            </div>
          )}

          {/* Active Item */}
          {modelsLoaded && activeProduct && (
            <div className="w-[500px] transition-all duration-500">
              <div className="flex flex-col items-center gap-8">
                <div className="w-full rounded-xl p-4">
                  <div style={{
                    transform: `translateX(${slideDirection === 'left' ? '-100%' : slideDirection === 'right' ? '100%' : '0'})`,
                    transition: 'transform 500ms ease-in-out'
                  }}>
                    <model-viewer
                      src={activeProduct.modelSrc}
                      camera-controls
                      auto-rotate
                      style={{ width: "100%", height: "450px" }}
                      background-color="transparent"
                    ></model-viewer>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedProduct(activeProduct);
                    setIsPopupOpen(true);
                  }}
                  className="w-64 border-2 border-purple-900 text-white px-8 py-4 rounded-xl 
                    transition-all duration-300 font-medium 
                    shadow-lg shadow-purple-500/20 text-lg transform hover:scale-105"
                >
                  Configure Product
                </button>
              </div>
            </div>
          )}

          {/* Next Item */}
          {modelsLoaded && (
            <div className="w-72 transition-all duration-500 hover:scale-105 cursor-pointer" onClick={handleNext}>
              <div className="rounded-xl p-4">
                <div style={{
                  transform: `translateX(${slideDirection === 'left' ? '-100%' : '0'})`,
                  transition: 'transform 500ms ease-in-out'
                }}>
                  <model-viewer
                    src={activeSection.items[(activeItemIndex + 1) % activeSection.items.length].modelSrc}
                    camera-controls
                    auto-rotate
                    disable-zoom
                    interaction-prompt="none"
                    style={{ width: "100%", height: "300px" }}
                    background-color="transparent"
                  ></model-viewer>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 
            bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all duration-300
            shadow-lg hover:shadow-xl"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 
            bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all duration-300
            shadow-lg hover:shadow-xl"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>

      {/* Product Popup */}
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