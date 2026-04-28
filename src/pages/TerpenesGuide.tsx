import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun, Wind, Flame, Flower2, Sprout, Zap, Leaf } from 'lucide-react';

const TERPENES = [
  { 
    name: "Myrcene", 
    effect: "Relaxing & Sedating", 
    desc: "The most abundant terpene in modern cannabis. Earthy, musky, and clove-like. Promotes deep physical relaxation, sedation ('couch-lock'), and muscle tension relief. Known to enhance THC's psychoactive effects by increasing blood-brain barrier permeability.", 
    foundIn: "Mangoes, hops, thyme, lemongrass",
    strains: "Blue Dream, Granddaddy Purple, OG Kush",
    boilingPoint: "334°F (167°C)",
    icon: Moon, 
    color: "text-indigo-400", 
    bg: "bg-indigo-500/20", 
    border: "border-indigo-500/30", 
    shadow: "shadow-[0_0_30px_rgba(99,102,241,0.3)]" 
  },
  { 
    name: "Limonene", 
    effect: "Uplifting & Stress Relief", 
    desc: "Characterized by a bright, zesty citrus profile. Highly sought after for its mood-elevating properties, anxiety reduction, and stress relief. Often found in strains that provide a cerebral, euphoric buzz.", 
    foundIn: "Lemon rinds, orange peels, juniper, peppermint",
    strains: "Wedding Cake, MAC, Strawberry Banana",
    boilingPoint: "349°F (176°C)",
    icon: Sun, 
    color: "text-yellow-400", 
    bg: "bg-yellow-500/20", 
    border: "border-yellow-500/30", 
    shadow: "shadow-[0_0_30px_rgba(234,179,8,0.3)]" 
  },
  { 
    name: "Pinene", 
    effect: "Focus & Alertness", 
    desc: "Delivers a crisp, refreshing pine scent. Unique among terpenes for promoting alertness and memory retention, often counteracting the short-term memory loss (brain fog) associated with THC. Also acts as a natural bronchodilator.", 
    foundIn: "Pine needles, rosemary, basil, parsley",
    strains: "Snoop's Dream, Critical Mass, Dutch Treat",
    boilingPoint: "311°F (155°C)",
    icon: Wind, 
    color: "text-emerald-400", 
    bg: "bg-emerald-500/20", 
    border: "border-emerald-500/30", 
    shadow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]" 
  },
  { 
    name: "Caryophyllene", 
    effect: "Pain Relief & Anti-inflammatory", 
    desc: "Spicy, peppery, and woody. This is the only known terpene that also acts as a cannabinoid, binding directly to CB2 receptors in the body's endocannabinoid system to manage chronic pain and inflammation without psychoactive effects.", 
    foundIn: "Black pepper, cloves, cinnamon",
    strains: "GSC (Girl Scout Cookies), Sour Diesel, Chemdawg",
    boilingPoint: "266°F (130°C)",
    icon: Flame, 
    color: "text-red-400", 
    bg: "bg-red-500/20", 
    border: "border-red-500/30", 
    shadow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]" 
  },
  { 
    name: "Linalool", 
    effect: "Calming & Anti-Anxiety", 
    desc: "Recognizable by its delicate floral aroma. Linalool is famous for its powerful calming, anti-anxiety, and stress-relieving properties. It heavily contributes to the deeply relaxing effects of many indica-dominant strains.", 
    foundIn: "Lavender, birch bark, rose, coriander",
    strains: "Do-Si-Dos, Kosher Kush, Zkittlez",
    boilingPoint: "390°F (198°C)",
    icon: Flower2, 
    color: "text-purple-400", 
    bg: "bg-purple-500/20", 
    border: "border-purple-500/30", 
    shadow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]" 
  },
  { 
    name: "Humulene", 
    effect: "Appetite Suppressant", 
    desc: "Earthy, woody, and slightly spicy. Unlike most cannabis strains that stimulate the appetite (the 'munchies'), strains high in humulene are actually known to act as an appetite suppressant while providing anti-inflammatory benefits.", 
    foundIn: "Hops, ginseng, sage, coriander",
    strains: "Gelato, Sherbert, Original Glue (GG4)",
    boilingPoint: "225°F (107°C)",
    icon: Sprout, 
    color: "text-orange-400", 
    bg: "bg-orange-500/20", 
    border: "border-orange-500/30", 
    shadow: "shadow-[0_0_30px_rgba(249,115,22,0.3)]" 
  },
  { 
    name: "Terpinolene", 
    effect: "Uplifting & Complex", 
    desc: "A complex aroma that is simultaneously piney, floral, herbaceous, and slightly fruity. About one in ten strains is terpinolene-dominant. It is generally associated with uplifting, energizing, and cerebral effects.", 
    foundIn: "Lilacs, nutmeg, cumin, apples",
    strains: "Jack Herer, Ghost Train Haze, Dutch Treat",
    boilingPoint: "366°F (186°C)",
    icon: Zap, 
    color: "text-cyan-400", 
    bg: "bg-cyan-500/20", 
    border: "border-cyan-500/30", 
    shadow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]" 
  },
  { 
    name: "Ocimene", 
    effect: "Decongestant & Antiviral", 
    desc: "Sweet, fragrant, and herbaceous with subtle citrus and woody undertones. Ocimene is known for its antiviral, antibacterial, and decongestant properties. It often induces coughing when smoked due to its decongestant nature.", 
    foundIn: "Mint, parsley, pepper, basil, orchids",
    strains: "Clementine, Dream Queen, Golden Goat",
    boilingPoint: "122°F (50°C)",
    icon: Leaf, 
    color: "text-pink-400", 
    bg: "bg-pink-500/20", 
    border: "border-pink-500/30", 
    shadow: "shadow-[0_0_30px_rgba(244,114,182,0.3)]" 
  }
];

export function TerpenesGuide() {
  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <Sparkles className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">The Complete Terpene Guide</h1>
          <p className="text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
            Terpenes are the aromatic oils that give cannabis varieties distinctive flavors like citrus, berry, mint, and pine. More importantly, they play a key role in differentiating the effects of various cannabis strains.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TERPENES.map((terpene, idx) => {
            const Icon = terpene.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 2) * 0.1, duration: 0.6 }}
                className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 hover:bg-slate-800/60 transition-all duration-500 group relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex items-start gap-6 relative z-10 mb-6">
                  <div className={`w-20 h-20 rounded-2xl ${terpene.bg} border ${terpene.border} flex items-center justify-center group-hover:scale-110 group-hover:${terpene.shadow} transition-all duration-500 shrink-0`}>
                    <Icon className={`h-10 w-10 ${terpene.color} drop-shadow-lg`} />
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:animate-ping bg-white/20 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{terpene.name}</h3>
                    <p className={`text-lg font-medium ${terpene.color}`}>{terpene.effect}</p>
                  </div>
                </div>

                <p className="text-slate-300 text-base font-light leading-relaxed mb-8 flex-1 relative z-10">
                  {terpene.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 mt-auto pt-6 border-t border-white/10">
                  <div>
                    <span className="block text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Also Found In</span>
                    <span className="text-sm text-slate-300">{terpene.foundIn}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Common Strains</span>
                    <span className="text-sm text-slate-300">{terpene.strains}</span>
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <span className="block text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Boiling Point</span>
                    <span className="text-sm text-slate-300">{terpene.boilingPoint}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
