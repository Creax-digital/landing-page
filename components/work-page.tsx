import { content, type Locale } from "../lib/site-content";
import { CaseVisual } from "./home-page";
import { ContactSection, SiteShell } from "./site-shell";

export function WorkPage({ locale }: { locale: Locale }) {
  const copy = content[locale];

  return (
    <SiteShell locale={locale} path="/work">
      <main id="main-content">
        <section className="work-hero">
          <div className="hero-grid" aria-hidden="true" />
          <div>
            <p className="eyebrow">{copy.work.eyebrow}</p>
            <h1>{copy.work.title}</h1>
            <p>{copy.work.lead}</p>
          </div>
        </section>

        <section className="section work-index">
          <div className="case-grid case-grid--index">
            {copy.cases.map((item, index) => (
              <article className={`case-card accent-${item.accent}`} key={item.title}>
                <CaseVisual item={item} index={index} />
                <div className="case-copy">
                  <p>{item.category}</p>
                  <h2>{item.title}</h2>
                  <p className="case-description">{item.description}</p>
                  <div className="case-deliverables">
                    <span>{copy.work.deliverablesLabel}</span>
                    <ul>
                      {item.deliverables.map((deliverable) => (
                        <li key={deliverable}>{deliverable}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ContactSection locale={locale} />
      </main>
    </SiteShell>
  );
}
