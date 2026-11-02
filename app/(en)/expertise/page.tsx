import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { expertise } from "@/content/expertise";
import { buildMetadata } from "@/lib/seo";

// Placeholder — replaced by the Expertise page agent.
export const metadata = buildMetadata({
  title: expertise.seo.title,
  description: expertise.seo.description,
  path: "/expertise",
});

export default function ExpertisePage() {
  return (
    <Container className="py-section-y">
      <Heading as="h1">{expertise.hero.title}</Heading>
    </Container>
  );
}
