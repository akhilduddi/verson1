import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section, FeatureGrid } from "@/components/site/primitives";
import { services } from "@/components/site/data";

export default function ServicesIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="Data services engineered for regulated industries."
        blurb="From validated pipelines to AI models and decision-grade dashboards."
      />
      <Section>
        <FeatureGrid items={services.map((s) => ({ ...s, href: `/services/${s.slug}` }))} />
      </Section>
    </SiteLayout>
  );
}
