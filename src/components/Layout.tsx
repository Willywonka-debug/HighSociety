import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Leaf, Search, Menu, Handshake, Sparkles, ShoppingBag, BookOpen, Heart, Flame, Scale, X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/contexts/WishlistContext";
import { MobileTopNav, MobileBottomNav } from "./MobileNavigation";

function NavButton({ to, icon: Icon, children }: { to: string, icon: any, children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const localX = clientX - left;
    const localY = clientY - top;
    mouseX.set(localX);
    mouseY.set(localY);

    const centerX = width / 2;
    const centerY = height / 2;
    x.set((localX - centerX) / 6);
    y.set((localY - centerY) / 6);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Link to={to} className="relative group block" onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
        <motion.div
          className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/10 overflow-hidden transition-all duration-300 hover:border-emerald-500/60 hover:bg-slate-800/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  80px circle at ${mouseX}px ${mouseY}px,
                  rgba(16, 185, 129, 0.3),
                  transparent 80%
                )
              `,
            }}
          />
          <Icon className="w-4 h-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-emerald-300 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-sm font-medium whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-400 group-hover:from-white group-hover:to-emerald-100 transition-all duration-300">
            {children}
          </span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-emerald-500 rounded-t-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center opacity-80 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
      setIsMobileSearchOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    setIsMobileMenuOpen(false);
  };

  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-200 relative bg-transparent overflow-hidden selection:bg-emerald-500/30">
      {/* Noise Texture */}
      <div className="fixed inset-0 z-50 pointer-events-none bg-noise mix-blend-overlay"></div>

      {/* Desktop Header */}
      <header className="hidden md:block sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-emerald-400" onClick={() => setIsMobileMenuOpen(false)}>
              <Leaf className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight text-white uppercase italic">CannaHub</span>
            </Link>
            <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-300">
              <NavButton to="/trending" icon={Flame}>Trending</NavButton>
              <NavButton to="/strains" icon={Sparkles}>Strains</NavButton>
              <NavButton to="/products" icon={ShoppingBag}>Vapes & More</NavButton>
              <NavButton to="/compare" icon={Scale}>Compare</NavButton>
              <NavButton to="/learn" icon={BookOpen}>Learn</NavButton>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/wishlist" 
              className="hidden md:flex relative p-2 text-slate-300 hover:text-emerald-400 transition-colors group"
              aria-label="View Wishlist"
            >
              <Heart className={`h-6 w-6 transform transition-transform group-hover:scale-110 ${wishlist.length > 0 ? 'fill-emerald-500 text-emerald-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <div className="hidden md:flex relative w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
              <input
                type="text"
                placeholder="Search strains, vapes, or brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="h-9 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-500 relative z-0"
              />
            </div>
            <Button asChild variant="default" className="hidden sm:flex gap-2 bg-emerald-600 hover:bg-emerald-500 text-black border-none">
              <Link to="/partners">
                <Handshake className="h-4 w-4" />
                <span>Our Partners</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile-Only Facebook-style Navs */}
      <MobileTopNav 
        onMenuClick={toggleMobileMenu} 
        onSearchClick={toggleMobileSearch}
      />
      <MobileBottomNav />

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-2xl flex flex-col pt-20 px-4 md:hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors z-10" />
                <input
                  autoFocus
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-base text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 shadow-xl transition-all"
                />
              </div>
              <Button variant="ghost" size="icon" onClick={toggleMobileSearch} className="h-14 w-14 rounded-2xl bg-white/5 text-slate-400">
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-2">Popular Searches</span>
              {["Blue Dream", "Vapes", "High THC Strains", "Relaxation", "Local Hubs"].map((tag) => (
                <button 
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    navigate(`/products?q=${encodeURIComponent(tag)}`);
                    setIsMobileSearchOpen(false);
                  }}
                  className="flex items-center gap-3 w-full p-4 rounded-2xl bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all text-left"
                >
                  <Search className="h-4 w-4 text-emerald-500/60" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-3xl flex flex-col pt-16 px-5 pb-24 overflow-y-auto md:hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-wider flex items-center gap-2">
                <Menu className="w-6 h-6 text-emerald-500" /> Menu
              </h2>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-slate-400 hover:text-white">
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="flex flex-col gap-3 mb-8 w-full">
              {[
                { to: "/trending", icon: Flame, label: "Trending", color: "text-orange-400", bg: "bg-orange-500/10" },
                { to: "/strains", icon: Sparkles, label: "Explore Strains", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { to: "/products", icon: ShoppingBag, label: "Vapes & Accessories", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { to: "/compare", icon: Scale, label: "Strain Comparison", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { to: "/learn", icon: BookOpen, label: "Education Hub", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { to: "/about", icon: Leaf, label: "About CannaHub", color: "text-emerald-400", bg: "bg-emerald-500/10" },
              ].map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-all duration-300 w-full" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={`p-2.5 ${link.bg} rounded-xl`}>
                    <link.icon className={`h-5 w-5 ${link.color}`} />
                  </div>
                  <span className="text-lg font-medium tracking-wide">{link.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto grid grid-cols-1 gap-4">
              <Button asChild variant="default" className="w-full h-14 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black rounded-2xl text-lg shadow-lg" onClick={() => setIsMobileMenuOpen(false)}>
                <Link to="/partners">Our Partners</Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-14 border-white/10 text-white hover:bg-white/5 rounded-2xl text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                <Link to="/contact">Support</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-14 md:pt-0 pb-20 md:pb-0">
        <Outlet />
      </main>

      <footer className="relative z-10 bg-slate-950/50 backdrop-blur-md border-t border-white/10 text-slate-300 py-12 md:pb-12 pb-32 mt-auto hidden md:block">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-white mb-4">
              <Leaf className="h-6 w-6 text-emerald-500" />
              <span className="text-xl font-bold tracking-tight">CannaHub</span>
            </Link>
            <p className="text-sm text-slate-400">
              Discover the perfect strain and learn about cannabis.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/trending" className="hover:text-emerald-400 transition-colors">Trending</Link></li>
              <li><Link to="/strains" className="hover:text-emerald-400 transition-colors">Strains</Link></li>
              <li><Link to="/products" className="hover:text-emerald-400 transition-colors">Vapes & More</Link></li>
              <li><Link to="/compare" className="hover:text-emerald-400 transition-colors">Compare</Link></li>
              <li><Link to="/learn" className="hover:text-emerald-400 transition-colors">Learn</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/partners" className="hover:text-emerald-400 transition-colors">Partners</Link></li>
              <li><Link to="/careers" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">Get the latest news and deals.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="h-9 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-emerald-500 placeholder:text-slate-500"
              />
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white border-none">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-sm text-slate-500 text-center">
          &copy; {new Date().getFullYear()} CannaHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

