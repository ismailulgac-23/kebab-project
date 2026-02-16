import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { Form, useLoaderData, useNavigation, useSubmit } from "react-router";
import { prisma } from "~/lib/prisma";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import cn from "classnames";

export const loader = async () => {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" }
    });
    const categories = await prisma.category.findMany();
    return { products, categories };
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "delete") {
        const id = formData.get("id") as string;
        await prisma.product.delete({ where: { id } });
        return { success: true };
    }

    if (intent === "create" || intent === "update") {
        const id = formData.get("id") as string;
        const name = formData.get("name") as string;
        const price = parseFloat(formData.get("price") as string);
        const categoryId = formData.get("categoryId") as string;
        const size = formData.get("size") as string;
        const color = formData.get("color") as string;
        const description = formData.get("description") as string;
        const image = formData.get("image") as string;

        const data = {
            name,
            price,
            categoryId,
            size,
            color,
            description,
            image
        };

        if (intent === "update") {
            await prisma.product.update({ where: { id }, data });
        } else {
            await prisma.product.create({ data });
        }
    }

    return { success: true };
};

export default function AdminProducts() {
    const { products, categories } = useLoaderData<typeof loader>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [previewImage, setPreviewImage] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const submit = useSubmit();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";

    // Form gönderildikten sonra modalı kapat
    useEffect(() => {
        if (!isSubmitting && navigation.state === "idle" && isModalOpen) {
            setIsModalOpen(false);
            setEditingProduct(null);
            setPreviewImage("");
        }
    }, [navigation.state, isSubmitting]);

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setPreviewImage(product.image || "");
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setPreviewImage("");
        setIsModalOpen(true);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Instant local preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Server upload
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            if (result.imageUrl) {
                setPreviewImage(result.imageUrl); // Update with final server URL
            }
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-8 rounded-[40px] border-4 border-primary shadow-xl">
                <div>
                    <h3 className="font-zipper text-3xl text-primary uppercase">Gestion des Produits</h3>
                    <p className="font-frankfurter text-primary/60">{products.length} produits au total</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddNew}
                    className="bg-primary text-white font-zipper text-2xl uppercase px-8 py-4 rounded-full flex items-center gap-3 shadow-lg shadow-primary/30"
                >
                    <Icon icon="solar:add-circle-bold" className="text-3xl" />
                    Nouveau Produit
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence>
                    {products.map((product, i) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: i * 0.05 }}
                            key={product.id}
                            className="bg-white border-4 border-primary rounded-[40px] overflow-hidden group hover:shadow-2xl transition-all"
                        >
                            <div className="h-64 relative overflow-hidden bg-gray-100">
                                <img
                                    src={product.image || "/assets/images/t-shirt.png"}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full border-2 border-primary font-zipper text-primary">
                                    {product.price.toFixed(2)}€
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-zipper text-2xl text-primary uppercase leading-tight">{product.name}</h4>
                                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full font-frankfurter text-[10px] uppercase mt-2">
                                            {product.category.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="flex-1 h-12 bg-white border-2 border-primary text-primary rounded-full font-zipper uppercase flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all"
                                    >
                                        <Icon icon="solar:pen-bold" />
                                        Modifier
                                    </button>
                                    <Form method="post" className="flex-1">
                                        <input type="hidden" name="intent" value="delete" />
                                        <input type="hidden" name="id" value={product.id} />
                                        <button
                                            type="submit"
                                            className="w-full h-12 bg-red-50 text-red-600 border-2 border-red-600 rounded-full font-zipper uppercase flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all"
                                        >
                                            <Icon icon="solar:trash-bin-trash-bold" />
                                            Supprimer
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal / Overlay */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-primary/20 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white border-4 border-primary rounded-[50px] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-12 shadow-2xl"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-8 right-8 text-primary hover:rotate-90 transition-transform"
                            >
                                <Icon icon="solar:close-circle-bold" className="text-4xl" />
                            </button>

                            <h2 className="font-zipper text-4xl text-primary uppercase mb-12">
                                {editingProduct ? "Modifier Produit" : "Ajouter un Produit"}
                            </h2>

                            <Form method="post" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <input type="hidden" name="intent" value={editingProduct ? "update" : "create"} />
                                {editingProduct && <input type="hidden" name="id" value={editingProduct.id} />}
                                <input type="hidden" name="image" value={previewImage} />

                                <div className="space-y-6">
                                    <div>
                                        <label className="block font-frankfurter text-primary mb-2 ml-4 uppercase text-xs tracking-widest">Nom du produit</label>
                                        <input
                                            name="name"
                                            defaultValue={editingProduct?.name}
                                            required
                                            className="w-full h-14 bg-[#FEF8F7] border-2 border-primary rounded-full px-6 font-frankfurter text-primary focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-frankfurter text-primary mb-2 ml-4 uppercase text-xs tracking-widest">Prix (€)</label>
                                            <input
                                                name="price"
                                                type="number"
                                                step="0.01"
                                                defaultValue={editingProduct?.price}
                                                required
                                                className="w-full h-14 bg-[#FEF8F7] border-2 border-primary rounded-full px-6 font-frankfurter text-primary focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-frankfurter text-primary mb-2 ml-4 uppercase text-xs tracking-widest">Catégorie</label>
                                            <select
                                                name="categoryId"
                                                defaultValue={editingProduct?.categoryId}
                                                className="w-full h-14 bg-[#FEF8F7] border-2 border-primary rounded-full px-6 font-frankfurter text-primary focus:outline-none appearance-none"
                                            >
                                                {categories.map(c => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-frankfurter text-primary mb-2 ml-4 uppercase text-xs tracking-widest">Taille</label>
                                            <input
                                                name="size"
                                                defaultValue={editingProduct?.size}
                                                placeholder="M, L, XL..."
                                                className="w-full h-14 bg-[#FEF8F7] border-2 border-primary rounded-full px-6 font-frankfurter text-primary focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-frankfurter text-primary mb-2 ml-4 uppercase text-xs tracking-widest">Couleur</label>
                                            <input
                                                name="color"
                                                defaultValue={editingProduct?.color}
                                                placeholder="Noir, Rouge..."
                                                className="w-full h-14 bg-[#FEF8F7] border-2 border-primary rounded-full px-6 font-frankfurter text-primary focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-frankfurter text-primary mb-2 ml-4 uppercase text-xs tracking-widest">Description</label>
                                        <textarea
                                            name="description"
                                            defaultValue={editingProduct?.description}
                                            rows={4}
                                            className="w-full bg-[#FEF8F7] border-2 border-primary rounded-[30px] p-6 font-frankfurter text-primary focus:outline-none resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <label className="block font-frankfurter text-primary mb-2 ml-4 uppercase text-center text-xs tracking-widest">Image du produit</label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full aspect-square bg-[#FEF8F7] border-4 border-dashed border-primary/30 rounded-[40px] flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all overflow-hidden relative group"
                                    >
                                        {previewImage ? (
                                            <>
                                                <img src={previewImage} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <Icon icon="solar:upload-minimalistic-bold" className="text-5xl text-white" />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Icon icon="solar:gallery-upload-bold" className="text-6xl text-primary/30 mb-4" />
                                                <span className="font-frankfurter text-primary/40">Cliquez para uploader</span>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleFileUpload}
                                        accept="image/*"
                                    />

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full h-20 bg-primary text-white font-zipper text-3xl uppercase rounded-full shadow-xl shadow-primary/30 mt-8"
                                    >
                                        Enregistrer le produit
                                    </motion.button>
                                </div>
                            </Form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
