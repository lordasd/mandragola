import type { HomeContent, Locale } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { ui } from "@/lib/i18n";
import { HeroVideo } from "./HeroVideo";

/**
 * Ink hero card with the page h1. Base background is a pure CSS ink gradient: no image request, so the
 * h1 text is the LCP element and paints with the first frame. The original's background video is added
 * by HeroVideo (desktop only, mounted after window load + idle, never under reduced motion), so it can't
 * become the LCP. The overlay keeps text contrast over the video and fades toward the end side on lg.
 */
export function HomeHero({ hero, locale }: { hero: HomeContent["hero"]; locale: Locale }) {
  const id = "hero-title";
  return (
    <Section
      tone="ink"
      reveal={false}
      aria-labelledby={id}
      // Brief hero min-height clamp(520px, 70vh, 720px); no spacing token covers a vh range.
      innerClassName="relative isolate flex min-h-[clamp(32.5rem,70vh,45rem)] items-center overflow-hidden bg-linear-to-br from-ink to-ink-soft rtl:bg-linear-to-bl"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink/85 lg:bg-transparent lg:from-ink/90 lg:via-ink/80 lg:to-ink/50 ltr:lg:bg-linear-to-r rtl:lg:bg-linear-to-l"
      />
      <div className="min-w-0 max-w-180">
        {hero.eyebrow && <Eyebrow tone="ink">{hero.eyebrow}</Eyebrow>}
        <Heading as="h1" id={id} className="mt-4.5 uppercase tracking-wide">
          {hero.title}
        </Heading>
        <p className="mt-6 max-w-lead text-body-xl text-on-ink-muted">{hero.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href={hero.cta.href} variant="gold" tone="ink" arrow>
            {hero.cta.label}
          </ButtonLink>
          {hero.secondaryCta && (
            <ButtonLink href={hero.secondaryCta.href} variant="outline" tone="ink" arrow>
              {hero.secondaryCta.label}
            </ButtonLink>
          )}
        </div>
      </div>
      {hero.video && <HeroVideo video={hero.video} labels={ui[locale].heroVideo} />}
    </Section>
  );
}
