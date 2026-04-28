import { useState, useEffect } from 'react';

interface AutoImageCarouselProps {
  images: string[];
  alt: string;
}

export function AutoImageCarousel({ images, alt }: AutoImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Soft Neon Glow Behind Images */}
      <div className="absolute inset-0 z-0 bg-emerald-500/20 animate-pulse-neon pointer-events-none mix-blend-screen"></div>

      {/* Floating Container for Images */}
      <div className="absolute inset-0 w-full h-full animate-float-subtle">
        {images.map((img, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={img}
                alt={`${alt} - Image ${index + 1}`}
                className={`w-full h-full object-cover transition-transform duration-[3000ms] ease-linear ${
                  isActive && !isHovered ? 'scale-110' : 'scale-100'
                } ${isHovered && isActive ? 'scale-[1.15] duration-500 ease-out' : ''}`}
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}
      </div>
      
      {/* Gloss/Lighting Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-black/40 via-transparent to-white/10 mix-blend-overlay"></div>
      
      {/* Slow Moving Light Reflection */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="w-[150%] h-full absolute top-0 left-[-25%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-slow mix-blend-overlay"></div>
      </div>

      {/* Layered Shadows for Depth */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]"></div>
      
      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 z-30 pointer-events-none transition-opacity duration-500 shadow-[inset_0_0_30px_rgba(16,185,129,0.4)] ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  );
}
