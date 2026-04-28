import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Privacy <span className="text-emerald-500 italic">Policy</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Your privacy is of the utmost importance to us at CannaHub. This policy outlines how we collect, use, and protect your information.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              icon: Shield,
              title: "Data Protection",
              description: "We use industry-standard encryption to ensure your personal data remains secure and inaccessible to unauthorized parties."
            },
            {
              icon: Lock,
              title: "Secure Access",
              description: "Your account information is protected by multiple layers of security, including two-factor authentication options."
            },
            {
              icon: Eye,
              title: "Transparency",
              description: "We are clear about what data we collect and why. We never sell your personal information to third parties."
            },
            {
              icon: FileText,
              title: "Rights",
              description: "You have the right to access, correct, or delete your personal information at any time through your account settings."
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md"
            >
              <item.icon className="w-8 h-8 text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-slate-300">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
            <p>
              When you use CannaHub, we collect information that helps us provide a better experience. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (name, email, age verification)</li>
              <li>Preferences and wishlist items</li>
              <li>Usage data (how you interact with our strain guides and tools)</li>
              <li>Device information and IP address for security purposes</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
            <p>
              We use your data to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personalize your experience and recommendations</li>
              <li>Provide customer support and answer your inquiries</li>
              <li>Send important updates regarding your account or our services</li>
              <li>Improve our algorithms and strain comparison tools</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Information Sharing</h2>
            <p>
              CannaHub does not sell your personal data. We only share information when:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>It is required by law or to protect our rights</li>
              <li>We use trusted service providers who help us operate our platform (subject to strict privacy agreements)</li>
              <li>You explicitly consent to a specific data sharing request</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Cookies and Tracking</h2>
            <p>
              We use cookies to remember your preferences and analyze site traffic. You can control cookie settings through your browser, although some features of CannaHub may not function correctly without them.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any significant changes via email or through a notice on our platform.
            </p>
          </section>
        </div>

        <div className="pt-12 border-t border-white/10 text-center">
          <p className="text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
