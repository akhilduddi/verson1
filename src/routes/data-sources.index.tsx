import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section, FeatureGrid } from "@/components/site/primitives";
import { dataSources } from "@/components/site/data";

export default function DataSourcesIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Data Sources"
        title="A unified intelligence graph for life sciences."
        blurb="We unify research, clinical, manufacturing and laboratory data into a single, governed intelligence layer."
      />
      <Section>
        <FeatureGrid items={dataSources.map((d) => ({ ...d, href: `/data-sources/${d.slug}` }))} />
      </Section>
    </SiteLayout>
  );
}
