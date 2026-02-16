import type { ActionFunctionArgs } from "react-router";
import fs from "node:fs/promises";
import path from "node:path";

export const action = async ({ request }: ActionFunctionArgs) => {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file || !(file instanceof File)) {
            return new Response(JSON.stringify({ error: "Dosya bulunamadı veya geçersiz" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Dosya içeriğini al
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Yükleme klasörünü belirle
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        // Klasör yoksa oluştur
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        // Benzersiz dosya adı oluştur
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const filePath = path.join(uploadDir, fileName);

        // Dosyayı yaz
        await fs.writeFile(filePath, buffer);

        return new Response(JSON.stringify({
            success: true,
            imageUrl: `/uploads/${fileName}`
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error: any) {
        console.error("Upload error:", error);
        return new Response(JSON.stringify({ error: "Yükleme başarısız oldu: " + error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
