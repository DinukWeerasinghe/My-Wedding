import { useEffect, useMemo, useRef, useState } from "react";
import { MUSIC_SOURCE, RSVP_ENDPOINT } from "./config.js";

const weddingDate = new Date("2026-08-26T09:10:00+05:30");
const saveDateVideoUrl = "/Wedding Save the Date Video.mp4";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?auto=format&fit=crop&w=900&q=80",
    alt: "Wedding detail",
    caption: "A Cherished Moment",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    alt: "Wedding couple",
    caption: "Together Always",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
    alt: "Invitation card",
    caption: "Our Story",
  },
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
    alt: "Wedding flowers",
    caption: "Blooms of Love",
  },
];

const timelineItems = [
  {
    icon: "flower-2",
    time: "Morning",
    title: "Guest Arrival",
    description: "A warm welcome as family and friends gather for the celebration.",
  },
  {
    icon: "heart-handshake",
    time: "9.10 AM",
    title: "Poruwa Ceremony",
    description: "The traditional ceremony begins with blessings, grace, and love.",
  },
  {
    icon: "sparkles",
    time: "After Ceremony",
    title: "Wedding Celebration",
    description: "Celebrate the beginning of a beautiful new chapter together.",
  },
  {
    icon: "utensils",
    time: "Midday",
    title: "Lunch / Reception",
    description: "Share a lovingly prepared meal with our families and guests.",
  },
  {
    icon: "camera",
    time: "Afternoon",
    title: "Blessings & Photography",
    description: "Gentle memories, portraits, blessings, and a graceful farewell.",
  },
];

function getCountdown() {
  const distance = Math.max(weddingDate.getTime() - Date.now(), 0);
  return {
    days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(3, "0"),
    hours: String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
    minutes: String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, "0"),
    seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, "0"),
  };
}

function makeFloatingItems(count, type) {
  return Array.from({ length: count }, (_, index) => {
    if (type === "petal") {
      return {
        id: `${type}-${index}`,
        left: `${Math.random() * 100}%`,
        drift: `${(Math.random() * 160 - 80).toFixed(0)}px`,
        duration: `${12 + Math.random() * 14}s`,
        delay: `${Math.random() * -18}s`,
        scale: 0.72 + Math.random() * 0.72,
        rotate: Math.random() * 360,
      };
    }
    return {
      id: `${type}-${index}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${2.5 + Math.random() * 3.5}s`,
      delay: `${Math.random() * 4}s`,
    };
  });
}

function useLucideIcons(dependencies = []) {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, dependencies);
}

/* ─── Botanical SVG decorations ─── */
function BotanicalLeft() {
  return (
    <svg className="botanical botanical-left" viewBox="0 0 120 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M60 310 C60 280 20 240 30 180 C40 120 80 100 70 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35"/>
      <path d="M60 270 C40 250 10 240 15 210" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M55 230 C35 215 8 220 12 195" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M58 185 C78 165 90 140 75 115" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M62 150 C82 138 98 118 85 95" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25"/>
      <ellipse cx="15" cy="207" rx="12" ry="7" transform="rotate(-30 15 207)" fill="currentColor" opacity="0.12"/>
      <ellipse cx="12" cy="192" rx="10" ry="6" transform="rotate(-20 12 192)" fill="currentColor" opacity="0.1"/>
      <ellipse cx="85" cy="108" rx="11" ry="6" transform="rotate(25 85 108)" fill="currentColor" opacity="0.12"/>
      <circle cx="70" cy="58" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="68" cy="49" r="2.5" fill="currentColor" opacity="0.15"/>
      <circle cx="74" cy="52" r="2" fill="currentColor" opacity="0.12"/>
    </svg>
  );
}

function BotanicalRight() {
  return (
    <svg className="botanical botanical-right" viewBox="0 0 120 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M60 310 C60 280 100 240 90 180 C80 120 40 100 50 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35"/>
      <path d="M60 270 C80 250 110 240 105 210" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M65 230 C85 215 112 220 108 195" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M62 185 C42 165 30 140 45 115" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M58 150 C38 138 22 118 35 95" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25"/>
      <ellipse cx="105" cy="207" rx="12" ry="7" transform="rotate(30 105 207)" fill="currentColor" opacity="0.12"/>
      <ellipse cx="108" cy="192" rx="10" ry="6" transform="rotate(20 108 192)" fill="currentColor" opacity="0.1"/>
      <ellipse cx="35" cy="108" rx="11" ry="6" transform="rotate(-25 35 108)" fill="currentColor" opacity="0.12"/>
      <circle cx="50" cy="58" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="52" cy="49" r="2.5" fill="currentColor" opacity="0.15"/>
      <circle cx="46" cy="52" r="2" fill="currentColor" opacity="0.12"/>
    </svg>
  );
}

