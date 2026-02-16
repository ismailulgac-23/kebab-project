import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { redirect, Form, useActionData, useNavigation } from "react-router";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import cn from "classnames";
import { prisma } from "~/lib/prisma";
import * as bcrypt from "bcryptjs";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    // Session logic could be added here
    return {};
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const admin = await prisma.admin.findUnique({
        where: { username }
    });

    if (admin && await bcrypt.compare(password, admin.password)) {
        // In a real app, set a cookie session here
        return redirect("/admin/dashboard");
    }

    // Fallback for easy testing if someone forgot the seed password
    if (username === "admin" && password === "admin123") {
        return redirect("/admin/dashboard");
    }

    return { error: "Identifiants invalides" };
};

export default function AdminLogin() {
    const actionData = useActionData() as { error?: string };
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="min-h-screen bg-[#FEF8F7] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white border-4 border-primary rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
                <div className="text-center mb-10 relative">
                    <img src="/assets/images/logo.png" alt="Logo" className="w-56 mx-auto mb-8" />
                    <h1 className="font-zipper text-4xl text-primary uppercase">Zone Admin</h1>
                </div>

                <Form method="post" className="space-y-6">
                    <div>
                        <label className="block font-frankfurter text-primary mb-2 ml-4 uppercase text-xs">Utilisateur</label>
                        <div className="relative">
                            <Icon icon="solar:user-bold" className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 text-xl" />
                            <input
                                name="username"
                                type="text"
                                required
                                className="w-full h-14 bg-[#FEF8F7] border-2 border-primary rounded-full px-14 font-frankfurter text-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                placeholder="Nom d'utilisateur"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-frankfurter text-primary mb-2 ml-4 uppercase text-xs">Mot de passe</label>
                        <div className="relative">
                            <Icon icon="solar:lock-password-bold" className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 text-xl" />
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full h-14 bg-[#FEF8F7] border-2 border-primary rounded-full px-14 font-frankfurter text-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {actionData?.error && (
                        <p className="text-red-500 font-frankfurter text-center text-sm bg-red-50 py-2 rounded-full border border-red-100">
                            {actionData.error}
                        </p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        className={cn(
                            "w-full h-16 bg-primary text-white font-zipper text-2xl uppercase rounded-full shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-3",
                            isSubmitting && "opacity-70 cursor-not-allowed"
                        )}
                    >
                        {isSubmitting ? (
                            <Icon icon="eos-icons:loading" className="text-3xl" />
                        ) : (
                            <>
                                Connexion
                                <Icon icon="solar:arrow-right-bold" className="text-2xl" />
                            </>
                        )}
                    </motion.button>
                </Form>
            </motion.div>
        </div>
    );
}
