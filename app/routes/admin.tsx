import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import cn from "classnames";

const navItems = [
    { label: "Dashboard", icon: "solar:widget-bold", path: "/admin/dashboard" },
    { label: "Produits", icon: "solar:box-bold", path: "/admin/products" },
];

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-[#FEF8F7] font-sans">
            {/* Sidebar */}
            <aside className="w-80 bg-white border-r-4 border-primary flex flex-col p-8 fixed h-full z-50">
                <div className="mb-12">
                    <Link to="/">
                        <img src="/assets/images/logo.png" alt="Logo" className="w-40" />
                    </Link>
                    <div className="mt-4 flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-frankfurter text-primary text-sm uppercase">Admin en ligne</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="block group"
                            >
                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className={cn(
                                        "flex items-center gap-4 px-6 py-4 rounded-full transition-all border-2",
                                        isActive
                                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                            : "bg-white text-primary border-transparent hover:border-primary/20"
                                    )}
                                >
                                    <Icon icon={item.icon} className="text-2xl" />
                                    <span className="font-zipper text-xl uppercase pt-1">{item.label}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={() => navigate("/")}
                    className="mt-auto flex items-center gap-4 px-6 py-4 rounded-full text-primary font-zipper text-xl uppercase border-2 border-transparent hover:border-primary transition-all group"
                >
                    <Icon icon="solar:logout-bold" className="text-2xl group-hover:rotate-180 transition-transform duration-500" />
                    Quitter
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-80 p-12">
                <header className="flex justify-between items-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="font-zipper text-5xl text-primary uppercase leading-none">
                            {navItems.find(i => i.path === location.pathname)?.label || "Dashboard"}
                        </h2>
                        <p className="font-frankfurter text-primary/60 mt-2">Bienvenue sur votre espace de gestion</p>
                    </motion.div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 bg-white border-2 border-primary rounded-full px-4 py-2 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-zipper text-xl">A</div>
                            <span className="font-frankfurter text-primary hidden lg:block">Admin Baba</span>
                        </div>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
