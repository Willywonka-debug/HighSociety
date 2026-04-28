import { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Star, TrendingUp, Zap, Clock, Trophy, Medal, Wind, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { STRAINS } from "@/data/strains";
import { PRODUCTS } from "./Products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';


// Mock quarterly leaderboard data for Strains
const QUARTERLY_STRAIN_DATA = {
  Q1: [
    { name: 'Gelato', score: 98, growth: '+12%', rank: 1 },
    { name: 'Blue Dream', score: 88, growth: '+5%', rank: 2 },
    { name: 'Wedding Cake', score: 82, growth: '+18%', rank: 3 },
    { name: 'OG Kush', score: 75, growth: '-2%', rank: 4 },
    { name: 'Sour Diesel', score: 68, growth: '+3%', rank: 5 },
    { name: 'Runtz', score: 62, growth: '+25%', rank: 6 },
  ],
  Q2: [
    { name: 'Runtz', score: 95, growth: '+30%', rank: 1 },
    { name: 'Wedding Cake', score: 89, growth: '+15%', rank: 2 },
    { name: 'Gelato', score: 85, growth: '-5%', rank: 3 },
    { name: 'Granddaddy Purple', score: 78, growth: '+20%', rank: 4 },
    { name: 'Blue Dream', score: 72, growth: '+2%', rank: 5 },
    { name: 'OG Kush', score: 65, growth: '+10%', rank: 6 },
  ],
  Q3: [
    { name: 'Sour Diesel', score: 92, growth: '+28%', rank: 1 },
    { name: 'OG Kush', score: 88, growth: '+12%', rank: 2 },
    { name: 'Northern Lights', score: 84, growth: '+15%', rank: 3 },
    { name: 'Blue Dream', score: 79, growth: '+8%', rank: 4 },
    { name: 'Runtz', score: 70, growth: '-10%', rank: 5 },
    { name: 'Gelato', score: 65, growth: '+5%', rank: 6 },
  ],
  Q4: [
    { name: 'Wedding Cake', score: 96, growth: '+25%', rank: 1 },
    { name: 'Northern Lights', score: 90, growth: '+18%', rank: 2 },
    { name: 'Granddaddy Purple', score: 82, growth: '+12%', rank: 3 },
    { name: 'Sour Diesel', score: 78, growth: '+5%', rank: 4 },
    { name: 'OG Kush', score: 72, growth: '+2%', rank: 5 },
    { name: 'Runtz', score: 68, growth: '+15%', rank: 6 },
  ]
};

// Mock quarterly leaderboard data for Vapes
const QUARTERLY_VAPE_DATA = {
  Q1: [
    { name: 'FRYD', score: 95, growth: '+22%', rank: 1 },
    { name: 'YANA', score: 92, growth: '+15%', rank: 2 },
    { name: 'TINY', score: 85, growth: '+8%', rank: 3 },
    { name: 'MUHAMEDS', score: 78, growth: '+12%', rank: 4 },
    { name: 'Jeeter Juice', score: 72, growth: '-5%', rank: 5 },
    { name: 'THE 10/10', score: 65, growth: '+10%', rank: 6 },
  ],
  Q2: [
    { name: 'YANA', score: 97, growth: '+25%', rank: 1 },
    { name: 'FRYD', score: 90, growth: '+10%', rank: 2 },
    { name: 'TINY', score: 86, growth: '+18%', rank: 3 },
    { name: 'MUHAMEDS', score: 82, growth: '+5%', rank: 4 },
    { name: 'THE 10/10', score: 75, growth: '+12%', rank: 5 },
    { name: 'Jeeter Juice', score: 68, growth: '+2%', rank: 6 },
  ],
  Q3: [
    { name: 'TINY', score: 94, growth: '+20%', rank: 1 },
    { name: 'FRYD', score: 91, growth: '+15%', rank: 2 },
    { name: 'YANA', score: 84, growth: '-5%', rank: 3 },
    { name: 'THE 10/10', score: 80, growth: '+12%', rank: 4 },
    { name: 'Jeeter Juice', score: 72, growth: '+5%', rank: 5 },
    { name: 'MUHAMEDS', score: 68, growth: '+2%', rank: 6 },
  ],
  Q4: [
    { name: 'THE 10/10', score: 96, growth: '+30%', rank: 1 },
    { name: 'FRYD', score: 92, growth: '+22%', rank: 2 },
    { name: 'YANA', score: 85, growth: '+10%', rank: 3 },
    { name: 'Jeeter Juice', score: 80, growth: '+5%', rank: 4 },
    { name: 'MUHAMDEDS', score: 75, growth: '+2%', rank: 5 },
    { name: 'TINY', score: 70, growth: '+8%', rank: 6 },
  ]
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0f16] border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-white font-bold mb-1">{label}</p>
        <p className="items-center flex gap-2 text-sm text-emerald-400">
          Popularity Index: <span className="font-mono">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function Trending() {
  const [activeCategory, setActiveCategory] = useState<'strains' | 'vapes'>('strains');
  const [selectedQuarter, setSelectedQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q2');
  const [selectedYear] = useState('2026');
  
  const currentData = activeCategory === 'strains' 
    ? QUARTERLY_STRAIN_DATA[selectedQuarter] 
    : QUARTERLY_VAPE_DATA[selectedQuarter];
  const isStrains = activeCategory === 'strains';

  // Slice differently based on quarter to show dynamic "Hottest Samples" and "New Arrivals"
  const qIndex = (['Q1', 'Q2', 'Q3', 'Q4'] as const).indexOf(selectedQuarter);
  const displayTrendingStrains = STRAINS.slice(qIndex, qIndex + 6);
  const displayNewProducts = PRODUCTS.slice(qIndex, qIndex + 4);

  return (
    <div className="container mx-auto px-4 py-12 relative z-10">
      <div className="flex flex-col gap-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold tracking-wider uppercase mb-2"
          >
            <TrendingUp className="h-4 w-4" />
            Live Market Trends
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter"
          >
            Trending & <span className="text-emerald-500 italic">New Drops</span>
          </motion.h1>
          
          {/* Category Switcher */}
          <div className="flex justify-center mt-8">
            <div className="flex p-1.5 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl relative overflow-hidden group">
              <motion.div 
                className="absolute bg-emerald-500 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                initial={false}
                animate={{
                  x: isStrains ? 0 : '100%',
                  width: isStrains ? '120px' : '120px',
                  height: '40px'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              <button
                onClick={() => setActiveCategory('strains')}
                className={`relative z-10 w-[120px] h-10 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${isStrains ? 'text-slate-900' : 'text-slate-500 hover:text-slate-400'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Leaf className="h-3.5 w-3.5" />
                  Strains
                </div>
              </button>
              <button
                onClick={() => setActiveCategory('vapes')}
                className={`relative z-10 w-[120px] h-10 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${!isStrains ? 'text-slate-900' : 'text-slate-500 hover:text-slate-400'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Wind className="h-3.5 w-3.5" />
                  Vapes
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Global Leaderboard Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + '-chart'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-[#1F2937]/20 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col h-[500px] overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isStrains ? 'bg-emerald-500/10' : 'bg-cyan-500/10'}`}>
                    {isStrains ? <TrendingUp className="h-5 w-5 text-emerald-400" /> : <Wind className="h-5 w-5 text-cyan-400" />}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight">
                    {isStrains ? 'Popularity Graph' : 'Vapes Popularity Graph'}
                  </h3>
                </div>
                <div className={`px-3 py-1.5 rounded-xl border border-white/10 bg-slate-950/60 flex flex-col items-center justify-center min-w-[85px] self-end sm:self-auto ${isStrains ? 'text-emerald-400' : 'text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]'}`}>
                  <span className="text-[10px] font-bold leading-none mb-1 opacity-70 uppercase">Last 7</span>
                  <span className="text-sm font-black leading-none uppercase">Days</span>
                </div>
              </div>
              
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData} margin={{ top: 10, right: 10, left: -15, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                      interval={0}
                      height={70}
                      angle={-45}
                      textAnchor="end"
                      dx={-5}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 10 }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                    <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={32}>
                      {currentData.map((_entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={isStrains ? 
                            (index === 0 ? '#10b981' : index === 1 ? '#34d399' : index === 2 ? '#6ee7b7' : '#10b98140') :
                            (index === 0 ? '#06b6d4' : index === 1 ? '#22d3ee' : index === 2 ? '#67e8f9' : '#06b6d440')
                          } 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + '-ranking'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-[#1F2937]/20 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col h-[500px]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isStrains ? 'bg-yellow-500/10' : 'bg-cyan-500/10'}`}>
                    <Trophy className={`h-5 w-5 ${isStrains ? 'text-yellow-500' : 'text-cyan-400'}`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight">
                    {isStrains ? 'Top Ranking Strains' : 'Top Ranking Vapes'}
                  </h3>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <div className="flex bg-slate-900/50 rounded-xl p-1 border border-white/5">
                    {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => setSelectedQuarter(q)}
                        className={`text-[10px] sm:text-xs font-black px-2.5 py-1.5 rounded-lg transition-all ${
                          selectedQuarter === q 
                            ? (isStrains ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]')
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                  <div className={`px-3 py-1.5 rounded-xl border border-white/10 bg-slate-950/60 flex flex-col items-center justify-center min-w-[65px] ${isStrains ? 'text-emerald-400' : 'text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]'}`}>
                    <span className="text-[10px] font-bold leading-none mb-1 opacity-70">{selectedYear}</span>
                    <span className="text-sm font-black leading-none uppercase">{selectedQuarter}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {currentData.map((item, idx) => (
                  <div 
                    key={item.name}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        idx === 0 ? (isStrains ? 'bg-yellow-500/20 text-yellow-500' : 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]') :
                        idx === 1 ? 'bg-slate-400/20 text-slate-400' :
                        idx === 2 ? 'bg-amber-700/20 text-amber-700' :
                        'bg-white/5 text-slate-500'
                      }`}>
                        {idx < 3 ? <Medal className="h-4 w-4" /> : item.rank}
                      </div>
                      <div>
                        <h4 className={`text-white font-bold group-hover:${isStrains ? 'text-emerald-400' : 'text-cyan-400'} transition-colors uppercase tracking-tight text-sm`}>{item.name}</h4>
                        <div className="flex items-center gap-2">
                           <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                              <div className={`h-full ${isStrains ? 'bg-emerald-500' : 'bg-cyan-500'}`} style={{ width: `${item.score}%` }} />
                           </div>
                           <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{item.score} INDEX</span>
                        </div>
                      </div>
                    </div>
                    <div className={`text-xs font-mono font-bold ${item.growth.startsWith('+') ? (isStrains ? 'text-emerald-400' : 'text-cyan-400') : 'text-red-400'}`}>
                      {item.growth}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Trending Strains Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-orange-500/10 rounded-xl border border-orange-500/20">
              <Flame className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Hottest Samples</h2>
              <p className="text-sm text-slate-500">Strains gaining the most traction this week</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTrendingStrains.map((strain, i) => (
              <motion.div
                key={strain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/strains/${strain.id}`} className="group block bg-[#1F2937]/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-500 h-full">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={strain.image}
                      alt={strain.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-orange-600/90 hover:bg-orange-500 text-white border-none backdrop-blur-md px-3 shadow-[0_0_15px_rgba(249,115,22,0.3)]">Trending</Badge>
                      <Badge className="bg-emerald-500/90 text-slate-950 font-bold border-none backdrop-blur-md px-3">{strain.type}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2 text-white">
                      <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{strain.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-sm">{strain.rating}</span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {strain.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <span className="text-xs font-bold text-emerald-500 uppercase">THC: {strain.thc}</span>
                      <Button variant="ghost" className="h-8 px-3 text-xs text-slate-300 hover:text-white hover:bg-emerald-500/10 rounded-lg">View Profile</Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* New Drops Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <Zap className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">New Arrivals</h2>
              <p className="text-sm text-slate-500">Fresh imports and latest botanical drops</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayNewProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + (i * 0.05) }}
              >
                <Link to={`/products/${product.id}`} className="group block bg-[#1F2937]/30 backdrop-blur-md border border-white/5 rounded-2xl p-5 hover:border-cyan-500/40 transition-all duration-500 h-full text-left">
                  <div className="aspect-square relative flex items-center justify-center p-4 bg-white/5 rounded-xl mb-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain grayscale-[0.2] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2">
                      <div className="p-1 px-2.5 bg-cyan-500 rounded-lg text-[10px] font-bold text-slate-900 uppercase tracking-tighter animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.5)]">New</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-cyan-500 uppercase mb-1">{product.brand}</div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-4 line-clamp-1 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Just Added</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
