import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/ui/JsonLd";
import { contactFormEn } from "@/content/contact-form";
import { home, homeAccessImage, homeClientLogos } from "@/content/home";
import { site } from "@/content/site";
import { buildMetadata, organizationLd, websiteLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: home.seo.title,
  description: home.seo.description,
  path: "/",
  locale: "en",
  alternates: { en: "/", he: "/he" },
  absoluteTitle: true,
});

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationLd(site), websiteLd({ locale: "en" })]} />
      <HomePage
        locale="en"
        content={home}
        accessImage={homeAccessImage}
        logos={homeClientLogos}
        form={contactFormEn}
      />
    </>
  );
}
