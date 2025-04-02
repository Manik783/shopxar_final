import React, { useState, useEffect } from 'react';

// Add this type at the top of the file
type Model = {
  id: number;
  position: string;
  modelSrc: string;
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
      position: 'bottom-1/3 left-1/2',
      modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    },
    {
      id: 2,
      position: 'top-1/3 right-1/4',
      modelSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
    },
    {
      id: 3,
      position: 'bottom-1/3 right-1/4',
      modelSrc: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
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
              className={`absolute ${model.position} w-32 h-32`}
            >
              <div 
                className="relative w-full h-full cursor-pointer hover:scale-110 transition-transform duration-300 pointer-events-auto"
                onClick={() => setSelectedModel(model)}
              >
                <model-viewer
                  src={model.modelSrc}
                  camera-controls
                  auto-rotate
                  rotation-per-second="30deg"
                  interaction-prompt="none"
                  camera-orbit="0deg 75deg 105%"
                  min-camera-orbit="auto auto 105%"
                  max-camera-orbit="auto auto 105%"
                  disable-zoom
                  className="model-viewer-shadow"
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
                src={selectedModel.modelSrc}
                camera-controls
                auto-rotate
                rotation-per-second="30deg"
                camera-orbit="0deg 75deg 105%"
                shadow-intensity="1"
                shadow-softness="1"
                exposure="1"
                className="expanded-model"
              ></model-viewer>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
