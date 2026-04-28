import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Star, Users, Leaf, BookOpen, GraduationCap, Sparkles, ThumbsUp, Wind, Flame, Moon, Sun, X, Handshake, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { STRAINS } from "@/data/strains";
import { PRODUCTS } from "./Products";
import { AutoImageCarousel } from "@/components/AutoImageCarousel";
import { ImmersiveBackground } from "@/components/ImmersiveBackground";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const FEATURED_STRAINS = STRAINS.slice(0, 4);

const HERO_SLIDES = [
  {
    id: 'logo',
    content: (
      <div className="flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-emerald-500/80 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 md:mb-6"
        >
          The Future of Botanical Tech
        </motion.span>
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter max-w-5xl bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-emerald-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.25)] relative z-10 py-2 text-center w-full leading-[0.85]">
          CannaHub
        </h1>
      </div>
    )
  },
  {
    id: 'trending',
    content: (
      <div className="relative px-5 py-2 md:px-8 md:py-3 mx-auto flex flex-col items-center justify-center gap-2 text-3xl sm:text-4xl md:text-6xl w-fit flex-nowrap shrink-0">
        <div className="flex items-center gap-4">
          <span 
            className="relative z-50 font-medium italic font-['Cintarini'] text-white drop-shadow-[0_4px_12px_rgba(16,185,129,0.5)]" 
            style={{ fontFamily: '"Cintarini", sans-serif' }}
          >
            powered by
          </span>
        </div>
        <span className="font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"></span>
      </div>
    )
  },
  {
    id: 'drops',
    content: (
      <div className="relative flex items-center justify-center mx-auto w-fit shrink-0 py-6">
        {/* Dynamic Outer Glow */}
        <div className="absolute inset-0 bg-emerald-500/40 blur-[80px] rounded-full scale-125 opacity-40 animate-pulse transition-opacity duration-1000"></div>
        <div className="absolute inset-0 bg-emerald-400/20 blur-[40px] rounded-full scale-110 opacity-60"></div>
        
        {/* Glassmorphic Circular Frame */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 h-[170px] w-[170px] sm:h-[190px] sm:w-[190px] md:h-[240px] md:w-[240px] rounded-full overflow-hidden border-2 border-emerald-500/40 bg-white shadow-[0_0_60px_rgba(16,185,129,0.4)] ring-1 ring-white/20"
        >
          <img 
            src="my-logo.png" 
            alt="Promotional Brand"
            className="w-full h-full object-contain p-2 transition-transform duration-1000 hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Ambient Ring */}
        <div className="absolute inset-0 border border-emerald-500/20 rounded-full scale-[1.05] blur-[2px]"></div>
      </div>
    )
  }
];

