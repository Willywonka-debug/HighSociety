/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { StrainExplorer } from "./pages/StrainExplorer";
import { StrainDetail } from "./pages/StrainDetail";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Learn } from "./pages/Learn";
import { ArticleDetail } from "./pages/ArticleDetail";
import { Cannabis101 } from "./pages/Cannabis101";
import { BeginnerGuides } from "./pages/BeginnerGuides";
import { TerpenesGuide } from "./pages/TerpenesGuide";
import { Auth } from "./pages/Auth";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Partners } from "./pages/Partners";
import { PartnerApplication } from "./pages/PartnerApplication";
import { Wishlist } from "./pages/Wishlist";
import { WishlistProvider } from "./contexts/WishlistContext";
import { Trending } from "./pages/Trending";
import { ComparisonTool } from "./pages/ComparisonTool";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { ScrollToTop } from "./components/ScrollToTop";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SpeedInsights />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="strains" element={<StrainExplorer />} />
            <Route path="strains/:id" element={<StrainDetail />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="compare" element={<ComparisonTool />} />
            <Route path="learn" element={<Learn />} />
            <Route path="learn/:id" element={<ArticleDetail />} />
            <Route path="cannabis-101" element={<Cannabis101 />} />
            <Route path="beginner-guides" element={<BeginnerGuides />} />
            <Route path="terpenes-guide" element={<TerpenesGuide />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="partners" element={<Partners />} />
            <Route path="partner-application" element={<PartnerApplication />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="trending" element={<Trending />} />
            <Route path="auth" element={<Auth />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  );
}
