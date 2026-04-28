export function ImmersiveBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* 1. Base Layer: Layered Tonal Variation (X/Twitter inspired) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, #000000, #0a0a0a, #000000)'
        }}
      />

      {/* 2. Ambient Glow Layers: Neon Green (#00ff9f) soft blending */}
      {/* Primary Glow Area (Center-Top Hero) */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(0, 255, 159, 0.08), transparent 60%)'
        }}
      />
      
      {/* Secondary Glow Area (Bottom-Right Accent) */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(circle at 80% 70%, rgba(0, 255, 159, 0.05), transparent 70%)'
        }}
      />

      {/* 3. Depth & Texture: Subtle Noise/Grain (High-End feel) */}
      <div 
        className="absolute inset-0 z-20 opacity-[0.03] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
      />

      {/* 4. Focus Layer: Edge Vignette */}
      <div 
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.5) 100%)'
        }}
      />

      {/* 5. Minimal "Alive" Elements (Very faint particles for depth) */}
      <div className="absolute inset-0 z-40 opacity-[0.4]">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#00ff9f]/10"
            style={{
              width: (Math.random() * 1.5 + 0.5) + 'px',
              height: (Math.random() * 1.5 + 0.5) + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              filter: 'blur(0.5px)',
              animation: `particleFloat ${Math.random() * 20 + 30}s ease-in-out infinite`,
              animationDelay: `-${Math.random() * 30}s`,
              opacity: Math.random() * 0.1 + 0.02
            }}
          />
        ))}
      </div>

      {/* 6. Grounding: Bottom Transition to content */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-black via-black/20 to-transparent z-50" />
    </div>
  );
}
