import {
  content,
  localePath,
  practiceAccents,
  practiceKeys,
  type CaseContent,
  type Locale,
  type PracticeKey,
} from "../lib/site-content";
import { ContactSection, SiteShell } from "./site-shell";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = content[locale];

  return (
    <SiteShell locale={locale}>
      <main id="main-content">
        <section className="hero hero--home">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit" aria-hidden="true" data-parallax>
            <span className="orbit orbit--outer" />
            <span className="orbit orbit--middle" />
            <span className="orbit orbit--inner" />
            <span className="orbit-marker orbit-marker--cyan"><i /></span>
            <span className="orbit-marker orbit-marker--blue"><i /></span>
            <span className="orbit-marker orbit-marker--violet"><i /></span>
            <span className="orbit-scan" />
            <span className="orbit-coordinate orbit-coordinate--one">01 / CREATE</span>
            <span className="orbit-coordinate orbit-coordinate--two">03 / SCALE</span>
            <span className="orbit-core"><span>C</span><span>X</span><i /></span>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">{copy.home.eyebrow}</p>
            <h1>{copy.home.title}</h1>
            <p className="hero-lead">{copy.home.lead}</p>
            <div className="button-row">
              <a className="button button--primary" href="#contact">
                {copy.home.primaryCta}
                <span aria-hidden="true">↗</span>
              </a>
              <a className="button" href="#practices">
                {copy.home.secondaryCta}
              </a>
            </div>
          </div>
          <div className="hero-index" aria-label={copy.nav.practices}>
            {copy.home.capabilityLine.map((item, index) => (
              <span key={item}>
                <b>0{index + 1}</b>
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="section practices-section" id="practices" data-reveal>
          <div className="section-intro section-intro--split">
            <div>
              <p className="eyebrow">{copy.home.practicesEyebrow}</p>
              <h2>{copy.home.practicesTitle}</h2>
            </div>
            <p>{copy.home.practicesLead}</p>
          </div>
          <div className="practice-grid">
            {practiceKeys.map((key, index) => {
              const practice = copy.practices[key];
              return (
                <a
                  className={`practice-card accent-${practiceAccents[key]}`}
                  href={localePath(locale, `/${key}`)}
                  key={key}
                >
                  <div className="practice-card-top">
                    <span className="practice-number">0{index + 1}</span>
                    <span className="practice-tag">{practice.cardTag}</span>
                  </div>
                  <PracticeGraphic practice={key} />
                  <div className="practice-card-copy">
                    <h3>{practice.cardTitle}</h3>
                    <p>{practice.cardDescription}</p>
                  </div>
                  <span className="card-arrow" aria-hidden="true">↗</span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="section integration-section" data-reveal>
          <div className="integration-copy">
            <p className="eyebrow">{copy.home.integrationEyebrow}</p>
            <h2>{copy.home.integrationTitle}</h2>
            <p>{copy.home.integrationLead}</p>
          </div>
          <div className="cycle-shell">
            <div className="cycle-badge">
              <span />
              {copy.home.integrationBadge}
            </div>
            <div className="cycle-progress" aria-hidden="true"><span /></div>
            <ol className="integration-flow">
              {copy.home.integrationSteps.map((step, index) => (
                <li key={step}>
                  <span className="cycle-node">0{index + 1}</span>
                  <strong>{step}</strong>
                  <i aria-hidden="true">{index === copy.home.integrationSteps.length - 1 ? "✓" : "→"}</i>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section work-section" id="work" data-reveal>
          <div className="section-intro section-intro--split">
            <div>
              <p className="eyebrow">{copy.home.workEyebrow}</p>
              <h2>{copy.home.workTitle}</h2>
            </div>
            <div className="section-intro-side">
              <p>{copy.home.workLead}</p>
              <a className="text-link" href={localePath(locale, "/work")}>
                {copy.home.allWork}<span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="case-grid case-grid--featured">
            {copy.cases.slice(0, 3).map((item, index) => (
              <article className={`case-card accent-${item.accent}`} key={item.title}>
                <CaseVisual item={item} index={index} />
                <div className="case-copy">
                  <p>{item.category}</p>
                  <h3>{item.title}</h3>
                  <ul aria-label={copy.work.deliverablesLabel}>
                    {item.deliverables.map((deliverable) => (
                      <li key={deliverable}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section method-section" id="method" data-reveal>
          <div className="section-intro section-intro--split">
            <div>
              <p className="eyebrow">{copy.home.methodEyebrow}</p>
              <h2>{copy.home.methodTitle}</h2>
            </div>
            <p>{copy.home.methodLead}</p>
          </div>
          <ol className="method-grid">
            {copy.method.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section standards-section" data-reveal>
          <div className="standards-heading">
            <p className="eyebrow">{copy.home.standardsEyebrow}</p>
            <h2>{copy.home.standardsTitle}</h2>
          </div>
          <ul className="standards-list">
            {copy.home.standards.map((standard, index) => (
              <li key={standard}>
                <span>0{index + 1}</span>
                {standard}
              </li>
            ))}
          </ul>
        </section>

        <ContactSection locale={locale} />
      </main>
    </SiteShell>
  );
}

function PracticeGraphic({ practice }: { practice: PracticeKey }) {
  if (practice === "creative") {
    return (
      <div className="practice-graphic creative-graphic" aria-hidden="true">
        <span className="creative-aperture" />
        <span className="creative-frame creative-frame--one" />
        <span className="creative-frame creative-frame--two" />
        <span className="creative-spectrum" />
        <i className="creative-particle creative-particle--one" />
        <i className="creative-particle creative-particle--two" />
        <i className="creative-particle creative-particle--three" />
      </div>
    );
  }

  if (practice === "products") {
    return (
      <div className="practice-graphic products-graphic" aria-hidden="true">
        <span className="product-window product-window--back"><i /><i /><i /></span>
        <span className="product-window product-window--front"><i /><i /><i /><b /></span>
        <span className="product-cursor">↗</span>
        <span className="product-route product-route--one" />
        <span className="product-route product-route--two" />
      </div>
    );
  }

  return (
    <div className="practice-graphic systems-graphic" aria-hidden="true">
      <span className="system-node system-node--one"><i /></span>
      <span className="system-node system-node--two"><i /></span>
      <span className="system-node system-node--three"><i /></span>
      <span className="system-node system-node--four"><i /></span>
      <svg className="system-network" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M14 25H82L74 76H32L14 25L74 76" />
        <path className="system-network-flow" d="M14 25H82L74 76H32L14 25L74 76" pathLength="100" />
      </svg>
      <span className="system-bars"><i /><i /><i /><i /><i /></span>
    </div>
  );
}

export function CaseVisual({ item, index }: { item: CaseContent; index: number }) {
  return (
    <div className={`case-media case-media--art case-media--${item.visual}`}>
      <CaseArt visual={item.visual} />
      <span>0{index + 1}</span>
    </div>
  );
}

function CaseArt({ visual }: { visual: CaseContent["visual"] }) {
  if (visual === "creative" || visual === "image") {
    return (
      <div className="case-art launch-art" aria-hidden="true">
        <span className="case-art-grid" />
        <div className="launch-frame launch-frame--back"><i /><i /><i /></div>
        <div className="launch-frame launch-frame--front">
          <span className="launch-object" />
          <span className="launch-copy-lines"><i /><i /><i /></span>
          <b>AI / CONTENT</b>
        </div>
        <span className="launch-spectrum" />
        <span className="case-art-scan" />
        <i className="launch-spark launch-spark--one" />
        <i className="launch-spark launch-spark--two" />
      </div>
    );
  }

  if (visual === "product") {
    return (
      <div className="case-art miniapp-art" aria-hidden="true">
        <span className="case-art-grid" />
        <div className="miniapp-device">
          <div className="miniapp-head"><i /><span /><b /></div>
          <div className="miniapp-thread">
            <span><i /><b /></span><span><i /><b /></span><span><i /><b /></span>
          </div>
          <div className="miniapp-nav"><i /><i /><i /></div>
        </div>
        <div className="miniapp-stack"><span /><span /><span /></div>
        <i className="miniapp-pulse" />
        <span className="case-art-scan" />
      </div>
    );
  }

  if (visual === "systems") {
    return (
      <div className="case-art crm-art" aria-hidden="true">
        <span className="case-art-grid" />
        <div className="crm-board">
          <div><span /><span /><span /></div>
          <div><span /><span /></div>
          <div><span /><span /><span /></div>
        </div>
        <span className="crm-route crm-route--one"><i /></span>
        <span className="crm-route crm-route--two"><i /></span>
        <span className="crm-route crm-route--three"><i /></span>
        <div className="crm-core"><i /><b>AI</b></div>
        <span className="case-art-scan" />
      </div>
    );
  }

  if (visual === "video") {
    return (
      <div className="case-art video-art" aria-hidden="true">
        <span className="case-art-grid" />
        <div className="video-reel">
          <span><i /></span><span><i /></span><span><i /></span>
        </div>
        <div className="video-stage"><span /><i /><b /></div>
        <div className="video-timeline"><span /><i /><i /><i /><i /></div>
        <span className="video-play">▶</span>
        <span className="case-art-scan" />
      </div>
    );
  }

  if (visual === "brand") {
    return (
      <div className="case-art brand-art" aria-hidden="true">
        <span className="case-art-grid" />
        <div className="brand-board brand-board--mark"><span><i /></span><b>CREAX</b></div>
        <div className="brand-board brand-board--type"><span /><span /><span /></div>
        <div className="brand-swatches"><i /><i /><i /><i /></div>
        <span className="brand-axis brand-axis--x" />
        <span className="brand-axis brand-axis--y" />
        <span className="case-art-scan" />
      </div>
    );
  }

  return (
    <div className="case-art dashboard-art" aria-hidden="true">
      <span className="case-art-grid" />
      <div className="dashboard-metrics"><span><b /></span><span><b /></span><span><b /></span></div>
      <div className="dashboard-bars"><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="dashboard-trend"><span /><span /><span /><span /><span /></div>
      <div className="dashboard-sources"><i /><i /><i /></div>
      <span className="case-art-scan" />
    </div>
  );
}
