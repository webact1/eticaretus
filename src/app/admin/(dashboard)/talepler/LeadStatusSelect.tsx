"use client";

import { useRef } from "react";
import { LEAD_STATUS, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/constants";
import { updateLeadStatus } from "./actions";

export function LeadStatusSelect({ id, status }: { id: string; status: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={updateLeadStatus}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={() => formRef.current?.requestSubmit()}
        className="rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-medium text-ink outline-none focus:border-brand"
      >
        {LEAD_STATUS.map((s: LeadStatus) => (
          <option key={s} value={s}>
            {LEAD_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </form>
  );
}
