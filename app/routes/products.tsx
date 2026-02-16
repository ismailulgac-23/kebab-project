import { Link } from "react-router";
import type { Route } from "./+types/home";
import cn from "classnames";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import Input from "~/components/Input";
import { Icon } from "@iconify/react";
import { Footer, Marquee, Topbar } from "./home";
import { useState, useRef, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kebs Baba | Products" },
    { name: "description", content: "Kebs Baba | Products" },
  ];
}

// Fake ürün verileri
const mockProducts = [
  { id: 1, name: "Tee-shirt Baba", price: "25,00€", category: "tshirt", size: "M", color: "noir", image: "/assets/images/t-shirt.png" },
  { id: 2, name: "Hoodie Kebs", price: "45,00€", category: "hoodie", size: "L", color: "rouge", image: "/assets/images/t-shirt.png" },
  { id: 3, name: "Casquette Baba", price: "20,00€", category: "accessoire", size: "unique", color: "noir", image: "/assets/images/t-shirt.png" },
  { id: 4, name: "Tee-shirt Vintage", price: "30,00€", category: "tshirt", size: "S", color: "blanc", image: "/assets/images/t-shirt.png" },
  { id: 5, name: "Sweat Kebs", price: "40,00€", category: "hoodie", size: "XL", color: "rouge", image: "/assets/images/t-shirt.png" },
  { id: 6, name: "Sac Baba", price: "15,00€", category: "accessoire", size: "unique", color: "noir", image: "/assets/images/t-shirt.png" },
  { id: 7, name: "Tee-shirt Premium", price: "35,00€", category: "tshirt", size: "M", color: "blanc", image: "/assets/images/t-shirt.png" },
  { id: 8, name: "Hoodie Limited", price: "50,00€", category: "hoodie", size: "L", color: "noir", image: "/assets/images/t-shirt.png" },
  { id: 9, name: "Sticker Pack", price: "10,00€", category: "accessoire", size: "unique", color: "multicolor", image: "/assets/images/t-shirt.png" },
  { id: 10, name: "Tee-shirt Collector", price: "40,00€", category: "tshirt", size: "XL", color: "rouge", image: "/assets/images/t-shirt.png" },
  { id: 11, name: "Bonnet Baba", price: "18,00€", category: "accessoire", size: "unique", color: "noir", image: "/assets/images/t-shirt.png" },
  { id: 12, name: "Polo Kebs", price: "32,00€", category: "tshirt", size: "L", color: "blanc", image: "/assets/images/t-shirt.png" },
];

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [activeFilters, setActiveFilters] = useState({
    category: "all",
    size: "all",
    color: "all",
    priceRange: "all"
  });

  // Filtreleme fonksiyonu
  const applyFilters = (filters: typeof activeFilters) => {
    let filtered = mockProducts;

    if (filters.category !== "all") {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.size !== "all") {
      filtered = filtered.filter(product => product.size === filters.size);
    }

    if (filters.color !== "all") {
      filtered = filtered.filter(product => product.color === filters.color);
    }

    if (filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "0-20":
          filtered = filtered.filter(product => {
            const price = parseFloat(product.price.replace(",", ".").replace("€", ""));
            return price <= 20;
          });
          break;
        case "20-40":
          filtered = filtered.filter(product => {
            const price = parseFloat(product.price.replace(",", ".").replace("€", ""));
            return price > 20 && price <= 40;
          });
          break;
        case "40+":
          filtered = filtered.filter(product => {
            const price = parseFloat(product.price.replace(",", ".").replace("€", ""));
            return price > 40;
          });
          break;
      }
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };

  return (
    <div className="">
      {/* topbar */}
      <Topbar />

      {/* marquee */}
      <Marquee />

      <IntroText />

      <ProductList
        products={filteredProducts}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
      />

      <Footer />
    </div>
  );
};

