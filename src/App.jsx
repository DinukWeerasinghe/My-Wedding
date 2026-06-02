// noinspection typescript.react.portability.i18next.jsx-not-internationalized
/* eslint-disable i18next/no-literal-string */
import { useEffect, useMemo, useRef, useState } from "react";
import { MUSIC_SOURCE, RSVP_ENDPOINT } from "./config.js";
import "./styles.css";

const weddingDate = new Date("2026-08-26T09:10:00+05:30");
const saveDateVideoUrl = "/Wedding Save the Date Video.mp4";

const weddingDetails = {
  date: "26 August 2026",
  time: "9:10 AM onwards",
  venue: "Capital City Hotel, Badulla",
  dressCode: "Formal Attire",
};

// 12 Real Wedding Images from the couple's assets
const galleryImages = [
  { src: "/images/photo10.c881da68d3cf7b9dab07.webp", alt: "Dinuka & Nimasha - Elegant Pose" },
  { src: "/images/photo11.7892a6d8745a7c02f7d6.webp", alt: "Dinuka & Nimasha - Joyful Walk" },
  { src: "/images/photo12.8c94156b0a6c2297a62b.webp", alt: "Dinuka & Nimasha - Ring Exchange" },
  { src: "/images/photo1.65cd987bc86654a16c94.webp", alt: "Dinuka & Nimasha - Studio Portrait" },
  { src: "/images/photo2.3d6a2a329b03b079fb95.webp", alt: "Dinuka & Nimasha - Candid Smile" },
  { src: "/images/photo3.090eae98f27e86000181.webp", alt: "Dinuka & Nimasha - Soft Gaze" },
  { src: "/images/photo4.79ad4c593c7971828169.webp", alt: "Dinuka & Nimasha - Gentle Hug" },
  { src: "/images/photo5.bb2925991ed5b526170e.webp", alt: "Dinuka & Nimasha - Outdoor Romance" },
  { src: "/images/photo6.a68d48b383b9499d6188.webp", alt: "Dinuka & Nimasha - Sunset Love" },
  { src: "/images/photo7.eaf26b9868f5fa3e5e54.webp", alt: "Dinuka & Nimasha - Traditional Gown" },
  { src: "/images/photo8.93dfdec8d7f9131146fd.webp", alt: "Dinuka & Nimasha - Groom Portrait" },
  { src: "/images/photo9.19ca8d36b05343bc5902.webp", alt: "Dinuka & Nimasha - Bride Portrait" },
];

// Preloaded seating data for Table Seating search
const seatingDatabase = [
  { name: "Dinuka Weerasinghe", table: "1", tableName: "Bridal Table" },
  { name: "Nimasha Wijesiri", table: "1", tableName: "Bridal Table" },
  { name: "Mr. Wijesiri", table: "2", tableName: "Bride's Immediate Family" },
  { name: "Mrs. Wijesiri", table: "2", tableName: "Bride's Immediate Family" },
  { name: "Mr. Weerasinghe", table: "2", tableName: "Groom's Immediate Family" },
  { name: "Mrs. Weerasinghe", table: "2", tableName: "Groom's Immediate Family" },
  { name: "Amara Wijesiri", table: "2", tableName: "Bride's Immediate Family" },
  { name: "Pathum Weerasinghe", table: "3", tableName: "Groom's Close Family" },
  { name: "Ruwan Perera", table: "4", tableName: "Groom's Best Friends" },
  { name: "Kasun Fernando", table: "4", tableName: "Groom's Best Friends" },
  { name: "Sanduni Silva", table: "5", tableName: "Bride's College Friends" },
  { name: "Sajith Jayasinghe", table: "5", tableName: "Bride's College Friends" },
  { name: "Priyantha Jayawardena", table: "6", tableName: "Groom's Relatives" },
  { name: "Malkanthi Gunawardena", table: "6", tableName: "Bride's Relatives" },
  { name: "Tharindu Edirisinghe", table: "7", tableName: "University Colleagues" },
  { name: "Dilhani Senanayake", table: "8", tableName: "Family Friends" },
];

