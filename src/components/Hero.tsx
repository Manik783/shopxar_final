import React, { useState, useEffect } from 'react';

// Add this type at the top of the file
type Model = {
  id: number;
  position: string;
  modelSrc: string;
  scale: string;
  rotation: string;
  yOffset: string;
  xOffset: string;
  cameraOrbit: string;
};

const Hero = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

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

  const models = [
    {
      id: 1,
      position: 'top-[41%] right-[39%]',
     


      modelSrc: 'https://angle-3d-demo.myshopify.com/cdn/shop/3d/models/o/4acb33bc7cc53ea1/apple-watch.glb?v=0',
    



      scale: 'scale-[0.6]',
      rotation: 'rotate-90',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      cameraOrbit: '0deg 87deg 105%',
    },
    {
      id: 2,
      position: 'top-[27%] right-[26%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/88174270d865823c/headphone_headset.glb',
      scale: 'scale-[1.4]',
      rotation: 'rotate-270',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      cameraOrbit: '0deg 98deg 105%',
    },
    {
      id: 3,
      position: 'top-[77%] right-[26%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/f0733ecc7a32b9d8/iphone_16_pro_max.glb',
      scale: 'scale-[0.6]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      cameraOrbit: '90deg 90deg 110%',
    },
    {
      id: 4,
      position: 'top-[80%] right-[39%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/b705057628482aab/mechanical_keyboard_-_aesthetic.glb',
      scale: 'scale-[1]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      cameraOrbit: '0deg 70deg 105%',
    },
    {
      id: 5,
      position: 'top-[39%] left-[67%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/97a034ad7547e534/chinese_vase.glb',
      cameraOrbit: '0deg 83deg',
      scale: 'scale-[0.69]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
    },
    {
      id: 6,
      position: 'top-[26.7%] right-[39%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/17856a3ec41e1217/microphone.glb',
      cameraOrbit: 'odeg 100deg',
      scale: 'scale-[0.65]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
    },
    {
      id: 7,
      position: 'top-[53%] right-[39%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/122aa9e96161099f/cinema_camera.glb',
      cameraOrbit: '50deg 90deg',
      scale: 'scale-[1]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
    },

    {
      id: 8,
      position: 'top-[52%] right-[26%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/a0bc8bbb4b6024b5/air_jordan_1.glb',
      cameraOrbit: '50deg 94deg',
      scale: 'scale-[1.3]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
    },

    {
      id: 9,
      position: 'top-[67%] right-[26%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/b8c47a616dcc3199/low_poly_car_-_cadillac_75_sedan_1953.glb',
      cameraOrbit: '50deg 94deg',
      scale: 'scale-[1]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
    },

    {
      id: 10,
      position: 'top-[65.5%] right-[39%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/b04d6ab77c573e10/jbl_xtreme_3.glb',
      cameraOrbit: '5deg 80deg',
      scale: 'scale-[1]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
    },


 

  ];

  return (
    <section className="relative h-[100vh] overflow-hidden rounded-2xl">
      {/* Background image container */}
      <div className="absolute inset-0 z-[1]">
        <img
          src="/ChatGPT Image Apr 3, 2025, 01_01_26 AM.png"
          alt="Illuminated wooden shelves"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Model viewers on shelves */}
      {modelsLoaded && (
        <div className="absolute inset-0 z-[20] pointer-events-none">
          {models.map((model) => (
            <div
              key={model.id}
              className={`absolute ${model.position} ${model.scale} ${model.rotation} ${model.yOffset} ${model.xOffset}`}
            >
              <div 
                className="relative w-28 h-28 cursor-pointer hover:scale-110 transition-transform duration-300 pointer-events-auto"
                onClick={() => setSelectedModel(model)}
              >
                <model-viewer
                  className="model-viewer-shadow model-viewer-no-ui"
                  src={model.modelSrc}
                  camera-controls
                  auto-rotate
                  rotation-per-second="0deg"
                  interaction-prompt="none"
                  camera-orbit={model.cameraOrbit}
                  min-camera-orbit="auto auto auto"
                  max-camera-orbit="auto auto auto"
                  disable-zoom
                  ui-info="no"
                  ar-status="not-presenting"
                  show-annotations="false"
                  environment-image="neutral"
                  enable-pan="false"
                  reveal="auto"
                  shadow-intensity="0.5"
                  shadow-softness="2"
                  exposure="1"
                  field-of-view="35deg"
                ></model-viewer>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 h-full relative z-[20] pointer-events-none">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          {selectedModel ? (
            <h1 className="text-9xl font-bold text-[#fff4e2]/10 select-none">
              SHOPXAR
            </h1>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#fff4e2] mb-4 sm:mb-6 leading-tight">
                Product <span className="text-[#677870]">visualizations</span><br />
                with <span className="text-[#677870]">3D</span> modeling<br />
                services
              </h1>
              <p className="text-[#fff4e2]/20 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl">
                Infuse unparalleled realism with 3D visualization where we comprehensively 
                boast your business capabilities.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 relative pointer-events-auto">
                <button className="bg-[#181819] text-[#fff4e2] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-[#272425] transition-all duration-300">
                  Request a sample
                </button>
                <button className="bg-[#fff4e2] text-[#181819] border border-[#181819] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-[#677870] hover:text-[#fff4e2] hover:border-[#677870] transition-all duration-300">
                  Schedule now
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Expanded model viewer overlay */}
      {selectedModel && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-start"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedModel(null);
          }}
        >
          <div 
            className="ml-[190px] mt-[150px] w-[500px] h-[500px] bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <model-viewer
                className="expanded-model model-viewer-no-ui"
                src={selectedModel.modelSrc}
                camera-controls
                auto-rotate
                rotation-per-second="3deg"
                camera-orbit={selectedModel.cameraOrbit}
                shadow-intensity="0.5"
                shadow-softness="2"
                exposure="1"
                ui-info="no"
                ar-status="not-presenting"
                show-annotations="false"
                environment-image="neutral"
                enable-pan="false"
                reveal="auto"
                field-of-view="35deg"
              ></model-viewer>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
