import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient();

const mockProducts = [
    { name: "Tee-shirt Baba", price: 25.0, category: "tshirt", size: "M", color: "noir", image: "/assets/images/t-shirt.png" },
    { name: "Hoodie Kebs", price: 45.0, category: "hoodie", size: "L", color: "rouge", image: "/assets/images/t-shirt.png" },
    { name: "Casquette Baba", price: 20.0, category: "accessoire", size: "unique", color: "noir", image: "/assets/images/t-shirt.png" },
    { name: "Tee-shirt Vintage", price: 30.0, category: "tshirt", size: "S", color: "blanc", image: "/assets/images/t-shirt.png" },
    { name: "Sweat Kebs", price: 40.0, category: "hoodie", size: "XL", color: "rouge", image: "/assets/images/t-shirt.png" },
    { name: "Sac Baba", price: 15.0, category: "accessoire", size: "unique", color: "noir", image: "/assets/images/t-shirt.png" },
    { name: "Tee-shirt Premium", price: 35.0, category: "tshirt", size: "M", color: "blanc", image: "/assets/images/t-shirt.png" },
    { name: "Hoodie Limited", price: 50.0, category: "hoodie", size: "L", color: "noir", image: "/assets/images/t-shirt.png" },
    { name: "Sticker Pack", price: 10.0, category: "accessoire", size: "unique", color: "multicolor", image: "/assets/images/t-shirt.png" },
    { name: "Tee-shirt Collector", price: 40.0, category: "tshirt", size: "XL", color: "rouge", image: "/assets/images/t-shirt.png" },
    { name: "Bonnet Baba", price: 18.0, category: "accessoire", size: "unique", color: "noir", image: "/assets/images/t-shirt.png" },
    { name: "Polo Kebs", price: 32.0, category: "tshirt", size: "L", color: "blanc", image: "/assets/images/t-shirt.png" },
];

async function main() {
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.admin.deleteMany();

    console.log("Cleanup finished.");

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.admin.create({
        data: {
            username: "admin",
            password: hashedPassword,
        },
    });
    console.log("Admin created: admin / admin123");

    const categoriesMap: { [key: string]: any } = {};
    const categoryNames = ["tshirt", "hoodie", "accessoire", "Döner", "Boissons"];

    for (const name of categoryNames) {
        const category = await prisma.category.create({
            data: { name },
        });
        categoriesMap[name] = category;
    }

    for (const p of mockProducts) {
        await prisma.product.create({
            data: {
                name: p.name,
                price: p.price,
                size: p.size,
                color: p.color,
                image: p.image,
                description: `Pièce iconique du moment, le ${p.name.toLowerCase()} allie confort et caractère.`,
                categoryId: categoriesMap[p.category].id,
            },
        });
    }

    console.log("Seed completed successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
