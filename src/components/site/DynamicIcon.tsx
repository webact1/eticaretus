import * as Icons from "lucide-react";
import { Sparkles, type LucideProps } from "lucide-react";

export function DynamicIcon({
  iconName,
  ...props
}: { iconName?: string | null } & Omit<LucideProps, "name">) {
  const IconComponent =
    (iconName && (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[iconName]) || Sparkles;
  return <IconComponent {...props} />;
}
