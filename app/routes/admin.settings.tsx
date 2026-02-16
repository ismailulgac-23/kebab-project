import { Icon } from "@iconify/react";

export default function AdminSettings() {
    return (
        <div className="bg-white p-12 rounded-[40px] border-4 border-primary shadow-xl text-center">
            <Icon icon="solar:settings-bold-duotone" className="text-8xl text-primary/10 mx-auto mb-6" />
            <h2 className="font-zipper text-4xl text-primary uppercase">Paramètres</h2>
            <p className="font-frankfurter text-primary/40 mt-4">Cette fonctionnalité sera disponible prochainement.</p>
        </div>
    );
}
