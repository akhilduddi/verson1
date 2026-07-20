import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section, FeatureGrid } from "@/components/site/primitives";
import { products } from "@/components/site/data";

export default function ProductsIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Products"
        title="Purpose-built platforms for life sciences."
        blurb="Three flagship platforms covering company intelligence, talent and market signals."
      />
      <Section>
        <FeatureGrid items={products.map((p) => ({ ...p, href: `/products/${p.slug}` }))} />
      </Section>
    </SiteLayout>
  );
}
