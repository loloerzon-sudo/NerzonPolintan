import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RevealSection } from '@/components/RevealSection';
import { TiltCard } from '@/components/TiltCard';
import { useAudio } from '@/hooks/useAudio';
import qrImg from '@/assets/images/nerzon-online-qr-dark.png';
import qrCardImg from '@/assets/images/nerzon-online-qr-card.png';

export function ContactSection() {
  const [toastVisible, setToastVisible] = useState(false);
  const { playSuccess, playHover } = useAudio();

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('erzon22@gmail.com');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = 'erzon22@gmail.com';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
    playSuccess();
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  }, [playSuccess]);

  return (
    <section className="sec" id="contact" style={{ padding: '140px 0 120px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '-15%', top: '-20%', width: '55%', height: '90%', background: 'radial-gradient(circle,rgba(184,240,74,.06),transparent 60%)', pointerEvents: 'none' }} />
      <div className="wrap contact-layout">
        <div>
          <span className="avail"><span className="dot" aria-hidden="true" />OPEN TO PROJECTS & REMOTE ROLES</span>
          <h2 className="contact-big">
            <span style={{ display: 'block' }}>LET'S RUN THE NEXT</span>
            <span className="out" style={{ display: 'block' }}>RELEASE FLAWLESSLY.</span>
          </h2>
          <div className="email-line">
            <a className="email-link" href="mailto:erzon22@gmail.com" onMouseEnter={() => playHover()}>
              erzon22@gmail.com
            </a>
            <motion.button
              className="btn"
              onClick={copyEmail}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              COPY EMAIL
            </motion.button>
          </div>
          <div className="contact-actions">
            {[
              { label: 'CV · DOWNLOAD ↓', href: '/assets/documents/John-Nerzon-Polintan-CV-2026.pdf', fill: true, download: true },
              { label: 'IN · LINKEDIN ↗', href: 'https://linkedin.com/in/erzon22', ext: true },
              { label: 'WA · WHATSAPP ↗', href: 'https://wa.me/639165271923', ext: true },
              { label: 'IG · INSTAGRAM ↗', href: 'https://www.instagram.com/erztagram/', ext: true },
            ].map(({ label, href, fill, download, ext }) => (
              <motion.a
                key={label}
                className={`btn${fill ? ' fill' : ''}`}
                href={href}
                download={download}
                target={ext ? '_blank' : undefined}
                rel={ext ? 'noopener' : undefined}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={() => playHover()}
              >
                {label}
              </motion.a>
            ))}
          </div>
          <div className="contact-rows">
            {[
              { k: 'PHONE / WHATSAPP', v: <a href="https://wa.me/639165271923" target="_blank" rel="noopener">+63 916 527 1923 ↗</a> },
              { k: 'LINKEDIN',         v: <a href="https://linkedin.com/in/erzon22" target="_blank" rel="noopener">linkedin.com/in/erzon22 ↗</a> },
              { k: 'INSTAGRAM',        v: <a href="https://www.instagram.com/erztagram/" target="_blank" rel="noopener">instagram.com/erztagram ↗</a> },
              { k: 'BASE / LOCATION',  v: <>Philippines · GMT+8 <span className="dim">— Remote worldwide</span></> },
            ].map(({ k, v }) => (
              <div key={k} className="c-row">
                <p className="k mono">{k}</p>
                <p className="v">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* QR Card */}
        <RevealSection direction="scale" delay={0.2} className="contact-qr">
          <TiltCard className="qr-card" intensity={4}>
            <div className="qr-head">
              <span className="qr-status"><span className="dot" aria-hidden="true" />QUICK CONNECT</span>
              <span className="mono dim">SCAN // MOBILE</span>
            </div>
            <div className="qr-img-wrap">
              <img src={qrImg} alt="QR Code to https://nerzon.online/" width={200} height={200} loading="lazy" />
            </div>
            <div className="qr-body">
              <p className="qr-domain mono">HTTPS://NERZON.ONLINE/</p>
              <p className="qr-sub">Scan with your smartphone camera to access this console anywhere.</p>
              <a className="qr-dl-btn mono" href={qrCardImg} download="nerzon-online-qr-card.png">
                DOWNLOAD QR CARD ↓
              </a>
            </div>
          </TiltCard>
        </RevealSection>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.2, 0.65, 0.2, 1] }}
          >
            ✓ EMAIL COPIED
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
