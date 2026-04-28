import { motion } from "framer-motion";
import { Handshake, ExternalLink, Globe, Star, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const partners = [
  {
    id: 1,
    name: "Mutten Roshi",
    role: "CEO",
    description: "Leads with vision and strategy, driving growth while shaping the platform’s future and community impact.",
    image: "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/590742789_825641453716939_5252265053923730974_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFCmblraAtX13WPH5FZTP_HYAAj50nJhfdgACPnScmF9zXaMUAMXPbhGDHOZDAdWJw_0u_Rv5Bb0noK-pxOTJuN&_nc_ohc=Aa-yF57Yth8Q7kNvwE6Aj74&_nc_oc=AdrVGcRThcBTb6SfIlIfEDaCFl1SLYQaT6Krnxsxz1-b7wfmXJD4RzEdq24j2kAtHt0&_nc_zt=23&_nc_ht=scontent-nrt1-1.xx&_nc_gid=Rp685EV19l-cQjbJ0pnR5Q&_nc_ss=7b2a8&oh=00_Af3DiY9qNYOvUeiAo5jF7dBH5ULiFOifmG7ayr4IdGxVHQ&oe=69F22EF5",
    rating: 5.0,
    verified: true,
    websiteUrl: "https://www.facebook.com/roshi420"
  },
  {
    id: 2,
    name: "Misty Cassidy",
    role: "Developer / Authorized Partner",
    description: "Sameday Around 📦 : NCR , Metro Manila\nLocation for Shipment 🚚 : Calabarzon\nNationwide🌍",
    image: "https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/567765313_122181673868364110_2769290054455724014_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEXon0YA6PEnHq3rHC5ZVUX0vHHIKWZsjrS8ccgpZmyOr7BG5BOLVqLRFUf0GpZpkd9lLM5dCF5zdaUGRyZd-QA&_nc_ohc=NKOTF3nomw0Q7kNvwHWIK14&_nc_oc=Adp9xTkIsxoTKC20BJS70sQIkHVGi9RRn2fHvI3V_2DhkmdjqXMzpBifsh5BGPf3aDM&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=R_oH3kdJV4AshoD7xgu2bA&_nc_ss=7b2a8&oh=00_Af2ubfSpzVJmUcY1_40YIH8fgjhZtpn_P5AUr9ktLPJbWw&oe=69F5115E",
    rating: 5.0,
    verified: true,
    websiteUrl: "https://www.facebook.com/MistyCassidy420"
  },
  {
    id: 3,
    name: "Need Yah",
    role: "Authorized Partner",
    description: "Sameday Around 📦 : Lipa Batangas , Malvar Batangas , Tanauan City Batangas\nLocation for Shipment 🚚 : Calabarzon",
    image: "https://scontent.fmnl3-2.fna.fbcdn.net/v/t39.30808-6/632638920_122122190913116172_8460698301278600547_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEVRzKqdREVAeoezL9nm96Cl0k2TIrSuZSXSTZMitK5lPg8U4fFBZHCjnQYEw11yBJbDsI-rmD7m2teOhMbqs8X&_nc_ohc=nJtXXXxR9Q8Q7kNvwGAA59V&_nc_oc=AdpVvmZqygZYqb-0VFjC8lNZMo4Pnl0vE-SCjMML5wQ-pnUphiUJ0r1JW8te-uBjsz8&_nc_zt=23&_nc_ht=scontent.fmnl3-2.fna&_nc_gid=mDVMP_E6_a1KlqGtJsvFSQ&_nc_ss=7b2a8&oh=00_Af0XmkOduaR7S4rzNCzBRO5sw4l72inkuwGHecWm_UaBNg&oe=69F4CF48",
    rating: 5.0,
    verified: true,
    websiteUrl: "https://www.facebook.com/profile.php?id=61583485164765"
  },
  {
    id: 4,
    name: "Shen Asahi",
    role: "Authorized Partner",
    description: "Sameday Around 📦 :  Lipa Batangas, Malvar Batangas , San Jose Batangas\nLocation for Shipment 🚚 : Calabarzon",
    image: "https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/615817644_122167543160786320_7736179422775862762_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHgn8cqonLIQ-IPyfyzxiINJThBswzdby4lOEGzDN1vLkwmA-upAFpvOZ1YnPUXDfwBsoZiFpxLogmKUfdeSfDL&_nc_ohc=WAx4U17aJ5wQ7kNvwHjb4yF&_nc_oc=AdrJP4-h2-zisrGSyhjBnYdlJCi7DO1F2khhMOABaRecHthKCrUah-GtZYRgvnIeNWg&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=w4_JzU-g6VlbHyFhBNfUkA&_nc_ss=7b2a8&oh=00_Af0nNhwlYFeSOmnCp9BI18sHv_Slz9z_ycTSbWZPi9otAw&oe=69F4D513",
    rating: 5.0,
    verified: true,
    websiteUrl: "https://www.facebook.com/shen.asahi.645528"
  },
  {
    id: 5,
    name: "Baked Ape",
    role: "Authorized Partner",
    description: "Sameday Around 📦 : NCR , Metro Manila\nLocation for Shipment 🚚 : Calabarzon\nNationwide🌍",
    image: "https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/559532619_122141857682731851_1172718672696812328_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEz8ch49uZJ-r3DugfCKwb5fyzG7eREQtF_LMbt5ERC0TPmQ5bNCo3xyL9gno8EYhF7lkTIkNQF_6dt_WsUvRna&_nc_ohc=t3xjCY5XsioQ7kNvwG4Nrcx&_nc_oc=Ado57_s4-3fq4hKrYkLoLo7KMnto8uN9Q2nyD0kU75R2LshQC4b-ZBIaCsA8QNaN57Y&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=EUosaPvwjJch3gWgNk9RMA&_nc_ss=7b2a8&oh=00_Af01PA9_2786AUAf5JN8aF2TNOnX_TwzA7E3BdvCgEzWJw&oe=69F4CDEE",
    rating: 5.0,
    verified: true,
    websiteUrl: "https://www.facebook.com/baked.ape.73616"
  },
  {
    id: 6,
    name: "Miriam Defensors",
    role: "Authorized Partner",
    description: "Sameday Around 📦 : NCR , Metro Manila\nLocation for Shipment 🚚 : Calabarzon\nNationwide🌍",
    image: "https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/463730841_122191353524205656_2720143888227176619_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeE4K-2n_OsZg61mLWvJ2KYdEf-WUjwiDmgR_5ZSPCIOaMvKpvuTj9T2Exxmwv6SUuenHKzG9oTj7Lprd6MU-8UC&_nc_ohc=rsWK4mIa8MgQ7kNvwFv8AKL&_nc_oc=AdpIL7VUDo1B5XOolqsbD-fOkWdyuR6U4uqDtry9N1jdFoNZqZH1oZKdvGCFwccEPIA&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=2GdG0AIoPD5ZLyD0gqZ0DQ&_nc_ss=7b2a8&oh=00_Af222bhmHYf1csKA9zLNtlNPf6-TSVP6Oa91QIupw2SvSw&oe=69F4CD51",
    rating: 5.0,
    verified: true,
    websiteUrl: "https://www.facebook.com/MiriamDefensors"
  }
];

export function Partners() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-widest mb-6"
          >
            <Handshake className="w-4 h-4" />
            Our Network
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight uppercase"
          >
            Powering Excellence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Through Partnership</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            We collaborate with the world's most innovative cultivators, extractors, and advocates to bring you a standard of quality that's second to none.
          </motion.p>
        </div>
      </section>

      {/* Featured Partners Grid */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {partners.map((partner, idx) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-slate-900/50 backdrop-blur-3xl border border-white/5 md:rounded-[2.5rem] rounded-2xl p-6 md:p-8 hover:bg-slate-800/50 transition-all duration-500 hover:border-emerald-500/30 shadow-2xl overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] group-hover:bg-emerald-500/10 transition-all duration-500"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-emerald-500/50 transition-colors duration-500 shadow-xl">
                        <img 
                          src={partner.image} 
                          alt={partner.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      {partner.verified && (
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-4 border-slate-900">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-white">{partner.rating}</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-2">{partner.role}</div>
                    <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors duration-300 uppercase leading-none">{partner.name}</h3>
                  </div>

                  <p className="text-slate-400 leading-relaxed mb-10 flex-grow text-sm whitespace-pre-line">
                    {partner.description}
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <Button asChild variant="outline" className="flex-1 bg-white/5 border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/50 text-white gap-2 h-12 rounded-2xl group/btn">
                      <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                        Website
                      </a>
                    </Button>
                    <Button asChild className="h-12 w-12 rounded-2xl p-0 bg-white/5 hover:bg-emerald-500 border border-white/10 hover:border-emerald-500 text-white transition-all">
                      <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Become a Partner Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-emerald-500/10 border-2 border-dashed border-emerald-500/30 md:rounded-[2.5rem] rounded-2xl p-8 flex flex-col items-center justify-center text-center overflow-hidden hover:border-emerald-500/60 transition-all duration-500 min-h-[350px] md:min-h-[400px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent)] group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <Users className="w-10 h-10 text-emerald-400 animate-bounce" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Become a Partner</h3>
                <p className="text-slate-400 mb-8 max-w-[200px] mx-auto text-sm">Join our network of industry leaders and innovators.</p>
                <Button asChild className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-14 px-8 rounded-2xl shadow-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all">
                  <Link to="/partner-application">Apply Now</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white/5 border-y border-white/5 backdrop-blur-3xl">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Partners", value: "6" },
              { label: "States Served", value: "12" },
              { label: "Quality Checks", value: "100%" },
              { label: "Awards Won", value: "25" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tighter">{stat.value}</div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
