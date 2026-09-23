import { AdminPageHeader } from "@/components/admin/fields";
import { ServiceForm } from "../ServiceForm";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <div>
      <AdminPageHeader title="Yeni Hizmet" />
      <ServiceForm action={createService} />
    </div>
  );
}
