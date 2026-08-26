import { RevealSection } from '@/components/RevealSection';

export function CredentialsSection() {
  const certs = [
    {
      id: 'C/01',
      title: 'AI Operator Masterclass',
      issuer: 'Techademy · AI Solutions (ID: 63db1bd3-0edb-44cd-a5b9-31ab75c311c4)',
      tag: 'AUG 2026',
      isNew: true,
    },
    {
      id: 'C/02',
      title: 'macOS Expert Certification',
      issuer: 'Global Enterprise IT Provider',
      tag: 'CERTIFIED',
      isNew: false,
    },
    {
      id: 'C/03',
      title: 'Helpdesk Technician Certification',
      issuer: 'Global Enterprise IT Provider',
      tag: 'CERTIFIED',
      isNew: false,
    },
    {
      id: 'C/04',
      title: 'eSRE Certification',
      issuer: 'Electronic Statement of Receipts & Expenditures · NGAS — City Government of Dasmariñas',
      tag: 'CERTIFIED',
      isNew: false,
    },
  ];

  return (
    <section className="sec" id="credentials">
      <div className="wrap cred-grid">
        <div>
          <p className="s-no mono">06 — CREDENTIALS & EDUCATION</p>
          <h2 className="title" style={{ marginBottom: 40 }}>CERTIFICATIONS</h2>
          {certs.map((c, i) => (
            <RevealSection key={c.id} delay={i * 0.08}>
              <div className="cred-row">
                <span className="cn">{c.id}</span>
                <div>
                  <h4>{c.title}</h4>
                  <div className="ci">{c.issuer}</div>
                </div>
                <span className={`tag${c.isNew ? ' now' : ''}`}>{c.tag}</span>
              </div>
            </RevealSection>
          ))}
        </div>
        <div>
          <h2 className="title" style={{ marginBottom: 40 }}>EDUCATION</h2>
          <RevealSection>
            <div className="edu-card">
              <p className="k mono">2005 — 2008</p>
              <h4>BS Computer Science<br />(units completed)</h4>
              <p className="sub">De La Salle University – Dasmariñas</p>
              <p className="yr mono">Cavite · Philippines</p>
              <div className="interest-list" aria-label="Current interests">
                {['PHOTOGRAPHY', 'ADOBE LIGHTROOM', 'VIBE CODING', 'WEB DEVELOPMENT', 'AI AUTOMATION'].map(s => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={0.1}>
            <p className="ref-note">
              &gt; FULL EMPLOYMENT DETAILS ARE AVAILABLE IN THE{' '}
              <a href="/assets/documents/John-Nerzon-Polintan-CV-2026.pdf" download>DOWNLOADABLE CV ↓</a>
            </p>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
