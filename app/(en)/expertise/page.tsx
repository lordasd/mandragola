import { ExpertiseHead } from "@/components/expertise/ExpertiseHead";
import { ExpertiseRows } from "@/components/expertise/ExpertiseRows";
import { ContactSection } from "@/components/sections/ContactSection";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/ui/JsonLd";
import { contactFormEn } from "@/content/contact-form";
import { expertise } from "@/content/expertise";
import { home } from "@/content/home";
import { linkLabel, ui } from "@/lib/i18n";
import { breadcrumbLd, buildMetadata, serviceLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: expertise.seo.title,
  description: expertise.seo.description,
  path: expertise.seo.path,
  absoluteTitle: true, // seo.title already ends with "— Mandragola Ltd"
});

const path = expertise.seo.path;
const homeLabel = linkLabel("/");
const pageLabel = linkLabel(path);

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
              path: `${path}#${area.id}`,
            }),
          ),
        ]}
      />
      <ExpertiseHead
        titleId="expertise-title"
        breadcrumb={<Breadcrumb label={ui.en.breadcrumb} items={[crumbs[0], { label: crumbs[1].label }]} />}
        eyebrow={pageLabel}
        title={expertise.hero.title}
        body={expertise.hero.body}
      />
      <ExpertiseRows areas={expertise.areas} />
      <ContactSection locale="en" copy={home.contact} form={contactFormEn} />
    </>
  );
}
