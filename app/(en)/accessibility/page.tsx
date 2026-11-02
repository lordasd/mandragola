import { accessibility, accessibilityAlternates } from "@/content/accessibility";
import { buildMetadata } from "@/lib/seo";
import { AccessibilityStatement } from "./_components/AccessibilityStatement";

export const metadata = buildMetadata({
  title: accessibility.seo.title,
  description: accessibility.seo.description,
  path: accessibility.seo.path,
  locale: "en",
  alternates: accessibilityAlternates,
});

export default function AccessibilityPage() {
  return <AccessibilityStatement content={accessibility} locale="en" />;
}
