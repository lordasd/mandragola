import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { homeHe } from "@/content/home.he";
import { buildMetadata } from "@/lib/seo";

// Placeholder — replaced by the Hebrew home page agent.
export const metadata = buildMetadata({
  title: homeHe.seo.title,
  description: homeHe.seo.description,
  path: "/he",
  locale: "he",
  alternates: { en: "/", he: "/he" },
  absoluteTitle: true,
});

export default function HebrewHomePage() {
  return (
    <Container className="py-section-y">
      <Heading as="h1">{homeHe.hero.title}</Heading>
    </Container>
  );
}
