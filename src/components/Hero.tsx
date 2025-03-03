import React from 'react';
import { ArrowRight } from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] site-gradient pt-20 md:pt-24 overflow-hidden">
      <div className="gradient-container">
        <div className="container mx-auto px-4 pt-16 md:pt-20 text-center relative z-[5]">
          <h1 className="text-3xl md:text-8xl font-bold tracking-tight text-white mb-3 md:mb-4 relative">
            Product Visualization<br />Redefined
          </h1>
          <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8 relative px-4">
            Transform your product experience with cutting-edge 3D visualization technology. 
            Bring your products to life in immersive, interactive environments.
          </p>
          <div className="flex gap-3 md:gap-4 justify-center relative">
            <button className="bg-[#4CAF50] text-white px-4 md:px-8 py-2.5 md:py-3 rounded-lg font-medium text-sm md:text-lg hover:bg-[#45a049] transition-colors">
              Let's dive in
            </button>
            <button className="flex items-center gap-1.5 md:gap-2 text-sm md:text-lg font-medium text-gray-300 hover:text-white transition-colors">
              View live demo
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;