// Custom Dropdown Component
const FilterDropdown = ({
  label,
  options,
  value,
  onChange,
  filterKey
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (filterType: string, value: string) => void;
  filterKey: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border-2 border-primary rounded-full bg-white hover:bg-gray-50 transition-colors min-w-[120px] justify-between"
      >
        <span className="font-frankfurter text-primary text-sm">
          {selectedOption?.label || label}
        </span>
        <Icon
          icon="fa-solid:chevron-down"
          className={cn(
            "text-primary w-3 h-3 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-primary rounded-2xl shadow-lg z-50 overflow-hidden"
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(filterKey, option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors font-frankfurter text-sm",
                value === option.value ? "bg-primary text-white" : "text-primary"
              )}
            >
              {option.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const ProductList = ({
  products,
  onFilterChange,
  activeFilters
}: {
  products: typeof mockProducts;
  onFilterChange: (filterType: string, value: string) => void;
  activeFilters: any;
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions = {
    category: [
      { value: "all", label: "Toutes catégories" },
      { value: "tshirt", label: "T-shirts" },
      { value: "hoodie", label: "Hoodies" },
      { value: "accessoire", label: "Accessoires" }
    ],
    size: [
      { value: "all", label: "Toutes tailles" },
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
      { value: "XL", label: "XL" },
      { value: "unique", label: "Taille unique" }
    ],
    color: [
      { value: "all", label: "Toutes couleurs" },
      { value: "noir", label: "Noir" },
      { value: "blanc", label: "Blanc" },
      { value: "rouge", label: "Rouge" },
      { value: "multicolor", label: "Multicolore" }
    ],
    priceRange: [
      { value: "all", label: "Tous prix" },
      { value: "0-20", label: "0€ - 20€" },
      { value: "20-40", label: "20€ - 40€" },
      { value: "40+", label: "40€+" }
    ]
  };

  return (
    <div className="mt-10 container mx-auto">
      {/* Filter Header */}
      <div className="border-b-2 border-b-primary w-full py-2 flex items-center justify-between">
        <div className="text-sm font-frankfurter text-primary">
          {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1.5"
        >
          <span className="text-lg font-frankfurter text-primary">Filtre</span>
          <Icon
            icon="fa-solid:chevron-down"
            className={cn(
              "text-primary w-4 h-4 transition-transform",
              showFilters && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Filter Dropdowns */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="py-6 border-b-2 border-b-primary"
        >
          <div className="flex flex-wrap gap-4">
            <FilterDropdown
              label="Catégorie"
              options={filterOptions.category}
              value={activeFilters.category}
              onChange={onFilterChange}
              filterKey="category"
            />
            <FilterDropdown
              label="Taille"
              options={filterOptions.size}
              value={activeFilters.size}
              onChange={onFilterChange}
              filterKey="size"
            />
            <FilterDropdown
              label="Couleur"
              options={filterOptions.color}
              value={activeFilters.color}
              onChange={onFilterChange}
              filterKey="color"
            />
            <FilterDropdown
              label="Prix"
              options={filterOptions.priceRange}
              value={activeFilters.priceRange}
              onChange={onFilterChange}
              filterKey="priceRange"
            />
            
            {/* Reset Filters Button */}
            <button
              onClick={() => {
                const resetFilters = { category: "all", size: "all", color: "all", priceRange: "all" };
                Object.keys(resetFilters).forEach(key => {
                  onFilterChange(key, resetFilters[key as keyof typeof resetFilters]);
                });
              }}
              className="px-4 py-2 text-sm font-frankfurter text-primary hover:text-red-600 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </motion.div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full py-10">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-xl font-cooper text-primary">
              Aucun produit trouvé avec ces filtres
            </p>
          </div>
        ) : (
          products.map((product) => (
            <Link
              to={"/products/" + product.id}
              key={product.id}
              className="border-2 border-primary rounded-3xl hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="rounded-tl-3xl rounded-tr-3xl w-full"
              />

              <div className="py-3.5 px-6">
                <h3 className="font-cooper text-primary uppercase text-[23px]">
                  {product.name}
                </h3>
                <p className="text-lg font-cooper mb-1">{product.price}</p>
                <div className="flex gap-2 mb-2">
                  <span className="text-xs font-cooper text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {product.size}
                  </span>
                  <span className="text-xs font-cooper text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {product.color}
                  </span>
                </div>
                <p className="mb-7 text-base font-cooper text-primary">
                  Pièce iconique du moment, le {product.name.toLowerCase()} allie confort
                  et caractère.
                </p>

                <button className="font-zipper font-medium text-2xl uppercase flex items-center justify-center h-10 px-4 pt-2 ml-auto cursor-pointer bg-white border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-colors">
                  Ajouter au panier
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

const IntroText = () => {
  return (
    <div className="container mx-auto relative">
      <img
        src="/assets/images/merchs-intro.png"
        className="w-[1168px] mx-auto"
      />

      <div className="hidden md:block">
        <img
          src="/assets/images/ouvert.png"
          className="w-[232px] absolute top-0 left-[2%]"
        />
        <img
          src="/assets/images/bonheur-cuisine.png"
          className="w-[232px] absolute bottom-[5%] -left-[2%]"
        />

        <img
          src="/assets/images/bonheur-kebab.png"
          className="w-[187px] absolute top-[9%] rotate-10 left-[30%]"
        />

        <img
          src="/assets/images/bonheur-kebab.png"
          className="w-[257px] absolute bottom-[5%] -rotate-7 right-[4%]"
        />
      </div>

      <div className="block md:hidden">
        <img
          src="/assets/images/ouvert.png"
          className="w-[100px] absolute -top-[2%] left-[0%]"
        />

        <img
          src="/assets/images/bonheur-kebab.png"
          className="w-[100px] absolute bottom-[0%] -rotate-7 right-[4%]"
        />
      </div>
    </div>
  );
};

export default Products;
