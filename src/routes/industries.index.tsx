import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section, FeatureGrid } from "@/components/site/primitives";
import { industries } from "@/components/site/data";

export default function IndustriesIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Industries"
        title="Coverage across the life sciences ecosystem."
        blurb="From discovery to commercialization, we cover the industries shaping human and animal health."
      />
      <Section>
        <FeatureGrid items={industries.map((i) => ({ ...i, href: `/industries/${i.slug}` }))} />
      </Section>
    </SiteLayout>
  );
}
