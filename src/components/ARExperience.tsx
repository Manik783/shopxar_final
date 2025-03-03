import React, { useState, useCallback } from 'react';
import PhoneViewfinder from './PhoneViewfinder';
import CarReveal from './CarReveal';

const ARExperience = () => {
  const [progress, setProgress] = useState(0.5);
  let resetViewfinder: () => void;

  const handlePositionChange = useCallback((_: number, progress: number) => {
    setProgress(progress);
  }, []);

  const handleResetCallback = useCallback((reset: () => void) => {
    resetViewfinder = reset;
  }, []);

  return (
    <section className="min-h-[100dvh] pt-20 md:pt-24 pb-8 md:pb-16 site-gradient">
      <div className="gradient-container">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <span className="text-[#4CAF50] text-xs md:text-sm uppercase tracking-widest mb-2 block">
            AR EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-3 md:mb-4">
            Discover the Future
          </h2>
          <p className="text-gray-300 text-base md:text-lg px-4">
            Drag the viewer to reveal the car in augmented reality
          </p>
        </div>

        <div className="relative w-full max-w-[1200px] mx-auto flex items-center justify-center">
          <PhoneViewfinder
            onPositionChange={handlePositionChange}
            onReset={handleResetCallback}
          >
            <CarReveal progress={progress} />
          </PhoneViewfinder>
        </div>
      </div>
    </section>
  );
};

export default ARExperience;