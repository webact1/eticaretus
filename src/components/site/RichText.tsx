import type { ReactNode } from "react";

// Panelden girilen düz metni sade biçimlendirmeyle gösterir:
// "## Başlık", "### Alt başlık", "- madde" satırları ve boş satırla ayrılmış paragraflar.
export function RichText({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g, "\n").split(/\n{2,}/);
  const out: ReactNode[] = [];

  blocks.forEach((raw, i) => {
    const block = raw.trim();
    if (!block) return;

    if (block.startsWith("### ")) {
      out.push(
        <h3 key={i} className="mt-8 text-lg font-bold text-ink">
          {block.slice(4)}
        </h3>,
      );
    } else if (block.startsWith("## ")) {
      out.push(
        <h2 key={i} className="mt-10 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
          {block.slice(3)}
        </h2>,
      );
    } else if (block.split("\n").every((l) => l.trim().startsWith("- "))) {
      out.push(
        <ul key={i} className="mt-4 space-y-2">
          {block.split("\n").map((l, j) => (
            <li key={j} className="flex gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
              <span>{l.trim().slice(2)}</span>
            </li>
          ))}
        </ul>,
      );
    } else {
      out.push(
        <p key={i} className="mt-4 whitespace-pre-line">
          {block}
        </p>,
      );
    }
  });

  return <div className="text-base leading-relaxed text-ink/80">{out}</div>;
}
