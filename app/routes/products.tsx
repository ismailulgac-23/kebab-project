import { Link, useLoaderData } from "react-router";
import cn from "classnames";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { prisma } from "~/lib/prisma";
import { Topbar, Footer, Marquee } from "./home";

export const loader = async () => {
  const products = await prisma.product.findMany({
    include: { category: true }
  });
  const categories = await prisma.category.findMany();
  return { products, categories };
};

export default function Products() {
  const { products: dbProducts, categories } = useLoaderData<typeof loader>();

  // Transform DB products to frontend format
  const mappedProducts = dbProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    category: p.category.name,
    size: p.size || "Unique",
    color: p.color || "N/A",
    image: p.image || "/assets/images/t-shirt.png",
    description: p.description
  }));

  const [filteredProducts, setFilteredProducts] = useState(mappedProducts);
  const [activeFilters, setActiveFilters] = useState({
    category: "all",
    size: "all",
    color: "all",
    priceRange: "all"
  });

  useEffect(() => {
    applyFilters(activeFilters);
  }, [dbProducts]);

  const applyFilters = (filters: typeof activeFilters) => {
    let filtered = mappedProducts;

    if (filters.category !== "all") {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.size !== "all") {
      filtered = filtered.filter(p => p.size === filters.size);
    }
    if (filters.color !== "all") {
      filtered = filtered.filter(p => p.color === filters.color);
    }

    if (filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "0-20": filtered = filtered.filter(p => p.price <= 20); break;
        case "20-40": filtered = filtered.filter(p => p.price > 20 && p.price <= 40); break;
        case "40+": filtered = filtered.filter(p => p.price > 40); break;
      }
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (key: string, value: string) => {
    const next = { ...activeFilters, [key]: value };
    setActiveFilters(next);
    applyFilters(next);
  };

  return (
    <div className="bg-[#FEF8F7] min-h-screen">
      <Topbar />
      <Marquee text="SHOP BABA - SHOP BABA - SHOP BABA - SHOP BABA" />

      <div className="container mx-auto py-20 px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b-4 border-primary pb-8">
          <div>
            <h1 className="font-zipper text-7xl text-primary uppercase leading-none">Nos Merchs</h1>
            <p className="font-frankfurter text-primary/60 mt-4 uppercase tracking-widest">
              {filteredProducts.length} ARTICLES TROUVÉS
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="bg-white border-2 border-primary rounded-full px-6 py-2 font-frankfurter text-primary outline-none"
            >
              <option value="all">Catégories</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
            <select
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="bg-white border-2 border-primary rounded-full px-6 py-2 font-frankfurter text-primary outline-none"
            >
              <option value="all">Prix</option>
              <option value="0-20">0€ - 20€</option>
              <option value="20-40">20€ - 40€</option>
              <option value="40+">40€+</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {filteredProducts.map((product, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={product.id}
              className="group"
            >
              <div className="bg-white border-4 border-primary rounded-[40px] overflow-hidden p-6 hover:shadow-2xl transition-all relative">
                <div className="aspect-square rounded-[30px] overflow-hidden mb-6 bg-gray-50 border-2 border-primary/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-zipper text-2xl text-primary uppercase truncate mb-1">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-zipper text-3xl text-primary">{product.price.toFixed(2)}€</span>
                  <button className="bg-primary text-white font-zipper px-6 py-2 rounded-full uppercase text-sm hover:scale-105 transition-transform">
                    Voir
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-40">
            <Icon icon="solar:box-minimalistic-bold" className="text-8xl text-primary/10 mx-auto mb-6" />
            <h2 className="font-zipper text-4xl text-primary uppercase">Aucun article trouvé</h2>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
