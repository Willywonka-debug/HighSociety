import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ChevronRight, ArrowRight, PlayCircle, FileText, Beaker, ChevronLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { FEATURED_ARTICLE, ARTICLES } from "@/data/articles";

const CATEGORIES = [
  { name: "Legislation", icon: FileText },
  { name: "Advocacy", icon: BookOpen },
  { name: "Medical Research", icon: Beaker },
  { name: "Interviews", icon: PlayCircle },
];

export function Learn() {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(ARTICLES.length / itemsPerPage);
  const visibleArticles = ARTICLES.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-transparent min-h-screen">
      {/* HEADER */}
      <div className="relative text-white py-16 border-b border-white/10">
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Cannabis News Philippines</h1>
          <p className="text-lg text-slate-200 mb-8 drop-shadow-md">
            Stay updated on the latest implementation steps, research breakthroughs, and news regarding the 2026 Medical Cannabis Act in the Philippines.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button key={cat.name} variant="outline" className="border-white/20 bg-white/5 backdrop-blur-md text-slate-200 hover:bg-white/10 hover:text-white gap-2 transition-all">
                  <Icon className="h-4 w-4" /> {cat.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* SEARCH BAR */}
        <div className="relative mb-12 group focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500/50 focus-within:shadow-[0_0_30px_rgba(16,185,129,0.2)] rounded-md transition-all duration-300 max-w-3xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors z-10" />
          <Input 
            placeholder="Search articles, news, or topics..." 
            className="h-12 pl-10 bg-white/5 backdrop-blur-md border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-0 border-0 relative z-0"
          />
        </div>

        {/* FEATURED ARTICLE */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Featured Read</h2>
          </div>
          <Link to={`/learn/${FEATURED_ARTICLE.id}`} className="group block">
            <div className="relative rounded-2xl overflow-hidden aspect-[2/1] md:aspect-[21/9] bg-white/5 backdrop-blur-md border border-white/10">
              <img 
                src={FEATURED_ARTICLE.image} 
                alt={FEATURED_ARTICLE.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-3/4">
                <Badge className="bg-emerald-500 hover:bg-emerald-600 mb-4 border-none">{FEATURED_ARTICLE.category}</Badge>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-emerald-400 transition-colors">
                  {FEATURED_ARTICLE.title}
                </h3>
                <p className="text-slate-300 text-sm md:text-base mb-4 line-clamp-2 md:line-clamp-none">
                  {FEATURED_ARTICLE.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="font-medium text-slate-200">{FEATURED_ARTICLE.author}</span>
                  <span>•</span>
                  <span>{FEATURED_ARTICLE.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {FEATURED_ARTICLE.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* LATEST ARTICLES GRID */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
            <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-white/5 gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <motion.div 
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visibleArticles.map((article) => (
              <Link key={article.id} to={`/learn/${article.id}`} className="group flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)] hover:border-emerald-500/40 transition-all duration-300 ease-out">
                <div className="aspect-[16/9] overflow-hidden bg-slate-900/50">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs text-emerald-300 bg-emerald-500/20 border border-emerald-500/30">{article.category}</Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="text-emerald-400 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    Read Article <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          {totalPages > 1 && (
            <div className="mt-12 flex flex-wrap justify-center items-center gap-2">
              <Button 
                variant="outline" 
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white disabled:opacity-50 min-h-[44px] px-4"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" /> Previous
              </Button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  className={`w-11 h-11 min-h-[44px] min-w-[44px] ${currentPage === i + 1 ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none" : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button 
                variant="outline" 
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white disabled:opacity-50 min-h-[44px] px-4"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </section>

        {/* NEWSLETTER CTA */}
        <section className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Informed</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join 50,000+ subscribers receiving our weekly newsletter featuring the latest updates on cannabis legislation and advocacy in the Philippines.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500"
              required
            />
            <Button size="lg" className="h-12 px-8 shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-slate-500 mt-4">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </section>
      </div>
    </div>
  );
}
