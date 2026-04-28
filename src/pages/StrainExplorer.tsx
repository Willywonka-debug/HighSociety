import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, Star, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { STRAINS } from "@/data/strains";
import { AutoImageCarousel } from "@/components/AutoImageCarousel";
import { motion } from "framer-motion";
import { BackButton } from "@/components/PremiumButtons";

export function StrainExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
  const [selectedTHC, setSelectedTHC] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page on search
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const toggleFilter = (state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredStrains = useMemo(() => {
    return STRAINS.filter(strain => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = strain.name.toLowerCase().includes(query);
        const matchesEffect = strain.effects.some(e => e.name.toLowerCase().includes(query));
        const matchesFlavor = strain.description.toLowerCase().includes(query);
        
        if (!matchesName && !matchesEffect && !matchesFlavor) {
          return false;
        }
      }
      
      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(strain.type)) {
        return false;
      }
      
      // Effects filter
      if (selectedEffects.length > 0) {
        const hasEffect = selectedEffects.some(effect => strain.effects.some(e => e.name === effect));
        if (!hasEffect) return false;
      }
      
      // THC filter
      if (selectedTHC.length > 0) {
        const thcValue = parseInt(strain.thc.replace('%', ''));
        const thcMatches = selectedTHC.some(level => {
          if (level === "Low (< 15%)") return thcValue < 15;
          if (level === "Medium (15-20%)") return thcValue >= 15 && thcValue <= 20;
          if (level === "High (20-25%)") return thcValue > 20 && thcValue <= 25;
          if (level === "Very High (> 25%)") return thcValue > 25;
          return false;
        });
        if (!thcMatches) return false;
      }
      
      return true;
    });
  }, [searchQuery, selectedTypes, selectedEffects, selectedTHC]);

  const sortedStrains = useMemo(() => {
    return [...filteredStrains].sort((a, b) => {
      if (sortBy === "rating") return Number(b.rating) - Number(a.rating);
      if (sortBy === "reviews") return b.reviews - a.reviews;
      
      const thcValueA = parseInt(a.thc.replace('%', ''));
      const thcValueB = parseInt(b.thc.replace('%', ''));
      
      if (sortBy === "thc-high") return thcValueB - thcValueA;
      if (sortBy === "thc-low") return thcValueA - thcValueB;
      
      return 0; // featured
    });
  }, [filteredStrains, sortBy]);

  const totalPages = Math.ceil(sortedStrains.length / itemsPerPage);
  const visibleStrains = sortedStrains.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-4 relative">
      <div className="mb-2">
        <BackButton to="/" />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
      {/* SIDEBAR FILTERS (Desktop) */}
      <aside className="hidden md:block w-64 shrink-0">
        <div className="sticky top-24 space-y-8 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl">
          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filters
            </h3>
            <div className="space-y-6">
              {/* Type Filter */}
              <div>
                <h4 className="text-sm font-medium text-slate-200 mb-3">Strain Type</h4>
                <div className="space-y-2">
                  {["Indica", "Sativa", "Hybrid", "High CBD"].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                        className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500" 
                      />
                      <span className="text-sm text-slate-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Effects Filter */}
              <div>
                <h4 className="text-sm font-medium text-slate-200 mb-3">Effects</h4>
                <div className="flex flex-wrap gap-2">
                  {["Happy", "Relaxed", "Euphoric", "Uplifted", "Creative", "Sleepy", "Focused"].map(effect => (
                    <Badge 
                      key={effect} 
                      variant={selectedEffects.includes(effect) ? "default" : "outline"} 
                      className={`cursor-pointer font-normal ${selectedEffects.includes(effect) ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none" : "hover:bg-white/10 text-slate-300 border-white/20"}`}
                      onClick={() => toggleFilter(selectedEffects, setSelectedEffects, effect)}
                    >
                      {effect}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* THC Content */}
              <div>
                <h4 className="text-sm font-medium text-slate-200 mb-3">THC Content</h4>
                <div className="space-y-2">
                  {["Low (< 15%)", "Medium (15-20%)", "High (20-25%)", "Very High (> 25%)"].map(level => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedTHC.includes(level)}
                        onChange={() => toggleFilter(selectedTHC, setSelectedTHC, level)}
                        className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500" 
                      />
                      <span className="text-sm text-slate-300">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE FILTERS OVERLAY */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col pt-20 px-4 pb-6 overflow-y-auto md:hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-white flex items-center gap-2 text-xl">
              <Filter className="h-5 w-5" /> Filters
            </h3>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileFiltersOpen(false)} className="text-slate-400 hover:text-white">
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="space-y-8 flex-1">
            {/* Type Filter */}
            <div>
              <h4 className="text-base font-medium text-slate-200 mb-4">Strain Type</h4>
              <div className="space-y-3">
                {["Indica", "Sativa", "Hybrid", "High CBD"].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                      className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500 w-5 h-5" 
                    />
                    <span className="text-base text-slate-300">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Effects Filter */}
            <div>
              <h4 className="text-base font-medium text-slate-200 mb-4">Effects</h4>
              <div className="flex flex-wrap gap-2">
                {["Happy", "Relaxed", "Euphoric", "Uplifted", "Creative", "Sleepy", "Focused"].map(effect => (
                  <Badge 
                    key={effect} 
                    variant={selectedEffects.includes(effect) ? "default" : "outline"} 
                    className={`cursor-pointer font-normal text-sm py-1.5 px-3 ${selectedEffects.includes(effect) ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none" : "hover:bg-white/10 text-slate-300 border-white/20"}`}
                    onClick={() => toggleFilter(selectedEffects, setSelectedEffects, effect)}
                  >
                    {effect}
                  </Badge>
                ))}
              </div>
            </div>

            {/* THC Content */}
            <div>
              <h4 className="text-base font-medium text-slate-200 mb-4">THC Content</h4>
              <div className="space-y-3">
                {["Low (< 15%)", "Medium (15-20%)", "High (20-25%)", "Very High (> 25%)"].map(level => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedTHC.includes(level)}
                      onChange={() => toggleFilter(selectedTHC, setSelectedTHC, level)}
                      className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500 w-5 h-5" 
                    />
                    <span className="text-base text-slate-300">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white min-h-[44px] text-lg"
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Explore Strains</h1>
            <p className="text-slate-400">Discover medical-grade strains and whats there effect </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="md:hidden w-full sm:w-auto gap-2 bg-white/5 border-white/10 text-white min-h-[44px]" onClick={() => setIsMobileFiltersOpen(true)}>
              <Filter className="h-4 w-4" /> Filters
            </Button>
            <div className="relative w-full sm:w-auto group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <SlidersHorizontal className="h-4 w-4 text-slate-400 group-hover:text-white" />
              </div>
              <select 
                className="w-full sm:w-auto h-11 sm:h-10 pl-9 pr-8 appearance-none bg-white/5 border border-white/10 rounded-md text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer min-h-[44px]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured" className="bg-slate-900">Sort: Featured</option>
                <option value="rating" className="bg-slate-900">Highest Rated</option>
                <option value="reviews" className="bg-slate-900">Most Reviewed</option>
                <option value="thc-high" className="bg-slate-900">THC: High to Low</option>
                <option value="thc-low" className="bg-slate-900">THC: Low to High</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="relative mb-8 group focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500/50 focus-within:shadow-[0_0_30px_rgba(16,185,129,0.2)] rounded-md transition-all duration-300">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors z-10" />
          <Input 
            placeholder="Search by strain name, effect, or flavor..." 
            value={searchQuery}
            onChange={handleSearchChange}
            className="h-12 pl-10 bg-white/5 backdrop-blur-md border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-0 border-0 relative z-0"
          />
        </div>

        {sortedStrains.length === 0 ? (
          <div className="text-center py-16 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">No strains found</h3>
            <p className="text-slate-400">Try adjusting your filters or search query.</p>
            <Button 
              variant="outline" 
              className="mt-4 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
              onClick={() => {
                setSearchQuery("");
                setSearchParams({});
                setSelectedTypes([]);
                setSelectedEffects([]);
                setSelectedTHC([]);
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <motion.div 
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleStrains.map((strain) => (
              <Link key={strain.id} to={`/strains/${strain.id}`} className="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)] hover:border-emerald-500/40 transition-all duration-300 ease-out flex flex-col">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <AutoImageCarousel images={strain.images || [strain.image]} alt={strain.name} />
                  <Badge className="absolute top-3 left-3 shadow-sm bg-slate-900/80 text-white border-none backdrop-blur-md z-30">{strain.type}</Badge>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{strain.name}</h3>
                    <span className="text-sm font-semibold text-slate-300 bg-white/10 px-2 py-1 rounded">THC: {strain.thc}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-400 mb-4">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-slate-200">{strain.rating}</span>
                    <span>({strain.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                    {strain.effects.map(effect => (
                      <span key={effect.name} className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                        {effect.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex flex-wrap justify-center items-center gap-2">
            <Button 
              variant="outline" 
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white disabled:opacity-50 min-h-[44px] px-4"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
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
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  </div>
);
}
