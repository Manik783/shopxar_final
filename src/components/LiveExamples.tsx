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
// ... (imports remain unchanged)

const sections = [
  {
    id: 'furniture',
    title: 'Furniture',
    items: [
      {
        id: 1,
        title: 'Modern Shelf',
        description: 'Contemporary wooden display shelf',
        price: '$599',
        modelSrc: 'https://cdn.shopify.com/3d/models/4c942424574a04ff/asset_1.glb',
        iosSrc: '',
      },
      {
        id: 2,
        title: 'Premium Chair',
        description: 'Ergonomic designer chair',
        price: '$899',
        modelSrc: 'https://cdn.shopify.com/3d/models/abeac6240e09f6f9/asset5.glb',
        iosSrc: '',
      },
      {
        id: 3,
        title: 'Coffee Table',
        description: 'Modern coffee table with storage',
        price: '$449',
        modelSrc: 'https://cdn.shopify.com/3d/models/bccb7c4ea5f43e89/asset4.glb',
        iosSrc: '',
      },
      {
        id: 4,
        title: 'Side Table',
        description: 'Contemporary side table with unique design',
        price: '$349',
        modelSrc: 'https://cdn.shopify.com/3d/models/7e09be251577599b/asser3.glb',
        iosSrc: '',
      },
      {
        id: 14,
        title: 'Bathtub',
        description: 'Modern freestanding bathtub for luxury bathrooms',
        price: '$1,199',
        modelSrc: 'https://cdn.shopify.com/3d/models/05859137728b24c9/bathtub.glb',
        iosSrc: '',
      },
      {
        id: 15,
        title: 'Antique Desk',
        description: 'Classic wooden antique writing desk',
        price: '$1,499',
        modelSrc: 'https://cdn.shopify.com/3d/models/3dba34d4261bb9a3/antique_desk.glb',
        iosSrc: '',
      },
      {
        id: 16,
        title: 'Pub Counter',
        description: 'Industrial style pub counter with rustic finish',
        price: '$1,899',
        modelSrc: 'https://cdn.shopify.com/3d/models/bb19bd814b72f706/pub_counter.glb',
        iosSrc: '',
      },
      {
        id: 17,
        title: 'Modern Sofa',
        description: 'Sleek modern sofa for contemporary living rooms',
        price: '$1,299',
        modelSrc: 'https://cdn.shopify.com/3d/models/34d54a818d8632ea/modern_sofa.glb',
        iosSrc: '',
      },
    ],
  },
  {
    id: 'sofas',
    title: 'Accessories',
    items: [
      {
        id: 5,
        title: 'Lounge Chair',
        description: 'Comfortable premium lounge chair',
        price: '$599',
        modelSrc: 'https://cdn.shopify.com/3d/models/cb0a6957ae2c5922/asset.glb',
        iosSrc: '',
      },
      {
        id: 6,
        title: 'Apple Watch',
        description: 'Premium smartwatch with advanced features',
        price: '$399',
        modelSrc: 'https://angle-3d-demo.myshopify.com/cdn/shop/3d/models/o/4acb33bc7cc53ea1/apple-watch.glb?v=0',
        iosSrc: '',
      },
      {
        id: 7,
        title: 'Ray-Ban Sunglasses',
        description: 'Classic sunglasses with UV protection',
        price: '$149',
        modelSrc: 'https://angle-3d-demo.myshopify.com/cdn/shop/3d/models/o/96e903cfa86e4bec/ray-ban.glb?v=0',
        iosSrc: '',
      },
    ],
  },
  {
    id: 'electronics',
    title: 'Electronics',
    items: [
      {
        id: 8,
        title: 'Cinema Camera',
        description: 'Professional cinema camera for filmmaking',
        price: '$5,999',
        modelSrc: 'https://cdn.shopify.com/3d/models/122aa9e96161099f/cinema_camera.glb',
        iosSrc: '',
      },
      {
        id: 9,
        title: 'Studio Microphone',
        description: 'Professional studio condenser microphone',
        price: '$349',
        modelSrc: 'https://cdn.shopify.com/3d/models/17856a3ec41e1217/microphone.glb',
        iosSrc: '',
      },
      {
        id: 10,
        title: 'MacBook Pro',
        description: 'Apple MacBook Pro 16-inch (2021)',
        price: '$2,499',
        modelSrc: 'https://cdn.shopify.com/3d/models/1c4c1643fa4314cf/macbook_pro_16_2021.glb',
        iosSrc: '',
      },
      {
        id: 11,
        title: 'Professional Monitor',
        description: 'High-resolution professional display',
        price: '$899',
        modelSrc: 'https://cdn.shopify.com/3d/models/c319f49d796f6d9b/monitor.glb',
        iosSrc: '',
      },
     
      {
        id: 12,
        title: 'iPhone 16 Pro Max',
        description: 'Latest Apple flagship smartphone',
        price: '$1,099',
        modelSrc: 'https://cdn.shopify.com/3d/models/f0733ecc7a32b9d8/iphone_16_pro_max.glb',
        iosSrc: '',
      },
      {
        id: 13,
        title: 'Kitchen Appliance Set',
        description: 'Oven, microwave, and wine cooler combo',
        price: '$2,599',
        modelSrc: 'https://cdn.shopify.com/3d/models/f119e47f0a11dd8a/oven_microwave_and_winecooler.glb',
        iosSrc: '',
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
                    className="model-viewer-no-ui"
                    src={activeSection.items[(activeItemIndex - 1 + activeSection.items.length) % activeSection.items.length].modelSrc}
                    camera-controls
                    disable-zoom
                    interaction-prompt="none"
                    style={{ width: "100%", height: "300px" }}
                    background-color="transparent"
                    ui-info="no"
                    ar-status="not-presenting"
                    show-annotations="false"
                    environment-image="neutral"
                    enable-pan="false"
                    reveal="auto"
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
                      className="model-viewer-no-ui"
                      src={activeProduct.modelSrc}
                      camera-controls
                      auto-rotate
                      style={{ width: "100%", height: "450px" }}
                      background-color="transparent"
                      ui-info="no"
                      ar-status="not-presenting"
                      show-annotations="false"
                      environment-image="neutral"
                      enable-pan="false"
                      reveal="auto"
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
                    className="model-viewer-no-ui"
                    src={activeSection.items[(activeItemIndex + 1) % activeSection.items.length].modelSrc}
                    camera-controls
                    disable-zoom
                    interaction-prompt="none"
                    style={{ width: "100%", height: "300px" }}
                    background-color="transparent"
                    ui-info="no"
                    ar-status="not-presenting"
                    show-annotations="false"
                    environment-image="neutral"
                    enable-pan="false"
                    reveal="auto"
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