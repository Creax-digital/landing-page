import type { CSSProperties } from "react";
import { heroImages } from "../lib/media-config.mjs";
import {
  content,
  localePath,
  practiceAccents,
  practiceKeys,
  type Locale,
  type PracticeKey,
} from "../lib/site-content";
import { ContactSection, SiteShell } from "./site-shell";

export function PracticePage({
  locale,
  practice,
}: {
  locale: Locale;
  practice: PracticeKey;
}) {
  const siteCopy = content[locale];
  const copy = siteCopy.practices[practice];
  const accent = practiceAccents[practice];
  const related = practiceKeys.filter((key) => key !== practice);

  return (
    <SiteShell locale={locale} path={`/${practice}`}>
      <main id="main-content" className={`practice-page accent-${accent}`}>
        <section className="practice-hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="practice-hero-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.lead}</p>
            <div className="button-row">
              <a className="button button--primary" href="#contact">
                {siteCopy.home.primaryCta}<span aria-hidden="true">↗</span>
              </a>
              <a className="button" href="#capabilities">
                {copy.capabilitiesEyebrow}
              </a>
            </div>
          </div>
          <div className="practice-hero-visual" aria-hidden="true" data-parallax>
            <PracticeHeroVisual practice={practice} tag={copy.cardTag} />
          </div>
          <div className="hero-page-index">
            <span>CREAX.DIGITAL</span>
            <span>{copy.shortTitle}</span>
          </div>
        </section>

        <section className="section capabilities-section" id="capabilities" data-reveal>
          <div className="section-intro section-intro--split">
            <div>
              <p className="eyebrow">{copy.capabilitiesEyebrow}</p>
              <h2>{copy.capabilitiesTitle}</h2>
            </div>
            <p>{copy.metaDescription}</p>
          </div>
          <div className="capability-grid">
            {copy.capabilities.map((capability, index) => (
              <a className="capability-card" href="#contact" key={capability.title}>
                <span className="capability-number">0{index + 1}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <span className="capability-action">
                  {siteCopy.nav.contact}<i aria-hidden="true">↘</i>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="section deliverables-section" data-reveal>
          <div className="deliverables-panel">
            <p className="eyebrow">{copy.deliverablesEyebrow}</p>
            <h2>{copy.deliverablesTitle}</h2>
            <ul>
              {copy.deliverables.map((deliverable, index) => (
                <li key={deliverable}>
                  <span>0{index + 1}</span>
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
          <div className="deliverables-signal" aria-hidden="true">
            <div className="signal-field">
            <span className="signal-ring signal-ring--outer" />
            <span className="signal-ring signal-ring--middle" />
            <span className="signal-ring signal-ring--inner" />
            <div className="signal-axis signal-axis--x" />
            <div className="signal-axis signal-axis--y" />
            <span className="signal-sweep" />
            {copy.signalLabels.map((label, index) => (
              <span className={`signal-blip signal-blip--${index + 1}`} key={label}>
                <i />
                <b>{label}</b>
              </span>
            ))}
            <strong className="signal-core">{copy.shortTitle}</strong>
            </div>
          </div>
        </section>

        <section className="section practice-process" data-reveal>
          <div className="section-intro">
            <p className="eyebrow">{copy.processEyebrow}</p>
            <h2>{copy.processTitle}</h2>
          </div>
          <ol className="method-grid">
            {siteCopy.method.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="related-section" data-reveal>
          <div>
            <p className="eyebrow">CREAX / CONNECT</p>
            <h2>{copy.relatedTitle}</h2>
          </div>
          <div className="related-links">
            {related.map((key) => (
              <a href={localePath(locale, `/${key}`)} key={key}>
                <span>{siteCopy.practices[key].shortTitle}</span>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </section>

        <ContactSection locale={locale} />
      </main>
    </SiteShell>
  );
}

function PracticeHeroVisual({ practice, tag }: { practice: PracticeKey; tag: string }) {
  if (practice === "systems") return <DashboardVisual />;

  if (practice === "products") {
    return (
      <div className="product-hero-device">
        <div className="product-device-bar"><i /><i /><i /><span>CREAX / PRODUCT LAB</span></div>
        <div className="product-device-body">
          <HeroImage name="ui" />
          <div className="product-device-panel">
            <span>USER FLOW</span>
            <b>01 → 04</b>
            <i><em /><em /><em /></i>
          </div>
        </div>
        <div className="product-device-status"><i />BUILD / TEST / LAUNCH</div>
      </div>
    );
  }

  return (
    <div className="visual-media-frame visual-media-frame--creative">
      <div className="visual-media-canvas">
        <HeroImage name="ai-production" />
        <span className="neon-scan" />
        <span className="neon-glitch neon-glitch--one" />
        <span className="neon-glitch neon-glitch--two" />
        <span className="neon-status"><i />GENERATIVE SIGNAL</span>
      </div>
      <span className="visual-media-tag">{tag}</span>
    </div>
  );
}

function HeroImage({ name }: { name: keyof typeof heroImages }) {
  const media = heroImages[name];
  return (
    <picture>
      <source type="image/webp" srcSet={media.widths.map((width) => `/optimized/${name}-${width}.webp ${width}w`).join(", ")} sizes="(max-width: 820px) 80vw, 45vw" />
      {/* Explicit responsive files work on both GitHub Pages and the server build. */}
      <img src={media.src} alt="" width={media.width} height={media.height} loading="eager" fetchPriority="high" decoding="async" />
    </picture>
  );
}

function DashboardVisual() {
  return (
    <div className="dashboard-visual">
      <div className="dashboard-bar">
        <span />
        <span />
        <span />
        <b>CREAX / OPS</b>
      </div>
      <div className="dashboard-kpis">
        <div><span>PIPELINE</span><b><em>84.2</em><em>91.6</em></b><i>+12%</i></div>
        <div><span>AGENTS</span><b><em>06</em><em>08</em></b><i>ACTIVE</i></div>
        <div><span>AUTOMATION</span><b><em>73%</em><em>81%</em></b><i>LIVE</i></div>
      </div>
      <div className="dashboard-chart">
        <div className="chart-bars">
          {[36, 58, 44, 72, 64, 88, 78, 96].map((height, index) => (
            <span key={index} style={{ "--bar-height": `${height}%` } as CSSProperties} />
          ))}
        </div>
        <span className="chart-scan" />
      </div>
      <div className="dashboard-log">
        <span><i /> CRM_EVENT_0842 <b>SYNCED</b></span>
        <span><i /> AGENT_TASK_019 <b>DONE</b></span>
        <span><i /> REPORT_WEEK_34 <b>READY</b></span>
      </div>
    </div>
  );
}
