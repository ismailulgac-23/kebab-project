import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router";
import { prisma } from "~/lib/prisma";

export const loader = async () => {
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();
    return { productCount, categoryCount };
};

export default function AdminDashboard() {
    const { productCount, categoryCount } = useLoaderData<typeof loader>();

    const stats = [
        { label: "Ventes totales", value: "0€", icon: "solar:banknote-bold", color: "bg-blue-500" },
        { label: "Commandes", value: "0", icon: "solar:bag-bold-duotone", color: "bg-orange-500" },
        { label: "Produits", value: productCount.toString(), icon: "solar:box-bold-duotone", color: "bg-purple-500" },
        { label: "Catégories", value: categoryCount.toString(), icon: "solar:list-bold-duotone", color: "bg-green-500" },
    ];

    return (
        <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[40px] border-4 border-primary shadow-xl hover:shadow-2xl transition-all group"
                    >
                        <div className={stat.color + " w-16 h-16 rounded-3xl flex items-center justify-center text-white text-3xl mb-6 group-hover:rotate-12 transition-transform shadow-lg"}>
                            <Icon icon={stat.icon} />
                        </div>
                        <h3 className="font-frankfurter text-primary/60 uppercase tracking-wider text-sm mb-2">{stat.label}</h3>
                        <p className="font-zipper text-4xl text-primary">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Recent Orders Mockup */}
                <div className="bg-white p-10 rounded-[40px] border-4 border-primary shadow-xl">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-zipper text-3xl text-primary uppercase">Commandes Récentes</h3>
                        <button className="font-frankfurter text-primary underline">Voir tout</button>
                    </div>
                    <div className="space-y-6 text-center py-10">
                        <Icon icon="solar:history-bold" className="text-6xl text-primary/20 mx-auto mb-4" />
                        <p className="font-frankfurter text-primary/40">Aucune commande pour le moment</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-primary p-10 rounded-[40px] shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-[100px] group-hover:bg-white/20 transition-all duration-700" />

                    <h3 className="font-zipper text-4xl text-white uppercase mb-8 relative z-10">Actions Rapides</h3>

                    <div className="grid grid-cols-2 gap-6 relative z-10">
                        <motion.a
                            href="/admin/products"
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center justify-center gap-4 bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-[30px] p-8 text-white transition-all group/btn"
                        >
                            <Icon icon="solar:add-circle-bold" className="text-4xl group-hover/btn:scale-125 transition-transform" />
                            <span className="font-zipper text-xl uppercase">Ajouter Produit</span>
                        </motion.a>
                        <button className="flex flex-col items-center justify-center gap-4 bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-[30px] p-8 text-white transition-all group/btn">
                            <Icon icon="solar:sale-bold" className="text-4xl group-hover/btn:scale-125 transition-transform" />
                            <span className="font-zipper text-xl uppercase">Créer Coupon</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
