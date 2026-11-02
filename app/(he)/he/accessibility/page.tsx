import { AccessibilityStatement } from "@/components/legal/AccessibilityStatement";
import { accessibilityAlternates, accessibilityHe } from "@/content/accessibility";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: accessibilityHe.seo.title,
  description: accessibilityHe.seo.description,
  path: accessibilityHe.seo.path,
  locale: "he",
  alternates: accessibilityAlternates,
});

export default function HebrewAccessibilityPage() {
  return <AccessibilityStatement content={accessibilityHe} locale="he" />;
}
