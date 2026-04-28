import { motion } from 'framer-motion';
import { BookOpen, Leaf, Beaker, Globe } from 'lucide-react';

export function Cannabis101() {
  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <BookOpen className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Cannabis 101</h1>
          <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Master the fundamentals of the plant in the era of legal medical access. Dive deep into the science of cannabinoids and its role in Philippine medicine today.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* New Section: 2026 Legal Landscape */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(16,185,129,0.1)]"
          >
            <div className="flex items-center gap-4 mb-6">
              <Globe className="h-8 w-8 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">The 2026 Legal Landscape</h2>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 font-light leading-relaxed text-sm md:text-base">
              <p className="mb-4">With the passing of the <strong>Medical Cannabis Compassionate Relief Act</strong> in early 2026, the Philippines has established a world-class regulatory framework for therapeutic use.</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Medical Use:</strong> Legal for patients with qualifying conditions (Cancer, MS, Epilepsy, PTSD, etc.) under the DOH 'Compassionate Pass' system.</li>
                <li><strong>Regulated Access:</strong> Only pharmaceutical-grade products (oils, capsules, tinctures) are permitted. Recreational smoking remains prohibited.</li>
                <li><strong>Certified Professionals:</strong> Prescriptions must come from DOH-accredited S2-licensed physicians who have completed specialized cannabinoid training.</li>
              </ul>
              <p className="italic text-emerald-400/80">Always ensure you carry your digital Compassionate Pass and original DOH-verified prescription when in possession of your medicine.</p>
            </div>
          </motion.section>
          {/* Section 1 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <Beaker className="h-8 w-8 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">The Science of Cannabinoids</h2>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 font-light leading-relaxed">
              <p className="mb-4">Cannabis contains over 100 different chemical compounds called cannabinoids. The most well-known are:</p>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong className="text-emerald-300">THC (Tetrahydrocannabinol):</strong> The primary psychoactive compound responsible for the "high." It binds directly to CB1 receptors in the brain, affecting mood, memory, and pain perception.</li>
                <li><strong className="text-emerald-300">CBD (Cannabidiol):</strong> Non-intoxicating and highly therapeutic. CBD modulates the endocannabinoid system without causing a high, often used for anxiety, inflammation, and seizure disorders.</li>
                <li><strong className="text-emerald-300">CBN (Cannabinol):</strong> A mildly psychoactive cannabinoid created when THC degrades. It is heavily associated with sedative effects and is often used as a sleep aid.</li>
              </ul>
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <Globe className="h-8 w-8 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">The Endocannabinoid System (ECS)</h2>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 font-light leading-relaxed">
              <p className="mb-4">Discovered in the early 1990s, the ECS is a complex cell-signaling system found in all mammals. It plays a crucial role in regulating a range of functions and processes, including:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Sleep, mood, and appetite</li>
                <li>Memory and reproduction</li>
                <li>Pain sensation and immune system responses</li>
              </ul>
              <p>The ECS consists of endocannabinoids (naturally produced by the body), receptors (CB1 and CB2), and enzymes. Plant cannabinoids (phytocannabinoids) like THC and CBD interact with this system to produce their varied effects.</p>
            </div>
          </motion.section>

          {/* Section 3 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">Sativa, Indica, and Ruderalis</h2>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 font-light leading-relaxed">
              <p className="mb-4">Historically, cannabis has been divided into three primary botanical categories:</p>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-2">Sativa</h3>
                  <p className="text-sm">Tall, narrow-leaf plants originating in warm climates. Traditionally associated with uplifting, cerebral, and energetic effects.</p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-2">Indica</h3>
                  <p className="text-sm">Short, broad-leaf plants from mountainous regions. Traditionally associated with relaxing, full-body, and sedative effects.</p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-2">Ruderalis</h3>
                  <p className="text-sm">Small, auto-flowering plants from harsh climates. Rarely used alone but crossbred to create auto-flowering hybrids.</p>
                </div>
              </div>
              <p className="mt-6 text-sm italic text-slate-400">*Note: Modern science suggests that a strain's effects are more accurately determined by its specific cannabinoid and terpene profile rather than its botanical classification alone.</p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
