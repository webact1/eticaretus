import { notFound } from "next/navigation";
import { AdminPageHeader, DangerZone } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";
import { ProviderForm } from "../ProviderForm";
import { updateProvider, deleteProvider } from "../actions";

export default async function EditProviderPage({
  params,
}: PageProps<"/admin/cozumler/[id]">) {
  const { id } = await params;
  const provider = await prisma.provider.findUnique({ where: { id } });
  if (!provider) notFound();

  return (
    <div className="space-y-6">
      <AdminPageHeader title={`Düzenle: ${provider.name}`} />
      <ProviderForm provider={provider} action={updateProvider.bind(null, provider.id)} />
      <DangerZone action={deleteProvider} hiddenFields={{ id: provider.id }} confirmLabel="Bu çözümü sil" />
    </div>
  );
}
