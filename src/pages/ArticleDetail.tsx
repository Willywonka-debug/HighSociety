import { useParams, Link } from "react-router-dom";
import { FEATURED_ARTICLE, ARTICLES } from "@/data/articles";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Markdown from "react-markdown";

export function ArticleDetail() {
  const { id } = useParams();
  
  // Find the article in either FEATURED_ARTICLE or ARTICLES
  const article = FEATURED_ARTICLE.id === id 
    ? FEATURED_ARTICLE 
    : ARTICLES.find(a => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
        <h1 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Article Not Found</h1>
        <Link to="/learn" className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-2 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen pb-20">
      {/* Hero Section */}
      <div className="w-full h-[40vh] md:h-[50vh] relative overflow-hidden border-b border-white/10">
        <img 
          src={article.image} 
          alt={article.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link to="/learn" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to News
            </Link>
            <div className="mb-4">
              <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none">{article.category}</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium text-white">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="prose prose-lg prose-invert prose-emerald max-w-none">
          <div className="text-xl text-slate-300 font-medium mb-8 leading-relaxed border-l-4 border-emerald-500 pl-6">
            {article.excerpt}
          </div>
          
          <div className="markdown-body text-slate-200 leading-relaxed space-y-6">
            <Markdown>{article.content || "Content coming soon."}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
