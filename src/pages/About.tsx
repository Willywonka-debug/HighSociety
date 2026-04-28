import { Link } from "react-router-dom";
import { ShieldCheck, BookOpen, Leaf, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1603908858964-6420e6f6631b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Elevating the Cannabis Experience
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            At CannaHub, we believe in the power of the plant. Our mission is to provide safe, transparent, and educational information about premium cannabis while fostering a community built on trust and wellness.
          </p>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                CannaHub was founded with a simple yet powerful vision: to demystify cannabis and make high-quality, lab-tested products accessible to everyone who needs them. We spent years advocating for the recognition of cannabis as a legitimate medicine in the Philippines.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Following the historic passage of the 2026 Medical Cannabis Act, we have transitioned into a leading educational hub. Today, we partner with industry experts, DOH-accredited physicians, and reputable growers to ensure you have the most up-to-date and accurate information in this new era of Philippine healthcare.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl text-center border border-white/10">
                <h3 className="text-4xl font-black text-emerald-400 mb-2">500+</h3>
                <p className="text-sm font-medium text-slate-300">Verified Strains</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl text-center border border-white/10">
                <h3 className="text-4xl font-black text-emerald-400 mb-2">50k+</h3>
                <p className="text-sm font-medium text-slate-300">Community Members</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl text-center border border-white/10">
                <h3 className="text-4xl font-black text-emerald-400 mb-2">100%</h3>
                <p className="text-sm font-medium text-slate-300">Lab Tested</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl text-center border border-white/10">
                <h3 className="text-4xl font-black text-emerald-400 mb-2">24/7</h3>
                <p className="text-sm font-medium text-slate-300">Expert Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Value Proposition */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The CannaHub Standard</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We don't sell products; we provide knowledge and peace of mind. Here is what makes us the most trusted educational platform in the industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Uncompromising Safety</h3>
              <p className="text-slate-400 leading-relaxed">
                Every strain profiled on our platform is backed by rigorous research. We educate users on cannabinoid profiles, terpene content, and the importance of lab testing for pesticides or heavy metals.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 text-emerald-400 border border-emerald-500/30">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Education First</h3>
              <p className="text-slate-400 leading-relaxed">
                Knowledge is power. Our comprehensive strain database, expert articles, and dosage guides are designed to empower you to make informed decisions about your wellness journey.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 text-emerald-400 border border-emerald-500/30">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community Driven</h3>
              <p className="text-slate-400 leading-relaxed">
                We rely on real, verified reviews from our community. By sharing experiences, we help each other discover the best strains for specific medical conditions and desired effects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center border-t border-white/10">
        <div className="container mx-auto max-w-3xl">
          <Leaf className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Discover Your Perfect Match?</h2>
          <p className="text-lg text-slate-400 mb-8">
            Join thousands of others who have found their ideal cannabis experience through CannaHub.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="text-base px-8 h-12 bg-emerald-600 hover:bg-emerald-700 text-white border-none">
              <Link to="/learn">Learn More</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
              <Link to="/strains">Explore Strains</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
