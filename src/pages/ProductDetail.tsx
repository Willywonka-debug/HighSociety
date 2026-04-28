import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ShieldCheck, Clock, ThumbsUp, Info, AlertTriangle, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS } from "./Products";
import { BackButton } from "@/components/PremiumButtons";
import { useWishlist } from "@/contexts/WishlistContext";

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Michael R.",
    initials: "MR",
    date: "Posted 2 days ago",
    content: "Fascinating extraction profile here. The low-temperature distillation really preserved the volatile monoterpenes, particularly the limonene and pinene, which are completely perceptible on the exhale. A great example of the entourage effect in an extract format.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah J.",
    initials: "SJ",
    date: "Posted 5 days ago",
    content: "Very informative experience noting the differences between this full-spectrum extract and standard distillates. The minor cannabinoids (CBG, CBN) clearly modulate the primary THC effects, creating a much more rounded and nuanced physiological response without the sudden peak associated with isolates.",
    rating: 5,
  },
  {
    id: 3,
    name: "David T.",
    initials: "DT",
    date: "Posted 1 week ago",
    content: "I've been documenting the vaporization temperatures with this specific concentrate. Staying below 365°F (185°C) seems optimal for maintaining the delicate flavonoid structures while still effectively activating the primary cannabinoids. Excellent material for studying vaporization dynamics.",
    rating: 4,
  }
];

