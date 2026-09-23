"use client";

import { Fragment, useState } from "react";
import { FEATURE_CATEGORY_DESCRIPTIONS } from "@/lib/constants";

type Feature = { id: string; name: string; order: number };
type Category = { id: string; name: string; order: number; features: Feature[] };
type PackageFeature = { featureId: string; included: boolean; value: string | null };
type PackageItem = { id: string; slug: string; name: string; packageFeatures: PackageFeature[] };

function cellFor(pkg: PackageItem, featureId: string) {
  const pf = pkg.packageFeatures.find((f) => f.featureId === featureId);
  if (!pf) return { included: false, value: null as string | null };
  return { included: pf.included, value: pf.value };
}

function Cell({ included, value }: { included: boolean; value: string | null }) {
  if (!included) return <span className="text-border">–</span>;
  if (value) return <span className="text-sm font-medium text-ink">{value}</span>;
  return <span className="text-brand">✓</span>;
}

export function PackageComparisonTable({
  categories,
  packages,
}: {
  categories: Category[];
  packages: PackageItem[];
}) {
  const [selected, setSelected] = useState(0);
  const activePkg = packages[selected];

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border lg:block">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="bg-surface">
              <th className="w-56 p-4 text-left font-semibold text-ink">Özellik</th>
              {packages.map((pkg) => (
                <th key={pkg.id} className="p-4 text-left font-semibold text-ink">
                  {pkg.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <Fragment key={cat.id}>
                <tr className="border-t border-border bg-surface/60">
                  <td colSpan={packages.length + 1} className="px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand">{cat.name}</p>
                    {FEATURE_CATEGORY_DESCRIPTIONS[cat.name] && (
                      <p className="mt-0.5 text-xs font-normal normal-case text-muted">
                        {FEATURE_CATEGORY_DESCRIPTIONS[cat.name]}
                      </p>
                    )}
                  </td>
                </tr>
                {cat.features.map((feature) => (
                  <tr key={feature.id} className="border-t border-border">
                    <td className="p-4 text-ink/80">{feature.name}</td>
                    {packages.map((pkg) => {
                      const { included, value } = cellFor(pkg, feature.id);
                      return (
                        <td key={pkg.id} className="p-4">
                          <Cell included={included} value={value} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: paket seçici + dikey liste */}
      <div className="lg:hidden">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
          {packages.map((pkg, i) => (
            <button
              key={pkg.id}
              onClick={() => setSelected(i)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                i === selected ? "bg-brand text-white" : "border border-border text-ink"
              }`}
            >
              {pkg.name}
            </button>
          ))}
        </div>

        <div className="mt-4 divide-y divide-border rounded-2xl border border-border">
          {categories.map((cat) => (
            <div key={cat.id} className="p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-brand">{cat.name}</p>
              {FEATURE_CATEGORY_DESCRIPTIONS[cat.name] && (
                <p className="mt-0.5 text-xs text-muted">{FEATURE_CATEGORY_DESCRIPTIONS[cat.name]}</p>
              )}
              <ul className="mt-3 space-y-2.5">
                {cat.features.map((feature) => {
                  const { included, value } = cellFor(activePkg, feature.id);
                  return (
                    <li key={feature.id} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-ink/80">{feature.name}</span>
                      <Cell included={included} value={value} />
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
