import type { ContactFormCopy, HomeContent, ImageAsset, Locale } from "@/content/types";
import { ContactSection } from "@/components/sections/ContactSection";
import { AccessBand } from "./AccessBand";
import { ExpertiseCards } from "./ExpertiseCards";
import { HomeHero } from "./HomeHero";
import { LogoWall } from "./LogoWall";
import { MissionSection } from "./MissionSection";
import { StatementSection } from "./StatementSection";

interface HomePageProps {
  locale: Locale;
  content: HomeContent;
  accessImage: ImageAsset;
  logos: ImageAsset[];
  form: ContactFormCopy;
}

/** Full home composition (brief §5), shared by `/` and `/he`. Section order follows the original page. */
export function HomePage({ locale, content, accessImage, logos, form }: HomePageProps) {
  return (
    <>
      <HomeHero hero={content.hero} locale={locale} />
      <MissionSection mission={content.mission} stats={content.stats} />
      {/* Original statement button is "Our Mission" — same link as the hero CTA. */}
      <StatementSection philosophy={content.philosophy} cta={content.hero.cta} />
      <AccessBand access={content.access} image={accessImage} />
      <LogoWall teaser={content.transactionsTeaser} logos={logos} />
      <ExpertiseCards teaser={content.expertiseTeaser} />
      <ContactSection locale={locale} copy={content.contact} form={form} />
    </>
  );
}