function HeroSlideshow() {
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPage(([prev]) => [(prev + 1) % HERO_SLIDES.length, 1]);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const paginate = (newDirection: number, newIndex: number) => {
    setPage([newIndex, newDirection]);
  };

  const activeSlide = HERO_SLIDES[page];

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      z: 1,
      y: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      z: 0,
      y: direction > 0 ? -30 : 30,
      opacity: 0,
      scale: 1.05
    }),
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center w-full max-w-full"
    >
      <div className="relative h-64 sm:h-72 md:h-80 flex justify-center items-center w-full max-w-5xl mx-auto overflow-visible mb-8 md:mb-12">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 400, damping: 40 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.5 },
              filter: { duration: 0.4 }
            }}
            style={{ willChange: "transform, opacity, filter" }}
            className="absolute z-10 flex w-full justify-center items-center h-full"
          >
            <div className="w-full flex justify-center items-center">
              {activeSlide.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center items-center gap-6 z-20 relative w-full h-10">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === page) return;
              paginate(i > page ? 1 : -1, i);
            }}
            className="group relative h-10 w-10 flex items-center justify-center focus:outline-none"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div className={`relative z-10 transition-all duration-700 ease-[0.16,1,0.3,1] ${
              i === page 
                ? "w-8 h-[2px] bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]" 
                : slide.id === 'logo'
                  ? "w-2.5 h-2.5 rounded-full border border-emerald-500/50 bg-transparent rotate-45"
                  : "w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white/30"
            }`} />
            {i === page && (
              <motion.div 
                layoutId="active-nav-indicator"
                className="absolute inset-0 bg-emerald-500/10 rounded-full blur-md"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <div className="absolute inset-x-0 -bottom-2 h-0.5 bg-emerald-500 scale-x-0 group-hover:scale-x-50 transition-transform duration-500 opacity-30" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}


// Add Item interface for comparison tool
interface ItemData {
  id: string;
  name: string;
  brand?: string;
  type: string;
  category?: string;
  thc: string;
  rating: number;
  image: string;
  effects?: { name: string; val: number }[];
  medical?: { name: string; val: number }[];
  negatives?: { name: string; val: number }[];
  description?: string;
}

export function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [compareMode, setCompareMode] = useState<"strains" | "vapes">("strains");
  const [selectionA, setSelectionA] = useState<ItemData | null>(null);
  const [selectionB, setSelectionB] = useState<ItemData | null>(null);
  const [queryA, setQueryA] = useState("");
  const [queryB, setQueryB] = useState("");
  const [showSuggestionsA, setShowSuggestionsA] = useState(false);
  const [showSuggestionsB, setShowSuggestionsB] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<null | { title: string; desc: string; image: string; strains: string[] }>(null);
  const { scrollYProgress } = useScroll();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestionsA(false);
      setShowSuggestionsB(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const getSuggestions = (query: string, mode: "strains" | "vapes", excludeId?: string) => {
    let data = mode === "strains" 
      ? (STRAINS as unknown as ItemData[]) 
      : (PRODUCTS as unknown as ItemData[]).filter(p => p.category === "Vapes");
    
    if (excludeId) {
      data = data.filter(item => item.id !== excludeId);
    }

    if (!query) return data.slice(0, 20);
    return data.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 20);
  };
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/products`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col bg-transparent overflow-hidden relative min-h-screen">
      {/* Global Immersive Background */}
      <div className="fixed inset-0 z-0 bg-black">
        <ImmersiveBackground />
      </div>
      
      {/* HERO SECTION */}
      <section className="relative text-white min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Removed hero-specific background overlay to allow ImmersiveBackground to show through */}

        <motion.div 
          style={{ y, opacity }}
          className="container mx-auto px-5 md:px-8 py-24 relative z-10 flex flex-col items-center justify-center text-center pointer-events-auto w-full max-w-7xl h-full"
        >
          <div className="w-full flex items-center justify-center mb-10 md:mb-14">
            <HeroSlideshow />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.8 }
              }
            }}
            className="flex flex-col items-center w-full"
          >
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-sm sm:text-base md:text-lg text-slate-400 font-medium tracking-[0.15em] uppercase mb-8 sm:mb-12 max-w-2xl mx-auto drop-shadow-md leading-relaxed text-center"
            >
              The Next Frontier in Medical Botany — <span className="text-emerald-500/80">Philippines 2026</span>
            </motion.p>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full max-w-3xl mx-auto group mb-8 md:mb-14 px-0 md:px-4"
            >
              <div className="bg-[#0a0f16]/40 backdrop-blur-3xl border border-white/10 p-2 sm:p-2.5 rounded-2xl md:rounded-[32px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),_inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col md:flex-row gap-2 md:gap-2.5 focus-within:ring-1 focus-within:ring-emerald-500/50 focus-within:bg-[#0a0f16]/60 transition-all duration-700">
                <div className="relative flex-1 flex items-center">
                  <Search className="absolute left-6 text-slate-500 group-focus-within:text-emerald-400 h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-500 z-10" />
                  <Input 
                    placeholder="Search strains, vapes..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="h-14 md:h-18 pl-14 sm:pl-16 pr-6 border-0 focus-visible:ring-0 bg-transparent text-white placeholder:text-slate-600 text-base md:text-xl w-full tracking-wide rounded-2xl"
                  />
                </div>
                <Button size="lg" className="h-14 md:h-18 px-10 text-base md:text-lg bg-emerald-600 text-black hover:bg-emerald-500 hover:text-white font-bold rounded-xl md:rounded-[24px] shadow-xl transition-all duration-500 w-full md:w-auto shrink-0 active:scale-[0.98] md:hover:scale-[1.05]" onClick={handleSearch}>
                  Search
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 1 } }
              }}
              className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[10px] sm:text-xs font-bold text-slate-500 tracking-[0.2em] uppercase w-full px-2"
            >
              <span className="text-emerald-500/60 font-black">Hot Indices:</span>

              <Link to="/strains/blue-dream" className="hover:text-emerald-400 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all duration-500 whitespace-nowrap"> Blue Dream</Link>
              <Link to="/strains/gelato" className="hover:text-emerald-400 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all duration-500 whitespace-nowrap"> Gelato</Link>
              <Link to="/strains/wedding-cake" className="hover:text-emerald-400 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all duration-500 whitespace-nowrap"> Wedding Cake</Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* STATS SECTION */}
      <section className="relative z-20 -mt-10 sm:-mt-16 pb-12 sm:pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto bg-slate-900/60 backdrop-blur-2xl border border-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col md:flex-row justify-between items-stretch md:items-center md:divide-x divide-white/10 gap-6 md:gap-0"
          >
            <div className="flex flex-1 flex-row items-center justify-start md:justify-center gap-5 px-0 md:px-4 group transition-transform active:scale-95 duration-200">
              <div className="p-3.5 bg-emerald-500/10 rounded-2xl md:group-hover:bg-emerald-500/20 transition-all duration-500 md:group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] shrink-0">
                <Leaf className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="text-left">
                <div className="text-xl md:text-2xl font-black text-white leading-tight uppercase tracking-tight">50+</div>
                <div className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-wider">Curated Strains</div>
              </div>
            </div>
            <div className="flex flex-1 flex-row items-center justify-start md:justify-center gap-5 px-0 md:px-4 group transition-transform active:scale-95 duration-200">
              <div className="p-3.5 bg-emerald-500/10 rounded-2xl md:group-hover:bg-emerald-500/20 transition-all duration-500 md:group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] shrink-0">
                <Star className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="text-left">
                <div className="text-xl md:text-2xl font-black text-white leading-tight uppercase tracking-tight">200+</div>
                <div className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-wider">Verified Reviews</div>
              </div>
            </div>
            <div className="flex flex-1 flex-row items-center justify-start md:justify-center gap-5 px-0 md:px-4 group transition-transform active:scale-95 duration-200">
              <div className="p-3.5 bg-emerald-500/10 rounded-2xl md:group-hover:bg-emerald-500/20 transition-all duration-500 md:group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] shrink-0">
                <Users className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="text-left">
                <div className="text-xl md:text-2xl font-black text-white leading-tight uppercase tracking-tight">500+</div>
                <div className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-wider">Active Users</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED STRAINS */}
      <section className="py-16 md:py-32 relative">
        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-16 gap-4"
          >
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 md:mb-3 tracking-tight drop-shadow-lg">Trending Strains</h2>
              <p className="text-slate-300 text-base md:text-lg drop-shadow-md max-w-xl">Discover what's popular in the community right now.</p>
            </div>
            <Button variant="outline" asChild className="w-full md:w-auto bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white backdrop-blur-md">
              <Link to="/strains">View All Strains</Link>
            </Button>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {FEATURED_STRAINS.map((strain, i) => (
              <motion.div
                key={strain.id}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                whileTap={{ scale: 0.98 }}
                className="h-full flex flex-col"
              >
                <Link to={`/strains/${strain.id}`} className="group bg-slate-900/60 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/5 overflow-hidden hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.3)] hover:border-emerald-500/30 transition-all duration-500 flex flex-col flex-1 relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <AutoImageCarousel images={strain.images || [strain.image]} alt={strain.name} />
                    <Badge className="absolute top-3 left-3 shadow-lg bg-emerald-500/90 text-slate-950 border-none font-bold z-30 px-2 py-0.5 text-[10px] md:text-sm uppercase tracking-wider">{strain.type}</Badge>
                  </div>
                  <div className="p-4 md:p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{strain.name}</h3>
                       <div className="flex flex-col items-end">
                         <span className="text-[10px] font-black text-emerald-400/80 uppercase tracking-tighter">Verified</span>
                         <span className="text-xs font-bold text-slate-300">THC {strain.thc}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-slate-200">{strain.rating}</span>
                    </div>
                    <div className="mt-auto">
                      <Button variant="outline" className="w-full text-xs h-10 border-white/10 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 transition-all duration-300 rounded-xl">
                        Explore Strain
                      </Button>
                    </div>
                  </div>
                </Link>

                {/* Optional: Add Effects back if wanted, but keep it inside the loop */}
                <div className="mt-2 bg-slate-900/40 backdrop-blur-md rounded-xl border border-white/5 p-3">
                  <div className="flex flex-wrap gap-2">
                    {strain.effects.slice(0, 2).map(eff => (
                      <span key={eff.name} className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium drop-shadow-[0_0_5px_rgba(16,185,129,0.2)]">{eff.name}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-[#0a111a]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative group">
              {/* Background ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px] transition-all duration-1000 group-hover:bg-emerald-500/20" />
              
              <div className="relative z-10 text-center">
                <AnimatePresence mode="wait">
                  {!showComparison ? (
                    <motion.div
                      key="selection"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
                        Compare {compareMode === "strains" ? "Strains" : "Vapes"}
                      </h2>

                      {/* Mode Switcher */}
                      <div className="flex justify-center mb-10">
                        <div className="inline-flex bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md relative overflow-hidden group">
                          <motion.div 
                            className="absolute rounded-xl z-0"
                            initial={false}
                            animate={{
                              x: compareMode === "strains" ? 0 : "100%",
                              backgroundColor: compareMode === "strains" ? "#10b981" : "#06b6d4",
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            style={{
                              width: "125px",
                              height: "44px",
                              top: "6px",
                              left: "6px"
                            }}
                          />
                          <button
                            onClick={() => {
                              setCompareMode("strains");
                              setSelectionA(null);
                              setSelectionB(null);
                              setQueryA("");
                              setQueryB("");
                            }}
                            className={`relative z-10 flex items-center justify-center gap-2 w-[125px] h-11 rounded-xl text-sm font-bold tracking-tight transition-colors duration-300 ${
                              compareMode === "strains" ? "text-white" : "text-slate-400 hover:text-white"
                            }`}
                          >
                            <Leaf className="w-4 h-4" /> Strains
                          </button>
                          <button
                            onClick={() => {
                              setCompareMode("vapes");
                              setSelectionA(null);
                              setSelectionB(null);
                              setQueryA("");
                              setQueryB("");
                            }}
                            className={`relative z-10 flex items-center justify-center gap-2 w-[125px] h-11 rounded-xl text-sm font-bold tracking-tight transition-colors duration-300 ${
                              compareMode === "vapes" ? "text-white" : "text-slate-400 hover:text-white"
                            }`}
                          >
                            <Wind className="w-4 h-4" /> Vapes
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-8 mb-12 items-stretch">
                        {/* Slot A */}
                        <div className={`flex-1 text-left relative w-full ${showSuggestionsA ? 'z-50' : 'z-10'}`} onClick={(e) => e.stopPropagation()}>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
                            {compareMode === "strains" ? "Strain" : "Vape"} A
                          </label>
                          {selectionA ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-[#0a111a]/80 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden group shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] h-full flex flex-col relative"
                            >
                               <div className="relative h-60 w-full overflow-hidden bg-white/5">
                                  <img 
                                    src={selectionA.image} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    alt={selectionA.name} 
                                    referrerPolicy="no-referrer" 
                                  />
                                  <button 
                                    onClick={() => { setSelectionA(null); setQueryA(""); }}
                                    className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/90 rounded-full text-white transition-all shadow-xl z-20 group/btn"
                                  >
                                    <X className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                  </button>
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] via-transparent to-transparent opacity-90"></div>
                                  <div className="absolute bottom-3 left-4">
                                    <Badge className={`${compareMode === "strains" ? "bg-emerald-500/80" : "bg-cyan-500/80"} text-white border-0 text-[10px] uppercase font-black px-2 py-0.5`}>
                                      {selectionA.type || selectionA.category}
                                    </Badge>
                                  </div>
                               </div>
                               <div className="p-5 flex-1 flex flex-col justify-between">
                                 <h4 className={`text-xl font-black text-white mb-2 leading-tight uppercase tracking-tight transition-colors ${compareMode === "vapes" ? "group-hover:text-cyan-400" : "group-hover:text-emerald-400"}`}>
                                   {selectionA.name}
                                 </h4>
                                 <div className="flex items-center justify-between mt-auto">
                                   <div className="flex items-center gap-1.5">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span className="font-bold text-white text-sm">{selectionA.rating}</span>
                                   </div>
                                   <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${compareMode === "vapes" ? "bg-cyan-500/10 text-cyan-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                                     {selectionA.thc} THC
                                   </div>
                                 </div>
                               </div>
                            </motion.div>
                          ) : (
                            <div className="relative">
                              <Input
                                placeholder={`Search ${compareMode === "strains" ? "strain" : "vape"}...`}
                                value={queryA}
                                onChange={(e) => {
                                  setQueryA(e.target.value);
                                  setShowSuggestionsA(true);
                                }}
                                onFocus={() => setShowSuggestionsA(true)}
                                className={`h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white placeholder:text-slate-600 focus-visible:ring-offset-0 text-lg shadow-inner transition-all ${compareMode === "vapes" ? "focus-visible:ring-cyan-500/50" : "focus-visible:ring-emerald-500/50"}`}
                              />
                            </div>
                          )}
                          
                          <AnimatePresence>
                            {showSuggestionsA && !selectionA && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className={`absolute z-50 w-full mt-2 bg-[#0a111a]/95 shadow-2xl border border-white/10 rounded-2xl overflow-hidden backdrop-blur-3xl ${compareMode === "vapes" ? "border-t-cyan-500/50" : "border-t-emerald-500/50"}`}
                              >
                                <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
                                  {getSuggestions(queryA, compareMode, selectionB?.id).length > 0 ? (
                                    getSuggestions(queryA, compareMode, selectionB?.id).map((item) => (
                                      <button
                                        key={item.id}
                                        onClick={() => {
                                          setSelectionA(item);
                                          setShowSuggestionsA(false);
                                        }}
                                        className={`w-full flex items-center gap-4 p-4 transition-colors text-left border-b border-white/5 last:border-0 group ${compareMode === "vapes" ? "hover:bg-cyan-500/10" : "hover:bg-emerald-500/10"}`}
                                      >
                                        <img src={item.image} className="w-12 h-12 rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform" alt={item.name} referrerPolicy="no-referrer" />
                                        <div>
                                          <div className={`text-base font-bold text-white transition-colors ${compareMode === "vapes" ? "group-hover:text-cyan-400" : "group-hover:text-emerald-400"}`}>{item.name}</div>
                                          <div className="text-xs text-slate-500 uppercase tracking-wider">{item.brand || item.type}</div>
                                        </div>
                                      </button>
                                    ))
                                  ) : (
                                    <div className="p-6 text-center text-slate-500 text-sm italic">No results found</div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Slot B */}
                        <div className={`flex-1 text-left relative w-full ${showSuggestionsB ? 'z-50' : 'z-10'}`} onClick={(e) => e.stopPropagation()}>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
                            {compareMode === "strains" ? "Strain" : "Vape"} B
                          </label>
                          {selectionB ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-[#0a111a]/80 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden group shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] h-full flex flex-col relative"
                            >
                               <div className="relative h-60 w-full overflow-hidden bg-white/5">
                                  <img 
                                    src={selectionB.image} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    alt={selectionB.name} 
                                    referrerPolicy="no-referrer" 
                                  />
                                  <button 
                                    onClick={() => { setSelectionB(null); setQueryB(""); }}
                                    className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/90 rounded-full text-white transition-all shadow-xl z-20 group/btn"
                                  >
                                    <X className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                  </button>
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] via-transparent to-transparent opacity-90"></div>
                                  <div className="absolute bottom-3 left-4">
                                    <Badge className={`${compareMode === "strains" ? "bg-emerald-500/80" : "bg-cyan-500/80"} text-white border-0 text-[10px] uppercase font-black px-2 py-0.5`}>
                                      {selectionB.type || selectionB.category}
                                    </Badge>
                                  </div>
                               </div>
                               <div className="p-5 flex-1 flex flex-col justify-between">
                                 <h4 className={`text-xl font-black text-white mb-2 leading-tight uppercase tracking-tight transition-colors ${compareMode === "vapes" ? "group-hover:text-cyan-400" : "group-hover:text-emerald-400"}`}>
                                   {selectionB.name}
                                 </h4>
                                 <div className="flex items-center justify-between mt-auto">
                                   <div className="flex items-center gap-1.5">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span className="font-bold text-white text-sm">{selectionB.rating}</span>
                                   </div>
                                   <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${compareMode === "vapes" ? "bg-cyan-500/10 text-cyan-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                                     {selectionB.thc} THC
                                   </div>
                                 </div>
                               </div>
                            </motion.div>
                          ) : (
                            <div className="relative">
                              <Input
                                placeholder={`Search ${compareMode === "strains" ? "strain" : "vape"}...`}
                                value={queryB}
                                onChange={(e) => {
                                  setQueryB(e.target.value);
                                  setSelectionB(null);
                                  setShowSuggestionsB(true);
                                }}
                                onFocus={() => setShowSuggestionsB(true)}
                                className={`h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white placeholder:text-slate-600 focus-visible:ring-offset-0 text-lg shadow-inner transition-all ${compareMode === "vapes" ? "focus-visible:ring-cyan-500/50" : "focus-visible:ring-emerald-500/50"}`}
                              />
                            </div>
                          )}
                          
                          <AnimatePresence>
                            {showSuggestionsB && !selectionB && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className={`absolute z-50 w-full mt-2 bg-[#0a111a]/95 shadow-2xl border border-white/10 rounded-2xl overflow-hidden backdrop-blur-3xl ${compareMode === "vapes" ? "border-t-cyan-500/50" : "border-t-emerald-500/50"}`}
                              >
                                <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
                                  {getSuggestions(queryB, compareMode, selectionA?.id).length > 0 ? (
                                    getSuggestions(queryB, compareMode, selectionA?.id).map((item) => (
                                      <button
                                        key={item.id}
                                        onClick={() => {
                                          setSelectionB(item);
                                          setShowSuggestionsB(false);
                                        }}
                                        className={`w-full flex items-center gap-4 p-4 transition-colors text-left border-b border-white/5 last:border-0 group ${compareMode === "vapes" ? "hover:bg-cyan-500/10" : "hover:bg-emerald-500/10"}`}
                                      >
                                        <img src={item.image} className="w-12 h-12 rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform" alt={item.name} referrerPolicy="no-referrer" />
                                        <div>
                                          <div className={`text-base font-bold text-white transition-colors ${compareMode === "vapes" ? "group-hover:text-cyan-400" : "group-hover:text-emerald-400"}`}>{item.name}</div>
                                          <div className="text-xs text-slate-500 uppercase tracking-wider">{item.brand || item.type}</div>
                                        </div>
                                      </button>
                                    ))
                                  ) : (
                                    <div className="p-6 text-center text-slate-500 text-sm italic">No results found</div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button 
                          onClick={() => {
                            if (selectionA && selectionB) {
                              setShowComparison(true);
                            } else {
                              alert(`Please select two ${compareMode === "strains" ? "strains" : "vapes"} to compare.`);
                            }
                          }}
                          disabled={!selectionA || !selectionB}
                          className={`w-full md:w-auto px-20 h-18 ${compareMode === "strains" ? "bg-emerald-600 hover:bg-emerald-500 shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)]" : "bg-cyan-600 hover:bg-cyan-500 shadow-[0_20px_40px_-10px_rgba(6,182,212,0.4)]"} text-white font-black text-xl rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/20 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center`}
                        >
                          Compare Now
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="w-full"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
                        <Button 
                          variant="ghost" 
                          onClick={() => setShowComparison(false)}
                          className="text-slate-400 hover:text-white flex items-center justify-center gap-2 px-4 h-11 hover:bg-white/5 rounded-xl transition-all self-start sm:self-center order-2 sm:order-1"
                        >
                          <X className="w-4 h-4" /> <span className="text-sm">Back to Selection</span>
                        </Button>
                        <h2 className="text-2xl sm:text-2xl md:text-3xl font-black text-white tracking-tight text-center sm:text-left order-1 sm:order-2">Comparison Results</h2>
                        <div className="w-24 hidden md:block order-3"></div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 gap-y-16 relative">
                        {/* VS Divider - Desktop Only */}
                        <div className="absolute hidden md:flex top-[120px] lg:top-[140px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                          <div className="w-16 h-16 rounded-full bg-slate-950 border-2 border-white/20 flex items-center justify-center text-2xl font-black text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                            VS
                          </div>
                        </div>

                        {[selectionA, selectionB].map((item, idx) => (
                          <React.Fragment key={idx}>
                            {idx === 1 && (
                              <div className="md:hidden flex justify-center z-20 py-4 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-slate-950 border-2 border-emerald-500/30 flex items-center justify-center text-2xl font-black text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.5)] z-20">
                                  VS
                                </div>
                              </div>
                            )}
                            <div className={`flex flex-col items-center ${idx === 0 ? "mb-14 md:mb-0" : "mt-14 md:mt-0"}`}>
                            <motion.div 
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.2 + idx * 0.1 }}
                              className="w-full aspect-[4/3] rounded-3xl overflow-hidden border-2 border-white/10 mb-6 group relative bg-white/5"
                            >
                              <img 
                                src={item?.image} 
                                alt={item?.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                              <div className="absolute bottom-4 left-4 right-4">
                                <Badge className="bg-emerald-500/80 text-white border-0 text-[10px] uppercase font-black px-2 py-0.5 mb-2">{item?.type}</Badge>
                                <h3 className="text-lg md:text-2xl font-bold text-white tracking-tight leading-tight">{item?.name}</h3>
                              </div>
                            </motion.div>

                            <div className="w-full space-y-4">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-left">
                                  <div className="text-[10px] uppercase font-black text-slate-500 mb-1 tracking-widest">THC POTENCY</div>
                                  <div className="text-lg font-black text-white">{item?.thc}</div>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-left">
                                  <div className="text-[10px] uppercase font-black text-slate-500 mb-1 tracking-widest">RATING</div>
                                  <div className="flex items-center gap-2">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <div className="text-lg font-black text-white">{item?.rating}</div>
                                  </div>
                                </div>
                              </div>

                              {/* Effects & Benefits */}
                              <div className="space-y-4 pt-2">
                                {item?.effects && item.effects.length > 0 && (
                                  <div className="text-left">
                                    <div className="text-[10px] uppercase font-black text-slate-500 mb-2 tracking-widest">TOP EFFECTS</div>
                                    <div className="flex flex-wrap gap-2">
                                      {item.effects.slice(0, 3).map((eff, i) => (
                                        <Badge key={i} variant="outline" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 text-[10px]">
                                          {eff.name}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {item?.medical && item.medical.length > 0 && (
                                  <div className="text-left">
                                    <div className="text-[10px] uppercase font-black text-slate-500 mb-2 tracking-widest">HELPS WITH</div>
                                    <div className="flex flex-wrap gap-2">
                                      {item.medical.slice(0, 3).map((med, i) => (
                                        <Badge key={i} variant="outline" className="bg-cyan-500/10 border-cyan-500/20 text-cyan-400 text-[10px]">
                                          {med.name}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {item?.negatives && item.negatives.length > 0 && (
                                  <div className="text-left">
                                    <div className="text-[10px] uppercase font-black text-slate-500 mb-2 tracking-widest">NEGATIVES</div>
                                    <div className="flex flex-wrap gap-2">
                                      {item.negatives.slice(0, 2).map((neg, i) => (
                                        <Badge key={i} variant="outline" className="bg-red-500/10 border-red-500/20 text-red-400 text-[10px]">
                                          {neg.name}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <Button 
                                variant="outline"
                                className="w-full h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl"
                                onClick={() => navigate((compareMode === "strains" ? "/strains/" : "/products/") + item?.id)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </React.Fragment>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EDUCATIONAL & DISCOVERY SECTIONS */}
      <section className="py-16 md:py-32 relative">
        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left md:text-center max-w-3xl mx-auto mb-12 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight drop-shadow-lg">Explore & Learn</h2>
            <p className="text-slate-300 text-base md:text-xl font-light drop-shadow-md">Deepen your knowledge and discover new favorites with our curated guides and recommendations.</p>
          </motion.div>

          {/* Cannabis 101 & Beginner Guides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-full">
                <div className="group bg-slate-800/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 p-6 md:p-10 hover:bg-slate-800/60 hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-500 relative overflow-hidden h-full flex flex-col text-left">
                  <div className="absolute top-0 right-0 w-64 md:w-80 h-64 md:h-80 bg-emerald-500/20 rounded-full blur-[80px] -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 relative z-10 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                    <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 relative z-10">Cannabis 101</h3>
                  <p className="text-slate-300 text-sm md:text-base mb-6 md:mb-8 relative z-10 font-light leading-relaxed flex-1">
                    Master the fundamentals of the plant. Dive deep into the science of cannabinoids (THC, CBD, CBN), understand the human endocannabinoid system, explore the botanical differences between Sativa, Indica, and Ruderalis.
                  </p>
                  <div>
                    <Button variant="link" className="text-emerald-400 p-0 h-auto text-base md:text-lg font-semibold hover:text-emerald-300 relative z-10 group-hover:translate-x-2 transition-transform" onClick={() => navigate('/cannabis-101')}>
                      Start Learning →
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="h-full">
                <div className="group bg-slate-800/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 p-6 md:p-10 hover:bg-slate-800/60 hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500 relative overflow-hidden h-full flex flex-col text-left">
                  <div className="absolute top-0 right-0 w-64 md:w-80 h-64 md:h-80 bg-purple-500/20 rounded-full blur-[80px] -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 relative z-10 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                    <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-purple-400" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 relative z-10">Beginner Guides</h3>
                  <p className="text-slate-300 text-sm md:text-base mb-6 md:mb-8 relative z-10 font-light leading-relaxed flex-1">
                    Start your journey safely and confidently. Learn the golden rule of "start low, go slow" for dosing, compare the onset times and durations of smoking vs. edibles vs. tinctures.
                  </p>
                  <div>
                    <Button variant="link" className="text-purple-400 p-0 h-auto text-base md:text-lg font-semibold hover:text-purple-300 relative z-10 group-hover:translate-x-2 transition-transform" onClick={() => navigate('/beginner-guides')}>
                      Read Guides →
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM SECTION WRAPPER */}
          <div className="relative w-full z-10 py-12 md:py-16 px-5 md:px-10 mt-8 md:mt-12">
            
            {/* Partners Section */}
            <div className="mb-24 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-emerald-500/5 rounded-[3rem] p-12 border border-emerald-500/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32"></div>
                  <div className="flex-1 text-center md:text-left relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                      <Handshake className="w-4 h-4" />
                      Partner Network
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none">
                      Grow With <span className="text-emerald-500">CannaHub</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-xl">
                      Are you a cultivator, extractor, or brand owner? Join our elite network of partners and connect with thousands of enthusiasts searching for excellence.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-8 h-14 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-all">
                        <Link to="/partners">Meet Our Partners</Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold px-8 h-14 rounded-2xl">
                        <Link to="/contact">Contact Partnership Team</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 relative z-10 hidden lg:block">
                    <div className="grid grid-cols-3 gap-6">
                      {[
                        "https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/567765313_122181673868364110_2769290054455724014_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEXon0YA6PEnHq3rHC5ZVUX0vHHIKWZsjrS8ccgpZmyOr7BG5BOLVqLRFUf0GpZpkd9lLM5dCF5zdaUGRyZd-QA&_nc_ohc=NKOTF3nomw0Q7kNvwHWIK14&_nc_oc=Adp9xTkIsxoTKC20BJS70sQIkHVGi9RRn2fHvI3V_2DhkmdjqXMzpBifsh5BGPf3aDM&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=R_oH3kdJV4AshoD7xgu2bA&_nc_ss=7b2a8&oh=00_Af2ubfSpzVJmUcY1_40YIH8fgjhZtpn_P5AUr9ktLPJbWw&oe=69F5115E",
                        "https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/559532619_122141857682731851_1172718672696812328_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEz8ch49uZJ-r3DugfCKwb5fyzG7eREQtF_LMbt5ERC0TPmQ5bNCo3xyL9gno8EYhF7lkTIkNQF_6dt_WsUvRna&_nc_ohc=t3xjCY5XsioQ7kNvwG4Nrcx&_nc_oc=Ado57_s4-3fq4hKrYkLoLo7KMnto8uN9Q2nyD0kU75R2LshQC4b-ZBIaCsA8QNaN57Y&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=EUosaPvwjJch3gWgNk9RMA&_nc_ss=7b2a8&oh=00_Af01PA9_2786AUAf5JN8aF2TNOnX_TwzA7E3BdvCgEzWJw&oe=69F4CDEE",
                        "https://scontent.fmnl3-2.fna.fbcdn.net/v/t39.30808-6/632638920_122122190913116172_8460698301278600547_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEVRzKqdREVAeoezL9nm96Cl0k2TIrSuZSXSTZMitK5lPg8U4fFBZHCjnQYEw11yBJbDsI-rmD7m2teOhMbqs8X&_nc_ohc=nJtXXXxR9Q8Q7kNvwGAA59V&_nc_oc=AdpVvmZqygZYqb-0VFjC8lNZMo4Pnl0vE-SCjMML5wQ-pnUphiUJ0r1JW8te-uBjsz8&_nc_zt=23&_nc_ht=scontent.fmnl3-2.fna&_nc_gid=mDVMP_E6_a1KlqGtJsvFSQ&_nc_ss=7b2a8&oh=00_Af0XmkOduaR7S4rzNCzBRO5sw4l72inkuwGHecWm_UaBNg&oe=69F4CF48",
                        "https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/615817644_122167543160786320_7736179422775862762_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHgn8cqonLIQ-IPyfyzxiINJThBswzdby4lOEGzDN1vLkwmA-upAFpvOZ1YnPUXDfwBsoZiFpxLogmKUfdeSfDL&_nc_ohc=WAx4U17aJ5wQ7kNvwHjb4yF&_nc_oc=AdrJP4-h2-zisrGSyhjBnYdlJCi7DO1F2khhMOABaRecHthKCrUah-GtZYRgvnIeNWg&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=w4_JzU-g6VlbHyFhBNfUkA&_nc_ss=7b2a8&oh=00_Af0nNhwlYFeSOmnCp9BI18sHv_Slz9z_ycTSbWZPi9otAw&oe=69F4D513",
                        "https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/463730841_122191353524205656_2720143888227176619_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeE4K-2n_OsZg61mLWvJ2KYdEf-WUjwiDmgR_5ZSPCIOaMvKpvuTj9T2Exxmwv6SUuenHKzG9oTj7Lprd6MU-8UC&_nc_ohc=rsWK4mIa8MgQ7kNvwFv8AKL&_nc_oc=AdpIL7VUDo1B5XOolqsbD-fOkWdyuR6U4uqDtry9N1jdFoNZqZH1oZKdvGCFwccEPIA&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=2GdG0AIoPD5ZLyD0gqZ0DQ&_nc_ss=7b2a8&oh=00_Af222bhmHYf1csKA9zLNtlNPf6-TSVP6Oa91QIupw2SvSw&oe=69F4CD51",
                        "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/590742789_825641453716939_5252265053923730974_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFCmblraAtX13WPH5FZTP_HYAAj50nJhfdgACPnScmF9zXaMUAMXPbhGDHOZDAdWJw_0u_Rv5Bb0noK-pxOTJuN&_nc_ohc=Aa-yF57Yth8Q7kNvwE6Aj74&_nc_oc=AdrVGcRThcBTb6SfIlIfEDaCFl1SLYQaT6Krnxsxz1-b7wfmXJD4RzEdq24j2kAtHt0&_nc_zt=23&_nc_ht=scontent-nrt1-1.xx&_nc_gid=Rp685EV19l-cQjbJ0pnR5Q&_nc_ss=7b2a8&oh=00_Af3DiY9qNYOvUeiAo5jF7dBH5ULiFOifmG7ayr4IdGxVHQ&oe=69F22EF5"
                      ].map((img, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden border border-white/10 aspect-square hover:border-emerald-500/50 transition-colors shadow-2xl">
                          <img src={img} className="w-full h-full object-cover transition-transform hover:scale-110 duration-700" alt="Partner thumbnail" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              {/* Understanding Effects and Terpenes */}
              <div className="mb-16 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10 text-left"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0">
                  <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Understanding Effects & Terpenes</h3>
              </div>
              <Button variant="outline" asChild className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white backdrop-blur-md w-full md:w-auto">
                <Link to="/terpenes-guide">View Complete Guide</Link>
              </Button>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { name: "Myrcene", effect: "Relaxing & Sedating", desc: "Earthy and musky. Promotes deep physical relaxation, sedation ('couch-lock'), and muscle tension relief. Also found in mangoes and hops.", icon: Moon, color: "text-indigo-400", bg: "bg-indigo-500/20", border: "border-indigo-500/30", shadow: "shadow-[0_0_20px_rgba(99,102,241,0.3)]" },
                { name: "Limonene", effect: "Uplifting & Stress Relief", desc: "Bright citrus profile. Highly sought after for mood elevation, anxiety reduction, and stress relief. Also found in lemon rinds.", icon: Sun, color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30", shadow: "shadow-[0_0_20px_rgba(234,179,8,0.3)]" },
                { name: "Pinene", effect: "Focus & Alertness", desc: "Crisp pine scent. Promotes alertness, memory retention, and counteracts some THC fog. Also acts as a bronchodilator. Found in pine needles.", icon: Wind, color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30", shadow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]" },
                { name: "Caryophyllene", effect: "Pain Relief & Anti-inflammatory", desc: "Spicy and peppery. Uniquely binds to CB2 receptors to manage chronic pain and inflammation without psychoactive effects. Found in black pepper.", icon: Flame, color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30", shadow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]" },
              ].map((terpene, idx) => {
                const Icon = terpene.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="h-full">
                      <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-slate-800/60 transition-all duration-500 cursor-pointer group relative overflow-hidden flex flex-col h-full text-left">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${terpene.bg} border ${terpene.border} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:${terpene.shadow} transition-all duration-500 relative z-10 shrink-0`}>
                          <Icon className={`h-6 w-6 md:h-8 md:w-8 ${terpene.color} drop-shadow-lg`} />
                          {/* Particle effect on hover */}
                          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:animate-ping bg-white/20 transition-opacity duration-300"></div>
                        </div>
                        <h4 className="text-lg md:text-xl font-bold text-white mb-1 relative z-10">{terpene.name}</h4>
                        <p className={`font-medium text-xs md:text-sm mb-2 md:mb-3 relative z-10 ${terpene.color}`}>{terpene.effect}</p>
                        <p className="text-slate-400 text-xs md:text-sm font-light relative z-10 leading-relaxed flex-1">{terpene.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Strain Recommendations */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10 text-left"
            >
              <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0">
                <ThumbsUp className="h-5 w-5 md:h-6 md:w-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Curated Recommendations</h3>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { 
                  title: "Best for Sleep", 
                  desc: "Heavy, myrcene-rich indicas designed to combat insomnia. These strains deliver profound physical relaxation, melting away muscle tension and quieting racing thoughts.", 
                  image: "https://wallpapers.com/images/featured/moon-background-mqcx9pq0fg2ma4lp.jpg",
                  strains: ["granddaddy-purple", "northern-lights", "bubba-kush"]
                },
                { 
                  title: "Creative Focus", 
                  desc: "Uplifting, limonene and pinene-heavy sativas perfect for art, music, and brainstorming. Experience a cerebral rush of euphoric energy that enhances lateral thinking.", 
                  image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
                  strains: ["blue-dream", "jack-herer", "amnesia-haze"]
                },
                { 
                  title: "Social Gatherings", 
                  desc: "Perfectly balanced hybrids offering the best of both worlds. Enjoy a bubbly, talkative head high paired with a relaxed body feel. Ideal for laughing and chatting.", 
                  image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
                  strains: ["gelato", "wedding-cake", "pineapple-express"]
                },
              ].map((rec, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  onClick={() => setSelectedRecommendation(rec)}
                >
                  <div className="h-full">
                    <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer border border-white/10 shadow-2xl h-full text-left">
                      <div className="absolute inset-0">
                        <img src={rec.image} alt={rec.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-100 group-hover:opacity-30" referrerPolicy="no-referrer" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 border-2 border-emerald-500/0 group-hover:border-emerald-500/30 rounded-3xl transition-colors duration-500 z-20 pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-10 flex flex-col justify-end transition-all duration-500 group-hover:translate-y-[-10px]">
                        <h4 className="text-xl md:text-2xl font-bold text-white mb-0 group-hover:mb-3 group-hover:text-emerald-400 transition-all duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{rec.title}</h4>
                        <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-32 opacity-0 group-hover:opacity-100">
                          <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed line-clamp-3">{rec.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendation Modal */}
      <AnimatePresence>
        {selectedRecommendation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecommendation(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            ></motion.div>

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedRecommendation(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Image/Info */}
              <div className="w-full md:w-2/5 relative h-48 md:h-auto overflow-hidden group">
                <img src={selectedRecommendation.image} className="w-full h-full object-cover opacity-60" alt={selectedRecommendation.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-4 px-3 py-1 font-black tracking-widest uppercase">Curated Guide</Badge>
                  <h3 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter mb-4">{selectedRecommendation.title}</h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">{selectedRecommendation.desc}</p>
                </div>
              </div>

              {/* Recommended Strains */}
              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-slate-900/40">
                <div className="mb-8">
                  <h4 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-2">Recommended Strains</h4>
                  <p className="text-slate-500 text-xs">Based on terpene profile and user feedback.</p>
                </div>

                <div className="space-y-4">
                  {selectedRecommendation.strains.map((strainId) => {
                    const strain = STRAINS.find(s => s.id === strainId);
                    if (!strain) return null;
                    return (
                      <motion.div 
                        key={strain.id}
                        whileHover={{ x: 10 }}
                        className="group bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all cursor-pointer flex items-center gap-5"
                        onClick={() => {
                          setSelectedRecommendation(null);
                          navigate(`/strains/${strain.id}`);
                        }}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                          <img src={strain.image} className="w-full h-full object-cover" alt={strain.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h5 className="text-base font-bold text-white group-hover:text-emerald-400 truncate">{strain.name}</h5>
                            <Badge variant="outline" className="text-[10px] bg-slate-900 border-white/10 text-slate-400 group-hover:border-emerald-500/30 group-hover:text-emerald-400 uppercase tracking-tighter shrink-0">{strain.type}</Badge>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-xs font-bold text-slate-300">{strain.rating}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-[0.1em]">THC {strain.thc}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-10 pt-8 border-t border-white/5">
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-black h-14 rounded-2xl text-lg uppercase tracking-tight"
                    onClick={() => {
                      setSelectedRecommendation(null);
                      navigate('/strains');
                    }}
                  >
                    Explore all Strains
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
