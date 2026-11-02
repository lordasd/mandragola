import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

export default function NotFound() {
  return (
    <Container className="py-section-y">
      <Eyebrow>Error 404</Eyebrow>
      <Heading as="h1" size="h2" className="mt-4 text-ink">
        Page not found
      </Heading>
      <p className="mt-5 max-w-lead text-body-xl text-muted">
        The page you are looking for does not exist or has moved.
      </p>
      <ButtonLink href="/" arrow className="mt-8">
        Back to home
      </ButtonLink>
    </Container>
  );
}
