import { AdminPageHeader } from "@/components/admin/fields";
import { ProviderForm } from "../ProviderForm";
import { createProvider } from "../actions";

export default function NewProviderPage() {
  return (
    <div>
      <AdminPageHeader title="Yeni E-Ticaret Çözümü" />
      <ProviderForm action={createProvider} />
    </div>
  );
}
