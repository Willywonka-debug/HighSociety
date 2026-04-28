import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';

export function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-12 min-h-[60vh] relative z-10">
      <div className="flex items-center gap-3 mb-12">
        <Heart className="h-8 w-8 text-emerald-500 fill-emerald-500" />
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Your Wishlist</h1>
        <div className="ml-auto px-4 py-1 bg-white/5 border border-white/10 rounded-full text-slate-400 text-sm">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
          <Heart className="h-20 w-20 text-slate-700 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
          <p className="text-slate-400 mb-8 max-w-md text-center">
            Save your favorite strains and products here to keep track of what you want to explore next.
          </p>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-8 h-12">
            <Link to="/products" className="flex items-center gap-2">
              Browse Strains And More <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-[#1F2937]/20 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="aspect-square relative flex items-center justify-center p-6 bg-white/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain grayscale-[0.2] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs text-emerald-500 font-bold uppercase tracking-wider mb-1">
                    {item.brand || item.type}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button asChild size="sm" className="flex-1 bg-white/5 hover:bg-emerald-600 border border-white/10 hover:border-none text-white transition-all rounded-xl">
                      <Link to={`/${item.type === 'strain' ? 'strains' : 'products'}/${item.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
