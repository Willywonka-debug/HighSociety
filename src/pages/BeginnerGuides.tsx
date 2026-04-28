import { motion } from 'framer-motion';
import { GraduationCap, Scale, Clock, ShieldCheck } from 'lucide-react';

export function BeginnerGuides() {
  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/30 mb-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <GraduationCap className="h-8 w-8 text-purple-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Beginner Guides</h1>
          <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Start your journey safely and confidently. Learn the golden rules of dosing, compare consumption methods, and understand product safety.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Section 1 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <Scale className="h-8 w-8 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Dosing: Start Low, Go Slow</h2>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 font-light leading-relaxed">
              <p className="mb-4">The most important rule for beginners is <strong>Start Low, Go Slow</strong>. Everyone's endocannabinoid system is unique, meaning a dose that feels mild to one person might feel overwhelming to another.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Edibles:</strong> Start with 2.5mg to 5mg of THC. Wait at least 2 hours before consuming more.</li>
                <li><strong>Vaping/Smoking:</strong> Take one small puff and wait 15-20 minutes to gauge the effects before taking another.</li>
                <li><strong>Tinctures:</strong> Start with a 0.25ml drop under the tongue. Effects usually begin within 30-45 minutes.</li>
              </ul>
              <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <p className="text-purple-200 text-sm m-0"><strong>Pro Tip:</strong> Having CBD on hand can help counteract the anxiety or paranoia sometimes caused by consuming too much THC.</p>
              </div>
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
              <Clock className="h-8 w-8 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Consumption Methods & Timing</h2>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 font-light leading-relaxed">
              <p className="mb-6">How you consume cannabis drastically changes the onset time and duration of the effects.</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-2">Inhalation</h3>
                  <p className="text-sm text-slate-400 mb-4">(Smoking, Vaping)</p>
                  <ul className="text-sm space-y-2">
                    <li><strong>Onset:</strong> 1 - 5 minutes</li>
                    <li><strong>Peak:</strong> 30 minutes</li>
                    <li><strong>Duration:</strong> 1 - 3 hours</li>
                  </ul>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-2">Ingestion</h3>
                  <p className="text-sm text-slate-400 mb-4">(Edibles, Capsules)</p>
                  <ul className="text-sm space-y-2">
                    <li><strong>Onset:</strong> 45 - 120 minutes</li>
                    <li><strong>Peak:</strong> 2 - 3 hours</li>
                    <li><strong>Duration:</strong> 4 - 8+ hours</li>
                  </ul>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-2">Sublingual</h3>
                  <p className="text-sm text-slate-400 mb-4">(Tinctures under tongue)</p>
                  <ul className="text-sm space-y-2">
                    <li><strong>Onset:</strong> 15 - 45 minutes</li>
                    <li><strong>Peak:</strong> 90 minutes</li>
                    <li><strong>Duration:</strong> 3 - 5 hours</li>
                  </ul>
                </div>
              </div>
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
              <ShieldCheck className="h-8 w-8 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Reading COAs (Certificates of Analysis)</h2>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 font-light leading-relaxed">
              <p className="mb-4">In 2026, every legal product in the Philippines must feature a QR-coded Certificate of Analysis from an accredited laboratory. This ensures peace of mind for every patient.</p>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>Cannabinoid Profile:</strong> Confirms the potency (e.g., THC and CBD percentages) matches what is advertised on the label.</li>
                <li><strong>Terpene Profile:</strong> Shows the aromatic compounds present, which influence the flavor and effects (the "entourage effect").</li>
                <li><strong>Safety Screening:</strong> Ensures the product is free from harmful contaminants such as heavy metals, pesticides, mold, and residual solvents.</li>
              </ul>
            </div>
          </motion.section>

          {/* New Section: Compliance & Safety in 2026 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-purple-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(168,85,247,0.1)]"
          >
            <div className="flex items-center gap-4 mb-6">
              <ShieldCheck className="h-8 w-8 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Legal Compliance in 2026</h2>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 font-light leading-relaxed text-sm md:text-base">
              <p className="mb-4">As a registered patient, staying compliant ensures the longevity of our hard-won access. Remember these key points:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Authorized Possession:</strong> Only carry products in their original packaging with the prescription label attached.</li>
                <li><strong>No Public Consumption:</strong> Administration of medicine should be done in private spaces. Public consumption remains a violation.</li>
                <li><strong>Sharing is Prohibited:</strong> Your prescription is for you alone. Sharing medical cannabis, even with other patients, is strictly against the 2026 Act.</li>
              </ul>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
