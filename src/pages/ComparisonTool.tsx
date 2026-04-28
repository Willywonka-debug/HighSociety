import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Scale, Star, Zap, Droplets, Trophy, ArrowRightLeft, Trash2, Wind, Box, Zap as Battery } from "lucide-react";
import { STRAINS } from "@/data/strains";
import { PRODUCTS } from "./Products"; // Products are exported from Products.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Mode = "strains" | "vapes";

interface ItemData {
  id: string;
  name: string;
  brand?: string;
  type: string;
  category?: string;
  thc: string;
  cbd: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  effects: { name: string; val: number }[];
  medical?: { name: string; val: number }[];
  negatives?: { name: string; val: number }[];
}

export function ComparisonTool() {
  const [mode, setMode] = useState<Mode>("strains");
  const [selectedItems, setSelectedItems] = useState<(ItemData | null)[]>([null, null, null]);
  const [searchQueries, setSearchQueries] = useState<string[]>(["", "", ""]);
  const [showSuggestions, setShowSuggestions] = useState<number | null>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Clear selections when switching modes
  useEffect(() => {
    setSelectedItems([null, null, null]);
    setSearchQueries(["", "", ""]);
  }, [mode]);

  const handleSelectItem = (index: number, item: ItemData) => {
    const newSelected = [...selectedItems];
    newSelected[index] = item;
    setSelectedItems(newSelected);
    
    const newQueries = [...searchQueries];
    newQueries[index] = "";
    setSearchQueries(newQueries);
    setShowSuggestions(null);
  };

  const handleClearSlot = (index: number) => {
    const newSelected = [...selectedItems];
    newSelected[index] = null;
    setSelectedItems(newSelected);
  };

  const handleSwap = (index1: number, index2: number) => {
    const newSelected = [...selectedItems];
    const temp = newSelected[index1];
    newSelected[index1] = newSelected[index2];
    newSelected[index2] = temp;
    setSelectedItems(newSelected);
  };

  const getSuggestions = (query: string) => {
    if (mode === "strains") {
      const data = STRAINS as unknown as ItemData[];
      if (!query) return data.slice(0, 5);
      return data.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
    } else {
      const data = (PRODUCTS as unknown as ItemData[]).filter(p => p.category === "Vapes");
      if (!query) return data.slice(0, 5);
      return data.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold tracking-wider uppercase mb-4"
        >
          <Scale className="h-4 w-4" />
          Comparison Engine
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8">
          Compare <span className="text-emerald-500 italic">Side-by-Side</span>
        </h1>

        {/* Mode Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md relative overflow-hidden group">
            <motion.div 
              className="absolute rounded-xl z-0"
              initial={false}
              animate={{
                x: mode === "strains" ? 0 : "100%",
                backgroundColor: mode === "strains" ? "#10b981" : "#06b6d4", // emerald-500 : cyan-500
                boxShadow: mode === "strains" ? "0 0 20px rgba(16,185,129,0.4)" : "0 0 20px rgba(6,182,212,0.4)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                width: "125px", // Approx width of the buttons
                height: "44px",
                top: "6px",
                left: "6px"
              }}
            />
            <button
              onClick={() => setMode("strains")}
              className={`relative z-10 flex items-center justify-center gap-2 w-[125px] h-11 rounded-xl text-sm font-bold tracking-tight transition-colors duration-300 ${
                mode === "strains" 
                ? "text-white" 
                : "text-slate-400 hover:text-white"
              }`}
            >
              <Zap className={`w-4 h-4 ${mode === "strains" ? "animate-pulse" : ""}`} /> Strains
            </button>
            <button
              onClick={() => setMode("vapes")}
              className={`relative z-10 flex items-center justify-center gap-2 w-[125px] h-11 rounded-xl text-sm font-bold tracking-tight transition-colors duration-300 ${
                mode === "vapes" 
                ? "text-white" 
                : "text-slate-400 hover:text-white"
              }`}
            >
              <Wind className={`w-4 h-4 ${mode === "vapes" ? "animate-pulse" : ""}`} /> Vapes
            </button>
          </div>
        </div>

        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">
          Compare potency, profile, and performance targets to find your precise botanical {mode === "vapes" ? "device" : "match"}.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {selectedItems.map((item, index) => (
            <div key={`${mode}-${index}`} className="relative space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Comp Slot {index + 1}</span>
                {item && (
                  <div className="flex gap-2">
                    {index < 2 && (
                      <button 
                        onClick={() => handleSwap(index, index + 1)}
                        className={`p-1 transition-colors ${mode === "vapes" ? "hover:text-cyan-400" : "hover:text-emerald-400"} text-slate-500`}
                        title="Swap"
                      >
                        <ArrowRightLeft className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleClearSlot(index)}
                      className="p-1 hover:text-red-400 text-slate-500 transition-colors"
                      title="Clear"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {!item ? (
                <div className="relative group" onClick={(e) => e.stopPropagation()}>
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className={`h-4 w-4 text-slate-500 group-focus-within:transition-colors z-10 ${mode === "vapes" ? "group-focus-within:text-cyan-400" : "group-focus-within:text-emerald-400"}`} />
                  </div>
                  <Input
                    placeholder={`Search ${mode === "vapes" ? "vapes" : "strains"}...`}
                    value={searchQueries[index]}
                    onChange={(e) => {
                      const newQueries = [...searchQueries];
                      newQueries[index] = e.target.value;
                      setSearchQueries(newQueries);
                      setShowSuggestions(index);
                    }}
                    onFocus={() => setShowSuggestions(index)}
                    onClick={() => setShowSuggestions(index)}
                    className={`h-12 pl-10 bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder:text-slate-500 text-sm transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)] focus-visible:ring-1 ${mode === "vapes" ? "focus-visible:ring-cyan-500" : "focus-visible:ring-emerald-500"}`}
                  />
                  <AnimatePresence>
                    {showSuggestions === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={`absolute z-50 w-full mt-2 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] ${mode === "vapes" ? "border-t-cyan-500/50" : "border-t-emerald-500/50"}`}
                      >
                        {getSuggestions(searchQueries[index]).length > 0 ? (
                          getSuggestions(searchQueries[index]).map((suggestion) => (
                            <button
                              key={suggestion.id}
                              onClick={() => handleSelectItem(index, suggestion)}
                              className={`w-full flex items-center gap-3 p-3 text-left transition-colors group ${mode === "vapes" ? "hover:bg-cyan-500/10" : "hover:bg-emerald-500/10"}`}
                            >
                              <img src={suggestion.image} className="w-10 h-10 rounded-lg object-cover bg-white/5" alt={suggestion.name} referrerPolicy="no-referrer" />
                              <div>
                                <div className={`text-sm font-bold text-white transition-colors ${mode === "vapes" ? "group-hover:text-cyan-400" : "group-hover:text-emerald-400"}`}>{suggestion.name}</div>
                                <div className="text-[10px] text-slate-500 uppercase">{suggestion.brand || suggestion.type} • {suggestion.thc.includes('%') ? suggestion.thc : 'High'} THC</div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="p-4 text-xs text-slate-500 text-center italic">No results found</div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-slate-900/40 backdrop-blur-xl border rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group h-full flex flex-col ${mode === "vapes" ? "border-cyan-500/10 hover:border-cyan-500/40 hover:shadow-cyan-500/10" : "border-emerald-500/10 hover:border-emerald-500/40 hover:shadow-emerald-500/10"}`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70"></div>
                    <Badge className="absolute top-3 left-3 bg-slate-950/80 text-white border-white/10">{item.type || item.category}</Badge>
                    {item.brand && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 p-1 px-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/10">
                        <Box className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{item.brand}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 space-y-6">
                    <div className="space-y-1">
                      <h3 className={`text-2xl font-black text-white transition-colors uppercase tracking-tight ${mode === "vapes" ? "group-hover:text-cyan-400" : "group-hover:text-emerald-400"}`}>{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-bold text-white">{item.rating}</span>
                          <span className="text-slate-500 text-xs">({item.reviews})</span>
                        </div>
                        {mode === "vapes" && (
                           <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded">
                             <Battery className="w-3 h-3" /> Labs Done
                           </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          <span>THC Content</span>
                          <span className={mode === "vapes" ? "text-cyan-400" : "text-emerald-400"}>{item.thc}</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: item.thc.includes('-') ? '90%' : item.thc.includes('%') ? item.thc : '100%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${mode === "vapes" ? "bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]"}`}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          <span>CBD Profile</span>
                          <span className="text-slate-300">{item.cbd || '0.1%'}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "20%" }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-slate-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Zap className={`w-3 h-3 ${mode === "vapes" ? "text-cyan-400" : "text-yellow-400"}`} /> Primary Effects
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {item.effects.slice(0, 3).map((e, i) => (
                          <Badge key={i} variant="outline" className={`text-[9px] bg-white/5 border-white/5 text-slate-300 font-medium ${mode === "vapes" ? "hover:border-cyan-500/40" : "hover:border-emerald-500/40"}`}>
                            {e.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Droplets className={mode === "vapes" ? "text-cyan-400" : "text-emerald-400"} /> Flavor Profile
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-light italic">
                        {item.description.split('.')[0]}.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => setSelectedItems([null, null, null])}
          className="border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-slate-300 min-h-[44px] px-10 rounded-2xl transition-all"
        >
          <Trash2 className="w-4 h-4 mr-2" /> Reset {mode === "vapes" ? "Vapes" : "Strain"}
        </Button>
      </div>

      {/* Feature Highlight */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-slate-900/80 to-emerald-900/10 backdrop-blur-3xl border border-white/10 relative overflow-hidden"
      >
        <div className={`absolute top-0 right-0 w-80 h-80 blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-30 ${mode === "vapes" ? "bg-cyan-500/20" : "bg-emerald-500/20"}`}></div>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className={`inline-flex px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${mode === "vapes" ? "bg-cyan-500/10 text-cyan-400" : "bg-emerald-500/10 text-emerald-400"}`}>
              {mode === "vapes" ? "Vapor Dynamics" : "Botany AI"}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1]">
              Engineered for <br /> <span className={`italic ${mode === "vapes" ? "text-cyan-500" : "text-emerald-500"}`}>{mode === "vapes" ? "Performance" : "Clarity"}</span>.
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg font-light">
              Our 2026 data model integrates real-time terpene analysis and hardware efficiency metrics. {mode === "vapes" ? "Compare internal coil temperature, battery longevity, and extract purity across leading brands." : "Explore the genetic lineage and clinical effects of authorized medical-grade strains."}
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${mode === "vapes" ? "bg-cyan-500/10 text-cyan-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black text-white uppercase tracking-tighter">Certified</div>
                  <div className="text-[10px] text-slate-500 uppercase">Quality Grade</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${mode === "vapes" ? "bg-cyan-500/10 text-cyan-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black text-white uppercase tracking-tighter">Fast-Acting</div>
                  <div className="text-[10px] text-slate-500 uppercase">Kinetic Matrix</div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
             <div className={`absolute inset-0 blur-[100px] rounded-full opacity-20 scale-75 ${mode === "vapes" ? "bg-cyan-500/40" : "bg-emerald-500/40"}`}></div>
             <img 
               src={mode === "vapes" ? "https://lh4.googleusercontent.com/proxy/fdjAXHgTfg4IXkI6Dk3BLhoK4pcfbZUbmBlDvgdkyc_KMdK0SQMrQBzeQ3fUb5jhnB66Xpb3n36V5WPfKgct9Ej3yfY076gcSs7GGgvFL_HbNOmW1qwXZl63ZKSoOFqtGvND__fMbGQm" : "https://images.nightcafe.studio/galleries/bBjqJf5zf8JZgclQN7jp/psychedelic_cannabis_leaf_patterns_swirling--1--qfcv5.jpg"} 
               className="rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 border border-white/10 group-hover:scale-[1.02] transition-transform duration-700 aspect-square object-cover" 
               alt="" 
             />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
