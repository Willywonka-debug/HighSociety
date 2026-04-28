import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, Handshake, Flame, Menu, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/contexts/WishlistContext";

export function MobileTopNav({ onMenuClick, onSearchClick }: { onMenuClick: () => void, onSearchClick: () => void }) {
  const location = useLocation();
  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 md:hidden">
      <Link to="/" onClick={handleHomeClick} className="flex items-center gap-2 text-emerald-400">
        <Leaf className="h-5 w-5" />
        <span className="text-lg font-black tracking-tight text-white uppercase italic">CannaHub</span>
      </Link>
      <div className="flex items-center gap-2">
        <button 
          onClick={onSearchClick}
          className="p-2 text-slate-300 hover:text-emerald-400 active:scale-90 transition-all"
        >
          <Search className="h-5 w-5" />
        </button>
        <button 
          onClick={onMenuClick}
          className="p-2 text-slate-300 hover:text-emerald-400 active:scale-90 transition-all"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function MobileBottomNav() {
  const location = useLocation();
  const { wishlist } = useWishlist();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/products" },
    { icon: Flame, label: "Trending", path: "/trending" },
    { 
      icon: Heart, 
      label: "Wishlist", 
      path: "/wishlist",
      badge: wishlist.length > 0 ? wishlist.length : null 
    },
    { icon: Handshake, label: "Partners", path: "/partners" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:hidden pointer-events-none">
      <div className="max-w-md mx-auto h-16 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.5)] pointer-events-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              onClick={() => {
                if (item.path === "/" && location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="relative flex flex-col items-center justify-center p-2 group"
            >
              <motion.div
                whileTap={{ scale: 0.8 }}
                className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`}
              >
                <item.icon className="h-6 w-6" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center border border-slate-950 shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                    {item.badge}
                  </span>
                )}
              </motion.div>
              {isActive && (
                <motion.div 
                  layoutId="bottom-nav-indicator"
                  className="absolute -bottom-1 h-1 w-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
