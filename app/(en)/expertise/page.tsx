import { Breadcrumb } from "@/components/expertise/Breadcrumb";
import { ExpertiseHead } from "@/components/expertise/ExpertiseHead";
import { ExpertiseRows } from "@/components/expertise/ExpertiseRows";
import { expertiseSlug } from "@/components/expertise/slug";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { contactFormEn } from "@/content/contact-form";
import { expertise } from "@/content/expertise";
import { home } from "@/content/home";
import { markerLine, site } from "@/content/site";
import { breadcrumbLd, buildMetadata, serviceLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: expertise.seo.title,
  description: expertise.seo.description,
  path: expertise.seo.path,
  absoluteTitle: true, // seo.title already ends with "— Mandragola Ltd"
});

const path = expertise.seo.path;
const homeLabel = site.footerLinks.find((l) => l.href === "/")?.label ?? site.name;
const pageLabel = site.nav.find((l) => l.href === path)?.label ?? expertise.hero.title;

export default function ExpertisePage() {
  const crumbs = [
    { label: homeLabel, href: "/" },
    { label: pageLabel, href: path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(crumbs.map((c) => ({ name: c.label, path: c.href }))),
          ...expertise.areas.map((area) =>
            serviceLd({
              name: area.title,
              description: area.body,
              path: `${path}#${expertiseSlug(area.title)}`,
            }),
          ),
        ]}
      />
      <ExpertiseHead
        titleId="expertise-title"
        breadcrumb={<Breadcrumb label="Breadcrumb" items={[crumbs[0], { label: crumbs[1].label }]} />}
        eyebrow={pageLabel}
        title={expertise.hero.title}
        body={expertise.hero.body}
        marker={markerLine}
      />
      <ExpertiseRows areas={expertise.areas} />
      <CtaBand title={expertise.cta.title} body={expertise.cta.body} link={expertise.cta.link} />
      <ContactSection locale="en" copy={home.contact} form={contactFormEn} />
    </>
  );
}
