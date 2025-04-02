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

  return (
    <section className="bg-[#181819]">
      <div className="text-left px-20 py-12">
        <div className="flex flex-col items-start">
          <h2 className="text-[#677870] text-8xl font-bold leading-none">
            Live
          </h2>
          <h2 className="text-white text-8xl font-bold  leading-none">
            Examples.
          </h2>
        </div>
        <p className="text-[#fff4e2] text-lg font-medium mt-4">
          See our technology in action with these interactive demos
        </p>

        {/* Category Navigation */}
        <div className=" max-w-xs rounded-full bg-[#2A2A2C] py-2 mx-auto px-4 mb-16">
          <div className="flex justify-center gap-4">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSectionIndex(index);
                  setActiveItemIndex(1);
                }}
                className={`px-6 py-3 text-base font-bold rounded-full
                  ${index === activeSectionIndex
                    ? 'bg-[#677870] text-white scale-105'
                    : 'bg-transparent text-white hover:bg-[#677870]'
                  } transition-all duration-300 ease-in-out transform`}
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
              <div 
                className="w-72 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setActiveItemIndex((activeItemIndex - 1 + activeSection.items.length) % activeSection.items.length)}
              >
                <div className="rounded-xl p-4">
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
            )}

            {/* Active Item */}
            {modelsLoaded && activeProduct && (
              <div className="w-[500px]">
                <div className="flex flex-col items-center gap-8">
                  <div className="w-full rounded-xl p-4">
                    <model-viewer
                      src={activeProduct.modelSrc}
                      camera-controls
                      auto-rotate
                      style={{ width: "100%", height: "450px" }}
                      background-color="transparent"
                    ></model-viewer>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedProduct(activeProduct);
                      setIsPopupOpen(true);
                    }}
                    className="w-64 bg-[#2A2A2C] text-white hover:bg-[#677870] px-8 py-4 rounded-xl 
                      transition-all duration-300 font-medium hover:scale-105"
                  >
                    Configure Product
                  </button>
                </div>
              </div>
            )}

            {/* Next Item */}
            {modelsLoaded && (
              <div 
                className="w-72 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setActiveItemIndex((activeItemIndex + 1) % activeSection.items.length)}
              >
                <div className="rounded-xl p-4">
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
            )}
          </div>
        </div>
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