export function ProductDetail() {
  const { id } = useParams();
  
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(product.image);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (isSaved) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        image: product.image,
        type: 'product',
        brand: product.brand
      });
    }
  };

  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleSubmitReview = () => {
    if (!newReviewText.trim()) return;
    
    setReviews([
      {
        id: Date.now(),
        name: "You (Guest)",
        initials: "YG",
        date: "Posted just now",
        content: newReviewText,
        rating: newReviewRating,
      },
      ...reviews
    ]);
    
    setIsWritingReview(false);
    setNewReviewText("");
    setNewReviewRating(5);
  };

  return (
    <div className="bg-transparent">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <BackButton to="/products" />
        </div>

        <div className="flex flex-col md:flex-row gap-12 mb-16 items-start">
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center p-8">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-auto max-h-[500px] object-contain opacity-90"
                referrerPolicy="no-referrer"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all bg-white/5 backdrop-blur-sm flex items-center justify-center p-2 ${selectedImage === img ? 'border-emerald-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain opacity-90" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-2">
              <span className="text-sm font-bold text-emerald-500 uppercase tracking-wider">{product.brand}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-white">{product.rating}</span>
                <span className="text-slate-400">({product.reviews} reviews)</span>
              </div>
              <Badge variant="secondary" className="bg-white/10 text-slate-200 border-none backdrop-blur-sm">{product.category}</Badge>
            </div>

            <div className="flex flex-row gap-3 sm:gap-4 mb-8 w-full">
              <div className="bg-[#1F2937]/40 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/10 text-center flex-1 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <div className="text-xs sm:text-sm text-slate-400 mb-1 font-medium tracking-wide uppercase">THC</div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">{product.thc}</div>
              </div>
              <div className="bg-[#1F2937]/40 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/10 text-center flex-1 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <div className="text-xs sm:text-sm text-slate-400 mb-1 font-medium tracking-wide uppercase">CBD</div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">{product.cbd}</div>
              </div>
            </div>

            <p className="text-slate-300/90 mb-10 leading-relaxed text-base sm:text-lg">
              {product.description || `Experience the premium quality of ${product.brand}'s ${product.name}. Carefully crafted and lab-tested to ensure the highest standards of purity and potency. Perfect for those seeking reliable and consistent effects.`}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
              <Button 
                onClick={toggleWishlist}
                className={`w-full sm:w-auto h-14 text-base sm:text-lg px-8 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSaved 
                    ? "bg-rose-500/10 text-rose-500 border border-rose-500/50 hover:bg-rose-500/20" 
                    : "bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)]"
                }`}
              >
                <Heart className={`h-5 w-5 transition-transform duration-300 ${isSaved ? "fill-rose-500 scale-110" : "group-hover:scale-110"}`} />
                {isSaved ? "Saved to Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-10">
              <div className="flex flex-row sm:flex-col items-center sm:text-center text-left gap-4 sm:gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Lab Tested</div>
                  <div className="text-xs text-slate-400">100% Verified</div>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:text-center text-left gap-4 sm:gap-2">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Support</div>
                  <div className="text-xs text-slate-400">Educational Purposes</div>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:text-center text-left gap-4 sm:gap-2">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] shrink-0">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Education</div>
                  <div className="text-xs text-slate-400">Strain Information</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Section */}
        <div className="border-t border-white/10 pt-12">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* About */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">About {product.name}</h2>
              <div className="prose prose-emerald prose-invert max-w-none text-slate-300">
                <p>{product.description}</p>
              </div>
            </section>

            {/* Effects Breakdown */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Effects & Attributes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="bg-[#1F2937]/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-3">
                    <ThumbsUp className="h-5 w-5 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Top Effects
                  </h3>
                  <div className="space-y-4">
                    {product.effects?.map(effect => (
                      <div key={effect.name} className="group">
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{effect.name}</span>
                          <span className="text-slate-400">{effect.val}%</span>
                        </div>
                        <div className="w-full bg-[#111827] rounded-full h-2.5 overflow-hidden border border-white/5">
                          <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${effect.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#1F2937]/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-3">
                    <Info className="h-5 w-5 text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" /> Medical Uses
                  </h3>
                  <div className="space-y-4">
                    {product.medical?.map(effect => (
                      <div key={effect.name} className="group">
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{effect.name}</span>
                          <span className="text-slate-400">{effect.val}%</span>
                        </div>
                        <div className="w-full bg-[#111827] rounded-full h-2.5 overflow-hidden border border-white/5">
                          <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${effect.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#1F2937]/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" /> Negatives
                  </h3>
                  <div className="space-y-4">
                    {product.negatives?.map(effect => (
                      <div key={effect.name} className="group">
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{effect.name}</span>
                          <span className="text-slate-400">{effect.val}%</span>
                        </div>
                        <div className="w-full bg-[#111827] rounded-full h-2.5 overflow-hidden border border-white/5">
                          <div className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${effect.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section className="pb-16">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-white tracking-tight">User Reviews</h2>
                <Button 
                  onClick={() => setIsWritingReview(!isWritingReview)}
                  variant="outline" 
                  className="w-full sm:w-auto bg-[#1F2937]/40 border-white/10 text-white hover:bg-white/10 transition-all duration-300"
                >
                  {isWritingReview ? "Cancel" : "Write Review"}
                </Button>
              </div>

              {isWritingReview && (
                <div className="bg-[#1F2937]/30 backdrop-blur-md border border-white/10 p-5 sm:p-6 rounded-2xl transition-all duration-300 mb-8 animation-fade-in text-white">
                  <h3 className="font-semibold text-lg mb-4">Write your review</h3>
                  <div className="mb-4">
                    <label className="text-sm text-slate-300 block mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReviewRating(star)}
                          className="hover:scale-110 transition-transform focus:outline-none"
                        >
                          <Star className={`h-6 w-6 ${newReviewRating >= star ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.6)]" : "text-slate-500"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm text-slate-300 block mb-2">Your Experience</label>
                    <textarea 
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="Share your botanical analysis, terpene observations, or physiological notes..."
                      className="w-full bg-[#0F172A]/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-500 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSubmitReview}
                      disabled={!newReviewText.trim()}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-6 rounded-xl"
                    >
                      Submit Review
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-[#1F2937]/20 backdrop-blur-sm border border-white/5 p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:bg-[#1F2937]/40">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center font-bold text-slate-300 shadow-inner">
                          {review.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{review.name}</div>
                          <div className="text-xs text-slate-500">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.4)]">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className={`h-4 w-4 ${review.rating >= star ? 'fill-current' : 'text-slate-600'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed">
                      "{review.content}"
                    </p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 h-12 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all font-medium rounded-xl">Read All {product.reviews + (reviews.length - INITIAL_REVIEWS.length)} Reviews</Button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
