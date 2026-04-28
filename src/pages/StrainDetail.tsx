import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Info, AlertTriangle, ThumbsUp, Heart, ShieldCheck, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { STRAINS } from "@/data/strains";
import { useWishlist } from "@/contexts/WishlistContext";
import { BackButton } from "@/components/PremiumButtons";

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Jessica P.",
    initials: "JP",
    date: "Posted 2 days ago",
    content: "A textbook example of how a balanced myrcene and caryophyllene profile can interact. The biphasic nature of the cannabinoids here is very clear; lower temperatures yielded more cerebral, focusing effects, while higher vaporization temperatures unlocked the heavier, more sedative properties.",
    rating: 5,
  },
  {
    id: 2,
    name: "Omar K.",
    initials: "OK",
    date: "Posted 1 week ago",
    content: "Incredible phenotypic expression in this batch. The terpene profile is dominated by terpinolene and limonene, which accounts for the sharp citrusy aroma and the highly energetic, alertness-promoting physiological response. Excellent for studying sativa-dominant morphology.",
    rating: 5,
  },
  {
    id: 3,
    name: "Tyler W.",
    initials: "TW",
    date: "Posted 2 weeks ago",
    content: "Fascinating cannabinoid ratio. The presence of roughly 1% CBD alongside the THC significantly modulates the psychoactivity, reducing the likelihood of tachycardia or anxiety often associated with high-THC cultivars. Great case study in the entourage mechanism.",
    rating: 4,
  }
];

export function StrainDetail() {
  const { id } = useParams();
  const strain = STRAINS.find(s => s.id === id) || STRAINS[0];
  const [selectedImage, setSelectedImage] = useState(strain.image);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(strain.id);

  const toggleWishlist = () => {
    if (isSaved) {
      removeFromWishlist(strain.id);
    } else {
      addToWishlist({
        id: strain.id,
        name: strain.name,
        image: strain.image,
        type: 'strain'
      });
    }
  };

  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  useEffect(() => {
    setSelectedImage(strain.image);
    // Reset reviews if the strain changes, normally you'd fetch from an API
    setReviews(INITIAL_REVIEWS);
    setIsWritingReview(false);
  }, [strain]);

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
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8 -mb-4">
        <BackButton to="/strains" />
      </div>

      {/* HERO SECTION */}
      <div className="relative text-white py-12 md:py-20 border-b border-white/10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-start relative z-10">
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
              <img 
                src={selectedImage} 
                alt={strain.name} 
                className="w-full h-auto max-h-[400px] object-contain opacity-90"
                referrerPolicy="no-referrer"
              />
            </div>
            {strain.images && strain.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {strain.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-emerald-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`${strain.name} ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-full md:w-2/3 flex flex-col items-start">
            <div className="flex gap-2 mb-4">
              <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none">{strain.type}</Badge>
              <Badge variant="outline" className="text-slate-300 border-white/20 bg-white/5">THC {strain.thc}</Badge>
              <Badge variant="outline" className="text-slate-300 border-white/20 bg-white/5">CBD {strain.cbd}</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{strain.name}</h1>
            <div className="flex items-center gap-4 mb-6 text-slate-300">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-white text-lg">{strain.rating}</span>
                <span>({strain.reviews.toLocaleString()} reviews)</span>
              </div>
              <div className="w-1 h-1 bg-slate-600 rounded-full" />
              <button 
                onClick={toggleWishlist}
                className={`flex items-center gap-2 transition-all group ${isSaved ? "text-rose-400" : "text-slate-300 hover:text-white"}`}
              >
                <Heart className={`h-5 w-5 transition-all duration-300 ${isSaved ? "fill-rose-500 text-rose-500 scale-110" : "group-hover:scale-110 group-hover:text-rose-400"}`} />
                <span className="font-medium">{isSaved ? "Saved to Wishlist" : "Save to Wishlist"}</span>
              </button>
            </div>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
              {strain.description.split('.')[0]}. {strain.description.split('.')[1]}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                Write a Review
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-8 w-full">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-white">Lab Tested</span>
                <span className="text-xs text-slate-400">100% Verified</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-white">Support</span>
                <span className="text-xs text-slate-400">Educational Purposes</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-white">Education</span>
                <span className="text-xs text-slate-400">Strain Information</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-12">
          {/* About */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">About {strain.name}</h2>
            <div className="prose prose-emerald prose-invert max-w-none text-slate-300">
              <p>{strain.description}</p>
            </div>
          </section>

          {/* Effects Breakdown */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Effects & Attributes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-emerald-500" /> Top Effects
                </h3>
                <div className="space-y-3">
                  {strain.effects.map(effect => (
                    <div key={effect.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">{effect.name}</span>
                        <span className="text-slate-400">{effect.val}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${effect.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-cyan-500" /> Medical Uses
                </h3>
                <div className="space-y-3">
                  {strain.medical.map(effect => (
                    <div key={effect.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">{effect.name}</span>
                        <span className="text-slate-400">{effect.val}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${effect.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" /> Negatives
                </h3>
                <div className="space-y-3">
                  {strain.negatives.map(effect => (
                    <div key={effect.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">{effect.name}</span>
                        <span className="text-slate-400">{effect.val}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-red-400 h-2 rounded-full" style={{ width: `${effect.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">User Reviews</h2>
              <Button 
                onClick={() => setIsWritingReview(!isWritingReview)}
                variant="outline" 
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
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
                <div key={review.id} className="border-b border-white/10 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center font-bold text-slate-300">
                        {review.initials}
                      </div>
                      <span className="font-semibold text-white">{review.name}</span>
                    </div>
                    <div className="flex text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.4)]">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className={`h-4 w-4 ${review.rating >= star ? 'fill-current' : 'text-slate-600'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">
                    "{review.content}"
                  </p>
                  <span className="text-xs text-slate-500">{review.date}</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-emerald-400 hover:text-emerald-300 hover:bg-white/5">Read All {strain.reviews.toLocaleString()} Reviews</Button>
          </section>
        </div>

        {/* SIDEBAR */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 space-y-6">
            {/* Similar Strains */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h3 className="font-bold text-white mb-4">Similar Strains</h3>
              <div className="space-y-4">
                {STRAINS.filter(s => s.id !== strain.id && s.type === strain.type).slice(0, 3).map(sim => (
                  <Link key={sim.name} to={`/strains/${sim.id}`} className="flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-slate-800 rounded-md overflow-hidden">
                      <img src={sim.image} alt={sim.name} className="w-full h-full object-cover opacity-90" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white group-hover:text-emerald-400 transition-colors">{sim.name}</p>
                      <p className="text-xs text-slate-400">{sim.type}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
