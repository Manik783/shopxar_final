import React, { useEffect, useState, useRef } from 'react';

interface CarRevealProps {
  progress: number;
}

const CarReveal: React.FC<CarRevealProps> = ({ progress }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ultra-smooth easing function - optimized for performance
  // Using a more precise cosine curve for smoother acceleration/deceleration
  const easedProgress = 0.5 - 0.5 * Math.cos(Math.PI * progress);
  
  // More precise control over car reveal with refined range
  const carPosition = 10 + (easedProgress * 80);

  // Refined translation offset with hardware acceleration
  const translateOffset = -((carPosition - 50) * 1.1);

  useEffect(() => {
    // Preload image with higher priority
    const img = new Image();
    img.src = 'https://wallpapercave.com/wp/SsbQqtk.jpg';
    img.fetchPriority = 'high';
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setError('Failed to load car image');
      console.error('Failed to load car image');
    };
  }, []);

  // Apply subtle parallax effect based on progress - optimized
  useEffect(() => {
    if (containerRef.current && isLoaded) {
      // Add subtle tilt as the phone moves - using transform3d for hardware acceleration
      const tiltAngle = (progress - 0.5) * 1.8; // Slightly reduced range for more precision
      containerRef.current.style.transform = `perspective(1000px) translate3d(0,0,0) rotateY(${tiltAngle}deg)`;
    }
  }, [progress, isLoaded]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-black/40 text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-black will-change-transform"
      style={{
        // No margins or borders, just transform scale for proportional size reduction
        transform: 'translate3d(0,0,0) scale(0.9)',
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transition: 'transform 0.15s linear' // Faster transition for more immediate response
      }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-white/10 border-t-white animate-spin"></div>
        </div>
      )}
      
      <div
        className={`absolute inset-0 transition-opacity duration-200 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          ref={imageRef}
          src="https://wallpapercave.com/wp/SsbQqtk.jpg"
          alt="Car in AR view"
          className="absolute object-cover h-full will-change-transform"
          style={{
            width: '200%', // Wider image for smoother reveal
            objectFit: 'cover',
            transform: `translate3d(${translateOffset}%,0,0)`,
            objectPosition: `${carPosition}% center`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            imageRendering: 'high-quality',
            transition: 'none' // Remove transition for direct manipulation
          }}
        />
        
        {/* Enhanced reflection effect - simplified for performance */}
        <div 
          className="absolute inset-0 pointer-events-none will-change-opacity"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(0,0,0,0) 0%, 
              rgba(0,0,0,${0.1 + progress * 0.2}) 70%, 
              rgba(0,0,0,${0.3 + progress * 0.3}) 100%)`,
            opacity: 0.6 + (progress * 0.4),
            transition: 'none'
          }}
        ></div>
        
        {/* Subtle light flare - simplified for performance */}
        <div 
          className="absolute w-[50%] h-[30%] rounded-full bg-white blur-3xl will-change-transform"
          style={{
            top: '20%',
            left: `${20 + progress * 60}%`,
            transform: 'translate3d(-50%,0,0)',
            opacity: 0.15 + (progress * 0.15),
            transition: 'none',
            pointerEvents: 'none'
          }}
        ></div>
        
        {/* Grain overlay - static to avoid repaints */}
        <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none"></div>
        
        {/* AR UI elements */}
        <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md text-xs flex items-center gap-1.5 bg-black/30 backdrop-blur-sm border border-white/10">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-white text-opacity-90 font-medium">AR Active</span>
        </div>
        
        {/* Guidance text - optimized opacity transition */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-xs font-medium text-center px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 will-change-opacity will-change-transform"
          style={{
            opacity: Math.max(0, 0.9 - (progress * 3.6)), // Faster fade out
            transform: `translate3d(-50%, ${progress < 0.25 ? 0 : 10}px, 0)`,
            pointerEvents: 'none',
            transition: 'none'
          }}
        >
          Slide right to reveal the car
        </div>
      </div>
    </div>
  );
};

export default CarReveal;