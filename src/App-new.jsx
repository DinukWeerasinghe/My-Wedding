import { useEffect, useMemo, useRef, useState } from "react";
import { MUSIC_SOURCE, RSVP_ENDPOINT } from "./config.js";

const weddingDate = new Date("2026-08-26T09:10:00+05:30");
const saveDateVideoUrl = "/Wedding Save the Date Video.mp4";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?auto=format&fit=crop&w=900&q=80",
    alt: "Wedding detail placeholder",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    alt: "Wedding couple placeholder",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
    alt: "Invitation card placeholder",
  },
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
    alt: "Wedding flowers placeholder",
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
        duration: `${14 + Math.random() * 10}s`,
        delay: `${Math.random() * -20}s`,
        scale: 0.6 + Math.random() * 1,
        rotation: Math.random() * 360,
        blurStart: 0 + Math.random() * 2,
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

export default function App() {
  const [loadingHidden, setLoadingHidden] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [countdown, setCountdown] = useState(getCountdown);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [guestName, setGuestName] = useState("your");

  const musicRef = useRef(null);
  const saveDateVideoRef = useRef(null);
  const sliderRef = useRef(null);
  const toastTimerRef = useRef(null);

  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 560px)").matches;
  const petals = useMemo(() => makeFloatingItems(isMobile ? 14 : 24, "petal"), [isMobile]);
  const sparkles = useMemo(() => makeFloatingItems(isMobile ? 16 : 28, "sparkle"), [isMobile]);

  useLucideIcons([musicPlaying, submitting, envelopeOpened]);

  // Loading animation
  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setLoadingHidden(true), 650);
    return () => window.clearTimeout(loadingTimer);
  }, []);

  // Guest name from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("name");
    if (nameParam) {
      const decodedName = decodeURIComponent(nameParam).replace(/_/g, " ");
      setGuestName(decodedName + "'s");
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    const interval = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  // Page scroll snap (keyboard navigation)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollToPage((currentPage + 1) % 7);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollToPage((currentPage - 1 + 7) % 7);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (!sliderRef.current) return;
      const scrollHeight = sliderRef.current.scrollHeight - window.innerHeight;
      const scrolled = sliderRef.current.scrollTop;
      const page = Math.round((scrolled / scrollHeight) * 6);
      setCurrentPage(Math.min(page, 6));
    };

    sliderRef.current?.addEventListener("scroll", handleScroll, { passive: true });
    return () => sliderRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToPage(pageNum) {
    if (!sliderRef.current) return;
    const scrollHeight = sliderRef.current.scrollHeight - window.innerHeight;
    sliderRef.current.scrollTo({
      top: (scrollHeight / 6) * pageNum,
      behavior: "smooth",
    });
  }

  function showToast(message) {
    setToast(message);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 4200);
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
      } catch (error) {
        showToast("Tap once more to allow music playback on this device.");
      }
    } else {
      musicRef.current.pause();
      setMusicPlaying(false);
    }
  }

  function openEnvelope() {
    setEnvelopeOpened(true);
    scrollToPage(1);
    saveDateVideoRef.current?.play().catch(() => {});
    
    if (musicRef.current && MUSIC_SOURCE && musicRef.current.paused) {
      musicRef.current.play().catch(() => {});
      setMusicPlaying(true);
    }
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
      await fetch(RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(rsvpPayload),
      });
      showToast(`Thank you, ${name}. Your RSVP has been sent.`);
      form.reset();
    } catch (error) {
      showToast("RSVP is not connected yet. Check your Apps Script URL in src/config.js.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Loading Screen */}
      <div className={`loading-screen ${loadingHidden ? "is-hidden" : ""}`} aria-hidden="true">
        <div className="loading-mark">D &amp; N</div>
        <div className="loading-line"></div>
      </div>

      {/* Global Background (Fixed) */}
      <div className="global-bg" aria-hidden="true"></div>

      {/* Audio */}
      <audio ref={musicRef} loop preload="none" src={MUSIC_SOURCE || undefined}></audio>

      {/* Music Toggle Button */}
      <button 
        className={`utility-button music-toggle ${musicPlaying ? "is-playing" : ""}`} 
        type="button" 
        onClick={toggleMusic} 
        aria-label="Toggle background music"
      >
        <i data-lucide={musicPlaying ? "volume-2" : "volume-x"} aria-hidden="true"></i>
        <span>Music</span>
      </button>

      {/* Floating Petals */}
      <div className="petal-field" aria-hidden="true">
        {petals.map((petal) => (
          <span
            key={petal.id}
            className="petal"
            style={{
              left: petal.left,
              "--drift": petal.drift,
              animationDuration: petal.duration,
              animationDelay: petal.delay,
              transform: `scale(${petal.scale})`,
            }}
          ></span>
        ))}
      </div>

      {/* Floating Sparkles */}
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

      {/* Page Navigation Dots */}
      <nav className="page-dots" aria-label="Page navigation">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <button
            key={`dot-${i}`}
            className={`page-dot ${i === currentPage ? 'is-active' : ''}`}
            onClick={() => scrollToPage(i)}
            aria-label={`Go to page ${i + 1}`}
            aria-current={i === currentPage ? 'page' : undefined}
          ></button>
        ))}
      </nav>

      {/* Main Slider Container */}
      <div className="page-slider" ref={sliderRef}>
        {/* PAGE 1: Envelope */}
        <PageEnvelope onOpen={openEnvelope} />

        {/* PAGE 2: Invitation */}
        <PageInvitation 
          guestName={guestName} 
          images={galleryImages}
          currentIndex={galleryIndex}
          setCurrentIndex={setGalleryIndex}
          videoRef={saveDateVideoRef}
          countdown={countdown}
        />

        {/* PAGE 3: Gallery (Desktop) */}
        <PageGallery 
          images={galleryImages}
          currentIndex={galleryIndex}
          setCurrentIndex={setGalleryIndex}
        />

        {/* PAGE 4: Timeline */}
        <PageTimeline items={timelineItems} />

        {/* PAGE 5: Location */}
        <PageLocation />

        {/* PAGE 6: RSVP */}
        <PageRsvp onSubmit={handleRsvpSubmit} submitting={submitting} />

        {/* PAGE 7: Closing */}
        <PageClosing />
      </div>

      {/* Toast Message */}
      <div className={`toast ${toast ? "is-visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}

// ============================================================
// PAGE COMPONENTS
// ============================================================

function PageEnvelope({ onOpen }) {
  return (
    <div className="page page-envelope" id="page-envelope">
      <video className="envelope-bg-video" autoPlay muted loop playsInline preload="metadata">
        <source src="/Wedding Save the Date Video.mp4" type="video/mp4" />
      </video>

      <div className="page-content">
        <div className="envelope-intro">
          <div className="intro-copy">
            <span className="eyebrow">You are invited</span>
            <h1>Dinuka &amp; Nimasha</h1>
          </div>

          <div className="envelope-stage" onClick={onOpen} role="button" tabIndex="0">
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
                <span key={`sparkle-${i}`} className="envelope-sparkle"></span>
              ))}
            </div>
          </div>

          <button className="skip-intro" type="button" onClick={onOpen}>
            Enter invitation
          </button>
        </div>
      </div>
    </div>
  );
}

function PageInvitation({ guestName, images, currentIndex, setCurrentIndex, videoRef, countdown }) {
  const handleNextPhoto = () => setCurrentIndex((currentIndex + 1) % images.length);
  const handlePrevPhoto = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <div className="page page-invitation" id="page-invitation">
      <div className="page-content invitation-layout">
        <div className="invitation-gallery">
          <div className="gallery-main-container">
            <div className="gallery-main-frame">
              {images.map((image, index) => (
                <div key={image.src} className={`gallery-main-item ${index === currentIndex ? 'is-active' : ''}`}>
                  <img src={image.src} alt={image.alt} />
                  <div className="photo-bloom" aria-hidden="true"></div>
                </div>
              ))}
            </div>
            <button className="gallery-arrow gallery-arrow-left" onClick={handlePrevPhoto} aria-label="Previous photo">
              <i data-lucide="chevron-left" aria-hidden="true"></i>
            </button>
            <button className="gallery-arrow gallery-arrow-right" onClick={handleNextPhoto} aria-label="Next photo">
              <i data-lucide="chevron-right" aria-hidden="true"></i>
            </button>
          </div>

          <div className="gallery-thumbs-container">
            {images.map((image, index) => (
              <button
                key={`thumb-${index}`}
                className={`gallery-thumb ${index === currentIndex ? 'is-active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`View photo ${index + 1}`}
              >
                <img src={image.src} alt={`Thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>

          <div className="gallery-counter">{currentIndex + 1} / {images.length}</div>
        </div>

        <div className="invitation-panel">
          <span className="eyebrow">Together with their families</span>
          <h2>Dinuka &amp; Nimasha</h2>
          <p>Request the honour of <strong>{guestName}</strong> presence</p>

          <div className="floral-divider" aria-hidden="true">
            <span className="divider-line"></span>
            <span className="divider-icon">❀</span>
            <span className="divider-line"></span>
          </div>

          <div className="invitation-details">
            <span>Poruwa ceremony at 9.10 AM</span>
            <span>26 August 2026</span>
          </div>

          <div className="countdown-container">
            <div className="count-card">
              <strong>{countdown.days}</strong>
              <span>DAYS</span>
            </div>
            <div className="count-card">
              <strong>{countdown.hours}</strong>
              <span>HOURS</span>
            </div>
            <div className="count-card">
              <strong>{countdown.minutes}</strong>
              <span>MINUTES</span>
            </div>
            <div className="count-card">
              <strong>{countdown.seconds}</strong>
              <span>SECONDS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageGallery({ images, currentIndex, setCurrentIndex }) {
  const handleNextPhoto = () => setCurrentIndex((currentIndex + 1) % images.length);
  const handlePrevPhoto = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <div className="page page-gallery gallery-desktop-only" id="page-gallery">
      <div className="page-content">
        <div className="gallery-header">
          <span className="eyebrow">Memories</span>
          <h2>Our Little Gallery</h2>
        </div>

        <div className="gallery-wrapper">
          <div className="gallery-main-container">
            <div className="gallery-main-frame">
              {images.map((image, index) => (
                <div key={image.src} className={`gallery-main-item ${index === currentIndex ? 'is-active' : ''}`}>
                  <img src={image.src} alt={image.alt} />
                  <div className="photo-bloom" aria-hidden="true"></div>
                </div>
              ))}
            </div>
            <button className="gallery-arrow gallery-arrow-left" onClick={handlePrevPhoto} aria-label="Previous photo">
              <i data-lucide="chevron-left" aria-hidden="true"></i>
            </button>
            <button className="gallery-arrow gallery-arrow-right" onClick={handleNextPhoto} aria-label="Next photo">
              <i data-lucide="chevron-right" aria-hidden="true"></i>
            </button>
          </div>

          <div className="gallery-thumbs-container">
            {images.map((image, index) => (
              <button
                key={`thumb-${index}`}
                className={`gallery-thumb ${index === currentIndex ? 'is-active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`View photo ${index + 1}`}
              >
                <img src={image.src} alt={`Thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>

          <div className="gallery-counter">{currentIndex + 1} / {images.length}</div>
        </div>
      </div>
    </div>
  );
}

function PageTimeline({ items }) {
  return (
    <div className="page page-timeline" id="page-timeline">
      <div className="page-content">
        <div className="page-header">
          <span className="eyebrow">Schedule</span>
          <h2>Wedding Timeline</h2>
          <div className="floral-divider" aria-hidden="true">
            <span className="divider-line"></span>
            <span className="divider-icon">❀</span>
            <span className="divider-line"></span>
          </div>
        </div>

        <div className="timeline">
          {items.map((item, index) => (
            <div key={index} className="timeline-item reveal">
              <div className="timeline-icon">
                <i data-lucide={item.icon} aria-hidden="true"></i>
              </div>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <span className="tl-time">{item.time}</span>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageLocation() {
  return (
    <div className="page page-location" id="page-location">
      <div className="page-content">
        <div className="page-header">
          <span className="eyebrow">The Location</span>
          <h2>Venue Details</h2>
          <div className="floral-divider" aria-hidden="true">
            <span className="divider-line"></span>
            <span className="divider-icon">❀</span>
            <span className="divider-line"></span>
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

        <div className="venue-info reveal">
          <h3>Capital City Hotel, Badulla</h3>
          <p>26 August 2026 • 9:10 AM</p>
        </div>
      </div>
    </div>
  );
}

function PageRsvp({ onSubmit, submitting }) {
  return (
    <div className="page page-rsvp" id="page-rsvp">
      <div className="page-content">
        <div className="page-header">
          <span className="eyebrow">RSVP</span>
          <h2>Please Confirm Your Attendance</h2>
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
                <span>Yes</span>
              </label>
              <label>
                <input type="radio" name="attendance" value="No" />
                <span>No</span>
              </label>
              <label>
                <input type="radio" name="attendance" value="Maybe" />
                <span>Maybe</span>
              </label>
            </div>
          </fieldset>

          <label>
            <span>Message</span>
            <textarea name="message" rows="5" placeholder="Leave a note for the couple"></textarea>
          </label>

          <button type="submit" className="submit-button" disabled={submitting}>
            {submitting && <i data-lucide="loader" aria-hidden="true"></i>}
            {submitting ? "Submitting..." : "Submit RSVP"}
          </button>
        </form>
      </div>
    </div>
  );
}

function PageClosing() {
  return (
    <div className="page page-closing" id="page-closing">
      <div className="page-content">
        <h2>Thank You</h2>
        <p>We look forward to celebrating with you!</p>
        <p className="closing-subtitle">Dinuka &amp; Nimasha</p>
      </div>
    </div>
  );
}