function getCountdown() {
  const distance = Math.max(weddingDate.getTime() - Date.now(), 0);

  const daysVal = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hoursVal = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutesVal = Math.floor((distance / (1000 * 60)) % 60);
  const secondsVal = Math.floor((distance / 1000) % 60);

  return {
    days: String(daysVal).padStart(2, "0"),
    hours: String(hoursVal).padStart(2, "0"),
    minutes: String(minutesVal).padStart(2, "0"),
    seconds: String(secondsVal).padStart(2, "0"),
    // Percentages for neomorphic circular tracks
    daysPct: daysVal > 365 ? 1 : daysVal / 365,
    hoursPct: hoursVal / 24,
    minutesPct: minutesVal / 60,
    secondsPct: secondsVal / 60,
  };
}

function makeFloatingItems(count, type) {
  return Array.from({ length: count }, (_, index) => {
    if (type === "petal") {
      return {
        id: `${type}-${index}`,
        left: `${Math.random() * 100}%`,
        drift: `${(Math.random() * 160 - 80).toFixed(0)}px`,
        duration: `${14 + Math.random() * 10}s`,
        delay: `${Math.random() * -20}s`,
        scale: 0.6 + Math.random() * 0.8,
        rotation: Math.random() * 360,
        blurred: Math.random() > 0.5,
      };
    }

    if (type === "heart") {
      return {
        id: `${type}-${index}`,
        left: `${8 + Math.random() * 84}%`,
        sway: `${(Math.random() * 120 - 60).toFixed(0)}px`,
        duration: `${11 + Math.random() * 8}s`,
        delay: `${Math.random() * -14}s`,
        scale: (0.55 + Math.random() * 0.55).toFixed(2),
        opacity: (0.18 + Math.random() * 0.24).toFixed(2),
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
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, dependencies);
}

function App() {
  const [loadingHidden, setLoadingHidden] = useState(false);
  const [introClosed, setIntroClosed] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown);
  const [videoFallback, setVideoFallback] = useState(false);
  const [toast, setToast] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  // Table Seating search states
  const [seatingQuery, setSeatingQuery] = useState("");
  const [seatingResult, setSeatingResult] = useState(null);
  const [searchedName, setSearchedName] = useState("");

  // Gallery grid lightbox states
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const musicRef = useRef(null);
  const saveDateVideoRef = useRef(null);
  const heroBackdropRef = useRef(null);
  const toastTimerRef = useRef(null);

  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 560px)").matches;
  const petals = useMemo(() => makeFloatingItems(isMobile ? 12 : 22, "petal"), [isMobile]);
  const sparkles = useMemo(() => makeFloatingItems(isMobile ? 14 : 26, "sparkle"), [isMobile]);
  const hearts = useMemo(() => makeFloatingItems(isMobile ? 5 : 9, "heart"), [isMobile]);

  useLucideIcons([musicPlaying, submitting, introClosed, seatingResult, lightboxIndex]);

  useEffect(() => {
    document.body.classList.toggle("intro-active", !introClosed);
  }, [introClosed]);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setLoadingHidden(true), 650);
    return () => window.clearTimeout(loadingTimer);
  }, []);

  const [guestName, setGuestName] = useState("your");

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

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, [introClosed]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setBackToTopVisible(y > 700);

      if (heroBackdropRef.current) {
        heroBackdropRef.current.style.transform = `translateY(${Math.min(y * 0.05, 40)}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!introClosed || !saveDateVideoRef.current) return;

    const videoElement = saveDateVideoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement.play().catch(() => { });
        } else {
          videoElement.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(videoElement);
    return () => {
      observer.unobserve(videoElement);
    };
  }, [introClosed]);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 4200);
  }

  function closeIntro() {
    setIntroClosed(true);
    setEnvelopeOpened(true);
    document.querySelector("#save-date")?.scrollIntoView({ behavior: "smooth", block: "start" });
    saveDateVideoRef.current?.play().catch(() => { });

    if (musicRef.current && MUSIC_SOURCE && musicRef.current.paused) {
      musicRef.current.play().catch(() => {
        console.log("Audio autoplay blocked by browser");
      });
      setMusicPlaying(true);
    }
  }

  async function toggleMusic() {
    if (!MUSIC_SOURCE) {
      showToast("Music source is ready. Set MUSIC_SOURCE path in src/config.js.");
      return;
    }

    if (!musicRef.current) return;

    if (musicRef.current.paused) {
      try {
        await musicRef.current.play();
        setMusicPlaying(true);
      } catch (error) {
        showToast("Tap once more to enable audio playback.");
      }
    } else {
      musicRef.current.pause();
      setMusicPlaying(false);
    }
  }

  // Seating search execution
  function handleSeatingSearch(e) {
    e.preventDefault();
    if (!seatingQuery.trim()) {
      showToast("Please enter your name to find your table.");
      return;
    }

    const normalizedQuery = seatingQuery.trim().toLowerCase();
    const match = seatingDatabase.find(guest => guest.name.toLowerCase().includes(normalizedQuery));

    if (match) {
      setSeatingResult(match);
      setSearchedName(match.name);
    } else {
      setSeatingResult({ notFound: true });
      setSearchedName(seatingQuery);
    }
  }

  async function sendRsvpToGoogleSheet(payload) {
    if (!RSVP_ENDPOINT.trim().startsWith("https://script.google.com/")) {
      throw new Error("RSVP endpoint is not configured.");
    }

    await fetch(RSVP_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
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
      showToast(`Thank you, ${name}! Your RSVP has been received.`);
      form.reset();
    } catch (error) {
      console.error("RSVP submission failed", error);
      showToast("RSVP endpoint unavailable. Check config.js connection.");
    } finally {
      setSubmitting(false);
    }
  }

  // Lightbox handlers
  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <>
      <div className={`loading-screen ${loadingHidden ? "is-hidden" : ""}`} aria-hidden="true">
        <div className="loading-mark">D &amp; N</div>
        <div className="loading-line"></div>
      </div>

      <audio ref={musicRef} loop preload="none" src={MUSIC_SOURCE || undefined}></audio>

      {/* Floating Action Audio FAB */}
      <button className={`utility-button music-toggle ${musicPlaying ? "is-playing" : ""}`} type="button" onClick={toggleMusic} aria-label="Toggle background music" title="Toggle music">
        <i data-lucide={musicPlaying ? "volume-2" : "volume-x"} aria-hidden="true"></i>
        <span>Music</span>
      </button>

      {/* Back to Top */}
      <button className={`utility-button back-to-top ${backToTopVisible ? "is-visible" : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" title="Back to top">
        <i data-lucide="arrow-up" aria-hidden="true"></i>
        <span>Top</span>
      </button>

      {/* Background Falling Petals */}
      <div className="petal-field" aria-hidden="true">
        {petals.map((petal) => (
          <span
            key={petal.id}
            className={`petal ${petal.blurred ? "petal--blurred" : ""}`}
            style={{
              left: petal.left,
              "--drift": petal.drift,
              animationDuration: petal.duration,
              animationDelay: petal.delay,
              transform: `scale(${petal.scale}) rotate(${petal.rotation}deg)`,
            }}
          ></span>
        ))}
      </div>

      {/* Background Sparkles */}
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

      {/* Background Floating Hearts */}
      <div className="heart-field" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart"
            style={{
              left: heart.left,
              "--sway": heart.sway,
              "--heart-scale": heart.scale,
              "--heart-opacity": heart.opacity,
              animationDuration: heart.duration,
              animationDelay: heart.delay,
            }}
          ></span>
        ))}
      </div>

      <EnvelopeIntro hidden={introClosed} onEnter={closeIntro} />

      <main>
        {/* Section 1: Save the Date Video */}
        <SaveDateSection
          videoRef={saveDateVideoRef}
          videoFallback={videoFallback}
          onVideoError={() => setVideoFallback(true)}
        />

        {/* Section 2: Hero Invitation Card */}
        <HeroSection heroBackdropRef={heroBackdropRef} guestName={guestName} />

        {/* Section 3: Parents & Family Heritage */}
        <ParentsSection />

        {/* Section 4: Celebrations Details */}
        <DetailsSection />

        {/* Section 5: Neomorphic Circular Countdown */}
        <CountdownSection countdown={countdown} />

        {/* Section 6: Interactive Seating Finder Search */}
        <SeatingSection
          seatingQuery={seatingQuery}
          setSeatingQuery={setSeatingQuery}
          seatingResult={seatingResult}
          searchedName={searchedName}
          onSearch={handleSeatingSearch}
          onClear={() => { setSeatingQuery(""); setSeatingResult(null); }}
        />

        {/* Section 7: Alternate Day Lineup Timeline */}
        <TimelineSection />

        {/* Section 8: Image Grid Collage with Lightbox */}
        <GallerySection images={galleryImages} onOpenLightbox={handleOpenLightbox} />

        {/* Section 9: Personal Note to Guests */}
        <PersonalNoteSection />

        {/* Section 10: Map & Locations */}
        <LocationSection />

        {/* Section 11: RSVP Google Form Submission */}
        <RsvpSection onSubmit={handleRsvpSubmit} submitting={submitting} />
      </main>

      {/* Footer Branding section */}
      <WeddingFooter />

      {/* Fullscreen Photo Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="lightbox-modal" onClick={handleCloseLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={handleCloseLightbox} aria-label="Close photo details">
            <i data-lucide="x" aria-hidden="true"></i>
          </button>

          <button className="lightbox-nav-btn lightbox-nav-left" onClick={handlePrevLightbox} aria-label="Previous photo">
            <i data-lucide="chevron-left" aria-hidden="true"></i>
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[lightboxIndex].src} alt={galleryImages[lightboxIndex].alt} className="lightbox-img" />
            <div className="lightbox-caption">{galleryImages[lightboxIndex].alt}</div>
          </div>

          <button className="lightbox-nav-btn lightbox-nav-right" onClick={handleNextLightbox} aria-label="Next photo">
            <i data-lucide="chevron-right" aria-hidden="true"></i>
          </button>

          <div className="lightbox-counter">{lightboxIndex + 1} / {galleryImages.length}</div>
        </div>
      )}

      {/* Toast Alert Popups */}
      <div className={`toast ${toast ? "is-visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}

// Subcomponents:

function EnvelopeIntro({ hidden, onEnter }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (hidden) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play().catch(() => { });
    }
  }, [hidden]);

  return (
    <section className={`intro-envelope ${hidden ? "is-hidden" : ""}`} id="introEnvelope" aria-label="Opening wedding envelope invitation">
      <video ref={videoRef} className="envelope-bg-video" autoPlay muted loop playsInline preload="metadata">
        <source src={saveDateVideoUrl} type="video/mp4" />
      </video>

      <div className="intro-copy">
        <span className="eyebrow">You are invited</span>
        <h1>Dinuka &amp; Nimasha</h1>
      </div>

      <div
        className="envelope-stage"
        aria-hidden="true"
        onClick={onEnter}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onEnter();
          }
        }}
      >
        <div className="envelope">
          <div className="envelope-back"></div>
          <div className="envelope-card">
            <span>Save the Date</span>
            <strong>Dinuka &amp; Nimasha</strong>
            <em>26 August 2026</em>
          </div>
          <div className="envelope-front envelope-front-left"></div>
          <div className="envelope-front envelope-front-right"></div>
          <div className="envelope-front envelope-front-bottom"></div>
          <div className="envelope-flap">
            <div className="seal-text">D&amp;N</div>
          </div>
          <div className="envelope-line envelope-line-one"></div>
          <div className="envelope-line envelope-line-two"></div>
        </div>

        <div className="envelope-sparkles" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={`sparkle-${i}`} className="envelope-sparkle" style={{
              '--sparkle-index': i,
            }}></span>
          ))}
        </div>
      </div>

      <button className="skip-intro" type="button" onClick={onEnter}>
        Open Invitation
      </button>
    </section>
  );
}

function SaveDateSection({ videoRef, videoFallback, onVideoError }) {
  return (
    <section className="section save-date-section" id="save-date" aria-labelledby="saveDateTitle">
      <div className="section-inner save-date-inner">
        <div className="video-shell reveal">
          <div className={`video-frame ${videoFallback ? "has-fallback" : ""}`}>
            <video
              ref={videoRef}
              className="save-date-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/home_photo.c881da68d3cf7b9dab07.webp"
              onError={onVideoError}
            >
              <source src={saveDateVideoUrl} type="video/mp4" />
            </video>

            <img
              className="video-fallback"
              src="/images/home_photo.c881da68d3cf7b9dab07.webp"
              alt="Dinuka and Nimasha Portrait Fallback"
              loading="lazy"
            />

            <div className="video-overlay" aria-hidden="true"></div>
            <div className="save-date-text">
              <p id="saveDateTitle">Save the Date</p>
              <h2>Dinuka &amp; Nimasha</h2>
              <span>26.08.2026</span>
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

function HeroSection({ heroBackdropRef, guestName }) {
  return (
    <section className="section hero-invitation" id="invitation" aria-labelledby="invitationTitle">
      <div className="hero-backdrop" ref={heroBackdropRef} aria-hidden="true"></div>
      <div className="section-inner invitation-grid">
        <div className="photo-wrap reveal">
          <div className="photo-bloom"></div>
          <img
            src="/images/home_photo.c881da68d3cf7b9dab07.webp"
            alt="Dinuka & Nimasha Wedding Portrait"
            loading="lazy"
          />
          <div className="photo-caption">26 August 2026</div>
        </div>

        <div className="invitation-panel reveal">
          <span className="eyebrow">Together with their families</span>
          <p className="invite-subtitle">We are delighted to invite you</p>
          <h2 id="invitationTitle">Dinuka &amp; Nimasha</h2>
          <p className="invite-for">Request the honour of <strong>{guestName}</strong> presence</p>

          <div className="floral-divider" aria-hidden="true">
            <span className="divider-line"></span>
            <span className="divider-icon">❀</span>
            <span className="divider-line"></span>
          </div>

          <div className="invitation-details">
            <span>Poruwa Ceremony at 9.10 AM</span>
            <span>Capital City Hotel, Badulla</span>
          </div>

          <div className="hero-invite-actions">
            <a href="#rsvp" className="premium-button">
              <i data-lucide="send" aria-hidden="true"></i>
              RSVP Now
            </a>
            <a href="#seating" className="premium-button premium-button-light">
              <i data-lucide="search" aria-hidden="true"></i>
              Find My Seat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// [NEW Section] Displays the family names in elegant invitation layout
function ParentsSection() {
  return (
    <section className="section parents-section" id="heritage" aria-labelledby="heritageTitle">
      <div className="section-inner">
        <div className="parents-card reveal">
          <span className="eyebrow">A Union of Families</span>
          <h2 id="heritageTitle">With Love &amp; Blessings</h2>

          <div className="parents-grid">
            <div className="parents-side bride-parents">
              <span className="family-role">Bride's Family</span>
              <h3>Mr. &amp; Mrs. Wijesiri</h3>
              <p>Family of Badulla</p>
            </div>

            <div className="parents-amp" aria-hidden="true">&amp;</div>

            <div className="parents-side groom-parents">
              <span className="family-role">Groom's Family</span>
              <h3>Mr. &amp; Mrs. Weerasinghe</h3>
              <p>Family of Colombo</p>
            </div>
          </div>

          <div className="parents-note">
            <p>We invite you to share this sacred moment as our families join together in grace and celebratory harmony.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailsSection() {
  return (
    <section className="section details-section" id="details" aria-labelledby="detailsTitle">
      <div className="section-inner">
        <div className="section-heading reveal">
          <span className="eyebrow">Celebration Details</span>
          <h2 id="detailsTitle">Wedding Details</h2>
        </div>

        <div className="details-grid reveal">
          <DetailCard icon="calendar" label="Date" value={weddingDetails.date} />
          <DetailCard icon="clock" label="Time" value={weddingDetails.time} />
          <DetailCard icon="map-pin" label="Venue" value={weddingDetails.venue} />
          <DetailCard icon="sparkles" label="Dress Code" value={weddingDetails.dressCode} />
        </div>

        <div className="details-note reveal">
          <p>We kindly request your RSVP by <strong>10 August 2026</strong></p>
        </div>
      </div>
    </section>
  );
}

function DetailCard({ icon, label, value }) {
  return (
    <div className="detail-card">
      <div className="detail-icon">
        <i data-lucide={icon} aria-hidden="true"></i>
      </div>
      <div className="detail-content">
        <span className="detail-label">{label}</span>
        <strong className="detail-value">{value}</strong>
      </div>
    </div>
  );
}

// [REPLACED Section] Displays circular neomorphic SVG progress track countdown
function CountdownSection({ countdown }) {
  return (
    <section className="section countdown-section" id="countdown" aria-labelledby="countdownTitle">
      <div className="section-inner">
        <div className="section-heading reveal">
          <span className="eyebrow">Counting every moment</span>
          <h2 id="countdownTitle">Until We Celebrate</h2>
        </div>

        {/* Neomorphic circular rings row */}
        <div className="cd-neo-row reveal" aria-live="polite">
          <CircularCountCard value={countdown.days} label="Days" pct={countdown.daysPct} />
          <CircularCountCard value={countdown.hours} label="Hours" pct={countdown.hoursPct} />
          <CircularCountCard value={countdown.minutes} label="Minutes" pct={countdown.minutesPct} />
          <CircularCountCard value={countdown.seconds} label="Seconds" pct={countdown.secondsPct} />
        </div>
      </div>
    </section>
  );
}

function CircularCountCard({ value, label, pct }) {
  // SVG Calculations for circle progress track (Radius = 40, Circumference = 2 * PI * 40 = 251.2)
  const radius = 40;
  const circ = 2 * Math.PI * radius;
  const strokeOffset = circ - (pct * circ);

  return (
    <div className="ring-card" aria-label={`${value} ${label}`}>
      <div className="ring-container">
        <svg className="ring-svg" viewBox="0 0 100 100">
          <circle className="ring-track" cx="50" cy="50" r={radius} />
          <circle
            className="ring-bar"
            cx="50"
            cy="50"
            r={radius}
            strokeDasharray={circ}
            strokeDashoffset={strokeOffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="ring-inner">
          <strong className="ring-value">{value}</strong>
          <span className="ring-label">{label}</span>
        </div>
      </div>
    </div>
  );
}

// [NEW Section] Seating finder lookup table search widget
function SeatingSection({ seatingQuery, setSeatingQuery, seatingResult, searchedName, onSearch, onClear }) {
  return (
    <section className="section seating-section" id="seating" aria-labelledby="seatingTitle">
      <div className="section-inner">
        <div className="seating-card reveal">
          <div className="seating-header">
            <span className="eyebrow">Wedding Seating</span>
            <h2 id="seatingTitle">Find Your Table</h2>
            <p>Enter your first or last name below to find your assigned seat and table details.</p>
          </div>

          <form className="seating-search-form" onSubmit={onSearch}>
            <div className="seating-input-wrap">
              <i data-lucide="search" className="seating-search-icon" aria-hidden="true"></i>
              <input
                type="text"
                className="seating-input"
                placeholder="Enter your name (e.g. Perera, Wijesiri)..."
                value={seatingQuery}
                onChange={(e) => setSeatingQuery(e.target.value)}
                aria-label="Guest seating search"
              />
              {seatingQuery && (
                <button type="button" className="seating-clear-btn" onClick={onClear} aria-label="Clear search">
                  <i data-lucide="x" aria-hidden="true"></i>
                </button>
              )}
            </div>
            <button className="premium-button" type="submit">
              Search Seating
            </button>
          </form>

          {/* Results dynamic panel */}
          {seatingResult && (
            <div className="seating-result-panel reveal is-visible">
              {seatingResult.notFound ? (
                <div className="seating-notfound">
                  <i data-lucide="search-code" className="result-icon notfound" aria-hidden="true"></i>
                  <h3>Name Not Found</h3>
                  <p>We couldn't find "<strong>{searchedName}</strong>" in our seating list. Please double-check spelling or ask our hospitality desk upon arrival.</p>
                </div>
              ) : (
                <div className="seating-found">
                  <i data-lucide="ticket" className="result-icon found" aria-hidden="true"></i>
                  <span className="result-welcome">Welcome, guest</span>
                  <h3>{seatingResult.name}</h3>
                  <div className="seating-table-badge">
                    <span className="table-num">Table {seatingResult.table}</span>
                    <span className="table-name">{seatingResult.tableName}</span>
                  </div>
                  <p>We are absolutely thrilled to welcome you to our celebration banquet!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const timelineItems = [
    { num: "01", time: "9:10 AM", title: "Ceremony Begins", desc: "A warm welcome as family and friends gather to celebrate." },
    { num: "02", time: "9:15 AM", title: "Poruwa Ceremony", desc: "Traditional ceremonial rituals begin with spiritual blessings and marital bonds." },
    { num: "03", time: "12:00 PM", title: "Lunch & Reception", desc: "Share a delicious, loving meal and capture beautiful pictures together." },
    { num: "04", time: "3:30 PM", title: "Going Away", desc: "Graceful farewell blessings as the couple prepares for their new lifetime together." },
  ];

  return (
    <section className="section timeline-section" id="agenda" aria-labelledby="agendaTitle">
      <div className="section-inner">
        <div className="section-heading reveal">
          <span className="eyebrow">Wedding lineup</span>
          <h2 id="agendaTitle">The Wedding Lineup</h2>
        </div>

        <div className="agenda-list reveal">
          {timelineItems.map((item, idx) => (
            <article className={`agenda-row ${idx % 2 === 1 ? 'agenda-row--reverse' : ''}`} key={item.title}>
              <div className="agenda-time-wrap">
                <span className="agenda-time">{item.time}</span>
              </div>
              <div className="agenda-center">
                <span className="agenda-line"></span>
                <span className="agenda-dot"></span>
                <span className="agenda-line"></span>
              </div>
              <div className="agenda-content">
                <span className="agenda-meta">{item.num}</span>
                <h3 className="agenda-label">{item.title}</h3>
                <p className="agenda-desc">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// [REPLACED Section] Displays beautiful 12-image grid editorial collage
function GallerySection({ images, onOpenLightbox }) {
  return (
    <section className="section gallery-section" id="gallery" aria-labelledby="galleryTitle">
      <div className="section-inner">
        <div className="gallery-head reveal">
          <span className="eyebrow">Memories</span>
          <h2 id="galleryTitle">Moments of Love</h2>
          <div className="gallery-divider"></div>
          <p className="gallery-desc">
            Holding onto the laughter, the quiet moments, and the little sparks of magic that brought us here… every step, every dream, leading to our forever. ✨💍
          </p>
        </div>

        {/* Dynamic masonry/grid collage */}
        <div className="gallery-grid reveal">
          {images.map((image, index) => (
            <button
              type="button"
              className={`gallery-grid-item gallery-grid-item--${index + 1}`}
              key={image.src}
              onClick={() => onOpenLightbox(index)}
              aria-label={`View full-screen wedding photo ${index + 1}`}
            >
              <div className="gallery-media-frame">
                <img src={image.src} alt={image.alt} loading="lazy" />
                <div className="gallery-media-overlay">
                  <i data-lucide="zoom-in" aria-hidden="true"></i>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// [NEW Section] Personal greeting note to all wedding guests
function PersonalNoteSection() {
  return (
    <section className="section personal-note-section" id="note" aria-labelledby="noteTitle">
      <div className="section-inner note-grid reveal">
        <div className="note-image-wrap">
          <img
            src="/images/rsvp.7892a6d8745a7c02f7d6.webp"
            alt="Dinuka and Nimasha Candid Smile Portrait"
            className="note-portrait-img"
            loading="lazy"
          />
        </div>
        <div className="note-content">
          <span className="note-eyebrow">A Special Note</span>
          <h2 id="noteTitle">To Our Lovely Guests</h2>

          <p className="note-text">
            With hearts full of love and gratitude, we are so happy to celebrate this beautiful chapter of our lives with you. Your presence means more to us than words can truly express, and having you by our side makes this day even more meaningful.
          </p>
          <p className="note-text">
            Thank you for your love, your blessings, and for being part of our journey. We cannot wait to share laughter, joy, and unforgettable memories with the people who mean so much to us.
          </p>

          <div className="note-signature">
            <span className="signature-salutation">With all our love,</span>
            <div className="signature-names">Nimasha &amp; Dinuka</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="section location-section" id="location" aria-labelledby="locationTitle">
      <div className="section-inner location-grid">
        <div className="section-heading reveal">
          <span className="eyebrow">Venue</span>
          <h2 id="locationTitle">Capital City Hotel, Badulla</h2>
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
        </div>
      </div>
    </section>
  );
}

function RsvpSection({ onSubmit, submitting }) {
  return (
    <section className="section rsvp-section" id="rsvp" aria-labelledby="rsvpTitle">
      <div className="section-inner rsvp-grid">
        <div className="rsvp-copy reveal">
          <span className="eyebrow">RSVP</span>
          <h2 id="rsvpTitle">Please Confirm Your Attendance</h2>
          <p>Your presence will truly make this day memorable for our family.</p>
          <p>Kindly fill out the confirmation details below or get in touch with us directly.</p>

          <div className="contact-actions">
            <a className="premium-button" href="tel:+94769055723">
              <i data-lucide="phone" aria-hidden="true"></i>
              Call Dinuka - 076 90 55 723
            </a>
            <a className="premium-button premium-button-light" href="tel:+94703901633">
              <i data-lucide="phone" aria-hidden="true"></i>
              Call Nimasha - 070 39 01 633
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

        <form className="rsvp-form reveal" onSubmit={onSubmit}>
          <label>
            <span>Name</span>
            <input type="text" name="name" autoComplete="name" required />
          </label>

          <label>
            <span>Number of guests</span>
            <input type="number" name="guests" min="1" max="20" defaultValue="1" required />
          </label>

          <fieldset>
            <legend>Attendance</legend>
            <div className="attendance-options">
              <label>
                <input type="radio" name="attendance" value="Yes" defaultChecked />
                <span>Yes, I will attend</span>
              </label>
              <label>
                <input type="radio" name="attendance" value="No" />
                <span>Sorry, I cannot come</span>
              </label>
              <label>
                <input type="radio" name="attendance" value="Maybe" />
                <span>Maybe</span>
              </label>
            </div>
          </fieldset>

          <label>
            <span>Message</span>
            <textarea name="message" rows="5" placeholder="Leave a loving note for the couple..."></textarea>
          </label>

          <button className="submit-button" type="submit" disabled={submitting}>
            <i data-lucide={submitting ? "loader-circle" : "send"} aria-hidden="true"></i>
            {submitting ? "Sending RSVP..." : "Submit RSVP"}
          </button>
        </form>
      </div>
    </section>
  );
}

// [NEW Section] Premium copyright brand footer widget
function WeddingFooter() {
  return (
    <footer className="wedding-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">

            <div className="footer-brand-text">
              <p className="footer-kicker">Celebrating</p>
              <h3>Dinuka &amp; Nimasha</h3>
              <p className="footer-couple-note">26.08.2026 • Badulla</p>
            </div>
          </div>

          <div className="footer-quick-links">
            <a href="#save-date" className="footer-link">Save the Date</a>
            <a href="#invitation" className="footer-link">Invitation</a>
            <a href="#heritage" className="footer-link">Our Heritage</a>
            <a href="#seating" className="footer-link">Seating Search</a>
            <a href="#gallery" className="footer-link">Photo Gallery</a>
            <a href="#rsvp" className="footer-link">Confirm RSVP</a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-contacts">
            <p>Hotlines: <a href="tel:+94769055723">+94 76 905 5723</a> • <a href="tel:+94703901633">+94 70 390 1633</a></p>
            <p>Email Support: <a href="mailto:rinixoinfo@gmail.com">rinixoinfo@gmail.com</a></p>
          </div>

          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Dinuka &amp; Nimasha. Crafted with love. Powered by <strong>RinixoSystems</strong>.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
