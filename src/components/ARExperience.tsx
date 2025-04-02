import React, { useState, useCallback } from 'react';
import PhoneViewfinder from './PhoneViewfinder';
import CarReveal from './CarReveal';

const ARExperience = () => {
  const [progress, setProgress] = useState(0.1);
  let resetViewfinder: () => void;

  const handlePositionChange = useCallback((_: number, progress: number) => {
    setProgress(progress);
  }, []);

  const handleResetCallback = useCallback((reset: () => void) => {
    resetViewfinder = reset;
  }, []);

  return (
    <section className="bg-[#fff4e2]">
      <div className="container">
        <h2 className="text-[#3d3938]">
          AR Experience
        </h2>
        <p className="text-[#3d3938]/80">
          Experience our products in augmented reality
        </p>
        <button className="bg-[#3d3938] text-[#fff4e2] hover:bg-[#3d3938]/90">
          Try AR Now
        </button>
      </div>
    </section>
  );
};

export default ARExperience;