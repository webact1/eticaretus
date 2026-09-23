import { notFound } from "next/navigation";
import { AdminPageHeader, DangerZone } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "../ServiceForm";
import { updateService, deleteService } from "../actions";

export default async function EditServicePage({ params }: PageProps<"/admin/hizmetler/[id]">) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div className="space-y-6">
      <AdminPageHeader title={`Düzenle: ${service.name}`} />
      <ServiceForm service={service} action={updateService.bind(null, service.id)} />
      <DangerZone action={deleteService} hiddenFields={{ id: service.id }} confirmLabel="Bu hizmeti sil" />
    </div>
  );
}
