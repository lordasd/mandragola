import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { notFound } from "@/content/not-found";

/** 404 page body shared by app/(en)/not-found.tsx and app/global-not-found.tsx: English copy plus a Hebrew line and link. */
export function NotFoundBody() {
  return (
    <Container className="py-section-y">
      <Eyebrow>{notFound.eyebrow}</Eyebrow>
      <Heading as="h1" size="h2" className="mt-4 text-ink">
        {notFound.title}
      </Heading>
      <p className="mt-5 max-w-lead text-body-xl text-muted">
        {notFound.body}{" "}
        <span lang="he" dir="rtl">
          {notFound.he.body}
        </span>
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <ButtonLink href={notFound.homeLink.href} arrow>
          {notFound.homeLink.label}
        </ButtonLink>
        <ButtonLink href={notFound.he.homeLink.href} variant="outline" lang="he">
          {notFound.he.homeLink.label}
        </ButtonLink>
      </div>
    </Container>
  );
}
