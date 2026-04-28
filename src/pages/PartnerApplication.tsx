import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ArrowLeft, Building2, User, Mail, Phone, Globe, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

export function PartnerApplication() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(16,185,129,0.2)]"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-black text-white mb-6 uppercase"
          >
            Application Received
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg mb-10 leading-relaxed"
          >
            Thank you for your interest in joining the CannaHub Partner Network. Our team will review your information and reach out to you within 3-5 business days.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-10 h-14 rounded-2xl">
              <Link to="/">Return to Home</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12">
          <Button asChild variant="ghost" className="text-slate-400 hover:text-white mb-6 pl-0">
            <Link to="/partners" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Partners
            </Link>
          </Button>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight"
          >
            Partner <span className="text-emerald-500">Inquiry</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Tell us about your brand or business. Let's build something great together.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full"></div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-4 h-4" /> Your Name
                </label>
                <Input 
                  required
                  placeholder="John Doe" 
                  className="bg-slate-950/50 border-white/10 text-white h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                <Input 
                  required
                  type="email"
                  placeholder="john@example.com" 
                  className="bg-slate-950/50 border-white/10 text-white h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Company Name
                </label>
                <Input 
                  required
                  placeholder="ABC Organics" 
                  className="bg-slate-950/50 border-white/10 text-white h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Website URL (Optional)
                </label>
                <Input 
                  placeholder="https://yourbrand.com" 
                  className="bg-slate-950/50 border-white/10 text-white h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone Number
              </label>
              <Input 
                required
                placeholder="+1 (555) 000-0000" 
                className="bg-slate-950/50 border-white/10 text-white h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Business Description
              </label>
              <Textarea 
                required
                placeholder="Tell us about your products, services, and why you'd like to partner with CannaHub..." 
                className="bg-slate-950/50 border-white/10 text-white min-h-[150px] rounded-[2rem] p-6 focus:border-emerald-500/50 focus:ring-emerald-500/20"
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black h-16 rounded-2xl text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Submit Application
                  </>
                )}
              </Button>
              <p className="text-center text-slate-500 text-sm mt-6">
                By submitting this form, you agree to our terms of partnership consideration.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