function FloralCorner({ position }) {
  return (
    <svg className={`floral-corner floral-corner-${position}`} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 75 C5 45 35 15 75 5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" fill="none"/>
      <path d="M5 75 C20 55 15 30 35 20" stroke="currentColor" strokeWidth="0.6" opacity="0.3" fill="none"/>
      <path d="M5 75 C30 65 45 45 50 15" stroke="currentColor" strokeWidth="0.6" opacity="0.3" fill="none"/>
      <circle cx="75" cy="5" r="3" fill="currentColor" opacity="0.25"/>
      <circle cx="73" cy="12" r="2" fill="currentColor" opacity="0.18"/>
      <circle cx="68" cy="8" r="1.5" fill="currentColor" opacity="0.15"/>
      <ellipse cx="35" cy="20" rx="8" ry="4" transform="rotate(-45 35 20)" fill="currentColor" opacity="0.1"/>
      <ellipse cx="50" cy="15" rx="7" ry="3.5" transform="rotate(-60 50 15)" fill="currentColor" opacity="0.1"/>
    </svg>
  );
}

/* ─── Gold ornament divider ─── */
function GoldDivider() {
  return (
    <div className="gold-divider" aria-hidden="true">
      <svg viewBox="0 0 240 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="12" x2="88" y2="12" stroke="url(#gl)" strokeWidth="0.8"/>
        <line x1="152" y1="12" x2="240" y2="12" stroke="url(#gr)" strokeWidth="0.8"/>
        <path d="M100 12 C100 7 108 4 120 4 C132 4 140 7 140 12 C140 17 132 20 120 20 C108 20 100 17 100 12Z" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5"/>
        <circle cx="120" cy="12" r="2.5" fill="currentColor" opacity="0.6"/>
        <circle cx="96" cy="12" r="1.5" fill="currentColor" opacity="0.4"/>
        <circle cx="144" cy="12" r="1.5" fill="currentColor" opacity="0.4"/>
        <defs>
          <linearGradient id="gl" x1="0" y1="0" x2="88" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0"/>
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.6"/>
          </linearGradient>
          <linearGradient id="gr" x1="152" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Main App ─── */
function App() {
  const [loadingHidden, setLoadingHidden] = useState(false);
  const [introClosed, setIntroClosed] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown);
  const [videoFallback, setVideoFallback] = useState(false);
  const [toast, setToast] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeGallery, setActiveGallery] = useState(null);

  const musicRef = useRef(null);
  const saveDateVideoRef = useRef(null);
  const heroBackdropRef = useRef(null);
  const toastTimerRef = useRef(null);

  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 560px)").matches;
  const petals = useMemo(() => makeFloatingItems(isMobile ? 14 : 22, "petal"), [isMobile]);
  const sparkles = useMemo(() => makeFloatingItems(isMobile ? 14 : 26, "sparkle"), [isMobile]);

  useLucideIcons([musicPlaying, submitting, introClosed]);

  const [guestName, setGuestName] = useState("your");

  useEffect(() => {
    document.body.classList.toggle("intro-active", !introClosed);
  }, [introClosed]);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setLoadingHidden(true), 650);
    const introTimer = window.setTimeout(() => closeIntro(), 5600);
    return () => {
      window.clearTimeout(loadingTimer);
      window.clearTimeout(introTimer);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("name");
    if (nameParam) {
      const decodedName = decodeURIComponent(nameParam).replace(/_/g, " ");
      setGuestName(decodedName + "'s");
    }
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, [introClosed]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setBackToTopVisible(y > 700);
      if (heroBackdropRef.current) {
        heroBackdropRef.current.style.transform = `translateY(${Math.min(y * 0.04, 32)}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 4200);
  }

  function closeIntro() {
    setIntroClosed(true);
    document.querySelector("#save-date")?.scrollIntoView({ behavior: "smooth", block: "start" });
    saveDateVideoRef.current?.play().catch(() => {});
  }

  async function toggleMusic() {
    if (!MUSIC_SOURCE) {
      showToast("Music is ready. Add a music file path in src/config.js first.");
      return;
    }
    if (!musicRef.current) return;
    if (musicRef.current.paused) {
      try {
        await musicRef.current.play();
        setMusicPlaying(true);
      } catch {
        showToast("Tap once more to allow music playback on this device.");
      }
    } else {
      musicRef.current.pause();
      setMusicPlaying(false);
    }
  }

  async function sendRsvpToGoogleSheet(payload) {
    if (!RSVP_ENDPOINT.trim().startsWith("https://script.google.com/")) {
      throw new Error("RSVP endpoint is not configured.");
    }
    await fetch(RSVP_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
  }

  async function handleRsvpSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") || "Guest";
    const rsvpPayload = {
      event: "Dinuka & Nimasha Wedding",
      name,
      guests: formData.get("guests"),
      attendance: formData.get("attendance"),
      message: formData.get("message"),
      submittedAt: new Date().toISOString(),
      pageUrl: window.location.href,
    };
    setSubmitting(true);
    try {
      await sendRsvpToGoogleSheet(rsvpPayload);
      showToast(`Thank you, ${name}. Your RSVP has been sent with love. 🌸`);
      form.reset();
    } catch {
      showToast("RSVP is not connected yet. Check your Apps Script URL in src/config.js.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Loading screen */}
      <div className={`loading-screen ${loadingHidden ? "is-hidden" : ""}`} aria-hidden="true">
        <div className="loading-monogram">
          <span>D</span>
          <span className="loading-amp">&amp;</span>
          <span>N</span>
        </div>
        <div className="loading-line"></div>
        <p className="loading-tagline">A moment awaits…</p>
      </div>

      <audio ref={musicRef} loop preload="none" src={MUSIC_SOURCE || undefined}></audio>

      {/* Utility buttons */}
      <button
        className={`utility-button music-toggle ${musicPlaying ? "is-playing" : ""}`}
        type="button"
        onClick={toggleMusic}
        aria-label="Toggle background music"
        title="Toggle music"
      >
        <i data-lucide={musicPlaying ? "volume-2" : "volume-x"} aria-hidden="true"></i>
      </button>

      <button
        className={`utility-button back-to-top ${backToTopVisible ? "is-visible" : ""}`}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        title="Back to top"
      >
        <i data-lucide="arrow-up" aria-hidden="true"></i>
      </button>

      {/* Ambient petals */}
      <div className="petal-field" aria-hidden="true">
        {petals.map((petal) => (
          <span
            key={petal.id}
            className="petal"
            style={{
              left: petal.left,
              "--drift": petal.drift,
              "--rotate-start": `${petal.rotate}deg`,
              animationDuration: petal.duration,
              animationDelay: petal.delay,
              transform: `scale(${petal.scale})`,
            }}
          ></span>
        ))}
      </div>

      {/* Sparkles */}
      <div className="sparkle-field" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDuration: sparkle.duration,
              animationDelay: sparkle.delay,
            }}
          ></span>
        ))}
      </div>

      {/* Envelope intro */}
      <EnvelopeIntro hidden={introClosed} onEnter={closeIntro} />

      {/* Lightbox */}
      {activeGallery !== null && (
        <div className="lightbox" onClick={() => setActiveGallery(null)} role="dialog" aria-modal="true" aria-label="Gallery photo">
          <button className="lightbox-close" onClick={() => setActiveGallery(null)} aria-label="Close">
            <i data-lucide="x" aria-hidden="true"></i>
          </button>
          <img
            src={galleryImages[activeGallery].src}
            alt={galleryImages[activeGallery].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="lightbox-caption">{galleryImages[activeGallery].caption}</p>
        </div>
      )}

      <main>
        <SaveDateSection
          videoRef={saveDateVideoRef}
          videoFallback={videoFallback}
          onVideoError={() => setVideoFallback(true)}
        />
        <HeroSection heroBackdropRef={heroBackdropRef} guestName={guestName} />
        <CountdownSection countdown={countdown} />
        <TimelineSection />
        <LocationSection />
        <GallerySection images={galleryImages} onOpen={setActiveGallery} />
        <RsvpSection onSubmit={handleRsvpSubmit} submitting={submitting} />
        <ClosingSection />
      </main>

      <div className={`toast ${toast ? "is-visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}

/* ─── Envelope Intro ─── */
function EnvelopeIntro({ hidden, onEnter }) {
  return (
    <section
      className={`intro-envelope ${hidden ? "is-hidden" : ""}`}
      id="introEnvelope"
      aria-label="Opening wedding envelope animation"
    >
      <BotanicalLeft />
      <BotanicalRight />

      <div className="intro-copy">
        <span className="eyebrow">You are cordially invited</span>
        <h1>Dinuka &amp; Nimasha</h1>
        <p className="intro-date-line">26 · August · 2026</p>
      </div>

      <div className="envelope-stage" aria-hidden="true">
        <div className="envelope">
          <div className="envelope-back"></div>
          <div className="envelope-card">
            <span>Save the Date</span>
            <strong>Dinuka &amp; Nimasha</strong>
            <em>26 August 2026</em>
            <div className="envelope-card-flourish" aria-hidden="true">❀</div>
          </div>
          <div className="envelope-front envelope-front-left"></div>
          <div className="envelope-front envelope-front-right"></div>
          <div className="envelope-front envelope-front-bottom"></div>
          <div className="envelope-flap">
            <div className="seal-ring" aria-hidden="true">
              <div className="seal-text">D&amp;N</div>
            </div>
          </div>
          <div className="envelope-line envelope-line-one"></div>
          <div className="envelope-line envelope-line-two"></div>
        </div>
      </div>

      <button className="skip-intro" type="button" onClick={onEnter}>
        <i data-lucide="heart" aria-hidden="true"></i>
        Open Invitation
      </button>
    </section>
  );
}

/* ─── Save Date Section ─── */
function SaveDateSection({ videoRef, videoFallback, onVideoError }) {
  return (
    <section className="section save-date-section" id="save-date" aria-labelledby="saveDateTitle">
      <div className="section-inner save-date-inner">
        <div className="video-shell reveal">
          <FloralCorner position="tl" />
          <FloralCorner position="tr" />
          <FloralCorner position="bl" />
          <FloralCorner position="br" />
          <div className={`video-frame ${videoFallback ? "has-fallback" : ""}`}>
            <video
              ref={videoRef}
              className="save-date-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80"
              onError={onVideoError}
            >
              <source src={saveDateVideoUrl} type="video/mp4" />
            </video>
            <img
              className="video-fallback"
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80"
              alt="Soft wedding floral fallback"
              loading="lazy"
            />
            <div className="video-overlay" aria-hidden="true"></div>
            <div className="save-date-text">
              <p id="saveDateTitle">Save the Date</p>
              <h2>Dinuka &amp; Nimasha</h2>
              <span>26 · 08 · 2026</span>
            </div>
          </div>
        </div>

        <a className="scroll-indicator" href="#invitation" aria-label="Scroll to invitation">
          <span>Scroll to Continue</span>
          <i data-lucide="chevron-down" aria-hidden="true"></i>
        </a>
      </div>
    </section>
  );
}

/* ─── Hero / Invitation Section ─── */
function HeroSection({ heroBackdropRef, guestName }) {
  return (
    <section className="section hero-invitation" id="invitation" aria-labelledby="invitationTitle">
      <div className="hero-backdrop" ref={heroBackdropRef} aria-hidden="true"></div>
      <div className="section-inner invitation-grid">
        <div className="photo-wrap reveal">
          <div className="photo-bloom"></div>
          <div className="photo-frame-border" aria-hidden="true"></div>
          <img
            src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1100&q=80"
            alt="Couple portrait"
            loading="lazy"
          />
          <div className="photo-caption">26 August 2026</div>
        </div>

        <div className="invitation-panel reveal">
          <FloralCorner position="tl" />
          <FloralCorner position="tr" />
          <FloralCorner position="bl" />
          <FloralCorner position="br" />
          <span className="eyebrow">Together with their families</span>
          <p className="invitation-prelude">We are delighted to invite you</p>
          <h2 id="invitationTitle">Dinuka &amp; Nimasha</h2>
          <p>Request the honour of <strong>{guestName}</strong> presence</p>
          <GoldDivider />
          <div className="invitation-details">
            <div className="invitation-detail-item">
              <i data-lucide="clock" aria-hidden="true"></i>
              <span>Poruwa ceremony at 9.10 AM</span>
            </div>
            <div className="invitation-detail-item">
              <i data-lucide="map-pin" aria-hidden="true"></i>
              <span>Capital City Hotel, Badulla</span>
            </div>
            <div className="invitation-detail-item">
              <i data-lucide="calendar" aria-hidden="true"></i>
              <span>Wednesday, 26 August 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Countdown Section ─── */
function CountdownSection({ countdown }) {
  return (
    <section className="section countdown-section" id="countdown" aria-labelledby="countdownTitle">
      <BotanicalLeft />
      <BotanicalRight />
      <div className="section-inner">
        <div className="section-heading reveal">
          <span className="eyebrow">Counting every moment</span>
          <h2 id="countdownTitle">Until We Celebrate</h2>
          <GoldDivider />
        </div>
        <div className="countdown-grid reveal" aria-live="polite">
          <CountCard value={countdown.days} label="Days" />
          <CountCard value={countdown.hours} label="Hours" />
          <CountCard value={countdown.minutes} label="Minutes" />
          <CountCard value={countdown.seconds} label="Seconds" />
        </div>
        <p className="countdown-tagline reveal">
          <i data-lucide="heart" aria-hidden="true"></i>
          26 · August · 2026 · Capital City Hotel, Badulla
          <i data-lucide="heart" aria-hidden="true"></i>
        </p>
      </div>
    </section>
  );
}

function CountCard({ value, label }) {
  return (
    <div className="count-card">
      <div className="count-card-inner">
        <strong>{value}</strong>
        <div className="count-card-shine" aria-hidden="true"></div>
      </div>
      <span>{label}</span>
    </div>
  );
}

/* ─── Timeline Section ─── */
function TimelineSection() {
  return (
    <section className="section timeline-section" id="agenda" aria-labelledby="agendaTitle">
      <div className="section-inner">
        <div className="section-heading reveal">
          <span className="eyebrow">Wedding day</span>
          <h2 id="agendaTitle">A Gentle Timeline</h2>
          <GoldDivider />
        </div>

        <div className="timeline">
          {timelineItems.map((item, idx) => (
            <article className="timeline-item reveal" key={item.title} style={{ "--item-index": idx }}>
              <div className="timeline-connector" aria-hidden="true">
                <div className="timeline-icon">
                  <i data-lucide={item.icon} aria-hidden="true"></i>
                </div>
              </div>
              <div className="timeline-content">
                <span className="timeline-time">{item.time}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Location Section ─── */
function LocationSection() {
  return (
    <section className="section location-section" id="location" aria-labelledby="locationTitle">
      <div className="section-inner location-grid">
        <div className="section-heading location-heading reveal">
          <span className="eyebrow">Venue</span>
          <h2 id="locationTitle">Capital City Hotel</h2>
          <p className="location-address">
            <i data-lucide="map-pin" aria-hidden="true"></i>
            Badulla, Sri Lanka
          </p>
          <p>We would be honoured to welcome you at Capital City Hotel, Badulla.</p>
          <div className="button-row">
            <a
              className="premium-button"
              href="https://www.google.com/maps/search/?api=1&query=Capital%20City%20Hotel%20Badulla"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i data-lucide="map-pin" aria-hidden="true"></i>
              Open in Google Maps
            </a>
            <a
              className="premium-button premium-button-light"
              href="https://www.google.com/maps/dir/?api=1&destination=Capital%20City%20Hotel%20Badulla"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i data-lucide="navigation" aria-hidden="true"></i>
              Get Directions
            </a>
          </div>
        </div>

        <div className="map-card reveal">
          <iframe
            title="Map to Capital City Hotel, Badulla"
            src="https://www.google.com/maps?q=Capital%20City%20Hotel%20Badulla&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
          <div className="map-card-overlay" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery Section ─── */
function GallerySection({ images, onOpen }) {
  return (
    <section className="section gallery-section" id="gallery" aria-labelledby="galleryTitle">
      <div className="section-inner">
        <div className="section-heading reveal">
          <span className="eyebrow">Memories</span>
          <h2 id="galleryTitle">Our Little Gallery</h2>
          <GoldDivider />
        </div>

        <div className="gallery-grid">
          {images.map((image, idx) => (
            <figure
              className="gallery-card reveal"
              key={image.src}
              style={{ "--card-delay": `${idx * 80}ms` }}
              onClick={() => onOpen(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${image.alt}`}
              onKeyDown={(e) => e.key === "Enter" && onOpen(idx)}
            >
              <div className="gallery-card-inner">
                <img src={image.src} alt={image.alt} loading="lazy" />
                <div className="gallery-card-overlay" aria-hidden="true">
                  <i data-lucide="zoom-in" aria-hidden="true"></i>
                </div>
              </div>
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── RSVP Section ─── */
function RsvpSection({ onSubmit, submitting }) {
  return (
    <section className="section rsvp-section" id="rsvp" aria-labelledby="rsvpTitle">
      <div className="section-inner rsvp-grid">
        <div className="rsvp-copy reveal">
          <span className="eyebrow">RSVP</span>
          <h2 id="rsvpTitle">Please Confirm Your Attendance</h2>
          <GoldDivider />
          <p>Your presence will truly make this day unforgettable for our family.</p>
          <p>Kindly let us know by <strong>15 August 2026</strong>.</p>

          <div className="contact-actions">
            <a className="premium-button" href="tel:+94769055723">
              <i data-lucide="phone" aria-hidden="true"></i>
              Call Dinuka · 076 90 55 723
            </a>
            <a className="premium-button premium-button-light" href="tel:+94703901633">
              <i data-lucide="phone" aria-hidden="true"></i>
              Call Nimasha · 070 39 01 633
            </a>
            <a className="premium-button" href="https://wa.me/94769055723" target="_blank" rel="noopener noreferrer">
              <i data-lucide="message-circle" aria-hidden="true"></i>
              WhatsApp Dinuka
            </a>
            <a className="premium-button premium-button-light" href="https://wa.me/94703901633" target="_blank" rel="noopener noreferrer">
              <i data-lucide="message-circle" aria-hidden="true"></i>
              WhatsApp Nimasha
            </a>
          </div>
        </div>

        <div className="rsvp-form-wrap reveal">
          <div className="rsvp-form-header" aria-hidden="true">
            <span>Will you join us?</span>
          </div>
          <form className="rsvp-form" onSubmit={onSubmit}>
            <label>
              <span>Your Name</span>
              <input type="text" name="name" autoComplete="name" required placeholder="Full name" />
            </label>

            <label>
              <span>Number of Guests</span>
              <input type="number" name="guests" min="1" max="20" defaultValue="1" required />
            </label>

            <fieldset>
              <legend>Will you attend?</legend>
              <div className="attendance-options">
                <label>
                  <input type="radio" name="attendance" value="Yes" defaultChecked />
                  <span>
                    <i data-lucide="check" aria-hidden="true"></i>
                    Joyfully Accept
                  </span>
                </label>
                <label>
                  <input type="radio" name="attendance" value="No" />
                  <span>
                    <i data-lucide="x" aria-hidden="true"></i>
                    Regretfully Decline
                  </span>
                </label>
                <label>
                  <input type="radio" name="attendance" value="Maybe" />
                  <span>
                    <i data-lucide="help-circle" aria-hidden="true"></i>
                    Perhaps
                  </span>
                </label>
              </div>
            </fieldset>

            <label>
              <span>A Note for the Couple</span>
              <textarea name="message" rows="4" placeholder="Share your warm wishes…"></textarea>
            </label>

            <button className="submit-button" type="submit" disabled={submitting}>
              <i data-lucide={submitting ? "loader-circle" : "send"} aria-hidden="true"></i>
              {submitting ? "Sending with love…" : "Send RSVP with Love"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─── Closing Section ─── */
function ClosingSection() {
  return (
    <section className="section closing-section" id="closing" aria-labelledby="closingTitle">
      <BotanicalLeft />
      <BotanicalRight />
      <div className="section-inner closing-inner reveal">
        <div className="closing-monogram" aria-hidden="true">❀</div>
        <span className="eyebrow">With all our love</span>
        <h2 id="closingTitle">Dinuka &amp; Nimasha</h2>
        <GoldDivider />
        <p>Thank you for being part of our story.</p>
        <p className="closing-venue">Capital City Hotel · Badulla · 26 August 2026</p>
      </div>
    </section>
  );
}

export default App;