import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/routes/index";
import About from "@/routes/about";
import Contact from "@/routes/contact";

import DataSourcesIndex from "@/routes/data-sources.index";
import DataSourcesSlug from "@/routes/data-sources.$slug";

import IndustriesIndex from "@/routes/industries.index";
import IndustriesSlug from "@/routes/industries.$slug";

import ProductsIndex from "@/routes/products.index";
import ProductsSlug from "@/routes/products.$slug";

import ServicesIndex from "@/routes/services.index";
import ServicesSlug from "@/routes/services.$slug";

export function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/data-sources" element={<DataSourcesIndex />} />
          <Route path="/data-sources/:slug" element={<DataSourcesSlug />} />
          
          <Route path="/industries" element={<IndustriesIndex />} />
          <Route path="/industries/:slug" element={<IndustriesSlug />} />
          
          <Route path="/products" element={<ProductsIndex />} />
          <Route path="/products/:slug" element={<ProductsSlug />} />
          
          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/:slug" element={<ServicesSlug />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}
