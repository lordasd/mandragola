import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { home } from "@/content/home";
import { buildMetadata } from "@/lib/seo";

// Placeholder — replaced by the Home page agent.
export const metadata = buildMetadata({
  title: home.seo.title,
  description: home.seo.description,
  path: "/",
  locale: "en",
  alternates: { en: "/", he: "/he" },
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <Container className="py-section-y">
      <Heading as="h1">{home.hero.title}</Heading>
    </Container>
  );
}
