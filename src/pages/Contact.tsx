import { Mail, Phone, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative py-16 px-4 border-b border-white/10">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            We're Here to Help
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto drop-shadow-md">
            Have a question about a strain, need help understanding lab results, or want to partner with us? Reach out to our expert education team.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/10 hover:border-emerald-500/50 transition-colors">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400 border border-emerald-500/30">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Call Us</h3>
                <p className="text-slate-400 mb-2">Mon-Fri from 8am to 8pm EST.</p>
                <a href="tel:+18005550199" className="text-emerald-400 font-semibold hover:text-emerald-300">
                  +1 (800) 555-0199
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/10 hover:border-emerald-500/50 transition-colors">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400 border border-emerald-500/30">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                <p className="text-slate-400 mb-2">We'll respond within 24 hours.</p>
                <a href="mailto:support@cannahub.com" className="text-emerald-400 font-semibold hover:text-emerald-300">
                  support@cannahub.com
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/10 hover:border-emerald-500/50 transition-colors">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400 border border-emerald-500/30">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Live Chat</h3>
                <p className="text-slate-400 mb-4">Available 24/7 for urgent inquiries.</p>
                <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">Start Chat</Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-slate-300">First Name</label>
                      <Input id="firstName" placeholder="John" className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-slate-300">Last Name</label>
                      <Input id="lastName" placeholder="Doe" className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
                    <Input id="email" type="email" placeholder="john@example.com" className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-300">Subject</label>
                    <select id="subject" className="w-full h-12 rounded-md border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
                      <option value="" className="bg-slate-900">Select a topic...</option>
                      <option value="education" className="bg-slate-900">Educational Resources</option>
                      <option value="strain" className="bg-slate-900">Strain Question</option>
                      <option value="partnership" className="bg-slate-900">Partnership</option>
                      <option value="other" className="bg-slate-900">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full h-12 text-base bg-emerald-600 hover:bg-emerald-700 text-white border-none">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ / Trust Section */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-white mb-2">How do I use the strain database?</h4>
              <p className="text-slate-400 text-sm">You can search by name, effect, or flavor profile to find detailed educational information on thousands of strains.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-white mb-2">Are the strain profiles accurate?</h4>
              <p className="text-slate-400 text-sm">Yes, 100% of the strain information on CannaHub is aggregated from verified third-party lab data and community reviews.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-white mb-2">How can I contribute?</h4>
              <p className="text-slate-400 text-sm">Select "Partnership" in the contact form above, and our community team will reach out within 24 hours.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h4 className="font-bold text-white mb-2">Do you sell cannabis?</h4>
              <p className="text-slate-400 text-sm">No. CannaHub is strictly an educational platform. We do not sell or facilitate the sale of any cannabis products.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
