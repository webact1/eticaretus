export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? undefined}
        className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
      />
    </div>
  );
}

export function TextareaField({
  label,
  name,
  defaultValue,
  rows = 4,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <textarea
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue ?? undefined}
        className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
      />
    </div>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <select
        name={name}
        defaultValue={defaultValue ?? undefined}
        className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2.5 text-sm font-medium text-ink">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
      />
      {label}
    </label>
  );
}

export function ImageField({
  label,
  name,
  currentUrl,
}: {
  label: string;
  name: string;
  currentUrl?: string | null;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      {currentUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={currentUrl} alt="" className="mb-2 h-20 w-auto rounded-lg border border-border object-contain" />
      )}
      <input
        name={name}
        type="file"
        accept="image/*"
        className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
      />
      <p className="mt-1 text-xs text-muted">Boş bırakırsanız mevcut görsel korunur.</p>
    </div>
  );
}

export function SubmitButton({ label = "Kaydet" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
    >
      {label}
    </button>
  );
}

export function DeleteButton({ label = "Sil" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
    >
      {label}
    </button>
  );
}

export function AdminCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      {title && <h2 className="mb-4 text-base font-bold text-ink">{title}</h2>}
      {children}
    </div>
  );
}

export function DangerZone({
  action,
  hiddenFields,
  confirmLabel = "Bu kaydı sil",
}: {
  action: (formData: FormData) => void;
  hiddenFields: Record<string, string>;
  confirmLabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6">
      <p className="text-sm font-semibold text-red-700">Tehlikeli Bölge</p>
      <p className="mt-1 text-sm text-red-600/80">Bu işlem geri alınamaz.</p>
      <form action={action} className="mt-3">
        {Object.entries(hiddenFields).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
        <DeleteButton label={confirmLabel} />
      </form>
    </div>
  );
}

export function AdminPageHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-ink">{title}</h1>
      {action}
    </div>
  );
}
