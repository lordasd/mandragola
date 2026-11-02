import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/ui/JsonLd";
import { contactFormHe } from "@/content/contact-form";
import { homeAccessImageHe, homeClientLogosHe, homeHe } from "@/content/home.he";
import { site } from "@/content/site";
import { buildMetadata, organizationLd, websiteLd } from "@/lib/seo";

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
    <>
      <JsonLd data={[organizationLd(site), websiteLd({ locale: "he" })]} />
      <HomePage
        locale="he"
        content={homeHe}
        accessImage={homeAccessImageHe}
        logos={homeClientLogosHe}
        form={contactFormHe}
      />
    </>
  );
}
