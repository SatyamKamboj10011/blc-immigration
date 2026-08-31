import Layout from './Layout';
import Breadcrumbs from './Breadcrumbs';
import { PolicySection, legalUpdatedOn } from '../data/site';

interface PolicyPageProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: PolicySection[];
}

export default function PolicyPage({ title, metaTitle, metaDescription, intro, sections }: PolicyPageProps) {
  return (
    <Layout title={metaTitle} description={metaDescription}>
      <Breadcrumbs items={[{ label: title }]} />
      <section className="py-16 sm:py-24">
        <div className="container-page mx-auto flex max-w-3xl flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h1 className="font-display text-3xl font-black uppercase tracking-tight text-brand-950 sm:text-4xl">
              {title}
            </h1>
            <p className="eyebrow text-gold-700">Last updated: {legalUpdatedOn}</p>
            <p className="text-base leading-relaxed text-brand-500">{intro}</p>
          </div>

          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-3 border-t border-brand-900/10 pt-8">
                <h2 className="font-display text-xl font-extrabold uppercase tracking-tight text-brand-950">
                  {section.heading}
                </h2>
                {section.body.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-brand-500 sm:text-base">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
